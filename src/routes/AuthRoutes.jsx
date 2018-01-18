import React, {Component} from "react";
import LastPosts from "../component/LastPosts";
import {Route, Redirect} from 'react-router-dom';
import AuthService from "../client/Auth";

const Auth = new AuthService();

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) =>
        Auth.loggedIn() === true ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    }/>
);

class AuthRoutes extends Component {

    render() {
        return (
            <PrivateRoute path="/post" component={LastPosts}/>
        )
    }
}

export default AuthRoutes;
