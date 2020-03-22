  
const authResolver = require('./auth'),
      eventsResolver = require('./events'),
      bookingResolver = require('./booking')

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;