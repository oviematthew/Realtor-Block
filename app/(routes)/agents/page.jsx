"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .select("*", "listingImages(url, listing_id)")
      .eq("active", true);

    setLoading(false);

    if (error) {
      toast.error("Failed to fetch agents.");
      return;
    }

    // ✅ Deduplicate by createdBy (email)
    const uniqueAgents = Object.values(
      data.reduce((acc, listing) => {
        if (!acc[listing.createdBy]) {
          acc[listing.createdBy] = listing;
        }
        return acc;
      }, {})
    );

    setAgents(uniqueAgents);
  }

  if (loading) {
    return <p className="p-10 text-center">Loading agents...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-brand mb-6">Find an Agent</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <Link
  key={agent.createdBy} // use email as unique key
  href={`/agent/${agent.createdBy}`} // use email in URL
  className="p-5 bg-white rounded-lg shadow hover:shadow-md transition"
>
  <div className="flex flex-col items-center text-center">
    <Image
      src={agent.profileImage || "/media/placeholder-image.svg"}
      alt={agent.createdByUser || "Agent"}
      width={100}
      height={100}
      className="rounded-full mb-3 object-cover"
    />
    <h2 className="font-semibold text-lg">
      {agent.createdByUser || "Unknown"}
    </h2>
    <p className="text-sm text-gray-500">{agent.createdBy}</p>
  </div>
</Link>

          ))
        ) : (
          <p>No agents found.</p>
        )}
      </div>
    </div>
  );
}
