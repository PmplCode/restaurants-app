import { connectMongoDB } from "@/app/lib/mongodb";
import Restaurant, { IRestaurant } from "@/models/restaurant"; 
import { NextRequest, NextResponse } from "next/server";

interface PutRequestData {
  name: string;
  cuisine_type: string;
}

interface GetParams {
  id: string;
}

interface GetResponseData {
  restaurant: IRestaurant | null;
}

export async function PUT(req: NextRequest, { params }: { params: GetParams }) {
  const { id } = params;
  const { name, cuisine_type } = await req.json() as PutRequestData;

  await connectMongoDB();
  const res = await Restaurant.findByIdAndUpdate(
    id,
    { name, cuisine_type },
    { new: true }
  );
  console.log("res mongo: ", res);
  return NextResponse.json({ message: "Restaurant updated" }, { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
  const { id } = params;

  await connectMongoDB();
  const restaurant = await Restaurant.findById(id);

  const responseData: GetResponseData = { restaurant };

  return NextResponse.json(responseData, { status: 200 });
}
