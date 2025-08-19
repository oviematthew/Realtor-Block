import React from "react";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/lib/formatPrice";
import getTimeAgo from "@/lib/getTimeAgo";
import capitalizeText from "@/lib/capitalizeText";

export default function UserListing({ listings }) {
  return (
    <div>
      <h2 className="text-xl font-bold">My Listings</h2>
      {listings.map((listing) => (
        <Link
          className="hover:opacity-90 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
          href={`/view-listing/${listing.id}`}
          key={listing.id}
        >
          <div className="listing-item shadow-sm">
            <Image
              src={
                listing.listingImages[0]?.url || "/media/placeholder-image.svg"
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
                    {listing.bathroom} {listing.bathroom > 1 ? "Baths" : "Bath"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{listing.address}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
