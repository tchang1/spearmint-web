/**
 * Created by zeshe_000 on 11/9/13.
 */

Array.prototype.remove = function(object) {
    var me = this;
    var i;
    for (i = 0; i <  me.length; i++) {
        if (me[i] == object) {
            me[i] = null;
            me.splice(i,1);
            return;
        }
    }
};

Array.prototype.removeItemAt = function(index) {
    var me = this;
    if (me.length > index) {
        me[index] = null;
        me.splice(index,1);
    }
};

Array.prototype.isEmpty = function() {
    var me = this;
    return (0 == me.length);
};

Array.prototype.copy = function() {
    var me = this;
    var newArray = [];
    var i;

    for (i = 0; i < me.length; i++) {
        newArray.push(me[i]);
    }

    return newArray;
};