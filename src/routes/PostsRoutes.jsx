import React from "react"
import Article from '../component/Article';
import {Route, Switch} from 'react-router-dom';
import Posts from '../component/Posts';
import NewPost from '../component/NewPost';
import LikesPosts from '../component/LikesPosts';
import UpdateOwnPost from '../component/UpdateOwnPost';

export const AllowedPosts = () => {
    return (
        <Switch>
            <Route exact path='/post/view' component={Posts}/>
            <Route path='/post/view/:id' component={Article}/>
        </Switch>
    )
};

export const AuthPosts = () => {
    return (
        <Switch>
            <Route path='/post/user/create' component={NewPost}/>
            <Route path='/post/user/likes' component={LikesPosts}/>
            <Route path='/post/user/update/:id' component={UpdateOwnPost}/>
        </Switch>
    )
};
