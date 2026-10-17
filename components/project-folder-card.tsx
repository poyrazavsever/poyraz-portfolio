import Image from "next/image";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import {
  getProjectFolderPath,
  type ProjectFolder,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";

const PAPER_LAYOUT = [
  "left-[2%] top-[6%] -rotate-6 group-hover:-translate-y-[18%] group-hover:-rotate-[10deg]",
  "left-1/4 top-0 z-[1] rotate-1 group-hover:-translate-y-[24%]",
  "right-[2%] top-[6%] rotate-6 group-hover:-translate-y-[16%] group-hover:rotate-[10deg]",
];

type ProjectFolderCardProps = {
  folder: ProjectFolder;
  locale: string;
  countLabel: string;
  active?: boolean;
  priority?: boolean;
};

export function ProjectFolderCard({
  folder,
  locale,
  countLabel,
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
      <div className="relative aspect-square w-full [perspective:900px]">
        {/* Folder tab and back panel */}
        <div
          aria-hidden="true"
          className={`absolute top-0 left-0 h-[12%] w-[44%] rounded-t-md border border-b-0 transition-colors ${
            active
              ? "border-red-600/40 bg-red-600/10"
              : "border-zinc-300 bg-zinc-200 group-hover:bg-zinc-300/80 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:bg-zinc-700/80"
          }`}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-[11%] bottom-0 rounded-md rounded-tl-none border transition-colors ${
            active
              ? "border-red-600/40 bg-red-600/10"
              : "border-zinc-300 bg-zinc-200 group-hover:bg-zinc-300/80 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:bg-zinc-700/80"
          }`}
        />

        {/* Project previews peeking out of the folder */}
        <div aria-hidden="true" className="absolute inset-x-[5%] top-[19%] bottom-[34%]">
          {previews.map((project, index) => (
            <div
              key={project.id}
              className={`absolute aspect-[4/3] w-[50%] overflow-hidden rounded-sm border border-border bg-background shadow-sm transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] ${
                PAPER_LAYOUT[previews.length === 1 ? 1 : index] ?? ""
              }`}
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 767px) 120px, 160px"
                preload={priority && index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Front panel */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 flex min-h-[50%] origin-bottom flex-col justify-between gap-3 rounded-md border bg-background/95 p-3 backdrop-blur-sm transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] group-hover:[transform:rotateX(-16deg)] md:p-4 ${
            active ? "border-red-600/50" : "border-border"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex size-7 items-center justify-center rounded-sm border transition-colors ${
                active
                  ? "border-red-600/40 text-red-600"
                  : "border-border text-muted-foreground group-hover:text-red-600"
              }`}
            >
              <Icon icon={folder.icon} width={16} height={16} aria-hidden="true" />
            </span>
            <span className="rounded-sm border border-border px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
              {folder.items.length} {countLabel}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="flex items-center gap-1 font-semibold leading-tight">
              <span className="truncate">{title}</span>
              <Icon
                icon="mdi:arrow-right"
                width={15}
                height={15}
                aria-hidden="true"
                className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            </h3>
            <p className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
