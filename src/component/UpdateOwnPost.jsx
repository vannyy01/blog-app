import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from 'antd';
import {connect} from "react-redux";
import {fetchPosts, fetchTags, createPost, fetchBlogs, fetchCategory, FETCH_POST} from "../actions";
import {Layout} from "antd/lib/index";
import Row from '../component/Row';
import {renderTextArea, renderInputField} from '../forms/Fields';
import axios from "axios/index";
import ControlledChipInput from 'material-ui-chip-input';
import {Select, Spin} from 'antd';

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
    } else {
        return new Promise(resolve => (0))
    }
}

class UpdateOwnPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            tags: [],
            listTags: [],
            open: true
        }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        const fetchParameters = '/post/?s[post_id]=' + id + '&expand=text,author,blog,tags';
        this.props.fetchPosts(fetchParameters, FETCH_POST);
        this.props.fetchBlogs();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post) {
            this.setState({
                category: nextProps.post.category,
                tags: nextProps.post.tags
            });
        }
        // dima@nebo15.com
        if(this.props.listTags.length !== nextProps.listTags.length) {
            console.log(nextProps.listTags);
           // this.setState({listTags: nextProps.listTags});
            return true;
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.tags !== nextState.tags) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param values
     */
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
            this.props.history.push("/post")
        );
    };

    renderInput = ({input, meta, data, defaultValue, hintText, floatingLabelText, label}) => {
        const {touched, error} = meta;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        input.value = this.state.tags;
        console.log(data, this.props.listTags);
        return (
            <div className={className}>
                <label>{label}</label>
                <ControlledChipInput
                    {...input}
                    defaultValue={defaultValue}
                    allowDuplicates={false}
                    value={input.value || []}
                    onClose = {() => this.setState({open: !this.state.open})}
                    onRequestAdd={(addedChip) => {
                        let chip = {
                            tag: addedChip.tag.trim()
                            , id: typeof addedChip.id === 'number'
                                ? addedChip.id :
                                addedChip.id.trim()
                        };
                        this.props.fetchTags(chip.tag);
                        if (chip.tag.length >= 3) {
                            let values = this.state.tags;
                            values = values.slice();
                            values.push(chip);
                            this.setState({tags: values});
                            input.onChange(values);
                        }
                    }}
                    onUpdateInput={(chip) => chip.trim().length >= 1 ? this.props.fetchTags(chip) : null}
                    onRequestDelete={(deletedChip) => {
                        let values = this.state.tags;

                        function findCherries(item) {
                            return item.id !== deletedChip;
                        }

                        values = values.filter(findCherries);
                        this.setState({tags: values});
                        input.onChange(values);
                    }}

                    onBlur={(event) => {
                        let item = event.target.value;
                        item.trim();
                        if (item && item.length >= 3) {
                            let val = {tag: item, id: item};
                            let values = this.state.tags;
                            values = values.slice();
                            values.push(val);
                            this.setState({tags: values});
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
    renderCategoryInput = ({input, meta, defaultValue, data, placeholder, label}) => {
        const {touched, error} = meta;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        let value = _.isEmpty(this.state.category) ? [] : this.state.category;
        let values = [];
        value.map(elem => {
                let temp = {key: elem.value, label: elem.text};
                values.push(temp);
            }
        );
        input.value = _.isEmpty(input.value) ? [] : input.value;
        input.value = [...input.value, ...values];
        this.setState({category: []});
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
    renderSelectField = ({input, meta, data, defaultValue, label, placeholder}) => {
        const {touched, error} = meta;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        const value = _.isEmpty(defaultValue) ? "" : defaultValue.id;
        return (
            <div className={className}>
                <label>{label}</label>
                <Select
                    showSearch
                    style={{width: 400}}
                    placeholder={placeholder}
                    defaultValue={value}
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
        if (!_.isEmpty(this.props.blogs) && !_.isEmpty(this.props.post)) {
            return (
                <Content style={{backgroundColor: 'white'}}>
                    <Row text="Редагувати власний допис"
                         img={'https://images.pexels.com/photos/296881/pexels-photo-296881.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'}
                         blur={{min: -1, max: 5}}/>
                    <main role="main" className="container">
                        <div className="row">
                            <form style={{margin: 'auto', width: 400}}
                                  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field
                                    placeholder="Виберіть ваш блог"
                                    data={this.props.blogs}
                                    defaultValue={this.props.post.blog}
                                    label="Виберіть ваш блог"
                                    name="blog_id"
                                    component={this.renderSelectField}
                                />
                                <Field
                                    label="Назва допису"
                                    data={this.props.post.post_name}
                                    name="post_name"
                                    placeholder="Введіть назву допису"
                                    component={renderInputField}
                                />
                                <Field
                                    label="Категорії"
                                    placeholder="Оберіть категорії"
                                    data={this.props.categories}
                                    defaultValue={this.props.post.category}
                                    name="category"
                                    component={this.renderCategoryInput}
                                    hintText='...'
                                    floatingLabelText='Категорії'
                                />
                                <Field
                                    label="Короткий опис"
                                    data={this.props.post.short_description}
                                    name="short_description"
                                    placeholder="Введіть короткий опис"
                                    component={renderTextArea}
                                />
                                <Field
                                    label="Текст допису"
                                    data={this.props.post.text}
                                    name="post_text"
                                    placeholder="Введіть текст допису"
                                    autosize={{minRows: 2, maxRows: 6}}
                                    component={renderTextArea}
                                />
                                <Field
                                    label="Теги"
                                    defaultValue={this.props.post.tags}
                                    data={this.props.listTags}
                                    name="tags"
                                    component={this.renderInput}
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
        } else {
            return (
                <div>...Loading</div>
            )
        }
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

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

const mapStateToProps = ({post, list, blog: {blogs}, category}) => {
    return {
        post,
        listTags: list,
        blogs,
        categories: category || [],
    }
};

export default reduxForm({
    form: "CreatePost",
    validate,
    asyncValidate,
    asyncBlurFields: ['post_name']
})(connect(mapStateToProps, {createPost, fetchCategory, fetchPosts, fetchTags, fetchBlogs})(UpdateOwnPost));