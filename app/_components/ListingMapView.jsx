"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";

export default function ListingMapView() {
  useEffect(() => {
    getListing();
  }, []);
  async function getListing() {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .eq("type", "rent");

    if (data) {
      console.log(data);
    } else if (error) {
      console.error("Error fetching listings:", error);
    }
  }
  return <div>ListingmapView</div>;
}
