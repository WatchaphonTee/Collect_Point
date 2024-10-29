const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const User = require("./SystemUser_model")
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
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString(),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date().toISOString().split('T')[0],
        allowNull: false,
    },
    
},{
    timestamps:false
});
(async()=>{
    await Attendance.sync({force:false});
})();

module.exports = Attendance;