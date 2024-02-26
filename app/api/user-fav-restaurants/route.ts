import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const email = req.nextUrl.searchParams.get("email");

    const user = await User.findOne({ email }).populate("favouriteRestaurants");

    return NextResponse.json({
      favouriteRestaurants: user.favouriteRestaurants,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error.message || "Internal Server Error");
  }
}

export async function POST(req) {
  const session = await getServerSession(req);
  console.log("session: ", session);

  if (!session) return NextResponse.json({ message: "haha" });

  try {
    await connectMongoDB();

    const { email, restaurantId } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.error("User not found", { status: 404 });
    }

    // Check if the restaurantId already exists in the user's favourites
    const restaurantIndex = user.favouriteRestaurants.indexOf(restaurantId);
    if (restaurantIndex !== -1) {
      user.favouriteRestaurants.splice(restaurantIndex, 1); // Remove the restaurantId
      await user.save();
      return NextResponse.json({
        message: "Restaurant removed from favourites successfully",
      });
    }

    user.favouriteRestaurants.push(restaurantId);
    await user.save();

    return NextResponse.json({
      message: "Restaurant added to favourites successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error.message || "Internal Server Error");
  }
}
function authMiddleware(req: any) {
  throw new Error("Function not implemented.");
}
