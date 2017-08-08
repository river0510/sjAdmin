import React from 'react'
import UploadCarousel from '../components/UploadCarousel/UploadCarousel'
import config from '../config'
import {message , Button} from 'antd'	

export default class AddCarousel extends React.Component {
	state = {
		carousel : [],
	}

	render() {
		let { fileList } = this.state;
		console.log(fileList)
		return (
			<div style={{height:"100%"}}>
				<Button type='primary' style={{margin: 10}} onClick={this._handleSave}>保存</Button>
				<UploadCarousel uploadType='carousel' fileList={fileList} multiple handleImg={this._handleImg}/>
			</div>
		)
	}

	_handleImg = (img)=>{
		let carousel = [];
		img.forEach((value,index)=>{
			if(value.url){
				carousel.push(value.url);
			}
		})
		this.setState({
			carousel
		})
	}

	_handleSave = ()=>{
		let carousel = this.state.carousel.join(',')
		if(!carousel){
			message.error('图片未改动');
			return;
		}
		let bodyquery = 'carousel=' + carousel;
		console.log(bodyquery);
		fetch(config.api + '/setCarousel', {
			method: 'post',
			mode: 'cors',
			body: bodyquery,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then( res => res.json())
		.then((data)=>{
			if(data.status == 200){
				message.success(data.message)
			}else{
				message.error(data.message);
			}
		})
	}
}