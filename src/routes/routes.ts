// src/routes/routes.ts
import express, { Request, RequestHandler } from "express";
import multer from "multer";
import { check } from "express-validator";
import * as foodOperations from "../controllers/foodController";
import ratingAndReviewsOperations from "../controllers/ratingReviewsController";
import restaurantOperations from "../controllers/RestaurantController";
import authOperations from "../controllers/authController";
import userOperations from "../controllers/userController";
import categoryOperations from "../controllers/categoryController";
import paymentOperations from "../controllers/paymentController";
import checkAuth from "../middleware/check-auth";
import crypto from "crypto";

const router = express.Router();

// === Multer setup ===
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => cb(null, "uploads/"),

  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// === Routes ===

// Category routes
router.post("/category", categoryOperations.createCategory);
router.get("/categories", categoryOperations.getCategories);
router.get("/category/:categoryId", categoryOperations.getCategory);
router.put("/category/:categoryId", categoryOperations.updateCategory);
router.delete("/category/:categoryId", categoryOperations.deleteCategory);

// Restaurant routes
router.post(
  "/restaurant/:categoryId",
  upload.fields([
    { name: "poster_image", maxCount: 1 },
    { name: "logo_image", maxCount: 1 },
  ]),
  restaurantOperations.createRestaurant as RequestHandler
);
router.get("/restaurants", restaurantOperations.getRestaurants);
router.get("/restaurant/:restaurantId", restaurantOperations.getRestaurant);
router.put("/restaurant/:restaurantId", restaurantOperations.updateRestaurant);
router.delete(
  "/restaurant/:restaurantId/:categoryId",
  restaurantOperations.deleteRestaurant
);

// Food routes
router.post(
  "/:restaurantId/food",
  upload.single("poster_image"),
  foodOperations.createFood as RequestHandler
);
router.get("/foods", foodOperations.getFoods);
router.get("/:restaurantId/food/:foodId", foodOperations.getFood);
router.put("/:restaurantId/food/:foodId", foodOperations.updateFood);
router.delete("/:restaurantId/food/:foodId", foodOperations.deleteFood);

// Reviews
router.post(
  "/:restaurantId/reviews",
  ratingAndReviewsOperations.createRatingAndReview
);
router.get(
  "/:restaurantId/reviews",
  ratingAndReviewsOperations.getRatingAndReviews
);
router.get(
  "/:restaurantId/reviews/:reviewsId",
  ratingAndReviewsOperations.getRatingAndReview
);
router.put(
  "/:restaurantId/reviews/:reviewsId",
  ratingAndReviewsOperations.updateRatingAndReview
);
router.delete(
  "/:restaurantId/reviews/:reviewsId",
  ratingAndReviewsOperations.deleteRatingAndReview
);

// Payment
router.post("/payment-intent", paymentOperations.create_payment_intent);

// Auth
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

// Users
router.get("/user", userOperations.getUsers);
router.put("/user/:userId", userOperations.editUser);
router.post("/:userId/favourites/", userOperations.AddFavouriteRestaurants);
router.post(
  "/:userId/favourites/:restaurantId",
  userOperations.RemoveFavouriteRestaurants
);
router.post("/:userId/orders", userOperations.AddOrders);
router.post("/:userId/orders/:foodId", userOperations.RemoveOrdersRestaurants);
router.post(
  "/restaurant/:categoryId",
  upload.fields([
    { name: "poster_image", maxCount: 1 },
    { name: "logo_image", maxCount: 1 },
  ]),
  restaurantOperations.createRestaurant as RequestHandler
);
router.post(
  "/:restaurantId/food",
  upload.single("poster_image"),
  foodOperations.createFood as RequestHandler
);
router.delete("/:userId/delete", userOperations.UserDelete);
// image upload route
router.get("/auth", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const token = crypto.randomBytes(16).toString("hex");

  const signature = crypto
    .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY!)
    .update(token + timestamp)
    .digest("hex");

  res.json({
    token,
    expire: timestamp + 240,
    signature,
  });
});
export default router;
