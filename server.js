// import packages
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');
var _ = require('lodash');
var Promise = require('bluebird');
var cors = require('cors');

// import services
var userService = require('./services/user-service');
var accountsService = require('./services/accounts-service');
var positionsService = require('./services/positions-service');
var profileService = require('./services/profile-service');

// server
var app = express();

// import data
var contributions_data = require('./data/contributions-data.json');

/**
 * DEFINE THE NODES IN THE RESOURCE GRAPH
 *
 */

/**
 * ContributionType
 *
 */
var ContibutionType = new graphql.GraphQLObjectType({
  name: 'Contribution',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    type: {
      type: graphql.GraphQLString
    },
    amountDollars: {
      type: graphql.GraphQLString
    }
  }
});

var PositionType = new graphql.GraphQLObjectType({
  name: 'Position',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    balance: {
      type: graphql.GraphQLString
    }
  }
});

/**
 * Define the AccountType
 *
 * Contains all the account data.
 *
 */
var AccountType = new graphql.GraphQLObjectType({
  name: "Account",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    owner: { type: graphql.GraphQLString },
    contributions: {
      type: new graphql.GraphQLList(ContibutionType),
      resolve: function(parent, args, context) {
        return contributions_data;
      }
    },
    positions: {
      args: {
        pattern: {
          type: graphql.GraphQLString
        }
      },
      type: new graphql.GraphQLList(PositionType),
      /**
       * Resolves the request for accounts using the FE REST STUBS API.
       *
       * @param parent
       * @param args
       * @param context
       * @returns {*}
       */
      resolve: function(parent, args, context) {
        console.log('trying to resolve positions: pattern = ' + args.pattern);
        return positionsService.findAll(args);
      }
    }
  }
});

/**
 * TODO CREATE A ProfileType and connect it to the user.
 */
var ProfileType = new graphql.GraphQLObjectType({
  name: 'Profile',
  fields: {
    uiPreference: {
      type: graphql.GraphQLString
    },
    contactViaEmail: {
      type: graphql.GraphQLBoolean
    },
    contactViaSMS: {
      type: graphql.GraphQLBoolean
    }
  }
});

/**
 * Define the UserType.
 *
 * UserType is the root node in the RESOURCE DOMAIN MODEL.
 *
 */
var UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    email: {
      type: graphql.GraphQLString
    },
    profile: {
      args: {
        id: {
          type: graphql.GraphQLString
        }
      },
      type: ProfileType,
      resolve: function(parent, args, context) {
        return profileService.findById(args);
      }
    },
    accounts: {
      args: {
        id: {
          type: graphql.GraphQLString
        }
      },
      type: new graphql.GraphQLList(AccountType),
      resolve: function(parent, args, context) {
        return accountsService.findAll(args);
      }
    }
  }
});

/**
 * Define the ROOT of the USER resource tree.
 * The root is the UserType.
 * GraphQL calls this the "Query".
 */
var schema_user = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: function(parent, args, context) {
          return userService.findById(args);
        }
      }
    }
  })
});

/**
 * Server Configuration
 *
 * Server Launch
 *
 */

var PORT = '8080'

console.log('Server online!');
console.log('port: ' + PORT);
console.log('__dirname: ' + __dirname);

app.use(cors());
app.use(express.static(__dirname));
app.use('/graphql', graphqlHTTP({schema: schema_user, pretty: true})).listen(PORT);
