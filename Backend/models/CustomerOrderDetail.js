const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Orderdetail = sequelize.define("orderdetail",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    timestamp:{
        type:Sequelize.DATE,
        defaultValue:new Date().getTime(),
        allowNull:false,
    },
    total_price:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    total_point:{
        type:Sequelize.FLOAT,
        allowNull:false,
    }
},{
    timestamps:false
});
(async()=>{
    await Orderdetail.sync({force:false});
})();

module.exports = Orderdetail;