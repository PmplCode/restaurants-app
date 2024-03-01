import Link from "next/link";
import { RemoveBtn } from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { IRestaurant } from "@/models/restaurant";
import Image from "next/image";
import { LikeBtn } from "./LikeBtn";
export const fetchCache = "force-no-store";

const getRestaurants = async () => {
  try {
    const res = await fetch(
      "https://restaurants-app-nine.vercel.app/api/restaurants",
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading restaurants: ", error);
    throw error;
  }
};

export default async function RestaurantsList() {
  const { restaurants }: { restaurants: IRestaurant[] } =
    await getRestaurants();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((r: IRestaurant) => (
        <div
          key={r._id}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md transition duration-300 hover:shadow-xl"
        >
          <div className="relative w-full h-64">
            <Image
              src={r.image ?? "/restaurant-default-image.jpg"}
              alt={r.name + " Restaurant"}
              width={1000}
              height={1000}
              className="w-fit mx-auto h-[-webkit-fill-available]"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{r.name}</h2>
            <p className="text-gray-700 mb-2">Food type: {r.cuisine_type}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RemoveBtn id={r._id} />
                <Link
                  href={`/edit-restaurant/${r._id}`}
                  className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                >
                  <HiPencilAlt size={24} />
                </Link>
              </div>
              <Link
                key={r._id}
                href={`/restaurant/${r._id}`}
                className="bg-slate-700 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out hover:bg-slate-600"
              >
                Details
              </Link>
              <LikeBtn restaurantId={r._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
