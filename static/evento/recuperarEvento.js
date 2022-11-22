var Request = require('tedious').Request

function recuperarEvento(idEvento){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var evento = {};

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select * from evento where idEvento=@idEvento", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    columns.forEach((column) => {
                        evento[column.metadata.colName] = column.value;
                    })
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(evento);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(evento);
                });

                var TYPES = require('tedious').TYPES;
                request.addParameter("idEvento", TYPES.Int, idEvento);
                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarEvento;