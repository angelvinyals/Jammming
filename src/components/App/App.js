import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	searchResults: [
	    		{	
	    			id:'1',
	    			name:'nom1',
	    			artist:'artista',
	    			album:'album'
	    		}  		
	    	] ,
	    	playlistName:'',
	    	playlistTracks:[
	    		{
	    			id:'2',
	    			name:'nom2',
	    			artist:'2artista',
	    			album:'2album'
	    		}
	    	]
	    };
	    this.addTrack=this.addTrack.bind(this)
	    this.removeTrack=this.removeTrack.bind(this)
	    this.updatePlayListName=this.updatePlayListName.bind(this)
	    this.savePlaylist=this.savePlaylist.bind(this)
	    this.search=this.search.bind(this)
	}

	addTrack(track){
		console.log('addTrack');
		console.log('track: ',track);
		console.log('playlistTracks: ',this.state.playlistTracks);
		let isTrk = false;
		this.state.playlistTracks.map(trk =>{
			if(trk.id === track.id) {return isTrk=true}
		})
		if (!isTrk){
			return this.setState({ playlistTracks: [...this.state.playlistTracks, track]})	
		}

	}
	removeTrack(track){
		console.log('entrant a removeTrack amb: ', track);
		// Filter all todos except the one to be removed
		const remainder = this.state.playlistTracks.filter((trk) => {
	      if(trk.id !== track.id) return trk;
	    });
	    // Update state with filter
	    this.setState({playlistTracks: remainder});

	}

	updatePlayListName(name){
		console.log('updatePlayListName :', name);
		this.setState({playlistName: name});
	}
	
	savePlaylist(){
		let trackURIs=[];
		this.playlistTracks.map((trk) => {trackURIs.push(trk.uri)})
	}
	
	/*
	search = async(term) => {
	    try {
	      const res = await Spotify.search(term)
	      
	      this.setState({ res })
	    } catch (error) {
	      console.log(error)
	    } 
	}
	*/
	
	async search(term){
		console.log('APP search begin..................term:,',term)
		try{
			let resp= await Spotify.search(term)
			if(resp){
				console.log('APP SEARCH response: ');
			}

		}
		catch(error){
			console.log(error);
		}
		

/*
		.then( searchResults =>{
			console.log('SEARCH----abans de setState');
			console.log('searchResults: ',searchResults);
        	this.setState({
          		searchResults: searchResults
        	})
    	})

 */   	
	}	
	
    	
  	
	

	

  	render() {
    	return (
	      	<div>
			  	<h1>Ja<span className="highlight">mmm</span>ing</h1>
			  	<div className="App">
			    	{/*<!-- Add a SearchBar component -->*/}
			    	<SearchBar
			    		onSearch={this.search}
			    	/>
			    	<div className="App-playlist">
			      		{/*<!-- Add a SearchResults component -->*/}
			      		<SearchResults 
			      			searchResults={this.state.searchResults} 
			      			onAdd={this.addTrack}
			      		/>
			      		{/*<!-- Add a Playlist component -->*/}
			      		<Playlist 
			      			playlistName={this.state.playlistName} 
			      			playlistTracks={this.state.playlistTracks}
			      			onRemove={this.removeTrack}
			      			onNameChange={this.updatePlayListName}
			      			onSave={this.savePlaylist}
			      		/>
			    	</div>
			  	</div>
			</div>
    );
  }
}

export default App;
