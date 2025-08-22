"use client";

import { useEffect, useState } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import UserListing from "../_components/UserListing";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (user) {
      getUserListings();
    }
  }, [user]);

  async function getUserListings() {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);

    if (error) {
      setListings([]);
    } else {
      setListings(data);
    }
  }

  async function handleDeleteListing(id) {
    const { error } = await supabase.from("listing").delete().eq("id", id).single();

    if (error) {
      toast.error("Error deleting listing");
    } else {
      toast.success("Listing deleted successfully.");
      getUserListings(); // ✅ refresh listings instead of page reload
    }
  }

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Access denied.</p>;

  return (
    <div className="my-6 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <UserProfile
        >
          <UserProfile.Page
            label="My Listings"
            labelIcon={<Building className="h-4 w-4" />}
            url="/listings"
          >
            <UserListing listings={listings} onDelete={handleDeleteListing} />
          </UserProfile.Page>
        </UserProfile>
      </div>
    </div>
  );
}
