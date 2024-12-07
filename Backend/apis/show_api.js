const express = require("express");
const { Orderdetail, Orderinvoice,Membership,Points,User  } = require("../models/associations");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const sequelize = require("../db_instance"); 

// ดึงข้อมูล Orderinvoice ทั้งหมด
router.get("/orderinvoices", async (req, res) => {
    try {
        const orderInvoices = await Orderinvoice.findAll();
        return res.status(200).json(orderInvoices);
    } catch (err) {
        console.error("Error fetching order invoices:", err);
        return res.status(500).json({ message: "Unable to fetch order invoices" });
    }
});

//ลบ orderinvoice และลบข้อมูลใน Pointsและ orderdetail ที่เกี่ยวข้อง
router.delete("/orderinvoice/:id", async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
        const orderId = req.params.id; 
        
        const orderInvoice = await Orderinvoice.findByPk(orderId, {
            include: [Orderdetail], 
            transaction, 
        });

        if (!orderInvoice) {
            await transaction.rollback(); 
            return res.status(404).json({ message: "Orderinvoice not found" });
        }

        await Points.destroy({
            where: { orderinvoice_id: orderId }, 
            transaction, 
        });

        await Orderdetail.destroy({
            where: { orderinvoice_id: orderId }, 
            transaction, 
        });

        await Orderinvoice.destroy({
            where: { id: orderId }, 
            transaction, 
        });

        await transaction.commit();

        return res.status(200).json({ message: "Orderinvoice and related details deleted successfully" });
    } catch (err) {

        await transaction.rollback();
        console.error("Error deleting order invoice:", err);
        return res.status(500).json({ message: "Error deleting order invoice and related details" });
    }
});

// API สำหรับดึงข้อมูลคะแนนของลูกค้า
router.get("/customer-points", async (req, res) => {
    try {
        const data = await Membership.findAll({
            include: [{
                model: Points,
                attributes: [] 
            }],
            attributes: [
                'id',
                'firstname',
                [Sequelize.fn('SUM', Sequelize.col('Points.points_earned')), 'total_points'], 
            ],
            group: ['Membership.id'],
        });

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching data" });
    }
});

router.get("/daily", async(req,res) =>{
    
});

module.exports = router;
