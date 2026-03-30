"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "poyraz-ui/molecules";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { BOOKMARKS } from "@/data/bookmarks";
import { certificates } from "@/data/certificates";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";

const ABOUT_TEXT =
  "Ortaokulda yazılımla tanıştığımdan beri sürekli öğrenmeye ve kendimi geliştirmeye çalışıyorum. Lise yıllarında öğrenme hevesim daha da arttı ve web geliştirme tarafında farklı teknolojileri keşfetme fırsatı buldum. Lisenin sonlarına doğru mobil dünyasına da adım attım. Şu an aktif olarak üretiyor, geliştiriyor ve en önemlisi hâlâ öğrenmeye devam ediyorum.";

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
          <StaggerContainer className="grid gap-2">
            {EDUCATION.map((item) => (
              <StaggerItem key={item.id}>
                <Card className="rounded-sm border-border p-3">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:items-start">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-left"
              aria-label="Tüm sertifikaları aç"
            >
              <Card className="rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
                <div className="grid grid-cols-2 gap-2">
                  {CERTIFICATE_PREVIEW.map((item) => (
                    <div
                      key={item.name}
                      className="relative aspect-4/3 overflow-hidden rounded-sm border border-border"
                    >
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
            <SheetTitle>Tüm Sertifikalar</SheetTitle>
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
          <StaggerContainer className="grid gap-2">
            {EXPERIENCE.map((item) => (
              <StaggerItem key={item.id}>
                <Card className="rounded-sm border-border p-3">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/about/references" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              Referanslar
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              Tüm referansları ayrı bir detay sayfasında görüntüle.
            </Typography>
          </Card>
        </Link>

        <Link href="/about/volunteer-community" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              Gönüllülük ve Topluluk
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              Zaman çizelgesi ve katkı detaylarını ayrı bir detay sayfasında incele.
            </Typography>
          </Card>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-left"
              aria-label="Yer imlerini aç"
            >
              <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
                <Typography variant="large" className="text-base leading-tight">
                  Yer İmleri
                </Typography>
                <Typography variant="small" className="mt-1 text-muted-foreground">
                  Hızlı erişim bağlantılarını bir sheet içinde görüntüle.
                </Typography>
              </Card>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xl p-4">
            <SheetTitle>Yer İmleri</SheetTitle>
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
