import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.global.scss';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import promise from 'redux-promise';
import reducer from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={createStoreWithMiddleware(reducer)}>
            <App/>
        </Provider>
    </MuiThemeProvider>

    ,
    document.getElementById('root')
);
