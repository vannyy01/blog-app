import {Layout, Menu, Icon, Tooltip} from 'antd';
import React, {Component} from 'react';
import AuthService from "./client/Auth";
import {Redirect, Link} from "react-router-dom";
import {fetchBlogs} from "./actions";
import {connect} from 'react-redux';
import {replace} from './client/withAuth';

const {Sider} = Layout;
const Auth = new AuthService();
const SubMenu = Menu.SubMenu;
const style1 = {
    width: '200px',
    position: 'fixed',
    overflow: 'auto'
};
const style2 = {
    width: '80px',
    position: 'fixed',
    overflow: 'auto'
};

class Users extends Component {
    render() {
        if (Auth.loggedIn() && !_.isEmpty(this.props.user)) {
            return (
                <SubMenu
                    key="user_sub"
                    title={<span><Icon type="user"/><span>{this.props.user["name"]}</span></span>}
                    {...this.props}
                >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="logout">
                        <div onClick={() => {
                            Auth.logout();
                            replace()
                        }}>
                            <Icon type="poweroff"/>
                            Вийти
                        </div>
                    </Menu.Item>
                </SubMenu>
            )
        } else {
            return (
                <SubMenu
                    key="user_sub"
                    title={<span><Icon type="usergroup-add"/><span>Авторизація</span></span>}
                    {...this.props}
                >
                    <Menu.Item key="login">
                        <Link to="/login">
                            <Icon type="user"/>
                            <span>Війти</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to="/signup">
                            <Icon type="user-add"/>
                            <span>Реєстрація</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>

            )
        }
    }
}

class BlogField extends Component {

    componentWillMount() {
        this.props.fetchBlogs();
    }

    render() {
        if (Auth.loggedIn() && !_.isEmpty(this.props.blogs)) {
            return (
                <SubMenu
                    key="user_sub"
                    title={<span><Icon type="book"/><span>Блоги</span></span>}
                    {...this.props}
                >
                    <Menu.Item key="login">
                        <Link to="/blog/create">
                            <Icon type="user"/>
                            <span>Створити блог</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="user_sub"
                        title={<span><Icon type="book"/><span>Ваші блоги</span></span>}
                        {...this.props}
                    >

                        {_.map(this.props.blogs, blog =>
                            <Menu.Item key={"blog" + blog.id}>
                                <Tooltip placement="right" title={blog.name}>

                                    <Icon type="check-circle-o"/>
                                    <Link to={"/blog/" + blog.id}><span>{blog.name}</span>
                                    </Link>
                                </Tooltip>
                            </Menu.Item>
                        )}
                    </SubMenu>
                </SubMenu>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = ({blog: {blogs}}) => {
    return {
        blogs
    }
};
const Blogs = connect(mapStateToProps, {fetchBlogs})(BlogField);

export class SiderDemo
    extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            style: style2,
        };
        this.onCollapse = this.onCollapse.bind(this)
    }

    onCollapse(collapsed) {
        this.setState({collapsed, style: this.state.style === style1 ? style2 : style1});
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}

            >
                <div className="logo"/>
                <Menu style={this.state.style}
                      theme="dark" mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop"/>
                        <span>Option 2</span>
                    </Menu.Item>
                    <Users user={this.props.user}/>
                    <Blogs/>
                    <Menu.Item key="9">
                        <Icon type="file"/>
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}


export default SiderDemo;