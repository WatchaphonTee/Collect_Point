import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';
import './Dashboard.css';
import SalesYearChart from './SalesYearChart.jsx';
import SalesBarChart from './SalesBarChart.jsx';

const Dashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get('http://localhost:8000/show/customer-points');
        setCustomerData(customerResponse.data);

        const salesResponse = await axios.get('http://localhost:8000/show/bestsalesevenday');
        setTopSellingData(salesResponse.data.data); // Assuming data is returned as 'data' in the response

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      {/* Wrapping SalesBarChart and SalesYearChart with a container div */}
      <div className="page-content">
      <div className="chart-container">
        <SalesBarChart />
        <SalesYearChart />
      </div>
        {loading ? (
          <p className="loading-message">Loading data...</p>
        ) : (
          <>
            {/* Top 5 Best-Selling Items Section */}
            <h2>Top 5 Best-Selling Items (Last 7 Days)</h2>
            {topSellingData.length > 0 ? (
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>Menu Item</th>
                    <th>Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.menu.name}</td> {/* Corrected to access item.menu.name */}
                      <td>{item.total_quantity}</td> {/* Show total quantity sold */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No sales data available</p>
            )}

            {/* Customer Data Section */}
            <h2>Customer Data</h2>
            {customerData.length > 0 ? (
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.firstname}</td>
                      <td>{customer.total_points || 0}</td> {/* Show total points */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No customer data available</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
