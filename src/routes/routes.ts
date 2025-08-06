import express, { RequestHandler } from "express";
import { check } from "express-validator";
import * as foodOperations from "../controllers/foodController";
import ratingAndReviewsOperations from "../controllers/ratingReviewsController";
import restaurantOperations from "../controllers/RestaurantController";
import authOperations from "../controllers/authController";
import userOperations from "../controllers/userController";
import categoryOperations from "../controllers/categoryController";
import paymentOperations from "../controllers/paymentController";
import checkAuth from "../middleware/check-auth";
import { requireAdmin } from "../middleware/requireAdmin";
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

// Authentication
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  authOperations.signup
);
router.post("/login", authOperations.login);
router.post("/logout", authOperations.logout);

/* ===========================
   Protected Routes (Auth Required)
=========================== */

router.use(checkAuth);

// Users
router.get("/user", userOperations.getUsers);
router.put("/user/:userId", userOperations.editUser);
router.post("/:userId/favourites/", userOperations.AddFavouriteRestaurants);
router.post("/:userId/favourites/:restaurantId", userOperations.RemoveFavouriteRestaurants);
router.post("/:userId/orders", userOperations.AddOrders);
router.post("/:userId/orders/:foodId", userOperations.RemoveOrdersRestaurants);

/* ===========================
   Admin-Only Routes
=========================== */

// Category management
router.post("/category", requireAdmin, categoryOperations.createCategory);

// Restaurant management
router.post(
  "/restaurant/:categoryId",
  requireAdmin,
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
router.put("/restaurant/:restaurantId", requireAdmin, restaurantOperations.updateRestaurant);
router.delete("/restaurant/:restaurantId/:categoryId", requireAdmin, restaurantOperations.deleteRestaurant);

// Food management
router.post(
  "/:restaurantId/food",
  requireAdmin,
  [
    check("name").isString().isLength({ min: 3 }),
    check("price").isNumeric().isLength({ min: 1 }),
    check("description").isString().isLength({ min: 10 }),
  ],
  upload.single("poster_image"),
  foodOperations.createFood as RequestHandler
);
router.put("/:restaurantId/food/:foodId", requireAdmin, foodOperations.updateFood);
router.delete("/:restaurantId/food/:foodId", requireAdmin, foodOperations.deleteFood);

// Review management
router.post("/:restaurantId/reviews", ratingAndReviewsOperations.createRatingAndReview);
router.put("/:restaurantId/reviews/:reviewsId", ratingAndReviewsOperations.updateRatingAndReview);
router.delete("/:restaurantId/reviews/:reviewsId", requireAdmin, ratingAndReviewsOperations.deleteRatingAndReview);

/* ===========================
   Image Upload Auth
=========================== */
router.get("/imagekit-auth", (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

export default router;
