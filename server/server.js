require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { SERVER_PORT } = process.env;
const {
  getStage,
  getRider,
  enterData,
  deleteRecord
} = require("./controller.js");
const { seed } = require("./seed.js");
const {getHTML, getCSS, getJS} = require('./controller')

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get('/', getHTML)
app.get('/css', getCSS)
app.get('/js', getJS)
app.get("/api/stage/", getStage);
app.get("/api/rider/", getRider);
app.post("/seed", seed);
app.post("/api/data/", enterData);
app.delete("/api/data", deleteRecord);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
