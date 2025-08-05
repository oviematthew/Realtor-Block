"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import priceFormat from "../../lib/priceFormat";
import getTimeAgo from "../../lib/getTimeAgo";
import { Search } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import GoogleAddressSearch from "./GoogleAddressSearch";
import capitalizeText from "../../lib/capitalizeText";
import FilterSection from "./FilterSection";

export default function Listing({
  listings,
  loading,
  handleSearchCLick,
  searchedAddress,
  setSearchedAddress,
  searchPerformed,
  lastSearchedAddress,
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType,
}) {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  return (
    <>
      <div>
        <div className="search p-3 flex items-center gap-4">
          <GoogleAddressSearch
            selectedAddress={(value) => setSearchedAddress(value)}
            latitude={(lat) =>
              setCoordinates((prev) => ({ ...prev, latitude: lat }))
            }
            longitude={(lng) =>
              setCoordinates((prev) => ({ ...prev, longitude: lng }))
            }
            placeholder={"Enter address you want to search"}
          />

          <Button
            className="bg-brand p-5 hover:bg-brand-dark text-white hover:cursor-pointer"
            disabled={
              !searchedAddress ||
              !coordinates.latitude ||
              !coordinates.longitude
            }
            onClick={handleSearchCLick}
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <div className="filter">
          <FilterSection
            setBedCount={setBedCount}
            setBathCount={setBathCount}
            setParkingCount={setParkingCount}
            setHomeType={setHomeType}
          />
        </div>

        {searchPerformed && (
          <p className="found text-center mb-4 text-gray-700">
            Found{" "}
            <span className="font-bold text-brand">{listings.length}</span>{" "}
            result
            {listings.length !== 1 ? "s" : ""} at{" "}
            <span className="font-bold text-brand">{lastSearchedAddress}</span>
          </p>
        )}

        <div className="listings grid grid-cols-1 lg:grid-cols-2 gap-5">
          {!loading && listings.length > 0
            ? listings.map((listing) => (
                <Link
                  className="hover:opacity-90 hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
                  href={`/view-listing/${listing.id}`}
                  key={listing.id}
                >
                  <div className="listing-item">
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
                        <h3 className="font-bold text-lg text-brand">
                          ${priceFormat(listing.price)}
                        </h3>
                        <p className="text-sm text-brand">
                          {capitalizeText(listing.type)}
                        </p>
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
                            {listing.bedroom}{" "}
                            {listing.bedroom > 1 ? "Beds" : "Bed"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            {listing.bathroom}{" "}
                            {listing.bathroom > 1 ? "Baths" : "Bath"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {listing.address}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg animate-pulse bg-white shadow-md"
                >
                  <div className="h-[250px] bg-gray-200 rounded-t-lg" />
                  <div className="p-2 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
