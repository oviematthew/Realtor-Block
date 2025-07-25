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
import { Button } from "../../../../@/components/ui/button";
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
import { Formik } from "formik";
import FileUpload from "../_components/FileUpload";

export default function EditListing() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { id } = useParams(); // Grab the listing ID from URL
  const [unauthorized, setUnauthorized] = useState(false);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);

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

  // Fetch the listing details from Supabase
  async function fetchListing() {
    const { data, error } = await supabase
      .from("listing")
      .select()
      .eq("id", id)
      .single();

    if (error || !data) {
      toast.error("Failed to fetch listing");
      router.replace("/");
      return;
    }

    if (data.createdBy !== user?.primaryEmailAddress?.emailAddress) {
      setUnauthorized(true);
      setLoading(false);
      setTimeout(() => {
        router.replace("/");
      }, 5000);
      return;
    }

    // If the listing is active, redirect to view page
    if (data.active) {
      router.push(`/view-listing/${id}`);
      return;
    }

    // Set the listing data to state
    setListing(data);
    setLoading(false);
  }

  // Handle form submission to update the listing in supabase
  async function onSubmitHandler(valueData) {
    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("listing")
        .update(valueData)
        .eq("id", id)
        .select();

      // Success and error handling
      if (data && data.length > 0) {
        toast.success("Listing updated successfully.");
      } else {
        toast.error("Failed to update listing.");
        return;
      }

      // If images were uploaded, handle the upload
      for (const file of images) {
        if (!file) continue; // Skip if no file is selected

        // Create a unique file name using timestamp
        const fileName = `${Date.now()}-${file.name}`;

        // Upload the file to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("listingimages")
          .upload(fileName, file, {
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          toast.error(`Upload failed: ${uploadError.message}`);
          continue;
        }

        // If upload is successful, show success message
        if (uploadData) {
          toast.success(`Upload Successful `);
        }

        // Get the public URL of the uploaded file from Supabase storage
        const {
          data: { publicUrl },
        } = supabase.storage.from("listingimages").getPublicUrl(fileName);

        // Save the image URL gotten to the database table
        const { error: dbError } = await supabase.from("listingImages").insert({
          listing_id: id,
          url: publicUrl,
        });

        // Succes and error handling to save url to database table
        if (dbError) {
          toast.error("Failed to save image URL to database.");
        } else {
          toast.success("Image uploaded and saved.");
        }
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
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
            <Formik
              initialValues={{
                bedroom: listing?.bedroom || "",
                bathroom: listing?.bathroom || "",
                builtIn: listing?.builtIn || "",
                parking: listing?.parking || "",
                lotSize: listing?.lotSize || "",
                area: listing?.area || "",
                price: listing?.price || "",
                hoa: listing?.hoa || "",
                description: listing?.description || "",
                type: listing?.type || "rent",
                propertyType: listing?.propertyType || "",
                profileImage: user?.imageUrl || "",
                createdByUser: user?.firstName || "",
              }}
              enableReinitialize
              onSubmit={(values) => {
                onSubmitHandler(values);
              }}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="form">
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h2 className="font-semibold text-lg font-text mb-5">
                          Rent Or Sell
                        </h2>
                        <RadioGroup
                          value={values?.type || "rent"}
                          onValueChange={(val) => setFieldValue("type", val)}
                        >
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
                        <Select
                          onValueChange={(val) =>
                            setFieldValue("propertyType", val)
                          }
                          value={values?.propertyType || ""}
                        >
                          <SelectTrigger className="w-[200px] hover:cursor-pointer">
                            <SelectValue placeholder="Select Property Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white hover:cursor-pointer">
                            <SelectItem value="Single Family House">
                              Single Family House
                            </SelectItem>
                            <SelectItem value="Town House">
                              Town House
                            </SelectItem>
                            <SelectItem value="Condo">Condo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col mb-5">
                      <h2 className="text-gray-500 mb-2">Address</h2>
                      <Input
                        type="text"
                        name="address"
                        value={listing?.address || ""}
                        readOnly
                        className="w-full border rounded-md p-2 bg-gray-100"
                      />
                    </div>

                    {/* Rest of form inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Bedroom(s)</h2>
                        <Input
                          type="number"
                          name="bedroom"
                          onChange={handleChange}
                          value={values?.bedroom || ""}
                          placeholder="2"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Bathroom(s)</h2>
                        <Input
                          type="number"
                          name="bathroom"
                          onChange={handleChange}
                          value={values?.bathroom || ""}
                          placeholder="2"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Built In</h2>
                        <Input
                          type="number"
                          name="builtIn"
                          value={values?.builtIn || ""}
                          onChange={handleChange}
                          placeholder="2025"
                          min="1900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Parking</h2>
                        <Input
                          type="number"
                          name="parking"
                          value={values?.parking || ""}
                          onChange={handleChange}
                          placeholder="2"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Lot Size (Sq.ft)</h2>
                        <Input
                          type="number"
                          name="lotSize"
                          value={values?.lotSize || ""}
                          onChange={handleChange}
                          placeholder="3000"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Area</h2>
                        <Input
                          type="number"
                          name="area"
                          value={values?.area || ""}
                          onChange={handleChange}
                          placeholder="1900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">Selling Price ($)</h2>
                        <Input
                          type="number"
                          name="price"
                          value={values?.price || ""}
                          onChange={handleChange}
                          placeholder="400000"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-gray-500">HOA (Per Month) ($)</h2>
                        <Input
                          type="number"
                          name="hoa"
                          value={values?.hoa || ""}
                          onChange={handleChange}
                          placeholder="3000"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1">
                      <h2 className="text-gray-500 mb-2">Description</h2>
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        rows={6}
                        value={values?.description || ""}
                        placeholder="Write a brief description of the property..."
                        className="w-full border rounded-md p-2 "
                      />
                    </div>

                    {/* Profile Images */}
                    <div>
                      <h2 className="font-lg text-gray-500 mt-3">
                        Upload Property Images
                      </h2>
                      <FileUpload setImages={(value) => setImages(value)} />
                    </div>

                    <div className="buttons flex justify-end mt-5 gap-5">
                      <Button
                        variant="outline"
                        className="hover:cursor-pointer"
                      >
                        Save
                      </Button>
                      <Button
                        className="bg-brand hover:bg-brand-dark hover:cursor-pointer font-text text-white"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          "Save & Publish"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
