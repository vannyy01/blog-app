import React from "react";
import {Input} from 'antd';

const {TextArea} = Input;

export const renderTextArea = (field) => {
    const {meta: {touched, error}} = field;
    const {placeholder} = field;
    const autosize = field.autosize || 'default';
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const value = _.isEmpty(field.data) ? "" : field.data;
    delete field.input.value;
    return (
        autosize === 'default' ?
            (<div className={className}>
                <label>{field.label}</label>
                <TextArea placeholder={placeholder} defaultValue={value} autosize={autosize} {...field.input}/>
                <div className="text-help">
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}
                </div>
            </div>)
            :
            (<div className={className}>
                <label>{field.label}</label>
                <TextArea defaultValue={value} placeholder={placeholder} autosize={autosize} {...field.input}/>
                <div className="text-help">
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}
                </div>
            </div>)
    )
};

export const renderInputField = (field) => {
    const {meta: {touched, error}} = field;
    const {placeholder} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    const value = _.isEmpty(field.data) ? "" : field.data;
    delete field.input.value;
    return (
        <div className={className}>
            <label>{field.label}</label>
            <Input placeholder={placeholder} defaultValue={value} {...field.input} />
            <div className="text-help">
                {touched && error && <span style={{color: 'red'}}>{error}</span>}
            </div>
        </div>
    );
};