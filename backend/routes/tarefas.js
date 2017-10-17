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

router.delete('/:tarefa_id', function (request, response, next) {
    let tarefaId = request.params.tarefa_id;

    Tarefa.destroy({
        where: {
            id: tarefaId
        }
    }).then((linhasAfetadas) => {
        if (linhasAfetadas > 0) {
            response.status(204).send();
        } else {
            response.status(404).send();
        }
    }).catch(ex => {
        next(ex);
    });
});

module.exports = router;
