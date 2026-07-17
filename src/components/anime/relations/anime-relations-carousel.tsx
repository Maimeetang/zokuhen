"use client";

import { useEffect, useState, type ReactNode } from "react";

type Anime = { id: string; title: string };

const FADE_MS = 300;

export default function AnimeRelationsCarousel({
  animes,
  children,
  intervalMs = 10_000,
}: {
  animes: Anime[];
  children: ReactNode;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const slides = Array.isArray(children) ? children : [children];

  const fadeClass = visible
    ? "translate-y-0 opacity-100 blur-0"
    : "-translate-y-2 opacity-0 blur-sm";

  useEffect(() => {
    if (animes.length <= 1) return;

    let fadeTimeout: ReturnType<typeof setTimeout>;

    const timer = setInterval(() => {
      setVisible(false);

      fadeTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % animes.length);
        setVisible(true);
      }, FADE_MS);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimeout);
    };
  }, [animes.length, intervalMs]);

  return (
    <div className="flex flex-col">
      <p
        className={`min-h-6 ml-1 text-gray-500 transition-all duration-300 ease-out ${fadeClass}`}
      >
        {animes[index]?.title}
      </p>
      <div className={`transition-all duration-300 ease-out ${fadeClass}`}>
        {slides[index]}
      </div>
    </div>
  );
}
