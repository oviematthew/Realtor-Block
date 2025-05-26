import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <section className="flex items-center justify-between w-full h-20 px-8 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.svg" width={60} height={60} alt="Logo" priority />
        </Link>

        <nav className="ml-10 space-x-4">
          <Link
            href="/about"
            className="text-gray-900 dark:text-white hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-900 dark:text-white hover:underline"
          >
            Contact
          </Link>
          <Link
            href="/services"
            className="text-gray-900 dark:text-white hover:underline"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="text-gray-900 dark:text-white hover:underline"
          >
            Blog
          </Link>
        </nav>
      </div>
    </section>
  );
}
