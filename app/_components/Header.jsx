"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const path = usePathname();
  const { user } = useUser();

  return (
    <section className="">
      <div className="flex flex-col">
        {/* Desktop Menu */}
        <div className="flex items-between font-text justify-between w-full h-20 px-8 bg-white shadow-sm fixed top-0 z-50 ">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                width={150}
                height={60}
                alt="Logo"
                style={{ height: "120px", width: "120px" }}
                priority
              />
            </Link>

            <nav className="hidden md:flex ml-10 space-x-4">
              <Link
                href="/for-sale"
                className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                  path === "/for-sale" ? "text-brand font-semibold" : ""
                }`}
              >
                For Sale
              </Link>
              <Link
                href="/for-rent"
                className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                  path === "/for-rent" ? "text-brand font-semibold" : ""
                }`}
              >
                For Rent
              </Link>
              <Link
                href="/agents"
                className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                  path === "/agents" ? "text-brand font-semibold" : ""
                }`}
              >
                Agent Finder
              </Link>
            </nav>
          </div>

          <div className="right-div flex items-center ml-auto space-x-4">
            <Button asChild className="bg-brand hover:bg-brand-dark text-white">
              <Link href="/add-new-listing">
                <Plus /> Post Your Ad
              </Link>
            </Button>
            {user ? (
              <div className="user-profile flex items-center space-x-2">
                <UserButton />
              </div>
            ) : (
              <Button asChild variant="outline">
                <Link href="sign-in">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mt-20 w-full py-5 flex  md:hidden">
          <nav className="w-full flex justify-evenly space-y-3 ml-4">
            <Link
              href="/for-sale"
              className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                path === "/for-sale" ? "text-brand font-semibold" : ""
              }`}
            >
              For Sale
            </Link>
            <Link
              href="/for-rent"
              className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                path === "/for-rent" ? "text-brand font-semibold" : ""
              }`}
            >
              For Rent
            </Link>
            <Link
              href="/agents"
              className={`text-gray-900 hover:text-[var(--brand)] text-md ${
                path === "/agents" ? "text-brand font-semibold" : ""
              }`}
            >
              Agent Finder
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
