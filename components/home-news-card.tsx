import Image from "next/image";
import { Badge, Card } from "poyraz-ui/atoms";
import { Link } from "@/i18n/routing";

type HomeNewsCardProps = {
  category: string;
  title: string;
  date: string;
  image: string;
  href: string;
  priority?: boolean;
};

export function HomeNewsCard({
  category,
  title,
  date,
  image,
  href,
  priority = false,
}: HomeNewsCardProps) {
  return (
    <Link href={href} className="block w-72 shrink-0 text-inherit no-underline">
      <Card
        variant="interactive"
        className="group h-fit self-start overflow-hidden rounded-sm border-border"
      >
        <div className="flex min-h-28">
          <div className="relative w-28 shrink-0 overflow-hidden border-r border-border">
            <Image
              src={image}
              alt=""
              fill
              sizes="112px"
              preload={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-2 p-4">
            <Badge size="sm" variant="outline">
              {category}
            </Badge>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
              {title}
            </h3>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
