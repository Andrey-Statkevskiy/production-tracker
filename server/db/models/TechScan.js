const { DataTypes } = require('sequelize')
const db = require('../db')
const axios = require('axios');

const TechScan = db.define('techScan', {
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

module.exports = TechScan;