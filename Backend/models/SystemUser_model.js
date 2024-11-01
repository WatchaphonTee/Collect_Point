const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Position = require("./EmployeePosition_model")

const User = sequelize.define("user",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    idcard:{
        type: Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    phonenumber:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    address:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    position_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: Position,
            key: "id"
        }
    },
    bankname:{
        type: Sequelize.STRING,
        defaultValue: "กรุงไทย",
    },
    bankid:{
        type: Sequelize.INTEGER,
        unique:true,
        allowNull:false,
    }
});

(async () =>{
    await User.sync({ force: false }); 
})();

module.exports = User;
