import { EditRestaurantForm } from "@/components/EditRestaurantForm";
import axios from "axios";

const getRestaurantById = async (id) => {
  try {
    const { data: res } = await axios.get(
      `https://restaurants-g1djryvag-pmplcodes-projects.vercel.app/api/restaurants/${id}`
    );

    return res;
  } catch (error) {
    console.log("Error getting the restaurant: ", error);
  }
};

const EditRestaurant = async ({ params } ) => {
  const { id } = params;

  const { restaurant } = await getRestaurantById(id);

  return <EditRestaurantForm id={id} restaurantData={restaurant} />;
};

export default EditRestaurant;
