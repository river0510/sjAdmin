import React from 'react'
import GalleryBlock from './GalleryBlock'
import {Icon} from 'antd'
import './galleryList.scss'

// props {addClick 添加图片点击回调， img 图片数组 ， maxNumber 最大展示图片数}
export default class GalleryList extends React.Component{
	render(){
		let {addClick, img, maxNumber, style} = this.props,
			addBlock, galleryBlocks = [];
		if(maxNumber){
			addBlock = img.length >= maxNumber ? null : <AddBlock style={{style}} addClick={addClick}/>
		}else{
			addBlock = <AddBlock style={{style}} addClick={addClick}/>
		}

		galleryBlocks = img.map((value,index)=>
			<GalleryBlock style={{...style}} img={value} key={index}/>
		)
		return(
			<div className="galleryList">
				{galleryBlocks}
				{addBlock}
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