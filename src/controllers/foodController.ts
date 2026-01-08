import Food from "../model/foodData";
import Restaurant from "../model/restaurantData";
import { Request, Response } from "express";

const createFood = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;

  try {

    const createdFood = await Food.create(req.body);

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { foods: createdFood._id } },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find().lean();

    res.status(200).json(foods);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;
  const restaurantId = req.params.restaurantId;
  try {
    const food = await Restaurant.find({ _id: restaurantId }).populate({
      path: "foods",
      match: { _id: foodId },
    }).lean();

    res.status(200).json(food);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const updateFood = async (req: Request, res: Response) => {
  const foodId = req.params.foodId;
  try {
    const updatedFood = await Food.findOneAndUpdate({ _id: foodId }, req.body, {
      new: true,
    });
    res.status(200).json(updatedFood);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteFood = async (req: Request, res: Response) => {
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
      res.status(400).json({ message: error.message });
    }
  }
};

export { createFood, getFood, getFoods, deleteFood, updateFood };
