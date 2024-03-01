import { IRestaurant } from "@/models/restaurant";
import Image from "next/image";

interface RestaurantDetailProps {
  restaurant: IRestaurant;
}

export const RestaurantDetailPage: React.FC<RestaurantDetailProps> = ({
  restaurant,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      {
        <div className="relative mb-4">
          <Image
            src={restaurant.image ?? "/restaurant-default-image.jpg"}
            alt={restaurant.name}
            width={800}
            height={600}
            className="rounded-lg mx-auto"
          />
        </div>
      }
      <div className="mb-4">
        <p className="text-gray-600">
          Neighborhood: {restaurant.neighborhood || "Not available"}
        </p>
        <p className="text-gray-600">
          Address: {restaurant.address || "Not available"}
        </p>
        <p className="text-gray-600">
          Cuisine Type: {restaurant.cuisine_type}
        </p>
      </div>
      {restaurant?.operating_hours && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Operating Hours</h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(restaurant?.operating_hours).map(([day, hours]) => (
              <div key={day}>
                <p className="text-gray-600">
                  <span className="font-semibold">{day}: </span>
                  {hours || "Closed"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
