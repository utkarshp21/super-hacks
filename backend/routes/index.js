var express = require('express');
var router = express.Router();
const qs = require('querystring');
const keys = require('../keys');
const util = require('../util');
const dash = require('lodash');
const {
	getHostAccessToken,
	addSongs,
	getSongs,
	addGroupUser,
	addHost,
	getSongsForUser,
	getSeed
} = util;


const request = require('request-promise');

const scope = 'user-read-private user-read-email user-library-read user-top-read user-follow-read user-modify-playback-state streaming';
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });

});

router.get('/login',(req,res) => {
	
	const state = util.randomString(16);
	res.cookie(keys.state,state);

	const params = qs.stringify({
		response_type: 'code',
	    client_id: keys.spotify.clientId,
	    scope,
	    redirect_uri: keys.spotify.redirectUri,
	    state
	})
	res.redirect('https://accounts.spotify.com/authorize?'+params);
});

router.get('/callback', (req, res) => {

  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let host = req.query.host || false;


    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: keys.spotify.redirectUri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(keys.spotify.clientId + ':' + keys.spotify.clientSecret).toString('base64'))
      },
      json: true
    };
    
    request.post(authOptions)
    .then(async (data) => {
      let access_token = data.access_token;
      let refresh_token = data.refresh_token;
	
	  if(host){
			
		addHost({accessToken:access_token,refreshToken:refresh_token,group:state})
		.then(() => {
			res.send('host added');
		})
		.catch((err) => {
			console.log('Err in adding host: ', err);
		})
	  }
	  else{
	  	let songs = await getSongsForUser(access_token);
	  	addGroupUser({accessToken:access_token, refreshToken:refresh_token, group:state, songs})
	  	.then((data) => {
	  		console.log(`Added user to the group ${state}: `,data);
	  	})
	  	.catch((err) => {
	  		console.log('Error in setting user: ', err);
	  	})
		
	  }
      // let options = {
      //     url: 'https://api.spotify.com/v1/me',
      //     headers: { 'Authorization': 'Bearer ' + access_token },
      //     json: true
      //   };

      // console.log('Got access Token: ', access_token);
      // console.log('Got refresh token: ', refresh_token);
      // res.json({
      // 	access_token,
      // 	refresh_token
      // });
    })
    .catch((err) => {
      console.log(err);
    })
  
});


router.get('/refresh_token', (req, res) => {

  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  
	  let authOptions = {
	    url: 'https://accounts.spotify.com/api/token',
	    headers: { 'Authorization': 'Basic ' + (new Buffer(keys.spotify.clientId + ':' + keys.spotify.clientSecret).toString('base64')) },
	    form: {
	      grant_type: 'refresh_token',
	      refresh_token: refresh_token
	    },
	    json: true
	  };
	  
	  request.post(authOptions)
	  .then((data) => {
	    let access_token = data.access_token;
	    res.json({
	      access_token
	    })
	    // return setAccessToken(access_token);
	  })
	  .catch((err) => {
		    throw err;
		});
});



router.get('/get/:type',(req,res) => {
  
  const type = req.params.type;
  const token = req.query.token;
  
  const uri = 'https://api.spotify.com/v1/me/top/'+type;

  request.get({
  	uri,
  	qs:{
	  	limit:'50',
	  	time_range: 'long_term'
	 },
	 headers: {'Authorization': 'Bearer ' + (new Buffer(token).toString('base64')) },
	 json:true
  })
  .then(async (data) => {
  	return addSongs(data);
  })
  .then((data) => {
  	console.log('Stored songs: ',data);
  	res.send('OK');
  })
  .catch((err) => {
  	res.send(err);
  })

});

router.get('/songs',(req,res) => {
	res.json({
		songs:[
			{
				name: 'asds',
				id:'asdsd',
				artist:'asds',

			}
		]
	})
});

router.post('/recommendation',async (req,res) => {
	const uri = 'https://api.spotify.com/v1/recommendations';
	const {
		acousticness,
		danceability,
		energy,
		liveness,
		loudness,
		popularity,
		tempo,
		valence,
		group
	} = req.body;

	let {seed_tracks, seed_artists} = await getSeed('xyz');
	
	

	let query = {};

	if(seed_tracks.length === 0){
		
		seed_tracks = seed_tracks.length > 5 ? seed_tracks.slice(0,1) : seed_tracks;

		query ={
			limit:100,
			target_acousticness: acousticness,
			target_danceability: danceability,
			target_energy: energy,
			target_liveness: liveness,
			target_loudness: loudness,
			target_popularity: popularity,
			target_tempo: tempo,
			target_valence: valence,
			seed_artists: seed_artists.join(',')
		};
	}
	else if(seed_artists.length === 0){

		seed_artists = seed_artists.length > 5 ? seed_artists.slice(0,1) : seed_artists;
		
		 query ={
			limit:100,
			target_acousticness: acousticness,
			target_danceability: danceability,
			target_energy: energy,
			target_liveness: liveness,
			target_loudness: loudness,
			target_popularity: popularity,
			target_tempo: tempo,
			target_valence: valence,
			seed_tracks: seed_tracks.join(',')
		};
	}
	else{
		
		if(seed_tracks.length + seed_artists.length > 5){
			seed_tracks = seed_tracks.slice(0,1);
			seed_artists = seed_artists.slice(0,1);
		}

		query ={
			limit:100,
			target_acousticness: acousticness,
			target_danceability: danceability,
			target_energy: energy,
			target_liveness: liveness,
			target_loudness: loudness,
			target_popularity: popularity,
			target_tempo: tempo,
			target_valence: valence,
			seed_artists:seed_artists.join(','),
			seed_tracks:seed_tracks.join(',')
		};
	}

	const token = getHostAccessToken();

	request.get({
		uri,
		qs: query,
		headers: {'Authorization': 'Bearer ' + token},
		json:true
	})
	.then((data) => {
		res.json({data});
	})
	.catch((err) => {
		console.log('Recommendation error: ', err.toJSON());
	})
});

router.get('/ping',(req,res) => {
	// res.json({token:getHostAccessToken()});
	// res.send('pong');
	getSeed('xyz')
	.then((seed) => {
		res.json({seed});
	})

})

router.get('/test',(req,res) => {
	res.render('test');
})

module.exports = router;
