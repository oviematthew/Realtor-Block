"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import MarkerListingItem from "./MarkerListingItem";

const containerStyle = {
  width: "100%",
  height: "85vh",
  borderRadius: 10,
};



export default function SingleGoogleMapView({coordinates}) {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [map, setMap] = useState(null);
  const [activeListing, setActiveListing] = useState(null);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {  
      setCenter({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates]);

  

  const onLoad = useCallback((map) => {
    // You can just set center directly without bounds
    map.setCenter(center);
    map.setZoom(10);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components like markers */}

      <MarkerF
        position={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        onClick={() => setActiveListing(item)}
      >
        {isActive && (
          <OverlayView
            position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarkerListingItem item={item} closeInfo={closeInfo} />
            </div>
          </OverlayView>
        )}
      </MarkerF>
    </GoogleMap>
  );
  }
