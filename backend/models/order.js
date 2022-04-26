const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const orderSchema = new mongoose.Schema(
    {
      orderItems: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],

      shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        cellPhone: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },

      itemsPrice: { type: Number, required: true },
      shippingPrice: { type: Number, required: true },
      taxPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      user: {
            type: ObjectId,
            ref: 'User', 
            required: true },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date },
      isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date },

    }, {  timestamps: true,}
  );




module.exports = mongoose.model("Order", orderSchema);