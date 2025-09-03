"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Blog App</h1>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/create">Create Blog</Link>
      </div>
    </nav>
  );
}
