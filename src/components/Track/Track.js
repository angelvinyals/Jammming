import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
	constructor(props) {
	    super(props);
	    
	    this.addTrack = this.addTrack.bind(this)
	    this.removeTrack = this.removeTrack.bind(this)
	  }

	renderAction(){
		{/*displays a - anchor tag if the isRemoval property is true, 
		and a + anchor tag if the isRemoval property is false. 
		Set the class name to Track-action.*/}
		if(this.props.isRemoval){
			return <span onClick={this.removeTrack}>-</span>
		}
		return <span onClick={this.addTrack}>+</span>
	}

	addTrack(event){
		console.log(this.props.track);
		this.props.onAdd(this.props.track)
		event.preventDefault();
		
	}

	removeTrack(e){
		console.log(this.props.track);
		this.props.onRemove(this.props.track)
		
		
	}

  	render() {
    	return (
	      	<div className="Track">
				<div className="Track-information">
					<h3>{/*<!-- track name will go here -->*/}{this.props.track.name}</h3>
					<p>{/*<!-- track artist will go here--> | <!-- track album will go here -->*/}{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				<a className="Track-action" >{this.renderAction()}</a>
			</div>
	    );
  	}
}

export default Track;