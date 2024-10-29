const express = require('express');
const router = express.Router();
const {Membership,User,Position} = require('../models/associations');

// API สำหรับเพิ่มข้อมูลสมาชิก
router.post('/addmember', async (req, res) => {
    try {
        const { firstname, lastname,idcard, phonenumber, age, email, totalpoint } = req.body;

        
        const newMembership = await Membership.create({
            firstname,
            lastname,
            idcard,
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

router.post('/adduser',async(req,res)=>{
    try{
        const {idcard,firstname,lastname,phonenumber,email,address,bankid,position_id} = req.body;
        const newUser = await User.create({
            idcard,
            firstname,
            lastname,
            phonenumber,
            email,
            address,
            bankid,
            position_id,
        });
        res.status(201).json({message:'User create successful!',data:newUser});
    }catch(error){
        console.error('Error creating User:', error);
        res.status(500).json({ message: 'Failed to create User', error: error.message });
    }
})

router.get('/position',async(req,res)=>{
    try{
        const positions = await Position.findAll();
        res.status(200).json({data:positions});
    }catch(error){
        console.error('Error fetching position',error);
        res.status(500).json({message:'Failed to retrieve',error:error.message});
    }
})

module.exports = router;