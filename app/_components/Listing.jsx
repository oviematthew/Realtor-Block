"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import priceFormat from "../../lib/priceFormat";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { Bath, BedDouble } from "lucide-react";
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
                  className="hover:opacity-90  hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
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
                      className="object-cover w-[100%] h-[200px] rounded-lg rounded-b-none"
                    />
                    <div className="content bg-white rounded-lg rounded-t-none border-1 border-gray-100 p-2">
                      <h3 className="font-bold text-lg text-brand">
                        ${priceFormat(listing.price)}
                      </h3>
                      <div className="bottom-content">
                        <div className="flex items-center gap-5 mb-5">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {listing.bedroom}{" "}
                            {listing.bedroom > 1 ? "Beds" : "Bed"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {listing.bathroom}{" "}
                            {listing.bathroom > 1 ? "Baths" : "Bath"}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {listing.area} sqft
                        </p>
                        <p className="text-sm text-gray-500">
                          {listing.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <div
                  key={index}
                  className="h-[250px] bg-gray-200 rounded-lg flex items-center justify-center animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </>
  );
}
