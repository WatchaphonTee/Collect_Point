const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Membership = sequelize.define("membership",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    idcard:{
        type:Sequelize.INTEGER,
        unique:true,
        allowNull:false,
    },
    firstname:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phonenumber:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    totalpoint:{
        type: Sequelize.INTEGER,
        defaultValue : 0,
        allowNull:false,
    }
}); 

(async () =>{
    await Membership.sync({force:false});
})();

module.exports = Membership;