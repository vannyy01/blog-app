import React, {Component} from "react";
import {Route} from 'react-router-dom';
import Login from "../component/Login";
import Main from "../Main";
import SignUp from '../component/Registration';
import BlogRoutes from "../routes/BlogRoutes";
import {AllowedPosts} from "./PostsRoutes";

class AllowedRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/post/view" component={AllowedPosts}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/blog" component={BlogRoutes}/>
            </div>
        )
    }
}

export default AllowedRoutes;
