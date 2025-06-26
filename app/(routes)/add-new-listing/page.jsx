"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GoogleAddressSearch from "../../_components/GoogleAddressSearch";

export default function AddNewListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // ✅ Don't render anything until Clerk is loaded
  if (!isLoaded) {
    return <div className="text-center p-10">Loading...</div>;
  }

  // ✅ If user is not logged in, we already redirected – return null
  if (!user) {
    return null;
  }

  // ✅ If user is loaded and logged in, render page
  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl">Add New Listing</h2>
      <div className="mt-5 w-full max-w-md">
        <p className="text-gray-500 mb-2 text-center">
          Enter address you want to list
        </p>
        <GoogleAddressSearch />
      </div>
    </div>
  );
}
