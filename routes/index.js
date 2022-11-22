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

//Loading pagina de cadastro eventos
router.get('/evento-cad', (req, res) => {
  res.render('./evento/eventoInsert');
});

// Cadastro dos eventos
router.post('/evento-cad', (req, res) => {
  const cadastrarEvento = require('../static/evento/cadastrar');
  const sucesso = cadastrarEvento(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/evento');
    } else{
      res.redirect('/evento-cad');
    }
  });
});

// Página de atualização do Evento
router.get('/evento-update', (req, res) => {
  const recuperarEvento = require('../static/evento/recuperarEvento');
  var evento;
  evento = recuperarEvento(req.query.id).then((evento) => {
    res.render('./evento/eventoUpdate', {evento: evento});
  });
});

// Atualização dos Eventos
router.post('/evento-update', (req, res) => {
  const atualizarEvento = require('../static/evento/atualizar');
  const sucesso = atualizarEvento(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/evento');
    } else{
      res.redirect('/evento-update', {idEvento: body.idEvento});
    }
  });
});

// Página de visualização dos eventos
router.get('/evento', (req, res) => {
  const recuperarEventos = require('../static/evento/recuperar');
  var lista_evento = [];
  lista_evento = recuperarEventos().then((lista_evento) => {
    res.render('./evento/evento', {eventos: lista_evento});
  });
});

// Exclusão dos eventos
router.post('/evento-excluir', (req, res) => {
  const excluirEvento = require('../static/evento/deletar');
  const sucesso = excluirEvento(req.body).then((sucesso) => {
    if (sucesso){
      res.status(200);
      return res.send('Okay');
    } else{
      res.status(500);
    }
  });
});


// Loaging de cadastro esportes
router.get('/esporte-cad', (req, res) => {
  res.render('./esporte/esporteInsert');
});

// Cadastro dos esportes
router.post('/esporte-cad', (req, res) => {
  const cadastrarEsporte = require('../static/esporte/cadastrar');
  const sucesso = cadastrarEsporte(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/esporte');
    } else{
      res.redirect('/esporte-cad');
    }
  });
});

// Página de atualização do esporte
router.get('/esporte-update', (req, res) => {
  const recuperarEsporte = require('../static/esporte/recuperarEsporte');
  var esporte;
  esporte = recuperarEsporte(req.query.id).then((esporte) => {
    res.render('./esporte/esporteUpdate', {esporte: esporte});
  });
});

// Atualização dos esporte
router.post('/esporte-update', (req, res) => {
  const atualizarEsporte = require('../static/esporte/atualizar');
  const sucesso = atualizarEsporte(req.body).then((sucesso) => {
    if (sucesso){
      res.redirect('/esporte');
    } else{
      res.redirect('/esporte-update', {idEsporte: body.idEsporte});
    }
  });
});

// Página de visualização dos esporte
router.get('/esporte', (req, res) => {
  const recuperarEsportes = require('../static/esporte/recuperar');
  var lista_esporte = [];
  lista_esporte = recuperarEsportes().then((lista_esporte) => {
    res.render('./esporte/esporte', {esportes: lista_esporte});
  });
});

// Exclusão dos esporte
router.post('/esporte-excluir', (req, res) => {
  const excluirEsporte = require('../static/esporte/deletar');
  const sucesso = excluirEsporte(req.body).then((sucesso) => {
    if (sucesso){
      res.status(200);
      return res.send('Okay');
    } else{
      res.status(500);
    }
  });
});


module.exports = router;