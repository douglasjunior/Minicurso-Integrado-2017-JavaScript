import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';

import TarefaItem from './TarefaItem';

export default class TarefaList extends Component {

    renderItem = (record) => {
        const { item, index } = record;
        const { onExcluirPress, onConcluidaChange } = this.props;
        return (
            <TarefaItem {...item} onExcluirPress={onExcluirPress} onConcluidaChange={onConcluidaChange} />
        );
    }

    render() {
        const { tarefas } = this.props;
        return (
            <FlatList
                style={styles.list}
                data={tarefas}
                renderItem={this.renderItem}
                keyExtractor={(tarefa) => tarefa.id}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})