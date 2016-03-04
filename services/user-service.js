/**
 * Created by clasalle on 3/4/16.
 */
var Promise = require('bluebird');
var request = require('request');

// REST endpoints configuration
var FE_REST_PORT = '3000';
var FE_REST_HOST = 'http://localhost';
var FE_REST_HOST_PORT = FE_REST_HOST + ':' + FE_REST_PORT;

function UserService() {
}

UserService.prototype.findById = function(args) {

  // not using param id right now

  return new Promise(function(resolve, reject) {

    request.get(FE_REST_HOST_PORT + '/user', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var responseData = JSON.parse(body);
        console.log('resolve: body = ' + body);
        resolve(responseData);
      } else {
        console.log('reject');
        reject('ERROR');
      }
    });

  });

}

module.exports = new UserService();
