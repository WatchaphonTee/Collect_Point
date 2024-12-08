import React, { useEffect, useState } from 'react';

const Delmenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชั่นดึงข้อมูลเมนูจาก API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:8000/add/menu'); // เชื่อมกับ API ที่คุณสร้างไว้
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        const data = await response.json();
        setMenus(data.data); // เก็บข้อมูลที่ได้จาก API
      } catch (err) {
        setError(err.message); // เก็บ error หากมีข้อผิดพลาด
      } finally {
        setLoading(false); // ปิดสถานะการโหลด
      }
    };

    fetchMenus();
  }, []);

  // ฟังก์ชั่นลบเมนู
  const handleDelete = async (id) => {
    // ยืนยันการลบ
    const isConfirmed = window.confirm('คุณแน่ใจว่าต้องการลบเมนูนี้?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8000/add/menu/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // ถ้าลบสำเร็จ ให้ลบจาก state
          setMenus(menus.filter(menu => menu.id !== id));
        } else {
          throw new Error('Failed to delete menu');
        }
      } catch (err) {
        setError(err.message); // เก็บ error หากมีข้อผิดพลาด
      }
    }
  };

  // หากกำลังโหลดข้อมูลแสดงข้อความ "กำลังโหลด..."
  if (loading) {
    return <div>กำลังโหลดเมนู...</div>;
  }

  // หากเกิดข้อผิดพลาด แสดงข้อความ error
  if (error) {
    return <div>เกิดข้อผิดพลาด: {error}</div>;
  }

  // แสดงรายการเมนู
  return (
    <div>
      <h1>Manage Menu</h1>
      <ul>
        {menus.length === 0 ? (
          <li>ไม่มีเมนู</li>
        ) : (
          menus.map(menu => (
            <li key={menu.id}>
              <h6>{menu.name}</h6>
              <img src={`http://localhost:8000/images/${menu.filename}`} alt={menu.name} />
              <p>ราคา: {menu.price} บาท</p>
              <p>ประเภท: {menu.type}</p>
              <button onClick={() => handleDelete(menu.id)}>ลบ</button> {/* ปุ่มลบ */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Delmenu;
