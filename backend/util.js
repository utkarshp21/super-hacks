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

module.exports = {
	randomString: generateRandomString,
	buildData,
}