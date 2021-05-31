import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from 'antd';
import {connect} from "react-redux";
import {fetchTags, createPost, fetchBlogs, fetchCategory} from "../actions";
import {Layout} from "antd/lib/index";
import Row from '../component/Row';
import {renderTextArea, renderInputField, renderChipInput} from '../forms/Fields';
import axios from "axios/index";
import {Select, Spin} from 'antd';
import {difference} from "../actions/helpers";

const Option = Select.Option;

const {Content} = Layout;
const domain = 'http://api.stud-blog.loc';

function asyncValidate(value) {
    if (value.post_name) {
        return axios.get(`${domain}/post/validate/?post_name=${value.post_name}`).then((res) => {
            if (res.data !== true) {
                throw {post_name: 'Назва блогу зайнята'}
            }
        });
    }
    return new Promise(resolve => (0));

}

class PostNew extends Component {

    componentWillMount() {
        this.props.fetchBlogs();
    }

    componentWillReceiveProps(nextProps) {
        return difference(this.props.tags, nextProps.tags);
    }

    onSubmit = (values) => {
        let items = values;
        let {tags, category} = values;
        let existTags = [];
        let newTags = [];
        tags.map(
            item => {
                if (typeof item.id === 'number') {
                    existTags.push(item.id);
                } else {
                    newTags.push(item.id)
                }
            }
        );
        delete items.tags;
        items.existTags = existTags;
        items.newTags = newTags;
        let categories = [];
        category.map(
            item => categories.push(item.key)
        );
        items.category = categories;
        items.blog_id = items.blog_id[0];
        items.post_name.trim();
        items.post_text.trim();
        items.short_description.trim();
        values.category = [];
        this.props.createPost(items, () =>
            this.props.history.push("/post/view")
        );
    };

    renderCategoryInput = ({input, meta, data, placeholder, label}) => {
        const {touched, error} = meta;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <Select
                    mode="multiple"
                    labelInValue
                    value={_.isEmpty(input.value) ? [] : input.value}
                    placeholder={placeholder}
                    notFoundContent={_.isEmpty(data) ? <Spin size="small"/> : null}
                    filterOption={false}
                    onSearch={(value) => this.props.fetchCategory(value)}
                    onChange={(value) => {
                        input.onChange(value);

                    }}
                    style={{width: '100%'}}

                >
                    {data.map(
                        item => (
                            <Option key={item.value}>{item.text}</Option>
                        )
                    )}
                </Select>
                <div className="text-help">
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}
                </div>
            </div>

        )
    };
    renderSelectField = ({input, meta, data, label, placeholder}) => {
        const {touched, error} = meta;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <Select
                    showSearch
                    style={{width: 400}}
                    placeholder={placeholder}
                    optionFilterProp="children"
                    onChange={value => {
                        let values = input.value || [];
                        values = values.slice();
                        values.push(value);
                        input.onChange(values);
                    }}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        data.map(value => (
                                <Option key={value.id} value={value.id}>{value.name}</Option>
                            )
                        )
                    }
                </Select>
                <div className="text-help">
                    {touched && error && <span style={{color: 'red'}}>{error}</span>}
                </div>
            </div>
        )
    };

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        if (!_.isEmpty(this.props.blogs)) {
            return (
                <Content style={{backgroundColor: 'white'}}>
                    <Row text="Створити новий допис"
                         img={'https://images.pexels.com/photos/296881/pexels-photo-296881.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'}
                         blur={{min: -1, max: 5}}/>
                    <main role="main" className="container">
                        <div className="row">
                            <form style={{margin: 'auto', width: 400}}
                                  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field
                                    placeholder="Виберіть ваш блог"
                                    data={this.props.blogs}
                                    label="Виберіть ваш блог"
                                    name="blog_id"
                                    component={this.renderSelectField}
                                />
                                <Field
                                    label="Назва допису"
                                    name="post_name"
                                    placeholder="Введіть назву допису"
                                    component={renderInputField}
                                />
                                <Field
                                    label="Категорії"
                                    placeholder="Оберіть категорії"
                                    data={this.props.categories}
                                    name="category"
                                    component={this.renderCategoryInput}
                                    hintText='...'
                                    floatingLabelText='Категорії'
                                />
                                <Field
                                    label="Короткий опис"
                                    name="short_description"
                                    placeholder="Введіть короткий опис"
                                    component={renderTextArea}
                                />
                                <Field
                                    label="Текст допису"
                                    name="post_text"
                                    placeholder="Введіть текст допису"
                                    autosize={{minRows: 2, maxRows: 6}}
                                    component={renderTextArea}
                                />
                                <Field
                                    label="Теги"
                                    fetchTags = {this.props.fetchTags}
                                    data={this.props.tags}
                                    name="tags"
                                    component={renderChipInput}
                                    hintText='...'
                                    floatingLabelText='Теги'/>
                                <Button disabled={submitting} type="primary"
                                        htmlType="submit">Опублікувати</Button>
                                <Button style={{marginLeft: 10}} disabled={pristine || submitting} onClick={reset}
                                        type="danger">Очистити</Button>
                            </form>
                        </div>
                    </main>
                </Content>
            );
        }
        return (
            <div>...Loading</div>
        )
    }
}

function validate(values) {

    const errors = {};

    if (!values.blog_id) {
        errors.blog_id = "Виберіть ваш блог";
    }
    if (!values.post_name) {
        errors.post_name = "Введіть назву допису";
    }
    if (!values.category) {
        errors.category = "Введіть категорії";
    }
    if (!values.short_description) {
        errors.short_description = "Введіть короткий опис";
    }
    if (!values.post_text) {
        errors.post_text = "Введіть текст допису";
    }
    if (!values.tags) {
        errors.tags = "Введіть теги";
    }

    return errors;
}

const mapStateToProps = ({list, blog: {blogs}, category}) => {
    return {
        tags: list,
        blogs,
        categories: category || [],
    }
};

export default reduxForm({
    form: "CreatePost",
    validate,
    asyncValidate,
    asyncBlurFields: ['post_name']
})(connect(mapStateToProps, {createPost, fetchCategory, fetchTags, fetchBlogs})(PostNew));