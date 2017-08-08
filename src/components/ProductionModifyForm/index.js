import React from 'react'
import UploadImg from '../UploadImg'
import {Input, Button, message} from 'antd'
import './productionModifyForm.scss'
import config from '../../config'

class ProductionModifyForm extends React.Component{
	state = {
		imgUrl: null,
		introduce_CN: null,
		introduce_EN: null,
		_id: null,
	}

	componentDidMount(){
		this._getProduction();
	}

	render(){
		let {introduce_CN, introduce_EN} = this.state;
		return(
			<div className='productionModifyForm'>
				<p>产品图片：</p>
				<UploadImg maxNumber={1} uploadType='production' handleImg={this._handleImg}/>
				<p>产品中文介绍：</p>
				<Input type='textarea' placeholder="中文产品介绍" value={introduce_CN} autosize={{ minRows: 4, maxRows: 10 }} onChange={this._handleChange_CN}/>
				<p>产品英文介绍：</p>
				<Input type='textarea' placeholder="英文产品介绍" value={introduce_EN} autosize={{ minRows: 4, maxRows: 10 }} onChange={this._handleChange_EN}/>
				<Button type='primary' className='button' onClick={this._save}>保存</Button>
			</div>
		)
	}

	_handleImg = (img)=>{
		let imgUrl = img[0] && img[0].url;
		this.setState({
			imgUrl
		})
	}

	_handleChange_CN = (e)=>{
		let introduce_CN = e.target.value;
		this.setState({
			introduce_CN
		})
	}

	_handleChange_EN = (e)=>{
		let introduce_EN = e.target.value;
		this.setState({
			introduce_EN
		})
	}

	_save = ()=>{
		let {imgUrl, introduce_EN, introduce_CN, _id} = this.state;
		let bodyquery = `imgUrl=${imgUrl}&introduce_CN=${introduce_CN}&introduce_EN=${introduce_EN}&_id=${_id}`;
		fetch(config.api + '/setProduction',{
			method: 'post',
			mode: 'cors',
			body: bodyquery,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				message.success(data.message)
				this.context.router.push('/addProduction')
			}else{
				message.error(data.message)
			}
		})
	}

	_getProduction = ()=>{
		fetch(config.api + '/getProduction?_id=' + this.props.productionId,{
			method: 'get',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				let {imgUrl, introduce_CN, introduce_EN, _id} = data.production;
				this.setState({
					imgUrl,
					introduce_CN,
					introduce_EN,
					_id
				})
			}
		})
	}
}

ProductionModifyForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default ProductionModifyForm;