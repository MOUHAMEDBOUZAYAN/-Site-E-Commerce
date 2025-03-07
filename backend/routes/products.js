const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allowed extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, and .png files are allowed!'));
    }
  },
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des produits',
      error: error.message,
    });
  }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Produit non trouvé',
      });
    }

    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération du produit',
      error: error.message,
    });
  }
});

// POST - Add a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || stock === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Tous les champs sont requis',
      });
    }

    // Multer adds the file info to `req.file`.
   

    const imagePath = req.file ? req.file.path : '';

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      image:imagePath,
    });

    await newProduct.save();

    res.status(201).json({
      status: 'success',
      message: 'Produit ajouté avec succès',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: "Erreur lors de l'ajout du produit",
      error: error.message,
    });
  }
});

module.exports = router;