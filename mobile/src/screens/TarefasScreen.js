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

export default class TarefasScreen extends Component {

    state = {
        tarefas: [],
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

    render() {
        const { tarefas, } = this.state;

        return (
            <View style={styles.container}>

                <TarefaList tarefas={tarefas} />

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
