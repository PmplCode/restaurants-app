import { RestaurantDetailPage } from "@/components/RestaurantPage";
import axios from "axios";

const getRestaurantById = async (id) => {
  try {
    const { data: res } = await axios.get(
      `https://restaurants-app-nine.vercel.app/api/restaurants/${id}`
    );

    return res;
  } catch (error) {
    console.log("Error getting the restaurant: ", error);
  }
};

const ViewRestaurant = async ({ params } ) => {
  const { id } = params;

  const { restaurant } = await getRestaurantById(id);

  return <RestaurantDetailPage restaurant={restaurant} />;
};

export default ViewRestaurant;
