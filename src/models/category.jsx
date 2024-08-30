// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // Ensures category names are unique
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on each save
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
