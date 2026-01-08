import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

type UserTypes = {
  _id: Types.ObjectId,
  name: string,
  email: string,
  password: string,
  role: string,
  image: string,
  address: string,
  admin: string,
  restaurant: { _id: Types.ObjectId },
  favouritesRestaurants: [{ _id: Types.ObjectId }],
  orders: [{ _id: Types.ObjectId }, { restaurant_id: Types.ObjectId }, {
    foods: [{
      foodId: Types.ObjectId,
      name: string
      price: string
      description: string
      poster_image: string,
      quantity: number
    }],
    totalPrice: number,
    timestamp: number
  }],
}

const userSchema = new Schema<UserTypes>({
  name: {
    type: String,
    required: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
  image: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  favouritesRestaurants: [
    {
      restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    },
  ],
  orders: [
    {
      restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      },
      foods: [
        {
          foodId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Food",
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          poster_image: {
            type: String,
          },
          quantity: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      timeStamp: { type: Number, required: true },
    },
  ],
});

const user = mongoose.model("User", userSchema);
export default user;
