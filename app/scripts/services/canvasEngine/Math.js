/**
 * Created by zeshe_000 on 11/10/13.
 */

canvasEngine.Math = {
    PI: 3.14159
};

canvasEngine.Math.Vector3 = function(x, y, z) {
    var me = this;
    me.x = (x) ? x : 0;
    me.y = (y) ? y : 0;
    me.z = (z) ? z : 0;
};

canvasEngine.Math.Vector3.prototype = {
    constructor: canvasEngine.Math.Vector3,

    subtract: function(vector3) {
        var me = this;
        var copy = me.copy();
        if (vector3 instanceof canvasEngine.Math.Vector3) {
            copy.x = me.x - vector3.x;
            copy.y = me.y - vector3.y;
            copy.z = me.z - vector3.z;
        }

        return copy;
    },

    add: function(vector3) {
        var me = this;
        var copy = me.copy();
        if (vector3 instanceof canvasEngine.Math.Vector3) {
            copy.x += vector3.x;
            copy.y += vector3.y;
            copy.z += vector3.z;
        }

        return copy;
    },

    set: function(x,y,z) {
        var me = this;
        me.x = x;
        me.y = y;
        me.z = z;
    },

    copy: function() {
        var me = this;
        return new canvasEngine.Math.Vector3(me.x, me.y, me.z);
    }
};