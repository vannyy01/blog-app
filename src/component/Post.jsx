import React, {Component} from "react";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
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
        const MyLink = () => <Link to={`/post/${post.post_id}`}>{post.post_name}</Link>;
        return (
            <Card style={postStyles}>
                <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title={post.blog.name}
                    subtitle={post.author.name}
                />
                <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                />
                <CardTitle
                    title={<MyLink/>}
                    subtitle={post.category_id.toString()}
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

Post.propTypes = {
    content: postType.isRequired
};

export default Post;