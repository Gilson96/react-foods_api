import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

type RatingsAndReviewsTypes = {
  _id: Types.ObjectId,
  name: string,
  rating: string,
  description: string,
  date: string,
  restaurant: { _id: Types.ObjectId },
}

const ratingsAndReviewsSchema = new Schema<RatingsAndReviewsTypes>({
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
  ratingsAndReviewsSchema
);
export default ratingsAndreviews;
