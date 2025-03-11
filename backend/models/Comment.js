const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
