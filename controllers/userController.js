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

const signup = async (req, res, next) => {
    // inputs validation
    // with 'express-validator'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(res.status(422).json({ message: 'invalid credentials,please try again later' }));
    }

    const { name, email, password, address } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: 'invalid credentials,please try again later' });
        return next(error);
    }

    if (existingUser) {
        const error = res.status(422).json({ message: 'invalid credentials,please try again later' });
        return next(error)
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = res.status(500).json({ message: 'Could not create user ,please try again later' });
        return next(error)
    }

    const createdUser = new User({
        name,
        email,
        address,
        password: hashedPassword
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = res.status(500).json({ message: 'Signing up failed ,please try again later' });
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, 'secret', { expiresIn: '1h' })
    } catch (err) {
        const error = res.status(500).json({ message: 'Signing up failed ,please try again later' });
        return next(error)
    }

    // toObject convert mongoDB object
    // into a POJO 
    // getters removes '_' from '_id'
    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = res.status(500).json({ message: 'Logging in failed,please try again later' });
        return next(error);
    }

    // if existing user is not stored in the database
    // or if the existing user password
    // is not equal to the password entered
    if (!existingUser) {
        const error = res.status(401).json({ message: 'Invalid credentials,please try again later' });
        return next(error)
    }

    let isValidPassword = false
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = res.status(500).json({ message: 'Could not log youn in, please try again later' });
        return next(error)
    }

    if (!isValidPassword) {
        const error = res.status(401).json({ message: 'Invalid credentials, please try again later' });
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, 'secret', { expiresIn: '1h' })
    } catch (err) {
        const error = res.status(500).json({ message: 'Logging in failed ,please try again later' });
        return next(error)
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    })
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

exports.AddOrders = async (req, res) => {
    const userId = req.params.userId
    try {
        const updatedOrders = await User.findOneAndUpdate({ _id: userId }, { $push: { orders: req.body } }, { new: true })
        res.status(200).json(updatedOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.UserDelete = async (req, res) => {
    try {
        const updatedOrders = await User.findOneAndDelete({ _id: "67fd7a59fcc4a590dd8be514" })
        res.status(200).json(updatedOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;