const User = require("../models/User");

// Add favorite
exports.addFavorite = async (req, res) => {
  const { country } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(country)) {
      user.favorites.push(country);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove favorite
exports.removeFavorite = async (req, res) => {
  const { countryCode } = req.params;
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((code) => code !== countryCode);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
