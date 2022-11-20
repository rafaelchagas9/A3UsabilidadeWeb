const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/atleta-cad', (req, res) => {
    res.render('./atleta/atletaInsert');
});

router.post('/atleta-cad', (req, res) => {
  const cadastrarAtleta = require('../static/atleta/cadastrar');
  const sucesso = cadastrarAtleta(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/atleta');
    } else{
      res.redirect('/atleta-cad');
    }
  });
});

router.get('/atleta', (req, res) => {
  const recuperarAtletas = require('../static/atleta/recuperar');
  var lista_atletas = [];
  lista_atletas = recuperarAtletas().then((lista_atletas) => {
    res.render('./atleta/atleta', {atletas: lista_atletas});
  });
});

router.post('/atleta-excluir', (req, res) => {
  const excluirAtleta = require('../static/atleta/deletar');
  const sucesso = excluirAtleta(req.body).then((sucesso) => {
    if (sucesso){
      res.status(200);
      return res.send('Okay');
    } else{
      res.status(500);
    }
  });
});

router.get('/evento-cad', (req, res) => {
  res.render('./evento/evento');
});

router.get('/evento', (req, res) => {
  res.render('./evento/evento');
});

router.get('/esporte-cad', (req, res) => {
  res.render('./esporte/esporte');
});

router.get('/esporte', (req, res) => {
  res.render('./esporte/esporte');
});

module.exports = router;