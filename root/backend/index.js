const express = require('express')
const app = express();
const db = require('./db')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log('listening')
})

app.post('/users', async (req, res) => {
    try {
      const { email, uid } = req.body;
      console.log(req.body)
  
      const query = 'INSERT INTO users (email, uid) VALUES ($1, $2)';
      const values = [email, uid];
      await db.query(query, values);
  
      res.status(201).json({ message: 'User added to the database' });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  });

  app.post('/tracking/foodlog', async (req, res) => {
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
  });

  app.get('/tracking/foodlog/history/:uid', async (req, res) => {
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
  })

  app.delete(`/tracking/foodlog/:id`, async (req, res) => {
    const id = req.params.id

    await db.query(`DELETE FROM usermacros WHERE id = \'${id}\'`, (err, result) => {
      if (err) {
        console.error('Failed to delete from database')
        res.status(500)
      } else {
        console.log('Deleted log from database.')
        res.status(202)
      }
    })
  })