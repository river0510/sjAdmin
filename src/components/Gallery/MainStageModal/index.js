import React from 'react'
import {Modal} from 'antd'
import UploadImg from '../../UploadImg'

// props {visible onOk onCancel handleImg}
export default class extends React.Component{
	render(){
		let {visible, onOk, onCancel, handleImg} = this.props; 
		return(
			<Modal visible={visible} onOk={onOk} onCancel={onCancel}>
				<UploadImg maxNumber={1} uploadType='gallery' handleImg={handleImg}/>
			</Modal>
		)
	}
}