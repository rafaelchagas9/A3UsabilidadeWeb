var Request = require('tedious').Request

function recuperarEsporte(idEsporte){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var esporte = {};

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select * from atleta where IdEsporte=@idEsporte", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    columns.forEach((column) => {
                        esporte[column.metadata.colName] = column.value;
                    })
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(esporte);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(esporte);
                });

                var TYPES = require('tedious').TYPES;
                request.addParameter("idEsporte", TYPES.Int, idEsporte);
                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarEsporte;