import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen items-center justify-center gap-4">
        {/* tombol Sign In */}
        <Link href="/signin">
          <Button variant="default">Sign In</Button>
        </Link>

        {/* tombol Sign Up */}
        <Link href="/signup">
          <Button variant="secondary">Sign Up</Button>
        </Link>
      </main>
    </div>
  );
}
