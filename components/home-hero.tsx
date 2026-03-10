"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Card, Typography } from "poyraz-ui/atoms";
import { NewsCard } from "poyraz-ui/molecules";
import { HOME_NEWS } from "@/lib/home-news";

export function HomeHero() {
  const [frame, setFrame] = useState<1 | 2>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setFrame((prev) => (prev === 1 ? 2 : 1));
    }, 260);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setFrame(1);
  };

  return (
    <section className="grid gap-3 md:h-65 md:grid-cols-2">
      <div className="grid gap-2 md:grid-rows-3">
        {HOME_NEWS.map((item) => (
          <NewsCard
            key={item.id}
            className="rounded-sm border-border md:h-full"
            category={item.category}
            title={item.title}
            date={item.date}
            image={item.image}
            href={item.href}
          />
        ))}
      </div>

      <Card className="grid grid-cols-[112px_1fr] sm:grid-cols-[168px_1fr] items-stretch gap-2 rounded-sm border-border md:h-full">
        <div className="flex flex-col justify-center gap-1 px-3 py-2">
          <div className="flex items-center gap-1">
            <Typography variant="h2" className="leading-tight">
              Poyraz
            </Typography>
            <Typography variant="h2" secondaryFont className="leading-tight text-red-600">
               Avsever
            </Typography>
          </div>
          <Typography variant="small" className="text-muted-foreground">
            Teknolojiyi keşfeden bir genç. Yazılımı seviyor sanırım. Çok fazla şey yapıyor, takip edin.
          </Typography>
        </div>

        <div className="relative h-full overflow-hidden">
          <div
            className="relative h-full w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={frame === 1 ? "/images/hero1.png" : "/images/hero2.png"}
              alt="Poyraz Avsever"
              width={240}
              height={240}
              className="absolute right-0 bottom-0 h-auto w-20 md:w-48 object-contain"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
