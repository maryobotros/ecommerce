import "./Product.css";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Product({ listOfProducts, setListOfCartItems, listOfCartItems, addItemToCart}) {
    // Get the productId and convert it into a number
    const { productId } = useParams();
    const productIdNumber = parseInt(productId, 10); // Convert to a number using parseInt
    
    // Find the product using the productId
    const product = listOfProducts.find((product) => product._id === productIdNumber);


    // APP
    return (
        <div className="product">
            <img className="product-image" src={`http://localhost:3001/images/${product.imageUrl}`} alt={"img unavailable"}/>
            <h2> Brand: {product.brand} </h2>
            <h2> Model: {product.model} </h2>
            <h2> Color: {product.color} </h2>
            <h2> Price: ${product.price} </h2>
            
            <button className="add-to-cart-button" onClick={() => addItemToCart(productIdNumber)}> Add to cart </button>
        </div>
    );
}

export default Product;