import React, {Component} from "react";
import {Layout} from "antd/lib/index";
import {fetchUserInfo, updateUserInfo} from "../actions";
import {connect} from 'react-redux';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import AuthService from "../client/Auth";
import {Input, Table, Popconfirm} from 'antd'
import {DatePicker} from 'antd';
import moment from 'moment';
import ImageUpload from '../forms/ImageUpload';
import {Select} from 'antd';

const Auth = new AuthService();
const {Content} = Layout;


const EditableCell = ({editable, value, onChange, record, column}) => (
    <div>
        {editable
            ? (
                (record === 'birth' && column === 'value') ?
                    <DatePicker defaultValue={moment(value, 'YYYY-MM-DD')}
                                onChange={(e, val) => onChange(val)}/>
                    :
                    <Input style={{margin: '-5px 0'}} value={value}
                           onChange={(val) => onChange(val)}/>)
            : value
        }
    </div>
);


const EditableMale = ({editable, value, onChange, record, column}) => (
    <div>
        {editable
            ? <div>
                <Select defaultValue={value} style={{width: 130, height: 26, margin: '-5px 0'}}
                        onChange={(val) => onChange(val)}>
                    <Select.Option value="чоловік">чоловік</Select.Option>
                    <Select.Option value="жінка">жінка</Select.Option>
                </Select>
            </div>
            : value
        }
    </div>
);


class UserInfo
    extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            dataIndex: 'row',
            width: '18%',
            render: (text, record) => this.renderColumns(text, record, 'row'),
        }, {
            dataIndex: 'value',
            width: '25%',
            render: (text, record) => this.renderColumns(text, record, 'value'),
        }, {
            dataIndex: 'operation',
            width: '20%',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <Popconfirm onConfirm={() => this.save(record.key)} title="Зберегти?"><a
                      style={{color: 'blue', marginRight: 5}}>Save</a></Popconfirm>
                  <Popconfirm title="Відмінити?" onConfirm={() => this.cancel(record.key)}>
                    <a style={{color: 'blue'}}>Cancel</a>
                  </Popconfirm>
                </span>
                                : <a style={{color: 'blue'}} onClick={() => this.edit(record.key)}>Edit</a>
                        }
                    </div>
                );
            },
        }];
        this.state = {
            cacheData: []
        };
        props.fetchUserInfo(Auth.getToken());
    }


    componentWillReceiveProps(nextProps) {

        if (this.props.user !== nextProps.user) {
            this.setState({cacheData: nextProps.user.map(item => ({...item}))});
        }
    }

    renderColumns(text, record, column) {
        const rows = ['name', 'email', 'male', 'birth', 'favour_desc'];
        if (rows.includes(record.key) && column === 'row') {
            return <EditableCell
                editable={false}
                value={text}
            />
        } else if (record.key === 'male' && column === 'value') {
            return <EditableMale
                editable={record.editable}
                record={record.key}
                column={column}
                value={text}
                onChange={(value, e) => this.handleChange(value, e, record.key, column)}
            />
        }
        else {
            return (
                <EditableCell
                    editable={record.editable}
                    record={record.key}
                    column={column}
                    value={text}
                    onChange={(value, e) => this.handleChange(value, e, record.key, column)}
                />
            );
        }
    }

    handleChange(value, e, key, column) {
        const newData = [...this.props.user];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
    }

    edit(key) {
        const newData = [...this.props.user];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({data: newData});
        }
    }

    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            const patch = {[target.key]: target.value};
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
            this.props.updateUserInfo(patch);
        }
    }

    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    render() {
        if (this.props.user === undefined) {
            return (
                <Content style={{marginTop: 150, backgroundColor: 'white'}}>
                    <PreloaderIcon
                        type={ICON_TYPE.TAIL_SPIN}
                        size={70}
                        style={{margin: 'auto', zIndex: 1100}}
                        strokeWidth={8}
                        strokeColor="CornflowerBlue"
                        duration={1000}
                    />
                </Content>
            )
        } else {
            return (
                <Content style={{marginTop: 120}}>
                    <main role="main" className="container-fluid"
                          style={{textAlign: 'left', margin: '5px 10px 5px 10px', backgroundColor: 'white'}}>
                        <div className="row">
                            <div className="col-sm-8">
                                <h1>Профіль</h1>
                                <ImageUpload history={this.props.history} avatar={this.props.avatar}/>
                                <Table pagination={false} style={{
                                    width: 610,
                                    paddingBottom: 15
                                }} showHeader={false}
                                       size="small" dataSource={this.props.user}
                                       columns={this.columns}/>
                            </div>
                        </div>
                    </main>
                </Content>
            )
        }
    }
}


const mapStateToProps = ({user}) => {
    return {
        user: user.data,
        cacheData: user.data,
        avatar: user.avatar,
    }
};

export default connect(mapStateToProps, {fetchUserInfo, updateUserInfo})(UserInfo);


