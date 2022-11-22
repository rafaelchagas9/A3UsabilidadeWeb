var Request = require('tedious').Request

function recuperarEsportes(){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');
        var esportes = [];

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })

        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("select * from esporte", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                    } else{
                        connection.close();
                    }
                })

                request.on('row', (columns) => {
                    var esporte = {};
                    columns.forEach((column) => {
                        esporte[column.metadata.colName] = column.value;
                    })
                    esportes.push(atleta);
                })

                request.on('error',error=>reject(error));
                request.on('done',function (rowCount, more, rows){
                    //connection.close();
                    resolve(esportes);
                });

                request.on('doneProc',function (rowCount, more, rows){
                    //connection.close();
                    resolve(esportes);
                });

                connection.execSql(request);
                
            }
        })
        connection.connect();

    });
    
}

module.exports = recuperarEsportes;