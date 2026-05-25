const router = require('express').Router()
const { models: { WorkSession, TechScan }} = require('../db')
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
      return res.status(400).send('Session already in progress')
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

// router.post('/complete', async (req, res, next) => {
//   try {
//     const { unitsCount } = req.body

//     const session = await WorkSession.findOne({
//       where: {
//         userId: req.user.id,
//         status: 'IN_PROGRESS'
//       }
//     })

//     if (!session) {
//       return res.status(404).send('No active session')
//     }

//     await session.update({
//       status: 'COMPLETED',
//       endedRunAt: new Date(),
//       unitsCount
//     })

//     res.json(session)
//   } catch (err) {
//     next(err)
//   }
// })

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
    // создаём записи
    const scanRecords = uniqueScans.map(serial => ({
      serial,
      workSessionId: session.id
    }));

    
    await TechScan.bulkCreate(scanRecords);
    
    // можно обновить статус сессии
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