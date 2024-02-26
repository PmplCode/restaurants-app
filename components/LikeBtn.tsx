"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { HiHeart } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const LikeBtn = ({ restaurantId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserFavorites();
    }
  }, [session]);

  const fetchUserFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("api/user-fav-restaurants", {
        params: {
          email: session.user.email,
        },
      });
      const arrayId = [];
      data.favouriteRestaurants.forEach((res) => arrayId.push(res._id));
      setUserFavorites(arrayId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      setLoading(false);
    }
  };

  const handleLikeBtn = async () => {
    if (!session?.user) {
      toast.error("You must be logged!", {
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
      return router.replace("/login");
    }
    try {
      setLoading(true);
      await axios.post("api/user-fav-restaurants", {
        email: session?.user?.email,
        restaurantId: restaurantId,
      });
      setLoading(false);
      fetchUserFavorites(); // Update user favorites after adding a new one
    } catch (error) {
      console.error("Error liking restaurant:", error);
      setLoading(false);
    }
  };

  const isFavorite = userFavorites.includes(restaurantId);

  return (
    <button className="text-red-400" onClick={handleLikeBtn} disabled={loading}>
      {isFavorite ? (
        <HiHeart size={24} color="red" />
      ) : (
        <HiHeart size={24} color="grey" />
      )}
    </button>
  );
};
