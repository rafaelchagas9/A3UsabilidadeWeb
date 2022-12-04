var Request = require('tedious').Request

function recuperarEventos(){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var eventos = [];

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select ev.*, es.NomeEsporte from evento as ev INNER JOIN esporte as es on ev.IdEsporte = es.IdEsporte", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    var evento = {};
                    for(var column in columns){
                        evento[columns[column].metadata.colName] = columns[column].value;
                    }
                    eventos.push(evento);
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(eventos);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(eventos);
                });

                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarEventos;