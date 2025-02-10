const express = require("express");
const foodOperations = require("../controllers/foodController");
const ratingAndReviewsOperations = require("../controllers/ratingReviewsController");
const recommendedFoodOperations = require("../controllers/RecommendedFoodController");
const restaurantOperations = require("../controllers/RestaurantController");
const userOperations = require("../controllers/userController");
const categoryOperations = require("../controllers/categoryController");

const router = express.Router();

// user routes
router.get('/user', userOperations.getUsers);
router.get('/user/:id', userOperations.getUser);
router.post('/user', userOperations.createUser);
router.put('/user/:id', userOperations.updateUser);
router.delete('/user', userOperations.deleteUser);

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

// recommended routes
router.post('/:restaurantId/recommededFoods', recommendedFoodOperations.createRecommendedFood);
router.get('/:restaurantId/recommededFoods', recommendedFoodOperations.getRecommendedFoods);
router.get('/:restaurantId/recommededFoods/:recommededFoodId', recommendedFoodOperations.getRecommendedFood);
router.put('/:restaurantId/recommendedFoods/recommededFoodId', recommendedFoodOperations.updateRecommendedFood);
router.delete('/:restaurantId/recommendedFoods/recommededFoodId', recommendedFoodOperations.deleteRecommendedFood);


module.exports = router;