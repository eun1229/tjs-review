const mongoose = require ('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
  title: String,
  summary: String,
  review: String,
  productimage: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  rating: {type: Number, min: 0, max: 5,},
  city: String,
  productstate: String,
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;