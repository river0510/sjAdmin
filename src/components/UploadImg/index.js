import React from 'react'
import {Upload, Icon, Modal} from 'antd'
import config from '../../config'


// props 配置 {maxNumber 最大上传数量，uploadType 上传类别，multiple 多文件上传(默认false), handleImg(fileList) 保存返回的图片url}
export default class UploadPic extends React.Component{
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
	}

	handleCancel = () => this.setState({ previewVisible: false })

	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}

	handleChange = ({ file, fileList }) => {
		let newFileList;
		if(file.status === 'done'){
			let newFileList = fileList.map((value,index)=>{
				if(file.uid === value.uid){
					value.url = file.response.data.image_src[0];
				}
				return value;
			})
		}
		fileList = newFileList || fileList;
		if(this.props.handleImg instanceof Function){
			this.props.handleImg(fileList);
		}
		this.setState({ fileList });
	}

	render(){
		let { previewVisible, previewImage, fileList } = this.state,
			{ maxNumber, multiple, uploadType } = this.props;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
	    maxNumber = maxNumber || 10;
	    return (
	      <div className="clearfix">
	        <Upload
	          action={`${config.api}/upload?type=${uploadType}`}
	          listType="picture-card"
	          fileList={fileList}
	          onPreview={this.handlePreview}
	          onChange={this.handleChange}
	          multiple = {multiple || false}
	        >
	          {fileList.length >= maxNumber ? null : uploadButton}
	        </Upload>
	        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
	          <img alt="example" style={{ width: '100%' }} src={previewImage} />
	        </Modal>
	      </div>
	    );
	}

}