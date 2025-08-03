"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import priceFormat from "../../lib/priceFormat";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { Bath, BedDouble } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import getTimeAgo from "../../lib/getTimeAgo";

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
      .eq("type", type)
      .order("created_at", { ascending: false });

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
                      className="object-cover w-[100%] h-[250px] rounded-lg rounded-b-none"
                    />
                    {/* Bottom card content */}
                    <div className="content bg-white rounded-lg rounded-t-none border-2 border-gray-50 p-2">
                      <div className="bottom-content">
                        <h3 className="font-bold text-lg text-brand">
                          ${priceFormat(listing.price)}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {getTimeAgo(listing.created_at)}
                        </p>

                        <div className="flex items-center gap-5 mb-2">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {listing.bedroom}{" "}
                            {listing.bedroom > 1 ? "Beds" : "Bed"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {listing.bathroom}{" "}
                            {listing.bathroom > 1 ? "Baths" : "Bath"}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {listing.propertyType}
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
                <div key={index} className="rounded-lg animate-pulse bg-white">
                  {/* Image placeholder */}
                  <div className="h-[250px] bg-gray-200 rounded-t-lg" />

                  {/* Text placeholders */}
                  <div className="p-2 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />{" "}
                    {/* Price */}
                    <div className="h-4 bg-gray-200 rounded w-1/3" />{" "}
                    {/* Time ago */}
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />{" "}
                      {/* Beds */}
                      <div className="h-4 bg-gray-200 rounded w-1/4" />{" "}
                      {/* Baths */}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3" />{" "}
                    {/* Property type */}
                    <div className="h-4 bg-gray-200 rounded w-2/3" />{" "}
                    {/* Address */}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
