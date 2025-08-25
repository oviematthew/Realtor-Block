"use client";

import { MarkerF, OverlayView } from "@react-google-maps/api";
import MarkerListingItem from "./MarkerListingItem";

export default function MarkerItem({ item, isActive, setActiveListing }) {

  function closeInfo() {
    setActiveListing(null);
  }

  return (
    <MarkerF
      position={{
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude,
      }}
      onClick={() => setActiveListing(item)}
      // icon={{
      //   url: "/media/marker-icon.png",
      //   scaledSize: new window.google.maps.Size(30, 30),
      // }}
      aria-label={`Marker for ${item.propertyType} in ${item.address}`}
    >
      {isActive && (
        <OverlayView
          position={{
            lat: item.coordinates.latitude,
            lng: item.coordinates.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div>
            <MarkerListingItem item={item} closeInfo={closeInfo} />
          </div>
        </OverlayView>
      )}
    </MarkerF>
  );
}
