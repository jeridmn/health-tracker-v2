const express = require('express')
const app = express();
const db = require('./db')
const cors = require('cors')
const foodLogRoutes = require('./foodlog')
const userRoutes = require('./users')

app.use(cors())
app.use(express.json())

app.use('/tracking/foodlog', foodLogRoutes)
app.use('/users', userRoutes)

app.listen(3000, () => {
    console.log('listening')
})


