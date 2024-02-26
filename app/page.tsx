import RestaurantsList from "@/components/RestaurantsList";
export const fetchCache = 'force-no-store';

export default function Home() {
  return <RestaurantsList />;
}
