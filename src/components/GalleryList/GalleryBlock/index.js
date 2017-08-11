import React from 'react'
import {Icon} from 'antd'

export default class GalleryBlock extends React.Component{
	render(){
		return(
			<div className='galleryBlock block'>
				<div className="galleryBlock-wrapper wrapper">
					<img src="" alt="" style={{width: '100%',height: '100%'}}/>
					<div className="mask">
						<div className="mask-icon-bar">
							<Icon type="eye-o" className='mask-icon'/>
							<Icon type="edit" className='mask-icon'/>
							<Icon type="delete" className='mask-icon'/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}