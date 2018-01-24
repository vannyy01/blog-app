import React, {Component} from "react";
import {Layout} from "antd/lib/index";
import {fetchUserInfo, updateUserInfo} from "../actions";
import {connect} from 'react-redux';
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import AuthService from "../client/Auth";
import {Input, Table, Popconfirm} from 'antd'
import {DatePicker} from 'antd';
import moment from 'moment';

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
                           onChange={e => onChange(e.target.value)}/>)
            : value
        }
    </div>
);

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            dataIndex: 'row',
            width: '15%',
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

    componentDidUpdate() {

    }

    renderColumns(text, record, column) {
        const rows = ['name', 'email', 'male', 'birth', 'favour_desc'];
        if (rows.includes(record.key) && column === 'row') {
            return <EditableCell
                editable={false}
                value={text}
            />
        } else {
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
        console.log(value);
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
            console.log(patch);
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
        const {user} = this.props;
        if (!this.props.user[0]) {
            return (
                <Content style={{marginTop: 150, backgroundColor: 'white'}}>
                    <PreloaderIcon
                        type={ICON_TYPE.TAIL_SPIN}
                        size={70}
                        style={{margin: 'auto', zIndex: 1100}}
                        strokeWidth={8}
                        strokeColor="CornflowerBlue "
                        duration={1000}
                    />
                </Content>
            )
        } else {
            return (
                <Content style={{marginTop: 120}}>
                    <main role="main" className="container"
                          style={{textAlign: 'left', margin: '5px 10px 5px 10px', backgroundColor: 'white'}}>
                        <Table pagination={false} style={{width: 620, marginLeft: 'auto'}} showHeader={false} size="small" dataSource={this.props.user}
                               columns={this.columns}/>
                    </main>
                </Content>
            )
        }
    }
}

const mapStateToProps = ({user}) => {
    return {
        user: user,
        cacheData: user,
    }
};
export default connect(mapStateToProps, {fetchUserInfo, updateUserInfo})(UserInfo);