import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout} from "antd/lib/index";
import {fetchLikesPosts} from "../actions";
import Post from "./Post";
import TextField from 'material-ui/TextField';

const {Content} = Layout;


class LikesPosts extends Component {

    componentWillMount() {
        this.props.fetchLikesPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.posts !== nextProps.posts) {
            return true;
        }
    };

    onHandleSearch = (e) => {
        e.preventDefault();
        let text = e.target.value;
        text.trim();
        if (text.length >= 1)
            this.props.fetchLikesPosts(1, text);
        else if (text.length === 0)
            this.props.fetchLikesPosts();
    };

    render() {
        const postStyles = {
            width: '450px',
            margin: 'auto 0.2em auto 1.6em',
            marginBottom: '10px',
            maxHeight: '38.5em'
        };
        return (
            <Content style={{marginTop: 100}}>
                <div className="row"
                     style={{
                         margin: '0 5% 0 5%',
                         padding: '0.5em 0 0.2em 0',
                         width: '70em',
                         backgroundColor: 'white',
                         justifyContent: 'left'
                     }}>
                    <TextField
                        style={{margin: '0 2em 0.2em 1.5em'}}
                        hintText="Назва новини"
                        fullWidth={true}
                        onChange={this.onHandleSearch}
                    />
                    {
                        !_.isEmpty(this.props.posts) ?

                            _.map(this.props.posts, post =>
                                <Post key={post.post_id}
                                      content={post}
                                      postStyles={postStyles}
                                />
                            ) : null
                    }
                </div>
            </Content>
        );
    }

}

const mapStateToProps = ({list}) => {
    return {
        posts: list
    }
};

export default connect(mapStateToProps, {fetchLikesPosts})(LikesPosts);