import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import '../Sidebar/Sidebar.css';
import './Add.css';
import Footer from '../Footer/Footer.jsx';

const Addmenu = () => {
    const [menuData, setMenuData] = useState({
        menuName: '',
        menuPrice: '',
        menuType: '', 
        pointsValue: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenuData({
            ...menuData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setMenuData({
            ...menuData,
            image: e.target.files[0] // Set the selected file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(menuData);

        // You can add your code to send the data to the server here
    };

    return (
        <div>
            <Sidebar />
            <div className='page-content'>
                <div className="add-menu-form">
                    <h2>Add Menu</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>ชื่อเมนู (menu_name):</label>
                            <input 
                                type="text" 
                                name="menuName" 
                                value={menuData.menuName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>ราคา (menu_price):</label>
                            <input 
                                type="number" 
                                name="menuPrice" 
                                value={menuData.menuPrice} 
                                onChange={handleChange} 
                                required 
                                step="0.01" 
                            />
                        </div>
                        <div className="form-group">
                            <label>ประเภทเมนู (menu_type):</label>
                            <select 
                                name="menuType" 
                                value={menuData.menuType} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Hot Drinks">Hot Drinks</option>
                                <option value="Cold Drinks">Cold Drinks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>แต้มคะแนนสะสม (points_value):</label>
                            <input 
                                type="number" 
                                name="pointsValue" 
                                value={menuData.pointsValue} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>อัปโหลดรูปภาพเมนู:</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="submit-button">เพิ่มเมนู</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Addmenu;
