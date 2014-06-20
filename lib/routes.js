'use strict';

var index = require('./controllers'),
    middleware = require('./middleware'),
    passport = require('passport'),
    usersapi = require('./controllers/usersapi'),
    goals = require('./controllers/goalsapi'),
    savings = require('./controllers/savingsapi'),
    feedback = require('./controllers/feedbackapi'),
    images = require('./controllers/imagesapi');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/users')
    .post(usersapi.validateUser, usersapi.createUser, passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send('loggedin');
    });

  app.route('/goals')
    .post(middleware.auth, goals.validateGoal, goals.createGoal)
    .delete(goals.deleteGoal);

  app.route('/feedback')
    .post(middleware.auth, feedback.validateFeedback, feedback.createFeedback);

  app.route('/images/me')
    .get(middleware.auth, images.getNextImage);

  app.route('/savings')
    .post(middleware.auth, savings.validateSavings, savings.createSavings)
    .delete(goals.deleteGoal);

  app.route('/savings/me')
    .get(middleware.auth, savings.findAllByUser);

  app.route('/goals/me')
    .get(middleware.auth, goals.findOneByUser)
    .put(middleware.auth, goals.validateGoal, goals.updateGoalByUser);
  
  app.route('/login')
    .post(passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.send('loggedin');
    });

  app.route('/logout')
    .get(function(req, res){
      req.logout();
      res.redirect('/');
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

  app.route('/partials/home')
  .get(middleware.auth,index.partials);
  app.route('/partials/settings')
  .get(middleware.auth,index.partials);

  app.route('/partials/*')
    .get(index.partials);

  app.route('/*')
    .get(middleware.setUserCookie, index.index);
};