import React, { useState } from "react";
import Marketplace from "../component/Marketplace";
import Navbar from "../component/Navbar";
import Sidewindow from "../component/Sidewindow";
import AddproductWindow from "../component/AddproductWindow";
import AccountWindow from "../component/AccountWindow";
import "./marketplaceviews.css";
const MarketplaceViews = () => {
  const [showSidewindow, setShowSidewindow] = useState(false);

  const toggleSideWindow = () => {
    setShowSidewindow((prevState) => !prevState);
  };
  const [showAddwindow, setShowAddwindow] = useState(false);

  const toggleAddWindow = () => {
    setShowAddwindow((prevState) => !prevState);
  };

  const [showAccountWindow, setShowAccountWindow] = useState(false);
  const toggleAccountWindow = () => {
    setShowAccountWindow((prevState) => !prevState);
  };
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (newCartItems) => {
    setCartItems(newCartItems); // Update cartItems state in MarketplaceViews
  };
  return (
    <div>
      <div className="marketplaceview-main-container">
        <div className="navbar-layout">
          <Navbar
            toggleSidewindow={toggleSideWindow}
            toggleAddWindow={toggleAddWindow}
            toggleAccountWindow={toggleAccountWindow}
          />
        </div>
        <div className="marketplace-layout">
          <Marketplace onAddToCart={handleAddToCart} />{" "}
        </div>
      </div>

      {/* Render Sidewindow if showSidewindow is true */}
      {showSidewindow && (
        <Sidewindow
          isVisible={showSidewindow}
          onClose={toggleSideWindow}
          cartItems={cartItems}
        />
      )}
      {showAddwindow && (
        <AddproductWindow isVisible={showAddwindow} onClose={toggleAddWindow} />
      )}
      {showAccountWindow && (
        <AccountWindow
          isVisible={showAccountWindow}
          onClose={toggleAccountWindow}
        />
      )}
    </div>
  );
};

export default MarketplaceViews;
