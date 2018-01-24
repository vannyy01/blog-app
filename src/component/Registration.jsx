import React, {Component} from 'react';
import {Form, Input, Tooltip, Icon, Button} from 'antd';
import {Layout} from "antd/lib/index";
import Row from './Row';
import img from '../images/people-night-crowd.jpg';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import AuthService from "../client/Auth";

const FormItem = Form.Item;

const Auth = new AuthService();
const asyncValidate = (value) => Auth.asyncValidate(value);
const {Content} = Layout;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const FormElement = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) =>
    (
        <Form.Item
            {...formItemLayout}
            label={label}
        >
            <Input type={type} {...input}/>
            <div className="text-help">
                {touched && error && <span style={{color: 'red'}}>{error}</span>}
            </div>
        </Form.Item>);

const Name = ({
                  tooltip,
                  input,
                  label,
                  type,
                  meta: {touched, error}
              }) =>
    <Form.Item
        {...formItemLayout}
        label={(
            <span>
                {label}&nbsp;
                <Tooltip title={tooltip}>
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
        )}
    >
        <Input type={type} {...input}/>
        <div className="text-help">
            {touched && error && <span style={{color: 'red'}}>{error}</span>}
        </div>
    </Form.Item>;


class RegistrationForm extends Component {
    onSubmit(values) {
        Auth.signUp(values, () => this.props.history.replace('/'));
    };

    render() {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            }
        };
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <Content>
                <Row text="Реєстрація" img={img} blur={{min: -1, max: 5}}/>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}
                      style={{width: 600, margin: 'auto', marginBottom: 10, marginTop: 20}}>
                    <Field
                        label="Електронна пошта"
                        name="email"
                        component={FormElement}
                    />
                    <Field
                        type="password"
                        label="Пароль"
                        name="pass_hash"
                        component={FormElement}/>
                    <Field
                        type="password"
                        label="Пітвердити пароль"
                        name="confirmPassword"
                        component={FormElement}

                    />
                    <Field
                        label="Логін"
                        type="text"
                        tooltip="Виберіть унікальне та орігінальне ім'я"
                        name="user_name"
                        component={Name}
                    />
                    <FormItem {...tailFormItemLayout}>
                        <Button disabled={submitting} type="primary" htmlType="submit">Register</Button>
                        <Button style={{marginLeft: 10}} disabled={pristine || submitting} onClick={reset}
                                type="danger">Очистити</Button>
                    </FormItem>
                </Form>
            </Content>
        );
    }
}

function validate(values) {

    const errors = {};

    if (!values.email) {
        errors.email = "Введіть електронну";
    }
    if (!values.pass_hash) {
        errors.pass_hash = "Введіть пароль";
    }
    if (values.pass_hash !== values.confirmPassword) {
        errors.confirmPassword = "Паролі не співпадають";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Введіть пароль";
    }
    if (!values.nickname) {
        errors.nickname = "Введіть ім'я користувача";
    }

    return errors;
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default reduxForm({
    validate,
    asyncValidate,
    form: "SignUp"
})(connect(null, null)(WrappedRegistrationForm));
