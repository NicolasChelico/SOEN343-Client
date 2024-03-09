"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to the login page
    router.push("/Login");
  }, [router]);

  return (
    <div className="flex flex-1 h-dvh justify-center items-center">
      {/* You can show a loading message or spinner here while redirecting */}
      <p>Redirecting to login...</p>
    </div>
  );
}
