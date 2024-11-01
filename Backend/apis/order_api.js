const fs = require("fs");
const path = require("path");
const express = require("express");
const easyinvoice = require("easyinvoice");
const router = express.Router();
const { Orderdetail, Orderinvoice, Membership, Menu } = require("../models/associations");

// Order from cart
router.post("/", async (req, res) => {
    try {
        const { items, total_price, total_point, membership_id, user_id } = req.body;
        const timestamp = new Date();

        // Validate the data
        if (total_price == null || total_point == null) {
            return res.status(400).json({ message: "Total price and total points are required." });
        }

        // ค้นหา Orderdetail ล่าสุด
        const lastOrderDetail = await Orderdetail.findOne({
            order: [['id', 'DESC']] // หา Orderdetail ล่าสุด
        });

        let orderDetail;

        // หากไม่มี Orderdetail หรือจำนวน Orderdetail ถึง 60 แล้ว
        if (!lastOrderDetail || lastOrderDetail.order_count >= 60) {
            // สร้าง Orderdetail ใหม่
            orderDetail = await Orderdetail.create({
                timestamp: timestamp,
                total_price: total_price,
                total_point: total_point,
                order_count: 1 // เริ่มนับจาก 1
            });
        } else {
            // หากมี Orderdetail ล่าสุดและน้อยกว่า 60
            orderDetail = lastOrderDetail;
            orderDetail.order_count += 1; // เพิ่มจำนวนออร์เดอร์
            orderDetail.total_price += total_price; // รวม total_price
            orderDetail.total_point += total_point; // รวม total_point
            await orderDetail.save(); // บันทึกการเปลี่ยนแปลง
        }

        // Update membership points if membership_id is provided
        if (membership_id) {
            const membership = await Membership.findByPk(membership_id);
            if (membership) {
                console.log("Membership found:", membership); // Debugging line
                membership.totalpoint += total_point; // Update totalpoint
                await membership.save(); // Save the changes
                console.log("Updated total points:", membership.totalpoint); // Debugging line
            } else {
                console.log("Membership not found for ID:", membership_id); // Debugging line
            }
        }

        // Save each record of the ordered items to the database
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
                date: timestamp.toISOString().split("T")[0]
            },
            products: items.map(item => {
                const menu = menuMap[item.menu_id];
                return {
                    description: `${menu.name} (${menu.type})`, // Include menu name and type
                    quantity: item.quantity,
                    price: item.price
                }
            }),
            bottomNotice: `THANK YOU\nTotal Points Earned: ${total_point}`,
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
