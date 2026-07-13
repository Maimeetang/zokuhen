import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-white p-10 text-gray-500">
      <p>ไม่พบ anime นี้</p>
      <Link href="/browse/anime" className="text-blue-800 hover:underline">
        กลับไปหน้า browse
      </Link>
    </div>
  );
}
