import React from "react";

export class AnswerBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {}
	}

	render(){
		let product = this.props.item.description
		let lactose = parseInt(this.props.item.lactose)
		let sugar = parseInt(this.props.item.sugars)
		let textString = ""
		if (lactose <= 2){
			textString = "Contains less than 2% lactose! This " + product + " is safe!"
		}
		else if (sugar <= 3){
			textString = "Contains less than 3% lactose! This " + product + " is probably safe!"
		}
		else {
			textString = "Contains more than 2% lactose! " + product + " is not safe!"
		}
		return (
			<tr>
			<td>
	        	<h1>
	        		{product}
	        	</h1>
	        	<p>
	        		{textString}
	        	</p>
	      	</td>
	      	</tr>
		)
	}
}

export default AnswerBox;