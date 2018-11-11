const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const dash = require('lodash');
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ 
	users:[
	{
		group:'',
		accessToken:'',
		refreshToken:'',
		songs:[]
	}],
	host:{
		accessToken:'',
		refreshToken:'',
		group:''
	}
})
  .write()


const g = require('ger');
let esm = new g.MemESM()
let ger = new g.GER(esm);
ger.initialize_namespace('songs');


const generateRandomString = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const buildData = (person,songs) => {
	
	let songEvents = songs.map((song) => {
		return {
			namespace:'songs',
			action:'likes',
			person,
			thing: song.name
		}
	})
	ger.events(songEvents);
}

const getSongRecommendation = (song) => {
	return ger.recommendations_for_person('songs', 'alice', {actions: {likes: 1} } );
}

const getSimilar = (user) => {
	ger.recommendations_for_thing(user, 'song', {actions: {likes: 1}})
}

const addGroupUser = ({accessToken,refreshToken,songs,group}) => {
	return db.get('users')
	.push({
		accessToken,
		refreshToken,
		songs,
		group
	})
	.write();
}

const addHost = ({accessToken, refreshToken, group}) => {
	return db.get('hosts')
	.push({
		accessToken,
		refreshToken,
		group
	});
}

const getHostAccessToken = () => {
	return db.get('host.accessToken').value()
}


const addSongs = (songs) => {
	return db.get('songs')
		.push(songs)
		.write();
}

const getSongs = () => {
	return db.get('songs').value();
}

const getSongsForUser = (token) => {
  
  const type = 'tracks';
  
  const uri = 'https://api.spotify.com/v1/me/top/'+type;

  return request.get({
  	uri,
  	qs:{
	  	limit:'50',
	  	time_range: 'long_term'
	 },
	 headers: {'Authorization': 'Bearer ' + (new Buffer(token).toString('base64')) },
	 json:true
  })
  .then((data) => {
  	return data;
  })
  .catch((err) => {
  	return err;
  })

};

const getGroupSongs = (group) => {
	return new Promise((resolve,reject) => {
		let val =  db.get('users')
		.find({group})
		.value();
		resolve(val);	
	}) 
}


const getSeed = (group) => {
	
	return getGroupSongs(group)
	.then((users) => {
		// console.log('Got users: ',Object.keys(users));
		let val =  dash.shuffle(users.songs);
		val = dash.sampleSize(val,5);
		
		return val;
	
	})
	.then((seeds) => {
		let val = dash.shuffle(seeds);
		val = dash.sampleSize(val,5);

		return val;
	})
	.then((seeds) => {
		const split = Math.floor(Math.random() * 4) + 1;
		let tracks = dash.shuffle(seeds);
		tracks = dash.sampleSize(seeds, split);
		


		let artists = dash.shuffle(seeds);
		artists = dash.sampleSize(seeds, 5-split);
		
		
		console.log('\n\nTracks: ',tracks.length,'\n\nArt: ', artists.length);


		return  {
			seed_tracks: dash.map(tracks,(seed) => {
				return seed.id
			}),

			seed_artists: dash.flatMapDeep(artists, (seed) => {
				return dash.flatMapDeep(seed.artists,(artist) => {
					return artist.id
				})
			})
		}

		// console.log('Seed tracks: ', val.seed_tracks, '\n\n\nSeed artist: ', val.seed_artists);
	})
	.catch((err) => {
		return err;
	})
}

module.exports = {
	randomString: generateRandomString,
	getHostAccessToken,
	buildData,
	addSongs,
	getSongs,
	addGroupUser,
	addHost,
	getSongsForUser,
	getSeed
}

