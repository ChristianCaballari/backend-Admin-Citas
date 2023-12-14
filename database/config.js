const sql = require('mssql');

const dbConnection = {
     server: process.env.SERVER,
     user: process.env.USER,
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     options:{
          trustServerCertificate: true
     }
}
module.exports = {
     sql,
     dbConnection
}