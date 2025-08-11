"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import priceFormat from "../../lib/priceFormat";
import getTimeAgo from "../../lib/getTimeAgo";
import { Search, XCircle } from "lucide-react";
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
  setType,
  setCoordinates,
  setSearchPerformed,
  getListings,
}) {
  const inputRef = useRef(null);

  const resetFilters = () => {

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setBedCount(0);
    setBathCount(0);
    setParkingCount(0);
    setHomeType("");
    setType("");
    setSearchedAddress("");
    setCoordinates({ latitude: null, longitude: null });
    setSearchPerformed(false);
    getListings();
  };

  

  return (
    <>
      <div>
        {/* Search Bar */}
        <div className="search p-3 flex items-center gap-4">
          <GoogleAddressSearch
            inputRef={inputRef}
            selectedAddress={(value) => setSearchedAddress(value)}
            latitude={(lat) =>
              setCoordinates((prev) => ({ ...prev, latitude: lat }))
            }
            longitude={(lng) =>
              setCoordinates((prev) => ({ ...prev, longitude: lng }))
            }
            placeholder={"Enter address you want to search"}
            searchTypes={["geocode"]}
          />

          <Button
            className="bg-brand p-5 hover:bg-brand-dark text-white hover:cursor-pointer"
            disabled={!searchedAddress}
            onClick={handleSearchCLick}
          >
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>

        {/* Filter Section */}
        <div className="filter">
          <FilterSection
            setBedCount={setBedCount}
            setBathCount={setBathCount}
            setParkingCount={setParkingCount}
            setHomeType={setHomeType}
            setType={setType}
          />
        </div>

        {/* Found Results + Cancel */}
        {searchPerformed && (
          <div className="flex items-center justify-center gap-4 mb-4 text-gray-700">
            <p className="found text-center">
              Found{" "}
              <span className="font-bold text-brand">{listings.length}</span>{" "}
              result{listings.length !== 1 ? "s" : ""} at{" "}
              <span className="font-bold text-brand">
                {lastSearchedAddress}
              </span>
            </p>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:cursor-pointer"
              onClick={resetFilters}
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        )}

        {/* No Listings Found */}
        {!loading && searchPerformed && listings.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No listings found based on your search.
          </p>
        )}

        {/* Listings or Skeletons */}
        <div className="listings grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
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
              ))
            : listings.map((listing) => (
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
                          ${priceFormat(listing.price)}
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
              ))}
        </div>
      </div>
    </>
  );
}
