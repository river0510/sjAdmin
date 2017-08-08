import React from 'react'
import ProductionModifyForm from '../components/ProductionModifyForm'

export default class ModifyProduction extends React.Component{
	render(){
		return(
			<div>
				<ProductionModifyForm productionId={this.props.params.productionId}/>
			</div>
		)
	}
}

