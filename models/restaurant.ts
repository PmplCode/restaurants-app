import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IRestaurant extends Document {
  _id: ObjectId;
  name: string;
  neighborhood?: string;
  photograph?: string;
  address?: string;
  latlng?: {
    lat?: number;
    lng?: number;
  };
  image?: string;
  cuisine_type: ["Asian", "Pizza", "American", "Mexican", "Other"];
  operating_hours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  reviews: any;
}

type IRestaurantSchemaDefinition = mongoose.SchemaDefinition<IRestaurant>;

const restaurantSchema: Schema<IRestaurantSchemaDefinition> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    neighborhood: {
      type: String,
    },
    photograph: {
      type: String,
    },
    address: {
      type: String,
    },
    latlng: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    image: {
      type: String,
    },
    cuisine_type: {
      type: String,
      enum: ["Asian", "Pizza", "American", "Mexican", "Other"],
      required: true,
    },
    operating_hours: {
      Monday: {
        type: String,
      },
      Tuesday: {
        type: String,
      },
      Wednesday: {
        type: String,
      },
      Thursday: {
        type: String,
      },
      Friday: {
        type: String,
      },
      Saturday: {
        type: String,
      },
      Sunday: {
        type: String,
      },
    },
    reviews: {
      type: ["Mixed"],
    },
  },
  { timestamps: true }
);

const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", restaurantSchema);

export default Restaurant;
