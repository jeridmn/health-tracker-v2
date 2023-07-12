const express = require('express')
const app = express();
const db = require('./db')
const cors = require('cors')
const foodLogRoutes = require('./foodlog')
const userRoutes = require('./users')
const weightRoutes = require('./weights')

app.use(cors())
app.use(express.json())

app.use('/tracking/foodlog', foodLogRoutes)
app.use('/users', userRoutes)
app.use('/tracking/weights', weightRoutes)

app.listen(3000, () => {
    console.log('listening')
})


