"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { HiLogout, HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { Slide, toast } from "react-toastify";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogoutToast = () => {
    toast.success(`You are now logged out.`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 rounded-xl">
      <Link href={"/"} className="text-white font-bold">
        Restaurant APP
      </Link>
      <div className="flex items-center gap-6">
        {/* Burger menu for mobile */}
        <div className="md:hidden">
          <button
            className="text-white flex items-center focus:outline-none"
            onClick={handleMenuToggle}
          >
            <HiMenuAlt3 />
          </button>
        </div>
        {/* Links for desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href={"/add-restaurant"}
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            Add restaurant
          </Link>
          {!session ? (
            <Link
              href={"/login"}
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Login
            </Link>
          ) : (
            <div className="relative" >
              <button className="text-white flex items-center focus:outline-none hover:text-gray-300 transition duration-300 ease-in-out transform" onClick={handleMenuToggle}>
                <span className="mr-2">Hello {session.user.name}!</span>
                <HiMenuAlt3 />
              </button>
              {isMenuOpen && (
                <div className="absolute -right-4 top-8 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
                    onClick={() => {
                      handleLogoutToast;
                      return signOut();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Burger menu dropdown for mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 top-14">
          {!session ? (
            <Link
              href={"/login"}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={handleMenuToggle}
            >
              Login
            </Link>
          ) : (
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={() => {
                handleMenuToggle;
                handleLogoutToast;
                return signOut();
              }}
            >
              Log Out
            </button>
          )}
          <Link
            href={"/add-restaurant"}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={handleMenuToggle}
          >
            Add restaurant
          </Link>
        </div>
      )}
    </nav>
  );
};
