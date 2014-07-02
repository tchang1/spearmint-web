'use strict';

angular.module('spearmintWebApp').factory('progressIndicator', ['logger',
    function(logger) {

        var me = this;
        var ctx;
        var imd = null;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        var theeQuart = Math.PI * 1.5;
        var barFilledOnce = false;
        var previousProgress = -1;
        var currentColorIndex = 0;
        var visible = false;
        var shouldUpdate = false;

        var numberFont = '70px Lato';
        var dollarFont = '24px Lato';
        var strokeColors = ['rgba(122,193,67,0.8)', 'rgba(66,141,255,0.8)'];
        var backgroundColor = 'rgba(0,0,0,0.4)';
        var fontColor = 'rgba(255,255,255,1)';
        var lineWidth = 8.0;
        var width = 160;
        var height = 160;
        var marginBottom = 10;
        var padding = 10;
        var textPositionX = 48;
        var textPositionY = 72;
        var amountPositionXOffset = 12;
        var amountPositionYOffset = 32;
        var doubleDigitXOffset = -16;

        var currentTime = 0;
        var previousTime = 0;

        var accelerationFactor = 0.07;

        var FPS = 30;
        var maxAmount = 99;

        var amount = 0;
        var progress = 0;

        var draw = function() {
            clear();
            if (visible) {
                var dollarPositionX = textPositionX;
                var dollarPositionY = textPositionY;
                var amountPositionX = textPositionX + amountPositionXOffset;
                var amountPositionY = textPositionY + amountPositionYOffset;
                if (amount >= 10) {
                    dollarPositionX += doubleDigitXOffset;
                    amountPositionX += doubleDigitXOffset;
                }
                ctx.beginPath();
                ctx.fillStyle = backgroundColor;
                ctx.strokeStyle = backgroundColor;
                ctx.arc(width/2, height/2, (height/2) - (lineWidth/2) - padding, -(quart), ((circ)) - quart, true);
                ctx.fill();

                ctx.fillStyle = fontColor;
                ctx.font=dollarFont;
                ctx.fillText('$',dollarPositionX,dollarPositionY);
                ctx.font=numberFont;
                ctx.fillText('' + amount, amountPositionX, amountPositionY);

                if (barFilledOnce) {
                    var previousColorIndex = currentColorIndex - 1;
                    if (0 > previousColorIndex) {
                        previousColorIndex = strokeColors.length - 1;
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = strokeColors[previousColorIndex];
                    ctx.arc(width/2, height/2, (height/2) - lineWidth - padding, ((circ) * progress) + theeQuart, theeQuart, false);
                    ctx.stroke();
                }
                ctx.strokeStyle = strokeColors[currentColorIndex];
                ctx.beginPath();
                ctx.arc(width/2, height/2, (height/2) - lineWidth - padding, theeQuart, ((circ) * progress) + theeQuart, false);
                ctx.stroke();
            }
        };


        var clear = function() {
            var oldFillColor = ctx.fillStyle;
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.clearRect(0,0,width,height);
            ctx.fillStyle = oldFillColor;
        };

        var update = function() {
            if (shouldUpdate) {
                var deltaTime;
                var milliseconds = Date.now();
                previousTime = currentTime;
                currentTime = milliseconds;
                deltaTime = canvasEngine.currentTime - canvasEngine.previousTime;

                var progressUpdate  = (deltaTime * ((1 + amount * accelerationFactor) / FPS)) / (1000/FPS);
                progress += (1 + amount * accelerationFactor) / FPS;
                if (progress > 1) {
                    if (amount < maxAmount) {
                        amount ++;
                        progress = 0.01;
                    }
                    else {
                        progress = 1;
                    }
                }

                if (progress < previousProgress) {
                    currentColorIndex ++;
                    if (currentColorIndex >= strokeColors.length) {
                        currentColorIndex = 0;
                    }

                    barFilledOnce = true;
                }
                previousProgress = progress;
                draw();

                setTimeout(function() {
                    update();
                }, 1000/FPS);
            }
        };


        return {
            initWithCanvas: function(canvas) {
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.strokeStyle = strokeColors[currentColorIndex];
                ctx.lineCap = 'butt';

                ctx.fillStyle = backgroundColor;
                ctx.lineWidth = lineWidth;

                var screenWidth = window.innerWidth; 
                var screenHeight = window.screen.height; 

                canvas.style.position = "fixed"; 
                canvas.style.bottom = marginBottom + 'px';
                canvas.style.left = ((screenWidth - width) / 2) + 'px'; 
                logger.log(canvas.style.bottom); 
                logger.log(canvas.style.left);
            },

            start: function() {
                shouldUpdate = true;
                update();
            },

            stop: function() {
                shouldUpdate = false;
            },

            getAmount: function() {
                return amount;
            },

            show: function() {
                visible = true;
                draw();
            },

            hide: function() {
                visible = false;
                draw();
            },

            reset: function() {
                barFilledOnce = false;
                previousProgress = -1;
                currentColorIndex = 0;
                shouldUpdate = false;
                amount = 0;
                progress = 0;
                draw();
            }
        }
    }]);