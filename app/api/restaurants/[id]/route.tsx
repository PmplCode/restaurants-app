import { connectMongoDB } from "@/app/lib/mongodb";
import Restaurant from "@/models/restaurant";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, cuisine_type } = await req.json();

  await connectMongoDB();
  const res = await Restaurant.findByIdAndUpdate(
    id,
    { name, cuisine_type },
    { new: true }
  );
  console.log("res mongo: ", res);
  return NextResponse.json({ message: "Restaurant updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;

  await connectMongoDB();
  const restaurant = await Restaurant.findById(id);

  return NextResponse.json({ restaurant }, { status: 200 });
}
