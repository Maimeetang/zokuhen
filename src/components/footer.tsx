import Link from "next/link";

const quickLinks = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/browse/anime", label: "ค้นหาอนิเมะ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-900 bg-blue-950 text-gray-300 mt-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 md:flex-row md:justify-between md:px-8">
        <div className="flex max-w-sm flex-col gap-3">
          <span className="bg-linear-to-r from-pink-400 to-violet-400 bg-clip-text text-xl font-bold text-transparent">
            Zokuhen
          </span>
          <p className="text-sm leading-relaxed text-gray-300">
            เว็บไซต์สำหรับค้นหาและติดตามภาคต่อของอนิเมะ
            ช่วยให้คุณไม่พลาดซีซันหรือภาคต่อที่กำลังจะออก
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-blue-900">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-gray-300 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} Zokuhen. สงวนลิขสิทธิ์.</p>
          <p>
            ข้อมูลอนิเมะจาก{" "}
            <a
              href="https://myanimelist.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              MyAnimeList
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
