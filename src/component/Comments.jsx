import React, {Component} from "react";
import {Comment, Header, Icon, Form, Button} from 'semantic-ui-react';
import '../style.global.scss';
import '../index.global.scss';
import {Field, reduxForm} from "redux-form";
import {createComment} from "../actions";
import {connect} from "react-redux";
import {renderTextArea} from '../forms/Fields';

class CommentForm extends Component {
    onSubmit = (values) => {
        console.log(values)
    };

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <Form reply onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="comment"
                    placeholder="Написати коментар"
                    autosize={{minRows: 2, maxRows: 6}}
                    component={renderTextArea}
                />
                <Button disabled={submitting} content='Коментувати' labelPosition='left' icon='edit' primary/>
                <Button content='Очистити' color='red' labelPosition='left' icon='edit'
                        disabled={pristine || submitting} onClick={reset} primary/>

            </Form>

        );
    }
};

const validate = (values) => {
    const errors = {};
    if(values.comment) {
        if (values.comment.trim().length < 1) {
            errors.comment = "Некоректний коментар";
        }
    }
    return errors;
};

const CreateCommentform = reduxForm({
    form: "CreateComment",
    validate
})(connect(null, {createComment})(CommentForm));

class CommentsTree extends Component {
    renderBookmarks = (comment) => {
        if (comment.child) {
            return (
                <Comment key={comment.comment_id}>
                    <Comment.Avatar
                        src='https://openclipart.org/image/300px/svg_to_png/215819/Linux-Avatar.png&disposition=attachment'/>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.user.name}
                        </Comment.Author>
                        <Comment.Metadata>
                            <span>{comment.created_at}</span>
                            <div>
                                <Icon name='star'/>
                                5 Faves
                            </div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{comment.comment_text}</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <a>Відповісти</a>
                        </Comment.Actions>
                        <Comment.Group className="ui-comments-container">

                            {
                                _.map(comment.child,
                                    child => {
                                        if (comment.comment_id = child.parent_id)
                                            return this.renderBookmarks(child)
                                    }
                                )
                            }
                        </Comment.Group>
                    </Comment.Content>
                </Comment>
            );
        } else {
            return <Comment key={comment.comment_id}> {comment.comment_text} </Comment>;
        }
    };

    render() {
        return (
            <Comment.Group className="ui-comments-container">
                <Header as='h3' dividing>Comments</Header>
                <CreateCommentform/>
                {_.map(this.props.root, comment => {
                    return this.renderBookmarks(comment)
                })
                }
            </Comment.Group>
        );
    }
}

export default CommentsTree;