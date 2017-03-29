import React from 'react'
import {
	Table,
	Icon,
	Modal,
	Button,
	Form,
	Input
} from 'antd'
import ModifyPass from './ModifyPass'
import CreateUser from './CreateUser'
import './Account.scss'
const confirm = Modal.confirm
const FormItem = Form.Item

export default class AccountComponent extends React.Component {
	delete(key, e) {
		e.preventDefault();
		e.stopPropagation();
		confirm({
			title: '确定要删除吗?',
			content: '删除的账号将无法登陆',
			onOk() {

			},
			onCancel() {}
		});
	}
	render() {
		const columns = [{
			title: '用户名',
			dataIndex: 'userName',
			key: 'userName',
		}, {
			title: '密码',
			dataIndex: 'password',
			key: 'password',
		}, {
			title: '权限',
			dataIndex: 'role',
			key: 'role',
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
				<span>
					<Button type="danger" onClick={this.delete.bind(this,record.key)}>
						删除
					</Button>
				</span>
			),
		}]
		const data = [{
			key: '1',
			userName: 'admin',
			password: 'admin',
			role: '超级管理员'
		}]
		return (
			<div>
				<div className='account-top'>
					<span>当前账户:{sessionStorage.userName}</span>
					<ModifyPass />				
				</div>
				<CreateUser />
				<Table className="table" columns={columns} dataSource={data} />
			</div>

		)
	}
}