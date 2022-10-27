const Sequelize = require('sequelize');
require('dotenv').config();
const {CONNECTION_STRING} = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getStage: (req, res) => {
        console.log(req.query)
        const stage = req.query.stage;
        const year = req.query.year;
        console.log(stage,year)
        console.log("got to get stage")
        sequelize.query(`select * from tdf where stage = '${stage}' AND year = '${year}';`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    getRider: (req, res) => {
        console.log(req.query)
        const rider = req.query.rider;
        console.log(rider)
        sequelize.query(`select * from tdf where winner = '${rider}';`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}
