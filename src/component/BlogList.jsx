import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout} from "antd/lib/index";
import {fetchBlogList} from "../actions";
import BlogCard from "./BlogCard";
import TextField from 'material-ui/TextField';

const {Content} = Layout;


class BlogList extends Component {

    componentWillMount() {
        this.props.fetchBlogList();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.blog !== nextProps.blog) {
            return true;
        }
    };

    onHandleSearch = (e) => {
        e.preventDefault();
        let text = e.target.value;
        text.trim();
        if (text.length >= 1)
            this.props.fetchBlogList(text);
        else if (text.length === 0)
            this.props.fetchBlogList();
    };

    render() {
        return (
            <Content style={{marginTop: 100}}>
                <div className="row"
                     style={{
                         margin: '0 5% 0 5%',
                         padding: '0.5em 0 0.2em 0',
                         width: '75%',
                         backgroundColor: 'white',
                         justifyContent: 'left'
                     }}>
                    <TextField
                        style={{ margin: '0px 1.5em 0.5em 1.5em'}}
                        hintText="Назва блогу"
                        fullWidth={true}
                        onChange={this.onHandleSearch}
                    />
                    {
                        !_.isEmpty(this.props.blog) ?

                            _.map(this.props.blog, blog =>
                                <BlogCard key={blog.id}
                                          props={blog}
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
        blog: list
    }
};

export default connect(mapStateToProps, {fetchBlogList})(BlogList);