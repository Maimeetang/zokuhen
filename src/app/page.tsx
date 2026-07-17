import AnimeRelations from "@/components/anime/relations/anime-relations";
import AnimeRelationsCarousel from "@/components/anime/relations/anime-relations-carousel";
import AnimeRelationsSkeleton from "@/components/anime/relations/anime-relations-skeleton";
import Link from "next/link";
import { Suspense } from "react";

const features = [
  {
    title: "ค้นหาอนิเมะ",
    description: "ค้นหาด้วยชื่ออังกฤษ โรมันจิ หรือภาษาญี่ปุ่นได้ทันที",
  },
  {
    title: "ดูความสัมพันธ์",
    description: "ตรวจสอบภาคก่อน ภาคต่อ และเรื่องที่เกี่ยวข้องในแผนภาพเดียว",
  },
  {
    title: "ติดตามภาคต่อ",
    description: "รู้ว่าเรื่องที่คุณดูมีภาคต่อหรือซีซันใหม่หรือไม่",
  },
];

const animes = [
  {
    title: "Fate/stay night",
    id: "356",
  },
  {
    title: "Bakemonogatari",
    id: "5081",
  },
  {
    title: "Mahou Shoujo Madoka★Magica",
    id: "9756",
  },
  {
    title: "Kidou Senshi Gundam",
    id: "80",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-14 px-5 py-16 md:gap-20 md:py-24">
        <section className="flex flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-cyan-600 shadow-sm backdrop-blur-sm">
            ค้นหาภาคต่ออนิเมะได้ง่ายๆ
          </span>

          <h1 className="max-w-3xl bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl lg:text-6xl py-3">
            ค้นหาภาคต่อของอนิเมะได้ที่ Zokuhen
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
            ไม่ต้องเดาว่าเรื่องที่ดูจบแล้วมีภาคต่อหรือเปล่า
            ค้นหาแล้วดูความสัมพันธ์ของเรื่องได้ในคลิกเดียว
          </p>

          <Link
            href="/browse/anime"
            scroll={false}
            className="mt-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-10 py-3.5 text-lg font-bold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-105"
          >
            เริ่มค้นหาอนิเมะเลย
          </Link>
        </section>

        <section className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-3 rounded-md bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <h2 className="font-bold text-gray-800">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mx-auto w-full">
          <Suspense fallback={<AnimeRelationsSkeleton />}>
            <AnimeRelationsCarousel animes={animes} intervalMs={10_000}>
              {animes.map((anime) => (
                <AnimeRelations
                  key={anime.id}
                  id={anime.id}
                  height={60}
                  scrollIntoView={false}
                />
              ))}
            </AnimeRelationsCarousel>
          </Suspense>
        </section>
      </div>
    </div>
  );
}
