const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Rota inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Página de cadastro de atletas
router.get('/atleta-cad', (req, res) => {
    res.render('./atleta/atletaInsert');
});

// Cadastro dos atletas
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

// Página de atualização do atleta
router.get('/atleta-update', (req, res) => {
  const recuperarAtleta = require('../static/atleta/recuperarAtleta');
  var atleta;
  atleta = recuperarAtleta(req.query.id).then((atleta) => {
    res.render('./atleta/atletaUpdate', {atleta: atleta});
  });
});

// Atualização dos atletas
router.post('/atleta-update', (req, res) => {
  const atualizarAtleta = require('../static/atleta/atualizar');
  const sucesso = atualizarAtleta(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/atleta');
    } else{
      res.redirect('/atleta-update', {idAtleta: body.idAtleta});
    }
  });
});

// Página de visualização dos atletas
router.get('/atleta', (req, res) => {
  const recuperarAtletas = require('../static/atleta/recuperar');
  var lista_atletas = [];
  lista_atletas = recuperarAtletas().then((lista_atletas) => {
    res.render('./atleta/atleta', {atletas: lista_atletas});
  });
});

// Exclusão dos atletas
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