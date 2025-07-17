import RatingAndReview from "../model/ratings&reviewsData";
import Restaurant from "../model/restaurantData";
import { Request, Response } from "express";

// Create a RatingAndReview
exports.createRatingAndReview = async (
  req: Request<{ restaurantId: string }>,
  res: Response
) => {
  const restaurantId = req.params.restaurantId;
  try {
    const createRatingAndReview = await RatingAndReview.create(req.body);
    const AddReviewToRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { ratings_and_reviews: createRatingAndReview } },
      { new: true }
    );

    res.status(200).json(AddReviewToRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get all RatingAndReview data
exports.getRatingAndReviews = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const ratingAndReviews = await Restaurant.findOne({
      _id: restaurantId,
    }).populate("ratings_and_reviews", "-__v");

    res.status(200).json(ratingAndReviews);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get a specific RatingAndReview
exports.getRatingAndReview = async (req: Request, res: Response) => {
  const reviewsId = req.params.reviewsId;
  const restaurantId = req.params.restaurantId;
  try {
    const ratingAndReview = await Restaurant.findOne({
      _id: restaurantId,
    }).populate({ path: "ratings_and_reviews", match: { _id: reviewsId } });

    res.status(200).json(ratingAndReview);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Update a RatingAndReview
exports.updateRatingAndReview = async (req: Request, res: Response) => {
  const reviewsId = req.params.reviewsId;
  try {
    const updatedRatingAndReview = await RatingAndReview.findOneAndUpdate(
      { _id: reviewsId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRatingAndReview);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Delete a RatingAndReview
exports.deleteRatingAndReview = async (req: Request, res: Response) => {
  const reviewsId = req.params.reviewsId;
  const restaurantId = req.params.restaurantId;
  try {
    await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $pull: { ratings_and_reviews: reviewsId } },
      { new: true }
    );

    res.status(200).json("deleted");
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};
