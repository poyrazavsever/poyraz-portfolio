import Image from "next/image";
import { Icon } from "@iconify/react";
import { Link } from "@/i18n/routing";
import { Card } from "poyraz-ui/atoms";
import {
  getProjectFolderPath,
  type ProjectFolder,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";

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
      aria-label={title}
      className="group block rounded-sm text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <article className="relative aspect-square w-full pt-[9%]">
        <div
          aria-hidden="true"
          className="project-folder-tab absolute left-0 top-0 h-[18%] w-[44%] rounded-t-sm border border-b-0"
        />

        <Card
          variant="interactive"
          className={`project-folder-surface absolute inset-x-0 bottom-0 top-[8%] flex flex-col overflow-hidden rounded-sm border p-0 text-white transition-[transform,border-color] duration-300 group-hover:-translate-y-0.5 ${
            active ? "ring-2 ring-red-600 ring-offset-2" : ""
          }`}
        >
          <div className="h-[45%] border-b border-white/20 bg-black/10 p-2">
            <div className="grid h-full grid-cols-3 gap-1">
              {previews.map((project, index) => (
                <div
                  key={project.id}
                  className="relative overflow-hidden rounded-[2px] border border-white/25 bg-white/10"
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 54px, 72px"
                    preload={priority && index === 0}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center p-3">
            <div className="flex min-w-0 items-center gap-2">
              <Icon
                icon={folder.icon}
                width={16}
                height={16}
                aria-hidden="true"
                className="shrink-0 text-white/75"
              />
              <h3 className="truncate text-sm font-semibold leading-tight sm:text-base">
                {title}
              </h3>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/70 sm:text-xs">
              {description}
            </p>
          </div>
        </Card>
      </article>
    </Link>
  );
}
