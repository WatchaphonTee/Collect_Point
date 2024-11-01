import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './add.css'; // สำหรับการตกแต่ง
import Sidebar from '../Sidebar/Sidebar.jsx';
import '../Sidebar/Sidebar.css';
import Footer from '../Footer/Footer.jsx';

const Shop = () => {
  const [menuType, setMenuType] = useState("Meals"); // หมวดหมู่ที่เลือก
  const [menus, setMenus] = useState([]); // รายการเมนู

  // ฟังก์ชันสำหรับดึงข้อมูลจาก API ตามหมวดหมู่ที่เลือก
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
      <Sidebar/>
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
              <p>Price: ${menu.price}</p>
              <p>Points: {menu.pointvalue}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Shop;
