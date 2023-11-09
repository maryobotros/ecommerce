// Import libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// Give access to the Product Model
const ProductModel =require('./models/Product');


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


// Connect the database to MongoDB
mongoose.connect("mongodb+srv://user123:Password123@cluster0.dpambmc.mongodb.net/ecommerce?retryWrites=true&w=majority");


// Tell API to sttar on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});