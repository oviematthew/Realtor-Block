"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PriceFormat from "../../lib/PriceFormat";
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
        <div className="listings grid grid-cols-1 md:grid-cols-2 gap-5">
          {listings.length > 0
            ? listings.map((listing) => (
                <Link
                  className="hover:opacity-90"
                  href={`/view-listing/${listing.id}`}
                >
                  <div key={listing.id} className="listing-item">
                    <Image
                      src={
                        listing.listingImages[0]?.url ||
                        "/media/placeholder-image.svg"
                      }
                      alt={`Apartment For Rent at: ${listing.address}`}
                      width={300}
                      height={200}
                      className="object-cover w-[100%] h-[300px] rounded-lg"
                    />
                    <h2>{listing.address}</h2>
                    <p>{listing.description}</p>
                    <p>${PriceFormat(listing.price)}</p>
                  </div>
                </Link>
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </>
  );
}
