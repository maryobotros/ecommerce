import "./Home.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from "axios";

function Home({ listOfCartItems, setListOfCartItems, listOfProducts, setListOfProducts }) {
  // STATES

  // FUNCTIONS
  // Function to add an item to the cart
  const addItemToCart = (id) => {
    // Find the product by ID from the listOfProducts list
    const productToAddToCart = listOfProducts.find((product) => product._id === id);

    // Check if the product already exists in the cart list
    const productIsInCart = listOfCartItems.find((cartItem) => cartItem.model === productToAddToCart.model);

    // If the product is in the cart
    if (productIsInCart) {
        // Get the cart item's quantity
        const newQuantity = productIsInCart.quantity + 1;

        // Get the cart item's id
        const cartItemId = productIsInCart._id;

        // Increase the quantity on the backend
        Axios.put(`http://localhost:3001/updateCartItem/${cartItemId}`, {quantity: newQuantity})
          .then(() => {
            // Increment the quantity of the item in listOfCartItems
            setListOfCartItems((listOfCartItems).map((val) => {
              return val.model === productIsInCart.model ? { ...val, quantity: val.quantity + 1 } : val;
            }))

            alert("Another " + productToAddToCart.model + " chair added to the cart");
          })
          .catch(() => {
            alert("Failed to update cart");
          });
    }
    // Otherwise if the product doesn't exist in the cart list
    else {
        // Create a new Cart item using the information from the product
        Axios.post("http://localhost:3001/addToCart", {
            productId: productToAddToCart._id,
            model: productToAddToCart.model,
            brand: productToAddToCart.brand,
            color: productToAddToCart.color,
            price: productToAddToCart.price,
            quantity: 1
        })
            .then((response) => {
                // Update state based on the response data from the server
                setListOfCartItems([...listOfCartItems, response.data]);

                alert((productToAddToCart.model + " chair added to the cart"));
            })
            .catch(() => {
                alert("Failed to add item to cart");
            });
    }
  };

  console.log("List of Cart Items: ", listOfCartItems);
  // APP
  return (
    <div className="home">

      {/* Product List */}
      <div className="listOfProducts">
        {listOfProducts.map((val) => {
          return (
            <div className="productContainer">
              <Link to={`/product/${val._id}`}>
                <div className="product">
                  <img className="product-image" src={`http://localhost:3001/images/${val.imageUrl}`} alt={"img unavailable"}/>
                  <h3> {val.brand} {val.model} </h3>
                  <h4> ${val.price} </h4>
                </div>
                <button className="add-to-cart-button" onClick={() => addItemToCart(val._id)}> Add to cart </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;