import _ from 'lodash';
import axios from 'axios';
import React, {Component} from "react";
import Row from './component/Row';
import {Layout} from "antd/lib/index";
import Post from "./component/Post";
import {fetchPosts} from "./actions";
import {connect} from 'react-redux';
import {postsTypes} from "./types";
import img from './images/people-night-crowd.jpg';
import AuthService from './client/Auth';
import {withRouter, Link} from 'react-router-dom';

const Auth = new AuthService();
const {Content} = Layout;

class Main extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    handleCheckInfo() {
        axios.get(`${Auth.domain}/post/test`)
            .then(
                res => console.log(res)
            )
    }

    handleLogout() {
        Auth.logout();
        this.props.history.replace('/login');
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <Post key={post.post_id} content={post}/>
            )
        });
    }

    render() {

        if (!this.props.posts) {
            return <div>...Loading</div>
        } else {
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
}


const mapStateToProps = ({post}) => {
    return {
        posts: post
    }
};


export default connect(mapStateToProps, {fetchPosts})(Main);

const AuthButton = withRouter(({ history }) => (
    Auth.loggedIn()  ? (
        <p>
            Welcome! <button onClick={() => {
            Auth.logout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in. <Link to="/login">Log in</Link></p>
    )
));