const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const Orderinvoice = require("./CustomerOrderInvoice_model"); 

const Points = sequelize.define("points", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    membership_id: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Membership,
            key: "id",
        },
        onDelete: "CASCADE", // ลบข้อมูลเมื่อ `Membership` ถูกลบ
    },
    orderinvoice_id: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Orderinvoice, 
            key: "id",
        },
        onDelete: "CASCADE",
    },
    points_earned: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

(async () => {
    await Points.sync({  force: false });
})();

module.exports = Points;
