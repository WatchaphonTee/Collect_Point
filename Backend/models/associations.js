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
    foreignKey: "Orderinvoice_id", 
    onDelete: "CASCADE", 
});
Orderdetail.belongsTo(Orderinvoice, {
    foreignKey: "Orderinvoice_id", 
    onDelete: "CASCADE", 
});

// Membership associations
Membership.hasMany(Orderdetail, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", 
});
Orderdetail.belongsTo(Membership, {
    foreignKey: "membership_id",
});

// User associations
User.hasMany(Orderdetail, { 
    foreignKey: "user_id",
    onDelete: "CASCADE", 
});
Orderdetail.belongsTo(User, { 
    foreignKey: "user_id", 
});

// Points associations
Membership.hasMany(Points, { 
    foreignKey: 'membership_id',
    onDelete: "CASCADE", 
});
Points.belongsTo(Membership, { 
    foreignKey: 'membership_id' 
});

Orderinvoice.hasMany(Points, { 
    foreignKey: 'orderinvoice_id',
    onDelete: "CASCADE", 
});
Points.belongsTo(Orderinvoice, { 
    foreignKey: 'orderinvoice_id' 
});

// Attendance associations
Attendance.belongsTo(Membership, {
    foreignKey: "membership_id",
    onDelete: "CASCADE", 
});
Membership.hasMany(Attendance, {
    foreignKey: "membership_id",
});

// Position associations
Position.hasMany(Membership, { 
    foreignKey: 'position_id',
    onDelete: "SET NULL", 
});
Membership.belongsTo(Position, { 
    foreignKey: 'position_id',
    onDelete: "SET NULL" 
});

// User associations
User.hasMany(Orderinvoice, { 
    foreignKey: 'user_id',
    onDelete: "CASCADE" 
});
Orderinvoice.belongsTo(User, { 
    foreignKey: 'user_id' 
});

Menu.hasMany(Orderdetail,{
    foreignKey: 'menu_id',
    onDelete: "NO ACTION",
});

Orderdetail.belongsTo(Menu,{
    foreignKey: 'menu_id'
});

(async () => {
    await Menu.sync({ force: false });
    //await Orderdetail.sync({ alter: true }); 
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
