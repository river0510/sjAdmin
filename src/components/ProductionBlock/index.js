import React from 'react'
import {Icon, Modal} from 'antd'
import {Link} from 'react-router'
import './productionBlock.scss'

export default class ProductionBlock extends React.Component{

	render(){
		let {imgUrl, content} = this.props;
		return(
			<div className='productionBlock'>
				<figure className='productionBlock-wrapper'>
					<img src={imgUrl} alt="" />
					<figcaption>{content}</figcaption>
					<div className='productionBlock-mask'>
						<div className='mask-icon-bar'>
							<Link to={'/addProduction/'+this.props._id}><Icon type="edit" className='mask-icon'/></Link>
							<Icon type="delete" className='mask-icon'/>
						</div>
					</div>
				</figure>
			</div>
		)
	}

}
