'use strict';

var index = require('./controllers'),
    middleware = require('./middleware'),
    passport = require('passport'),
    usersapi = require('./controllers/usersapi'),
    goals = require('./controllers/goalsapi');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/users')
    .post(usersapi.createUser);

  app.route('/goals')
    .get(middleware.auth, goals.findAll)
    .post(middleware.auth, goals.createGoal)
    .put(middleware.auth, goals.updateGoalByUser)
    .delete(goals.deleteGoal);

  app.route('/goals/:id')
    .get(goals.findOneByUser);
  
  app.route('/login')
    .post(passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send('loggedin');
    });
  
  
  /*app.route('/api/session')
    .post(session.login)
    .delete(session.logout);
  */

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get(middleware.setUserCookie, index.index);
};