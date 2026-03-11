import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card, Typography } from "poyraz-ui/atoms";

const CONTACT_LINKS = [
  {
    id: "email",
    label: "E-posta",
    value: "poyrazavsever@gmail.com",
    href: "mailto:poyrazavsever@gmail.com",
    icon: "mdi:email-outline",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/poyrazavsever",
    href: "https://www.linkedin.com/in/poyrazavsever/",
    icon: "mdi:linkedin",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@poyraz_avsever",
    href: "https://instagram.com/poyraz_avsever",
    icon: "mdi:instagram",
  },
] as const;

export function ContactContent() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {CONTACT_LINKS.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          target={item.id === "email" ? undefined : "_blank"}
          rel={item.id === "email" ? undefined : "noreferrer"}
          className="block"
        >
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground">
              <Icon icon={item.icon} width={18} height={18} />
            </div>
            <Typography variant="large" className="mt-3 text-base leading-tight">
              {item.label}
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              {item.value}
            </Typography>
          </Card>
        </Link>
      ))}
    </section>
  );
}
