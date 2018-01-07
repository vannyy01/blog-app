import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Layout} from 'antd';
import SliderDemo from './SliderDemo';
import './App.css';
import 'bootstrap';
import Main from './Main';
import promise from 'redux-promise';
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Article from './component/Article';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const {Header, Footer} = Layout;

const Home = () => (
    <div>
        <h1>Welcome to the Tornadoes Website!</h1>
    </div>
);

class App extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducer)}>
                <BrowserRouter>
                    <div className="App">
                        <Layout>
                            <SliderDemo/>
                            <Layout>
                                <Header style={{background: '#fff', padding: 0}}>Header</Header>
                                <main>
                                    <Switch>
                                        <Route exact path="/" component={Main}/>
                                        <Route path="/home" component={Home}/>
                                        <Route path="/post" component={Article}/>
                                    </Switch>
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
