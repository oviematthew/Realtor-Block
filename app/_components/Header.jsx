import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <section className="flex items-between font-text justify-between w-full h-20 px-8 bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.svg" width={150} height={60} alt="Logo" priority />
        </Link>

        <nav className="hidden md:flex ml-10 space-x-4">
          <Link href="/about" className="text-brand hover:underline">
            For Sale
          </Link>
          <Link href="/contact" className="text-gray-900 hover:underline">
            For Rent
          </Link>
          <Link href="/services" className="text-gray-900 hover:underline">
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
