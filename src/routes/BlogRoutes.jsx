import React from "react"
import {Route, Switch} from 'react-router-dom';
import BlogList from '../component/BlogList';
import NewBlog from '../component/NewBlog';
import Blog from '../component/Blog';

const BlogRoutes = () => {
    return (
        <Switch>
            <Route exact path='/blog' component={BlogList}/>
            <Route path='/blog/create' component={NewBlog}/>
            <Route path='/blog/:id' component={Blog}/>
        </Switch>
    )
};
export default BlogRoutes;