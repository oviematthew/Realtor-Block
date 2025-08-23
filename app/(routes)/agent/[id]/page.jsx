"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

export default function AgentDetailPage() {
  const { agent } = useParams();


  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(agent)
    fetchListings();
  }, [agent]);

  async function fetchListings() {
    setLoading(true);
    const { data, error } = await supabase
         .from("listing")
         .select("*, listingImages(url, listing_id)")
         .eq("createdBy", agent);
   
       if (error) {
         setListings([]);
       } else {
         setListings(data);
       }

    setLoading(false);
    console.log(data);
  }

  if (loading) {
    return <p className="p-10 text-center">Loading listings...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-6">Listings by {agent}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={
                    listing.listingImages?.[0]?.url ||
                    "/media/placeholder-image.svg"
                  }
                  alt={listing.title || "Listing"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="font-semibold text-lg">{listing.title}</h2>
              <p className="text-sm text-gray-500">{listing.address}</p>
              <p className="font-bold mt-2">${listing.price}</p>
            </div>
          ))
        ) : (
          <p>No listings found for this agent.</p>
        )}
      </div>
    </div>
  );
}
