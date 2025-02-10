const User = require("../model/userData")

// Create a User
exports.createUser = async (req, res) => {
    console.log(req.body)
    try {
        const createUser = await User.create(req.body)
        res.status(200).json(createUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all User data
exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific User
exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({ id: id });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// Update a User
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findOneAndUpdate({ id: id }, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a User
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findOneAndDelete({ id: id });
        res.status(200).json('deleted');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
