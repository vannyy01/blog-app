import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import {fetchPost, fetchComments} from "../actions";
import {connect} from 'react-redux';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import CommentsTree from './Comments';
import {brto} from "../actions/helpers";
const {Content} = Layout;

class Article extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const fetchParameters = '/post/?s[post_id]=' + id + '&expand=text,author,blog,tags';
        this.props.fetchPost(fetchParameters);
        this.props.fetchComments(id);
    }

    render() {
        if (!_.isEmpty(this.props.post)) {
            return (
                <Content style={{backgroundColor: 'white'}}>
                    <Row text={this.props.post.post_name}
                         img={'https://www.virginexperiencedays.co.uk/content/img/product/large/manchester-city-football-club-03163533.jpg'}
                         blur={{min: -1, max: 5}}/>
                    <main role="main" className="container"
                          style={{textAlign: 'left', margin: '5px 10px 5px 10px', backgroundColor: 'white'}}>

                        <div className="row">
                            <div className="col-sm-8 blog-main">
                                <div className="blog-post">
                                    <h2 className="blog-post-title">{this.props.post.post_name}</h2>
                                    <p className="blog-post-meta">{this.props.post.created_at} by <a
                                        href="#">{this.props.post.blog.name}</a></p>
                                    <hr/>
                                </div>
                                <div>
                                        {_.map(brto(this.props.post.text), (par, index) => {
                                            return <p key={index}>{par}<br/></p>;
                                        })}
                                </div>
                                <div>
                                    <p className="blog-post-meta">Автор: <a
                                        href="#">{this.props.post.author.name}</a></p>
                                </div>
                                <CommentsTree post_id={this.props.match.params.id} root={this.props.comments}/>
                            </div>
                        </div>
                    </main>
                </Content>
            )
        }
       return ( <PreloaderIcon
            type={ICON_TYPE.TAIL_SPIN}
            size={70}
            style={{margin: 'auto', zIndex: 1100}}
            strokeWidth={8}
            strokeColor="CornflowerBlue "
            duration={1000}
        />);
        }
}

const mapStateToProps = ({article, comments}) => {
    return {
        post: article, comments
    }
};


export default connect(mapStateToProps, {fetchPost, fetchComments})(Article);