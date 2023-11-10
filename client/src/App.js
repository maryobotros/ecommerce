import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Route for Home page */}
            <Route path="/" element={<Home />} />

            {/* Route for Cart page */}
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// Next steps
// * Figure out how to create an API route that will add a product into the cart
//   x Work on the frontend to list out all of the products
//   x Make an array that will keep track of all of the products
//   - When a user tries to add one of the items to the cart
//      *
