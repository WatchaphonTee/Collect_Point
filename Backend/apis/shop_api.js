const express = require("express");
const router = express.Router();
const { Menu } = require("../models/associations");

//ดึงเมนูในหมวด Meals SidesDrinks SnackSweet ออกไปแสดง
router.get("/meals",async(req,res)=>{
    try{
        const menus = await Menu.findAll({
            attributes:["id","name","price","pointvalue","filename"],
            where:{
                type:"Meals"
            }
        });
        return res.status(200).json(menus);
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Something went wrong"});
    }
});

router.get("/SidesDrinks",async(req,res)=>{
    try{
        const menus = await Menu.findAll({
            attributes:["id","name","price","pointvalue","filename"],
            where:{
                type:"SidesDrinks"
            }
        });
        return res.status(200).json(menus);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Someting went wrong"});
    }
});

router.get("/SnackSweet",async(req,res)=>{
    try{
        const menus = await Menu.findAll({
            attributes:["id","name","price","pointvalue","filename"],
            where:{
                type:"SnackSweet"
            }
        });
        return res.status(200).json(menus);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
});

//ตะกร้า
router.post("/cart", async (req, res) => {
    try {
        const { id } = req.body;

        const menuItem = await Menu.findOne({
            where: { id },
            attributes: ["id", "name", "price", "pointvalue", "filename"]
        });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        
        await Cart.create({
            name: menuItem.name,
            price: menuItem.price,
            pointvalue: menuItem.pointvalue,
            quantity: 1 
        });

        return res.status(200).json({ message: "Item added to cart successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;