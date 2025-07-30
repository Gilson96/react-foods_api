import Category from "../model/categoryData";
import { Request, Response } from "express";

// Create a Category
const createCategory = async (req: Request, res: Response) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get all Category data
const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Get a specific Category
const getCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findOne({ _id: categoryId }).populate(
      "restaurants",
      "-__v"
    );
    res.status(200).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Update a Category
const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(404).json({ message: "Unknown error occurred" });
    }
  }
};

// Delete a Category
const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    await Category.findByIdAndDelete({ _id: categoryId });
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
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
