import Restaurant from "../model/restaurantData";
import Category from "../model/categoryData";
import { Request, Response } from "express";

// Create a Restaurant
exports.createRestaurant = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const createRestaurant = await Restaurant.create(req.body);
    const AddRestaurantToCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $push: { restaurants: createRestaurant } },
      { new: true }
    );
    res.status(200).json(AddRestaurantToCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get all Restaurant data
exports.getRestaurants = async (req: Request, res: Response) => {
  try {
    const Restaurants = await Restaurant.find();
    res.status(200).json(Restaurants);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get a specific Restaurant
exports.getRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    res.status(200).json(restaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Update a Restaurant
exports.updateRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Delete a Restaurant
exports.deleteRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  const categoryId = req.params.categoryId;
  try {
    const restaurantToDelete = await Restaurant.findOneAndDelete({
      _id: restaurantId,
    });

    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $pull: { restaurants: "67a88809ffebbc48d0fd3235" } },
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
