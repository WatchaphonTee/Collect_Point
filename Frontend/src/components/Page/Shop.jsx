import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './add.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Footer from '../Footer/Footer.jsx';
import Cart from './Cart.jsx';

const Shop = () => {
  const [menuType, setMenuType] = useState("Meals");
  const [menus, setMenus] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/shop/${menuType}`);
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchData();
  }, [menuType]);

  return (
    <div>
      <Sidebar />
      <div className="page-content">
        <nav className="menu-nav">
          <button onClick={() => setMenuType("meals")}>Meals</button>
          <button onClick={() => setMenuType("SidesDrinks")}>Sides & Drinks</button>
          <button onClick={() => setMenuType("SnackSweet")}>Snacks & Sweets</button>
        </nav>

        <div className="menu-display">
          {menus.length > 0 ? (
            menus.map((menu, index) => (
              <div key={menu.id} className={`menu-item ${index % 3 === 0 ? "new-row" : ""}`}>
                <img src={`http://localhost:8000/images/${menu.filename}`} alt={menu.name} />
                <h3>{menu.name}</h3>
                <p>Price: {menu.price} Bath</p>
                <p>Points: {menu.pointvalue}</p>
                <button onClick={() => addToCart(menu)}>Add</button>
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
      <Footer />
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default Shop;
