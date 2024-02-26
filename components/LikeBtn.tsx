"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { HiHeart } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LikeBtnProps {
  restaurantId: string;
}

interface UserData {
  favouriteRestaurants: { _id: string }[];
}

export const LikeBtn: React.FC<LikeBtnProps> = ({ restaurantId }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const router = useRouter();

  const fetchUserFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const { data }: { data: UserData } = await axios.get(
        "api/user-fav-restaurants",
        {
          params: {
            email: session.user.email,
          },
        }
      );
      const arrayId = data.favouriteRestaurants.map((res) => res._id);
      setUserFavorites(arrayId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserFavorites();
    }
  }, [fetchUserFavorites, session]);

  const handleLikeBtn = async () => {
    if (!session?.user) {
      toast.error("Log in to add to favorite", {
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
      fetchUserFavorites();
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
