import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import '../Sidebar/Sidebar.css';
import './Add.css';
import Footer from '../Footer/Footer.jsx';

const Addstaff = () => {
    const [staffData, setStaffData] = useState({
        idNumber: '',
        empFname: '',
        empLname: '',
        empPhonenum: '',
        empEmail: '',
        empAddress: '',
        bankAccountNum: '',
        positionId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaffData({
            ...staffData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(staffData);
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
                                <input type="text" name="idNumber" value={staffData.idNumber} onChange={handleChange} required maxLength="13" />
                            </div>
                            <div className="form-group">
                                <label>ชื่อพนักงาน (emp_fname):</label>
                                <input type="text" name="empFname" value={staffData.empFname} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>นามสกุลพนักงาน (emp_lname):</label>
                                <input type="text" name="empLname" value={staffData.empLname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>หมายเลขโทรศัพท์พนักงาน (emp_phonenum):</label>
                                <input type="text" name="empPhonenum" value={staffData.empPhonenum} onChange={handleChange} required maxLength="15" />
                            </div>
                            <div className="form-group">
                                <label>อีเมลพนักงาน (emp_email):</label>
                                <input type="email" name="empEmail" value={staffData.empEmail} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>ที่อยู่พนักงาน (emp_address):</label>
                            <textarea name="empAddress" value={staffData.empAddress} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>หมายเลขบัญชีธนาคาร (bank_account_num):</label>
                                <input type="text" name="bankAccountNum" value={staffData.bankAccountNum} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>หมายเลขประจำตำแหน่งของพนักงาน (position_id):</label>
                            <input type="number" name="positionId" value={staffData.positionId} onChange={handleChange} required />
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
