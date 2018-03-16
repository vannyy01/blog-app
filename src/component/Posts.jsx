import _ from 'lodash';
import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import Post from "./Post";
import {fetchPosts} from "../actions";
import {connect} from 'react-redux';
import {postsTypes} from "../types";
import img from '../images/people-night-crowd.jpg';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';

const {Content} = Layout;

class Main extends Component {

    componentDidMount() {
        this.props.fetchPosts('post/?expand=author,blog,avatar&sort=-rait');

    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <Post key={post.post_id} content={post}/>
            )
        });
    }

    render() {
        if (!this.props.posts[0] || this.props.posts[0].post_id !== undefined) {
            return (
                <Content style={this.props.style}>
                    <Row text="Останні дописи" img={img} blur={{min: -1, max: 5}}/>
                    <div style={{textAlign: 'center', marginBottom: 5}}>
                    </div>
                    <div className="postWrapper">
                        {this.renderPosts()}
                    </div>
                </Content>
            )
        } else {
            return (
                <Content style={{marginTop: 150, backgroundColor: 'white'}}>
                    <PreloaderIcon
                        type={ICON_TYPE.TAIL_SPIN}
                        size={70}
                        style={{margin: 'auto', zIndex: 1100}}
                        strokeWidth={8}
                        strokeColor="CornflowerBlue"
                        duration={1000}
                    />
                </Content>
            )
        }
    }

}


const mapStateToProps = ({post}) => {
    return {
        posts: post
    }
};


export default connect(mapStateToProps, {fetchPosts})(Main);