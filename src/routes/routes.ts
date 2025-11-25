import express, { RequestHandler } from "express";
import { check } from "express-validator";
import * as foodOperations from "../controllers/foodController";
import ratingAndReviewsOperations from "../controllers/ratingReviewsController";
import restaurantOperations from "../controllers/RestaurantController";
import userOperations from "../controllers/userController";
import categoryOperations from "../controllers/categoryController";
import paymentOperations from "../controllers/paymentController";
import { imagekit } from "./uploadImage";
import upload from "../controllers/multerConfig";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Category browsing
router.get("/categories", categoryOperations.getCategories);
router.get("/category/:categoryId", categoryOperations.getCategory);

// Restaurant browsing
router.get("/restaurants", restaurantOperations.getRestaurants);
router.get("/restaurant/:restaurantId", restaurantOperations.getRestaurant);

// Food browsing
router.get("/foods", foodOperations.getFoods);
router.get("/:restaurantId/food/:foodId", foodOperations.getFood);

// Reviews browsing
router.get("/:restaurantId/reviews", ratingAndReviewsOperations.getRatingAndReviews);
router.get("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.getRatingAndReview);

// Payment
router.post("/payment-intent", paymentOperations.create_payment_intent);


// Users
router.get("/user", userOperations.getUsers);
router.put("/user/:userId", userOperations.editUser);
router.post("/:userId/favourites/", userOperations.AddFavouriteRestaurants);
router.post("/:userId/favourites/:restaurantId", userOperations.RemoveFavouriteRestaurants);
router.post("/:userId/orders", userOperations.AddOrders);
router.post("/:userId/orders/:foodId", userOperations.RemoveOrdersRestaurants);

// Admins
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
  upload.fields([
    { name: "poster_image", maxCount: 1 },
    { name: "logo_image", maxCount: 1 },
  ]),
  restaurantOperations.createRestaurant as RequestHandler
);

router.put("/restaurant/:restaurantId", restaurantOperations.updateRestaurant);
router.delete("/restaurant/:restaurantId/:categoryId", restaurantOperations.deleteRestaurant);
router.post(
  "/:restaurantId/food",
  [
    check("name").isString().isLength({ min: 3 }),
    check("price").isNumeric().isLength({ min: 1 }),
    check("description").isString().isLength({ min: 10 }),
  ],
  upload.single("poster_image"),
  foodOperations.createFood as RequestHandler
);
router.put("/:restaurantId/food/:foodId", foodOperations.updateFood);
router.delete("/:restaurantId/food/:foodId", foodOperations.deleteFood);
router.post("/:restaurantId/reviews", ratingAndReviewsOperations.createRatingAndReview);
router.put("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.updateRatingAndReview);
router.delete("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.deleteRatingAndReview);



//Image Upload Auths
router.get("/imagekit-auth", (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

export default router;
