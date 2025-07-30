"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { Button } from "../../@/components/ui/button";

export default function Listing({ type }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListing();
  }, []);

  async function getListing() {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("active", true)
      .eq("type", type);

    if (data) {
      setListings(data);
    } else if (error) {
      toast.error("Error fetching listings:");
    }
  }

  return (
    <>
      <div>
        {listings.map((listing) => (
          <div key={listing.id} className="listing-item">
            <Image
              src={listing.listingImages[0]?.url || "/placeholder.png"}
              alt={listing.title}
              width={300}
              height={200}
              className="object-cover"
            />
            <h2>{listing.address}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <Link href={`/view-listing/${listing.id}`}>
              <Button>View Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
