// Import libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// Give access to the Product Model
const ProductModel = require('./models/Product');
const CartModel = require('./models/Cart');


// Connect the database to MongoDB
mongoose.connect("mongodb+srv://user123:Password123@cluster0.dpambmc.mongodb.net/ecommerce?retryWrites=true&w=majority");


// GET all the products
// URL: http://localhost:3001/getProducts
app.get("/getProducts", async (req, res) => {
    try {
        // construct the query
        const query = {};

        // Search the database
        const products = await ProductModel.find(query);

        // Construct the response and send it back
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST a new product
// URL: http://localhost:3001/insertProduct
app.post("/insertProduct", async (req, res) => {
    try {
        // Create a new product based on what's passed into the body and save it
        const product = req.body;
        const newProduct = ProductModel(product);
        await newProduct.save();

        // Construct the response and send it back
        res.json(newProduct);
    } catch (err) { 
        res.status(500).json(err);
    }
});


// POST multiplpe products
// URL: http://localhost:3001/insertProducts
app.post("/insertProducts", async (req, res) => {
    try {
        const products = req.body // Assuming req.body is an array of products

        // Insrt multiple products into the database
        const newProducts = await ProductModel.insertMany(products);

        // Construct the response and send it back
        res.status(201).json(newProducts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE all products
// URL: http://localhost:3001/deleteAllProducts
app.delete("/deleteAllProducts", async (req, res) => {
    try {
        // Delete all products from the database
        await ProductModel.deleteMany({});

        // Construct the response and send it back
        res.json({ message: "All products have been deleted successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
});

// ************************************************************** Cart API Routes **************************************************************
// GET all cart items
// url: http://localhost:3001/getCartItems
app.get("/getCartItems", async (req, res) => {
    try {
        // Construct the query
        const query = {};

        // Search the database
        const cartItems = await CartModel.find(query);

        // Construct the response and send it back
        res.json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST a new cart item 
// URL: http://localhost:3001/addToCart
app.post("/addToCart", async (req, res) => {
    try {
        // Create a new cart item based on what's passed into the body and save it
        const cartItem = req.body;
        const newCartItem = CartModel(cartItem);
        await newCartItem.save();

        // Construct the response and send it back
        res.json(newCartItem);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE a cart item by ID
// URL: http://localhost:3001/deleteFromCart/:cartItemId
app.delete("/deleteFromCart/:cartItemId", async (req, res) => {
    try {
        // Get the cart item ID
        const cartItemId = req.params.cartItemId;

        // Attempt to find the cartItem by ID and remove it
        const deletedCartItem = await CartModel.findByIdAndDelete(cartItemId);

        // If the cartItem is not found, return 404 status
        if(!deletedCartItem) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Cart item successfully deleted, return a success message
        res.json({ message: "Cart item deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to add a product to the cart
app.post("/addProductToCart", async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json(err);
    }
});



// Tell API to start on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});