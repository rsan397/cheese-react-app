import React from "react";
import ResultBox from "./ResultBox";
import AnswerBox from "./AnswerBox";

export class SearchBar extends React.Component{
	constructor() {
		super();
		this.myRef = React.createRef();
		this.state = {
			query: "",
			results: [],
			answer: [],
			cursor: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.getData = this.getData.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	componentDidMount(){
		//instantiate network request
		let searchUrl = "https://cheese-pg-server.herokuapp.com/"
		fetch(searchUrl)
	}

	handleChange (event) {
		const value = event.target.value
		this.setState({
			query: value
		})
	}

	componentDidUpdate(prevProps, prevState){
		let respArray = []
		let searchValue = "cheese/" + this.state.query
		let searchUrl = "https://cheese-pg-server.herokuapp.com/" + searchValue
		fetch(searchUrl)
			.then(response => response.json())
			.then((data) => {
				var x
				for (x= 0; x<data.rows.length; x++){
					//console.log(data.rows[x])
					respArray.push(data.rows[x])
				}
			})
			.then(response => {
				let jsonArray = JSON.stringify(respArray)
				let jsonState = JSON.stringify(this.state.results)
				if (jsonArray !== jsonState){
					this.setState({
						results: respArray
					})
				}
			})	//console.log(this.state.results)
	}

	handleKeyDown(event){
		console.log(this.myRef.current)
		let feedback = this.myRef.current.focus()
		console.log("feedback ", feedback)
		const {cursor, results} = this.state
		console.log(event.key)
		console.log(this.state.cursor)
		if(event.key === 'ArrowUp' && cursor > 0){
			this.setState(prevState => ({
				cursor: prevState.cursor - 1
			}))
		} else if (event.key === 'ArrowDown' && cursor < results.length -1){
			this.setState (prevState => ({
				cursor: prevState.cursor +1
			}))
		}
	}

	getData(value, number){
		console.log(value)
		console.log(number)

		this.setState({
			query: value.description,
			answer: value,
			index: number
		})
	}

	// handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	//finalQuery = parameter[this.state.index].description
	// 	//finalAnswer = parameter[this.state.index]

	// 	// this.setState({
	// 	// 	query: finalQuery,
	// 	// 	answer: finalAnswer
	// 	// })
	// }

	render(){
		var renderResults;
		if (this.state.query !== this.state.answer.description){
			renderResults = this.state.results.map((item, x) => <ResultBox item={item} key={x} number={x} sendData={this.getData}/>)
		} else {
			renderResults = <AnswerBox item={this.state.answer}/>
		}
		

		return (
			<div>
	    	<table>
	    	<tbody>
	    	<tr ref={this.myRef}>
	    	<td>
	        	<input
	          		type="text"
	          		//autoFocus
	          		value = {this.state.query}
					placeholder = "Search for a product, brand, or location to buy..."
					onChange = {this.handleChange}
					onKeyDown={this.handleKeyDown}
	        	/>
	        </td>
	        </tr>
	      		{renderResults}
	      	</tbody>
	      	</table>
	      	</div>
		)
	}
}

export default SearchBar;


