import React, {Component} from 'react';
import {connect, Provider} from 'react-redux';
import {Layout} from 'antd';
import SliderDemo from './SliderDemo';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import Header from './component/Header';
import setAuth from './client/setAuthorizationToken';
import AuthService from './client/Auth';
import {fetchUser} from "./actions";
import AuthRoutes from './routes/AuthRoutes';
import AllowedRotes from './routes/AllowedRoutes';

const Auth = new AuthService();
const {Footer} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        if (Auth.loggedIn()) {
            setAuth(Auth.getToken());
            props.fetchUser(Auth.getToken())
        }
    }

    render() {
        return (
                <BrowserRouter>
                        <Layout>
                            <SliderDemo user={this.props.user}/>
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
                </BrowserRouter>
        );
    }
}

const mapStateToProps = ({login}) => {
    return {
        user: login
    }
};
export default connect(mapStateToProps, {fetchUser})(App);
