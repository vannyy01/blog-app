import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Layout} from 'antd';
import SliderDemo from './SliderDemo';
import './App.css';
import Main from './Main';
import promise from 'redux-promise';
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const {Header, Footer} = Layout;

class App extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducer)}>
                <div className="App">
                    <Layout style={{minHeight: '100vh'}}>
                        <SliderDemo/>
                        <Layout>
                            <Header style={{backgroundColor: 'white'}}>Header</Header>
                            <Main/>
                            <Footer>Footer</Footer>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        );
    }
}

export default App;
