import User from "../model/userData";
import { Request, Response, NextFunction } from "express";

exports.getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};
exports.editUser = async (req: Request, res: Response) => {
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

exports.UserDelete = async (req: Request, res: Response) => {
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

exports.VerifyAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Authorization check failed." });
  }
};
