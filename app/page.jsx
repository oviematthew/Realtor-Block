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

  const [inputAddress, setInputAddress] = useState("");
  const [searchedAddress, setSearchedAddress] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchClick = async () => {
    if (!inputAddress) return;

    setSearchPerformed(true);
    setSearchedAddress(inputAddress);

    setLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .like("address", "%" + inputAddress + "%")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      toast.error("Error fetching listings");
      return;
    }

    if (data.length === 0) {
      toast("No listings found with that address");
    }

    setListings(data);
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

    setLoading(false);

    if (error) {
      toast.error("Error fetching listings.");
      return;
    }

    setListings(data);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      <div>
        <Listing
          listings={listings}
          loading={loading}
          handleSearchCLick={handleSearchClick}
          searchedAddress={inputAddress}
          setSearchedAddress={setInputAddress}
          searchPerformed={searchPerformed}
          lastSearchedAddress={searchedAddress}
        />
      </div>
      <div className="map">
        <ListingMapView />
      </div>
    </div>
  );
}
