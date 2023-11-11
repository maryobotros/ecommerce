import "./Home.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function Home() {
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
                <h3> Model: {val.model}</h3>
              </div>
              <button >Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
