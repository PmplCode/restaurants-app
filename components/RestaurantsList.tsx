import Link from "next/link";
import { RemoveBtn } from "./RemoveBtn";
import { HiHeart, HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import { IRestaurant } from "@/models/restaurant";
import Image from "next/image";
import { LikeBtn } from "./LikeBtn";
import { ObjectId, ObjectIdLike } from "bson";

const getRestaurants = async () => {
  try {
    const { data: res } = await axios.get(
      "http://127.0.0.1:1337/api/restaurants"
    );
    return res;
  } catch (error) {
    console.log("Error loading restaurants: ", error);
  }
};

export default async function RestaurantsList() {
  const { restaurants }: { restaurants: IRestaurant[] } =
    await getRestaurants();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((r: IRestaurant) => (
        <div
          className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md transition duration-300 hover:shadow-xl"
          key={r._id}
        >
          <div className="relative w-full h-64">
            <Image
              src={
                r.image ||
                "https://www.ergasia.es/pics_fotossectors/7/dibuix-hosteleria.jpg"
              }
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
              <LikeBtn restaurantId={r._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
