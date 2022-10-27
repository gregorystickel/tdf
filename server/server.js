require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { SERVER_PORT } = process.env;
const { getStage, getRider, enterData, deleteData } = require("./controller.js");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/api/stage/", getStage);
app.get("/api/rider/", getRider);
app.post("/api/data/", enterData);
app.delete("/api/data", deleteData);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
