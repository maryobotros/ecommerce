import "./Cart.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Cart({ listOfCartItems, setListOfCartItems }) {
  // VARIABLES
  // Variable to keep track of total cost of cart
  let totalCost = 0;
  let totalItemsInCart = 0;
  
  // STATES


  // FUNCTIONS
  // Function to delete items from the cart
  const deleteCartItem = (id) => {

    // Find the cart item to delete
    const cartItemToDelete = listOfCartItems.find((cartItem) => cartItem._id === id);

    // Find the quantity value of the cart item to delete
    const quantityOfCartItemToDelete = cartItemToDelete.quantity;
    
    // If the quantity of the cart item is 1
    if (quantityOfCartItemToDelete === 1) {
      // Delete the cart item from the database
      Axios.delete(`http://localhost:3001/deleteFromCart/${id}`)       
        .then(() => {
          setListOfCartItems(listOfCartItems.filter((cartItem) => cartItem._id !== id));
        })
        .catch(() => {
          alert("Failed to delete item from cart");
        });
    }

    // Otherwise if the quantity of the cart item is greater than 1
    else if (quantityOfCartItemToDelete > 1) {
      // Get the new quantity
      const newQuantity = quantityOfCartItemToDelete - 1
      
      // Edit the cart item in the database to decrement quantity value by 1
      Axios.put(`http://localhost:3001/updateCartItem/${id}`, {quantity: newQuantity})
        .then(() => {
          // Decrement the quantity of the item in listOfCartItems
          setListOfCartItems((listOfCartItems).map((val) => {
            return val._id === cartItemToDelete._id ? { ...val, quantity: newQuantity} : val;
          }))

          alert("Removed one " + cartItemToDelete.model + " from the cart");
        })
        .catch(() => {
          alert("Failed to delete 1 item from the cart");
        })
    }
  };


  // Function to add another item to the cart
  const addOneMore = (id) => {
    // Find the cart item to update
    const cartItemToUpdate = listOfCartItems.find((cartItem) => cartItem._id === id);

    // Find the quatity calue of the cart item to update
    const quantityOfCartItemToUpdate = cartItemToUpdate.quantity

    // Get the new quantity
    const newQuantity = quantityOfCartItemToUpdate + 1;

    // Edit the quantity value of the cart item by 1
    Axios.put(`http://localhost:3001/updateCartItem/${id}`, {quantity: quantityOfCartItemToUpdate})
      .then(() => {
        setListOfCartItems((listOfCartItems).map((val) => {
          return val._id === cartItemToUpdate._id ? { ...val, quantity: newQuantity} : val;
        }))

        // alert("Added one more " + cartItemToUpdate.model + " to the cart");
      })
      .catch(() => {
        alert("Failed to add 1 more item to the cart");
      })
  };


  // APP
  return (
    <div className="cart">
      <h1>Cart ({totalItemsInCart})</h1>

      {/* Cart Items List */}
      <div className="listOfCartItems">
        {listOfCartItems.map((val) => {
          // Calculate the total cost of the items
          {totalCost = totalCost + (val.price * val.quantity)}
          {totalItemsInCart += val.quantity}

          return (
            <div className="cartItemContainer">
              <div className="cartItem">
                <img className="product-image" src={`http://localhost:3001/images/${val.imageUrl}`} alt={"img unavailable"}/>
                <h2> Model: {val.model} </h2>
                <h4> Quantity: {val.quantity} </h4>
                <h4> Price per item: ${val.price} </h4>
                <h4> Total price: ${val.price * val.quantity}</h4>
                
              </div>
              <button className="add-one-more-button" onClick={() => addOneMore(val._id)}>Add one more</button>
              <button className="delete-button" onClick={() => deleteCartItem(val._id)}>Delete</button>
            </div>
            
          );
        })}
      </div>

      {/* Total cost */}
      <div>
        <h2>Total Cart Price: ${totalCost}</h2>
        <h2>Number of items: {totalItemsInCart}</h2>
      </div>
    </div>
  );
}

export default Cart;