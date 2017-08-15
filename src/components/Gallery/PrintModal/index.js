import React from 'react'
import {Modal, Input} from 'antd'
import UploadImg from '../../UploadImg'

// props {visible onOk onCancel handlePrintThumbnailImg handlePrintStageImg handlePrintHoverStageImg handleCommodityId}
export default class extends React.Component{
	render(){
		let {visible, onOk, onCancel, handlePrintThumbnailImg, handlePrintStageImg, handlePrintHoverStageImg, handleCommodityId, commodityId} = this.props;
		return(
			<Modal visible={visible} onOk={onOk} onCancel={onCancel}>
				<p>缩略图</p>
				<UploadImg maxNumber={1} uploadType='gallery' handleImg={handlePrintThumbnailImg}/>
				<p>场景图</p>
				<UploadImg maxNumber={1} uploadType='gallery' handleImg={handlePrintStageImg}/>
				<p>鼠标悬停预览图</p>
				<UploadImg maxNumber={1} uploadType='gallery' handleImg={handlePrintHoverStageImg}/>
				<p>关联商品ID</p>
				<Input value={commodityId} onChange={handleCommodityId}/>
			</Modal>
		)
	}
}