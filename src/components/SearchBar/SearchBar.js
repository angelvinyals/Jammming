import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	search:''
	    }
	    
	    // This binding is necessary to make `this` work in the callback
	    this.search = this.search.bind(this);
	    this.handleTermChange = this.handleTermChange.bind(this);
	}

	search(){
		this.props.onSearch(this.state.search)
	}

	handleTermChange(e){
		e.preventDefault()
		console.log('handleTermChange event',e.target.value);
		this.setState({search: e.target.value})
	}

  	render() {
    	return (
      		<div className="SearchBar">
		  		<input 
		  			placeholder="Enter A Song" 
		  			onChange={this.handleTermChange}
		  		/>
		  		<a
		  			onClick={this.search}
		  		>
		  		SEARCH</a>
			</div>
    	);
  	}
}

export default SearchBar;