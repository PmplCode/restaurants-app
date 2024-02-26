"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Slide, toast } from "react-toastify";

const AddRestaurant = () => {
  const cuisineTypeValues = [
    "Asian",
    "Pizza",
    "American",
    "Mexican",
    "Other",
  ];

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    cuisine_type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!restaurantData.name || !restaurantData.cuisine_type) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const { data: res } = await axios.post("https://restaurants-app-nine.vercel.app/api/restaurants", restaurantData);

      if (res?.error) {
        setErrorMessage("Invalid credentials");
        return;
      }

      toast.success("Restaurant created successfully!", {
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
      return router.refresh()
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error creating restaurant:", error);
    }
  };

  return (
    <>
      <h1>Add Restaurant</h1>
      <div className="md:w-fit mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-slate-500 px-8 py-2"
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={restaurantData.name}
            onChange={(e) =>
              setRestaurantData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <select
            name="cuisine_type"
            className="border border-slate-500 px-8 py-2"
            value={restaurantData.cuisine_type}
            onChange={(e) =>
              setRestaurantData((prev) => ({
                ...prev,
                cuisine_type: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Cuisine type...
            </option>
            {cuisineTypeValues.map((type, i) => (
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
          <button
            type="submit"
            className="bg-green-600 font-bold text-white py-3 px-6 w-fit transition-all rounded-md hover:rounded-xl"
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;