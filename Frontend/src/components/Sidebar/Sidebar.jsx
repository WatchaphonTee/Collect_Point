import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // ใส่ไฟล์ CSS สำหรับการจัดสไตล์
import { FaUser, FaUserTie, FaCoffee, FaTachometerAlt } from 'react-icons/fa'; // Import ไอคอนจาก react-icons
import { AiOutlineShoppingCart ,AiFillPlusCircle} from "react-icons/ai";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import burler from '../../img/burler.png'

const Sidebar = () => {
  const [isDropdownOpenadd, setIsDropdownOpenadd] = useState(false); // สถานะสำหรับ dropdown

  const toggleDropdownadd= () => {
    setIsDropdownOpenadd(!isDropdownOpenadd);

  };
  const [isDropdownOpendel, setIsDropdownOpendel] = useState(false); // สถานะสำหรับ dropdown

  const toggleDropdowndel = () => {
    setIsDropdownOpendel(!isDropdownOpendel);
    
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
        <li className={`dropdown ${isDropdownOpenadd ? 'open' : ''}`}>
          <button onClick={toggleDropdownadd} className="sidebar-link">
            <AiFillPlusCircle className="icon" /> <span>Add    ▼</span>
          </button>
          {isDropdownOpenadd && (
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
        <li className={`dropdown ${isDropdownOpendel ? 'open' : ''}`}>
          <button onClick={toggleDropdowndel} className="sidebar-link">
            <HiArchiveBoxXMark className="icon" /> <span>Delete   ▼</span>
          </button>
          {isDropdownOpendel && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/delinvoice" className="sidebar-link">
                  <FaFileInvoiceDollar className="icon" /> <span>delinvoice</span>
                </Link>
              </li>
              <li>
                <Link to="/delmenu" className="sidebar-link">
                  <FaCoffee className="icon" /> <span>delmenu</span>
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
