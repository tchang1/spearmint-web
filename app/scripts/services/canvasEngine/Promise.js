canvasEngine.Promise = function() {
    var me = this;
    me._success = false;
    me._response = [];
    me._successHandler = null;
    me._failureHandler = null;
};

canvasEngine.Promise.prototype = {
    constructor: canvasEngine.Promise,

    setSuccessful: function(wasSuccessful) {
        this._success = wasSuccessful;
    },

    setResponse: function(response) {
        var me = this;
        response = (response) ? response : [];
        if (!(response instanceof  Array)) {
            response = [response];
        }
        me._response = response;
    },

    then: function(success, failure) {
        var me = this;
        me._successHandler = success;
        me._failureHandler = failure;
    },

    fulfill: function() {
        var me = this;
        if (me._success) {
            if (me._successHandler) {
                me._successHandler.apply(undefined, me._response);
            }
        }
        else {
            if (me._failureHandler) {
                me._failureHandler.apply(undefined, me._response);
            }
        }
    }
};