import { connectMongoDB } from "@/app/lib/mongodb";
import User, { IUser } from "@/models/user";
import { IRestaurant } from "@/models/restaurant";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface GetResponseData {
  favouriteRestaurants: IUser["favouriteRestaurants"]; // Use the IUser interface for favouriteRestaurants
}

interface PostRequestData {
  email: string;
  restaurantId: IRestaurant["_id"];
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const email = req.nextUrl.searchParams.get("email");

    const user = await User.findOne({ email }).populate("favouriteRestaurants");

    const responseData: GetResponseData = {
      favouriteRestaurants: user?.favouriteRestaurants || [],
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) return NextResponse.json({ message: "User not logged." });

  try {
    await connectMongoDB();

    const { email, restaurantId } = (await req.json()) as PostRequestData;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.error();
    }

    // Check if the restaurantId already exists in the user's favourites
    const restaurantIndex = user.favouriteRestaurants.indexOf(restaurantId);
    if (restaurantIndex !== -1) {
      user.favouriteRestaurants.splice(restaurantIndex, 1);
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
    console.error(error);
    return NextResponse.error();
  }
}
