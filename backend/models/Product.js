const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom du produit est obligatoire"],
    minlength: [2, "Le nom doit contenir au moins 3 caractères"],
    maxlength: [100, "Le nom ne doit pas dépasser 100 caractères"]
  },
  description: {
    type: String,
    required: [true, "La description est obligatoire"],
    minlength: [10, "La description doit contenir au moins 10 caractères"]
  },
  price: {
    type: Number,
    required: [true, "Le prix est obligatoire"],
    min: [0, "Le prix ne peut pas être négatif"]
  },
  stock: {
    type: Number,
    required: [true, "Le stock est obligatoire"],
    min: [0, "Le stock ne peut pas être négatif"]
  },
  category: {
    type: String,
    required: [true, "La catégorie est obligatoire"],
    enum: {
      values: ['women', 'sport', 'home', 'electronics'],
      message: "Catégorie invalide"
    }
  },
  image: {
    type: String,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
