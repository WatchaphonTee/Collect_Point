const Membership = require("./CustomerMembership_model");
const Orderdetail = require("./CustomerOrderDetail");
const Orderinvoice = require("./CustomerOrderInvoice_model");
const Attendance = require("./EmployeeAttendance_model");
const Position = require("./EmployeePosition_model");
const Menu = require("./Menu_model");
const User = require("./SystemUser_model");



(async () =>{
    await Menu.sync({force:false});
})();

module.exports={Membership,Orderdetail,Orderinvoice,
    Attendance,Position,Menu,User
}