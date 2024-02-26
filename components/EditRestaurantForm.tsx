"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Slide, toast } from "react-toastify";

export const EditRestaurantForm = ({ id, restaurantData }) => {
  const cuisine_type_values = [
    "Asian",
    "Pizza",
    "American",
    "Mexican",
    "Other",
  ];

  const [newRestaurantData, setNewRestaurantData] = useState({
    name: undefined,
    cuisine_type: undefined,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("newName") as string;
    const cuisineType = formData.get("newCuisine_type") as string;

    if (!name || !cuisineType) setErrorMessage("Fill all fields please.");

    try {
      const { data: res } = await axios.put(
        `https://restaurants-g1djryvag-pmplcodes-projects.vercel.app/api/restaurants/${id}`,
        newRestaurantData
      );
      if (res?.error) {
        setErrorMessage("Something went wrong, please try again later.");
        return;
      }
      console.log("res edit: ", res);
      toast.success("Restaurant edited successfuly !", {
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
      router.replace("/");
      return router.refresh();
    } catch (error) {}
  };
  return (
    <>
      <h1>Edit Restaurant</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          name="newName"
          placeholder="Restaurant Name"
          value={newRestaurantData.name ?? restaurantData?.name}
          onChange={(e) =>
            setNewRestaurantData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <select
          name="newCuisine_type"
          className="border border-slate-500 px-8 py-2"
          defaultValue={restaurantData?.cuisine_type}
          value={newRestaurantData.cuisine_type}
          onChange={(e) =>
            setNewRestaurantData((prev) => ({
              ...prev,
              cuisine_type: e.target.value,
            }))
          }
        >
          <option value="default" disabled>
            Cuisine type...
          </option>
          {cuisine_type_values.map((type, i) => (
            <option value={type} key={i}>
              {type}
            </option>
          ))}
        </select>
        {errorMessage && (
          <div className="bg-red-500 w-fit text-white text-sm py-1 px-3 rounded-md mt-2">
            {errorMessage}
          </div>
        )}

        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit transition-all rounded-md hover:rounded-xl">
          Add Restaurant
        </button>
      </form>
    </>
  );
};
