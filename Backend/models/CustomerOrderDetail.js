const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Orderdetail = sequelize.define("orderdetail",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    }
})