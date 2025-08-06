import Restaurant from "../model/restaurantData";
import Category from "../model/categoryData";
import { Request, Response } from "express";

interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Create a Restaurant
export const createRestaurant = async (req: MulterRequest, res: Response) => {
  const categoryId = req.params.categoryId;

  try {
    const posterImage = req.files?.poster_image?.[0]?.path || "";
    const logoImage = req.files?.logo_image?.[0]?.path || "";

    const restaurantPayload = {
      ...req.body,
      poster_image: posterImage, // now a string (file path)
      logo_image: logoImage, // now a string (file path)
      category: categoryId,
    };

    const createdRestaurant = await Restaurant.create(restaurantPayload);

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { restaurants: createdRestaurant._id } },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown server error",
    });
  }
};
// Get all Restaurant data
const getRestaurants = async (req: Request, res: Response) => {
  try {
    const Restaurants = await Restaurant.find().lean();
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
const getRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId }).lean();
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
const updateRestaurant = async (req: Request, res: Response) => {
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
const deleteRestaurant = async (req: Request, res: Response) => {
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

export default {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
};
