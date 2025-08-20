"use client";

import { useEffect, useState } from "react";
import { useUser, UserProfile, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import UserListing from '../_components/UserListing';
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
    // Fetch user listings from the DB
    const {data, error} = await supabase
      .from('listing')
      .select('*, listing_images(url, listing_id)')
      .eq('createdBy', user?.primaryEmailAddress.emailAddress);

    if (error) {
      toast.error('Error fetching user listings:', error.message);
      setListings([]);
    }else{
      setListings(data);
      toast.success('User listings fetched successfully!');
    }
  }

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Access denied.</p>;

  return (
    <div className="my-6 md:px-10 lg:px-32">
      <UserProfile>
        {/* Adds extra button on user profile with custom url of your choice - No need to add a route for this url */}
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building className="h-4 w-4" />}
          url="/listing"
        >
          <UserListing listings={listings} />
        </UserButton.UserProfilePage>
      </UserProfile>

    </div>
  );
}
