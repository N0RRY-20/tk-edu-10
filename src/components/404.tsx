"use client"; // jika mau pakai interaktivitas, optional

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Button
        variant="outline"
        onClick={() => router.push("/")} // kembali ke home
        className="px-6 py-2"
      >
        Kembali ke Beranda
      </Button>
    </div>
  );
}
