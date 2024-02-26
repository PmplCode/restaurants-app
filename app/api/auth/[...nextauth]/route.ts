import { connectMongoDB } from "@/app/lib/mongodb";
import User, { IUser } from "@/models/user";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { SessionStrategy } from "next-auth";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials: Credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user: IUser | null = await User.findOne({ email });
          if (!user) return null;

          const passwordMatch: boolean = await bcrypt.compare(
            password,
            user.password
          );
          if (!passwordMatch) return null;

          return { name: user.fullName, email } as any;
        } catch (error) {
          console.log("Error: ", error);
          throw new Error("Error during authentication");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;
