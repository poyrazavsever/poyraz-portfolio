import Link from "next/link";
import { Card, Typography } from "poyraz-ui/atoms";
import { VOLUNTEER_COMMUNITY_ITEMS } from "@/data/volunteer-community";

export function VolunteerCommunityContent() {
  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <Link
        href="/about"
        className="inline-flex w-fit items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {"<- Hakkımda'ya dön"}
      </Link>

      <div className="grid gap-3">
        {VOLUNTEER_COMMUNITY_ITEMS.map((item) => (
          <Card key={item.id} className="rounded-sm border-border p-4">
            <Typography variant="large" className="text-base leading-tight">
              {item.title}
            </Typography>

            <Typography variant="small" className="mt-2 text-muted-foreground">
              <span className="font-semibold text-foreground">Zaman Çizelgesi:</span> {item.timeline}
            </Typography>

            {item.link ? (
              <Typography variant="small" className="mt-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Bağlantı:</span>{" "}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:underline"
                >
                  {item.link.replace("https://", "")}
                </Link>
              </Typography>
            ) : null}

            <Typography variant="small" className="mt-1 text-muted-foreground">
              <span className="font-semibold text-foreground">Odak:</span> {item.focus}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}
