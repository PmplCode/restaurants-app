import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface RegisterData {
  json(): RegisterData | PromiseLike<RegisterData>;
  fullName: string;
  email: string;
  password: string;
}

export async function POST(req: RegisterData) {
  try {
    const { fullName, email, password }: RegisterData = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ fullName, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error while registering the user.",
      },
      { status: 500 }
    );
  }
}
