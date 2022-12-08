var Request = require('tedious').Request

function excluirEvento(body){

    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            console.log("Conexão encerrada!")
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })
    
        // Evento pós conexão
        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("delete from evento where IdEvento = @IdEvento", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                        resolve(false);
                    } else {
                        console.log(`${rowCount} rows`)
                        connection.close()
                        resolve(true);
                    }
                })
                
                var TYPES = require('tedious').TYPES;
                request.addParameter('IdEvento', TYPES.Int, body.idEvento)
    
    
                connection.execSql(request);
                
            }
        })
    
        connection.connect();
    });
    
}

module.exports = excluirEvento;