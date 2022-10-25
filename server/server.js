require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {
    getStage
} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get('/stage', getStage);


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))