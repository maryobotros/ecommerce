import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";

function App() {
  // STATES
  const [listOfCartItems, setListOfCartItems] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);

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


  // useEffect function to send a get request to insert all products into listOfProducts array
  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/getProducts");
        setListOfProducts(response.data);
      } catch (err) {
        alert("Failed to fetch list of products");
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs once after the initial render


  // APP
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Route for Home page */}
            <Route path="/" element={<Home listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems} listOfProducts={listOfProducts} setListOfProducts={setListOfProducts} />} />

            {/* Route for Cart page */}
            <Route path="cart" element={<Cart listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems}/>} />

            {/* Route for Product page */}
            <Route path="product/:productId" element={<Product listOfProducts={listOfProducts} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// Next steps
// x Create a function and list to add and keep track of cart items
// x Figure out how to create an API route that will add a product into the cart
//   x Work on the frontend to list out all of the products
//   x Make an array that will keep track of all of the products
//   x When a user tries to add one of the items to the cart
//      x Find the product from the products collection
//      x If the product doesnt exost send an error otherwise,
//      x Check if the cart already contains the item
//      x Create a put API route to update the item in teh cart collection with the updated quatity 
//        then use this API route in the addItemToCart function
// x In Cart.js, create a delete button and a function for that button that will delete an item from the cart
//    x If the cart item has a quatity of 1, just delete it
//    x Otherwise, decrement the quantity value
// x In Cart.js, create a add one more button
// x Work on the css for the Home page
// x Work on the css for the Navbar
// x Add the Hermanmiller logo at the center of the Navbar
// - Style the Cart page
// - Use React router to make a Product page that the user can navigate to by clicking on the product card from either Home or Cart page
//    - Add an "Add to cart" button at the bottom of the Product page
//    - Compare how I pass in the id between the parent and child route, with the CMS project
// - Fix the link styling on the Home page
// - Use Google login
// - Remove banner alerts and replace them with animations





// Future ideas
// - If you are on the homepage, Home should be highlighted in the navbar
// - Add a cart logo
// - Add a search bar at the top so that the user can search for a specific chair
// - Lock the navbar
// - Change the navbar elements so that they don't look like buttons
// -