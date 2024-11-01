const Sequelize = require("sequelize");
const sequelize = require("../db_instance");


const Menu = sequelize.define("menu",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    type:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    filename:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    pointvalue:{
        type: Sequelize.INTEGER,
        allowNull:false,
    }
},{
    timestamps:false
});

(async () => {
    await Menu.sync({force:false}); //ถ้าเปิดจะทำการลบตารางข้อมูลแล้วสร้างใหม่
})();

module.exports = Menu;

