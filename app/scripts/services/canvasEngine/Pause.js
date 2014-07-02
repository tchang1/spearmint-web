/**
 * Created by zeshe_000 on 11/10/13.
 */

canvasEngine.Pause = function(time) {
    var me = this;
    me.id = '';

    canvasEngine.IDManager.setID(me);
    if (typeof(time) == 'undefined') {
        time = 0;
    }
    me.time = time;

    me.timer = canvasEngine.TimerManager.getTimer(me.time, me.repeat);
};

canvasEngine.Pause.prototype = {
    constructor: canvasEngine.Pause,

    isFinished: function() {
        var me = this;
        return (me.timer.getProgress() >= 1);
    }
};