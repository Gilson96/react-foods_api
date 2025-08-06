import Food from "../model/foodData";
import Restaurant from "../model/restaurantData";
import { Request, Response } from "express";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}

// Create a Food
const createFood = async (req: MulterRequest, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const foodImageFile =
      req.file ||
      (Array.isArray(req.files)
        ? (req.files.find((f) => f.fieldname === "poster_image") as
            | Express.Multer.File
            | undefined)
        : undefined);

    const foodPayload = {
      ...req.body,
      poster_image: foodImageFile?.path || "",
      restaurant: restaurantId,
    };

    const createdFood = await Food.create(foodPayload);

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { foods: createdFood._id } },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// Get all Food data
const getFoods = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const foods = await Food.find().lean();

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
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Update a Food
const updateFood = async (req: Request, res: Response) => {
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
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

export { createFood, getFood, getFoods, deleteFood, updateFood };
