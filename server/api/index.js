const router = require('express').Router()
const authMiddleware = require('../auth/middleware')
module.exports = router

router.use('/users', require('./users'))
router.use('/sessions', authMiddleware, require('./sessions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
