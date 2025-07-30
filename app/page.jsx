"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Listing from "./_components/Listing";
import ListingMapView from "./_components/ListingMapView";
import { supabase } from "../utils/supabase/client";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
      <div className="content">
        <Listing />
      </div>
      <div className="map">
        <ListingMapView />
      </div>
    </div>
  );
}
