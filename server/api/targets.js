// server/api/targets.js

const router = require("express").Router();
const {
  models: { Target, WorkSession },
} = require("../db");
const { Op } = require("sequelize");

module.exports = router;

// GET targets
router.get("/", async (req, res) => {
  const targets = await Target.findAll({
    order: [["level", "ASC"]],
    raw: true,
  });
  res.json(targets);
});

// CREATE / UPDATE target
router.patch("/", async (req, res) => {
  const { level, value, startDate, endDate } = req.body;

  let target = await Target.findOne({ where: { level } });

  if (!target) {
    await Target.create({ level, value, startDate, endDate });
  } else {
    await target.update({ value, startDate, endDate });
  }

  const allTargets = await Target.findAll({
    order: [["level", "ASC"]],
  });

  res.json(allTargets);
});

// new summary endpoint (progress)
router.get("/summary", async (req, res) => {
  try {
    const targets = await Target.findAll();

    const result = [];

    for (const target of targets) {
      const sessions = await WorkSession.findAll({
        where: {
          status: "COMPLETED",
          level: target.level,
          endedRunAt: {
            [Op.gte]: target.startDate,
            [Op.lt]: target.endDate,
          },
        },
      });

      let total = 0;
      const stationsMap = {};

      sessions.forEach((s) => {
        total += s.unitsCount;

        stationsMap[s.station] = (stationsMap[s.station] || 0) + s.unitsCount;
      });

      result.push({
        level: target.level,
        target: target.value,
        total,
        percent: target.value ? (total / target.value) * 100 : 0,
        stations: Object.entries(stationsMap).map(([station, units]) => ({
          station,
          units,
          percent: target.value ? (units / target.value) * 100 : 0,
        })),
      });
    }

    res.json(result);
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
