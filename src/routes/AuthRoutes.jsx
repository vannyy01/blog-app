import React, {Component} from "react";
import LastPosts from "./PostsRoutes";
import {Route, Redirect} from 'react-router-dom';
import AuthService from "../client/Auth";
import UserInfo from '../component/UserInfo';
import NewBlog from '../component/NewBlog';
import {AuthPosts} from "./PostsRoutes";

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
            <div>
                <PrivateRoute path="/post/user" component={AuthPosts}/>
                <PrivateRoute path="/user/info" component={UserInfo}/>
                <PrivateRoute path="/blog/create" component={NewBlog}/>
            </div>
        )
    }
}

export default AuthRoutes;
