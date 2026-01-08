import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

type RestaurantTypes = {
  _id: Types.ObjectId,
  name: string,
  address: string,
  poster_image: string,
  logo_image: string,
  rating: string,
  deliveryFee: string,
  arrival: number,
  admin: string,
  date: string,
  foods: [{ _id: Types.ObjectId }],
  ratings_and_reviews: [{ _id: Types.ObjectId }],
  category: { _id: Types.ObjectId }
}

const restaurantSchema = new Schema<RestaurantTypes>({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  poster_image: {
    type: String,
  },
  logo_image: {
    type: String,
  },
  rating: {
    type: String,
  },
  deliveryFee: {
    type: String,
  },
  arrival: {
    type: Number,
  },
  admin: {
    type: String,
  },
  foods: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Food",
    },
  ],
  ratings_and_reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Rating&Review",
    },
  ],
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

const user = mongoose.model("Restaurant", restaurantSchema);
export default user;
