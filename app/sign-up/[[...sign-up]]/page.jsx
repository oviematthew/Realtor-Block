import React from "react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <div className="flex w-full h-screen items-center justify-center">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <div className="animate-pulse w-80 h-96 bg-gray-200 rounded-lg" />
          </div>
          <div className="hidden lg:block lg:w-1/2 h-full">
            <div className="animate-pulse h-full w-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="flex w-full h-screen gap-5 items-center justify-center md:justify-between">
          <div className="flex justify-center items-center w-full lg:w-1/2">
            <SignUp />
          </div>
          <div className="hidden lg:block lg:w-1/2 h-full">
            <Image
              src="/auth/auth-image-signup.jpg"
              alt="auth image"
              width={1200}
              height={700}
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </ClerkLoaded>
    </>
  );
}
