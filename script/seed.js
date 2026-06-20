'use strict'

const {db, models: {User, Target, Progress} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'tech', password: '123', role: 'technician', employeeId: 614}),
    User.create({ username: 'asmith', password: '123', role: 'technician', employeeId: 615}),
    User.create({ username: 'jbrown', password: '123', role: 'technician', employeeId: 616}),
    User.create({ username: 'lsolo', password: '123', role: 'technician', employeeId: 617}),
    User.create({ username: 'jrock', password: '123', role: 'technician', employeeId: 618}),
    User.create({ username: 'klaw', password: '123', role: 'technician', employeeId: 619}),
    User.create({ username: 'leader', password: '123', role: 'leader', employeeId: 999}),
    User.create({ username: 'tv', password: '123', role: 'tv', employeeId: null}),

  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
