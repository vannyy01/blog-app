import React, {Component} from "react";
import {Layout, Icon, Menu} from "antd/lib/index";
import {Link} from 'react-router-dom';

const {Header} = Layout;

class Head extends Component {

    render() {
        return (
            <Header style={{
                background: '#fff', padding: 0,
                zIndex: 999,
                position: 'fixed',
                width: '100%'
            }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1">
                        <Link to={`/`}>
                            <Icon spin={true} type="home" style={{fontSize: 20, color: 'white'}}/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`/post`}>
                            <Icon type="book" style={{fontSize: 20, color: 'white'}}/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default Head;