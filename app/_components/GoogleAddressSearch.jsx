"use client";
import React, { useState, useCallback } from "react";
import Autocomplete from "react-google-autocomplete";
import { MapPin } from "lucide-react";
import debounce from "lodash.debounce";

export default function GoogleAddressSearch() {
  const [address, setAddress] = useState("");

  // ✅ Debounced callback (runs 500ms after place changes)
  const handlePlaceSelected = useCallback(
    debounce((place) => {
      const formatted = place?.formatted_address || "";
      setAddress(formatted);
      console.log("Selected Address:", formatted);
    }, 500),
    [] // ✅ dependencies (memoized once)
  );

  return (
    <div className="flex items-center relative">
      <MapPin className="text-brand absolute left-2 top-2" />
      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ["address"],
          componentRestrictions: { country: "ca" },
        }}
        className="w-full p-2 border border-blue-500 rounded text-center"
        placeholder="123 Main St, Toronto, ON"
      />
    </div>
  );
}
