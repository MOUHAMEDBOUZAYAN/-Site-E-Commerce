const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

router.post('/', async (req, res) => {
  const { productId, name, comment } = req.body;

  if (!productId || !name || !comment) {
    return res.status(400).json({ message: 'Product ID, nom et commentaire sont requis.' });
  }

  try {
    const newComment = new Comment({ productId, name, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ message: 'Product ID requis.' });

    const comments = await Comment.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: error.message });
  }
});

module.exports = router;
