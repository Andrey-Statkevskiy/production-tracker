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

router.patch('/', async (req, res) => {
  try {
    const { key, value, period } = req.body

    let target = await Target.findOne({
      order: [['createdAt', 'DESC']]
    })

    if (!target) {
      target = await Target.create({})
    }

    // dynamic input field updating
    if (key === 'lvl1') {
      target.lvl1_value = value
      target.lvl1_period = period
    }

    if (key === 'lvl2') {
      target.lvl2_value = value
      target.lvl2_period = period
    }

    if (key === 'cell') {
      target.cell_value = value
      target.cell_period = period
    }

    await target.save()

    res.json(target)
  } catch (err) {
    res.status(500).send(err.message)
  }
})