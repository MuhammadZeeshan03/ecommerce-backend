const Sequelize = require("sequelize");

const sequelize = require("../db/database");

const User = sequelize.define("user",{

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isIn: [["customer", "admin"]],
        },
        defaultValue: "customer",

    },

})

module.exports = User;