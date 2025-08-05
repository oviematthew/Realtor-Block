"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function GoogleMapView() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // You can just set center directly without bounds
    map.setCenter(center);
    map.setZoom(10);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components like markers */}
    </GoogleMap>
  );
}
