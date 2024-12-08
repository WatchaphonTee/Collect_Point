const fs = require('fs');  // เพิ่มบรรทัดนี้ที่ส่วนบนของไฟล์
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {Membership,User,Position,Menu} = require('../models/associations');

//เพิ่มสมาชิก
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

//เพิ่ม Staff
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดเส้นทางไปยังโฟลเดอร์ uploads/images
        cb(null, path.join(__dirname, '../uploads/images/')); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

router.get('/menu',async(req,res)=>{
    try{
        const menus = await Menu.findAll();
        res.status(200).json({data:menus});
    }catch(error){
        console.error('Error fetching menus',error);
        res.status(500).json({message:'Failed to retrieve',error:error.message});
    }
});

router.post('/menu', upload.single('filename'), async (req, res) => {
    try {
        const { name, price, type, pointvalue } = req.body;
        const newMenu = await Menu.create({
            name,
            price,
            type,
            pointvalue,
            filename: req.file.filename 
        });

        res.status(201).json({ message: 'Menu added successfully', newMenu });
    } catch (error) {
        res.status(500).json({ message: 'Error creating menu', error });
    }
});

router.delete('/menu/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // ค้นหาข้อมูลเมนูจากฐานข้อมูล
        const menu = await Menu.findByPk(id);

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        // ลบไฟล์ภาพที่เกี่ยวข้องกับเมนู
        const imagePath = path.join(__dirname, '../uploads/images/', menu.filename);
        
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file', err);
                return res.status(500).json({ message: 'Error deleting image file', error: err.message });
            }
            
            console.log('Image deleted successfully');
        });

        // ลบเมนูจากฐานข้อมูล
        await menu.destroy();

        res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu', error);
        res.status(500).json({ message: 'Error deleting menu', error: error.message });
    }
});


//ดึงข้อมูลตำแหน่งไปใช้ตรวจสอบในหน้า สมัครพนักงาน
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