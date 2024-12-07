const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const User = require("./SystemUser_model");

const Orderinvoice = sequelize.define("orderinvoice", {
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
        onDelete: "CASCADE", 
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
    total_price: {
        type: Sequelize.DECIMAL(10, 2), 
        allowNull: false,
    },
    total_point: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
}, {
    timestamps: true, 
});

(async () => {
    await Orderinvoice.sync({  force: false }); 
})();

module.exports = Orderinvoice;
