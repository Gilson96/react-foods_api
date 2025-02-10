const Restaurant = require("../model/restaurantData")
const Category = require("../model/categoryData");

// Create a Restaurant
exports.createRestaurant = async (req, res) => {
    const categoryId = req.params.categoryId
    try {
        const createRestaurant = await Restaurant.create(req.body)
        const AddRestaurantToCategory = await Category.findOneAndUpdate({ _id: categoryId }, { $push: { restaurants: createRestaurant } }, { new: true })
        res.status(200).json(AddRestaurantToCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Restaurant data
exports.getRestaurants = async (req, res) => {
    try {
        const Restaurants = await Restaurant.find();
        res.status(200).json(Restaurants);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific Restaurant
exports.getRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    try {
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a Restaurant
exports.updateRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    try {
        const updatedRestaurant = await Restaurant.findOneAndUpdate({ _id: restaurantId }, req.body, { new: true });
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Restaurant
exports.deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const categoryId = req.params.categoryId
    try {
        const restaurantToDelete = await Restaurant.findOneAndDelete({ _id: "67a88809ffebbc48d0fd3236" });

        await Category.findOneAndUpdate({ _id: categoryId }, { $pull: { restaurants: "67a88809ffebbc48d0fd3235" } }, { new: true })

        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}