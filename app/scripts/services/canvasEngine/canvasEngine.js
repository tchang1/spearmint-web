var canvasEngine = {
    FPS: 30,
    running: false,
    currentTime: 0,
    previousTime: 0,
    context: null,
    canvas: null,
    width: 10,
    height: 10,
    initiated: false,
    timeout: null,

    init: function(canvas, xPos, yPos, width, height) {
//        var me = this;
        canvasEngine.canvas = canvas;
        canvasEngine.context = canvas.getContext('2d');
        canvasEngine.updateSize(xPos, yPos, width, height);
        canvasEngine.initiated = true;

    },

    updateSize: function(xPos, yPos, width, height) {
//        var me = this;
        canvasEngine.width = width;
        canvasEngine.height = height;
        canvasEngine.canvas.width = width;
        canvasEngine.canvas.height = height;
        canvasEngine.canvas.style.position = "fixed";
        canvasEngine.canvas.style.top = yPos + 'px';
        canvasEngine.canvas.style.left = xPos + 'px';
        canvasEngine.ImageManager.resizeAllImagesTo({width: width, height: height});
    },

    _update: function() {
//        var me = this;
        clearTimeout(canvasEngine.timeout);
        if (canvasEngine.running) {
            var deltaTime;
            var milliseconds = Date.now();
            canvasEngine.previousTime = canvasEngine.currentTime;
            canvasEngine.currentTime = milliseconds;
            deltaTime = canvasEngine.currentTime - canvasEngine.previousTime;
//            console.log(deltaTime);
//            deltaTime = 1000/canvasEngine.FPS;

            canvasEngine.TimerManager.updateTimers(deltaTime);
            canvasEngine.ImageManager.update();

            canvasEngine._draw();

            var timeoutWait = 1000/canvasEngine.FPS - (deltaTime - 1000/canvasEngine.FPS);
            if (timeoutWait < 0) {
                timeoutWait = 0;
            }
            canvasEngine.timeout = setTimeout(canvasEngine._update, timeoutWait);
        }
    },

    _draw: function() {
        canvasEngine.ImageManager.draw(canvasEngine.context);
    },

    run: function() {
//        var me = this;
        canvasEngine.running = true;
        canvasEngine._update();
    },

    pause: function() {
//        var me = this;
        canvasEngine.running = false;
        clearTimeout(canvasEngine.timeout);
    },

    test: true,

    clear: function() {
        canvasEngine.context.fillStyle = 'rgb(255,0,0)';
        if (canvasEngine.test) {
            console.log(canvasEngine);
            canvasEngine.test = false;
        }
        canvasEngine.context.fillRect(0,0,80,80);
        canvasEngine.context.clearRect(0,0,canvasEngine.width,canvasEngine.height);
    }
};
