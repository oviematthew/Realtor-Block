"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import formatPrice from "@/lib/formatPrice";
import capitalizeText from "@/lib/capitalizeText";
import getTimeAgo from "@/lib/getTimeAgo";
import Image from "next/image";
import { Button } from "@/@/components/ui/button";
import { toast } from "sonner";

export default function AgentDetailPage() {
  const params = useParams();
  console.log("Params from URL:", params);

  // 👇 decodes encoded email o decoded e.g james@gmail.com will be encoded to james%40@gmail.com
const agentEmail = params.agentEmail ? decodeURIComponent(params.agentEmail) : null;


  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!agentEmail) return; // wait until param exists
    fetchListings();
  }, [agentEmail]);

  async function fetchListings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("createdBy", agentEmail)
      .eq("active", true);

    console.log("Supabase response:", { data, error });

    if (error) {
      toast.error("Failed to fetch listings.", { description: error.message });
    } else {
      setListings(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <p className="p-10 text-center">Loading listings...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-6 text-brand">
          Listings By {agentEmail}
        </h1>

        <Button asChild className="ml-auto bg-brand text-white">
          <Link href={`mailto:${agentEmail}`} className="flex items-center">
            Contact
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <Link
              className="hover:opacity-90 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
              href={`/view-listing/${listing.id}`}
              key={listing.id}
            >
              <div className="listing-item shadow-sm">
                <Image
                  src={
                    listing.listingImages[0]?.url ||
                    "/media/placeholder-image.svg"
                  }
                  alt={`Apartment For Rent at: ${listing.address}`}
                  width={300}
                  height={200}
                  className="object-cover w-full h-[250px] rounded-lg rounded-b-none"
                />
                <div className="content bg-white rounded-lg rounded-t-none border-2 border-gray-50 p-2 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-brand">
                      ${formatPrice(listing.price)}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        listing.type === "rent"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {capitalizeText(listing.type)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-2">
                    {listing.propertyType}
                  </p>
                  <div className="flex items-center mb-2">
                    <p className="text-sm text-gray-400">
                      {getTimeAgo(listing.created_at)}
                    </p>
                    <span className="mx-2 text-gray-400">|</span>
                    <div className="flex items-start gap-3">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {listing.bedroom} {listing.bedroom > 1 ? "Beds" : "Bed"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        {listing.bathroom}{" "}
                        {listing.bathroom > 1 ? "Baths" : "Bath"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                    {listing.address}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No listings found for this agent.</p>
        )}
      </div>
    </div>
  );
}
