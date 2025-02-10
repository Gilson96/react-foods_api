const Category = require("../model/categoryData")

// Create a Category
exports.createCategory = async (req, res) => {
    try {
        const createCategory = await Category.create(req.body)
        res.status(200).json(createCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all Category data
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific Category
exports.getCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await Category.findOne({ _id: categoryId }).populate('restaurants', "-__v")
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a Category
exports.updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId }, req.body, { new: true })
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a Category
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        await Category.findByIdAndDelete({ _id: categoryId  })
        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
