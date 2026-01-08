import express from "express";
import { check } from "express-validator";
import * as foodOperations from "../controllers/foodController";
import ratingAndReviewsOperations from "../controllers/ratingReviewsController";
import restaurantOperations from "../controllers/RestaurantController";
import userOperations from "../controllers/userController";
import categoryOperations from "../controllers/categoryController";
import paymentOperations from "../controllers/paymentController";

const router = express.Router();

router.get("/categories", categoryOperations.getCategories);
router.get("/category/:categoryId", categoryOperations.getCategory);

router.get("/restaurants", restaurantOperations.getRestaurants);
router.get("/restaurant/:restaurantId", restaurantOperations.getRestaurant);

router.get("/foods", foodOperations.getFoods);
router.get("/:restaurantId/food/:foodId", foodOperations.getFood);

router.get("/:restaurantId/reviews", ratingAndReviewsOperations.getRatingAndReviews);
router.get("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.getRatingAndReview);

router.post("/payment-intent", paymentOperations.create_payment_intent);

router.get("/user", userOperations.getUsers);
router.put("/user/:userId", userOperations.editUser);
router.post("/:userId/favourites/", userOperations.AddFavouriteRestaurants);
router.post("/:userId/favourites/:restaurantId", userOperations.RemoveFavouriteRestaurants);
router.post("/:userId/orders", userOperations.AddOrders);
router.post("/:userId/orders/:foodId", userOperations.RemoveOrdersRestaurants);

router.post("/category", categoryOperations.createCategory);
router.post(
  "/restaurant/:categoryId",
  [
    check("name").isString().isLength({ min: 5 }),
    check("address").isString().isLength({ min: 10 }),
    check("admin").isString().isLength({ min: 5 }),
    check("deliveryFee").isNumeric().isLength({ min: 1 }),
    check("arrival").isNumeric().isLength({ max: 50 }),
  ],
  restaurantOperations.createRestaurant
);

router.put("/restaurant/:restaurantId", restaurantOperations.updateRestaurant);
router.delete("/restaurant/:restaurantId/:categoryId", restaurantOperations.deleteRestaurant);
router.post("/:restaurantId/food",foodOperations.createFood);
router.put("/:restaurantId/food/:foodId", foodOperations.updateFood);
router.delete("/:restaurantId/food/:foodId", foodOperations.deleteFood);
router.post("/:restaurantId/reviews", ratingAndReviewsOperations.createRatingAndReview);
router.put("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.updateRatingAndReview);
router.delete("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.deleteRatingAndReview);


export default router;
