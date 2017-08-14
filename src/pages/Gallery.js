import React from 'react'
import GalleryList from '../components/GalleryList'
import {Modal, Button, message, Input, Select} from 'antd'
import UploadImg from '../components/UploadImg'
import config from '../config.js'
const Option = Select.Option;

export default class AddGallery extends React.Component{
	state = {
		addMainStage: false,
		addPrint: false,
		mainStageUrl: null,
		printThumbnailUrl: null,
		printStageUrl: null,
		printHoverStageUrl: null,
		relatedId: null,
		subMenuId: 0
	}
	render(){
		let {addMainStage, addPrint, relatedId} = this.state;
		const subMenu = [
			[
				<Option value='0' key='0'>墙纸</Option>,
				<Option value='1' key='1'>沙发</Option>,
				<Option value='2' key='2'>抱枕</Option>
			],[
				<Option value='0' key='0'>墙纸</Option>,
				<Option value='1' key='1'>沙发</Option>,
				<Option value='2' key='2'>抱枕</Option>
			],
		]

		let menu = this.props.params.type == 'livingRoom' ? subMenu[0] : subMenu[1];

		return(
			<div>
				<p>主场景图</p>
				<GalleryList addClick={this._showAddMainStage}/>
				<Select defaultValue='0' onChange={(value)=>{this.setState({subMenuId: value})}}>
					{menu}
				</Select> 
				<span>印花图</span>
				<GalleryList style={{width: 200}} addClick={this._showAddPrint}/>
				<Modal visible={addMainStage} onOk={this._onOkMainStage} onCancel={this._onCancelMainStage}>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handleMainStageImg}/>
				</Modal>
				<Modal visible={addPrint} onOk={this._onOkPrint} onCancel={this._onCancelPrint}>
					<p>缩略图</p>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handlePrintThumbnailImg}/>
					<p>场景图</p>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handlePrintStageImg}/>
					<p>鼠标悬停预览图</p>
					<UploadImg maxNumber={1} uploadType='gallery' handleImg={this._handlePrintHoverStageImg}/>
					<p>关联商品ID</p>
					<Input value={relatedId} onChange={() => {this.setState({relatedId:e.target.value})}}/>
				</Modal>
			</div>
		)
	}

	_handleMainStageImg = (fileList)=>{
		if(!fileList[0]){
			this.setState({
				mainStageUrl: null
			})
		}else if(fileList[0] && fileList[0].status == 'done'){
			let mainStageUrl = fileList[0].response.data.image_src[0];
			this.setState({
				mainStageUrl
			})
		}

	}

	_handlePrintThumbnailImg = (fileList)=>{
		if(!fileList[0]){
			this.setState({
				printThumbnailUrl: null
			})
		}else if(fileList[0] && fileList[0].status == 'done'){
			console.log(fileList)
			let printThumbnailUrl = fileList[0].response.data.image_src[0];
			this.setState({
				printThumbnailUrl
			})
		}

	}

	_handlePrintStageImg = (fileList)=>{
		if(!fileList[0]){
			this.setState({
				printStageUrl: null
			})
		}else if(fileList[0] && fileList[0].status == 'done'){
			let printStageUrl = fileList[0].response.data.image_src[0];
			this.setState({
				printStageUrl
			})
		}

	}
	_handlePrintHoverStageImg = (fileList)=>{
		if(!fileList[0]){
			this.setState({
				printHoverStageUrl: null
			})
		}else if(fileList[0] && fileList[0].status == 'done'){
			let printHoverStageUrl = fileList[0].response.data.image_src[0];
			this.setState({
				printHoverStageUrl
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
		this._saveMainStage();

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
		this._savePrint();

		this.setState({
			addPrint: false,
			printThumbnailUrl: null,
			printStageUrl: null,
			relatedId: null
		})
	}

	_savePrint = ()=>{
		let mainStageId;
		if(this.props.params.type == 'livingRoom'){
			mainStageId = 0;
		}else if (this.props.params.type == 'bedRoom'){
			mainStageId = 1;
		}
		let {subMenuId, printStageUrl,printHoverStageUrl, printThumbnailUrl, relatedId} = this.state;
		let body = `mainStageId=${mainStageId}&subMenuId=${subMenuId}&thumbnail=${printThumbnailUrl}&stageImg=${printStageUrl}&hoverStageImg=${printHoverStageUrl}&commotityId=${relatedId}`

		fetch(config.api + '/addGallery',{
			method: 'post',
			mode: 'cors',
			body: body,
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				message.success(data.message)
			}else{
				message.error(data.message)
			}
		})
	}

	_saveMainStage = ()=>{
		let mainStageId;
		if(this.props.params.type == 'livingRoom'){
			mainStageId = 0;
		}else if (this.props.params.type == 'bedRoom'){
			mainStageId = 1;
		}

		let body = `mainStageId=${mainStageId}&stageImg=${this.state.mainStageUrl}`
		fetch(config.api + '/addMainStage', {
			method: 'post',
			mode: 'cors',
			body: body,
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