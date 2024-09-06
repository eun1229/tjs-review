const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ReviewSchema = new mongoose.Schema({
  rating: {type: Number, min: 0, max: 5,},
  reviewcontents: {type: String},
  city: String,
  productstate: String,
  username: {type: Schema.Types.ObjectId, ref: 'User'},
  product: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {
  timestamps: true,
});

module.exports = mongoose.model('Review', ReviewSchema);