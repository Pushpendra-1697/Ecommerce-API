// **************** API RATE LIMITER Middleware used for making some limited request in fixed duration ****************

const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    max: 2, //no. of req users can make with in time
    windowMs: 60000  // time frame in (ms) = 1 Minute
});

module.exports = { limiter };