import Image from "next/image";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { Card } from "poyraz-ui/atoms";
import {
  getProjectFolderPath,
  type ProjectFolder,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";

const PAPER_LAYOUT = [
  "left-[4%] top-[8%] -rotate-4 group-hover:-translate-y-[10%] group-hover:-rotate-6",
  "left-[27%] top-[2%] z-[1] group-hover:-translate-y-[13%]",
  "right-[4%] top-[8%] rotate-4 group-hover:-translate-y-[10%] group-hover:rotate-6",
];

type ProjectFolderCardProps = {
  folder: ProjectFolder;
  locale: string;
  active?: boolean;
  priority?: boolean;
};

export function ProjectFolderCard({
  folder,
  locale,
  active = false,
  priority = false,
}: ProjectFolderCardProps) {
  const title = getLocalizedValue(folder.title, locale);
  const description = getLocalizedValue(folder.description, locale);
  const previews = folder.items.slice(0, 3);

  return (
    <Link
      href={getProjectFolderPath(folder.slug)}
      aria-current={active ? "page" : undefined}
      className="group block rounded-sm text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="relative aspect-[5/4] w-full">
        <div
          aria-hidden="true"
          className={`project-folder-shell absolute left-0 top-0 h-[14%] w-[42%] rounded-t-sm border border-b-0 ${
            active ? "project-folder-shell-active" : ""
          }`}
        />
        <div
          aria-hidden="true"
          className={`project-folder-shell absolute inset-x-0 bottom-0 top-[13%] rounded-sm rounded-tl-none border ${
            active ? "project-folder-shell-active" : ""
          }`}
        />

        <div aria-hidden="true" className="absolute inset-x-[5%] bottom-[30%] top-[20%]">
          {previews.map((project, index) => (
            <div
              key={project.id}
              className={`absolute aspect-[4/3] w-[46%] overflow-hidden rounded-sm border border-border bg-background shadow-sm transition-transform duration-300 ease-[var(--poyraz-motion-ease-out)] ${
                PAPER_LAYOUT[previews.length === 1 ? 1 : index] ?? ""
              }`}
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 767px) 110px, 145px"
                preload={priority && index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <Card
          className={`absolute inset-x-0 bottom-0 z-10 flex min-h-[46%] flex-col justify-center rounded-sm border bg-background/95 p-3 backdrop-blur-sm transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 ${
            active ? "border-red-600/50" : "border-border group-hover:border-red-600/35"
          }`}
        >
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-sm border border-red-600/20 bg-red-600/5 text-red-600">
              <Icon icon={folder.icon} width={14} height={14} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold leading-tight sm:text-[15px]">
                {title}
              </h3>
              <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-muted-foreground sm:line-clamp-2 sm:text-xs">
                {description}
              </p>
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
}
