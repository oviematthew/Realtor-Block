"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log("Current path:", path);
  }, [path]);
  return (
    <section className="flex items-between font-text justify-between w-full h-20 px-8 bg-white shadow-sm fixed top-0 z-50">
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
            href="/about"
            className="text-gray-900 hover:text-[var(--brand)] text-sm"
          >
            For Sale
          </Link>
          <Link
            href="/contact"
            className="text-gray-900 hover:text-[var(--brand)] text-sm"
          >
            For Rent
          </Link>
          <Link
            href="/services"
            className="text-gray-900 hover:text-[var(--brand)] text-sm"
          >
            Agent Finder
          </Link>
        </nav>
      </div>

      <div className="right-div flex items-center ml-auto space-x-4">
        <Button asChild className="bg-brand hover:bg-brand-dark text-white">
          <Link href="/post-ad">
            <Plus /> Post Your Ad
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </section>
  );
}
