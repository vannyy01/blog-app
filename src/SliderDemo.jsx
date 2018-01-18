import {Layout, Menu, Icon} from 'antd';
import React, {Component} from 'react';
import AuthService from "./client/Auth";
import {withRoute, Redirect, Link} from "react-router-dom";

const Auth = new AuthService();

const {Sider} = Layout;


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
        const replace = (path = '/') => {
            return <Redirect to={{
                pathname: path
            }}/>
        };
        if (Auth.loggedIn()) {
            return (
                <SubMenu
                    key="user_sub"
                    title={<span><Icon type="user"/><span>User</span></span>}
                    {...this.props}
                >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="logout">
                        <div onClick={() => Auth.logout(
                            () => replace()
                        )}>
                            <Icon type="poweroff"/>
                            Вийти
                        </div>
                    </Menu.Item>
                </SubMenu>
            )
        } else {
            return (
                <Menu.Item key="login" {...this.props}>
                    <Link to="/login">
                        <Icon type="user"/>
                        <span>Війти</span>
                    </Link>
                </Menu.Item>
            )
        }
    }
}

export class SiderDemo
    extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            style: style2
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
                      theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart"/>
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop"/>
                        <span>Option 2</span>
                    </Menu.Item>
                    <Users/>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team"/><span>Team</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file"/>
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default SiderDemo