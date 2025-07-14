"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Label } from "../../../../@/components/ui/label";
import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
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
  const [count, setCount] = useState(5);
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

  useEffect(() => {
    // If unauthorized, start countdown to redirect
    if (unauthorized && count > 0) {
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      // Clear the interval when count reaches 0
      return () => clearInterval(interval);
    }
  }, [unauthorized, count]);

  async function fetchListing() {
    // Fetch the listing details from Supabase
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("id", id)
      .single();

    if (error || !data) {
      toast.error("Failed to fetch listing");
      router.push("/");
      return;
    }

    if (data.createdBy !== user?.primaryEmailAddress?.emailAddress) {
      setUnauthorized(true);
      setLoading(false);
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
    <>
      {unauthorized ? (
        <div className="p-10 text-center">
          <h2 className="text-lg font-semibold mb-5">
            You are not authorized to edit this listing.
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Redirecting you back to the homepage in {count} second
            {count === 1 ? "" : "s"}...
          </p>
        </div>
      ) : (
        <div className="px-5 md:px-10 py-10 max-w-3xl mx-auto">
          <div className="">
            <h2 className="font-bold text-3xl text-brand font-text mb-5">
              Edit Listing Details
            </h2>
            <hr className="mb-10" />
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="font-semibold text-lg font-text mb-5">
                  Rent Or Sell
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

              <div className="flex flex-col">
                <h2 className="font-semibold text-lg font-text mb-5">
                  Property Type
                </h2>
                <Select>
                  <SelectTrigger className="w-[200px] hover:cursor-pointer">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white hover:cursor-pointer">
                    <SelectItem value="Single Family House">
                      Single Family House
                    </SelectItem>
                    <SelectItem value="Town House">Town House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-5 space-y-1">
            <label className=" text-gray-500">Address</label>
            <input
              disabled
              value={listing?.address || ""}
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Bedroom(s)</h2>
              <Input type="number" placeholder="2" name="bedroom" />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Bathroom(s)</h2>
              <Input type="number" placeholder="2" name="bathroom" />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Built In</h2>
              <Input type="number" placeholder="2025" name="builtIn" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Parking</h2>
              <Input type="number" placeholder="2" name="parking" />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Lot Size (Sq.ft)</h2>
              <Input type="number" placeholder="3000" name="lotSize" />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Area</h2>
              <Input type="number" placeholder="1900" name="area" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">Selling Price ($)</h2>
              <Input type="number" placeholder="400000" name="price" />
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
              <Input type="number" placeholder="3000" name="hoa" />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <h2 className="text-gray-500 mb-2">Description</h2>
            <Textarea
              name="description"
              rows="4"
              placeholder="Write a brief description of the property..."
              className="w-full border rounded-md p-2 "
            ></Textarea>
          </div>
        </div>
      )}
    </>
  );
}
