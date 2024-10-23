const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite", //type
    storage: "./database.db" //path file
});
(async ()=>{
    await sequelize.authenticate();
})();

module.exports = sequelize