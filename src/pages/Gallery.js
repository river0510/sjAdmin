import React from 'react'
import GalleryList from '../components/GalleryList'
import {Modal, Button, message, Input} from 'antd'
import UploadImg from '../components/UploadImg'
import config from '../config.js'

export default class AddGallery extends React.Component{
	state = {
		addMainStage: false,
		addPrint: false,
		mainStageUrl: null,
		printThumbnailUrl: null,
		printStageUrl: null,
		relatedId: null
	}
	render(){
		let {addMainStage, addPrint, relatedId} = this.state;
		return(
			<div>
				<p>主场景图</p>
				<GalleryList addClick={this._showAddMainStage}/>
				<p>印花图</p>
				<GalleryList style={{width: 200}} addClick={this._showAddPrint}/>
				<Modal visible={addMainStage} onOk={this._onOkMainStage} onCancel={this._onCancelMainStage}>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handleMainStageImg}/>
				</Modal>
				<Modal visible={addPrint} onOk={this._onOkPrint} onCancel={this._onCancelPrint}>
					<p>缩略图</p>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handlePrintThumbnailImg}/>
					<p>场景图</p>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handlePrintStageImg}/>
					<p>关联商品ID</p>
					<Input value={relatedId} onChange={() => {this.setState({relatedId:e.target.value})}}/>
				</Modal>
			</div>
		)
	}

	_handleMainStageImg = (fileList)=>{
		if(fileList[0].status == 'done'){
			let mainStageUrl = fileList[0].response.data.image_src;
			this.setState({
				mainStageUrl
			})
		}

	}

	_handlePrintThumbnailImg = (fileList)=>{
		if(fileList[0].status == 'done'){
			let printThumbnailUrl = fileList[0].response.data.image_src;
			this.setState({
				printThumbnailUrl
			})
		}

	}

	_handlePrintStageImg = (fileList)=>{
		if(fileList[0].status == 'done'){
			let printStageUrl = fileList[0].response.data.image_src;
			this.setState({
				printStageUrl
			})
		}

	}

	_showAddMainStage = ()=>{
		this.setState({
			addMainStage: true
		})
	}

	_onCancelMainStage = ()=>{
		this.setState({
			addMainStage: false,
			mainStageUrl: false
		})
	}

	_onOkMainStage = ()=>{
		this.setState({
			addMainStage: false,
			mainStageUrl: false
		})
	}

	_showAddPrint = ()=>{
		this.setState({
			addPrint: true
		})
	}

	_onCancelPrint = ()=>{
		this.setState({
			addPrint: false,
			printThumbnailUrl: null,
			printStageUrl: null,
			relatedId: null
		})
	}

	_onOkPrint = ()=>{
		this.setState({
			addPrint: false,
			printThumbnailUrl: null,
			printStageUrl: null,
			relatedId: null
		})
	}

	_saveMainStage = ()=>{
		fetch(conifg.api + '/mainStage', {
			method: 'post',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(res=>res.json())
		.then((data)=>{
			if(data.status == 200){
				message.success(data.message)
			}else{
				message.error(data.message)
			}
		})
	}

}