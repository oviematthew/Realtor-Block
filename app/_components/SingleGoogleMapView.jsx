"use client";
import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, OverlayView } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "30vh",
  borderRadius: 10,
};

export default function SingleGoogleMapView({ coordinates }) {
  const [center, setCenter] = useState({ lat: 43.6532, lng: -79.3832 });
  const [map, setMap] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      setCenter({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates]);


  const onLoad = useCallback((map) => {
    map.setCenter(center);
    map.setZoom(14);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={30}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MarkerF
        position={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        // onClick={() => setShowInfo(true)} // reopen if closed
      >
        {/* {showInfo && (
          <OverlayView
            position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <MarkerListingItem item={listing} closeInfo={closeInfo} />
            </div>
          </OverlayView>
        )} */}
      </MarkerF>
    </GoogleMap>
  );
}
