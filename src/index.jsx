import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import promise from 'redux-promise';
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  
        <Provider store={createStoreWithMiddleware(reducer)}>
            <App/>
        </Provider>
    

    ,
    document.getElementById('root')
);
