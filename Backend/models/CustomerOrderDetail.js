const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const User = require("./SystemUser_model")

const Orderdetail = sequelize.define("orderdetail", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: new Date().getTime(),
        allowNull: false,
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    total_point: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    order_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // กำหนดค่าเริ่มต้น
    },
    membership_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Membership,
            key: "id",
        },
        onDelete: "CASCADE", // Cascade relationships
    },
    user_id: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,  
            key: "id",  
        },
        onDelete: "CASCADE",
    },
    
}, {
    timestamps: false,
});

(async () => {
    await Orderdetail.sync({ force: false });
})();

module.exports = Orderdetail;
