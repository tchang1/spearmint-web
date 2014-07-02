/**
 * Created by zeshe_000 on 11/9/13.
 */

canvasEngine.HashArray = function() {
    var me = this;
    me._arrayObject = {};
    me._indicies = [];
    me._i = 0;
    me._indiciesIndex = 0;
    me._lastIndex = null;

    me._copiedArray = null;
    me._copiedIndicies = null;
};

canvasEngine.HashArray.prototype = {
    constructor: canvasEngine.HashArray,

    add: function(index, object) {
        var me = this;
        if (!me._arrayObject[index]) {
            me._arrayObject[index] = [];
            me._indicies.push(index);
        }
        me._arrayObject[index].push(object);
    },

    remove: function(index, object) {
        var me = this;
        if (me._arrayObject[index]) {
            me._arrayObject[index].remove(object);
            if (me._arrayObject[index].isEmpty()) {
                me._arrayObject[index] = null;
                me._indicies.remove(index);
            }
        }
    },

    clearIndex: function(index) {
        var me = this;
        if (me._arrayObject[index]) {
            var object;
            var toRemove = me._arrayObject[index].copy();
            for (object in toRemove) {
                if (toRemove.hasOwnProperty(object)) {
                    me.remove(index, object);
                }
            }
        }
    },

    getNext: function(index) {
        var me = this;
        var returnObject = null;
        if (index != me._lastIndex) {
            me._copiedArray = null;
            me._i = 0;
            me._lastIndex = index;
        }
        if (me._arrayObject[index]) {
            if (null == me._copiedArray) {
                me._i = 0;
                me._copiedArray = me._arrayObject[index].copy();
            }

            if (!me._copiedArray.isEmpty()) {
                if (me._copiedArray && me._copiedArray[me._i]) {
                    returnObject = me._copiedArray[me._i];
                    me._i++;
                }
                else if (me._copiedArray) {
                    me._i = 0;
                    me._copiedArray = null;
                }
            }
        }

        return returnObject;
    },

    getNextIndex: function() {
        var me = this;
        var returnIndex = null;

        if (null == me._copiedIndicies || me._copiedIndicies.isEmpty()) {
            me._copiedIndicies = me._indicies.copy();
        }

        if (!me._copiedIndicies.isEmpty()) {
            if (me._indicies[me._indiciesIndex]) {
                returnIndex = me._indicies[me._indiciesIndex];
                me._indiciesIndex++;
            }
            else {
                me._indiciesIndex = 0;
                me._copiedIndicies = null;
            }
        }

        return returnIndex;
    }
};