const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Attendance = sequelize.define("attendance",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id",
        }
    },
    checkin:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    checkout:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    
})