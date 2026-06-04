const router = require('express').Router()
const { models: { WorkSession, TechScan, Progress}} = require('../db')
module.exports = router

router.post('/start', async (req, res, next) => {
  try {
    const { station, level } = req.body

    const existing = await WorkSession.findOne({
      where: {
        userId: req.user.id,
        status: 'IN_PROGRESS'
      }
    })

    if (existing) {
      return res.status(400).send('Error: Session already in progress. Are you running the same account on multiple devices? Please logout from both and run from the new one.')
    }

    const session = await WorkSession.create({
      userId: req.user.id,
      station,
      level,
      startedRunAt: new Date()
    })

    res.json(session)
  } catch (err) {
    next(err)
  }
})

router.get('/active', async (req, res, next) => {
  try {
    const session = await WorkSession.findOne({
      where: {
        userId: req.user.id,
        status: 'IN_PROGRESS'
      }
    })

    res.json(session)
  } catch (err) {
    next(err)
  }
})

router.post("/:id/complete", async (req, res, next) => {
  try {
    const { scans, unitsCount } = req.body; // массив строк
    const sessionId = req.params.id;

    const session = await WorkSession.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
        status: 'IN_PROGRESS'
      }
    })

    if (!session) {
      return res.status(404).send('No active session')
    }
    
    // protection from duplicates
    const uniqueScans = [...new Set(scans)];

    if (uniqueScans.length !== scans.length) {
      return res.status(400).send("Duplicate serials detected");
    }

    // ALSO CHECK FOR DUPLICATES WITHIN THE DB, BUT DONT NECESSARILY CRASH JUST LET KNOW - IF YES, THEN UPDATE DATES AND ADD THE REST, IF NO, ADD THE REST ONLY?

    // create records
    const scanRecords = uniqueScans.map(serial => ({
      serial,
      workSessionId: session.id
    }));

    
    await TechScan.bulkCreate(scanRecords);
    
    
    const progress = await Progress.findOne({
      where: {
        level: session.level
      }
    })
    
    if (!progress) {
      await Progress.create({
        level: session.level,
        unitsCount
      })
    } else {
      await Progress.update({
        unitsCount: progress.unitsCount + unitsCount
      }, {
        where: {
          level: session.level
        }
      })
    }

    // update status of the session
    await WorkSession.update(
      {
        status: "COMPLETED",
        endedRunAt: new Date(),
        unitsCount
      },
      { 
        where: { id: sessionId }
      }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});