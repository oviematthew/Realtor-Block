import React from "react";
import { useState } from "react";
import Image from "next/image";

export default function FileUpload({ setImages }) {
  const [imagePreview, setImagePreview] = useState([]);

  function handleFileUpload(event) {
    const files = event.target.files;
    setImages(files);

    // Create an array of object URLs for the uploaded files
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));

    // Set the image preview state with the object URLs
    // This will trigger a re-render and display the previews
    setImagePreview(previews);
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full mt-2">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={handleFileUpload}
            multiple
            accept="image//png, image/jpeg, image/gif, image/svg+xml"
            className="hidden"
          />
        </label>
      </div>
      <div className="preview grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-3 mt-4">
        {imagePreview.length > 0 && (
          <>
            {imagePreview.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt={`Preview ${index + 1}`}
                  className="w-[100px] h-[100px] object-cover m-2 rounded-md"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
