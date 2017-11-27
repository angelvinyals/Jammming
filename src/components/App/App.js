import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import NoResults from '../NoResults/NoResults'
import Playlist from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	searchResults: [] ,
	    	playlistName:'',
	    	playlistTracks:[]
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
	
	async savePlaylist(){
		console.log(' APP entering savePlaylist m:')


		try{
			let trackURIs=[];
			let name=''

			if(this.state.playlistTracks.length>0){
				this.state.playlistTracks.map((trk) => {trackURIs.push(trk.uri); return ''})
				console.log('trackURIs',trackURIs);
			} else{
				console.log('There is NO tracks in  playlistTracks')
				return
			}			

			if(this.state.playlistName){
				name=this.state.playlistName
				console.log('playlistName',name);
			} else {
				console.log('There is NO name')
				alert('Give a name to Play List, before SAVE.')
				return
			}			

			let resp= await Spotify.savePlaylist(name, trackURIs)
			console.log('HandelSearch in APP ... resp :', resp)
			if(resp.ok){				
				console.log(`APP SEARCH response: ${resp.ok}`);
				console.log('Playlist saved')
				return 
			} else {
				console.log('there is a problemm with saving playing list to Spotify', resp.status)
				return
			}
		}
		catch(error){
			console.log(error);
		}		
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
	}	
	  	
  	render() {
  		let srchResults;
  		if(this.state.searchResults.length>0){
  			srchResults = <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
  		} else {
  			srchResults = <NoResults >NO RESULTS</NoResults>
  		}
    	return (
	      	<div>
			  	<h1>Ja<span className="highlight">mmm</span>ing</h1>
			  	<div className="App">
			    	
			    	<SearchBar
			    		onSearch={this.handleSearch}
			    	/>
			    	<div className="App-playlist">
			      		{srchResults}
			      		
			      		
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
