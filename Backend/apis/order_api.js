const fs = require("fs");
const path = require("path");
const express = require("express");
const easyinvoice = require("easyinvoice");
const router = express.Router();
const { Orderinvoice, Orderdetail, Points, Menu } = require("../models/associations"); 

//สั่งซื้อสินค้า
router.post('/', async (req, res) => {
    const { timestamp, total_price, total_point, user_id, membership_id, items } = req.body;

    try {
        const orderTimestamp = new Date(timestamp); 

        const orderInvoice = await Orderinvoice.create({
            timestamp: orderTimestamp, 
            total_price,
            total_point,
            user_id,
            membership_id,
        });

        console.log('Created OrderInvoice with ID:', orderInvoice.id);

        
        for (const item of items) {
            console.log('Creating Orderdetail for item:', item);

            await Orderdetail.create({
                orderinvoice_id: orderInvoice.id,  
                timestamp: orderTimestamp, 
                menu_id: item.menu_id,
                quantity: item.quantity,
                membership_id,
                user_id,
            });
        }

        await Points.create({
            membership_id,
            orderinvoice_id: orderInvoice.id,
            points_earned: total_point,
        });

        const menuIds = items.map(item => item.menu_id);
        const menus = await Menu.findAll({
            where: { id: menuIds },
        });

        const menuMap = menus.reduce((acc, menu) => {
            acc[menu.id] = menu;  
            return acc;
        }, {});

        const imgPath = path.resolve(__dirname, "..", "Logo.png");

        const invoiceData = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: fs.readFileSync(imgPath, "base64"),
            },
            sender: {
                company: "Collect Point",
            },
            information: {
                number: orderInvoice.id,
                date: orderTimestamp.toISOString().split("T")[0], 
                membership_id: membership_id,
                user_id: user_id,
            },
            products: items.map(item => {
                const menu = menuMap[item.menu_id];
                return {
                    description: `${menu.name} (${menu.type})`,
                    quantity: item.quantity,
                    price: item.price,
                };
            }),
            bottomNotice: `THANK YOU\nTotal Points Earned: ${total_point}\nMembership ID: ${membership_id}\nUser ID: ${user_id}`,
            settings: {
                currency: "THB",
                locale: "th-TH",
                format: "A4",
                height: "1000px",
                width: "500px",
                orientation: "portrait",
            },
        };

        const result = await easyinvoice.createInvoice(invoiceData);
        fs.writeFileSync(path.resolve("receipts", `receipt-${orderInvoice.id}.pdf`), result.pdf, "base64");

        res.status(200).json({ message: 'Order placed successfully!', orderInvoiceId: orderInvoice.id });
    } catch (error) {
        console.error('Error processing the order:', error);
        res.status(500).json({
            message: error.message || 'Failed to process the order. Please try again.',
        });
    }
});


module.exports = router;
