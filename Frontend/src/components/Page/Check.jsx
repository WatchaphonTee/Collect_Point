import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import axios from 'axios';
import '../Sidebar/Sidebar.css';
import Footer from '../Footer/Footer.jsx';
import './Check.css'; 

const Check = () => {
  const [userId, setUserId] = useState({
    user_id: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserId({
      ...userId,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.user_id) {
      console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/attendance/checkin', {
        user_id: userId.user_id,
      });
      if (response.status === 201) {
        setMessage("เช็คอินสำเร็จ");
        setUserId({
          user_id: '',
        });
      } else {
        setMessage(`${response.data.message}`);
      }
    } catch (error) {
      setMessage(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='page-contentcheck'>
        <div className='check-form-wrapper'> 
          <h2>Check-in Form</h2>
          <form onSubmit={handleSubmit} className="check-form">
            <div>
              <label htmlFor='user_id'>User ID:</label>
              <input
                type='number'
                id='user_id'
                name='user_id'
                value={userId.user_id}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit'>Check In</button>
          </form>
          {message && <p className="check-message">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Check;
