/**
 * Created by clasalle on 3/4/16.
 */
var Promise = require('bluebird');
var request = require('request');

// REST endpoints configuration
var FE_REST_PORT = '3000';
var FE_REST_HOST = 'http://localhost';
var FE_REST_HOST_PORT = FE_REST_HOST + ':' + FE_REST_PORT;

function AccountsService() {
}

AccountsService.prototype.findById = function(args) {

  // not using param id right now

}

AccountsService.prototype.findAll = function(args) {

  return new Promise(function(resolve, reject) {

    request.get(FE_REST_HOST_PORT + '/user/accounts', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var responseData = JSON.parse(body);
        var outputData = [];
        if (args.id) {
          outputData = _.filter(accounts_data, function(element) {
            return element.id === args.id;
          });
        } else {
          outputData = responseData;
        }
        console.log('resolve: body = ' + body);
        resolve(outputData);
      } else {
        console.log('reject');
        reject('ERROR');
      }
    });

  });


}

module.exports = new AccountsService();

