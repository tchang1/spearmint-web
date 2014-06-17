'use strict';

angular.module('spearmintWebApp').factory('progressIndicator', ['logger',
    function(logger) {

        var me = this;
        var ctx;
        var imd = null;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        var barFilledOnce = false;
        var previousProgress = -1;
        var currentColorIndex = 0;
        var visible = false;
        var shouldUpdate = false;

        var numberFont = '110px Lato';
        var dollarFont = '24px Lato';
        var strokeColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        var backgroundColor = 'rgba(0,0,0,0.5)';
        var fontColor = 'rgba(255,255,255,1)';
        var lineWidth = 16.0;
        var width = 250;
        var height = 250;
        var padding = 10;
        var dollarSignPositionX = 60;
        var dollarSignPositionY = 100;
        var amountPositionX = 75;
        var amountPositionY = 160;
        var FPS = 30;
        var maxAmount = 99;

        var amount = 0;
        var progress = 0;

        var draw = function() {
            clear();
            if (visible) {
                ctx.beginPath();
                ctx.fillStyle = backgroundColor;
                ctx.strokeStyle = backgroundColor;
                ctx.arc(width/2, height/2, (height/2) - (lineWidth/2) - padding, -(quart), ((circ)) - quart, true);
                ctx.fill();

                ctx.fillStyle = fontColor;
                ctx.font=dollarFont;
                ctx.fillText('$',dollarSignPositionX,dollarSignPositionY);
                ctx.font=numberFont;
                ctx.fillText('' + amount, amountPositionX, amountPositionY);

                if (barFilledOnce) {
                    var previousColorIndex = currentColorIndex - 1;
                    if (0 > previousColorIndex) {
                        previousColorIndex = strokeColors.length - 1;
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = strokeColors[previousColorIndex];

                    ctx.arc(width/2, height/2, (height/2) - lineWidth - padding, -(quart), ((circ)) - quart, true);
                    ctx.stroke();
                }
                ctx.strokeStyle = strokeColors[currentColorIndex];
                ctx.beginPath();
                ctx.arc(width/2, height/2, (height/2) - lineWidth - padding, -(quart), ((circ) * progress) - quart, false);
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
                progress += 1 / FPS;
                if (progress > 1) {
                    if (amount < maxAmount) {
                        amount ++;
                        progress = 0;
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
                ctx.lineCap = 'square';

                ctx.fillStyle = backgroundColor;
                ctx.lineWidth = lineWidth;
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
                visible = false;
                shouldUpdate = false;
                amount = 0;
                progress = 0;
            }
        }
    }]);