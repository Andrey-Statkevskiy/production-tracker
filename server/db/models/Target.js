const { DataTypes } = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Target = db.define("target", {
  lvl1_value: DataTypes.INTEGER,
  lvl1_period: DataTypes.STRING,
  lvl2_value: DataTypes.INTEGER,
  lvl2_period: DataTypes.STRING,
  cell_value: DataTypes.INTEGER,
  cell_period: DataTypes.STRING,
});

module.exports = Target;
