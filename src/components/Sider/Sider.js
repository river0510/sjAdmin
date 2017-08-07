import React from 'react'
import {
	Link
} from 'react-router'
import {
	Menu,
	Icon
} from 'antd'
const SubMenu = Menu.SubMenu;
import './Sider.scss'

export default class Sider extends React.Component {
	state = {
		current: '1',
		openKeys: [],
	}
	handleClick = (e) => {
		console.log('Clicked: ', e);
		this.setState({
			current: e.key
		});
	}
	onOpenChange = (openKeys) => {
		const state = this.state;
		const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
		const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = this.getAncestorKeys(latestCloseKey);
		}
		this.setState({
			openKeys: nextOpenKeys
		});
	}
	getAncestorKeys = (key) => {
		const map = {

		};
		return map[key] || [];
	}
	render() {
		return (
			<Menu
	        mode="inline"
	        openKeys={this.state.openKeys}
	        selectedKeys={[this.state.current]}
	        style={{ width: 240 }}
	        onOpenChange={this.onOpenChange}
	        onClick={this.handleClick} 
	        className="sider"
	      >
	        <SubMenu key="sub1" title={<span>官网首页</span>}>
	          <Menu.Item key="1"><Link to='/addCarousel'>轮播图</Link></Menu.Item>
	          <Menu.Item key="2"><Link >产品介绍</Link></Menu.Item>
	          <Menu.Item key="3"><Link >页尾链接</Link></Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub2" title={<span>体验馆</span>}>
	          <Menu.Item key="4"><Link >体验馆</Link></Menu.Item>
	        </SubMenu>                             
	      </Menu>
		);
	}
}