import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลการสั่งซื้อจาก API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/show/orderdetails");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the order details!", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ลบรายการสั่งซื้อ
  const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`http://localhost:8000/show/orderdetails/${orderId}`);
        console.log(response.data.message);

        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
        console.error("There was an error deleting the order!", error);
    }
};

  return (
    <div>
      <h1>Order Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Total Points</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.total_price}</td>
                <td>{order.total_point}</td>
                <td>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDetails;
