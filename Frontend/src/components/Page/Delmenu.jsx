import React, { useEffect, useState } from 'react';
import './Del.css';
import Sidebar from '../Sidebar/Sidebar.jsx';

const Delmenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:8000/add/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        setMenus(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('คุณแน่ใจว่าต้องการลบเมนูนี้?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/add/menu/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMenus(menus.filter(menu => menu.id !== id));
        } else {
          throw new Error('Failed to delete menu');
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div>กำลังโหลดเมนู...</div>;
  }

  if (error) {
    return <div>เกิดข้อผิดพลาด: {error}</div>;
  }

  return (
    <div className='menurum'>
      <h1>Manage Menu</h1>
      <Sidebar />
      <ul className='menudel'>
        <div className="menu-display">
          <div className="row">
            {menus.length === 0 ? (
              <li>ไม่มีเมนู</li>
            ) : (
              menus.map(menu => (
                <div className="col-sm-2" key={menu.id}>
                  <div className='card ms-4'>
                    <div className='menu-itemm'>
                      <h6>{menu.name}</h6>
                      <img src={`http://localhost:8000/images/${menu.filename}`} alt={menu.name} />
                      <p>ราคา: {menu.price} บาท</p>
                      <p>ประเภท: {menu.type}</p>
                      <button className="btn btn-danger quantity-but" onClick={() => handleDelete(menu.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Delmenu;