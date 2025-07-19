"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import GoogleAddressSearch from "../../_components/GoogleAddressSearch";
import { Button } from "../../../@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../utils/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function AddNewListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace("/sign-in");
    }
  }, [isLoaded, user, router]);

  async function handleAddressSubmit() {
    if (!selectedAddress || !coordinates.latitude || !coordinates.longitude) {
      toast.error("Missing address or coordinates");
      return;
    }

    setLoading(true);

    // Insert the new listing into the database
    // Ensure supabase client is initialized correctly
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          createdBy: user?.primaryEmailAddress?.emailAddress,
          address: selectedAddress,
          coordinates: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        },
      ])
      .select();

    if (data && data.length > 0) {
      const listingId = data[0].id;
      toast.success("Listing added successfully!");
      setLoading(false);

      // ✅ Redirect to the edit page
      router.replace(`/edit-listing/${listingId}`);
    }

    if (error) {
      setLoading(false);
      toast.error("Failed to add listing. Please try again.");
      return;
    }
  }

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
      <h2 className="font-bold text-2xl font-text">Add New Listing</h2>
      <div className="mt-5 w-full max-w-3xl p-10 rounded-lg boder shadow-md flex flex-col items-center">
        <GoogleAddressSearch
          selectedAddress={(value) => setSelectedAddress(value)}
          latitude={(lat) =>
            setCoordinates((prev) => ({ ...prev, latitude: lat }))
          }
          longitude={(lng) =>
            setCoordinates((prev) => ({ ...prev, longitude: lng }))
          }
        />

        <Button
          className="bg-brand hover:bg-brand-dark hover:cursor-pointer font-text text-white mt-5 w-full"
          onClick={handleAddressSubmit}
          disabled={!selectedAddress || loading}
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
}
