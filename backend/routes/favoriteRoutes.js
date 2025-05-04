const express = require("express");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:countryCode", removeFavorite);

module.exports = router;
