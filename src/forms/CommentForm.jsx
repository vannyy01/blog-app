import React, {Component} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {createComment, fetchComments} from "../actions";
import {renderTextArea} from "./Fields";
import {Form, Button} from 'semantic-ui-react';

class CommentForm extends Component {
    onSubmit = (values) => {
        const id = this.props.post_id;
        const {parent_id} = this.props;
        values.post_id = id;
        values.parent_id = parent_id;
        const {reset} = this.props;
        return this.props.createComment(values, () => {
                reset();
                this.props.fetchComments(id);
            }
        );
    };

    render() {
        const {
            handleSubmit, pristine, reset, submitting,
            ConfirmButton, RefuseButton
        } = this.props;
        return (
            <Form reply onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="comment_text"
                    placeholder="Написати коментар"
                    autosize={{minRows: 2, maxRows: 6}}
                    component={renderTextArea}
                />
                <Button disabled={submitting} content={ConfirmButton} labelPosition='left' icon='edit' primary/>
                <Button content={RefuseButton} color='red' labelPosition='left' icon='remove'
                        disabled={pristine || submitting} onClick={reset} primary/>
            </Form>

        );
    }
};

const validate = (values) => {
    const errors = {};
    if (values.comment_text) {
        if (values.comment_text.trim().length < 1) {
            errors.comment_text = "Некоректний коментар";
        }
    }
    return errors;
};

export const CreateCommentForm = reduxForm({
    form: "CreateComment",
    validate
})(connect(null, {createComment, fetchComments})(CommentForm));

export const CreateAnswerForm = reduxForm({
    form: "AnswerComment",
    validate
})(connect(null, {createComment, fetchComments})(CommentForm));

CreateCommentForm.defaultProps = {
    parent_id: 0,
    ConfirmButton: 'Коментувати',
    RefuseButton: 'Очистити'
};


CreateAnswerForm.defaultProps = {
    parent_id: 0,
    ConfirmButton: 'Коментувати',
    RefuseButton: 'Очистити',
    form: 'AnswerComment'
};
