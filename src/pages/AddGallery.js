import React from 'react'
import GalleryList from '../components/GalleryList'

export default class AddGallery extends React.Component{
	render(){
		return(
			<div>
				<p>主图</p>
				<GalleryList/>
				<p>产品图</p>
				<GalleryList/>
			</div>
		)
	}
}