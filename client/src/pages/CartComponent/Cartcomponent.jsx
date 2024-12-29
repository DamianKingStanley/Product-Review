import React, { useState, useEffect } from "react";
import "./Cartcomponent.css";
import TopHeader from "../../component/TopHeader/TopHeader";
import Navibar from "../../component/Navibar/Navibar";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const handleQuantityChange = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleScreenshot = () => {
    window.print();
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowBankDetails(false);
  };

  const handleTransferOption = () => {
    setShowBankDetails(true);
  };

  return (
    <div className="cart-component">
      <TopHeader />
      <Navibar />
      <section className="cartBody">
        <h1>Your Cart</h1>
        <div id="receipt" className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={`http://localhost:5000/${item.bookcover}`}
                  alt={item.title}
                />
                <div>
                  <h2>{item.title}</h2>
                  <p>Author: {item.author}</p>
                  <p>Price: {item.price}</p>
                  <p>Quantity:</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                    min="1"
                  />
                  <p>Amount: {item.price * item.quantity}</p>
                  <button
                    id="removebtn"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="cart-total">
          <h2>Total: {totalAmount}</h2>
        </div>
        <div className="cart-actions">
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={handleScreenshot}>Screenshot Receipt</button>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      </section>

      {/* Payment Modal */}
      {showModal && (
        <div className="CartComponentmodal">
          <div className="CartComponentmodal-content">
            {!showBankDetails ? (
              <>
                <h3>Choose Payment Option</h3>
                <button onClick={() => alert("Card payment selected")}>
                  Card
                </button>
                <button onClick={handleTransferOption}>Transfer</button>
                <button id="cancelpaymentbtn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>Bank Transfer Details</h3>
                <p>Bank: XYZ Bank</p>
                <p>Account Name: ABC Books</p>
                <p>Account Number: 1234567890</p>
                <button onClick={handleCancel}>Done</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
