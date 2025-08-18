import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";
import getAgentFirstName from "../../../../lib/getAgentFirstName";
import { Button } from "../../../../@/components/ui/button";

export default function AgentDetail({ listing, handleContactAgent }) {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-5 items-center">
        <Image
          src={listing?.profileImage || "/media/placeholder-image.svg"}
          alt="Listing Agent Profile Image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold">{getAgentFirstName(listing, user)}</h2>
          <h3 className="text-sm">{listing?.createdBy}</h3>
        </div>
      </div>
      <Button
        className="bg-brand p-5 hover:bg-brand-dark text-white hover:cursor-pointer"
        onClick={handleContactAgent}
      >
        Message
      </Button>
    </div>
  );
}
