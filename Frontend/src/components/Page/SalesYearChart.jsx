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

// ลงทะเบียน Modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesYearChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูลจาก API
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/show/salesyear"); // URL ของ API
                const data = await response.json();
                if (data.data) {
                    // สร้าง array ของเดือน
                    const labels = [];
                    const sales = [];
                    const orderCounts = [];
                    
                    // แสดงเดือนทั้งหมดในปี (12 เดือน)
                    for (let i = 11; i >= 0; i--) {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        const formattedMonth = date.toISOString().split("T")[0].slice(0, 7); // รูปแบบ YYYY-MM

                        labels.push(formattedMonth); // แสดงเดือนใน labels

                        // หาค่าขายสำหรับเดือนนั้น ๆ
                        const saleData = data.data.find(item => item.sale_month === formattedMonth);
                        if (saleData) {
                            sales.push(saleData.total_price); // หากมีข้อมูลการขาย
                            orderCounts.push(saleData.order_count); // จำนวนการสั่งซื้อ
                        } else {
                            sales.push(0); // ถ้าไม่มีข้อมูลการขาย
                            orderCounts.push(0); // จำนวนการสั่งซื้อเป็น 0
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

    // ตัวเลือกการแสดงผล
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
            <h2>Sales Dashboard (Last 12 Months)</h2>
            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default SalesYearChart;
