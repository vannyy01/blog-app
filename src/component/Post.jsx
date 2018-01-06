import React, {Component} from "react";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

class Post extends Component {

    render() {
        const post = this.props.content;
        return (
            <Card style={{width: '550px'}} className="raised">
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title={post.blog.blog_name}
                    subtitle={post.author.user_name}
                />
                <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                />
                <CardTitle
                    title={post.post_name}
                    subtitle={post.category_id}
                />
                <CardText>{post.post_text}</CardText>
                <CardActions>
                    <Button label="Like"/>
                    <Button label="Dislike"/>
                </CardActions>
            </Card>

        )
    }
}

export default Post;