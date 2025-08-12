"use client"

import React from "react";
import Header from "./_components/Header";
import { LoadScript } from "@react-google-maps/api";

export default function Provider({ children }) {
  return (
    <div>
      <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      libraries={["places"]}
    >
      <Header />
      <div className="mt-20">{children}</div>
    </LoadScript>
    </div>
  );
}
