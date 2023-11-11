import "./Cart.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Cart() {
  // STATES
  const [listOfCartItems, setListOfCartItems] = useState([]);

  // FUNCTIONS
  // useEffect function to send a get request to insert all cart items into listOfCartItems
  useEffect(() => {
    // Function to fetch cartItems
    const fetchCartItems = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/getCartItems");
        setListOfCartItems(response.data);
      } catch (err) {
        alert("Failed to fetch list of cart items");
      }
    };

    // Call the fetchCartItems function
    fetchCartItems();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  // APP
  return (
    <div className="cart">
      <h1>Cart page</h1>

      {/* Cart Items List */}
      <div className="listOfCartItems">
        {listOfCartItems.map((val) => {
          return (
            <div className="cartItemContainer">
              <div className="cartItem">
                <h3> Model: {val.model}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
