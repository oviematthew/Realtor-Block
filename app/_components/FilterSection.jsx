import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { BedDouble, Bath, CarFront, House } from "lucide-react";

export default function FilterSection({
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType,
}) {
  return (
    <div className="px-3 py-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Bedrooms */}
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[100%] cursor-pointer">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem value="1" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem value="2" className="hover:cursor-pointer">
            {" "}
            <h2 className="flex gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Bath */}
      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[100%] cursor-pointer">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem value="1" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem value="2" className="hover:cursor-pointer">
            {" "}
            <h2 className="flex gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Parking */}
      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[100%] cursor-pointer">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem value="1" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <CarFront className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem value="2" className="hover:cursor-pointer">
            {" "}
            <h2 className="flex gap-2">
              {" "}
              <CarFront className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <CarFront className="h-5 w-5 text-brand" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Home Type */}
      <Select
        onValueChange={(value) =>
          value === "All" ? setHomeType(null) : setHomeType(value)
        }
      >
        <SelectTrigger className="w-[100%] cursor-pointer">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem value="All" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> All
            </h2>
          </SelectItem>
          <SelectItem
            value="Single Family House"
            className="hover:cursor-pointer"
          >
            <h2 className="flex gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Single Family House
            </h2>
          </SelectItem>
          <SelectItem value="Town House" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Town House
            </h2>
          </SelectItem>
          <SelectItem value="Condo" className="hover:cursor-pointer">
            <h2 className="flex gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Condo
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
