const express = require("express");
const router = express.Router();
const {Attendance} = require("../models/associations");

router.post('/checkin', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const attendanceRecord = await Attendance.create({
            user_id: user_id,
            checkin: new Date().toISOString(), // แสดงเป็น ISO string
            date: new Date().toISOString().split('T')[0], // วันที่ในรูปแบบ YYYY-MM-DD
        });

        return res.status(201).json({ message: 'Check-in successful', data: attendanceRecord });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating attendance record', error: error.message });
    }
});


module.exports = router;