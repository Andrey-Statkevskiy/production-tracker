const router = require("express").Router();
const {
  models: { Target, Progress },
} = require("../db");
module.exports = router;

router.get("/", async (req, res) => {
  try {
    const targets = await Target.findAll({
      order: [["level", "ASC"]],
    });

    res.json(targets);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/", async (req, res) => {
  const { level, value, period } = req.body;

  let target = await Target.findOne({ where: { level } });

  if (!target) {
    target = await Target.create({ level, value, period });
  } else {
    await target.update({ value, period });
  }

  // IMPORTANT: return full dataset
  const allTargets = await Target.findAll({
    order: [["level", "ASC"]],
  });

  res.json(allTargets);
});

router.get("/progress", async (req, res) => {
  try {
    const progress = await Progress.findAll({
      order: [["level", "ASC"]],
    });

    res.json(progress);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post("/progress/reset", async (req, res) => {
  try {
    await Progress.update(
      { unitsCount: 0 },
      { where: {} } // reset ALL levels dynamically
    );

    const updated = await Progress.findAll({
      order: [["level", "ASC"]],
    });

    res.json(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
