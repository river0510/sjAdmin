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
	        <SubMenu key="sub1" title={<span>部门概况</span>}>
	          <Menu.Item key="1"><Link to='/addArticle' >部门概况</Link></Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub2" title={<span>通知公告</span>}>
	          <Menu.Item key="2"><Link to='/addArticle'>通知公告</Link></Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub3" title={<span>工作动态</span>}>
	          <Menu.Item key="3">财务审计</Menu.Item>
	          <Menu.Item key="4">工程审计</Menu.Item>
	          <Menu.Item key="5">学习交流</Menu.Item>
	        </SubMenu>
			<SubMenu key="sub4" title={<span>政策法规</span>}>
	          <Menu.Item key="6">政策法规</Menu.Item>
	        </SubMenu>
			<SubMenu key="sub5" title={<span>资料下载</span>}>
	          <Menu.Item key="7"><Link to='/addArticle'>上级文件</Link></Menu.Item>
	          <Menu.Item key="8">校内制度</Menu.Item>
	          <Menu.Item key="9">校内文件</Menu.Item>
	        </SubMenu>
			<SubMenu key="sub6" title={<span>首页顶部</span>}>
	          <Menu.Item key="10">顶部链接</Menu.Item>
	        </SubMenu>
			<SubMenu key="sub7" title={<span>首页底部</span>}>
	          <Menu.Item key="11">友情链接</Menu.Item>
	          <Menu.Item key="12">联系我们</Menu.Item>
	          <Menu.Item key="13">其他</Menu.Item>
	          <Menu.Item key="14">版权所有</Menu.Item>
	        </SubMenu>	
			<SubMenu key="sub8" title={<span>轮播图</span>}>
	          <Menu.Item key="15">首页背景图</Menu.Item>
	          <Menu.Item key="16">首页轮播图</Menu.Item>
	        </SubMenu>	                               
	      </Menu>
		);
	}
}