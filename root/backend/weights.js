const db = require('./db')
const express = require('express');
const router = express.Router();

async function storeWeight(req, res) {
    try {
        const { weight, uid, timeAdded, weightLogID} = req.body;

        const query = 'INSERT INTO userweights (weight, uid, date, id) VALUES ($1, $2, $3, $4)'
        const values = [weight, uid, timeAdded, weightLogID]
        db.query(query, values)
        res.status(204).json({message: 'user weight added to database'})
    } catch {
        res.status(500).json({error: 'error adding user weight to database'})
    }
}

async function getUserWeights(req, res) {
    const uid = req.params.uid;

    const query = `SELECT * FROM userweights WHERE uid = \'${uid}\'`
    await db.query(query, (err, result) => {
        if(err) {
            res.status(500).json({error: 'failed to retrieve user weights'})
        } else {
            const rows = result.rows;

            res.json(rows)
        }
    })
}

async function deleteUserWeights(req, res) {
    const id = req.params.id

    await db.query(`DELETE FROM userweights WHERE id = \'${id}\'`, (err, result) => {
        if (err) {
          console.error('Failed to delete from database')
          res.status(500)
        } else {
          res.status(205).json({message: 'deleted from database'})
        }
      })
}

router.post('/add-weight', storeWeight)
router.get('/get-weights/:uid', getUserWeights )
router.delete('/delete-weight/:id', deleteUserWeights )

module.exports = router;
