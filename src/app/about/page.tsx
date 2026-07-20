import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "Zokuhen คือเว็บสำหรับค้นหาและดูความสัมพันธ์ภาคต่อของอนิเมะ",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-16 md:py-24">
      <section className="flex flex-col gap-4 text-center">
        <h1 className="text-blue-600 text-3xl font-extrabold md:text-4xl">
          เกี่ยวกับ Zokuhen
        </h1>
        <p className="text-base leading-relaxed text-left text-gray-600">
          Zokuhen (โซคุเฮน) คือเว็บไซต์สำหรับค้นหาและดูความสัมพันธ์ของอนิเมะ
          ว่าเรื่องที่คุณดูมีภาคก่อน ภาคต่อ หรือเรื่องที่เกี่ยวข้องอะไรบ้าง
        </p>
      </section>

      <section className="rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="font-bold text-blue-600 mb-4 text-2xl">Contact Me</h2>
        <a
          className="flex max-w-fit bg-blue-600 px-5 py-3 rounded-lg items-center"
          href="mailto:zokuhen.contact@gmail.com"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Filled"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-2 fill-current text-white"
          >
            <path d="M23.954,5.542,15.536,13.96a5.007,5.007,0,0,1-7.072,0L.046,5.542C.032,5.7,0,5.843,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6C24,5.843,23.968,5.7,23.954,5.542Z" />
            <path d="M14.122,12.546l9.134-9.135A4.986,4.986,0,0,0,19,1H5A4.986,4.986,0,0,0,.744,3.411l9.134,9.135A3.007,3.007,0,0,0,14.122,12.546Z" />
          </svg>

          <p className="text-sm text-white break-all">
            zokuhen.contact@gmail.com
          </p>
        </a>
      </section>
    </div>
  );
}
