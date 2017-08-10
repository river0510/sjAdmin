import React from 'react'
import {Table, Icon, Select, Button, message, Modal, Input} from 'antd'
const {Option} = Select;
import config from  '../../config'

export default class FooterLinkList extends React.Component{
	state = {
		selectedKey: 1,
		linkData: [],
		linkModalVisible: false,
		modifyLink: {}
	}
	
	componentDidMount(){
		this._getLinkData();
	}

	render(){
		const columns = [
			{
				title: '链接中文名称',
				dataIndex: 'linkName_CN',
				key: 'linkName_CN'
			},{
				title: '链接英文名称',
				dataIndex: 'linkName_EN',
				key: 'linkName_EN'
			},{
				title: '链接URL',
				dataIndex: 'linkURL',
				key: 'linkURL'
			},{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<div>
						<Icon type="edit" onClick={()=>{
								console.log(record);
								this.setState({
									modifyLink: record
								},this._showLinkModal)
							}
						}/>
						<span className='ant-divider'></span>
						<Icon type="delete" onClick={this._deleteLink.bind(this,record.linkId)}/>
					</div>
				)
			}
		]
		let {selectedKey, linkData, linkModalVisible, modifyVisible, modifyLink} = this.state;
		return(
			<div className='table'>
				<div className='top-bar' style={{margin: '10px 0'}}>
					<Select style={{ width: 120}} defaultValue='1' onChange={this._handleSelectChange}>
						<Option value='1'>客户关系</Option>
						<Option value='2'>实体店</Option>
						<Option value='3'>公司</Option>
						<Option value='4'>法律声明</Option>
						<Option value='5'>关注我们</Option>
					</Select>
					<Button style={{margin: '0 10px'}} type='primary' onClick={()=>{this.setState({linkModalVisible:true})}}>添加</Button>
				</div>
				<Table  columns={columns} dataSource={linkData}/>
				<LinkModal onOk={this._onOkLinkModal} onCancel={this._onCancelLinkModal} visible={linkModalVisible} selectedKey={selectedKey} modifyLink={modifyLink}/>
			</div>
		)
	}

	_handleSelectChange = (value) =>{
		this.setState({
			selectedKey: value
		},this._getLinkData)
	}

	_getLinkData = ()=>{
		fetch(config.api + '/getLinkData?key=' + this.state.selectedKey, {
			method: 'get',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				let linkData = data.linkData.map((value,index)=> {value.key = index; return value});
				this.setState({ linkData })
			}else{
				message.error('数据获取失败')
			}
		})
	}

	_showLinkModal = ()=>{
		this.setState({
			linkModalVisible: true
		})
	}

	_onOkLinkModal = () => {
		this.setState({
			linkModalVisible: false,
			modifyLink: {}
		},this._getLinkData)
		
	}

	_onCancelLinkModal = () => {
		this.setState({
			linkModalVisible: false,
			modifyLink: {}
		})
	}

	_deleteLink(id){
		fetch(config.api + `/delLink?key=${this.state.selectedKey}&linkId=${id}`, {
			method: 'get',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				this._getLinkData();
				message.success(data.message)
			}else{
				message.error(data.message)
			}
		})
	}
}

class LinkModal extends React.Component{
	state = {
		linkName_CN: null,
		linkName_EN: null,
		linkURL: null
	}

	render(){
		let {onOk, onCancel, visible, selectedKey, modifyLink} = this.props;
		let {linkName_CN, linkName_EN, linkURL, linkId} = modifyLink;

		return(
			<Modal title='添加链接' visible={visible} 
				onOk={this._handleOk} 
				onCancel={()=>{onCancel(); this._cleanInput();}}>
				<span>链接中文名</span>
				<Input value={this.state.linkName_CN === null ? linkName_CN : this.state.linkName_CN} placeholder='中文名称' onChange={e=>{this.setState({linkName_CN: e.target.value})}}/>
				<span>链接英文名</span>
				<Input value={this.state.linkName_EN === null ? linkName_EN : this.state.linkName_EN } placeholder='英文名称' onChange={e=>{this.setState({linkName_EN: e.target.value})}}/>
				<span>链接URL</span>
				<Input value={this.state.linkURL === null ? linkURL : this.state.linkURL } placeholder='链接' onChange={e=>{this.setState({linkURL: e.target.value})}}/>
			</Modal>
		)
	}

	_handleOk = () => {
		let {linkName_CN, linkName_EN, linkURL} = this.state,
			{modifyLink, selectedKey} = this.props;
		//如果modifyLink.linkId 存在 则为修改，否则为添加
		if(modifyLink.linkId){
			if(!linkName_CN || !linkName_EN || !linkURL){
				message.error('不能为空');
				return;
			}

			let body = `linkName_CN=${linkName_CN || modifyLink.linkName_CN}&linkName_EN=${linkName_EN || modifyLink.linkName_EN}&linkURL=${linkURL || modifyLink.linkURL}&linkId=${modifyLink.linkId}&selectedKey=${selectedKey}`
			fetch(config.api + '/modifyLink',{
				method: 'post',
				mode: 'cors',
				body: body,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
			}).then(res=>res.json())
			.then((data)=>{
				if(data.status == 200){
					message.success(data.message);
				}else{
					message.error(data.message)
				}
			})
		}else{
			if(!linkName_CN || !linkName_EN || !linkURL){
				message.error('不能为空');
				return;
			}
			
			let body = `linkName_CN=${linkName_CN}&linkName_EN=${linkName_EN}&linkURL=${linkURL}&selectedKey=${selectedKey}`
			fetch(config.api + '/addLink',{
				method: 'post',
				mode: 'cors',
				body: body,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
			}).then(res=>res.json())
			.then((data)=>{
				if(data.status == 200){
					message.success(data.message);
				}else{
					message.error(data.message)
				}
			})
		}

		this.props.onOk();
		this._cleanInput();
	}

	_cleanInput = () => {
		this.setState({
			linkName_CN: null,
			linkName_EN: null,
			linkURL: null
		})
	}
}
