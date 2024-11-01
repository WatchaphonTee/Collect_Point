const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./collect.db"
});
(async () =>{
    await sequelize.authenticate();
})();

module.exports = sequelize