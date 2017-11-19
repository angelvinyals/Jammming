import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends Component {

	constructor(props) {
	    super(props);
	    

	    // This binding is necessary to make `this` work in the callback
	    this.handleNameChange = this.handleNameChange.bind(this);
	  }

	handleNameChange(event){
		event.preventDefault();
		let newName= event.target.value
		console.log('handleNameChange', newName)
		this.props.onNameChange(newName)
		 
	}

  	render() {
    	return (
      		<div className="Playlist">
				<input 
					defaultValue={'New Playlist'}
					onChange={this.handleNameChange}	
				/>
				{/*<!-- Add a TrackList component -->*/}
				<TrackList  
					tracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemoval={true}
				/>
				<a 
					className="Playlist-save"
					onClick={this.props.onSave}
				>
				SAVE TO SPOTIFY</a>
			</div>
    	);
  	}
}

export default Playlist;