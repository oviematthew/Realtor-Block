"use client";

import React, { useEffect, useState } from "react";
import Listing from "./_components/Listing";
import GoogleMapView from "./_components/GoogleMapView";
import { supabase } from "../utils/supabase/client";
import { toast } from "sonner";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [inputAddress, setInputAddress] = useState("");
  const [searchedAddress, setSearchedAddress] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState("");
  const [type, setType] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  //  Search Function
  const handleSearchClick = async () => {
    if (!inputAddress) return;

    setSearchPerformed(true);
    setSearchedAddress(inputAddress);

    setLoading(true);

    const addressQuery = inputAddress.split(",")[0].split(" ")[0]; 

    let query = supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      // .like("address", "%" + inputAddress + "%")
      .like("address", "%" + addressQuery + "%")
      .order("created_at", { ascending: false });

    setLoading(false);
    if (homeType) {
      query = query.eq("propertyType", homeType);
    }
    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

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
  }, []);

  async function getListings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      // .eq("type", type)
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      toast.error("Error fetching listings.");
      return;
    }

    setListings(data);
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      libraries={["places"]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
        {/* Left side - scrollable */}
        <div>
          <Listing
            listings={listings}
            loading={loading}
            handleSearchCLick={handleSearchClick}
            searchedAddress={inputAddress}
            setSearchedAddress={setInputAddress}
            searchPerformed={searchPerformed}
            lastSearchedAddress={searchedAddress}
            setBedCount={setBedCount}
            setBathCount={setBathCount}
            setParkingCount={setParkingCount}
            setHomeType={setHomeType}
            setType={setType}
            setCoordinates={setCoordinates}
            setSearchPerformed={setSearchPerformed}
            getListings={getListings}
          />
        </div>

        {/* Right side - fixed map */}
        <div className="hidden lg:block">
          <div className="fixed top-[100px] right-0 w-1/2 p-2">
            <GoogleMapView coordinates={coordinates} />
          </div>
        </div>
      </div>
    </LoadScript>
  );

}
