import React, {Component} from "react";
import {fileUpload, fetchUserInfo} from "../actions";
import {connect} from "react-redux";
import {Upload, Button, message, Icon, Modal} from 'antd';
import AuthService from '../client/Auth';
import {avatarType} from "../types";

const Auth = new AuthService();

class UploadMyFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            clicked: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => this.setState({fileList});
    handleSubmit = (e) => {
        e.preventDefault();
        const file = this.state.fileList[0].originFileObj;
        console.log(file);
        const types = ["image/png", "image/jpg", "image/jpeg"];
        if (types.includes(file.type)) {
            this.setState({clicked: !this.state.clicked});
            this.props.fileUpload(file).then(response => response.code >= 200 ? this.props.history.replace('/user/info')
                : null
            ).catch(err => alert("Помилка при завантаженні"));
        } else {
            message.error('Непральний тип зображення');
        }
    };

    render() {
        const Image = require("../../user-images/" + this.props.avatar);
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Завантажити аватар</div>
            </div>
        );
        return (
            <div className="clearfix" style={{width: 350}}>
                <img style={{height: 150, width: 150}}
                     src={Image}/>
                <form onSubmit={this.handleSubmit} style={{height: 112, width: 150, marginTop: 5}}>
                    <Upload
                        action="http://api.stud-blog.loc/profile/fakeavatar"
                        listType="picture-card"
                        headers={{
                            Authorization: `Bearer ${Auth.getToken()}`
                        }}
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length === 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                    {fileList.length === 1 ?
                        <Button htmlType="submit" disabled={this.state.clicked} icon="upload"/> : null}
                </form>
            </div>
        )
    }
}

UploadMyFile.propTypes = {
  avatar: avatarType.isRequired
};
export default connect(null, {fileUpload, fetchUserInfo})(UploadMyFile);