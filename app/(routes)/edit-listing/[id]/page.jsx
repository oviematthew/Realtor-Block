"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function EditListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { id } = useParams(); // Grab the listing ID from URL
  const [unauthorized, setUnauthorized] = useState(false);

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    propertyType: "",
    bedroom: "",
    bathroom: "",
    builtIn: "",
    parking: "",
    lotSize: "",
    area: "",
    price: "",
    hoa: "",
    description: "",
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    fetchListing();
  }, [isLoaded, user]);

  async function fetchListing() {
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("id", id)
      .single();

    if (error || !data) {
      toast.error("Failed to fetch listing");
      router.push("/"); // Or some safe page
      return;
    }

    // Unauthorized check
    if (data.createdBy !== user?.primaryEmailAddress?.emailAddress) {
      setLoading(false);
      setUnauthorized(true); // We'll add state for this
      setTimeout(() => {
        router.push("/");
      }, 5000);
      return;
    }

    if (data.active) {
      router.push(`/view-listing/${id}`);
      return;
    }

    setListing(data);

    setFormData({
      type: data.type || "",
      propertyType: data.propertyType || "",
      bedroom: data.bedroom || "",
      bathroom: data.bathroom || "",
      builtIn: data.builtIn || "",
      parking: data.parking || "",
      lotSize: data.lotSize || "",
      area: data.area || "",
      price: data.price || "",
      hoa: data.hoa || "",
      description: data.description || "",
    });

    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleUpdate(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("listing")
      .update(formData)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update listing.");
    } else {
      toast.success("Listing updated.");
      router.push(`/view-listing/${id}`);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 py-10 max-w-3xl mx-auto">
      <h2 className="font-bold text-xl font-text mb-5">Edit Listing Details</h2>

      {/* Address and coordinates (read-only) */}
      <div className="mb-5 space-y-1">
        <label className="block font-semibold text-sm">Address</label>
        <input
          disabled
          value={listing?.address || ""}
          className="w-full border rounded-md p-2 bg-gray-100"
        />
        {/* <p className="text-sm text-gray-500">
          Coordinates: {listing.coordinates?.latitude},{" "}
          {listing.coordinates?.longitude}
        </p> */}
      </div>

      {/* Editable Fields */}
      <form onSubmit={handleUpdate} className="space-y-4">
        {[
          "type",
          "propertyType",
          "bedroom",
          "bathroom",
          "builtIn",
          "parking",
          "lotSize",
          "area",
          "price",
          "hoa",
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize text-sm">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium text-sm">Description</label>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Save Listing"
          )}
        </button>
      </form>
    </div>
  );
}
