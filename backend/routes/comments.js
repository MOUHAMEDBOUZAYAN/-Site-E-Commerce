const express = require('express');
const Comment = require('../models/Comments');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ message: 'Le nom et le commentaire sont requis.' });
  }

  try {
    const newComment = new Comment({ name, comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires', error: error.message });
  }
});

module.exports = router;
