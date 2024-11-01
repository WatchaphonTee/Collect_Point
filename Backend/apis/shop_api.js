const express = require("express");
const router = express.Router();
const { Menu } = require("../models/associations");

//Meals SidesDrinks SnackSweet
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

router.get("SnackSweet",async(req,res)=>{
    try{
        const menus = await Menu.findAll({
            attributes:["id","name","price","pointvalue","filename"],
        });
        return res.status(200).json(menus);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
});

module.exports = router;