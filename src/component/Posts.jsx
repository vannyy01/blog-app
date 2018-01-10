import _ from 'lodash';
import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import Post from "./Post";
import {fetchPosts} from "../actions";
import {connect} from 'react-redux';
import {postsTypes} from "../types";
import img from '../images/people-night-crowd.jpg';

const {Content} = Layout;

class Main extends Component {

    componentDidMount() {
        this.props.fetchPosts();

    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <Post key={post.post_id} content={post}/>
            )
        });
    }

    render() {
        return (
            <Content style={this.props.style}>
                <Row text="Останні дописи" img={img} blur={{min: -1, max: 5}}/>
                <div style={{textAlign: 'center', marginBottom: 5}}>
                </div>
                <div className={"postWrapper"}>
                    {this.renderPosts()}
                </div>
            </Content>
        )
    }
}



const mapStateToProps = ({post}) => {
    return {
        posts: post
    }
};


export default connect(mapStateToProps, {fetchPosts})(Main);