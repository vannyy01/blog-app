import _ from 'lodash';
import React, {Component} from "react";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import {Icon} from 'antd';
import {postType} from "../types";
import {Link} from 'react-router-dom';
import {dislikePost, likePost} from "../actions";
import {checkStorage, getStorage, setStorage} from "../actions/validation";

class Post extends Component {
    constructor() {
        super();
        this.checkStorage = checkStorage.bind(this);
    }

    increment = (e, id) => {
        e.preventDefault();
        let storage = setStorage("selectedPosts", id) && setStorage("FavouritesPosts", id);
        if (storage === true) {
            likePost({id: id});
            document.getElementById("post_raiting-" + id).innerText++;
        }
    };
    decrement = (e, id) => {
        e.preventDefault();
        let storage = setStorage("selectedPosts", id) && setStorage("DisPosts", id);
        if (storage === true) {
            dislikePost({id: id});
            document.getElementById("post_raiting-" + id).innerText--;
        }
    };

    render() {
        const post = this.props.content;
        if (post.post_id) {
            const Image = require("../../user-images/" + post.avatar);
            const MyLink = () => <Link style={{color: 'blue'}} to={`/post/view/${post.post_id}`}>{post.post_name}</Link>;
            const Category = (props) => {
                const {categories} = props;
                return _.map(categories, category => {
                        return category.text + ' ';
                    }
                )
            };

            return (
                <Card style={this.props.postStyles}>
                    <CardTitle
                        avatar={Image}
                        title={<Link style={{color: 'black'}} to={`/blog/${post.blog.id}`}>{post.blog.name}</Link>}
                        subtitle={<Link style={{color: 'grey'}}
                                        to={`/user/${post.author.id}`}>{post.author.name}</Link>}
                    />
                    <CardMedia
                        aspectRatio="wide"
                        image="https://placeimg.com/800/450/nature"
                    />
                    <CardTitle
                        title={<MyLink/>}
                        subtitle={<Category categories={post.category}/>}
                    />
                    <CardText>{post.short_description}</CardText>
                    <CardActions>
                        <Button disabled={!this.checkStorage("selectedPosts", post.post_id)}
                                onClick={(e) => this.increment(e, post.post_id)}>
                            <Icon style={{
                                color: getStorage("FavouritesPosts").includes(post.post_id) ? "green" : "",
                                fontSize: 20
                            }} type="like-o"/>
                        </Button>
                        <Button disabled={!this.checkStorage("selectedPosts", post.post_id)}
                                onClick={(e) => this.decrement(e, post.post_id)}>
                            <Icon style={{
                                color: getStorage("DisPosts").includes(post.post_id) ? "red" : "",
                                fontSize: 20
                            }} type="dislike-o"/>
                        </Button>
                        <span id={`post_raiting-${post.post_id}`}>{post.rait}</span>
                    </CardActions>
                </Card>

            )
        } else {
            return <div>...Loading</div>
        }
    }
}

Post.defaultProps = {
    postStyles: {
        width: '550px',
        margin: 'auto 0.2em auto 1.8em',
        marginBottom: '10px',
        maxHeight: '38.5em'
    }
};

Post.propTypes = {
    content: postType.isRequired
};

export default Post;