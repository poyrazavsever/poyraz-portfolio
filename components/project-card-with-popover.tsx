"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Typography } from "poyraz-ui/atoms";
import {
  ImageCard,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "poyraz-ui/molecules";

type ProjectCardWithPopoverProps = {
  title: string;
  description: string;
  image: string;
  badge?: string;
  href?: string;
  technologies: string[];
  architecture: string;
  technologiesLabel: string;
  architectureLabel: string;
  className?: string;
  triggerClassName?: string;
};

export function ProjectCardWithPopover({
  title,
  description,
  image,
  badge,
  href,
  technologies,
  architecture,
  technologiesLabel,
  architectureLabel,
  className,
  triggerClassName,
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
    <ImageCard
      image={image}
      title={title}
      description={description}
      badge={badge}
      className={className}
    />
  );
  const triggerClasses = `block ${triggerClassName ?? ""} text-inherit outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {href ? (
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
