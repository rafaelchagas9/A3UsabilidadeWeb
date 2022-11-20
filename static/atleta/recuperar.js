var Request = require('tedious').Request

function recuperarAtletas(){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var atletas = [];

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select * from atleta", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    var atleta = {};
                    columns.forEach((column) => {
                        atleta[column.metadata.colName] = column.value;
                    })
                    atletas.push(atleta);
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(atletas);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(atletas);
                });

                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarAtletas;