import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    FlatList
} from 'react-native';

import axios from 'axios';
import _ from 'lodash';

import TarefaList from '../components/TarefaList';
import TarefaForm from '../components/TarefaForm';

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
        showForm: false,
    };

    componentDidMount() {
        this.requestTarefas();
    }

    requestTarefas = () => {
        return axios.get('/tarefas')
            .then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({ tarefas: response.data, });
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    closeForm = () => {
        this.setState({ showForm: false, })
    }

    openForm = () => {
        this.setState({ showForm: true, })
    }

    saveTarefa = (tarefa) => {
        axios.post('/tarefas/', tarefa)
            .then((response) => {
                if (response.status === 201) {
                    const { tarefas } = this.state;
                    tarefas.unshift(response.data);
                    this.setState({ showForm: false, tarefas });
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    onExcluirPress = (tarefaId) => {
        Alert.alert('Excluir', `Deseja excluir a tarefa ${tarefaId}?`, [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: () => {
                    axios.delete('/tarefas/' + tarefaId)
                        .then((response) => {
                            if (response.status === 204) {
                                const { tarefas } = this.state;
                                _.remove(tarefas, { id: tarefaId });
                                this.setState({ tarefas });
                            }
                        }).catch((ex) => {
                            console.warn(ex);
                        })
                }
            },
        ], { cancelable: true })
    }

    onConcluidaChange = (tarefaId, concluida) => {
        let method;
        if (concluida) {
            method = axios.put;
        } else {
            method = axios.delete;
        }
        method('/tarefas/' + tarefaId + "/concluida")
            .then((response) => {
                if (response.status === 204) {
                    const { tarefas } = this.state;
                    const novasTarefas = tarefas.map((tarefa) => {
                        if (tarefa.id === tarefaId)
                            tarefa.concluida = concluida
                        return tarefa;
                    })
                    this.setState({ tarefas: novasTarefas });
                }
            }).catch((ex) => {
                console.warn(ex);
            })
    }

    render() {
        const { tarefas, showForm } = this.state;

        return (
            <View style={styles.container}>

                <TarefaList tarefas={tarefas}
                    onExcluirPress={this.onExcluirPress}
                    onConcluidaChange={this.onConcluidaChange} />

                <Button title='Nova Tarefa' onPress={this.openForm} />

                <TarefaForm visible={showForm} onRequestClose={this.closeForm}
                    onSave={this.saveTarefa} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    list: {
        flex: 1
    }
});
