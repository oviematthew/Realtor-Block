"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MarkerItem from "./MarkerItem";
import { usePathname } from "next/navigation";

const containerStyle = {
  width: "100%",
  height: "90vh",
  borderRadius: 10,
};

export default function GoogleMapView({ coordinates, listing }) {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [map, setMap] = useState(null);
  const [activeListing, setActiveListing] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      setCenter({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates]);

  const onLoad = useCallback(
    (mapInstance) => {
      mapInstance.setCenter({
        lat: coordinates.latitude ?? 43.6532,
        lng: coordinates.longitude ?? -79.3832,
      });
      mapInstance.setZoom(10);
      setMap(mapInstance);
    },
    [coordinates]
  ); // depend on coordinates

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      key={pathname}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components like markers */}
      {listing.map((item) => (
        <MarkerItem
          key={item.id}
          item={item}
          isActive={activeListing?.id === item.id}
          setActiveListing={setActiveListing}
        />
      ))}
    </GoogleMap>
  );
}
