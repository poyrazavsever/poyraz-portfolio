"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "poyraz-ui/molecules";
import { BOOKMARKS } from "@/data/bookmarks";
import { certificates } from "@/data/certificates";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";

const ABOUT_TEXT =
  "Since I was introduced to software in middle school, I've been trying to learn and improve continuously. During high school, my enthusiasm for learning grew and I had the opportunity to explore various technologies in web development. Towards the end of high school, I stepped into the mobile world. Currently, I'm actively creating, developing, and most importantly, still learning.";

const CERTIFICATE_PREVIEW = certificates.slice(0, 4);

export function AboutContent() {
  return (
    <section className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-sm border-border p-4">
          <Typography variant="p" className="text-sm leading-relaxed text-muted-foreground">
            {ABOUT_TEXT}
          </Typography>
        </Card>

        <div>
          <div className="grid gap-2">
            {EDUCATION.map((item) => (
              <Card key={item.id} className="rounded-sm border-border p-3">
                <Typography variant="large" className="text-base leading-tight">
                  {item.title}
                </Typography>
                <Typography variant="small" className="mt-0.5 text-muted-foreground">
                  {item.institution}
                </Typography>
                <Typography variant="small" className="mt-1 text-red-600">
                  {item.period}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:items-start">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-left"
              aria-label="Open all certificates"
            >
              <Card className="rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
                <div className="grid grid-cols-2 gap-2">
                  {CERTIFICATE_PREVIEW.map((item) => (
                    <div key={item.name} className="relative aspect-4/3 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xl p-4">
            <SheetTitle>All Certificates</SheetTitle>
            <div className="mt-4 grid max-h-[90dvh] gap-3 overflow-y-auto pr-1">
              {certificates.map((item) => (
                <Card key={`${item.name}-${item.date}`} className="rounded-sm border-border p-3">
                  <div className="flex gap-3">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Typography variant="large" className="leading-tight">
                        {item.name}
                      </Typography>
                      <Typography variant="small" className="text-muted-foreground">
                        {item.organization}
                      </Typography>
                      <Typography variant="small" className="text-red-600">
                        {item.date}
                      </Typography>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="h-full">
          <div className="grid gap-2">
            {EXPERIENCE.map((item) => (
              <Card key={item.id} className="rounded-sm border-border p-3">
                <Typography variant="large" className="text-base leading-tight">
                  {item.role}
                </Typography>
                <Typography variant="small" className="mt-0.5 text-muted-foreground">
                  {item.company}
                </Typography>
                <Typography variant="small" className="mt-1 text-red-600">
                  {item.period}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/about/references" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              References
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              Open the full reference list in a dedicated detail page.
            </Typography>
          </Card>
        </Link>

        <Link href="/about/volunteer-community" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              Volunteer & Community
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              Timeline and contribution details in a separate detail page.
            </Typography>
          </Card>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-left"
              aria-label="Open bookmarks"
            >
              <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
                <Typography variant="large" className="text-base leading-tight">
                  Bookmark
                </Typography>
                <Typography variant="small" className="mt-1 text-muted-foreground">
                  Quick access links in a sheet panel.
                </Typography>
              </Card>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xl p-4">
            <SheetTitle>Bookmarks</SheetTitle>
            <div className="mt-4 grid max-h-[90dvh] gap-3 overflow-y-auto pr-1">
              {BOOKMARKS.map((item) => (
                <Card key={item.id} className="rounded-sm border-border p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography variant="large" className="leading-tight">
                      {item.title}
                    </Typography>
                    <Badge variant="outline" className="rounded-sm">
                      {item.tag}
                    </Badge>
                  </div>
                  <Typography variant="small" className="mt-1 text-muted-foreground">
                    {item.description}
                  </Typography>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm text-red-600 hover:underline"
                  >
                    {item.href.replace("https://", "")}
                  </Link>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
