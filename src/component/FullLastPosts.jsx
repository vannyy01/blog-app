import React, {Component} from "react";
import Row from './Row';
import {Layout} from "antd/lib/index";
import {fetchPosts} from "../actions";
import {connect} from 'react-redux';
import {postsTypes} from "../types";
import {FETCH_POST} from "../actions";
import img from '../images/people-night-crowd.jpg';

const {Content} = Layout;

class FullLastPosts extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Content>
                <Row text="Останні дописи" img={img} blur={{min: -1, max: 3}}/>
                <div>
                    The lasts posts.
                </div>
            </Content>
        )
    }
}

export default FullLastPosts;