import React, { useState, useEffect } from "react";
import "./marketplace.css";
import axios from "axios";

const Marketplace = ({ onAddToCart }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    onAddToCart(newCartItems); // Pass updated cart items to parent component
  };

  // database start here
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "http://localhost:3001/displayProduct",
          {
            name: String,
            price: String,
            image: String,
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  },[]);
  function gen() {
    if (!Array.isArray(products) || products.length === 0) {
      return <div>No products available</div>;
    }
    return products.map((product, index) => (
      <div className="product-container form-control" key={index}>
        <h4>{product.name}</h4>
        <img src={require(`../database/images/${product.image}`)} alt="#" />

        <h5>${product.price}</h5>
        <button
          className="btn btn-success"
          onClick={() => handleAddToCart(product)}
        >
          Buy Now
        </button>
      </div>
    ));
  }

  return <div className="product-main-container">{gen()}</div>;
};

export default Marketplace;
