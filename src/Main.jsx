import _ from 'lodash';
import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import Post from "./component/Post";
import {fetchPosts} from "./actions";
import {connect} from 'react-redux';

const {Content} = Layout;

class Main extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <Post content={post}/>
            )
        });
    }

    render() {
        return (
            <Content>
                <Row/>
                <h1>Останні дописи</h1>
                <hr/>
                    {this.renderPosts()}
            </Content>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.PostReducer
    }
};
export default connect(mapStateToProps, {fetchPosts})(Main);