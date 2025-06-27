"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GoogleAddressSearch from "../../_components/GoogleAddressSearch";
import { Button } from "../../../@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function AddNewListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");

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
      <div className="mt-5 w-full max-w-3xl p-10 rounded-lg boder shadow-md flex flex-col items-center">
        <GoogleAddressSearch />

        <Button
          asChild
          className="bg-brand hover:bg-brand-dark text-white mt-5 w-full"
        >
          <Link href="/add-new-listing">Next</Link>
        </Button>
      </div>
    </div>
  );
}
