const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: '',
    database: 'health-tracker'
});

pool.connect()
.then(() => {
    console.log('Connectedd to postgres database')
}).catch(error => {
    console.error('Error connecting to databse ', error)
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}