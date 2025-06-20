import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mt-20 flex w-full py-10 px-5 md:px-10 gap-5 items-center justify-center md:justify-between h-screen">
      <div className="flex justify-center signin w-full lg:w-1/2">
        <SignUp />
      </div>
      <div className="hidden lg:block lg:w-1/2 ">
        <Image
          src="/auth/auth-image-signup.jpg"
          alt="auth image"
          width={1200}
          height={700}
          style={{ height: "800px", width: "100%" }}
          className="h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
