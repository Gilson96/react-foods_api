const RecommendedFood = require("../model/recommendedFoodData")
const Restaurant = require("../model/restaurantData")

// Create a RecommendedFood
exports.createRecommendedFood = async (req, res) => {
    const restaurantId = req.params.id
    try {
        const createRecommendedFood = await RecommendedFood.create(req.body)
        const AddRecommendedFoodToRestaurant = await Restaurant.findOneAndUpdate({ id: restaurantId }, { $push: { recommendedFoods: createRecommendedFood } }, { new: true })
        res.status(200).json(AddRecommendedFoodToRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all RecommendedFood data
exports.getRecommendedFoods = async (req, res) => {
    const restaurantId = req.params.id
    try {
        const recommendedFoods = await Restaurant.findOne({ id: restaurantId }).populate('recommendedFoods', "-_id", "-__v");
        res.status(200).json(recommendedFoods);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific RecommendedFood
exports.getRecommendedFood = async (req, res) => {
    const recommendedFoodId = req.params.recommendedFoodId;
    try {
        const recommendedFood = await RecommendedFood.findOne({ _id: recommendedFoodId });
        res.status(200).json(recommendedFood);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a RecommendedFood
exports.updateRecommendedFood = async (req, res) => {
    const recommendedFoodId = req.params.recommendedFoodId;
    try {
        const updatedRecommendedFood = await RecommendedFood.findOneAndUpdate({ _id: recommendedFoodId }, req.body, { new: true });
        res.status(200).json(updatedRecommendedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a RecommendedFood
exports.deleteRecommendedFood = async (req, res) => {
    const recommendedFoodId = req.params.recommendedFoodId;
    try {
        await RecommendedFood.findOneAndDelete({ _id: recommendedFoodId });
        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
