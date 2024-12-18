import React, { useState } from 'react';
import './Cart.css';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
  const [userId, setUserId] = useState(''); // Changed from employeeId
  const [membershipId, setMembershipId] = useState(''); // Changed from customerId

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalPoints = () => {
    return cartItems.reduce((total, item) => total + item.pointvalue * item.quantity, 0);
  };

  const increaseQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem.quantity === 1) {
        return prevItems.filter((i) => i.id !== item.id); 
      } else {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
        alert("Please add items to the cart before checking out.");
        return;
    }

    if (!userId || !membershipId) {
        alert("Please enter both User ID and Membership ID.");
        return;
    }

    const totalPrice = calculateTotalPrice();
    const totalPoints = calculateTotalPoints();
    const orderDetails = {
        timestamp: new Date(),
        total_price: totalPrice, 
        total_point: totalPoints, 
        user_id: userId, 
        membership_id: membershipId, 
        items: cartItems.map(item => ({
            menu_id: item.id,
            quantity: item.quantity,
            price: item.price
        })),
    };

    try {
        const response = await axios.post('http://localhost:8000/order/', orderDetails);
        alert(`Order placed successfully! `);
        setCartItems([]); 
        setUserId(''); 
        setMembershipId(''); 
    } catch (error) {
        if (error.response) {
            console.error("Error placing order:", error.response.data);
            alert(`Error: ${error.response.data.message || "Failed to place the order. Please try again."}`);
        } else {
            console.error("Error:", error.message);
            alert("Failed to place the order. Please try again.");
        }
    }
};

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name}  Quantity: 
              <div className='d-flex gap-2'>
              <button className="btn btn-outline-secondary quantity-button"onClick={() => decreaseQuantity(item)}>-</button>
              <div className="item-quantity m-0 ">{item.quantity}</div>
              <button className="btn btn-outline-secondary quantity-button" onClick={() => increaseQuantity(item)}>+</button>

              <button class= "btn btn-danger quantity-but"   onClick={() => removeFromCart(item.id)}><p >Remove</p></button>
              </div>
               Price: ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
      <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
      <p>Total Points: {calculateTotalPoints()}</p>

      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Membership ID"
          value={membershipId}
          onChange={(e) => setMembershipId(e.target.value)} 
        />
     </div >
      <div className="Confirm"><button className="custom-button " onClick={handleCheckout}>Confirm Order</button> </div>
    </div>
  );
};

export default Cart;
