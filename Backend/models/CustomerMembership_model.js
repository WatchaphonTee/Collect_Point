const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Membership = sequelize.define("membership",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
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
        type:Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        defaultValue : 0,
    }
}); 

(async () =>{
    await Membership.sync({force:false});
})();

module.exports = Membership;