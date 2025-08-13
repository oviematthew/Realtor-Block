import React from "react";
import Image from "next/image";
import Link from "next/link";
import priceFormat from "../../lib/priceFormat";
import { X} from "lucide-react";
import { Button } from "../../@/components/ui/button";

export default function MarkerListingItem({ item, closeInfo }) {
  return (
    <div className="bg-white w-[200px] p-3 rounded-md shadow">
      <div className="flex items-center mb-2" onClick={closeInfo}>
        <X className="cursor-pointer" />
      </div>
      <Image
        className="object-cover h-[100px] w-full rounded-md"
        src={item.listingImages[0]?.url || "/media/placeholder-image.svg"}
        alt={`${item.propertyType} listing in ${item.address}`}
        width={200}
        height={100}
      />

      <p className="text-gray-600 mt-2 text-md">{item.propertyType}</p>
      <h2 className="text-brand font-semibold mt-2 text-md">
        ${priceFormat(item.price)}
      </h2>
      <p className="text-gray-600 mt-2 text-md">{item.address}</p>

      <Button
        asChild
        className="bg-brand hover:bg-brand-dark text-white mt-2 w-full"
      >
        <Link href={`/view-listing/${item.id}`}>View Details</Link>
      </Button>
    </div>
  );
}
