const db = require('./db')
const express = require('express');
const router = express.Router();

async function storeUser(req, res) {
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
}

router.post('/', storeUser)
    
module.exports = router;
