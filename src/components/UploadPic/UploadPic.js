import React from 'react'
import {Upload, Icon, Modal} from 'antd'
import config from '../../config'


// props 配置 {maxNumber 最大上传数量，uploadType 上传类别，multiple 多文件上传}
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
		let image_src = file.response && file.response.data.image_src;
		console.log(image_src,fileList)
		this.setState({ fileList });
	}

	componentDidMount(){
		if(this.props.fileList){
			let newFileList = [...this.state.fileList,...this.props.fileList];
			this.setState({
				fileList: newFileList
			})
		}
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