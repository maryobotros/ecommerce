import "./Home.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Home({ listOfCartItems, setListOfCartItems }) {
  // STATES
  const [listOfProducts, setListOfProducts] = useState([]);

  // FUNCTIONS
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
    if(productIsInCart) {
        // Increae the quantity of the item that is in the cart list
        listOfCartItems.map((val) => {
            return val.model === productIsInCart.model ? {quatity: productIsInCart.quantity += 1} : val;

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

                alert((productToAddToCart.model + " Item added to the cart"));
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
      <h1>Home page</h1>

      {/* Product List */}
      <div className="listOfProducts">
        {listOfProducts.map((val) => {
          return (
            <div className="productContainer">
              <div className="product">
                <h3> Model: {val.model} </h3>
              </div>
              <button onClick={() => addItemToCart(val._id)}> Add to cart </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;