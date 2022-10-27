const Sequelize = require("sequelize");
require("dotenv").config();
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getStage: (req, res) => {
    console.log(req.query);
    const stage = req.query.stage;
    const year = req.query.year;
    console.log(stage, year);
    console.log("got to get stage");
    sequelize
      .query(`select * from tdf where stage = '${stage}' AND year = '${year}';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  getRider: (req, res) => {
    console.log(req.query);
    const rider = req.query.rider;
    console.log(rider);
    sequelize
      .query(`select * from tdf where winner = '${rider}';`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },

  enterData: (req, res) => {
    console.log(req.body);
    const {
      stage,
      year,
      distance,
      origin,
      destination,
      type,
      winner,
      winner_country,
    } = req.body;
    console.log("Enter Data request received");
    console.log(
      stage,
      year,
      distance,
      origin,
      destination,
      type,
      winner,
      winner_country
    );
    sequelize
      .query(
        `insert into tdf (stage, year, distance, origin, destination, type, winner, winner_country) values ('${stage}',${year},'${distance}','${origin}','${destination}','${type}','${winner}','${winner_country}');`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteData: (req, res) => {
    console.log(req.body);
    const stage = req.body.stage;
    const year = req.body.year;
    console.log(stage, year);
    console.log("got to delete data");
    sequelize
       .query(`delete from tdf where stage = '${stage}' AND year = '${year}';`)
       .then((dbRes) => res.status(200).send(dbRes[0]))
       .catch((err) => console.log(err));
  },
};
