const fs = require("fs");
const path = require("path");
const express = require("express");
const easyinvoice = require("easyinvoice");
const router = express.Router();
const { User,Orderdetail, Orderinvoice, Membership } = require("../models/associations");

// Order from cart
router.post("/", async (req, res) => {
    const { items, total_price, total_point, membership_id, user_id } = req.body; // รับข้อมูลจาก body ของคำขอ

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "Items are required." });
    }
    if (total_price == null || total_point == null) {
        return res.status(400).json({ message: "Total price and total points are required." });
    }

    const timestamp = new Date(); // ใช้ timestamp ปัจจุบัน

    try {
        // Save an order detail record to the database
        const orderDetail = await Orderdetail.create({
            timestamp: timestamp,
            total_price: total_price,
            total_point: total_point
        });

        // อัปเดตคะแนนของสมาชิกถ้ามี membership_id
        if (membership_id) {
            const membership = await Membership.findByPk(membership_id);
            if (membership) {
                // บวก totalPoints กับ pointvalue ของสมาชิก
                membership.pointvalue += total_point;
                await membership.save(); // บันทึกการเปลี่ยนแปลง
            }
        }

        // Save each record of the ordered items to the database
        await Promise.all(items.map(item => {
            return Orderinvoice.create({
                Orderdetail_id: orderDetail.id,
                membership_id, // ใช้ค่าจากคำขอ
                user_id, // ใช้ค่าจากคำขอ
                menu_id: item.menu_id,
                quantity: item.quantity,
                total_price: item.price * item.quantity
            });
        }));

        // Generate a PDF of the receipt
        const imgPath = path.resolve("receipts", "logo.png"); // เส้นทางไปยังโลโก้

        const invoiceData = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: fs.readFileSync(imgPath, "base64")
            },
            sender: {
                company: "CafeBucks",
            },
            information: {
                number: orderDetail.id,
                date: timestamp.toISOString().split("T")[0] // แปลงวันที่เป็นรูปแบบที่ต้องการ
            },
            products: items.map(item => {
                return {
                    description: `${item.name} (${item.type})`,
                    quantity: item.quantity,
                    price: item.price
                }
            }),
            bottomNotice: "THANK YOU",
            settings: {
                currency: "THB",
                locale: "th-TH",
                format: "A4",
                height: "1000px",
                width: "500px",
                orientation: "portrait"
            },
        };

        const result = await easyinvoice.createInvoice(invoiceData);
        fs.writeFileSync(path.resolve("receipts", `receipt-${orderDetail.id}.pdf`), result.pdf, "base64");

        return res.status(201).json({ id: orderDetail.id, message: "The order is successful" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});



module.exports = router;
