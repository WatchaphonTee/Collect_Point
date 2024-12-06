const express = require("express");
const router = express.Router();
const {Membership} = require("../models/associations");

router.get("/customer-points", async (req, res) => {
    try {
        // Fetch the required fields from Membership
        const customers = await Membership.findAll({
            attributes: ["id", "firstname", "totalpoint"] // Select only the needed fields
        });
        
        // Send response with the selected customer data
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customer points:", error);
        res.status(500).json({ message: "Error fetching customer points data" });
    }
});

module.exports = router;