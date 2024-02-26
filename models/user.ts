import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  favouriteRestaurants: Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favouriteRestaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
