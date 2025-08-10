import React, { useCallback } from "react";
import Autocomplete from "react-google-autocomplete";
import { MapPin } from "lucide-react";
import debounce from "lodash.debounce";

export default function GoogleAddressSearch({
  selectedAddress,
  latitude,
  longitude,
  placeholder,
  searchTypes = ["address"],
  inputRef,
}) {
  const handlePlaceSelected = useCallback(
    debounce((place) => {
      if (!place) return;

      const formattedAddress = place.formatted_address || "";
      selectedAddress(formattedAddress);

      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();
      if (lat && lng) {
        latitude(lat);
        longitude(lng);
      }
    }, 300),
    []
  );

  return (
    <div className="w-full flex gap-1 items-center relative">
      <MapPin className="text-brand h-10 w-10 rounded-l-lg bg-blue-100" />
      <Autocomplete
      ref={inputRef}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: searchTypes,
          componentRestrictions: { country: "ca" },
        }}
        className="w-full p-2 border border-blue-500 font-text rounded text-center"
        placeholder={placeholder}
      />
    </div>
  );
}
