import User from "../model/userData";
import { Request, Response, NextFunction } from "express";

exports.getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let users;
  try {
    // find and returns users
    // excluding the password
    users = await User.find();
  } catch (err) {
    const error = res
      .status(500)
      .json({ message: "Fetching users failed ,please try again later" });
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.UserDelete = async (req: Request, res: Response) => {
  try {
    const updatedOrders = await User.findOneAndDelete({
      _id: "67fd9a1272e21ee51761c003",
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

exports.AddFavouriteRestaurants = async (req: Request, res: Response) => {
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

exports.RemoveFavouriteRestaurants = async (req: Request, res: Response) => {
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

exports.AddOrders = async (req: Request, res: Response) => {
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

exports.RemoveOrdersRestaurants = async (req: Request, res: Response) => {
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

