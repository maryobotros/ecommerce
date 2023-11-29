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
  const [totalCost, setTotalCost] = useState(0); //  Used to calculate the total cost of the cart
  const [totalItemsInCart, setTotalItemsInCart] = useState(0); // Used to count number of items in the cart


  // EFFECTS
  useEffect(() => {
    // Calculate total cost an total items whenever listOfCartItems changes
    let cost = 0;
    let totalItems = 0;

    listOfCartItems.map((val) => {
      cost = cost + (val.price * val.quantity);
      totalItems += val.quantity;
    });

    setTotalCost(cost);
    setTotalItemsInCart(totalItems);
  }, [listOfCartItems]);


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
            quantity: 1,
            imageUrl: productToAddToCart.imageUrl
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


  // APP
  return (
    <Router>
      <div className="App">
        <Navbar totalItemsInCart={totalItemsInCart}/>
        <div className="content">
          <Routes>
            {/* Route for Home page */}
            <Route path="/" element={<Home listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems} listOfProducts={listOfProducts} setListOfProducts={setListOfProducts} addItemToCart={addItemToCart}/>} />

            {/* Route for Cart page */}
            <Route path="cart" element={<Cart listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems} totalCost={totalCost} setTotalCost={setTotalCost} totalItemsInCart={totalItemsInCart} setTotalItemsInCart={setTotalItemsInCart}/>} />

            {/* Route for Product page */}
            <Route path="product/:productId" element={<Product listOfProducts={listOfProducts} listOfCartItems={listOfCartItems} setListOfCartItems={setListOfCartItems} addItemToCart={addItemToCart}/>} />
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
// x Style the Cart page
// x Use React router to make a Product page that the user can navigate to by clicking on the product card from either Home or Cart page
//    x Add an "Add to cart" button at the bottom of the Product page
//    x Compare how I pass in the id between the parent and child route, with the CMS project
// x Fix the link styling on the Home page
// x Calculate the total price of the product in the cart
// - Use Google login
// - Remove banner alerts and replace them with animations
// - Add the ability to navigate to the product page from the cart page by clicking on the product
// - Fix styling of navbar to make it responsive
// x Add number of items in cart
// - Add number of items to cart tab on navbar
// - 





// Future ideas
// - Recenter the logo
// - If you are on the homepage, Home should be highlighted in the navbar
// - Add a cart logo
// - Add a search bar at the top so that the user can search for a specific chair
// - Lock the navbar
// - Change the navbar elements so that they don't look like buttons
