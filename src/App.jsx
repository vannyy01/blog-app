import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Layout} from 'antd';
import SliderDemo from './SliderDemo';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import promise from 'redux-promise';
import {createStore, applyMiddleware} from "redux";
import reducer from './reducers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LastPosts from './component/LastPosts';
import Header from './component/Header';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


const {Footer} = Layout;

class App extends Component {
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
                                    <Switch>
                                        <Route exact path="/" component={Main}/>
                                        <Route path="/post" component={LastPosts}/>
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
