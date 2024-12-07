import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // ใส่ไฟล์ CSS สำหรับการจัดสไตล์
import { FaUser, FaUserTie, FaCoffee, FaTachometerAlt } from 'react-icons/fa'; // Import ไอคอนจาก react-icons
import { AiOutlineShoppingCart ,AiFillPlusCircle} from "react-icons/ai";
import { TfiAlarmClock } from "react-icons/tfi";
import burler from '../../img/burler.png'

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // สถานะสำหรับ dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo"><img src={burler} alt=""width="100" height="80" /></div>
      <ul className="sidebar-menu">
        
        <li>
          <Link to="/" className="sidebar-link">
            <FaTachometerAlt className="icon" /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/shop" className="sidebar-link">
            <AiOutlineShoppingCart className="icon" /> <span>Shop</span>
          </Link>
        </li>
        <li>
          <Link to="/check" className="sidebar-link">
            <TfiAlarmClock className="icon" /> <span>Check</span>
          </Link>
        </li>
        <li className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button onClick={toggleDropdown} className="sidebar-link">
            <AiFillPlusCircle className="icon" /> <span>Add    ▼</span>
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/addmember" className="sidebar-link">
                  <FaUser className="icon" /> <span>Member</span>
                </Link>
              </li>
              <li>
                <Link to="/addstaff" className="sidebar-link">
                  <FaUserTie className="icon" /> <span>Staff</span>
                </Link>
              </li>
              <li>
                <Link to="/addmenu" className="sidebar-link">
                  <FaCoffee className="icon" /> <span>Menu</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
