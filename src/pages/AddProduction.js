import React from 'react'
import ProductionBlock from '../components/ProductionBlock'
import config from '../config'

export default class AddProduction extends React.Component{
	state = {
		productions: []
	}
	componentDidMount(){
		this._getProduction();
	}
	render(){
		let {productions} = this.state;
		let production = productions.map( value => 
			<ProductionBlock imgUrl={value.imgUrl} content={value.introduce_CN} _id={value._id} key={value._id}/>
		)
		return(
			<div> 
				{production}
			</div>
		)
	}

	_getProduction = ()=>{
		fetch(config.api + '/getProduction',{
			method: 'get',
			mode: 'cors',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
		}).then(res => res.json())
		.then((data)=>{
			if(data.status == 200){
				this.setState({productions: data.production})	
			}
		})
	}
}

