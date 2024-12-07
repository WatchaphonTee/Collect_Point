import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import axios from 'axios';
import '../Sidebar/Sidebar.css';
import './Add.css';
import Footer from '../Footer/Footer.jsx';

const Addmenu = () => {
    const [menuData, setMenuData] = useState({
        name: '',
        price: '',
        type: '', 
        pointvalue: '',
        filename: null
    });

    const [message, setMessage] = useState('');

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
            filename: e.target.files[0] // Set the selected file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!menuData.name || !menuData.price || !menuData.type || !menuData.pointvalue || !menuData.filename) {
            setMessage("กรุณากรอกข้อมูลให้ครบถ้วน"); // ใช้ setMessage แทน error()
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', menuData.name);
            formData.append('price', menuData.price);
            formData.append('type', menuData.type);
            formData.append('pointvalue', menuData.pointvalue);
            formData.append('filename', menuData.filename); // ส่งไฟล์รูปภาพ

            const response = await axios.post('http://localhost:8000/add/menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                setMessage("เพิ่มเมนูสำเร็จ");
                setMenuData({
                    name: '',
                    price: '',
                    type: '',
                    pointvalue: '',
                    filename: null,
                });
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className='page-content'>
                <div className="add-menu-form">
                    <h2>เพิ่มข้อมูลเมนู</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>ชื่อเมนู :</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={menuData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>ราคา :</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={menuData.price} 
                                onChange={handleChange} 
                                required 
                                step="0.01" 
                            />
                        </div>
                        <div className="form-group">
                            <label>ประเภทเมนู :</label>
                            <select 
                                name="type" 
                                value={menuData.type} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Meals">Meals</option>
                                <option value="SidesDrinks">Sides & Drinks</option>
                                <option value="SnackSweet">Snack & Sweet</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>แต้มคะแนนสะสม :</label>
                            <input 
                                type="number" 
                                name="pointvalue" 
                                value={menuData.pointvalue} 
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
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Addmenu;
