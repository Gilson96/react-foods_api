const Food = require("../model/foodData")
const Restaurant = require("../model/restaurantData")

// Create a Food
exports.createFood = async (req, res) => {
    const restaurantId = req.params.restaurantId
    try {
        const createFood = await Food.create(req.body)

        const AddFoodToRestaurant = await Restaurant.findOneAndUpdate({ _id: restaurantId }, { $push: { foods: createFood } }, { new: true })

        res.status(200).json(AddFoodToRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Food data
exports.getFoods = async (req, res) => {
    const restaurantId = req.params.restaurantId
    try {
        const foods = await Restaurant.findOne({ _id: restaurantId }).populate('foods', "-__v");

        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific Food
exports.getFood = async (req, res) => {
    const foodId = req.params.foodId;
    const restaurantId = req.params.restaurantId
    try {
        const food = await Restaurant.find({ _id: restaurantId }).populate({ path: "foods", match: ({ _id: foodId }) })

        res.status(200).json(food);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a Food
exports.updateFood = async (req, res) => {
    const foodId = req.params.foodId;
    try {
        const updatedFood = await Food.findOneAndUpdate({ _id: foodId }, req.body, { new: true });

        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Food
exports.deleteFood = async (req, res) => {
    const foodId = req.params.foodId;
    const restaurantId = req.params.restaurantId;
    try {
        const foodToDelete = await Food.findOneAndDelete({ _id: foodId })

        await Restaurant.findOneAndUpdate({ _id: restaurantId }, { $pull: { foods: foodToDelete } }, { new: true })

        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
