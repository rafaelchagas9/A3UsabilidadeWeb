const Connection = require('tedious').Connection
const Request = require('tedious').Request

const config = {
    server: '34.132.45.86',
    authentication: {
      type: 'default',
      options: {
        'userName': 'a3',
        'password': '12345678',
      }
    },
    options:{
        'trustServerCertificate': true,
        'database': 'olimpiadas',
    }
  }

const connection = new Connection(config)
module.exports = connection;