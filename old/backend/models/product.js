const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  )



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add the product name'],
        maxlength: 32
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Please add the product description'],
        maxlength: 2000
    },

    price: {
        type: Number,
        trim: true,
        required: [true, 'Product must have a price'],
        maxlength: 32
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: [true, 'Product must belong to a category'],
    },

    countStock: {
        type: Number,
    },

    avatar: {
        type: String,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    
    
}, {timestamps: true})




module.exports = mongoose.model("Product", productSchema);