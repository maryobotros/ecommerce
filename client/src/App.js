import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

function App() {
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
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Route for Home page */}
            <Route path="/" element={<Home listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems}/>} />

            {/* Route for Cart page */}
            <Route path="cart" element={<Cart listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// Next steps
// * Create a function and list to add and keep track of cart items
// * Figure out how to create an API route that will add a product into the cart
//   x Work on the frontend to list out all of the products
//   x Make an array that will keep track of all of the products
//   - When a user tries to add one of the items to the cart
//      * Find the product from the products collection
//      * If the product doesnt exost send an error otherwise,
//      * Check if the cart already contains the item
//      * 