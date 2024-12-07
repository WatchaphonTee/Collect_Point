const express = require("express");
const { Orderdetail, Orderinvoice,Membership,Points  } = require("../models/associations");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const sequelize = require("../db_instance"); 

// API: ดึงข้อมูล Orderdetail ทั้งหมด
router.get("/orderdetails", async (req, res) => {
    try {
      const orderDetails = await Orderdetail.findAll();
      return res.status(200).json(orderDetails);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to fetch order details" });
    }
  });

// API: ลบ Orderdetail และลบข้อมูลใน Points ที่เกี่ยวข้อง
router.delete("/orderdetails/:id", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const orderId = req.params.id;
  
      // ตรวจสอบว่า Orderdetail มีอยู่จริง
      const orderDetail = await Orderdetail.findByPk(orderId, { transaction });
      if (!orderDetail) {
        await transaction.rollback();
        return res.status(404).json({ message: "Order detail not found" });
      }
  
      // ลบข้อมูลใน Points ที่เกี่ยวข้องกับ Orderdetail นี้
      await Points.destroy({
        where: { orderdetail_id: orderId },
        transaction,
      });
  
      // ลบข้อมูลใน Orderinvoice ที่เกี่ยวข้อง
      await Orderinvoice.destroy({
        where: { Orderdetail_id: orderId },
        transaction,
      });
  
      // ลบ Orderdetail
      await Orderdetail.destroy({
        where: { id: orderId },
        transaction,
      });
  
      await transaction.commit();
      return res.status(200).json({ message: "Order detail and related points deleted successfully" });
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      return res.status(500).json({ message: "Error deleting order detail and related points" });
    }
  });


// API สำหรับดึงข้อมูลคะแนนของลูกค้า
router.get("/customer-points", async (req, res) => {
    try {
        // ดึงข้อมูลจาก Membership และรวมคะแนนใน Points
        const data = await Membership.findAll({
            include: [{
                model: Points,
                attributes: [] // ไม่ต้องดึงข้อมูลซ้ำใน include
            }],
            attributes: [
                'id',
                'firstname',
                [Sequelize.fn('SUM', Sequelize.col('Points.points_earned')), 'total_points'], // รวมคะแนน
            ],
            group: ['Membership.id'], // กลุ่มข้อมูลตาม Membership.id
        });

        // ส่งข้อมูลที่ได้กลับไปแสดงบน Dashboard
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching data" });
    }
});

router.get("/dashboard", async(req,res) =>{
    const 
})

module.exports = router;
