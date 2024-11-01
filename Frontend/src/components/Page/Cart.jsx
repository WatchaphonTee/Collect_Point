import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';

const Cart = ({ cartItems, setCartItems }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [customerId, setCustomerId] = useState('');

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
        return prevItems.filter((i) => i.id !== item.id); // Remove item if quantity is 0
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

    if (!employeeId || !customerId) {
        alert("Please enter both Employee ID and Customer ID.");
        return;
    }

    const totalPrice = calculateTotalPrice();
    const totalPoints = calculateTotalPoints();
    const orderDetails = {
        timestamp: new Date(),
        total_price: totalPrice, // ใช้ totalPrice
        total_point: totalPoints, // ใช้ totalPoints
        employee_id: employeeId,
        customer_id: customerId,
        items: cartItems.map(item => ({
            menu_id: item.id,
            quantity: item.quantity,
            price: item.price
        })),
        membership_id: customerId,
        user_id: employeeId
    };

    try {
        const response = await axios.post('http://localhost:8000/order/', orderDetails);
        alert(`Order placed successfully! `);
        setCartItems([]); // Clear the cart after successful order
        setEmployeeId(''); // Clear the input fields
        setCustomerId('');
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
              {item.name} - Quantity: {item.quantity} 
              <button onClick={() => increaseQuantity(item)}>+</button>
              <button onClick={() => decreaseQuantity(item)}>-</button>
              - Price: ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart</p>
      )}
      <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
      <p>Total Points: {calculateTotalPoints()}</p>

      {/* ฟอร์มกรอกรหัสพนักงานและรหัสลูกค้า */}
      <div>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <button onClick={handleCheckout}>Confirm Order</button> {/* ปุ่มสำหรับยืนยันการสั่งซื้อ */}
    </div>
  );
};

export default Cart;
