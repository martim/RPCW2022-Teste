var express = require('express');
var router = express.Router();
var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao')

/* GET api listing. */
router.get('/cidades', function (req, res, next) {
  if (req.query['distrito'] != undefined) {
    Cidade.lookUpDistrict(req.query['distrito'])
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp({ erro: err }))
  }
  else {
    Cidade.list()
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(502).jsonp({ erro: err }))
  }

});

router.get('/cidades/nomes', function (req, res, next) {
  Cidade.listNames()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(502).jsonp({ erro: err }))
});


router.get('/cidades/:id', (req, res) => {
  Cidade.lookUp(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(503).jsonp({ erro: err }))
})

router.get('/distritos', (req, res) => {
  Cidade.list()
    .then(data => {
      var byDistrito = {}
      data.forEach(cidade => {
        if (byDistrito[cidade.distrito] == undefined) {
          byDistrito[cidade.distrito] = { nome: cidade.distrito, cidades: [{ id: cidade.id, nome: cidade.nome }] }
        }
        else {
          byDistrito[cidade.distrito].cidades.push({ id: cidade.id, nome: cidade.nome })
        }
      })
      res.status(200).jsonp(byDistrito)
    })
    .catch(err => res.status(504).jsonp({ erro: err }))
})

router.get('/ligacoes', function (req, res, next) {
  if (req.query['origem'] != undefined) {
    Ligacao.lookUpSource(req.query['origem'])
      .then(data => {
        var list = []
        data.forEach(ligacao => {
          /* Cidade.lookUp(ligacao.destino)
            .then(cidade => {
              list.push({ id: ligacao.id, id_destino: ligacao.destino, nome: cidade.nome })
            })
            .catch(err => res.status(503).jsonp({ erro: err })) */
          list.push({ id: ligacao.id, id_destino: ligacao.destino })
        })
        res.status(200).jsonp(list)
      })
      .catch(err => res.status(500).jsonp({ erro: err }))
  }
  else if (req.query['dist'] != undefined) {
    Ligacao.list()
      .then(data => {
        var listDist = []
        data.forEach(ligacao => {
          if (ligacao.distância >= req.query['dist']) {
            listDist.push({ id: ligacao.id, id_origem: ligacao.origem, id_destino: ligacao.destino })
          }
        })
        res.status(200).jsonp(listDist)
      })
      .catch(err => res.status(500).jsonp({ erro: err }))
  }
});


module.exports = router;
