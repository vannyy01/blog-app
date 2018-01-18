import React from "react"
import Article from './Article';
import {Route, Switch} from 'react-router-dom';
import Posts from './Posts';
import NewPost from './NewPost';

const LastPosts = (props) => {
    return (
        <Switch>
            <Route exact path='/post' component={Posts}/>
            <Route path='/post/create' component={NewPost}/>
            <Route path='/post/:id' component={Article}/>
        </Switch>
    )
};
export default LastPosts;