import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import axios from 'axios';
import '../Sidebar/Sidebar.css';
import './Add.css';
import Footer from '../Footer/Footer.jsx';

const Addmember = () => {
    const [customerData, setCustomerData] = useState({
        firstname: '',      
        lastname: '',      
        idcard:'',
        phonenumber: '',   
        age: '',        
        email: ''       
    });

    const [message,setMessage]= useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!customerData.firstname || !customerData.lastname || !customerData.idcard || !customerData.phonenumber || !customerData.age || !customerData.email) {
            error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
          }
        try{
            const response = await axios.post('http://localhost:8000/add/addmember',{
                firstname: customerData.firstname,
                lastname: customerData.lastname,
                idcard: customerData.idcard,
                phonenumber: customerData.phonenumber,
                age: customerData.age,
                email: customerData.email,
            });
        if(response.status === 200){
            setMessage("สมัครสมาชิกสำเร็จ");
            setCustomerData({
                firstname:'',
                lastname:'',
                idcard:'',
                phonenumber:'',
                age:'',
                email:'',
            });
        }else{
            setMessage(`ไม่สำเร็จ: ${response.data.message}`);
        } 
    }
        catch(error){
            setMessage(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
        }
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
                                <label>ชื่อสมาชิกลูกค้า :</label>
                                <input type="text" name="firstname" value={customerData.firstname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>นามสกุลสมาชิกลูกค้า:</label>
                                <input type="text" name="lastname" value={customerData.lastname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group">
                                <label>หมายเลขบัตรประชาชน:</label>
                                <input type="text" name="idcard" value={customerData.idcard} onChange={handleChange} required maxLength="13" />
                            </div>
                            <div className="form-group">
                                <label>หมายเลขโทรศัพท์สมาชิกลูกค้า:</label>
                                <input type="text" name="phonenumber" value={customerData.phonenumber} onChange={handleChange} required maxLength="15" />
                            </div>
                            <div className="form-group">
                                <label>อายุสมาชิกลูกค้า :</label>
                                <input type="number" name="age" value={customerData.age} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                        
                            <div className="form-group">
                                <label>อีเมลสมาชิกลูกค้า:</label>
                                <input type="email" name="email" value={customerData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">เพิ่มสมาชิก</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Addmember;
