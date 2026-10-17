import Image from "next/image";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import {
  getProjectFolderPath,
  type ProjectFolder,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";

const PAPER_LAYOUT = [
  "left-[4%] top-[9%] -rotate-6 group-hover:-translate-y-[15%] group-hover:-rotate-[9deg]",
  "left-1/4 top-[2%] z-[1] rotate-1 group-hover:-translate-y-[22%]",
  "right-[4%] top-[9%] rotate-6 group-hover:-translate-y-[14%] group-hover:rotate-[9deg]",
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
      className="group block rounded-2xl text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4"
    >
      <article className="relative aspect-[4/3] w-full [perspective:1000px] sm:aspect-[4/5]">
        <div
          aria-hidden="true"
          className="project-folder-tab absolute left-[5%] top-0 h-[24%] w-[47%] rounded-t-[1.1rem] border border-b-0 shadow-[0_-8px_30px_rgba(220,38,38,0.15)] transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] group-hover:-translate-y-1"
        />
        <div
          aria-hidden="true"
          className="project-folder-back absolute inset-x-0 bottom-0 top-[12%] rounded-[1.35rem] border shadow-[0_18px_45px_rgba(220,38,38,0.16)] transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] group-hover:-translate-y-1"
        />

        <div aria-hidden="true" className="absolute inset-x-[8%] bottom-[36%] top-[18%]">
          {previews.map((project, index) => (
            <div
              key={project.id}
              className={`absolute aspect-[4/3] w-[50%] overflow-hidden rounded-lg border-2 border-white/90 bg-white shadow-[0_12px_25px_rgba(69,10,10,0.2)] transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] dark:border-zinc-800 dark:bg-zinc-950 ${
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

        <div
          className={`absolute inset-x-0 bottom-0 z-10 flex min-h-[58%] origin-bottom flex-col justify-between gap-2 overflow-hidden rounded-[1.35rem] border p-3 text-white shadow-[0_18px_45px_rgba(127,29,29,0.18)] transition-[transform,box-shadow] duration-500 ease-[var(--poyraz-motion-ease-out)] group-hover:[transform:rotateX(-7deg)_translateY(-2px)] group-hover:shadow-[0_24px_55px_rgba(127,29,29,0.26)] sm:p-4 ${
            active
              ? "project-folder-front project-folder-front-active ring-2 ring-red-600 ring-offset-2"
              : "project-folder-front"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-14 size-32 rounded-full border-[18px] border-white/10"
          />

          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-flex size-8 items-center justify-center rounded-xl border border-white/20 bg-white/12 text-white shadow-inner shadow-white/10 backdrop-blur-sm sm:size-9"
            >
              <Icon icon={folder.icon} width={18} height={18} aria-hidden="true" />
            </span>
            <span className="rounded-full border border-white/20 bg-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
              <span className="tabular-nums">{folder.items.length}</span> {countLabel}
            </span>
          </div>

          <div className="relative min-w-0">
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
              /projects/{folder.slug}
            </span>
            <h3 className="flex items-center gap-1.5 text-base font-bold leading-tight tracking-[-0.025em] md:text-lg">
              <span className="truncate">{title}</span>
              <Icon
                icon="mdi:arrow-right"
                width={17}
                height={17}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </h3>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/72">
              {description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
