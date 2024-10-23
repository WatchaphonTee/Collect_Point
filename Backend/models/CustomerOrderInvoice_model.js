const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const Menu = require("./Menu_model");
const User = require("./SystemUser_model");

const Order = sequelize.define("order",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    menu_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: Menu,
            key: "id",
        }
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
    
})