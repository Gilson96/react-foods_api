import Restaurant from "../model/restaurantData";
import Category from "../model/categoryData";
import { Request, Response } from "express";

export const createRestaurant = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;

  try {

    const createdRestaurant = await Restaurant.create(req.body);

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { restaurants: createdRestaurant._id } },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getRestaurants = async (req: Request, res: Response) => {
  try {
    const Restaurants = await Restaurant.find().lean();
    res.status(200).json(Restaurants);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId }).lean();
    res.status(200).json(restaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

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
      res.status(400).json({ message: error.message });
    }
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  const categoryId = req.params.categoryId;
  try {
    const restaurantToDelete = await Restaurant.findOneAndDelete({
      _id: restaurantId,
    });

    await Category.findOneAndUpdate(
      { _id: categoryId },
      { $pull: { restaurants: restaurantToDelete } },
      { new: true }
    );

    res.status(200).json("deleted");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
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
