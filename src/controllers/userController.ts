import User from "../model/userData";
import { Request, Response, NextFunction } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};
const editUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const updatedRestaurant = await User.findOneAndUpdate(
      { _id: userId },
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

const UserDelete = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const updatedOrders = await User.findOneAndDelete({
      _id: userId,
    });
    res.status(200).json(updatedOrders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

const AddFavouriteRestaurants = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const updatedFavourite = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { favouritesRestaurants: req.body } },
      { new: true }
    );
    res.status(200).json(updatedFavourite);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

const RemoveFavouriteRestaurants = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const restaurantId = req.params.restaurantId;
  try {
    const removeRestaurant = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favouritesRestaurants: { _id: restaurantId } } },
      { new: true }
    );
    res.status(200).json(removeRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

const AddOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const updatedOrders = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: req.body } },
      { new: true }
    );
    res.status(200).json(updatedOrders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

const RemoveOrdersRestaurants = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const foodId = req.params.foodId;
  try {
    const removeRestaurant = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { orders: { _id: foodId } } },
      { new: true }
    );
    res.status(200).json(removeRestaurant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

export default {
  AddFavouriteRestaurants,
  AddOrders,
  RemoveFavouriteRestaurants,
  RemoveOrdersRestaurants,
  editUser,
  getUsers,
  UserDelete,
};
