import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import '../Sidebar/Sidebar.css';
import './Add.css';
import Footer from '../Footer/Footer.jsx';

const Addmember = () => {
    const [customerData, setCustomerData] = useState({
        custFname: '',      // ชื่อสมาชิกลูกค้า
        custLname: '',      // นามสกุลสมาชิกลูกค้า
        custPhonenum: '',   // หมายเลขโทรศัพท์
        custAge: '',        // อายุ
        custEmail: ''       // อีเมล
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(customerData);
    };

    return (
        <div>
            <Sidebar />
            <div className='page-content'>
                <div className="add-staff-form">
                    <h2>เพิ่มข้อมูลสมาชิก</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>ชื่อสมาชิกลูกค้า (cust_fname):</label>
                                <input type="text" name="custFname" value={customerData.custFname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>นามสกุลสมาชิกลูกค้า (cust_lname):</label>
                                <input type="text" name="custLname" value={customerData.custLname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>หมายเลขโทรศัพท์สมาชิกลูกค้า (cust_phonenum):</label>
                                <input type="text" name="custPhonenum" value={customerData.custPhonenum} onChange={handleChange} required maxLength="15" />
                            </div>
                            <div className="form-group">
                                <label>อายุสมาชิกลูกค้า (cust_age):</label>
                                <input type="number" name="custAge" value={customerData.custAge} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                        
                            <div className="form-group">
                                <label>อีเมลสมาชิกลูกค้า (cust_email):</label>
                                <input type="email" name="custEmail" value={customerData.custEmail} onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">เพิ่มสมาชิก</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Addmember;
