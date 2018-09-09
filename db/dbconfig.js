const Sequelize = require('sequelize');
const sequelize = new Sequelize('HackerBay', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Successfully connected to localhost database as root user.`
    );
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = sequelize;
