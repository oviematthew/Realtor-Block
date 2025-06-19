import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="mt-20 flex w-full py-10 px-5 md:px-10 gap-5 items-center justify-center md:justify-between h-screen">
      <Image
        src="/auth/auth-image.jpg"
        alt="auth image"
        width={1200}
        height={700}
        style={{ height: "100%", width: "50%" }}
        className="hidden lg:block lg:w-1/2 h-full object-cover rounded-lg shadow-lg"
      />
      <div className="flex justify-center signin w-full lg:w-1/2">
        <SignUp />
      </div>
    </div>
  );
}
