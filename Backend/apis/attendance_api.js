const express = require("express");
const router = express.Router();

const {Attendance,User} =require("../models/associations");

router.post("/checkin", async (req, res) => {
    const { user_id } = req.body; // Assuming the user ID is sent in the request body
    try {
        const attendance = await Attendance.create({ user_id });
        return res.status(201).json(attendance);
    } catch (error) {
        console.error("Error creating attendance record:", error);
        return res.status(500).json({ error: "An error occurred while creating attendance." });
    }
});

module.exports = router;