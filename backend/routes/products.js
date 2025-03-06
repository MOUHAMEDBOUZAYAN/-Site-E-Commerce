const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res)=> {
    const products= await Product.find();
    res.json(products);
    
});
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Produit non trouvé'
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Erreur lors de la récupération du produit',
        error: error.message
      });
    }
  });

  // Ajouter un nouveau produit
router.post('/', async (req, res) => {
  try {
      const { name, price, description, category, stock } = req.body;

      if (!name || !price || !description || !category || stock === undefined) {
          return res.status(400).json({
              status: 'error',
              message: 'Tous les champs sont requis'
          });
      }

      const newProduct = new Product({
          name,
          price,
          description,
          category,
          stock
      });

      await newProduct.save();

      res.status(201).json({
          status: 'success',
          message: 'Produit ajouté avec succès',
          data: newProduct
      });
  } catch (error) {
      res.status(500).json({
          status: 'error',
          message: "Erreur lors de l'ajout du produit ",
          error: error.message
      });
  }
});
module.exports = router;
