var express = require('express');
var router = express.Router();

const {
    Tarefa
} = require('../models');

router.get('/', function (request, response, next) {

    Tarefa.findAll()
        .then((tarefas) => {
            response.status(200).json(tarefas);
        }).catch((ex) => {
            next(ex);
        });

});

module.exports = router;
