const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Position = sequelize.define("position",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    } ,
    salary:{
        type:Sequelize.DECIMAL,
        allowNull:false,
    }
},{
    timestamps:false
});

(async ()=>{
    await Position.sync({force:flase});
})();

module.exports= Position;