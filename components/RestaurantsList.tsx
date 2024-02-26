import Link from "next/link";
import { RemoveBtn } from "./RemoveBtn";
import { HiHeart, HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import { IRestaurant } from "@/models/restaurant";
import Image from "next/image";
import { LikeBtn } from "./LikeBtn";

const getRestaurants = async () => {
  try {
    const { data: res } = await axios.get(
      "http://localhost:3000/api/restaurants"
    );
    return res;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function RestaurantsList() {
  const { restaurants }: { restaurants: IRestaurant[] } =
    await getRestaurants();

  return (
    <>
      {restaurants.map((r: IRestaurant) => (
        <>
          <div
            className="p-4 border border-slate-300 my-3 flex flex-col md:flex-row justify-between gap-5 md:items-start"
            key={r._id}
          >
            <div className="flex items-center md:justify-start md:items-start gap-5">
              <div className="relative w-full h-auto max-w-20 aspect-square">
                <Image
                  src={
                    r.image ||
                    "https://www.ergasia.es/pics_fotossectores/7/dibuix-hosteleria.jpg"
                  }
                  alt={r.name}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-lg md:text-2xl">{r.name}</h2>
                <div>Food type: {r.cuisine_type}</div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <RemoveBtn id={r._id} />
              <Link href={`/edit-restaurant/${r._id}`}>
                <HiPencilAlt size={24} />
              </Link>
              <LikeBtn restaurantId={r._id} />
            </div>
          </div>
        </>
      ))}
    </>
  );
}
