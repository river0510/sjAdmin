import React from 'react'
import GalleryBlock from './GalleryBlock'
import {Icon} from 'antd'
import './galleryList.scss'

export default class GalleryList extends React.Component{
	render(){
		return(
			<div className="galleryList">
				<GalleryBlock />
				<AddBlock/>
			</div>
		)
	}
}

class AddBlock extends React.Component{
	render(){
		return(	
			<div className="block addBlock">
				<div className="addBlock-wrapper wrapper">
					<div className="mask">
						<div className="mask-icon-bar">
							<Icon type="plus" className='mask-icon'/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}