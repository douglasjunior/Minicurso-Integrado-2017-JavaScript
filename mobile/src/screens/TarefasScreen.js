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

    render() {
        const { tarefas, showForm } = this.state;

        return (
            <View style={styles.container}>

                <TarefaList tarefas={tarefas} />

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
