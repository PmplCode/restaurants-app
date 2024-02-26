import { connectMongoDB } from "@/app/lib/mongodb";
import Restaurant, { IRestaurant } from "@/models/restaurant";
import { NextRequest, NextResponse } from "next/server";
export const fetchCache = 'force-no-store';


interface RestaurantData {
  name: string;
  cuisine_type: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, cuisine_type }: RestaurantData = await req.json();

  await connectMongoDB();
  await Restaurant.create({ name, cuisine_type });

  return NextResponse.json({ message: "Restaurant Created." }, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  await connectMongoDB();

  const restaurants: IRestaurant[] = await Restaurant.find();

  return NextResponse.json({ restaurants });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const id: string | null = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Invalid restaurant ID." },
      { status: 400 }
    );
  }

  await connectMongoDB();
  const res: IRestaurant | null = await Restaurant.findByIdAndDelete(id);

  if (!res) {
    return NextResponse.json(
      { message: "Restaurant not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Restaurant deleted." }, { status: 200 });
}
