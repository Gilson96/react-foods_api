const User = require("../model/userData")
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res, next) => {
    let users;
    try {
        // find and returns users
        // excluding the password
        users = await User.find();
    } catch (err) {
        const error = res.status(500).json({ message: 'Fetching users failed ,please try again later' });
        return next(error)
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

exports.UserDelete = async (req, res) => {
    try {
        const updatedOrders = await User.findOneAndDelete({ _id: "67fd9a1272e21ee51761c003" })
        res.status(200).json(updatedOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.AddFavouriteRestaurants = async (req, res) => {
    const userId = req.params.userId
    try {
        const updatedFavourite = await User.findOneAndUpdate({ _id: userId }, { $push: { favouritesRestaurants: req.body } }, { new: true })
        res.status(200).json(updatedFavourite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.RemoveFavouriteRestaurants = async (req, res) => {
    const userId = req.params.userId
    const restaurantId = req.params.restaurantId
    try {
        const removeRestaurant = await User.findByIdAndUpdate({ _id: userId }, { $pull: { favouritesRestaurants: { _id: restaurantId } } }, { new: true })
        res.status(200).json(removeRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.AddOrders = async (req, res) => {
    const userId = req.params.userId
    try {
        const updatedOrders = await User.findOneAndUpdate({ _id: userId }, { $push: { orders: req.body } }, { new: true })
        res.status(200).json(updatedOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.RemoveOrdersRestaurants = async (req, res) => {
    const userId = req.params.userId
    const foodId = req.params.foodId
    try {
        const removeRestaurant = await User.findByIdAndUpdate({ _id: userId }, { $pull: { orders: { _id: foodId } } }, { new: true })
        res.status(200).json(removeRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



exports.getUsers = getUsers;
