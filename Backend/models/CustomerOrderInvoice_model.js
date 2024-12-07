const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const Menu = require("./Menu_model");
const User = require("./SystemUser_model");
const Orderdetail = require("./CustomerOrderDetail");

const Orderinvoice = sequelize.define("orderinvoice",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    Orderdetail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Orderdetail,
            key: "id",
        },
        onDelete: "CASCADE", // เพิ่ม Cascade Deletion
    },
    membership_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model : Membership,
            key: "id"
        }
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model : User,
            key: "id",
        }
    },
    menu_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: Menu,
            key: "id",
        }
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    total_price:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },


});
(async ()=>{
    await Orderinvoice.sync({force:false});
})();

module.exports=Orderinvoice;