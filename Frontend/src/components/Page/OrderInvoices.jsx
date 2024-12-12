import React, { useEffect, useState } from "react";
import axios from "axios";
import './Del.css'
import Sidebar from '../Sidebar/Sidebar.jsx';

const OrderInvoices = () => {
    const [orderInvoices, setOrderInvoices] = useState([]);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchOrderInvoices = async () => {
            try {
                const response = await axios.get("http://localhost:8000/show/orderinvoices"); 
                setOrderInvoices(response.data); 
            } catch (err) {
                setError("Failed to fetch order invoices."); 
            }
        };

        fetchOrderInvoices(); 
    }, []); 

    
    if (error) {
        return <div>Error: {error}</div>;
    }

    
    const handleDelete = async (id) => {
        try {
            
            await axios.delete(`http://localhost:8000/show/orderinvoice/${id}`);
            
            setOrderInvoices(orderInvoices.filter(invoice => invoice.id !== id));
        } catch (err) {
            setError("Failed to delete the order invoice.");
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Order Invoices</h1>
            <Sidebar />
            <table className="Table">
                <thead>
                    <tr >
                        <th>OrderId</th>
                        <th>Membership ID</th>
                        <th>User ID</th>
                        <th>Total Price</th>
                        <th>Total Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderInvoices.length > 0 ? (
                        orderInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.membership_id}</td>
                                <td>{invoice.user_id}</td>
                                <td>{invoice.total_price}</td>
                                <td>{invoice.total_point}</td>
                                <td>
                                    
                                    <button class= "btn btn-danger quantity-but" onClick={() => handleDelete(invoice.id)}>Delete</button>
                                    
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No order invoices found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderInvoices;
