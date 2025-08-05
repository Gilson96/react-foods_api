import mongoose from "mongoose";
const { Schema } = mongoose;

const ratingsAndreviewsSchema = new Schema({
  name: {
    type: String,
  },
  rating: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
});

const ratingsAndreviews = mongoose.model(
  "Rating&Review",
  ratingsAndreviewsSchema
);
export default ratingsAndreviews;
