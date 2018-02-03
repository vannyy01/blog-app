import _ from 'lodash';
import React, {Component} from "react";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import {Icon} from 'antd';
import {postType} from "../types";
import {Link} from 'react-router-dom';


const postStyles = {
    width: '550px',
    margin: 'auto',
    marginBottom: '10px'
};

class Post extends Component {

    render() {
        const post = this.props.content;
        if(post.post_id) {
            const MyLink = () => <Link style={{color: 'blue'}} to={`/post/${post.post_id}`}>{post.post_name}</Link>;
            const Category = (props) => {
                const {categories} = props;
                return _.map(categories, category => {
                        return category.text + ' ';
                    }
                )

            };
            return (
                <Card style={postStyles}>
                    <CardTitle
                        avatar="https://placeimg.com/80/80/animals"
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
                        <Button>
                            <Icon style={{fontSize: 20}} type="like-o"/>
                        </Button>
                        <Button>
                            <Icon style={{fontSize: 20}} type="dislike-o"/>
                        </Button>
                    </CardActions>
                </Card>

            )
        } else {
            return <div>...Loading</div>
        }
    }
}

Post.propTypes = {
    content: postType.isRequired
};

export default Post;