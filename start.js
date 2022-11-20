const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${server.address().port}`);
});