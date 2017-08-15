import React from 'react'
import GalleryList from '../GalleryList'
import {Modal, Button, message, Input, Select} from 'antd'
import UploadImg from '../UploadImg'
import config from '../../config.js'
import MainStageModal from './MainStageModal'
import PrintModal from './PrintModal'
const Option = Select.Option;


export default class AddGallery extends React.Component{
	state = {
		gallery: [],
		addMainStage: false,
		addPrint: false,
		mainStageUrl: null,
		printThumbnailUrl: null,
		printStageUrl: null,
		printHoverStageUrl: null,
		relatedId: null,
		subMenuId: 0
	}
	componentDidMount() {
		this._getGallery();
	}
	render(){
		let {addMainStage, addPrint, relatedId, gallery, subMenuId} = this.state,
			{mainStageId} = this.props,
			mainStageImg = [], subMenuImg = [];
		const subMenu = [
			[
				<Option value='0' key='0'>墙纸</Option>,
				<Option value='1' key='1'>沙发</Option>,
				<Option value='2' key='2'>抱枕</Option>
			],[
				<Option value='0' key='0'>墙</Option>,
				<Option value='1' key='1'>沙</Option>,
				<Option value='3' key='2'>抱</Option>
			],
		]

		let menu = subMenu[mainStageId];

		gallery.forEach((value,index)=>{
			if(value.mainStageId === mainStageId){
				if(value.subMenuId === -1 ){
					mainStageImg.push(value);
				}else if( value.subMenuId == subMenuId){
					subMenuImg.push(value);
				}
			}	
		})

		return(
			<div>
				<p style={{margin: 10}}>主场景图</p>
				<GalleryList addClick={this._showAddMainStage} img={mainStageImg} maxNumber={1}/>
				<Select defaultValue='0' onChange={(value)=>{this.setState({subMenuId: value})}} style={{margin: 10}}>
					{menu}
				</Select> 
				<span>印花图</span>
				<GalleryList style={{width: 200}} addClick={this._showAddPrint} img={subMenuImg}/>
				<MainStageModal visible={addMainStage} onOk={this._onOkMainStage} onCancel={this._onCancelMainStage} handleImg={this._handleMainStageImg}/>
				<PrintModal visible={addPrint} onOk={this._onOkPrint} 
							onCancel={this._onCancelPrint} 
							handlePrintThumbnailImg={this._handlePrintThumbnailImg} 
							handlePrintStageImg={this._handlePrintStageImg} 
							handlePrintHoverStageImg={this._handlePrintHoverStageImg} 
							handleCommodityId={this._handleCommodityId}
							commotityId={relatedId} />
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
	_handleCommodityId = (e)=>{
		this.setState({relatedId:e.target.value})
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
		this._getGallery();

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
		this._getGallery();

		this.setState({
			addPrint: false,
			printThumbnailUrl: null,
			printStageUrl: null,
			relatedId: null
		})
	}

	_savePrint = ()=>{
		let {mainStageId} = this.props;
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
		let {mainStageId} = this.props;

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

	_getGallery = ()=>{

		fetch(config.api + `/getGallery`,{
			method: 'get',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(res=>res.json())
		.then((data)=>{
			if(data.status == 200){
				this.setState({
					gallery: data.gallery
				})
			}
		})
	}

}