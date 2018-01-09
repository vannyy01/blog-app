import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import {fetchPosts} from "../actions";
import {connect} from 'react-redux';
import {FETCH_POST} from "../actions";

const {Content} = Layout;

class Article extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        const fetchParameters = '/post/?s[post_id]=' + id + '&expand=author,blog';
        this.props.fetchPosts(fetchParameters, FETCH_POST);
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>...Loading</div>
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
                                        {post.post_text}
                                    </p>
                                </div>
                                <div>
                                    <p className="blog-post-meta">Автор: <a
                                        href="#">{post.author.name}</a></p>
                                </div>
                            </div>
                        </div>
                    </main>
                </Content>
            )
        }
    }
}

const mapStateToProps = ({post}) => {
    return {
        post: post.data,
    }
};


export default connect(mapStateToProps, {fetchPosts})(Article);