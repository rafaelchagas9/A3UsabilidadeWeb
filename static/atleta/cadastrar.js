var Request = require('tedious').Request

function cadastrarAtleta(body){
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
                var request = new Request("insert into atleta (Nome, Sobrenome, Email, Telefone, Sexo) values (@nome, @sobrenome, @email, @telefone, @sexo)", (err, rowCount) => {
                    if (err) {
                        console.log(err);
                        connection.close();
                        console.log("Falha ao cadastrar atleta!");
                        resolve(false);
                    } else {
                        connection.close();
                        resolve(true);
                    }
                })
                
                var TYPES = require('tedious').TYPES;
                request.addParameter('nome', TYPES.VarChar, body.nome)
                request.addParameter('sobrenome', TYPES.VarChar, body.sobrenome)
                request.addParameter('email', TYPES.VarChar, body.email)
                request.addParameter('telefone', TYPES.VarChar, body.telefone)
                request.addParameter('sexo', TYPES.VarChar, body.sexo)
    
                connection.execSql(request);
                
            }
        })
    
        connection.connect();
    })
}

module.exports = cadastrarAtleta;