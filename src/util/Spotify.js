const clientID='ef4013b061ed49d6b107a170fbe84e5c';
const redirectURI='http://localhost:3000/callback'
let accessToken='';
let state=''



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/*
 * JavaScript Get URL Parameter
 * 
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of alproperties is returned
 */
const getUrlParams =( prop )=> {
	console.log(`Entering getUrlParams`)
    var params = {};    
    //var urex='https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123'
    //console.log('urex',urex);
    //console.log('');
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '#' ) + 1 ) );
    //var search = urex.slice(urex.indexOf( '#' ) + 1 );
    var definitions = search.split( '&' );

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );
    console.log (`getUrlParams ... prop= ${prop}`)
    return ( prop && prop in params ) ? params[ prop ] : params;
    /*
	for this urex= 'https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123'
		returns:
		{ access_token: 'NwAExz...BV3O2Tk',
		  token_type: 'Bearer',
		  expires_in: '3600',
		  state: '123' }
	*/
};




export const Spotify={
		
	getAccessToken(){
		console.log(`Entering SPOTIFY.JS getAccessToken `)
		if (accessToken){
			console.log(`YES, there is accesToken : ${accessToken}`);
			return accessToken;
		}
		console.log('there is NOT accesToken');
		state=generateRandomString(8);
		console.log('generate state= ',state)
		const accessUrl = `https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      	console.log(`accessUrl to get token= ${accessUrl}`)
      	fetch(accessUrl)
      	.then(response => {
      		let urlRes = getUrlParams();
			console.log('urlRes',urlRes);
			accessToken=urlRes.access_token
			console.log (`accessToken : ${accessToken}`)
			const expiresIn = Number(urlRes.expires_in);								
			console.log (`expiresIn : ${expiresIn}`)
			window.setTimeout(() => accessToken = '', expiresIn * 2000);
      		window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      		return accessToken;
      	})
      	
		/*
		return fetch('https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id='+ clientID +'&redirect_uri=' + redirectURI +'&scope=user-read-private%20user-read-email&response_type=token&state='+ state,{method:'GET'})
			.then(response =>{
				console.log('response',response);
				let urlRes = getUrlParams();
				console.log('urlRes',urlRes);
				accessToken= urlRes.access_token;
				let expires_in = urlRes.expires_in;
				window.location.assign('https://accounts.spotify.com/authorize?client_id='+ clientID +'&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI)
			})	
		*/	
	},
	

	search(term){
		console.log('Entering SPOTIFY.JS search')
		return Spotify.getAccessToken()
		console.log('accessToken', accessToken);
		//console.log('expires_in', expires_in);
		console.log('term que busquem.....', term);
		return fetch('https://api.spotify.com/v1/search?&q=' + term + '&type=track&limit=10',{
			method: 'GET',
			headers: {Authorization: `Bearer ${accessToken}`}
		}).then(response => {								
			console.log('resposta de la  busqueda: ');
			return response.json();
		}).then(jsonresponse =>{
			if (jsonresponse.tracks.items.length >0){
				//console.log('jsonresponse.tracks.items', jsonresponse.tracks.items);
				jsonresponse.tracks.items.map( item=>(  
						{
							name: item.name,
							id: item.id,
							artists: item.artists[0].name,
							album: item.album.name,
							uri: item.uri
						}
					));
				
			} else{
				console.log('no hi ha tracks.....');
				return {}
			}				
		});			
			
	}


};

//module.exports = Spotify
//export default Spotify;


/*
if (jsonresponse.artist){
					console.log('jsonresponse.artist = -----');
					let resposta= jsonresponse.artist;
					console.log(resposta);					
					console.log('artist.items',resposta.items);
					return jsonresponse.artist.items.map(track =>(
						
						{
							id: track.id,
							name: track.name,
							artist: track.artist[0].name,
							album: track.album.name,
							uri: track.uri
						}
					));
				};
				if (jsonresponse.albums){
					console.log('jsonresponse.albums = -----');
					let resposta= jsonresponse.albums;
					console.log(resposta);
					console.log('albums.items',resposta.items);
					return jsonresponse.albums.items.map(track =>(
						{
							id: track.id,
							name: track.name,
							artist: track.artist[0].name,
							album: track.album.name,
							uri: track.uri
						}
					));
				};
				if (jsonresponse.tracks){
					console.log('jsonresponse.tracks = -----');
					let resposta= jsonresponse.tracks;
					console.log(resposta);
					console.log('artist.tracks',resposta.items);
					return jsonresponse.tracks.items.map(track =>(
						{
							id: track.id,
							name: track.name,
							artist: track.artist[0].name,
							album: track.album.name,
							uri: track.uri
						}
					));
				};

*/


/*

console.log(i);
						console.log('name: ',items.name);
						console.log('id: ',items.id);
						console.log('artists: ',items.artists[0].name);
						console.log('album: ',items.album.name);
						console.log('uri: ',items.uri);

*/