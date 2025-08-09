"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import priceFormat from "../../../../lib/priceFormat";
import getTimeAgo from "../../../../lib/getTimeAgo";
import capitalizeText from "../../../../lib/capitalizeText";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ViewListingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  

    useEffect(() => {
      if (!id) {
        // Redirect immediately if no id param
        router.replace("/");
        return;
      }
      fetchListing();
    }, [id, router]);

  async function fetchListing() {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("id", id)
      .single();

    setLoading(false);

    if (error || !data) {
      toast.error("Failed to fetch listing.");
      router.replace("/");
      return;
    }

    setListing(data);
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-5 animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>

        {/* Image skeleton */}
        <div className="rounded-lg overflow-hidden mb-6">
          <div className="w-full h-[400px] bg-gray-300"></div>
        </div>

        {/* Small image grid skeleton */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="w-full h-[150px] bg-gray-300 rounded"></div>
          <div className="w-full h-[150px] bg-gray-300 rounded"></div>
          <div className="w-full h-[150px] bg-gray-300 rounded"></div>
        </div>

        {/* Price + address skeleton */}
        <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>

        {/* Details grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
          ))}
        </div>

        {/* Description skeleton */}
        <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    );
  }


  if (!listing) {
    return (
      <div className="p-10 text-center">
        <p>Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4 text-brand">
        {capitalizeText(listing.type)} - {listing.propertyType}
      </h1>

      {/* Images Section */}
      <div className="mb-6">
        {listing.listingImages.length > 0 ? (
          <>
            {/* First image full width */}
            <div className="rounded-lg overflow-hidden mb-4">
              <Image
                src={listing.listingImages[0].url}
                alt={`Main property image at ${listing.address}`}
                width={1200}
                height={600}
                className="object-cover w-full h-[400px] rounded-lg"
              />
            </div>

            {/* Remaining images in grid */}
            <div className="grid grid-cols-3 gap-3">
              {listing.listingImages.slice(1).map((img) => (
                <div key={img.url} className="rounded-lg overflow-hidden">
                  <Image
                    src={img.url}
                    alt={`Property image at ${listing.address}`}
                    width={400}
                    height={250}
                    className="object-cover w-full h-[150px] rounded-lg"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-gray-200 w-full h-64 flex items-center justify-center text-gray-500">
            No images available
          </div>
        )}
      </div>

      {/* Details */}
      <div className="bg-white p-6 rounded-lg ">
        <p className="text-xl font-semibold mb-2 text-brand">
          ${priceFormat(listing.price)}
        </p>
        <p className="text-gray-700 mb-4">{listing.address}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="font-semibold">Bedrooms</p>
            <p>{listing.bedroom}</p>
          </div>
          <div>
            <p className="font-semibold">Bathrooms</p>
            <p>{listing.bathroom}</p>
          </div>
          <div>
            <p className="font-semibold">Parking</p>
            <p>{listing.parking}</p>
          </div>
          <div>
            <p className="font-semibold">Built In</p>
            <p>{listing.builtIn}</p>
          </div>
          <div>
            <p className="font-semibold">Lot Size (sq.ft)</p>
            <p>{listing.lotSize}</p>
          </div>
          <div>
            <p className="font-semibold">Area (sq.ft)</p>
            <p>{listing.area}</p>
          </div>
          <div>
            <p className="font-semibold">HOA (per month)</p>
            <p>${listing.hoa || 0}</p>
          </div>
          <div>
            <p className="font-semibold">Listing Active</p>
            <p>{listing.active ? "Yes" : "No"}</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {listing.description}
        </p>

        <p className="text-gray-400 text-sm">
          Posted {getTimeAgo(listing.created_at)}
        </p>
      </div>
    </div>
  );
}
