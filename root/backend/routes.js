const express = require('express')
const router = express.Router();
const db = require('./db')

router.post('/users', async (req, res) => {
    try {
        const { email, uid} = req.body;

        //Insert into postgres data base from firebase
        const query = 'INSERT INTO users (email, uid)'
        const values = [email, uid]
        await db.query(query, values)

        res.status(201).json({ message: 'User data has been added to database'})
    } catch (error) {
        console.error('Error adding user data into database: ', error)
        res.status(500).json({error: 'Failed to add user data'})
    }
})

module.exports = router;