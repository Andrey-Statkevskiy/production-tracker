const { DataTypes } = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Progress = db.define('progress', {
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitsCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
})

module.exports = Progress