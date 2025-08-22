"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/lib/formatPrice";
import getTimeAgo from "@/lib/getTimeAgo";
import capitalizeText from "@/lib/capitalizeText";
import { Button } from "@/components/ui/button";
import { Trash2, Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UserListing({ listings, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  return (
    <div className="user-listing">
      <h2 className="text-xl font-bold text-brand mb-5">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing.id} className="listing-item shadow-sm">
              <div className="relative">
                <Image
                  src={
                    listing.listingImages?.[0]?.url ||
                    "/media/placeholder-image.svg"
                  }
                  alt={`Apartment For Rent at: ${listing.address}`}
                  width={300}
                  height={200}
                  className="object-cover w-full h-[250px] rounded-lg rounded-b-none"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    listing.active
                      ? "bg-green-600 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {listing.active ? "Active" : "Draft"}
                </span>
              </div>

              <div className="content bg-white rounded-lg rounded-t-none border-2 border-gray-50 p-2 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-brand">
                    ${formatPrice(listing.price)}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      listing.type === "rent"
                        ? "bg-blue-100 text-blue-700"
                        : listing.type === "sale"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {capitalizeText(listing.type || "Not set")}
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
                <p className="text-sm text-gray-500 mb-2">{listing.address}</p>

                <div className="flex mb-2 mt-2 gap-2 max-w-[100%]">
                  <Button className="bg-white border-1 border-gray-600 w-1/3">
                    <Link href={`/edit-listing/${listing.id}`}>Edit</Link>
                  </Button>
                  <Button className="bg-brand hover:bg-brand-dark text-white w-1/3">
                    <Link href={`/view-listing/${listing.id}`}>View</Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white"
                        type="button"
                        disabled={deletingId === listing.id}
                      >
                        {deletingId === listing.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
                          onClick={async () => {
                            setDeletingId(listing.id);
                            await onDelete(listing.id);
                            setDeletingId(null);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}
