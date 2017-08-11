import React from 'react'
import GalleryBlock from './GalleryBlock'
import {Icon} from 'antd'
import './galleryList.scss'

export default class GalleryList extends React.Component{
	render(){
		return(
			<div className="galleryList">
				<GalleryBlock style={{...this.props.style}}/>
				<AddBlock style={{...this.props.style}} addClick={this.props.addClick}/>
			</div>
		)
	}
}

class AddBlock extends React.Component{
	render(){
		return(	
			<div className="block addBlock" style={{...this.props.style}}>
				<div className="addBlock-wrapper wrapper">
					<div className="mask">
						<div className="mask-icon-bar">
							<Icon type="plus" className='mask-icon' onClick={this.props.addClick}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}