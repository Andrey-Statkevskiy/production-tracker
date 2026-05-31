const router = require('express').Router()
const { models: { Target }} = require('../db')
module.exports = router

router.get('/', async (req, res) => {
  try {
    const target = await Target.findOne({
      order: [['createdAt', 'DESC']]
    })

    res.json(target)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newTarget = await Target.create(req.body)

    res.json(newTarget) // return data
  } catch (err) {
    res.status(500).send(err.message)
  }
})