import React, {Component} from "react";
import {Comment, Header, Icon} from 'semantic-ui-react';
import {likeComment, dislikeComment} from "../actions";
import {setStorage, getStorage} from "../actions/validation";
import {CreateCommentForm, CreateAnswerForm} from '../forms/CommentForm';
import '../style.global.scss';
import '../index.global.scss';

class CommentsTree extends Component {
    constructor() {
        super();
        this.state = {
            answer: false,
            id: 0,
        };
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.root) {
            if (this.props.root !== nextProps.root) {
                this.setState({answer: false, id: 0});
                return true;
            }
        }
    }

    answerComment = (id = 0) => {
        this.setState({
            answer: !this.state.answer,
            id
        });
    };

    forceUpdateHandler() {
        console.log("force update");
        this.forceUpdate();
    };

    renderAnswer = (post_id) => {
        const {id} = this.state;
        return (
            <CreateAnswerForm parent_id={id} post_id={post_id}
                              ConfirmButton="Відповісти"/>
        )

    };
    increment = (e, id) => {
        e.preventDefault();
        let storage = setStorage("selectedComments", id);
        if (storage === true) {
            likeComment({id: id});
            document.getElementById("rait-" + id).innerText++;
        }
    };
    decrement = (e, id) => {
        e.preventDefault();
        let storage = setStorage("selectedComments", id);
        if (storage === true) {
            dislikeComment({id: id});
            document.getElementById("rait-" + id).innerText--;
        }
    };
    renderBookmarks = (comment) => {
        if (comment.child) {
            let {rait} = comment;
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
                                <span id={`rait-${comment.comment_id}`}>{rait}</span>
                            </div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{comment.comment_text}</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.answerComment(comment.comment_id)
                                }}>
                                Відповісти</Comment.Action>
                            <Comment.Action>
                                <Icon name="like outline"
                                      onClick={(e) =>
                                          this.increment(e, comment.comment_id)
                                      }
                                />
                            </Comment.Action>
                            <Comment.Action>
                                <Icon name="dislike outline" onClick={(e) =>
                                    this.decrement(e, comment.comment_id)
                                }
                                />
                            </Comment.Action>
                            {
                                this.state.answer && this.state.id === comment.comment_id ?
                                    <Comment.Action
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.answerComment()
                                        }}>Закрити
                                    </Comment.Action>
                                    : null
                            }
                        </Comment.Actions>
                        {
                            this.state.answer && this.state.id === comment.comment_id ?
                                this.renderAnswer(this.props.post_id)
                                : null
                        }
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
                <CreateCommentForm post_id={this.props.post_id}/>
                {_.map(this.props.root, comment => {
                    return this.renderBookmarks(comment)
                })
                }
            </Comment.Group>
        );
    }
}

export default CommentsTree;