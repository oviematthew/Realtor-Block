"use client";

import { useEffect } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Access denied.</p>;

  return <UserProfile />;
}
