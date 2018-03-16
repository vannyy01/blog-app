import React, {Component} from "react";
import {Layout, Icon, Menu} from "antd/lib/index";
import {Link} from 'react-router-dom';
import AuthService from "../client/Auth";

const Auth = new AuthService();
const {Header} = Layout;

class Head extends Component {
    constructor() {
        super();
        this.state = {
            selectedKey: '1'
        };
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue = (e) => {
        this.setState({selectedKey: e.key})
    };

    render() {
        return (
            <Header style={{
                background: '#fff', padding: 0,
                zIndex: 999,
                position: 'fixed',
                width: '100%',
                height: 45
            }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    SelectedKeys={[this.state.selectedKey]}
                    style={{lineHeight: '45px'}}
                    onClick={this.changeValue}
                >
                    <Menu.Item key="1">
                        <Link to={`/`}>
                            <Icon spin={this.state.selectedKey.includes('1')} type="home"
                                  style={{fontSize: 20, color: 'white'}}/>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`/post/view`}>
                            <Icon spin={this.state.selectedKey.includes('2')} type="book"
                                  style={{fontSize: 20, color: 'white'}}/>
                        </Link>
                    </Menu.Item>
                    {this.props.auth ?
                        <Menu.Item key="3">
                            <Link to={`/post/user/likes`}>
                                <Icon spin={this.state.selectedKey.includes('3')} type="heart"
                                      style={{fontSize: 20, color: 'red'}}/>
                            </Link>
                        </Menu.Item> : null
                    }
                </Menu>
            </Header>
        )
    }
}

export default Head;