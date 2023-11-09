// Import mongoose library
const mongoose = require('mongoose');

// Create the schema
const CartSchema = new mongoose.Schema({
    
});

// Create a variable out of the schema
const CartModel = mongoose.model("cart", CartSchema);

// Export it so that there is access to CartModel outside of this file
module.exports = CartModel;