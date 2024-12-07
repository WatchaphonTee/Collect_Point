const Membership = require("./CustomerMembership_model");
const Orderdetail = require("./CustomerOrderDetail");
const Orderinvoice = require("./CustomerOrderInvoice_model");
const Attendance = require("./EmployeeAttendance_model");
const Position = require("./EmployeePosition_model");
const Menu = require("./Menu_model");
const User = require("./SystemUser_model");
const Points = require("./Points_model");

// Associations

// Membership associations
Membership.hasMany(Orderdetail, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", // ลบ Membership จะลบ Orderdetail
});
Orderdetail.belongsTo(Membership, {
    foreignKey: "membership_id",
});

Membership.hasMany(Orderinvoice, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", // ลบ Membership จะลบ Orderinvoice
});
Orderinvoice.belongsTo(Membership, {
    foreignKey: "membership_id",
});

// Orderdetail associations
Orderdetail.hasMany(Orderinvoice, {
    foreignKey: "Orderdetail_id",
    onDelete: "CASCADE", // หากลบ Orderdetail จะลบ Orderinvoice ด้วย
});

Orderinvoice.belongsTo(Orderdetail, {
    foreignKey: "Orderdetail_id",
});

// Points associations
Membership.hasMany(Points, { 
    foreignKey: 'membership_id',
    onDelete: "CASCADE", // หากลบ Membership จะลบ Points ด้วย
});
Points.belongsTo(Membership, { 
    foreignKey: 'membership_id' 
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
Menu.hasMany(Orderinvoice, { 
    foreignKey: 'menu_id',
    onDelete: "CASCADE" // หากลบ Menu จะลบ Orderinvoice ที่เชื่อมโยงกับมัน
});
Orderinvoice.belongsTo(Menu, { 
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
