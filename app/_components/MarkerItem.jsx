"use client"

import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, {useState} from "react";
import MarkerListingItem from './MarkerListingItem';


export default function MarkerItem({ item }) {
    const [selectedListing, setSelectedListing] = useState(null);

    function closeInfo() {
      setSelectedListing(null);
    }

  return (
    <MarkerF
    //   icon={"/map-pin.svg"}
      position={{
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude,
      }}
      onClick={() => setSelectedListing(item)}
    >
       {selectedListing && selectedListing.id === item.id && (
         <OverlayView
           position={{
             lat: selectedListing.coordinates.latitude,
             lng: selectedListing.coordinates.longitude,
           }}
           mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
         >
           <div>
                <MarkerListingItem item={selectedListing} closeInfo={closeInfo} />
           </div>
         </OverlayView>
       )}
    </MarkerF>
  );
}
