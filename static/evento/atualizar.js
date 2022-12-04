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
                var request = new Request("update esporte set NomeEsporte=@nome, ParticipantesMinimo=@ParticipantesMinimo, ParticipantesMaximo=@ParticipantesMaximo where idEsporte=@IdEsporte", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close();
                        console.log("Falha ao atualizar esporte!");
                        resolve(false);
                    } else {
                        connection.close();
                        resolve(true);
                    }
                })
                
                var TYPES = require('tedious').TYPES;
                request.addParameter('IdEsporte', TYPES.Int, body.idEsporte)
                request.addParameter('nome', TYPES.VarChar, body.nome)
                request.addParameter('ParticipantesMinimo', TYPES.VarChar, body.min)
                request.addParameter('ParticipantesMaximo', TYPES.VarChar, body.max)
    
                connection.execSql(request);
                
            }
        })
    
        connection.connect();
    })
}

module.exports = atualizarEsporte;