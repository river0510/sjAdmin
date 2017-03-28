import React from 'react'
import {
  Menu,
  Icon
} from 'antd'

import './Header.scss'

export default class Header extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        className="header-menu"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />审计后台管理系统
        </Menu.Item>
      </Menu>
    );
  }
}