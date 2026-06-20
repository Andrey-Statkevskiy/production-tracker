const { DataTypes } = require('sequelize')
const db = require('../db')
const axios = require('axios');

/// PURPOSE: SOURCE OF TRUTH, HISTORY, ANALYTICS \\\

const WorkSession = db.define('workSession', {
    station: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('IN_PROGRESS', 'COMPLETED'),
      defaultValue: 'IN_PROGRESS',
    },
    startedRunAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endedRunAt: {
      type: DataTypes.DATE,
    },
    unitsCount: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
}, {
  indexes: [
    { fields: ['userId'] },
    { fields: ['status'] },
  ]
})

module.exports = WorkSession