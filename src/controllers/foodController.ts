import Food from "../model/foodData";
import Restaurant from "../model/restaurantData";
import { Request, Response } from "express";

// Create a Food
exports.createFood = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const createFood = await Food.create(req.body);

    const AddFoodToRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { foods: createFood } },
      { new: true }
    );

    res.status(200).json(AddFoodToRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get all Food data
exports.getFoods = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const foods = await Food.find()

    res.status(200).json(foods);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get a specific Food
exports.getFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;
  const restaurantId = req.params.restaurantId;
  try {
    const food = await Restaurant.find({ _id: restaurantId }).populate({
      path: "foods",
      match: { _id: foodId },
    });

    res.status(200).json(food);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Update a Food
exports.updateFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;
  try {
    const updatedFood = await Food.findOneAndUpdate({ _id: foodId }, req.body, {
      new: true,
    });
    res.status(200).json(updatedFood);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Delete a Food
exports.deleteFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;
  const restaurantId = req.params.restaurantId;
  try {
    const foodToDelete = await Food.findOneAndDelete({ _id: foodId });

    await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $pull: { foods: foodToDelete } },
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

