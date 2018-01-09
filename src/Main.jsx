import _ from 'lodash';
import React, {Component} from "react";
import Row from './component/Row';
import {Layout} from "antd/lib/index";
import Post from "./component/Post";
import {fetchPosts} from "./actions";
import {connect} from 'react-redux';
import {postsTypes} from "./types";
import img from './images/people-night-crowd.jpg';

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
                <Row text="Stud-blog.loc" img={img} blur={{min: -1, max: 5}}/>
                <div style={{textAlign: 'center'}}>
                    <h1>Останні дописи</h1>
                    <hr/>
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