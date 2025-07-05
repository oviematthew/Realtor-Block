"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function EditListing() {
  return (
    <div className="px-10 md:p-10">
      <h2 className="font-bold text-xl font-text">
        Enter more information about your listing
      </h2>
    </div>
  );
}
