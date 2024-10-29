    import React, { useState } from 'react';
    import Sidebar from '../Sidebar/Sidebar.jsx';
    import axios from 'axios';
    import '../Sidebar/Sidebar.css';
    import './Add.css';
    import Footer from '../Footer/Footer.jsx';


    const Addstaff = () => {
        const [staffData, setStaffData] = useState({
            idcard: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            email: '',
            address: '',
            bankid: '',
            position_id: ''
        });
        
        const [message,setMessage] = useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            setStaffData({
                ...staffData,
                [name]: value
            });
        };

        

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!staffData.idcard || !staffData.firstname || !staffData.lastname || !staffData.phonenumber || !staffData.email || !staffData.address || !staffData.bankid || !staffData.position_id) {
                console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }
            try{
                const response = await axios.post('http://localhost:8000/add/adduser',{
                    idcard: staffData.idcard,
                    firstname: staffData.firstname,
                    lastname: staffData.lastname,
                    phonenumber: staffData.phonenumber,
                    email: staffData.email,
                    address: staffData.address,
                    bankid: staffData.bankid,
                    position_id: staffData.position_id,
                });
                if(response.status===201){
                    setMessage("สมัครสมาชิกสำเร็จ");
                    setStaffData({
                        idcard:'',
                        firstname:'',
                        lastname:'',
                        phonenumber:'',
                        email:'',
                        address:'',
                        bankid:'',
                        position_id:'',
                    });
                }else{
                    setMessage(`${response.data.message}`);
                }
            }catch(error){
                setMessage(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
            }
        };

        return (
            <div>
                <Sidebar />
                <div className='page-content'>
                    <div className="add-staff-form">
                        <h2>Add Staff</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>เลขบัตรประชาชน (id_number):</label>
                                    <input type="text" name="idcard" value={staffData.idcard} onChange={handleChange} required maxLength="13" />
                                </div>
                                <div className="form-group">
                                    <label>ชื่อพนักงาน (emp_fname):</label>
                                    <input type="text" name="firstname" value={staffData.firstname} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>นามสกุลพนักงาน (emp_lname):</label>
                                    <input type="text" name="lastname" value={staffData.lastname} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>หมายเลขโทรศัพท์พนักงาน (emp_phonenum):</label>
                                    <input type="text" name="phonenumber" value={staffData.phonenumber} onChange={handleChange} required maxLength="15" />
                                </div>
                                <div className="form-group">
                                    <label>อีเมลพนักงาน (emp_email):</label>
                                    <input type="email" name="email" value={staffData.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>ที่อยู่พนักงาน (emp_address):</label>
                                <textarea name="address" value={staffData.address} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>หมายเลขบัญชีธนาคาร (bank_account_num):</label>
                                    <input type="text" name="bankid" value={staffData.bankid} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>หมายเลขประจำตำแหน่งของพนักงาน (position_id):</label>
                                <input type="number" name="position_id" value={staffData.position_id} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="submit-button">เพิ่มพนักงาน</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    export default Addstaff;
