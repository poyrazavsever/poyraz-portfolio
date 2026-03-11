
import { COLLECTION_CONFIGS, PODCAST_LABELS } from "./configs.js";

const state = {
  activeTab: "blog",
  folders: [],
  selectedFolder: "",
  blogPosts: [],
  selectedBlogSlug: "",
  blogOriginalSlug: "",
  collection: {
    key: "announcement",
    items: [],
    selectedIndex: null,
    editingIndex: null,
    formInputs: {},
  },
  podcast: {
    kind: "yazilim",
    episodes: [],
    selectedSlug: "",
    originalSlug: "",
  },
};

const el = {
  tabs: document.querySelectorAll(".tab-btn"),
  panels: {
    blog: document.getElementById("tab-blog"),
    collection: document.getElementById("tab-collection"),
    podcast: document.getElementById("tab-podcast"),
    media: document.getElementById("tab-media"),
    publish: document.getElementById("tab-publish"),
  },
  blogCardList: document.getElementById("blog-card-list"),
  refreshBlogFiles: document.getElementById("refresh-blog-files"),
  newBlogFile: document.getElementById("new-blog-file"),
  deleteBlogFile: document.getElementById("delete-blog-file"),
  blogEditorTitle: document.getElementById("blog-editor-title"),
  blogSlug: document.getElementById("blog-slug"),
  blogTitle: document.getElementById("blog-title"),
  blogCategory: document.getElementById("blog-category"),
  blogDate: document.getElementById("blog-date"),
  blogReadTime: document.getElementById("blog-read-time"),
  blogAuthor: document.getElementById("blog-author"),
  blogCoverImage: document.getElementById("blog-cover-image"),
  blogExcerpt: document.getElementById("blog-excerpt"),
  blogEditor: document.getElementById("blog-editor"),
  saveBlogFile: document.getElementById("save-blog-file"),
  collectionSidebarTitle: document.getElementById("collection-sidebar-title"),
  collectionCardList: document.getElementById("collection-card-list"),
  refreshCollection: document.getElementById("refresh-collection"),
  newCollectionItem: document.getElementById("new-collection-item"),
  deleteCollectionItem: document.getElementById("delete-collection-item"),
  saveCollectionItem: document.getElementById("save-collection-item"),
  collectionEditorTitle: document.getElementById("collection-editor-title"),
  collectionHelper: document.getElementById("collection-helper"),
  collectionFormGrid: document.getElementById("collection-form-grid"),
  podcastSidebarTitle: document.getElementById("podcast-sidebar-title"),
  podcastCardList: document.getElementById("podcast-card-list"),
  refreshPodcastFiles: document.getElementById("refresh-podcast-files"),
  newPodcastFile: document.getElementById("new-podcast-file"),
  deletePodcastFile: document.getElementById("delete-podcast-file"),
  podcastEditorTitle: document.getElementById("podcast-editor-title"),
  podcastSlug: document.getElementById("podcast-slug"),
  podcastTitle: document.getElementById("podcast-title"),
  podcastDate: document.getElementById("podcast-date"),
  podcastYoutubeUrl: document.getElementById("podcast-youtube-url"),
  podcastSpotifyUrl: document.getElementById("podcast-spotify-url"),
  podcastEditor: document.getElementById("podcast-editor"),
  savePodcastFile: document.getElementById("save-podcast-file"),
  folderSelect: document.getElementById("folder-select"),
  newFolder: document.getElementById("new-folder"),
  createFolder: document.getElementById("create-folder"),
  uploadFile: document.getElementById("upload-file"),
  refreshMedia: document.getElementById("refresh-media"),
  mediaFiles: document.getElementById("media-files"),
  refreshStatus: document.getElementById("refresh-status"),
  commitMessage: document.getElementById("commit-message"),
  publishBtn: document.getElementById("publish-btn"),
  gitStatus: document.getElementById("git-status"),
  publishLog: document.getElementById("publish-log"),
};

function notify(message) {
  el.publishLog.textContent = message;
}

function getCollectionConfig(key = state.collection.key) {
  const config = COLLECTION_CONFIGS[key];
  if (!config) throw new Error(`Unknown collection config: ${key}`);
  return config;
}

function setActiveTab(tab, options = {}) {
  state.activeTab = tab;
  if (tab === "collection" && options.collectionKey) state.collection.key = options.collectionKey;
  if (tab === "podcast" && options.podcastKind) state.podcast.kind = options.podcastKind;

  for (const button of el.tabs) {
    const buttonTab = button.dataset.tab;
    const isCollection = buttonTab === "collection";
    const isPodcast = buttonTab === "podcast";
    const isActive = isCollection
      ? tab === "collection" && button.dataset.collectionKey === state.collection.key
      : isPodcast
        ? tab === "podcast" && button.dataset.podcastKind === state.podcast.kind
        : buttonTab === tab;
    button.classList.toggle("active", isActive);
  }

  for (const [key, panel] of Object.entries(el.panels)) {
    panel.classList.toggle("active", key === tab);
  }

  if (tab === "collection") {
    void loadCollection(state.collection.key).catch((error) => notify(String(error.message || error)));
  }

  if (tab === "podcast") {
    void loadPodcastFiles(state.podcast.kind).catch((error) => notify(String(error.message || error)));
  }
}

function emptyBlogDraft() {
  return {
    slug: "",
    title: "",
    category: "General",
    date: "",
    readTime: "",
    author: "Poyraz Avsever",
    excerpt: "",
    coverImage: "/news/design.svg",
    markdown: "",
  };
}

function currentBlogDraft() {
  return {
    slug: el.blogSlug.value.trim(),
    title: el.blogTitle.value.trim(),
    category: el.blogCategory.value.trim(),
    date: el.blogDate.value.trim(),
    readTime: el.blogReadTime.value.trim(),
    author: el.blogAuthor.value.trim(),
    excerpt: el.blogExcerpt.value.trim(),
    coverImage: el.blogCoverImage.value.trim(),
    markdown: el.blogEditor.value,
  };
}

function fillBlogForm(post) {
  const draft = post || emptyBlogDraft();
  el.blogSlug.value = draft.slug || "";
  el.blogTitle.value = draft.title || "";
  el.blogCategory.value = draft.category || "General";
  el.blogDate.value = draft.date || "";
  el.blogReadTime.value = draft.readTime || "";
  el.blogAuthor.value = draft.author || "Poyraz Avsever";
  el.blogExcerpt.value = draft.excerpt || "";
  el.blogCoverImage.value = draft.coverImage || "/news/design.svg";
  el.blogEditor.value = draft.markdown || "";
}

function renderPostCards(root, items, selectedSlug, onEdit, onDelete) {
  root.innerHTML = "";
  for (const item of items) {
    const card = document.createElement("article");
    card.className = `blog-card ${selectedSlug === item.slug ? "active" : ""}`;

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.title || item.slug;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = item.category ? `${item.category} - ${item.date || "-"}` : item.date || "-";

    const slug = document.createElement("div");
    slug.className = "meta";
    slug.textContent = item.slug;

    const row = document.createElement("div");
    row.className = "row";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => onEdit(item.slug));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => onDelete(item.slug));

    row.append(editBtn, deleteBtn);
    card.append(title, meta, slug, row);
    root.appendChild(card);
  }
}

async function loadBlogFiles() {
  state.blogPosts = await window.panelAPI.blog.list();
  renderPostCards(el.blogCardList, state.blogPosts, state.selectedBlogSlug, selectBlog, (slug) => void removeBlogFile(slug));
  if (!state.selectedBlogSlug && state.blogPosts.length) selectBlog(state.blogPosts[0].slug);
}

function selectBlog(slug) {
  const post = state.blogPosts.find((item) => item.slug === slug);
  if (!post) return;
  state.selectedBlogSlug = slug;
  state.blogOriginalSlug = slug;
  el.blogEditorTitle.textContent = `Edit Blog: ${slug}`;
  fillBlogForm(post);
  renderPostCards(el.blogCardList, state.blogPosts, state.selectedBlogSlug, selectBlog, (value) => void removeBlogFile(value));
}

function createBlogFile() {
  state.selectedBlogSlug = "";
  state.blogOriginalSlug = "";
  el.blogEditorTitle.textContent = "Create Blog Post";
  fillBlogForm(emptyBlogDraft());
  renderPostCards(el.blogCardList, state.blogPosts, state.selectedBlogSlug, selectBlog, (slug) => void removeBlogFile(slug));
}

async function saveBlogFile() {
  const post = currentBlogDraft();
  if (!post.slug || !post.title) {
    notify("Slug and title are required.");
    return;
  }

  const result = await window.panelAPI.blog.upsert({
    originalSlug: state.blogOriginalSlug || undefined,
    post,
  });

  await loadBlogFiles();
  state.selectedBlogSlug = result.slug;
  state.blogOriginalSlug = result.slug;
  selectBlog(result.slug);
  notify(`Saved blog post: ${result.slug}`);
}

async function removeBlogFile(slugArg) {
  const targetSlug = slugArg || state.selectedBlogSlug;
  if (!targetSlug) return;
  if (!window.confirm(`Delete blog post ${targetSlug}?`)) return;

  await window.panelAPI.blog.delete(targetSlug);
  state.selectedBlogSlug = "";
  state.blogOriginalSlug = "";
  createBlogFile();
  await loadBlogFiles();
  notify("Blog post deleted.");
}

function emptyPodcastDraft(kind = state.podcast.kind) {
  return { slug: "", title: "", date: "", youtubeUrl: "", spotifyUrl: "", podcast: kind, markdown: "" };
}

function fillPodcastForm(episode) {
  const draft = episode || emptyPodcastDraft();
  el.podcastSlug.value = draft.slug || "";
  el.podcastTitle.value = draft.title || "";
  el.podcastDate.value = draft.date || "";
  el.podcastYoutubeUrl.value = draft.youtubeUrl || "";
  el.podcastSpotifyUrl.value = draft.spotifyUrl || "";
  el.podcastEditor.value = draft.markdown || "";
}

function selectPodcast(slug) {
  const episode = state.podcast.episodes.find((item) => item.slug === slug);
  if (!episode) return;
  state.podcast.selectedSlug = slug;
  state.podcast.originalSlug = slug;
  el.podcastEditorTitle.textContent = `Edit Episode: ${slug}`;
  fillPodcastForm(episode);
  renderPostCards(el.podcastCardList, state.podcast.episodes, state.podcast.selectedSlug, selectPodcast, (value) => void removePodcastFile(value));
}
function createPodcastFile() {
  state.podcast.selectedSlug = "";
  state.podcast.originalSlug = "";
  el.podcastEditorTitle.textContent = `Create Episode (${PODCAST_LABELS[state.podcast.kind] || state.podcast.kind})`;
  fillPodcastForm(emptyPodcastDraft(state.podcast.kind));
  renderPostCards(el.podcastCardList, state.podcast.episodes, state.podcast.selectedSlug, selectPodcast, (slug) => void removePodcastFile(slug));
}

async function loadPodcastFiles(kind = state.podcast.kind) {
  state.podcast.kind = kind;
  state.podcast.episodes = await window.panelAPI.podcast.list(kind);
  el.podcastSidebarTitle.textContent = PODCAST_LABELS[kind] || "Podcast";
  renderPostCards(el.podcastCardList, state.podcast.episodes, state.podcast.selectedSlug, selectPodcast, (value) => void removePodcastFile(value));

  const selected = state.podcast.episodes.find((item) => item.slug === state.podcast.selectedSlug);
  if (selected) {
    selectPodcast(selected.slug);
  } else if (state.podcast.episodes.length > 0) {
    selectPodcast(state.podcast.episodes[0].slug);
  } else {
    createPodcastFile();
  }
}

function currentPodcastDraft() {
  return {
    slug: el.podcastSlug.value.trim(),
    title: el.podcastTitle.value.trim(),
    date: el.podcastDate.value.trim(),
    youtubeUrl: el.podcastYoutubeUrl.value.trim(),
    spotifyUrl: el.podcastSpotifyUrl.value.trim(),
    podcast: state.podcast.kind,
    markdown: el.podcastEditor.value,
  };
}

async function savePodcastFile() {
  const episode = currentPodcastDraft();
  if (!episode.slug || !episode.title) {
    notify("Slug and title are required.");
    return;
  }

  const result = await window.panelAPI.podcast.upsert({
    kind: state.podcast.kind,
    originalSlug: state.podcast.originalSlug || undefined,
    episode,
  });

  await loadPodcastFiles(state.podcast.kind);
  state.podcast.selectedSlug = result.slug;
  state.podcast.originalSlug = result.slug;
  selectPodcast(result.slug);
  notify(`Saved podcast episode: ${result.slug}`);
}

async function removePodcastFile(slugArg) {
  const targetSlug = slugArg || state.podcast.selectedSlug;
  if (!targetSlug) return;
  if (!window.confirm(`Delete podcast episode ${targetSlug}?`)) return;

  await window.panelAPI.podcast.delete({ kind: state.podcast.kind, slug: targetSlug });
  state.podcast.selectedSlug = "";
  state.podcast.originalSlug = "";
  createPodcastFile();
  await loadPodcastFiles(state.podcast.kind);
  notify("Podcast episode deleted.");
}

function deserializeCollectionItem(config, rawItem) {
  if (typeof config.deserializeItem === "function") return config.deserializeItem(rawItem);
  if (rawItem && typeof rawItem === "object" && !Array.isArray(rawItem)) return { ...rawItem };
  return {};
}

function serializeCollectionItem(config, item) {
  if (typeof config.serializeItem === "function") return config.serializeItem(item);
  return { ...item };
}

function emptyCollectionItem(config) {
  const base = {};
  for (const field of config.fields) {
    if (field.type !== "number") base[field.key] = field.defaultValue || "";
  }
  return base;
}

function renderCollectionHeader(config) {
  el.collectionSidebarTitle.textContent = config.label;
  el.collectionHelper.textContent = `${config.fileName} -> ${config.exportName}`;
  el.newCollectionItem.textContent = `New ${config.itemLabel}`;
}

function renderCollectionForm(config) {
  state.collection.formInputs = {};
  el.collectionFormGrid.innerHTML = "";

  for (const field of config.fields) {
    const wrapper = document.createElement("div");
    if (field.full) wrapper.className = "full";

    const label = document.createElement("label");
    const fieldId = `collection-${state.collection.key}-${field.key}`;
    label.setAttribute("for", fieldId);
    label.textContent = field.label;

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.className = "small-editor";
      input.spellcheck = false;
    } else {
      input = document.createElement("input");
      input.type = field.type === "number" ? "number" : field.type === "url" ? "url" : "text";
    }

    input.id = fieldId;
    if (field.placeholder) input.placeholder = field.placeholder;
    if (field.required) input.required = true;
    if (field.type === "number") {
      if (typeof field.min === "number") input.min = String(field.min);
      if (typeof field.max === "number") input.max = String(field.max);
      if (typeof field.step === "number") input.step = String(field.step);
    }

    state.collection.formInputs[field.key] = input;
    wrapper.append(label, input);
    el.collectionFormGrid.appendChild(wrapper);
  }
}

function fillCollectionForm(config, item) {
  const source = item || emptyCollectionItem(config);
  for (const field of config.fields) {
    const input = state.collection.formInputs[field.key];
    if (!input) continue;
    const value = source[field.key];
    input.value = value === undefined || value === null ? "" : String(value);
  }
}

function readCollectionForm(config) {
  const values = {};

  for (const field of config.fields) {
    const input = state.collection.formInputs[field.key];
    if (!input) continue;

    if (field.type === "number") {
      const value = input.value.trim();
      if (!value) {
        if (field.required) throw new Error(`${field.label} is required.`);
        continue;
      }
      const parsed = Number(value);
      if (Number.isNaN(parsed)) throw new Error(`${field.label} must be a number.`);
      values[field.key] = parsed;
      continue;
    }

    const value = field.type === "textarea" ? input.value.trim() : input.value.trim();
    if (!value) {
      if (field.required) throw new Error(`${field.label} is required.`);
      continue;
    }
    values[field.key] = value;
  }

  return values;
}

function renderCollectionCards(config) {
  el.collectionCardList.innerHTML = "";

  state.collection.items.forEach((item, index) => {
    const summary = typeof config.card === "function"
      ? config.card(item, index)
      : { title: item.title || item.id || `Item ${index + 1}`, meta: [] };

    const card = document.createElement("article");
    card.className = `blog-card ${state.collection.selectedIndex === index ? "active" : ""}`;

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = summary.title || `Item ${index + 1}`;
    card.appendChild(title);

    for (const metaText of summary.meta || []) {
      if (!metaText) continue;
      const meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = String(metaText);
      card.appendChild(meta);
    }

    if (summary.footer) {
      const footer = document.createElement("div");
      footer.className = "meta";
      footer.textContent = String(summary.footer);
      card.appendChild(footer);
    }

    const row = document.createElement("div");
    row.className = "row";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-ghost";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => selectCollectionItem(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => void removeCollectionItem(index));

    row.append(editBtn, deleteBtn);
    card.appendChild(row);
    el.collectionCardList.appendChild(card);
  });
}

function startCollectionCreateMode(config) {
  state.collection.selectedIndex = null;
  state.collection.editingIndex = null;
  el.collectionEditorTitle.textContent = `Create ${config.itemLabel}`;
  fillCollectionForm(config, emptyCollectionItem(config));
  renderCollectionCards(config);
}

function selectCollectionItem(index) {
  const config = getCollectionConfig();
  const item = state.collection.items[index];
  if (!item) return;
  state.collection.selectedIndex = index;
  state.collection.editingIndex = index;
  el.collectionEditorTitle.textContent = `Edit ${config.itemLabel} #${index + 1}`;
  fillCollectionForm(config, item);
  renderCollectionCards(config);
}
async function loadCollection(key = state.collection.key, options = {}) {
  const config = getCollectionConfig(key);
  const file = await window.panelAPI.data.read(config.fileName);
  const targetExport = file.exports.find((entry) => entry.name === config.exportName);

  if (!targetExport) throw new Error(`Export ${config.exportName} not found in ${config.fileName}.`);
  if (targetExport.parseError) throw new Error(targetExport.parseError);
  if (!Array.isArray(targetExport.value)) throw new Error(`Export ${config.exportName} must be array.`);

  state.collection.key = key;
  state.collection.items = targetExport.value.map((item) => deserializeCollectionItem(config, item));

  renderCollectionHeader(config);
  renderCollectionForm(config);

  let selectedIndex = null;
  if (typeof options.selectIndex === "number") {
    selectedIndex = options.selectIndex;
  } else if (options.keepSelection && typeof state.collection.selectedIndex === "number") {
    selectedIndex = state.collection.selectedIndex;
  }

  if (typeof selectedIndex === "number" && selectedIndex >= 0 && selectedIndex < state.collection.items.length) {
    state.collection.selectedIndex = selectedIndex;
    state.collection.editingIndex = selectedIndex;
    el.collectionEditorTitle.textContent = `Edit ${config.itemLabel} #${selectedIndex + 1}`;
    fillCollectionForm(config, state.collection.items[selectedIndex]);
    renderCollectionCards(config);
  } else {
    startCollectionCreateMode(config);
  }
}

async function saveCollectionItem() {
  const config = getCollectionConfig();
  const draft = readCollectionForm(config);

  const next = [...state.collection.items];
  let selectedIndex;

  if (typeof state.collection.editingIndex === "number") {
    selectedIndex = state.collection.editingIndex;
    next[selectedIndex] = draft;
  } else {
    next.push(draft);
    selectedIndex = next.length - 1;
  }

  await window.panelAPI.data.updateExport({
    fileName: config.fileName,
    exportName: config.exportName,
    value: next.map((item) => serializeCollectionItem(config, item)),
  });

  await loadCollection(state.collection.key, { selectIndex: selectedIndex });
  notify(`Saved ${config.itemLabel.toLowerCase()} in ${config.label}.`);
}

async function removeCollectionItem(indexArg) {
  const config = getCollectionConfig();
  const targetIndex = typeof indexArg === "number" ? indexArg : state.collection.selectedIndex;
  if (typeof targetIndex !== "number" || !state.collection.items[targetIndex]) return;
  if (!window.confirm(`Delete ${config.itemLabel} #${targetIndex + 1}?`)) return;

  const next = state.collection.items.filter((_, index) => index !== targetIndex);
  await window.panelAPI.data.updateExport({
    fileName: config.fileName,
    exportName: config.exportName,
    value: next.map((item) => serializeCollectionItem(config, item)),
  });

  const selectedIndex = next.length ? Math.max(0, targetIndex - 1) : undefined;
  await loadCollection(state.collection.key, { selectIndex: selectedIndex });
  notify(`${config.itemLabel} deleted from ${config.label}.`);
}

async function loadMediaFolders() {
  state.folders = await window.panelAPI.media.listFolders();
  el.folderSelect.innerHTML = "";

  for (const folder of state.folders) {
    const option = document.createElement("option");
    option.value = folder;
    option.textContent = folder || "/";
    el.folderSelect.appendChild(option);
  }

  if (!state.selectedFolder || !state.folders.includes(state.selectedFolder)) {
    state.selectedFolder = state.folders[0] ?? "";
  }
  el.folderSelect.value = state.selectedFolder;
  await loadMediaFiles();
}

async function loadMediaFiles() {
  const files = await window.panelAPI.media.listFiles(state.selectedFolder);
  el.mediaFiles.innerHTML = "";

  for (const file of files) {
    const item = document.createElement("article");
    item.className = "media-item";

    if (file.isImage) {
      const img = document.createElement("img");
      img.src = `file:///${file.absolutePath.replaceAll("\\", "/")}`;
      img.alt = file.name;
      item.appendChild(img);
    }

    const meta = document.createElement("div");
    meta.className = "meta";

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = file.relativePath;

    const del = document.createElement("button");
    del.className = "btn btn-danger";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      if (!window.confirm(`Delete ${file.relativePath}?`)) return;
      await window.panelAPI.media.deleteFile(file.relativePath);
      await loadMediaFiles();
      notify(`Deleted: ${file.relativePath}`);
    });

    meta.append(name, del);
    item.appendChild(meta);
    el.mediaFiles.appendChild(item);
  }
}

async function createFolder() {
  const folder = el.newFolder.value.trim();
  if (!folder) return;
  await window.panelAPI.media.createFolder(folder);
  el.newFolder.value = "";
  await loadMediaFolders();
  state.selectedFolder = folder.replaceAll("\\", "/").replace(/^\/+/, "");
  el.folderSelect.value = state.selectedFolder;
  await loadMediaFiles();
}

async function uploadFiles() {
  await window.panelAPI.media.upload(state.selectedFolder);
  await loadMediaFiles();
  notify("Upload completed.");
}

async function refreshPublishStatus() {
  const status = await window.panelAPI.publish.status();
  el.gitStatus.textContent = status.length
    ? status.join("\n")
    : "No pending changes in data/, public/ or content/.";
}

async function publishNow() {
  const result = await window.panelAPI.publish.run(el.commitMessage.value);
  el.publishLog.textContent = JSON.stringify(result, null, 2);
  await refreshPublishStatus();
}

function bindEvents() {
  for (const button of el.tabs) {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      if (tab === "collection") {
        setActiveTab("collection", { collectionKey: button.dataset.collectionKey });
        return;
      }
      if (tab === "podcast") {
        setActiveTab("podcast", { podcastKind: button.dataset.podcastKind });
        return;
      }
      setActiveTab(tab);
    });
  }

  el.refreshBlogFiles.addEventListener("click", () => void loadBlogFiles());
  el.newBlogFile.addEventListener("click", () => createBlogFile());
  el.deleteBlogFile.addEventListener("click", () => void removeBlogFile().catch((error) => notify(String(error.message || error))));
  el.saveBlogFile.addEventListener("click", () => void saveBlogFile().catch((error) => notify(String(error.message || error))));

  el.refreshCollection.addEventListener("click", () =>
    void loadCollection(state.collection.key, { keepSelection: true }).catch((error) => notify(String(error.message || error)))
  );
  el.newCollectionItem.addEventListener("click", () => startCollectionCreateMode(getCollectionConfig()));
  el.deleteCollectionItem.addEventListener("click", () => void removeCollectionItem().catch((error) => notify(String(error.message || error))));
  el.saveCollectionItem.addEventListener("click", () => void saveCollectionItem().catch((error) => notify(String(error.message || error))));

  el.refreshPodcastFiles.addEventListener("click", () => void loadPodcastFiles(state.podcast.kind).catch((error) => notify(String(error.message || error))));
  el.newPodcastFile.addEventListener("click", () => createPodcastFile());
  el.deletePodcastFile.addEventListener("click", () => void removePodcastFile().catch((error) => notify(String(error.message || error))));
  el.savePodcastFile.addEventListener("click", () => void savePodcastFile().catch((error) => notify(String(error.message || error))));

  el.folderSelect.addEventListener("change", () => {
    state.selectedFolder = el.folderSelect.value;
    void loadMediaFiles();
  });
  el.refreshMedia.addEventListener("click", () => void loadMediaFolders());
  el.createFolder.addEventListener("click", () => void createFolder().catch((error) => notify(String(error.message || error))));
  el.uploadFile.addEventListener("click", () => void uploadFiles().catch((error) => notify(String(error.message || error))));

  el.refreshStatus.addEventListener("click", () => void refreshPublishStatus());
  el.publishBtn.addEventListener("click", () => void publishNow().catch((error) => notify(String(error.message || error))));
}

async function init() {
  bindEvents();
  await loadBlogFiles();
  if (!state.selectedBlogSlug) createBlogFile();
  await loadCollection(state.collection.key);
  await loadPodcastFiles(state.podcast.kind);
  await loadMediaFolders();
  await refreshPublishStatus();
  setActiveTab("blog");
}

void init().catch((error) => {
  notify(`Initialization error: ${String(error.message || error)}`);
});
