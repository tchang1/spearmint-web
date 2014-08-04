'use strict';

var index = require('./controllers'),
    middleware = require('./middleware'),
    passport = require('passport'),
    usersapi = require('./controllers/usersapi'),
    goals = require('./controllers/goalsapi'),
    savings = require('./controllers/savingsapi'),
    feedback = require('./controllers/feedbackapi'),
    images = require('./controllers/imagesapi'),
    payments = require('./controllers/paymentsapi');

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

  app.route('/notifications/me')
    .get(middleware.auth, usersapi.getNotifications)
    .put(middleware.auth, usersapi.updateNotifications);

  app.route('/goals')
    .post(middleware.auth, goals.validateGoal, goals.createGoal);
    //.delete(goals.deleteGoal);

  app.route('/feedback')
    .post(middleware.auth, feedback.validateFeedback, feedback.createFeedback);

  app.route('/images/me')
    .get(middleware.auth, images.getNextImage);

  app.route('/payments/optin')
      .post(middleware.auth, payments.optin);

  app.route('/savings')
    .post(middleware.auth, savings.validateSavings, savings.createSavings)
    .put(middleware.auth, savings.softDeleteSavings);

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
        res.set('Content-Type', 'application/json');
        var result = {"result" : "loggedin"};
        res.send(result);
    });

  app.route('/logout')
    .get(function(req, res){
      req.logout();
      res.redirect('/');
    });

  app.route('/logoutWithoutRedirect')
    .get(function(req, res){
      res.set('Content-Type', 'application/json');
      req.logout();
      res.send(200);
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