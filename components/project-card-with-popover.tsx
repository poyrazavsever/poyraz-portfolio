"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "poyraz-ui/molecules";
import { Link } from "@/i18n/routing";

type ProjectCardWithPopoverProps = {
  title: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
  technologies: string[];
  architecture: string;
  technologiesLabel: string;
  architectureLabel: string;
  className?: string;
  triggerClassName?: string;
  priority?: boolean;
};

export function ProjectCardWithPopover({
  title,
  description,
  image,
  badge,
  href,
  caseStudyHref,
  caseStudyLabel,
  technologies,
  architecture,
  technologiesLabel,
  architectureLabel,
  className,
  triggerClassName,
  priority = false,
}: ProjectCardWithPopoverProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const showPopover = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const card = (
    <Card
      variant="interactive"
      className={`group relative aspect-[4/3] overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 767px) 224px, 224px"
        preload={priority}
        fetchPriority={priority ? "high" : "auto"}
        className="object-cover transition-transform duration-500 ease-[var(--poyraz-motion-ease-out)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/20 to-transparent transition-opacity group-hover:opacity-90" />
      {badge ? (
        <Badge className="absolute left-3 top-3 z-10">{badge}</Badge>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-primary-foreground">
        <h3 className="font-semibold leading-tight">{title}</h3>
        {description ? (
          <p className="mt-1 line-clamp-2 text-xs opacity-80">{description}</p>
        ) : null}
      </div>
    </Card>
  );
  const triggerClasses = `block ${triggerClassName ?? ""} text-inherit outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {caseStudyHref ? (
          <Link
            href={caseStudyHref}
            className={`${triggerClasses} no-underline`}
            onPointerEnter={showPopover}
            onPointerLeave={scheduleClose}
            onFocus={showPopover}
            onBlur={scheduleClose}
          >
            {card}
          </Link>
        ) : href ? (
          <a
            href={href}
            className={`${triggerClasses} no-underline`}
            onPointerEnter={showPopover}
            onPointerLeave={scheduleClose}
            onFocus={showPopover}
            onBlur={scheduleClose}
          >
            {card}
          </a>
        ) : (
          <button
            type="button"
            className={`${triggerClasses} border-0 bg-transparent p-0 text-left`}
            onPointerEnter={showPopover}
            onPointerLeave={scheduleClose}
            onFocus={showPopover}
            onBlur={scheduleClose}
          >
            {card}
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        radius="sm"
        padding="sm"
        className="w-80 max-w-[calc(100vw-1rem)]"
        onPointerEnter={showPopover}
        onPointerLeave={scheduleClose}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="space-y-3">
          <Typography variant="large" className="text-sm leading-tight">
            {title}
          </Typography>

          <div className="space-y-1.5">
            <Typography
              variant="small"
              className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {technologiesLabel}
            </Typography>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((technology) => (
                <Badge key={technology} size="sm" variant="outline" className="rounded-sm">
                  {technology}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <Typography
              variant="small"
              className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {architectureLabel}
            </Typography>
            <Typography variant="small" className="text-xs leading-relaxed text-muted-foreground">
              {architecture}
            </Typography>
          </div>

          {caseStudyHref && caseStudyLabel ? (
            <Link
              href={caseStudyHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-t border-border pt-3 text-xs font-semibold text-foreground transition-colors hover:text-red-600"
            >
              <span>{caseStudyLabel}</span>
              <Icon icon="mdi:arrow-right" width={15} height={15} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
