require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
const {
    getStage,
    getRider
} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/api/stage/', getStage);
app.get('/api/rider/', getRider);



app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))