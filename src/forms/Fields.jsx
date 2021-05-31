import React from "react";
import {Input} from 'antd';
import ControlledChipInput from 'material-ui-chip-input';

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


export const renderChipInput = ({input, defValue = [], meta, data, hintText, floatingLabelText, label, fetchTags, defaultValue = []}) => {
    const {touched, error} = meta;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    let assign = true;

    if (defValue && defValue.length > 0 && assign) {
        input.value = defValue;
        assign = false;
    }
    return (
        <div className={className}>
            <label>{label}</label>
            <ControlledChipInput
                {...input}
                allowDuplicates={false}
                value={input.value || []}
                onRequestAdd={(addedChip) => {
                    let chip = {
                        tag: addedChip.tag.trim()
                        , id: typeof addedChip.id === 'number'
                            ? addedChip.id :
                            addedChip.id.trim()
                    };
                    if (chip.tag.length >= 3) {
                        let values = input.value || [];
                        values = values.slice();
                        values.push(chip);
                        input.onChange(values);
                    }
                }}
                onUpdateInput={(chip) => fetchTags(chip)}
                onRequestDelete={(deletedChip) => {
                    let values = input.value || [];

                    const findCherries = (item) => {
                        return item.id !== deletedChip;
                    };

                    values = values.filter(findCherries);
                    input.onChange(values);
                }}

                onBlur={(event) => {
                    let item = event.target.value;
                    item.trim();
                    if (item && item.length >= 3) {
                        let val = {tag: item, id: item};
                        let values = input.value || [];
                        values = values.slice();
                        values.push(val);
                        input.onBlur(values);
                    }
                }
                }
                dataSource={data}
                dataSourceConfig={{text: 'tag', value: 'id'}}
                hintText={hintText}
                floatingLabelText={floatingLabelText}
                style={{width: 400}}
            />
            <div className="text-help">
                {touched && error && <span style={{color: 'red'}}>{error}</span>}
            </div>
        </div>

    )
};