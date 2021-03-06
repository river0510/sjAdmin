import React from 'react'
import Header from '../components/Header/Header'
import Sider from '../components/Sider/Sider'
import './home-layout.scss'

class HomeLayout extends React.Component {
	componentWillMount() {
		if (sessionStorage.userName == null) {
			this.context.router.push('/login');
		}
	}
	render() {
		let content = this.props.children;
		return (
			<div>
				<Header/>
				<Sider/>
				<div className="content">
					{content}
				</div>
			</div>
		)
	}
}
HomeLayout.contextTypes = {
	router: React.PropTypes.object.isRequired
};
export default HomeLayout