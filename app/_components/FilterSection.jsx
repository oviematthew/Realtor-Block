import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { BedDouble, Bath, CarFront, House, FileText } from "lucide-react";

export default function FilterSection({
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType,
  setType,
}) {
  return (
    <div className="px-3 py-5 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {/* Bedrooms */}
      <Select onValueChange={setBedCount}>
        <SelectTrigger
          className="w-[100%] cursor-pointer"
          aria-label="Select number of bedrooms"
        >
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem
            value="1"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem
            value="2"
            className="hover:cursor-pointer flex items-center"
          >
            {" "}
            <h2 className="flex items-center gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem
            value="3"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <BedDouble className="h-5 w-5 text-brand" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Bath */}
      <Select onValueChange={setBathCount}>
        <SelectTrigger
          className="w-[100%] cursor-pointer"
          aria-label="Select number of bathrooms"
        >
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem
            value="1"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem
            value="2"
            className="hover:cursor-pointer flex items-center"
          >
            {" "}
            <h2 className="flex items-center gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem
            value="3"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <Bath className="h-5 w-5 text-brand" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Parking */}
      <Select onValueChange={setParkingCount}>
        <SelectTrigger
          className="w-[100%] cursor-pointer"
          aria-label="Select number of parking spaces"
        >
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem
            value="1"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <CarFront className="h-5 w-5 text-brand" /> 1
            </h2>
          </SelectItem>
          <SelectItem
            value="2"
            className="hover:cursor-pointer flex items-center"
          >
            {" "}
            <h2 className="flex items-center gap-2">
              {" "}
              <CarFront className="h-5 w-5 text-brand" /> 2+
            </h2>
          </SelectItem>
          <SelectItem
            value="3"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
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
        <SelectTrigger
          className="w-[100%] cursor-pointer"
          aria-label="Select home type"
        >
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem
            value="All"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> All
            </h2>
          </SelectItem>
          <SelectItem
            value="Single Family House"
            className="hover:cursor-pointer"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Single Family House
            </h2>
          </SelectItem>
          <SelectItem
            value="Town House"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Town House
            </h2>
          </SelectItem>
          <SelectItem value="Condo" className="hover:cursor-pointer">
            <h2 className="flex items-center gap-2">
              {" "}
              <House className="h-5 w-5 text-brand" /> Condo
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Listing Type */}
      <Select
        onValueChange={(value) =>
          value === "All" ? setType(null) : setType(value)
        }
      >
        <SelectTrigger
          className="w-[100%] cursor-pointer"
          aria-label="Select listing type (rent or sale)"
        >
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-white hover:cursor-pointer">
          <SelectItem
            value="All"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <FileText className="h-5 w-5 text-brand" /> All
            </h2>
          </SelectItem>
          <SelectItem
            value="rent"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <FileText className="h-5 w-5 text-brand" />
              Rent
            </h2>
          </SelectItem>
          <SelectItem
            value="sale"
            className="hover:cursor-pointer flex items-center"
          >
            <h2 className="flex items-center gap-2">
              {" "}
              <FileText className="h-5 w-5 text-brand" />
              Sale
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
