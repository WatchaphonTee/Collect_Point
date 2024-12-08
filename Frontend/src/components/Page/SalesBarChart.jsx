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

const SalesBarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูลจาก API
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/show/salesevenday"); // URL ของ API
                const data = await response.json();
                if (data.data) {
                    // สร้าง array ของวันที่ย้อนหลัง 7 วัน
                    const currentDay = new Date();
                    const labels = [];
                    const sales = [];

                    for (let i = 6; i >= 0; i--) {
                        const date = new Date();
                        date.setDate(currentDay.getDate() - i);
                        const formattedDate = date.toISOString().split("T")[0]; // รูปแบบ YYYY-MM-DD

                        labels.push(formattedDate);

                        // หาค่าขายสำหรับวันที่นั้น ๆ
                        const saleData = data.data.find(item => item.sale_date === formattedDate);
                        if (saleData) {
                            sales.push(saleData.total_price); // หากมีข้อมูลการขาย
                        } else {
                            sales.push(0); // ถ้าไม่มีข้อมูลการขาย
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
                text: "Sales Summary (Last 7 Days)",
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
            
            <div className="chart-container">
                {chartData ? <Bar data={chartData} options={options} /> : <p>Loading chart...</p>}
            </div>
        </div>
    );
};

export default SalesBarChart;
