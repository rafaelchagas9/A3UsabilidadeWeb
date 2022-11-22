var Request = require('tedious').Request

function atualizarEsporte(body){
    return new Promise((resolve, reject) => {
        var connection = require('../db/connect');

        // Tratamento da finalização da conexão
        connection.on('end', () => {
            // Deletando string de conexão
            delete require.cache[require.resolve('../db/connect')]
        })
    
        // Evento pós conexão
        connection.on('connect', (err) => {
            if (err) {
                console.log(err)
            } else {
                var request = new Request("update esporte set NomeEsporte=@nomeEsporte, ParticipantesMinimo=@participantesMinimo, ParticipantesMaximo=@participantesMaximo", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close();
                        console.log("Falha ao cadastrar esporte!");
                        resolve(false);
                    } else {
                        connection.close();
                        resolve(true);
                    }
                })
                
                var TYPES = require('tedious').TYPES;
                request.addParameter('idEsporte', TYPES.Int, body.idEsporte)
                request.addParameter('nomeEsporte', TYPES.VarChar, body.nomeEsporte)
                request.addParameter('participantesMinimo', TYPES.Int, body.participantesMinimo)
                request.addParameter('participantesMaximo', TYPES.Int, body.participantesMaximo)
    
                connection.execSql(request);
                
            }
        })
    
        connection.connect();
    })
}

module.exports = atualizarEsporte;