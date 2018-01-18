import React,{Component} from "react";
import LastPosts from "../component/LastPosts";
import {Route, Switch} from 'react-router-dom';
import AuthService from "../client/Auth";
import Login from "../component/Login";
import Main from "../Main";

 class AllowedRoutes extends Component {
    render() {
       return(
           <div>
               <Route exact path="/" component={Main}/>
               <Route path="/login" component={Login}/>
           </div>
       )
    }
}

export default AllowedRoutes;
