/**
 * Created by clasalle on 2/28/16.
 */
var express = require('express');
var _ = require('lodash');
var cors = require('cors');

var app = express();

/**
 * Data files
 *
 */

var accountsData = require('./data/accounts-data.json');
var positionsData = require('./data/positions-data.json');
var userData = require('./data/user-data.json');
var profileData = require('./data/profile-data.json');

var port = 3000;

// Enable CORS
app.use(cors());

app.get('/', function(req, res) {
  res.send('hello, world');
});

app.get('/user', function(req, res) {
  console.log('GET /user');
  res.json(userData);
});

app.get('/user/profile', function(req, res) {
  console.log('GET /user/profile');
  res.json(profileData);
});

app.get('/user/accounts', function(req, res) {
  console.log('GET /user/accounts');
  res.json(accountsData);
});

app.get('/user/accounts/positions', function(req, res) {
  console.log('GET /user/accounts/positions - not handling an {id}');
  res.json(positionsData);
});

/**
 * Launch the fe-rest-stubs server.
 *
 */
console.log('Launching fe-rest-stubs server!');
app.listen(port, function() {
  console.log('Listening at http://localhost:' + port);
});
