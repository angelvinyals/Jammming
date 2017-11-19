import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends Component {
  render() {
    return (
      	<div className="TrackList">
		    {/*<!-- You will add a map method that renders 
		    a set of Track components  -->*/}
		    <ul>
		    {this.props.tracks.map((trk)=>{
		    	return (
		    		<li key={trk.id}>
		    			<Track 
		    				track={trk} 
		    				onAdd={this.props.onAdd}
		    				onRemove={this.props.onRemove}
		    				isRemoval={this.props.isRemoval}
		    			/>
		    		</li>
		    	)}
		    )}
		    </ul>
		</div>
    );
  }
}

export default TrackList;