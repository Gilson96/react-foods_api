import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema({
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
    required: true,
    ref: "Category",
  },
});

const user = mongoose.model("Restaurant", restaurantSchema);
export default user;
