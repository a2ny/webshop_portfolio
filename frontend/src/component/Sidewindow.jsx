import React from "react";
import "./sidewindow.css";

const Sidewindow = ({ isVisible, onClose, cartItems }) => {
  // Determine the class name based on the value of the isVisible prop
  const className = `side-drawer ${isVisible ? "show" : ""}`;

  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };
  let totalPrice = 0;

  function compute() {
    for (let index in cartItems) {
      const priceWithoutSymbol = cartItems[index].price.replace(
        /[^0-9.-]/g,
        ""
      );
      const itemPrice = parseFloat(priceWithoutSymbol);

      // Check if the parsed value is a valid number
      if (!isNaN(itemPrice)) {
        totalPrice += itemPrice;
      } else {
        console.error(`Invalid price: ${cartItems[index].price}`);
      }
    }
    console.log(totalPrice);
  }

  compute();

  return (
    <div className={className} id="drawer">
      <div className="cart-items">
        {cartItems &&
          cartItems.map((item, index) => (
            <div className="cart-item form-control" key={index}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
      </div>
      <div className="drawer-price-container">
        <p>Total</p>
        <h3>{totalPrice}</h3>
      </div>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default Sidewindow;
