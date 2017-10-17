import React, { Component } from 'react';

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.100.5:3000/';

import TarefasScreen from './screens/TarefasScreen';

export default class App extends Component {
    render() {
        return (
            <TarefasScreen />
        );
    }
}

