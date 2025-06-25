"use client";
import React from "react";
import Autocomplete from "react-google-autocomplete";

export default function AddNewListing() {
  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <h2 className="font-bold text-2xl">Add New Listing</h2>
      <div className="mt-5 w-full max-w-md">
        <p className="text-gray-500 mb-2 text-center">
          Enter address you want to list
        </p>
        <Autocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
          onPlaceSelected={(place) => console.log(place)}
          options={{
            types: ["address"], // 👈 allow street-level autocomplete
            componentRestrictions: { country: "ca" }, //limit to Canada
          }}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="123 Main St, Toronto, ON"
        />
      </div>
    </div>
  );
}
