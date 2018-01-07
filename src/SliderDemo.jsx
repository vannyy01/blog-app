import {Layout, Menu, Icon} from 'antd';

const {Sider} = Layout;
import React, {Component} from 'react';

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

export class SiderDemo extends Component {
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
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user"/><span>User</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
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