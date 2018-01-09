import React from "react";
import {Layout} from "antd/lib/index";
import Article from './Article';
import {Route, Switch} from 'react-router-dom';
import FullLastPosts from './FullLastPosts'
const {Content} = Layout;

const LastPosts = (props) => {
    return (
        <Switch>
            <Route exact path='/post' component={FullLastPosts}/>
            <Route path='/post/:id' component={Article}/>
        </Switch>
    )
};
export default LastPosts;