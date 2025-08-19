"use client";

import { useEffect } from "react";
import { useUser, UserProfile, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";

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

  return (
    <div className="my-6 md:px-10 lg:px-32">
      <h2 className="text-2xl font-bold py-3">Profile</h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building className="h-5 w-5" />}
          url="/dashboard/listing"
        >
          MY LISTING  
        </UserButton.UserProfilePage>
      </UserProfile>

    </div>
  );
}
