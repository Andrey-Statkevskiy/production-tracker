//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const WorkSession = require('./models/WorkSession')
const TechScan = require('./models/TechScan')
const Target = require('./models/Target')
const Progress = require('./models/Progress')

//associations could go here!
User.hasMany(WorkSession, {
  foreignKey: 'userId',
})
WorkSession.belongsTo(User, {
  foreignKey: 'userId',
})

WorkSession.hasMany(TechScan)
TechScan.belongsTo(WorkSession)

module.exports = {
  db,
  models: {
    User,
    WorkSession,
    TechScan,
    Target,
    Progress
  },
}
