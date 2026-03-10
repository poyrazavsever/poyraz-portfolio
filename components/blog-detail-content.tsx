"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  Textarea,
  Typography,
} from "poyraz-ui/atoms";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "poyraz-ui/molecules";
import type { BlogDetail } from "@/data/blog-detail";
import type { BlogComment, BlogEngagement } from "@/data/blog-engagement";

type BlogDetailContentProps = {
  post: BlogDetail;
  engagement: BlogEngagement;
};

function MermaidBlock({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let mounted = true;

    const renderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (mounted) {
          setSvg(rendered);
          setError("");
        }
      } catch {
        if (mounted) {
          setError("Mermaid diagram could not be rendered.");
        }
      }
    };

    void renderChart();
    return () => {
      mounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <Card className="rounded-sm border-border p-3">
        <Typography variant="small" className="text-red-600">
          {error}
        </Typography>
      </Card>
    );
  }

  if (!svg) {
    return (
      <Card className="rounded-sm border-border p-3">
        <Typography variant="small" className="text-muted-foreground">
          Rendering diagram...
        </Typography>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto rounded-sm border-border p-3">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Card>
  );
}

export function BlogDetailContent({ post, engagement }: BlogDetailContentProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(engagement.likes);
  const [comments, setComments] = useState<BlogComment[]>(engagement.comments);
  const [commentSheetOpen, setCommentSheetOpen] = useState(false);
  const [githubAuthed, setGithubAuthed] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);

  const progressWidth = useMemo(() => `${Math.min(100, Math.max(0, progress))}%`, [progress]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) {
      setProgress(100);
      return;
    }

    setProgress((el.scrollTop / scrollable) * 100);
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((count) => (next ? count + 1 : Math.max(0, count - 1)));
      return next;
    });
  };

  const handleReplyClick = (id: string, author: string) => {
    setReplyTo({ id, author });
    setCommentSheetOpen(true);
  };

  const handleSubmitComment = () => {
    if (!githubAuthed) return;
    const content = draft.trim();
    if (!content) return;

    if (replyTo) {
      setComments((prev) =>
        prev.map((item) =>
          item.id === replyTo.id
            ? {
                ...item,
                replies: [
                  ...item.replies,
                  {
                    id: `reply-${Date.now()}`,
                    author: "You (GitHub)",
                    avatar: "/logo/logo.jpeg",
                    date: "Just now",
                    content,
                    likes: 0,
                  },
                ],
              }
            : item,
        ),
      );
      setReplyTo(null);
    } else {
      setComments((prev) => [
        {
          id: `comment-${Date.now()}`,
          author: "You (GitHub)",
          avatar: "/logo/logo.jpeg",
          date: "Just now",
          content,
          likes: 0,
          replies: [],
        },
        ...prev,
      ]);
    }

    setDraft("");
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-border/70">
        <div className="h-full bg-red-600 transition-[width] duration-100" style={{ width: progressWidth }} />
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="relative h-full overflow-y-auto rounded-sm border border-border"
      >
        <article className="space-y-5 p-5 md:p-6">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {"<- Back to blog"}
          </Link>

          <header className="space-y-3">
            <Badge className="rounded-sm">{post.category}</Badge>
            <Typography variant="h2" className="leading-tight">
              {post.title}
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              {post.author} - {post.date} - {post.readTime}
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              {post.excerpt}
            </Typography>
          </header>

          <Card className="relative aspect-[16/8] overflow-hidden rounded-sm border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant={liked ? "default" : "outline"}
              className="h-9 w-9 rounded-sm p-0"
              onClick={toggleLike}
              aria-label={`Like post (${likeCount})`}
              title={`Like (${likeCount})`}
            >
              <Icon icon={liked ? "mdi:heart" : "mdi:heart-outline"} width={18} height={18} />
            </Button>

            <Sheet open={commentSheetOpen} onOpenChange={setCommentSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 w-9 rounded-sm p-0"
                  aria-label={`Open comments (${comments.length})`}
                  title={`Comments (${comments.length})`}
                >
                  <Icon icon="mdi:comment-outline" width={18} height={18} />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="flex h-dvh w-full max-w-xl flex-col p-0">
                <div className="border-b border-border px-4 py-3">
                  <SheetTitle>Comments</SheetTitle>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                    {comments.map((item) => (
                      <Card key={item.id} className="overflow-visible rounded-sm border-border p-3">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-8 w-8 rounded-sm">
                            <AvatarImage src={item.avatar} alt={item.author} />
                            <AvatarFallback className="rounded-sm bg-muted text-xs">
                              {item.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Typography variant="small" className="font-semibold text-foreground">
                                {item.author}
                              </Typography>
                              <Typography variant="small" className="text-muted-foreground">
                                {item.date}
                              </Typography>
                            </div>
                            <Typography variant="small" className="mt-1 text-muted-foreground">
                              {item.content}
                            </Typography>
                            <div className="mt-2 flex items-center gap-2">
                              <Button type="button" variant="outline" size="sm" className="rounded-sm">
                                Like ({item.likes})
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-sm"
                                onClick={() => handleReplyClick(item.id, item.author)}
                              >
                                Reply
                              </Button>
                            </div>

                            {item.replies.length > 0 ? (
                              <div className="mt-3 grid gap-2 border-l border-border pl-3">
                                {item.replies.map((reply) => (
                                  <Card key={reply.id} className="rounded-sm border-border p-2.5">
                                    <div className="flex items-start gap-2">
                                      <Avatar className="h-7 w-7 rounded-sm">
                                        <AvatarImage src={reply.avatar} alt={reply.author} />
                                        <AvatarFallback className="rounded-sm bg-muted text-[10px]">
                                          {reply.author.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <Typography
                                            variant="small"
                                            className="font-semibold text-foreground"
                                          >
                                            {reply.author}
                                          </Typography>
                                          <Typography variant="small" className="text-muted-foreground">
                                            {reply.date}
                                          </Typography>
                                        </div>
                                        <Typography variant="small" className="mt-1 text-muted-foreground">
                                          {reply.content}
                                        </Typography>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {!githubAuthed ? (
                    <Card className="rounded-sm border-border p-3">
                      <Typography variant="small" className="text-muted-foreground">
                        You need to sign in with GitHub before posting comments.
                      </Typography>
                      <Button
                        type="button"
                        className="mt-2 rounded-sm"
                        onClick={() => setGithubAuthed(true)}
                      >
                        Continue with GitHub
                      </Button>
                    </Card>
                  ) : null}

                  {replyTo ? (
                    <Card className="rounded-sm border-border p-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Typography variant="small" className="text-muted-foreground">
                          Replying to {replyTo.author}
                        </Typography>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-sm"
                          onClick={() => setReplyTo(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  ) : null}

                  <Card className="rounded-sm border-border p-3">
                    <Textarea
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder={githubAuthed ? "Write your comment..." : "Sign in with GitHub first"}
                      className="min-h-24 rounded-sm"
                      disabled={!githubAuthed}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="button"
                        className="rounded-sm"
                        onClick={handleSubmitComment}
                        disabled={!githubAuthed || !draft.trim()}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <section className="space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <Typography variant="h3" className="mt-6">
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography variant="large" className="mt-4 text-foreground">
                    {children}
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography variant="p" className="text-sm leading-relaxed">
                    {children}
                  </Typography>
                ),
                li: ({ children }) => (
                  <li className="ml-5 list-disc text-sm leading-relaxed text-foreground">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-red-600 pl-3 text-sm text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="my-3 overflow-x-auto rounded-sm border border-border">
                    <table className="min-w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-muted/40">{children}</thead>,
                tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>
                ),
                td: ({ children }) => <td className="px-3 py-2 align-top text-foreground">{children}</td>,
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className ?? "");
                  const codeText = String(children).replace(/\n$/, "");
                  const language = match?.[1] ?? "";

                  if (!match) {
                    return (
                      <code className="rounded-sm bg-muted px-1.5 py-0.5 text-[13px]">
                        {children}
                      </code>
                    );
                  }

                  if (language === "mermaid") {
                    return <MermaidBlock chart={codeText} />;
                  }

                  return (
                    <SyntaxHighlighter
                      language={language}
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: "0.25rem",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                      showLineNumbers
                    >
                      {codeText}
                    </SyntaxHighlighter>
                  );
                },
              }}
            >
              {post.markdown}
            </ReactMarkdown>
          </section>
        </article>
      </div>
    </>
  );
}
