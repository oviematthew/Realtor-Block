"use client";

import React, { useEffect, useState } from "react";
import Listing from "./_components/Listing";
import ListingMapView from "./_components/ListingMapView";
import { supabase } from "../utils/supabase/client";
import { toast } from "sonner";

export default function Home() {
  const [type, setType] = useState("rent");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchClick = async () => {
    toast.error("Search not implemented yet.");
  };

  useEffect(() => {
    getListings();
  }, [type]);

  async function getListings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (data) {
      setListings(data);
    } else if (error) {
      toast.error("Error fetching listings.");
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      <div>
        <Listing
          listings={listings}
          loading={loading}
          handleSearchCLick={handleSearchClick}
        />
      </div>
      <div className="map">
        <ListingMapView />
      </div>
    </div>
  );
}
