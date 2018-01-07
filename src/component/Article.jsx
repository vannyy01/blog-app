import _ from 'lodash';
import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import {fetchPosts} from "../actions";
import {connect} from 'react-redux';
import {postsTypes} from "../types";
import {FETCH_POST} from "../actions";

const {Content} = Layout;


class Article extends Component {
    componentDidMount() {
        const {match: {params}} = this.props;
        const fetchParameters = '/post/?s[post_id]=' + params.id + 'expand=author,blog';

        this.props.fetchPosts(fetchParameters, FETCH_POST);
    }

    render() {
        return (
            <Content>
                <Row/>
                <header>
                    <div className="blog-header">
                        <div className="container">
                            <h1 className="blog-title">The Bootstrap Blog</h1>
                            <p className="lead blog-description">An example blog template built with Bootstrap.</p>
                        </div>
                    </div>
                </header>
                <main role="main" className="container">
                    <div className="row">
                        <div className="col-sm-8 blog-main">
                            <div className="blog-post">
                                <h2 className="blog-post-title">Sample blog post</h2>
                                <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
                                <blockquote/>
                            </div>
                        </div>
                    </div>
                </main>
            </Content>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        post: state.PostReducer
    }
};


export default connect(mapStateToProps, {fetchPosts})(Article);