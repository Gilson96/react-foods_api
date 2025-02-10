const RatingAndReview = require("../model/ratings&reviewsData")
const Restaurant = require("../model/restaurantData")

// Create a RatingAndReview
exports.createRatingAndReview = async (req, res) => {
    const restaurantId = req.params.restaurantId
    try {
        const createRatingAndReview = await RatingAndReview.create(req.body)

        const AddReviewToRestaurant = await Restaurant.findOneAndUpdate({ _id: restaurantId }, { $push: { ratings_and_reviews: createRatingAndReview } }, { new: true })

        res.status(200).json(AddReviewToRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all RatingAndReview data
exports.getRatingAndReviews = async (req, res) => {
    const restaurantId = req.params.restaurantId
    try {
        const ratingAndReviews = await Restaurant.findOne({ _id: restaurantId }).populate('ratings_and_reviews', "-__v");

        res.status(200).json(ratingAndReviews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific RatingAndReview
exports.getRatingAndReview = async (req, res) => {
    const reviewsId = req.params.reviewsId;
    const restaurantId = req.params.restaurantId
    try {
        const ratingAndReview = await Restaurant.findOne({ _id: restaurantId }).populate({ path: "ratings_and_reviews", match: ({ _id: reviewsId }) })

        res.status(200).json(ratingAndReview);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a RatingAndReview
exports.updateRatingAndReview = async (req, res) => {
    const reviewsId = req.params.reviewsId;
    try {
        const updatedRatingAndReview = await RatingAndReview.findOneAndUpdate({ _id: reviewsId }, req.body, { new: true });
        res.status(200).json(updatedRatingAndReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a RatingAndReview
exports.deleteRatingAndReview = async (req, res) => {
    const reviewsId = req.params.reviewsId;
    const restaurantId = req.params.restaurantId;
    try {
        await Restaurant.findOneAndUpdate({ _id: restaurantId }, { $pull: { ratings_and_reviews: reviewsId } }, { new: true })

        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
