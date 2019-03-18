import React from "react";

export class ResultBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {}
	}

	handleClick = (parameter, number) => (event) => {
		//console.log('child', parameter, number)
		this.props.sendData(parameter, number)
	}

	handleKeyPress = (parameter, number) => (event) => {
		if(event.key === 'Enter'){
			console.log('child', parameter, number)
			this.props.sendData(parameter, number)
		}
	}

	render(){
		return (
			<tr>
			<td tabIndex={this.props.number} onClick={this.handleClick(this.props.item, this.props.number)} onKeyPress={this.handleKeyPress(this.props.item, this.props.number)}>
				{this.props.item.description}
			</td>
			</tr>
		)
	}
}

export default ResultBox;