"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiLogout } from "react-icons/hi";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 rounded-xl">
      <Link href={"/"} className="text-white font-bold">
        Restaurant APP
      </Link>
      <Link href={"/add-restaurant"} className="bg-white p-2 rounded-md">
        Add restaurant
      </Link>
      {!session?.user?.name && (
        <Link href={"/login"} className="bg-white p-2 rounded-md">
          Login
        </Link>
      )}
      {session?.user?.name && (
        <div className="flex flex-col items-center">
          <p className="text-white p-2 rounded-md">
            Hello {session?.user?.name}!
          </p>
          <button
            className="text-white p-1 rounded-md flex items-center gap-2 hover:underline"
            onClick={() => signOut()}
          >
            Log Out <HiLogout />
          </button>
        </div>
      )}
    </nav>
  );
};
