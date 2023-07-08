const db = require('./db')
const express = require('express');
const router = express.Router();

async function addFoodLog(req, res) {
    try {
        const { calories, fat, carbs, protein, uid, timeAdded, name, foodLogID} = req.body;
    
        const query = 'INSERT INTO usermacros (calories, fat, carbs, protein, uid, created_at, name, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [calories, fat, carbs, protein, uid, timeAdded, name, foodLogID];
        await db.query(query, values);
    
        res.status(201).json({ message: 'Log added' });
      } catch (error) {
        console.error('Error adding log:', error);
        res.status(500).json({ error: 'An error occurred while adding the log' });
      }
}

async function deleteFoodLog(req, res) {
    const id = req.params.id

    await db.query(`DELETE FROM usermacros WHERE id = \'${id}\'`, (err, result) => {
      if (err) {
        console.error('Failed to delete from database')
        res.status(500)
      } else {
        res.status(202).json({message: 'deleted from database'})
      }
    })
}

async function getFoodLog(req, res) {
    const uid = req.params.uid

    console.log(uid)

    await db.query(`SELECT * FROM usermacros WHERE uid = \'${uid}\'`, (err, result) => {
        if (err) {
            console.error('Error executing database query: ', err)
            res.status(500).json({error: 'Error occurred retrieving data.'})
        } else {
            const rows = result.rows;
            console.log('Data from usermacros: ', rows)
            res.json(rows)
        }
    })
}

router.get('/history/:uid', getFoodLog);
router.post('/', addFoodLog);
router.delete('/:id', deleteFoodLog);

module.exports = router;
