import React,{Component} from "react";
import {Route} from 'react-router-dom';
import Login from "../component/Login";
import Main from "../Main";
import SignUp from '../component/Registration';
 class AllowedRoutes extends Component {
    render() {
       return(
           <div>
               <Route exact path="/" component={Main}/>
               <Route path="/login" component={Login}/>
               <Route path="/signup" component={SignUp}/>
           </div>
       )
    }
}

export default AllowedRoutes;
