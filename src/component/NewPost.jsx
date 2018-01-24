import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from 'antd';
import {connect} from "react-redux";
import {createPost} from "../actions";
import {Layout} from "antd/lib/index";
import Row from '../component/Row';
import {renderTextArea, renderInputField} from '../forms/Fields';
import axios from "axios/index";
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const {Content} = Layout;
const domain = 'http://api.stud-blog.loc';

function asyncValidate(value) {
    if (value.post_name) {
        return axios.get(`${domain}/post/validate/?post_name=${value.post_name}`).then((res) => {
            if (res.data !== true) {
                throw {post_name: 'Назва блогу зайнята'}
            }
        });
    } else {
        return new Promise(resolve => (0))
    }
}

class PostNew extends Component {
    constructor() {
        super();
        this.state = {
            chips: []
        };
        this.handleChange = this.handleChange.bind(this)
    }

    onSubmit = (values) => {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    };

    handleChange = (chips) => {
        console.log(chips);
        this.setState(this.state.chips.concat(chips));
        console.log(this.state.chips);
    };

    renderChipInput(field) {
        const {meta: {touched, error}} = field;
        const {placeholder} = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <MuiThemeProvider>
            <div className={className}>
                    <label>{field.label}</label>
                    <ChipInput
                        style={{width: 400}}
                        value={['foo', 'bar']}
                        onRequestAdd={(chips) => (field)}
                    />
                    <div className="text-help">
                        {touched && error && <span style={{color: 'red'}}>{error}</span>}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    };

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <Content style={{backgroundColor: 'white'}}>
                <Row text="Створити новий допис"
                     img={'https://images.pexels.com/photos/296881/pexels-photo-296881.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'}
                     blur={{min: -1, max: 5}}/>
                <main role="main" className="container">
                    <div className="row">
                        <form style={{margin: 'auto', width: 400}} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Назва допису"
                                name="post_name"
                                placeholder="Введіть назву допису"
                                component={renderInputField}
                            />
                            <Field
                                label="Категорії"
                                name="category"
                                placeholder="Введіть категорії"
                                component={renderInputField}
                            />
                            <Field
                                label="Короткий опис"
                                name="short_description"
                                placeholder="Введіть короткий опис"
                                component={renderTextArea}
                            />
                            <Field
                                label="Текст допису"
                                name="text"
                                placeholder="Введіть текст допису"
                                autosize={{minRows: 2, maxRows: 6}}
                                component={renderTextArea}
                            />
                            <Field
                                label="Теги"
                                name="tags"
                                placeholder="Введіть теги"
                                component={this.renderChipInput}
                            />
                            <Button disabled={submitting} type="primary" htmlType="submit">Опублікувати</Button>
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

    if (!values.post_name) {
        errors.post_name = "Введіть назву допису";
    }
    if (!values.category) {
        errors.category = "Введіть категорії";
    }
    if (!values.short_description) {
        errors.short_description = "Введіть короткий опис";
    }
    if (!values.text) {
        errors.text = "Введіть текст допису";
    }
    if (!values.tags) {
        errors.tags = "Введіть теги";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    form: "CreatePost",
    validate,
    asyncValidate,
    asyncBlurFields: ['post_name']
})(connect(null, {createPost})(PostNew));