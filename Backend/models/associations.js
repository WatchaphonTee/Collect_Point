const Membership = require("./CustomerMembership_model");
const Orderdetail = require("./CustomerOrderDetail");
const Orderinvoice = require("./CustomerOrderInvoice_model");
const Attendance = require("./EmployeeAttendance_model");
const Position = require("./EmployeePosition_model");
const Menu = require("./Menu_model");
const User = require("./SystemUser_model");
const Points = require("./Points_model");

// Associations

// Orderdetail associations
Orderinvoice.hasMany(Orderdetail, {
    foreignKey: "Orderinvoice_id", // การเชื่อมโยง Orderinvoice กับหลาย Orderdetail
    onDelete: "CASCADE", // เมื่อลบ Orderinvoice จะลบ Orderdetail ที่เกี่ยวข้อง
});
Orderdetail.belongsTo(Orderinvoice, {
    foreignKey: "Orderinvoice_id", // การเชื่อมโยง Orderdetail กับ Orderinvoice
    onDelete: "CASCADE", // ลบ Orderdetail เมื่อ Orderinvoice ถูกลบ
});

// Membership associations
Membership.hasMany(Orderdetail, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", // ลบ Membership จะลบ Orderdetail
});
Orderdetail.belongsTo(Membership, {
    foreignKey: "membership_id",
});

// User associations
User.hasMany(Orderdetail, { 
    foreignKey: "user_id",
    onDelete: "CASCADE", // ลบ User จะลบ Orderdetail
});
Orderdetail.belongsTo(User, { 
    foreignKey: "user_id", 
});

// Points associations
Membership.hasMany(Points, { 
    foreignKey: 'membership_id',
    onDelete: "CASCADE", // หากลบ Membership จะลบ Points ด้วย
});
Points.belongsTo(Membership, { 
    foreignKey: 'membership_id' 
});

Orderinvoice.hasMany(Points, { 
    foreignKey: 'orderinvoice_id',
    onDelete: "CASCADE", // หากลบ Orderinvoice จะลบ Points ด้วย
});
Points.belongsTo(Orderinvoice, { 
    foreignKey: 'orderinvoice_id' 
});

// Attendance associations
Attendance.belongsTo(Membership, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", // หากลบ Membership จะลบ Attendance ด้วย
});
Membership.hasMany(Attendance, {
    foreignKey: "membership_id",
});

// Position associations
Position.hasMany(Membership, { 
    foreignKey: 'position_id',
    onDelete: "SET NULL", // เมื่อ Position ถูกลบ ให้ Set เป็น NULL ใน `membership.position_id`
});
Membership.belongsTo(Position, { 
    foreignKey: 'position_id',
    onDelete: "SET NULL" 
});

// Menu associations
Menu.hasMany(Orderdetail, { 
    foreignKey: 'menu_id',
    onDelete: "CASCADE" // หากลบ Menu จะลบ Orderinvoice ที่เชื่อมโยงกับมัน
});
Orderdetail.belongsTo(Menu, { 
    foreignKey: 'menu_id' 
});

// User associations
User.hasMany(Orderinvoice, { 
    foreignKey: 'user_id',
    onDelete: "CASCADE" // หากลบ User จะลบ Orderinvoice ที่เชื่อมโยงกับมัน
});
Orderinvoice.belongsTo(User, { 
    foreignKey: 'user_id' 
});

(async () => {
    await Menu.sync({ force: false });
    //await Orderdetail.sync({ alter: true }); // ใช้ alter เพื่ออัปเดตโครงสร้างตาราง
})();

module.exports = {
    Membership,
    Orderdetail,
    Orderinvoice,
    Attendance,
    Position,
    Menu,
    User,
    Points
};
