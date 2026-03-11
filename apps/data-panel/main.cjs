/* eslint-disable @typescript-eslint/no-require-imports */
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { execFile } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");
const matter = require("gray-matter");

function getCliArgValue(flag) {
  const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  if (exact) return exact.slice(flag.length + 1);

  const index = process.argv.findIndex((arg) => arg === flag);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }

  return "";
}

function resolveWorkspaceRoot() {
  const fromArg = getCliArgValue("--workspace-root");
  const fromEnv = process.env.PORTFOLIO_WORKSPACE_ROOT || "";
  const selected = fromArg || fromEnv;

  if (selected) {
    return path.resolve(selected);
  }

  return path.resolve(__dirname, "../..");
}

let WORKSPACE_ROOT = resolveWorkspaceRoot();
let DATA_DIR = path.join(WORKSPACE_ROOT, "data");
let PUBLIC_DIR = path.join(WORKSPACE_ROOT, "public");
let BLOG_CONTENT_DIR = path.join(WORKSPACE_ROOT, "content", "blog");
let PODCAST_CONTENT_DIR = path.join(WORKSPACE_ROOT, "content", "podcasts");

function setWorkspaceRoot(nextRoot) {
  WORKSPACE_ROOT = path.resolve(nextRoot);
  DATA_DIR = path.join(WORKSPACE_ROOT, "data");
  PUBLIC_DIR = path.join(WORKSPACE_ROOT, "public");
  BLOG_CONTENT_DIR = path.join(WORKSPACE_ROOT, "content", "blog");
  PODCAST_CONTENT_DIR = path.join(WORKSPACE_ROOT, "content", "podcasts");
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function ensureWorkspaceStructure() {
  const checks = [
    { label: "data", target: DATA_DIR },
    { label: "public", target: PUBLIC_DIR },
    { label: "content/blog", target: BLOG_CONTENT_DIR },
    { label: "content/podcasts", target: PODCAST_CONTENT_DIR },
  ];

  const missing = [];
  for (const check of checks) {
    if (!(await pathExists(check.target))) {
      missing.push(check.label);
    }
  }

  if (!missing.length) return;

  const details = [
    `Workspace root: ${WORKSPACE_ROOT}`,
    `Missing: ${missing.join(", ")}`,
    "",
    "Fix options:",
    "1) Run panel from repository root.",
    "2) Set PORTFOLIO_WORKSPACE_ROOT environment variable.",
    "3) Launch app with --workspace-root=<path>.",
  ].join("\n");

  throw new Error(details);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1080,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

function assertSafePath(baseDir, targetPath) {
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(targetPath);
  const isSafe =
    resolvedTarget === resolvedBase || resolvedTarget.startsWith(`${resolvedBase}${path.sep}`);

  if (!isSafe) {
    throw new Error("Invalid path access attempt.");
  }

  return resolvedTarget;
}

function validateDataFileName(fileName) {
  if (!/^[a-z0-9-]+\.ts$/i.test(fileName)) {
    throw new Error("File name must match: <name>.ts");
  }
}

function validateBlogSlug(slug) {
  const normalized = String(slug || "")
    .trim()
    .toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) {
    throw new Error("Slug must match: lowercase-kebab-case");
  }
  return normalized;
}

function validatePodcastKind(kind) {
  const normalized = String(kind || "")
    .trim()
    .toLowerCase();

  if (normalized !== "yazilim" && normalized !== "masa-basi") {
    throw new Error("Podcast kind must be one of: yazilim, masa-basi");
  }

  return normalized;
}

function runGit(args) {
  return new Promise((resolve, reject) => {
    execFile("git", args, { cwd: WORKSPACE_ROOT }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }
      resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
    });
  });
}

function formatTsKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

function toTsLiteral(value, indent = 0) {
  const space = "  ";
  const current = space.repeat(indent);
  const next = space.repeat(indent + 1);

  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value
      .map((item) => `${next}${toTsLiteral(item, indent + 1)}`)
      .join(",\n")}\n${current}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(([key, entryValue]) => {
        return `${next}${formatTsKey(key)}: ${toTsLiteral(entryValue, indent + 1)}`;
      })
      .join(",\n")}\n${current}}`;
  }

  return JSON.stringify(value);
}

function findExpressionBounds(source, startIndex) {
  let i = startIndex;
  while (i < source.length && /\s/.test(source[i])) i += 1;

  const start = i;
  const first = source[start];
  if (!first) throw new Error("Cannot parse export value.");

  if (first !== "[" && first !== "{" && first !== "(" && first !== '"' && first !== "'" && first !== "`") {
    throw new Error("Only literal exports are supported in structured mode.");
  }

  const closingMap = { "[": "]", "{": "}", "(": ")" };
  let stack = [];
  if (closingMap[first]) stack = [closingMap[first]];

  let mode = first === '"' || first === "'" || first === "`" ? first : "normal";
  if (mode !== "normal") i += 1;
  if (mode === "normal") i = start + 1;

  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];

    if (mode === "normal") {
      if (ch === "'" || ch === '"' || ch === "`") {
        mode = ch;
        i += 1;
        continue;
      }

      if (ch === "/" && next === "/") {
        mode = "line-comment";
        i += 2;
        continue;
      }

      if (ch === "/" && next === "*") {
        mode = "block-comment";
        i += 2;
        continue;
      }

      if (closingMap[ch]) {
        stack.push(closingMap[ch]);
        i += 1;
        continue;
      }

      if (stack.length && ch === stack[stack.length - 1]) {
        stack.pop();
        i += 1;
        if (!stack.length) {
          return { start, end: i };
        }
        continue;
      }

      i += 1;
      continue;
    }

    if (mode === "line-comment") {
      if (ch === "\n") mode = "normal";
      i += 1;
      continue;
    }

    if (mode === "block-comment") {
      if (ch === "*" && next === "/") {
        mode = "normal";
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }

    if (mode === "`") {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === "`") {
        mode = "normal";
        i += 1;
        if (!stack.length) return { start, end: i };
        continue;
      }
      i += 1;
      continue;
    }

    if (mode === "'" || mode === '"') {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === mode) {
        mode = "normal";
        i += 1;
        if (!stack.length) return { start, end: i };
        continue;
      }
      i += 1;
    }
  }

  throw new Error("Unable to parse export expression boundaries.");
}

function getExportBlocks(source) {
  const blocks = [];
  const regex = /export\s+const\s+([A-Za-z0-9_]+)(\s*:\s*[^=]+)?\s*=\s*/g;
  let match = regex.exec(source);

  while (match) {
    const exportName = match[1];
    const expressionStart = regex.lastIndex;

    try {
      const bounds = findExpressionBounds(source, expressionStart);
      const expression = source.slice(bounds.start, bounds.end);

      let parsed = null;
      let parseError = null;
      try {
        parsed = vm.runInNewContext(`(${expression})`, {}, { timeout: 800 });
      } catch (error) {
        parseError = error instanceof Error ? error.message : "Unknown parse error.";
      }

      blocks.push({
        name: exportName,
        start: bounds.start,
        end: bounds.end,
        expression,
        parsed,
        isArray: Array.isArray(parsed),
        parseError,
      });
    } catch (error) {
      blocks.push({
        name: exportName,
        start: -1,
        end: -1,
        expression: "",
        parsed: null,
        isArray: false,
        parseError: error instanceof Error ? error.message : "Unknown parse error.",
      });
    }

    match = regex.exec(source);
  }

  return blocks;
}

async function listDataFiles() {
  const files = await fs.readdir(DATA_DIR, { withFileTypes: true });
  return files
    .filter((item) => item.isFile() && item.name.endsWith(".ts"))
    .map((item) => item.name)
    .sort((a, b) => a.localeCompare(b));
}

async function readDataFile(fileName) {
  validateDataFileName(fileName);
  const target = assertSafePath(DATA_DIR, path.join(DATA_DIR, fileName));
  const raw = await fs.readFile(target, "utf8");
  const exports = getExportBlocks(raw).map((entry) => ({
    name: entry.name,
    isArray: entry.isArray,
    value: entry.parsed,
    parseError: entry.parseError,
  }));

  return { fileName, raw, exports };
}

async function saveRawDataFile(fileName, raw) {
  validateDataFileName(fileName);
  const target = assertSafePath(DATA_DIR, path.join(DATA_DIR, fileName));
  await fs.writeFile(target, raw, "utf8");
  return { ok: true };
}

async function updateDataExport({ fileName, exportName, value }) {
  validateDataFileName(fileName);
  const target = assertSafePath(DATA_DIR, path.join(DATA_DIR, fileName));
  const source = await fs.readFile(target, "utf8");
  const blocks = getExportBlocks(source);
  const selected = blocks.find((block) => block.name === exportName);

  if (!selected || selected.start < 0 || selected.end < 0) {
    throw new Error(`Export "${exportName}" not found or cannot be parsed.`);
  }

  const literal = toTsLiteral(value, 0);
  const nextSource = `${source.slice(0, selected.start)}${literal}${source.slice(selected.end)}`;
  await fs.writeFile(target, nextSource, "utf8");
  return { ok: true };
}

async function createDataFile({ fileName, exportName }) {
  validateDataFileName(fileName);
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(exportName)) {
    throw new Error("Export name is invalid.");
  }
  const target = assertSafePath(DATA_DIR, path.join(DATA_DIR, fileName));
  await fs.writeFile(target, `export const ${exportName} = [] as const;\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  return { ok: true };
}

async function deleteDataFile(fileName) {
  validateDataFileName(fileName);
  const target = assertSafePath(DATA_DIR, path.join(DATA_DIR, fileName));
  await fs.unlink(target);
  return { ok: true };
}

function mapMarkdownToBlog(fileName, raw) {
  const parsed = matter(raw);
  const slug = fileName.replace(/\.md$/i, "");
  return {
    slug,
    title: String(parsed.data.title || slug),
    category: String(parsed.data.category || "General"),
    date: String(parsed.data.date || ""),
    readTime: String(parsed.data.readTime || ""),
    author: String(parsed.data.author || "Poyraz Avsever"),
    excerpt: String(parsed.data.excerpt || ""),
    coverImage: String(parsed.data.coverImage || "/news/design.svg"),
    markdown: String(parsed.content || "").trim(),
  };
}

async function listBlogs() {
  await fs.mkdir(BLOG_CONTENT_DIR, { recursive: true });
  const files = await fs.readdir(BLOG_CONTENT_DIR, { withFileTypes: true });
  const markdownFiles = files
    .filter((item) => item.isFile() && item.name.endsWith(".md"))
    .map((item) => item.name)
    .sort((a, b) => a.localeCompare(b));

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const target = assertSafePath(BLOG_CONTENT_DIR, path.join(BLOG_CONTENT_DIR, fileName));
      const raw = await fs.readFile(target, "utf8");
      return mapMarkdownToBlog(fileName, raw);
    }),
  );

  return posts;
}

async function upsertBlog({ originalSlug, post }) {
  if (!post || typeof post !== "object") {
    throw new Error("Post payload is invalid.");
  }

  const slug = validateBlogSlug(post.slug);
  const previousSlug = originalSlug ? validateBlogSlug(originalSlug) : null;

  const frontmatter = {
    title: String(post.title || slug),
    category: String(post.category || "General"),
    date: String(post.date || ""),
    readTime: String(post.readTime || ""),
    author: String(post.author || "Poyraz Avsever"),
    excerpt: String(post.excerpt || ""),
    coverImage: String(post.coverImage || "/news/design.svg"),
  };

  const markdownBody = String(post.markdown || "").trim();
  const raw = matter.stringify(markdownBody ? `${markdownBody}\n` : "", frontmatter);

  await fs.mkdir(BLOG_CONTENT_DIR, { recursive: true });

  const nextPath = assertSafePath(BLOG_CONTENT_DIR, path.join(BLOG_CONTENT_DIR, `${slug}.md`));
  const previousPath =
    previousSlug && previousSlug !== slug
      ? assertSafePath(BLOG_CONTENT_DIR, path.join(BLOG_CONTENT_DIR, `${previousSlug}.md`))
      : null;

  await fs.writeFile(nextPath, raw, "utf8");

  if (previousPath) {
    try {
      await fs.unlink(previousPath);
    } catch {
      // ignore missing previous file
    }
  }

  return { ok: true, slug };
}

async function deleteBlogBySlug(slug) {
  const normalized = validateBlogSlug(slug);
  const target = assertSafePath(BLOG_CONTENT_DIR, path.join(BLOG_CONTENT_DIR, `${normalized}.md`));
  await fs.unlink(target);
  return { ok: true };
}

function mapMarkdownToPodcast(kind, fileName, raw) {
  const parsed = matter(raw);
  const slug = fileName.replace(/\.md$/i, "");

  return {
    slug,
    title: String(parsed.data.title || slug),
    date: String(parsed.data.date || ""),
    youtubeUrl: String(parsed.data.youtubeUrl || ""),
    spotifyUrl: String(parsed.data.spotifyUrl || ""),
    podcast: kind,
    markdown: String(parsed.content || "").trim(),
  };
}

async function listPodcastEpisodes(kind) {
  const safeKind = validatePodcastKind(kind);
  const podcastDir = assertSafePath(PODCAST_CONTENT_DIR, path.join(PODCAST_CONTENT_DIR, safeKind));

  await fs.mkdir(podcastDir, { recursive: true });
  const files = await fs.readdir(podcastDir, { withFileTypes: true });
  const markdownFiles = files
    .filter((item) => item.isFile() && item.name.endsWith(".md"))
    .map((item) => item.name)
    .sort((a, b) => b.localeCompare(a));

  const episodes = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const target = assertSafePath(podcastDir, path.join(podcastDir, fileName));
      const raw = await fs.readFile(target, "utf8");
      return mapMarkdownToPodcast(safeKind, fileName, raw);
    }),
  );

  return episodes;
}

async function upsertPodcastEpisode(kind, { originalSlug, episode }) {
  const safeKind = validatePodcastKind(kind);
  if (!episode || typeof episode !== "object") {
    throw new Error("Episode payload is invalid.");
  }

  const slug = validateBlogSlug(episode.slug);
  const previousSlug = originalSlug ? validateBlogSlug(originalSlug) : null;

  const frontmatter = {
    title: String(episode.title || slug),
    date: String(episode.date || ""),
    youtubeUrl: String(episode.youtubeUrl || ""),
    spotifyUrl: String(episode.spotifyUrl || ""),
    podcast: safeKind,
  };

  const markdownBody = String(episode.markdown || "").trim();
  const raw = matter.stringify(markdownBody ? `${markdownBody}\n` : "", frontmatter);

  const podcastDir = assertSafePath(PODCAST_CONTENT_DIR, path.join(PODCAST_CONTENT_DIR, safeKind));
  await fs.mkdir(podcastDir, { recursive: true });

  const nextPath = assertSafePath(podcastDir, path.join(podcastDir, `${slug}.md`));
  const previousPath =
    previousSlug && previousSlug !== slug
      ? assertSafePath(podcastDir, path.join(podcastDir, `${previousSlug}.md`))
      : null;

  await fs.writeFile(nextPath, raw, "utf8");

  if (previousPath) {
    try {
      await fs.unlink(previousPath);
    } catch {
      // ignore missing previous file
    }
  }

  return { ok: true, slug };
}

async function deletePodcastEpisode(kind, slug) {
  const safeKind = validatePodcastKind(kind);
  const normalized = validateBlogSlug(slug);
  const podcastDir = assertSafePath(PODCAST_CONTENT_DIR, path.join(PODCAST_CONTENT_DIR, safeKind));
  const target = assertSafePath(podcastDir, path.join(podcastDir, `${normalized}.md`));
  await fs.unlink(target);
  return { ok: true };
}

async function listFoldersRecursive(baseDir, current = "") {
  const target = assertSafePath(baseDir, path.join(baseDir, current));
  const entries = await fs.readdir(target, { withFileTypes: true });
  const folders = [current];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const child = current ? path.posix.join(current, entry.name) : entry.name;
    const nested = await listFoldersRecursive(baseDir, child);
    folders.push(...nested);
  }

  return folders;
}

async function listMediaFolders() {
  const folders = await listFoldersRecursive(PUBLIC_DIR);
  return folders.sort((a, b) => a.localeCompare(b));
}

async function createMediaFolder(folder) {
  const normalized = folder.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized) throw new Error("Folder path is required.");
  const target = assertSafePath(PUBLIC_DIR, path.join(PUBLIC_DIR, normalized));
  await fs.mkdir(target, { recursive: true });
  return { ok: true };
}

async function listMediaFiles(folder = "") {
  const normalized = folder.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  const target = assertSafePath(PUBLIC_DIR, path.join(PUBLIC_DIR, normalized));
  const entries = await fs.readdir(target, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const relativePath = normalized
      ? path.posix.join(normalized, entry.name)
      : entry.name;
    const absolutePath = assertSafePath(PUBLIC_DIR, path.join(PUBLIC_DIR, relativePath));
    files.push({
      name: entry.name,
      relativePath,
      absolutePath,
      isImage: /\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name),
    });
  }

  return files.sort((a, b) => a.name.localeCompare(b.name));
}

async function uploadMediaFiles(folder = "") {
  const normalized = folder.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  const targetDir = assertSafePath(PUBLIC_DIR, path.join(PUBLIC_DIR, normalized));
  await fs.mkdir(targetDir, { recursive: true });

  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Select image files",
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "Images",
        extensions: ["png", "jpg", "jpeg", "webp", "gif", "svg"],
      },
    ],
  });

  if (canceled || !filePaths.length) {
    return { uploaded: 0, files: [] };
  }

  const uploaded = [];

  for (const sourcePath of filePaths) {
    const originalName = path.basename(sourcePath);
    let finalName = originalName;
    let counter = 1;

    while (true) {
      const candidate = path.join(targetDir, finalName);
      try {
        await fs.access(candidate);
        const ext = path.extname(originalName);
        const base = path.basename(originalName, ext);
        finalName = `${base}-${counter}${ext}`;
        counter += 1;
      } catch {
        break;
      }
    }

    const destinationPath = path.join(targetDir, finalName);
    await fs.copyFile(sourcePath, destinationPath);

    const relativePath = normalized
      ? path.posix.join(normalized, finalName)
      : finalName;
    uploaded.push(relativePath);
  }

  return { uploaded: uploaded.length, files: uploaded };
}

async function deleteMediaFile(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized) throw new Error("File path is required.");
  const target = assertSafePath(PUBLIC_DIR, path.join(PUBLIC_DIR, normalized));
  await fs.unlink(target);
  return { ok: true };
}

async function getPublishStatus() {
  const { stdout } = await runGit(["status", "--short", "--", "data", "public", "content"]);
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildAutoMessage(files) {
  const names = files
    .map((item) => path.basename(item))
    .slice(0, 4)
    .join(", ");
  const now = new Date().toISOString().slice(0, 16).replace("T", " ");
  return names ? `content: update ${names} (${now})` : `content: update data/public/content (${now})`;
}

async function publishChanges(message = "") {
  await runGit(["add", "data", "public", "content"]);
  const staged = await runGit(["diff", "--cached", "--name-only"]);
  const files = staged.stdout.split("\n").map((line) => line.trim()).filter(Boolean);

  if (!files.length) {
    return { ok: false, message: "No staged changes in data/public/content." };
  }

  const commitMessage = message.trim() || buildAutoMessage(files);
  await runGit(["commit", "-m", commitMessage]);
  await runGit(["push"]);
  const head = await runGit(["rev-parse", "--short", "HEAD"]);

  return {
    ok: true,
    message: `Published successfully (${head.stdout}).`,
    commit: head.stdout,
    commitMessage,
    files,
  };
}

ipcMain.handle("data:list", async () => listDataFiles());
ipcMain.handle("data:read", async (_, fileName) => readDataFile(fileName));
ipcMain.handle("data:saveRaw", async (_, payload) => saveRawDataFile(payload.fileName, payload.raw));
ipcMain.handle("data:updateExport", async (_, payload) => updateDataExport(payload));
ipcMain.handle("data:create", async (_, payload) => createDataFile(payload));
ipcMain.handle("data:delete", async (_, fileName) => deleteDataFile(fileName));

ipcMain.handle("blog:list", async () => listBlogs());
ipcMain.handle("blog:upsert", async (_, payload) => upsertBlog(payload));
ipcMain.handle("blog:delete", async (_, slug) => deleteBlogBySlug(slug));
ipcMain.handle("podcast:list", async (_, kind) => listPodcastEpisodes(kind));
ipcMain.handle("podcast:upsert", async (_, payload) => upsertPodcastEpisode(payload.kind, payload));
ipcMain.handle("podcast:delete", async (_, payload) => deletePodcastEpisode(payload.kind, payload.slug));

ipcMain.handle("media:listFolders", async () => listMediaFolders());
ipcMain.handle("media:createFolder", async (_, folder) => createMediaFolder(folder));
ipcMain.handle("media:listFiles", async (_, folder) => listMediaFiles(folder));
ipcMain.handle("media:upload", async (_, folder) => uploadMediaFiles(folder));
ipcMain.handle("media:deleteFile", async (_, relativePath) => deleteMediaFile(relativePath));

ipcMain.handle("publish:status", async () => getPublishStatus());
ipcMain.handle("publish:run", async (_, message) => publishChanges(message));

app.whenReady().then(async () => {
  try {
    setWorkspaceRoot(resolveWorkspaceRoot());
    await ensureWorkspaceStructure();
    createWindow();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dialog.showErrorBox("Portfolio Data Panel", message);
    app.quit();
    return;
  }

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      try {
        await ensureWorkspaceStructure();
        createWindow();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        dialog.showErrorBox("Portfolio Data Panel", message);
        app.quit();
      }
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
