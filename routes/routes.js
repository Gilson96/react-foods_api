const express = require("express");
const foodOperations = require("../controllers/foodController");
const ratingAndReviewsOperations = require("../controllers/ratingReviewsController");
const restaurantOperations = require("../controllers/RestaurantController");
const userOperations = require("../controllers/userController");
const categoryOperations = require("../controllers/categoryController");
const paymentOperations = require("../controllers/paymentController");
const checkAuth = require('../middleware/check-auth')
const router = express.Router();
const { check } = require('express-validator')

// category routes
router.post('/category', categoryOperations.createCategory);
router.get('/category', categoryOperations.getCategories);
router.get('/category/:categoryId', categoryOperations.getCategory);
router.put('/category/:categoryId', categoryOperations.updateCategory);
router.delete('/category/:categoryId', categoryOperations.deleteCategory);

// restaurant routes
router.post('/restaurant/:categoryId', restaurantOperations.createRestaurant);
router.get('/restaurant', restaurantOperations.getRestaurants);
router.get('/restaurant/:restaurantId', restaurantOperations.getRestaurant);
router.put('/restaurant/:restaurantId', restaurantOperations.updateRestaurant);
router.delete('/restaurant/:restaurantId/:categoryId', restaurantOperations.deleteRestaurant);

// food routes
router.post('/:restaurantId/food', foodOperations.createFood);
router.get('/:restaurantId/food', foodOperations.getFoods);
router.get('/:restaurantId/food/:foodId', foodOperations.getFood);
router.put('/:restaurantId/food/:foodId', foodOperations.updateFood);
router.delete('/:restaurantId/food/:foodId', foodOperations.deleteFood);

// rating & revies routes
router.post('/:restaurantId/reviews', ratingAndReviewsOperations.createRatingAndReview);
router.get('/:restaurantId/reviews', ratingAndReviewsOperations.getRatingAndReviews);
router.get('/:restaurantId/reviews/:reviewsId', ratingAndReviewsOperations.getRatingAndReview);
router.put('/:restaurantId/reviews/:reviewsId', ratingAndReviewsOperations.updateRatingAndReview);
router.delete('/:restaurantId/reviews/:reviewsId', ratingAndReviewsOperations.deleteRatingAndReview);

// payement
router.post('/payement-intent', paymentOperations.create_payment_intent);


router.post('/signup', [
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password')
    .isLength({ min: 6 })
], userOperations.signup)

router.post('/login', userOperations.login)
router.use(checkAuth)

router.get('/user', userOperations.getUsers)
router.post('/:userId/favourites', userOperations.AddFavouriteRestaurants)
router.post('/:userId/orders', userOperations.AddOrders)
// router.delete('/user/delete', userOperations.UserDelete)

module.exports = router;