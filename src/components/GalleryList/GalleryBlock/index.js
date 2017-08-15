import React from 'react'
import {Icon, Modal} from 'antd'

// props {img 图片对象（thumbnail stageImg） }
export default class GalleryBlock extends React.Component{
	state = {
		previewVisible: false
	}
	render(){
		let {img, style} = this.props;
		return(
			<div className='galleryBlock block' style={{...style}}>
				<div className="galleryBlock-wrapper wrapper">
					<img src={img && (img.thumbnail || img.stageImg)} alt="" style={{width: '100%',height: '100%'}}/>
					<div className="mask">
						<div className="mask-icon-bar">
							<Icon type="eye-o" className='mask-icon' onClick={this._showPreview}/>
							<Icon type="edit" className='mask-icon'/>
							<Icon type="delete" className='mask-icon'/>
						</div>
					</div>
				</div>
				<Modal visible={this.state.previewVisible} footer={null} onCancel={this._handleCancel}>
		          <img src={img && img.stageImg} alt="example" style={{ width: '100%' }} />
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