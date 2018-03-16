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
import {Redirect} from 'react-router-dom';

const Auth = new AuthService();
const {Footer} = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false
        }
    }

    componentWillMount() {
        if (Auth.loggedIn()) {
            setAuth(Auth.getToken());
            this.setState({isAuth: true});
            this.props.fetchUser(Auth.getToken())
        } else {
            return <Redirect to={{
                pathname: '/',
            }}/>
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Layout style={{height: '100%'}}>
                    <SliderDemo user={this.props.user}/>
                    <Layout>
                        <Header auth={this.state.isAuth}/>
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

const mapStateToProps = ({login: {user}}) => {
    return {
        user: user
    }
};
export default connect(mapStateToProps, {fetchUser})(App);
