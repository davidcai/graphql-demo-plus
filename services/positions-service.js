/**
 * Created by clasalle on 3/4/16.
 */
var Promise = require('bluebird');
var request = require('request');
var _ = require('lodash');

// REST endpoints configuration
var FE_REST_PORT = '3000';
var FE_REST_HOST = 'http://localhost';
var FE_REST_HOST_PORT = FE_REST_HOST + ':' + FE_REST_PORT;

function PositionsService() {
}

PositionsService.prototype.findById = function(args) {

  // not using param id right now

}

PositionsService.prototype.findAll = function(args) {

  var pattern = args.pattern;

  return new Promise(function(resolve, reject) {

    request.get(FE_REST_HOST_PORT + '/user/accounts/positions', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var responseData = JSON.parse(body);
        var matchedData = [];
        if (pattern) {
          console.log('filtering on pattern: ' + pattern);
          matchedData = _.filter(responseData, function(element) {
            if (element.name.indexOf(pattern) > -1) {
              console.log('matched to: ' + element.name);
              return true;
            } else {
              console.log('did NOT match to: ' + element.name);
              return false;
            }
          });
        } else {
          console.log('NOT filtering on pattern');
          matchedData = responseData;
        }
        console.log('resolve: body = ' + body);
        resolve(matchedData);
      } else {
        console.log('reject');
        reject('ERROR');
      }
    });

  });


}

module.exports = new PositionsService();
