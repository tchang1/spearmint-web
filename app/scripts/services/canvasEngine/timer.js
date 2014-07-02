canvasEngine.TimerManager = {
    timers: [],

    getTimer: function(waitTime, repeating) {
        var me = this;
        var timer = new canvasEngine.Timer(waitTime, repeating);
        me.timers.push(timer);
        return timer;
    },

    removeTimer: function(index) {
        var me = this;
        if (index > 0 && index < me.timers.length) {
            me.timers.splice(index, 1);
        }
    },

    updateTimers: function(deltaTime) {
        var me = this;
        for (var i = 0; i < me.timers.length; i++) {
            me.timers[i].tick(deltaTime);
            if (me.timers[i].isFinished()) {
                me.removeTimer(i);
            }
        }
    }
};

canvasEngine.Timer = function(waitTime, repeating) {
	var me = this;
	me.repeat = false;
	if (typeof(repeating) != 'undefined') {
		me.repeat = repeating;
	}
	else {
		me.repeat = false;
	}
    if (waitTime < 0) {
        waitTime = 0;
    }
	me.wait = waitTime;
	me.currentTime = 0;
	me.finished = false;
    me._previousProgress = 0;
    me._progress = 0;
};

canvasEngine.Timer.prototype = {
    constructor: canvasEngine.Timer,

	tick: function(deltaTime) {
        var me = this;
		if (me.finished === false) {
			if (me.currentTime >= me.wait) {
				me.currentTime = 0;
			}
//            console.log(me);
			me.currentTime += deltaTime;
			if (me.currentTime >= me.wait) {
				me.currentTime = me.wait;
				if (me.repeat === false) {
					me.finished = true;
				} 
			}
		}

        me._previousProgress = me._progress;
        if (me.wait > 0) {
            me._progress = me.currentTime / me.wait;
            if(me._progress > 1) {
                me._progress = 1;
            }
        }
        else {
            me._progress = 1;
        }
	},
	
	getProgress: function() {
        var me = this;
        return me._progress;
    },

    getSlice: function() {
        var me = this;
        return me._progress - me._previousProgress;
    },

    isFinished: function() {
        var me = this;
        return me.finished;
    }
};