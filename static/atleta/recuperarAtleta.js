var Request = require('tedious').Request

function recuperarAtleta(idAtleta){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var atleta = {};

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select * from atleta where idAtleta=@idAtleta", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    columns.forEach((column) => {
                        atleta[column.metadata.colName] = column.value;
                    })
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(atleta);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(atleta);
                });

                var TYPES = require('tedious').TYPES;
                request.addParameter("idAtleta", TYPES.Int, idAtleta);
                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarAtleta;