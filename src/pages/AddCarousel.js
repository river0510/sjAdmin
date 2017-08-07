import React from 'react'
import UploadPic from '../components/UploadPic/UploadPic'

export default class AddCarousel extends React.Component {
	render() {
		const fileList = [{
			uid: -1,
			name: 'xxx.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		}]
		return (
			<div style={{height:"100%"}}>
				<UploadPic uploadType='carousel' fileList={fileList} multiple/>
			</div>
		)
	}
}