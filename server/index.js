// Import libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// Give access to the Product Model
const ProductModel =require('./models/Product');


// Connect the database to MongoDB
mongoose.connect("mongodb+srv://user123:Password123@cluster0.dpambmc.mongodb.net/ecommerce?retryWrites=true&w=majority");


// Tell API to sttar on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});