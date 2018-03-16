import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from 'antd';
import {connect} from "react-redux";
import {createBlog} from "../actions";
import {Layout} from "antd/lib/index";
import Row from '../component/Row';
import {renderTextArea, renderInputField} from '../forms/Fields';
import axios from "axios/index";
import {Input} from 'antd';

const {TextArea} = Input;

const domain = 'http://api.stud-blog.loc';


function asyncValidate(value) {
    if (value.blog_name) {
        return axios.get(`${domain}/blog/validate/?blog_name=${value.blog_name}`).then((res) => {
            if (res.data !== true) {
                throw {blog_name: 'Назва блогу зайнята'}
            }
        });
    } else {
        return new Promise(resolve => (0))
    }
};
const {Content} = Layout;

class NewBlog extends Component {
    constructor() {
        super();
    }


    onSubmit(values) {
        this.props.createBlog(values, () => {
            this.props.history.push("/post/create");
            alert("Блог успішно створений!")
        });
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <Content style={{backgroundColor: 'white'}}>
                <Row text="Створіть ваш власний блог"
                     img="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                     blur={{min: -1, max: 5}}/>
                <main role="main" className="container">
                    <div className="row">
                        <form style={{margin: 'auto',paddingTop: 5, paddingBottom: 15, width: 400}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Назва блогу"
                                name="blog_name"
                                component={renderInputField}
                            />
                            <Field
                                label="Короткий опис"
                                name="short_description"
                                component={renderTextArea}
                            />
                            <Button disabled={submitting} type="primary" htmlType="submit">Створити блог</Button>
                            <Button style={{marginLeft: 10}} disabled={pristine || submitting} onClick={reset}
                                    type="danger">Очистити</Button>
                        </form>
                    </div>
                </main>
            </Content>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.blog_name) {
        errors.blog_name = "Введіть назву блогу";
    }
    if (!values.short_description) {
        errors.short_description = "Введіть короткий опис";
    }
    return errors;
}


export default reduxForm({
    form: "CreateBlog",
    validate,
    asyncValidate,
    asyncBlurFields: ['blog_name']
})(connect(null, {createBlog})(NewBlog));