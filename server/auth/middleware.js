const { models: { User } } = require('../db')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).send('No token')
    }

    const user = await User.findByToken(token)

    req.user = user

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authMiddleware