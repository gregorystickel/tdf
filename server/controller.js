const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const tdf = sequelize.define(
  "tdf",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stage: DataTypes.STRING,
    year: DataTypes.INTEGER,
    distance: DataTypes.DECIMAL,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    type: DataTypes.STRING,
    winner: DataTypes.STRING,
    winner_country: DataTypes.STRING,
  },
  {
    // options
    sequelize,
    tableName: "tdf",
    timestamps: false,
  }
);

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

  // enterData: (req, res) => {
  //   console.log(req.body);
  //   const {
  //     stage,
  //     year,
  //     distance,
  //     origin,
  //     destination,
  //     type,
  //     winner,
  //     winner_country,
  //   } = req.body;
  //   console.log("Enter Data request received");
  //   console.log(
  //     stage,
  //     year,
  //     distance,
  //     origin,
  //     destination,
  //     type,
  //     winner,
  //     winner_country
  //   );
  //   sequelize
  //     .query(
  //       `insert into tdf (stage, year, distance, origin, destination, type, winner, winner_country) values ('${stage}',${year},'${distance}','${origin}','${destination}','${type}','${winner}','${winner_country}');`
  //     )
  //     .then((dbRes) => res.status(200).send(dbRes[0]))
  //     .catch((err) => console.log(err));
  // },
  
  deleteRecord: async (req, res) => {
    const stage = req.body.stage;
    const year = req.body.year;
    console.log("got to delete data");
    const count = await tdf
      .destroy({
        where: { year: `${year}`, stage: `${stage}`},
      })
      .then((count) => res.status(200).send(JSON.stringify(count, 2)))
      .catch((error) => {
        console.error("Unable to connect to the database: ", error);
      });

    // })
  },

  enterData: (req, res) => {
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
      let result = tdf.findOrCreate({
      where: { year: `${year}`, stage: `${stage}` },
      defaults: { stage:`${stage}`, year: `${year}`, distance: `${distance}`, origin: `${origin}`, destination: `${destination}`, type: `${type}`, winner: `${winner}`,  winner_country: `${winner_country}`}})

      .then((result) => { res.status(200).send(JSON.stringify(result))
        console.log(result)
      })
       .catch((err) => console.log(err));
  },
};
