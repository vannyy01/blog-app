import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import {fetchPosts, fetchComments} from "../actions";
import {connect} from 'react-redux';
import {FETCH_POST} from "../actions";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import CommentsTree from './Comments';
const {Content} = Layout;

class Article extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        const fetchParameters = '/post/?s[post_id]=' + id + '&expand=text,author,blog';
        this.props.fetchPosts(fetchParameters, FETCH_POST);
        this.props.fetchComments(id);
    }

    render() {
        const {post} = this.props;
        if (!this.props.post) {
            return (
                <PreloaderIcon
                    type={ICON_TYPE.TAIL_SPIN}
                    size={70}
                    style={{margin: 'auto', zIndex: 1100}}
                    strokeWidth={8}
                    strokeColor="CornflowerBlue "
                    duration={1000}
                />)
        } else {
            return (
                <Content style={{backgroundColor: 'white'}}>
                    <Row text={post.post_name}
                         img={'https://www.virginexperiencedays.co.uk/content/img/product/large/manchester-city-football-club-03163533.jpg'}
                         blur={{min: -1, max: 5}}/>
                    <main role="main" className="container"
                          style={{textAlign: 'left', margin: '5px 10px 5px 10px', backgroundColor: 'white'}}>

                        <div className="row">
                            <div className="col-sm-8 blog-main">
                                <div className="blog-post">
                                    <h2 className="blog-post-title">{post.post_name}</h2>
                                    <p className="blog-post-meta">{post.created_at} by <a
                                        href="#">{post.blog.name}</a></p>
                                    <hr/>
                                </div>
                                <div>
                                    <p>
                                        {post.text}
                                    </p>
                                </div>
                                <div>
                                    <p className="blog-post-meta">Автор: <a
                                        href="#">{post.author.name}</a></p>
                                </div>
                                <CommentsTree post_id={this.props.match.params.id} root={this.props.comments}/>
                            </div>
                        </div>
                    </main>
                </Content>
            )
        }
    }
}

const mapStateToProps = ({post, comments}) => {

    return {
        post: post.data,
        comments: comments
    }
};


export default connect(mapStateToProps, {fetchPosts, fetchComments})(Article);