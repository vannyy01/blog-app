import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createPost} from "../actions";
import {Layout} from "antd/lib/index";
import sha1 from "js-sha1";
const {Content} = Layout;

let getCurrentValue = (e) => {
  let hash =  sha1(sha1('17091998'));
  let phpHash = 'f0c586c46b3c919e15bb45ef9712ea15db743331';
    console.log(hash === phpHash);
    console.log(e.target.value);
};

class PostNew extends Component {
    constructor() {
        super();
        getCurrentValue = getCurrentValue.bind(this);
    }


    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Content style={{marginTop: 200}}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Назва допису"
                        name="post_name"
                        onChange={getCurrentValue}
                        component={this.renderField}
                    />
                    <Field
                        label="Категорії"
                        name="category"
                        component={this.renderField}
                    />
                    <Field
                        label="Короткий опис"
                        name="short_description"
                        component={this.renderField}
                    />
                    <Field
                        label="Текст допису"
                        name="text"
                        component={this.renderField}
                    />
                    <Field
                        label="Теги"
                        name="tags"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
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
    validate,
    form: "CreatePost"
})(connect(null, {createPost})(PostNew));