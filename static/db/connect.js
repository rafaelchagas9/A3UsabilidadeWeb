const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        'userName': 'sa',
        'password': '12345678',
      }
    },
    options:{
        'port':1434,
        'trustServerCertificate': true,
        'database': 'olimpiadas',
    }
  }

const connection = new Connection(config)
module.exports = connection;