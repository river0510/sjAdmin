import React from 'react'
import './LoginForm.scss';
import {
	Form,
	Icon,
	Input,
	Button,
	Checkbox,
	message
} from 'antd';
import {
	Link
} from 'react-router';
import config from '../../config'
const FormItem = Form.Item;


class Login extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let bodyquery = "userName=" + values.userName + "&password=" + values.password;
				fetch(config.api + '/login', {
					method: 'post',
					mode: 'cors',
					body: bodyquery,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
				}).then((res) => {
					return res.json();
				}).then((data) => {
					if (data.status == 200) {
						message.success(data.message);
						sessionStorage.setItem('token', data.token);
						this.context.router.push('/');
					} else {
						message.error(data.message);
					}
				}).catch(err => console.log(err))
			}
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return (
			<div className='login-wrapper'>
			  <h2>审计后台管理系统</h2>
			  <Form onSubmit={this.handleSubmit} className="login-form">
		        <FormItem>
		          {getFieldDecorator('userName', {
		            rules: [{ required: true, message: '请输入用户名!' }],
		          })(
		            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
		          )}
		        </FormItem>
		        <FormItem>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: '请输入密码!' }],
		          })(
		            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
		          )}
		        </FormItem>
		        <FormItem>
		          <Button type="primary" htmlType="submit" className="login-form-button">
		            登陆
		          </Button>
		          <Button type="primary" className="login-form-button">
		            <Link to='/signup'>注册</Link>
		          </Button>
		        </FormItem>	        
		      </Form>
      		</div>
		);
	}
}
Login.contextTypes = {
	router: React.PropTypes.object.isRequired
};
Login = Form.create()(Login);
export default Login;