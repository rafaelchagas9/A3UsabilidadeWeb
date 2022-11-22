var Request = require('tedious').Request

function cadastrarEvento(body){
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
                var request = new Request("insert into evento (NomeEvento, DataInicioEvento, DataFimEvento, IdEsporte) values (@nomeEvento, @dataInicioEvento, @dataFimEvento, @idEsporte)", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close();
                        console.log("Falha ao cadastrar evento!");
                        resolve(false);
                    } else {
                        connection.close();
                        resolve(true);
                    }
                })
                
                var TYPES = require('tedious').TYPES;
                request.addParameter('nomeEvento', TYPES.VarChar, body.nomeEvento)
                request.addParameter('dataInicioEvento', TYPES.SmallDateTime, body.dataInicioEvento)
                request.addParameter('dataFimEvento', TYPES.SmallDateTime, body.dataFimEvento)
                request.addParameter('idEsporte', TYPES.Int, body.idEsporte)
    
                connection.execSql(request);
            }
        })
    
        connection.connect();
    })
}

module.exports = cadastrarEvento;