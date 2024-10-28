const express = require('express');
const router = express.Router();
const Membership = require('../models/CustomerMembership_model'); // แก้ไขเป็น path ที่ถูกต้องของ model

// API สำหรับเพิ่มข้อมูลสมาชิก
router.post('/addmember', async (req, res) => {
    try {
        const { firstname, lastname, phonenumber, age, email, totalpoint } = req.body;

        // สร้างสมาชิกใหม่
        const newMembership = await Membership.create({
            firstname,
            lastname,
            phonenumber,
            age,
            email,
            totalpoint
        });

        res.status(201).json({ message: 'Membership created successfully!', data: newMembership });
    } catch (error) {
        console.error('Error creating membership:', error);
        res.status(500).json({ message: 'Failed to create membership', error: error.message });
    }
});

module.exports = router;