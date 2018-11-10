var express = require('express');
var router = express.Router();
const qs = require('querystring');
const keys = require('../keys');
const util = require('../util');
const request = require('request-promise');

const scope = 'user-read-private user-read-email user-library-read user-top-read user-follow-read';
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

      let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

      console.log('Got access Token: ', access_token);
      console.log('Got refresh token: ', refresh_token);
      res.send('OK');
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
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  request.post(authOptions)
  .then((data) => {
    let access_token = body.access_token;
    res.json({
      access_token
    })
  })
  .catch((err) => {
    throw err;
  });
  
});

module.exports = router;
