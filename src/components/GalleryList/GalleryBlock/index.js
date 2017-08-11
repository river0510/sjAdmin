import React from 'react'
import {Icon, Modal} from 'antd'

export default class GalleryBlock extends React.Component{
	state = {
		previewVisible: false
	}
	render(){
		return(
			<div className='galleryBlock block' style={{...this.props.style}}>
				<div className="galleryBlock-wrapper wrapper">
					<img src="" alt="" style={{width: '100%',height: '100%'}}/>
					<div className="mask">
						<div className="mask-icon-bar">
							<Icon type="eye-o" className='mask-icon' onClick={this._showPreview}/>
							<Icon type="edit" className='mask-icon'/>
							<Icon type="delete" className='mask-icon'/>
						</div>
					</div>
				</div>
				<Modal visible={this.state.previewVisible} footer={null} onCancel={this._handleCancel}>
		          <img alt="example" style={{ width: '100%' }} />
		        </Modal>
			</div>
		)
	}

	_handleCancel = ()=>{
		this.setState({
			previewVisible: false
		})
	}

	_showPreview = ()=>{
		this.setState({
			previewVisible: true
		})
	}
}