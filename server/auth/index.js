const router = require('express').Router()
const { models: {User }} = require('../db')
const bcrypt = require("bcrypt")
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const userToken = await User.authenticate(req.body)
    res.send({ token: userToken }); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send('New User Created Successfully.')
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/changePass', async (req, res, next) => {
  try {
    const { id, currentPass, newPass, confirmNewPass } = req.body
    const user = await User.findOne({ where: { id: id } });
    let error
    if (!user) {
      error = new Error("User not found.")
      error.status = 400
      throw error
    }
    if (!(await bcrypt.compare(currentPass, user.dataValues.password))) {
      error = new Error("Current password doesn't match!")
      error.status = 400
      throw error
    }
    if (newPass !== confirmNewPass) {
      error = new Error("New passwords must match!")
      error.status = 400
      throw error
    }

    const newHashedPass = await bcrypt.hash(newPass, 5)

    await User.update({ password: newHashedPass }, { where: { id: id } });
    res.send('Password Changed Successfully.')
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user)
  } catch (ex) {
    next(ex)
  }
})
