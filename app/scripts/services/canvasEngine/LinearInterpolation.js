canvasEngine.LinearInterpolation = function(start, end, time, repeat) {
	var me = this;
    me.id = '';

    canvasEngine.IDManager.setID(me);
	if (typeof(time) == 'undefined') {
		time = 0;
	}
	if (typeof(repeat) == 'undefined') {
		repeat = false;
	}
	me.time = time;
	me.repeat = repeat;
	me.finished = false;
	
    me.timer = canvasEngine.TimerManager.getTimer(me.time, me.repeat);
	me.start = new canvasEngine.Math.Vector3(start.x, start.y, start.z);
	me.end = new canvasEngine.Math.Vector3(end.x, end.y, end.z);
	me.current = new canvasEngine.Math.Vector3(start.x, start.y, start.z);

};

canvasEngine.LinearInterpolation.prototype = {
    constructor: canvasEngine.LinearInterpolation,
    
	reverse: function(){
        var me = this;
		var temp = me.start;
		me.start = me.end;
		me.end = temp;
	},
	
	getNextX: function() {
        var me = this;
		var progress = me.timer.getProgress();
        me._checkFinished(progress);

		return me.start.x + (me.end.x - me.start.x) * progress;
	},
	
	getNextPoint: function() {
        var me = this;
		var progress = me.timer.getProgress();
        me._checkFinished(progress);

		me.current.x = me.start.x + (me.end.x - me.start.x) * progress;
		me.current.y = me.start.y + (me.end.y - me.start.y) * progress;
		
		return me.current;
	},
	
	getNextPosition: function() {
        var me = this;
		var progress = me.timer.getProgress();
		me._checkFinished(progress);

		me.current.x = me.start.x + (me.end.x - me.start.x) * progress;
		me.current.y = me.start.y + (me.end.y - me.start.y) * progress;
		me.current.z = me.start.z + (me.end.z - me.start.z) * progress;
		
		return me.current;
	},

    getNextSlice: function() {
        var me = this;
        me._checkFinished(me.timer.getProgress());

        var timeSlice = me.timer.getSlice();
//        console.log(timeSlice);
        return new canvasEngine.Math.Vector3(
            (me.end.x - me.start.x) * timeSlice,
            (me.end.y - me.start.y) * timeSlice,
            (me.end.z - me.start.z) * timeSlice
        );
    },

    _checkFinished: function(progress) {
        var me = this;
        if (progress >= 1) {
            if (me.repeat == true) {
                me.reverse();
            }
            else {
                me.finished = true;
            }
        }
    },
	
	isFinished: function() {
        var me = this;
		return me.finished;
	}
};