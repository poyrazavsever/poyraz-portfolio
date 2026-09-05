import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getBlogDetailBySlug } from "@/data/blog-detail";
import type { ArticleSection, ShareCardVariant } from "@/lib/article-share";

const SITE_NAME = "poyrazavsever.com";
const CACHE_CONTROL = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function titleSize(title: string, variant: ShareCardVariant) {
  if (variant === "x") {
    if (title.length > 100) return 45;
    if (title.length > 72) return 51;
    return 58;
  }

  if (title.length > 110) return 58;
  if (title.length > 76) return 66;
  return 76;
}

function isLocale(value: string | null): value is "tr" | "en" {
  return value === "tr" || value === "en";
}

function isSection(value: string | null): value is ArticleSection {
  return value === "blog" || value === "agenda";
}

function isVariant(value: string | null): value is ShareCardVariant {
  return value === "story" || value === "x";
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: inverse ? "#fffaf0" : "#111111",
        background: inverse ? "#111111" : "#fffaf0",
        border: `3px solid ${inverse ? "#fffaf0" : "#111111"}`,
        borderRadius: 16,
        fontSize: 36,
        fontWeight: 800,
        letterSpacing: -4,
      }}
    >
      &lt;/&gt;
    </div>
  );
}

function StoryCard({
  title,
  excerpt,
  readTime,
  author,
  category,
  avatar,
  locale,
}: {
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  category: string;
  avatar: string;
  locale: "tr" | "en";
}) {
  const cta = locale === "tr" ? "Yazıyı okumak için" : "Read the article";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        color: "#111111",
        background: "linear-gradient(145deg, #efe7d8 0%, #fffaf0 48%, #e5d8c4 100%)",
      }}
    >
      <div style={{ position: "absolute", top: -160, left: -120, width: 520, height: 520, borderRadius: 999, background: "#e3151b", display: "flex" }} />
      <div style={{ position: "absolute", bottom: -170, right: -120, width: 560, height: 560, borderRadius: 999, background: "#111111", display: "flex" }} />
      <div style={{ position: "absolute", top: 96, right: 72, width: 190, height: 190, border: "4px solid #111111", display: "flex" }} />
      <div style={{ position: "absolute", bottom: 100, left: 55, width: 180, height: 180, background: "#e3151b", transform: "rotate(18deg)", display: "flex" }} />

      <div
        style={{
          width: 930,
          height: 1580,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#fffdf8",
          border: "4px solid #111111",
          borderRadius: 52,
          boxShadow: "18px 22px 0 #111111",
        }}
      >
        <div
          style={{
            height: 145,
            flexShrink: 0,
            padding: "0 54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "4px solid #111111",
            fontSize: 32,
          }}
        >
          <span style={{ fontWeight: 650 }}>{readTime}</span>
          <span style={{ padding: "12px 22px", borderRadius: 999, background: "#111111", color: "#fffdf8", fontSize: 24, textTransform: "uppercase", letterSpacing: 2 }}>{truncate(category, 20)}</span>
        </div>

        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "78px 58px 54px" }}>
            <div style={{ width: 92, height: 10, background: "#e3151b", marginBottom: 48, display: "flex" }} />
            <div style={{ display: "flex", fontSize: titleSize(title, "story"), lineHeight: 1.05, fontWeight: 800, letterSpacing: -3.2 }}>
              {truncate(title, 132)}
            </div>
            <div style={{ display: "flex", marginTop: 42, fontSize: 36, lineHeight: 1.38, color: "#383531" }}>
              {truncate(excerpt, 230)}
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "auto", paddingTop: 44, fontSize: 32, fontWeight: 750 }}>
              <span style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 18, borderRadius: 999, background: "#e3151b", color: "white", fontSize: 31 }}>→</span>
              {cta}
            </div>
          </div>

          <div style={{ width: 132, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderLeft: "4px solid #111111", background: "#f3ede2", position: "relative" }}>
            <div style={{ width: 700, display: "flex", justifyContent: "center", position: "absolute", transform: "rotate(90deg)", fontSize: 29, fontWeight: 650, letterSpacing: 1.2 }}>
              {SITE_NAME}
            </div>
          </div>
        </div>

        <div style={{ height: 178, flexShrink: 0, padding: "0 50px", display: "flex", alignItems: "center", borderTop: "4px solid #111111" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="" width={94} height={94} style={{ borderRadius: 999, border: "3px solid #111111", objectFit: "cover" }} />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 24 }}>
            <span style={{ fontSize: 32, fontWeight: 750 }}>{author}</span>
            <span style={{ marginTop: 4, fontSize: 23, color: "#686159" }}>Full-stack Developer</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <BrandMark />
          </div>
        </div>
      </div>
    </div>
  );
}

function XCard({
  title,
  excerpt,
  readTime,
  author,
  category,
  avatar,
}: {
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  category: string;
  avatar: string;
}) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", color: "#111111", background: "#efe7d8", padding: 42 }}>
      <div style={{ position: "absolute", top: -150, right: 40, width: 390, height: 390, borderRadius: 999, background: "#e3151b", display: "flex" }} />
      <div style={{ position: "absolute", bottom: -210, right: -20, width: 470, height: 470, borderRadius: 999, background: "#111111", display: "flex" }} />

      <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", background: "#fffdf8", border: "4px solid #111111", borderRadius: 34, boxShadow: "12px 14px 0 #111111" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "38px 46px 34px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 700 }}>
            <span style={{ padding: "8px 15px", borderRadius: 999, background: "#111111", color: "#fffdf8", textTransform: "uppercase", letterSpacing: 1.5 }}>{truncate(category, 20)}</span>
            <span style={{ marginLeft: 16, color: "#686159" }}>{readTime}</span>
          </div>

          <div style={{ display: "flex", marginTop: 28, maxWidth: 790, fontSize: titleSize(title, "x"), lineHeight: 1.02, fontWeight: 800, letterSpacing: -2.4 }}>
            {truncate(title, 126)}
          </div>
          <div style={{ display: "flex", marginTop: 20, maxWidth: 790, fontSize: 24, lineHeight: 1.34, color: "#49443e" }}>
            {truncate(excerpt, 160)}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt="" width={56} height={56} style={{ borderRadius: 999, border: "2px solid #111111", objectFit: "cover" }} />
            <span style={{ marginLeft: 14, fontSize: 22, fontWeight: 720 }}>{author}</span>
            <span style={{ marginLeft: "auto", fontSize: 20, fontWeight: 650 }}>{SITE_NAME}</span>
          </div>
        </div>

        <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "42px 0", borderLeft: "4px solid #111111", background: "#e3151b", color: "#fffdf8" }}>
          <BrandMark inverse />
          <div style={{ display: "flex", transform: "rotate(90deg)", width: 360, justifyContent: "center", fontSize: 21, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" }}>
            Technology · Design · Software
          </div>
          <span style={{ fontSize: 46, fontWeight: 800 }}>→</span>
        </div>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");
  const section = searchParams.get("section");
  const slug = searchParams.get("slug")?.trim().toLowerCase() ?? "";
  const variant = searchParams.get("variant");

  if (
    !isLocale(locale) ||
    !isSection(section) ||
    !isVariant(variant) ||
    !/^[a-z0-9-]+$/.test(slug)
  ) {
    return new Response("Invalid share card parameters", { status: 400 });
  }

  const post = await getBlogDetailBySlug(slug);
  const actualSection = post?.category.toLocaleLowerCase() === "newsletter" ? "agenda" : "blog";

  if (!post || post.lang !== locale || actualSection !== section) {
    return new Response("Article not found", { status: 404 });
  }

  const avatarBuffer = await readFile(
    path.join(process.cwd(), "public", "logo", "apple-touch-icon.png"),
  );
  const avatar = `data:image/png;base64,${avatarBuffer.toString("base64")}`;
  const commonProps = {
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    author: post.author,
    category: post.category,
    avatar,
  };

  return new ImageResponse(
    variant === "story" ? (
      <StoryCard {...commonProps} locale={locale} />
    ) : (
      <XCard {...commonProps} />
    ),
    {
      width: variant === "story" ? 1080 : 1200,
      height: variant === "story" ? 1920 : 630,
      headers: {
        "Cache-Control": CACHE_CONTROL,
        "Content-Disposition": `inline; filename="${slug}-${variant}.png"`,
      },
    },
  );
}
