// Import mongoose library
const mongoose = require('mongoose');

// Create the schema
const CartSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

// Create a variable out of the schema
const CartModel = mongoose.model("cart", CartSchema);

// Export it so that there is access to CartModel outside of this file
module.exports = CartModel;