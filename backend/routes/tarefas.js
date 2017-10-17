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

router.post('/', function (request, response, next) {
    let tarefa = {
        id: null,
        titulo: request.body.titulo,
        descricao: request.body.descricao,
        data_criacao: new Date(),
        concluida: false,
    }

    Tarefa.create(tarefa)
        .then((tarefa) => {
            response.status(201).json(tarefa);
        }).catch(ex => {
            next(ex);
        });
});

module.exports = router;
