import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Layout} from "antd/lib/index";
import sha1 from "js-sha1";
import {replace} from "../client/withAuth";
import AuthService from '../client/Auth';

const Auth = new AuthService();
const {Content} = Layout;

let getCurrentValue = (e) => {
    let hash = sha1(sha1('17091998'));
    let phpHash = 'f0c586c46b3c919e15bb45ef9712ea15db743331';
    console.log(hash === phpHash);
    console.log(e.target.value);
};


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
        getCurrentValue = getCurrentValue.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    };

    handleFormSubmit(e) {
        e.preventDefault();
        Auth.login({username: this.state.username, password: this.state.password})
            .then(res =>
                replace()
            );
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

    render() {
        if (Auth.loggedIn()) {
            replace();
            return null;
        } else {
            return (
                <Content style={{marginTop: 200}}>
                    <div className="row" style={{margin: 'auto', justifyContent: 'center'}}>
                        <form onSubmit={this.handleFormSubmit}>
                            <Field
                                label="Логін"
                                name="username"
                                onChange={this.handleChange}
                                component={this.renderField}
                            />
                            <Field
                                label="Пароль"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </form>
                    </div>
                </Content>
            );
        }
    }

}

function validate(values) {

    const errors = {};

    if (!values.login) {
        errors.login = "Введіть логін";
    }
    if (!values.password) {
        errors.password = "Введіть пароль";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}


export default reduxForm({
    validate,
    form: "Login"
})(connect(null, null)(Login));