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
