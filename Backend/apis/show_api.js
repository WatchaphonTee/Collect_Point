const express = require("express");
const { Orderdetail, Orderinvoice,Membership,Points, Menu} = require("../models/associations");
const router = express.Router();
const { Op, Sequelize, where } = require("sequelize");
const sequelize = require("../db_instance"); 
const { group } = require("console");

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

router.get("/salesevenday", async(req,res) =>{
    try{
        const currentDay = new Date();
        currentDay.setHours(23,59,59,999);
    
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDay.getDate() - 7);
        sevenDaysAgo.setHours(0,0,0,0);

        const salesdata = await Orderinvoice.findAll({
            attributes :[
                [sequelize.fn("DATE", sequelize.col("createdAt")), "sale_date"], 
                [sequelize.fn("SUM", sequelize.col("total_price")),"total_price"],
                [sequelize.fn("COUNT",sequelize.col("id")),"order_count"]
            ],
            where:{
                createdAt:{
                    [Op.between]:[sevenDaysAgo,currentDay]
                }
            },
            group: ["sale_date"],
            order: [[sequelize.fn("DATE",sequelize.col("createdAt")),"ASC"]]
        });

        res.status(200).json({message: "Sales summary for the last 7 days",data:salesdata});
    }catch(error){
        console.error("Error fetching sales summary:", error);
        res.status(500).json({ message: "Failed to fetch sales summary", error: error.message });
    }
});

router.get("/bestsalesevenday",async (req,res)=>{
    try{
        const currentDay = new Date();
        currentDay.setHours(23,59,59,999);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDay.getDate()-7);
        sevenDaysAgo.setHours(0,0,0,0);

        const salesdata = await Orderdetail.findAll({
            attributes :[
                'menu_id',
                [sequelize.fn("DATE",sequelize.col("timestamp")),"Date"],
                [sequelize.fn("SUM",sequelize.col("quantity")),"total_quantity"]

            ],
            where:{
                timestamp:{
                    [Op.between]:[sevenDaysAgo,currentDay]
                }
            },
            include: [
                {
                    model : Menu,
                    attributes: ['name','type']
                }
            ],
            group: ['menu_id'],
            order: [[sequelize.fn("DATE",sequelize.col("timestamp")),"DESC"]],
            limit:5
        });

        res.status(200).json({message: "Sales summary for the last 7 days",data:salesdata});
    }catch(error){
        console.error("Error fetching sales summary:", error);
        res.status(500).json({ message: "Failed to fetch sales summary", error: error.message });
    }
});

router.get("/salesyear", async (req, res) => {
    try {
        const currentMonth = new Date();
        currentMonth.setHours(23,59,59,999); 

        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(currentMonth.getMonth()-11); 
        twelveMonthsAgo.setDate(1); 
        twelveMonthsAgo.setHours(0,0,0,0); 

        const salesdata = await Orderinvoice.findAll({
            attributes: [
                [
                    sequelize.literal(
                        "strftime('%Y-%m', createdAt)" 
                    ),
                    "sale_month"
                ],
                [sequelize.fn("SUM", sequelize.col("total_price")),"total_price"], 
                [sequelize.fn("COUNT", sequelize.col("id")),"order_count"] 
            ],
            where: {
                createdAt: {
                    [Op.between]: [twelveMonthsAgo, currentMonth] 
                }
            },
            group: [sequelize.literal("strftime('%Y-%m', createdAt)")], 
            order: [[sequelize.literal("strftime('%Y-%m', createdAt)"),"ASC"]] 
        });

        res.status(200).json({ message: "Sales summary for the last 12 months", data: salesdata });
    } catch (error) {
        console.error("Error fetching sales summary:", error);
        res.status(500).json({ message: "Failed to fetch sales summary", error: error.message });
    }
});


module.exports = router;
