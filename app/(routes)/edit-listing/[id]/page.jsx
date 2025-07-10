"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Label } from "../../../../@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";

export default function EditListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { id } = useParams(); // Grab the listing ID from URL
  const [unauthorized, setUnauthorized] = useState(false);

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

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
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-xl font-text mb-5">
            Edit Listing Details
          </h2>

          <RadioGroup defaultValue="rent">
            <div className="flex gap-5 mb-5">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">Rent</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell">Sell</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center flex-col">
          <h2 className="font-bold text-xl font-text mb-5">Bedrooms</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Bedroom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
    </div>
  );
}
