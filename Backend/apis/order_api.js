const fs = require("fs");
const path = require("path");
const express = require("express");
const easyinvoice = require("easyinvoice");
const router = express.Router();
const { Orderdetail, Orderinvoice, Points, Membership, Menu } = require("../models/associations");

// Order from cart
router.post("/", async (req, res) => {
    try {
        const { items, total_price, total_point, membership_id, user_id } = req.body;
        const timestamp = new Date();

        // Validate the data
        if (total_price == null || total_point == null) {
            return res.status(400).json({ message: "Total price and total points are required." });
        }

        // สร้าง Orderdetail ใหม่เสมอ
        const orderDetail = await Orderdetail.create({
            timestamp: timestamp,
            total_price: total_price,
            total_point: total_point,
            membership_id: membership_id,
            user_id: user_id,
            order_count: 1 // เริ่มนับจาก 1
        });

        // สร้างข้อมูลในตาราง Points
        const points = await Points.create({
            orderdetail_id: orderDetail.id,
            points_earned: total_point,
            membership_id: membership_id,
        });
        console.log("Points Added:", points);

        // บันทึกรายการสั่งซื้อใน Orderinvoice
        const orderItems = await Promise.all(items.map(item => {
            return Orderinvoice.create({
                Orderdetail_id: orderDetail.id,
                membership_id,
                user_id,
                menu_id: item.menu_id,
                quantity: item.quantity,
                total_price: item.price * item.quantity
            });
        }));

        // Fetch menu names for the receipt
        const menuIds = orderItems.map(item => item.menu_id);
        const menus = await Menu.findAll({
            where: {
                id: menuIds
            }
        });

        const menuMap = {};
        menus.forEach(menu => {
            menuMap[menu.id] = menu; // Store menu objects instead of just names
        });

        // Generate a PDF of the receipt
        const imgPath = path.resolve(__dirname, "..", "Logo.png");

        const invoiceData = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: fs.readFileSync(imgPath, "base64")
            },
            sender: {
                company: "Collect Point",
            },
            information: {
                number: orderDetail.id,
                date: timestamp.toISOString().split("T")[0],
                membership_id: membership_id,
                user_id: user_id,
            },
            products: items.map(item => {
                const menu = menuMap[item.menu_id];
                return {
                    description: `${menu.name} (${menu.type})`, // Include menu name and type
                    quantity: item.quantity,
                    price: item.price
                }
            }),
            bottomNotice: `THANK YOU\nTotal Points Earned: ${total_point}\nMembership ID: ${membership_id}\nUser ID: ${user_id}`,
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

        return res.status(201).json({ message: "The order is successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
