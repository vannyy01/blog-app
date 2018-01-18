import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Layout} from 'antd';
import SliderDemo from './SliderDemo';
import './App.css';
import Main from './Main';
import promise from 'redux-promise';
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LastPosts from './component/LastPosts';
import Header from './component/Header';
import Login from './component/Login';
import setAuth from './client/setAuthorizationToken';
import AuthService from './client/Auth';

const Auth = new AuthService();
import AuthRoutes from './routes/AuthRoutes';
import AllowedRotes from './routes/AllowedRoutes';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const {Footer} = Layout;

class App extends Component {

    constructor() {
        super();
        if (Auth.loggedIn()) {
            setAuth(Auth.getToken());
        }
    }

    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducer)}>
                <BrowserRouter>
                    <div className="App">
                        <Layout>
                            <SliderDemo/>
                            <Layout>
                                <Header/>
                                <main>
                                    <Switch/>
                                    <AllowedRotes/>
                                    <AuthRoutes/>
                                    <Switch/>
                                </main>
                                <Footer>Footer</Footer>
                            </Layout>
                        </Layout>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
