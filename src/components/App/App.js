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
	    this.handleSearch=this.handleSearch.bind(this)
	}

	addTrack(track){
		console.log('addTrack');
		console.log('track: ',track);
		console.log('playlistTracks: ',this.state.playlistTracks);
		let isTrk = false;
		this.state.playlistTracks.map(trk =>{
			if(trk.id === track.id) {return isTrk=true}
			return ''	
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
	      return ''
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
		this.playlistTracks.map((trk) => {trackURIs.push(trk.uri); return ''})
		return ''
	}
		
	async handleSearch(term){
		console.log('APP search begin..................term:,',term)

		try{
			let resp= await Spotify.search(term)
			console.log('HandelSearch in APP ... resp :', resp)
			if(resp){
				console.log('APP SEARCH response: ', resp);
				return this.setState({ searchResults: resp })
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
			    	
			    	<SearchBar
			    		onSearch={this.handleSearch}
			    	/>
			    	<div className="App-playlist">
			      		
			      		<SearchResults 
			      			searchResults={this.state.searchResults} 
			      			onAdd={this.addTrack}
			      		/>
			      		
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
