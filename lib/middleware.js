'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function (req, res, next) {
    console.log("checking if logged in");
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("not authenticated");
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  }
};