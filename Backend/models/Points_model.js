const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Membership = require("./CustomerMembership_model");

const Points = sequelize.define("points", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    membership_id: {  // เพิ่ม `membership_id` เพื่อเชื่อมโยงกับ `Membership`
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Membership,
            key: "id",
        },
        onDelete: "CASCADE", // ลบข้อมูลเมื่อ `Membership` ถูกลบ
    },
    orderdetail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "orderdetails",
            key: "id",
        },
        onDelete: "CASCADE", // ลบข้อมูลเมื่อ Orderdetail ถูกลบ
    },
    points_earned: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});


(async () => {
    await Points.sync({ force: false });
})();

module.exports = Points;
