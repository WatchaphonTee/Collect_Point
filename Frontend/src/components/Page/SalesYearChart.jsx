import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesYearChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/show/salesyear"); 
                const data = await response.json();
                if (data.data) {
                    
                    const labels = [];
                    const sales = [];
                    const orderCounts = [];
                    
                    
                    for (let i = 11; i >= 0; i--) {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        const formattedMonth = date.toISOString().split("T")[0].slice(0, 7); 

                        labels.push(formattedMonth); 

                        
                        const saleData = data.data.find(item => item.sale_month === formattedMonth);
                        if (saleData) {
                            sales.push(saleData.total_price); 
                            orderCounts.push(saleData.order_count); 
                        } else {
                            sales.push(0); 
                            orderCounts.push(0); 
                        }
                    }

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "Total Sales (฿)",
                                data: sales,
                                backgroundColor: "rgba(75, 192, 192, 0.6)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                            {
                                label: "Order Count",
                                data: orderCounts,
                                backgroundColor: "rgba(255, 159, 64, 0.6)",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, []);

    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales Summary (Last 12 Months)",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            
            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default SalesYearChart;
