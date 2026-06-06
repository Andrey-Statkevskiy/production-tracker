const { DataTypes } = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Target = db.define("target", {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Target;
