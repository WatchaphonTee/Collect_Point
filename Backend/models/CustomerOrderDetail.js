const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Membership = require("./CustomerMembership_model");
const User = require("./SystemUser_model");
const Menu = require("./Menu_model");
const Orderinvoice = require("./CustomerOrderInvoice_model");

const Orderdetail = sequelize.define("orderdetail", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: new Date().getTime(),
        allowNull: false,
    },
    menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Menu,
            key: "id", 
        },
        onDelete: "NO ACTION",
    },
    quantity: {
        type: Sequelize.INTEGER,
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
}, {
    timestamps: false,
});

(async () => {
    await Orderdetail.sync({ force: false  });
})();

module.exports = Orderdetail;
