"use client";

import { useMemo, useState } from "react";
import type { GithubContributionDay } from "@/lib/project-feeds";

const CELL_SIZE = 10;
const CELL_GAP = 2;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const GRID_LEFT = 27;
const GRID_TOP = 20;
const GRAPH_HEIGHT = 104;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const LEVEL_CLASSES: Record<GithubContributionDay["level"], string> = {
  0: "fill-zinc-200 dark:fill-zinc-800",
  1: "fill-[#ff7373]",
  2: "fill-[#ff5959]",
  3: "fill-[#dc2626]",
  4: "fill-[#b01e1e]",
};

type ContributionGraphLabels = {
  calendar: string;
  unavailable: string;
  none: string;
  singular: string;
  plural: string;
};

type PositionedDay = GithubContributionDay & {
  dayIndex: number;
  weekIndex: number;
  x: number;
  y: number;
};

type ActiveDay = PositionedDay & {
  label: string;
};

function parseDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export function GithubContributionGraph({
  days,
  labels,
  locale,
}: {
  days: GithubContributionDay[];
  labels: ContributionGraphLabels;
  locale: string;
}) {
  const [activeDay, setActiveDay] = useState<ActiveDay | null>(null);

  const graph = useMemo(() => {
    if (days.length === 0) return null;

    const firstDate = parseDate(days[0].date);
    const positionedDays: PositionedDay[] = days.map((day) => {
      const date = parseDate(day.date);
      const weekIndex = Math.floor(
        (date.getTime() - firstDate.getTime()) / (7 * DAY_IN_MS),
      );
      const dayIndex = date.getUTCDay();

      return {
        ...day,
        dayIndex,
        weekIndex,
        x: GRID_LEFT + weekIndex * CELL_STEP,
        y: GRID_TOP + dayIndex * CELL_STEP,
      };
    });
    const weekCount =
      Math.max(...positionedDays.map((day) => day.weekIndex)) + 1;
    const width = GRID_LEFT + weekCount * CELL_STEP + CELL_STEP;
    const monthFormatter = new Intl.DateTimeFormat(
      locale === "tr" ? "tr-TR" : "en-US",
      { month: "short", timeZone: "UTC" },
    );
    const dateFormatter = new Intl.DateTimeFormat(
      locale === "tr" ? "tr-TR" : "en-US",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
    );
    const months: Array<{ label: string; x: number }> = [];
    let previousMonth = firstDate.getUTCMonth();

    positionedDays.forEach((day, index) => {
      const date = parseDate(day.date);
      const month = date.getUTCMonth();

      if (index > 0 && month !== previousMonth) {
        months.push({
          label: monthFormatter.format(date).replace(".", ""),
          x: day.x,
        });
      }

      previousMonth = month;
    });

    return { positionedDays, months, width, dateFormatter };
  }, [days, locale]);

  if (!graph) {
    return (
      <div className="flex min-h-28 items-center justify-center text-sm text-muted-foreground">
        {labels.unavailable}
      </div>
    );
  }

  const weekdayLabels =
    locale === "tr"
      ? [
          { index: 1, label: "Pzt" },
          { index: 3, label: "Çar" },
          { index: 5, label: "Cum" },
        ]
      : [
          { index: 1, label: "Mon" },
          { index: 3, label: "Wed" },
          { index: 5, label: "Fri" },
        ];

  function getTooltipLabel(day: GithubContributionDay) {
    const date = graph?.dateFormatter.format(parseDate(day.date)) ?? day.date;

    if (day.count === 0) return `${date}: ${labels.none}`;

    return `${date}: ${day.count} ${
      day.count === 1 ? labels.singular : labels.plural
    }`;
  }

  const tooltipX = activeDay
    ? Math.max(100, Math.min(graph.width - 100, activeDay.x + CELL_SIZE / 2))
    : 0;
  const tooltipBelow = Boolean(activeDay && activeDay.y < 48);

  return (
    <div className="overflow-x-auto rounded-sm">
      <div
        className="relative min-w-[740px]"
        style={{ aspectRatio: `${graph.width} / ${GRAPH_HEIGHT}` }}
      >
        <svg
          viewBox={`0 0 ${graph.width} ${GRAPH_HEIGHT}`}
          aria-label={labels.calendar}
          role="grid"
          className="absolute inset-0 h-full w-full"
          onMouseLeave={() => setActiveDay(null)}
        >
          {weekdayLabels.map((day) => (
            <text
              key={day.index}
              x="0"
              y={GRID_TOP + day.index * CELL_STEP + 8}
              className="fill-muted-foreground text-[9px]"
            >
              {day.label}
            </text>
          ))}

          {graph.months.map((month) => (
            <text
              key={`${month.label}-${month.x}`}
              x={month.x}
              y="10"
              className="fill-muted-foreground text-[10px]"
            >
              {month.label}
            </text>
          ))}

          {Array.from({ length: 7 }, (_, dayIndex) => (
            <g key={dayIndex} role="row">
              {graph.positionedDays
                .filter((day) => day.dayIndex === dayIndex)
                .map((day) => {
                  const label = getTooltipLabel(day);

                  return (
                    <rect
                      key={day.date}
                      x={day.x}
                      y={day.y}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx="1"
                      role="gridcell"
                      tabIndex={0}
                      aria-label={label}
                      className={`${LEVEL_CLASSES[day.level]} cursor-default outline-none transition-opacity hover:opacity-75 focus-visible:stroke-foreground focus-visible:stroke-2`}
                      onMouseEnter={() =>
                        setActiveDay({ ...day, label })
                      }
                      onFocus={() => setActiveDay({ ...day, label })}
                      onBlur={() => setActiveDay(null)}
                    />
                  );
                })}
            </g>
          ))}
        </svg>

        {activeDay ? (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 max-w-56 -translate-x-1/2 rounded-sm border border-border bg-popover px-2 py-1 text-center text-xs text-popover-foreground shadow-md"
            style={{
              left: `${(tooltipX / graph.width) * 100}%`,
              top: `${
                ((activeDay.y + (tooltipBelow ? CELL_SIZE + 3 : -3)) /
                  GRAPH_HEIGHT) *
                100
              }%`,
              transform: tooltipBelow
                ? "translateX(-50%)"
                : "translate(-50%, -100%)",
            }}
          >
            {activeDay.label}
          </div>
        ) : null}
      </div>
    </div>
  );
}
