const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getStage: (req, res) => {
        sequelize.query(`select * from tdf
        where stage = "1";`)
        console.log(res.data)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    // approveAppointment: (req, res) => {
    //     let {apptId} = req.body
    
    //     sequelize.query(`update cc_appointments
    //     set approved = true
    //     where appt_id = ${apptId}        
    //     insert into cc_emp_appts (emp_id, appt_id)
    //     values (${nextEmp}, ${apptId}),
    //     (${nextEmp + 1}, ${apptId});
    //     `)
    //         .then(dbRes => {
    //             res.status(200).send(dbRes[0])
    //             nextEmp += 2
    //         })
    //         .catch(err => console.log(err))
    // },

    // getAllClients: (req, res) => {
    //     sequelize.query(`select * 
    //     from cc_users
    //     join cc_clients 
    //     on cc_users.user_id = cc_clients.user_id;`)
    //         .then(dbRes => res.status(200).send(dbRes[0]))
    //         .catch(err => console.log(err))
    // },

    // getPendingAppointments: (req, res) => {
    //     sequelize.query(`select * 
    //     from cc_appointments
    //     where approved = false;`)
    //         .then(dbRes => res.status(200).send(dbRes[0]))
    //         .catch(err => console.log(err))
    // }, 

    // getPastAppointments: (req, res) => {
    //     sequelize.query(`select cc_appointments.appt_id, cc_appointments.date, cc_appointments.service_type,cc_appointments.notes, cc_users.first_name, cc_users.last_name 
    //     from cc_appointments, cc_users
    //     where approved = true AND completed = true ;`)
    //         .then(dbRes => res.status(200).send(dbRes[0]))
    //         .catch(err => console.log(err))
    // } 



}
