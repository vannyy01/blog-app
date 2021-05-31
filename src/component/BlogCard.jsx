import React from "react";
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';
import {blogType} from '../types/index';
import {Link} from "react-router-dom";

const BlogCard = ({props}) => {
    const Image = require("../../user-images/" + props.avatar);
    return (
        <Card style={{width: 300, margin: '0 0 0.5em 1.5em'}}>
            <CardTitle
                avatar={Image}
                title={<Link to={"blog/"+props.id}>{props.name}</Link>}
                subtitle={props.author.name}
            />
            <CardText>{props.short_description}</CardText>
            <CardActions>
                <Button label="Action 1"/>
                <Button label="Action 2"/>
            </CardActions>
        </Card>
    );
};

BlogCard.propTypes = {
    props: blogType.isRequired
};

export default BlogCard;