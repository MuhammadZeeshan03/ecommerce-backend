const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root','ZEEshan123@',{
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;