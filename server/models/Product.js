// Import mongoose library
const mongoose = require('mongoose');

// Create the schema
const ProductSchema = new mongoose.Schema({
    _id: {
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
    imageUrl: {
        type: String,
        required: true,
    }
});

// Create a variable out of the schema
const ProductModel = mongoose.model("products", ProductSchema);

// Export it so that there is access to ProductModel outside of this file
module.exports = ProductModel;