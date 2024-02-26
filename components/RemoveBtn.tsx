"use client";

import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";

export const RemoveBtn = ({ id }: any) => {
  const rounter = useRouter();

  const removeRestaurant = async () => {
    const { data: res } = await axios.delete(
      `https://restaurants-g1djryvag-pmplcodes-projects.vercel.app/api/restaurants?id=${id}`
    );

    toast.success(res.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    rounter.refresh();
  };
  return (
    <button className="text-red-400" onClick={removeRestaurant}>
      <HiOutlineTrash size={24} color="red" />
    </button>
  );
};
