'use strict';

angular.module('spearmintWebApp').factory('prettyPrettyBackground', ['logger',
    function(logger) {

        var topImageName = 'topImage';
        var bottomImageName = 'bottomImage';
        var blurAmount = 10.0;
        var hasAnImage = false;
        var _isBlurred = true;
        var initialized = false;

        var width;
        var height;
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        return {
            initWithCanvas: function(canvas) {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                var me = this;
                if (!initialized) {
                    width = window.innerWidth;
                    height = window.screen.height;
                    canvasEngine.init(canvas, 0, 0, width, height);
                    me._updateSize();
//                    window.addEventListener("resize", me._updateSize, false);
                    initialized = true;
                }
            },


            setImage: function(imageURL, blurred, tint) {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                hasAnImage = true;
//                canvasEngine.ImageManager.createImage(bottomImageName);
                canvasEngine.ImageManager.createImage(topImageName, {
                    url: imageURL,
                    position: new canvasEngine.Math.Vector3(0,0,0),
                    size: new canvasEngine.Math.Vector3(width, height, 1),
                    blurRadius: (blurred) ? blurAmount : 0,
                    tint: tint
                });
            },

            hasImage: function() {
                return hasAnImage;
            },

            isBlurred: function() {
                return _isBlurred;
            },

            start: function() {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                logger.log('starting');
                canvasEngine.run();
            },

            stop: function() {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                canvasEngine.pause();
            },

            blur: function(time) {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                logger.log('blurring');
                _isBlurred = true;
                var topImage = canvasEngine.ImageManager.getImage(topImageName);
                if (topImage) {
                    topImage.setBlur(blurAmount, time);
                }

                var bottomImage = canvasEngine.ImageManager.getImage(bottomImageName);
                if (bottomImage) {
                    bottomImage.setBlur(blurAmount, time);
                }

            },

            unblur: function(time) {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                logger.log('unblurring');
                _isBlurred = false;
                var topImage = canvasEngine.ImageManager.getImage(topImageName);
                if (topImage) {
                    topImage.setBlur(0, time);
                }

                var bottomImage = canvasEngine.ImageManager.getImage(bottomImageName);
                if (bottomImage) {
                    bottomImage.setBlur(0, time);
                }
            },

            transitionToImage: function(newImage, time, blurred, tint) {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                blurred = (blurred == true);
                canvasEngine.ImageManager.createImage(bottomImageName, {
                    url: newImage,
                    position: new canvasEngine.Math.Vector3(0,0,0),
                    size: new canvasEngine.Math.Vector3(width, height, 1),
                    blurRadius: (blurred) ? blurAmount : 0,
                    alpha:0.0,
                    tint: tint
                }).then(
                    function(image) {
//                        var topImage = canvasEngine.ImageManager.getImage(topImageName);
                        image.setAlpha(1.0, time).then(
                    function(success) {
//                        logger.log('swapping images');
                        canvasEngine.ImageManager.renameImage(bottomImageName, topImageName);
//                        canvasEngine.ImageManager.setImage(topImageName, canvasEngine.ImageManager.getImage(bottomImageName));
//                        canvasEngine.ImageManager.clearImage(bottomImageName);
                        logger.log(canvasEngine.ImageManager);
                    })}
                );


//                logger.log('setting alpha to 0 in ' + time + ' milliseconds');
//                bottomImage.setAlpha(1, time).then(
//                    function(success) {
//                        canvasEngine.ImageManager.renameImage(bottomImageName, topImageName);
//                    }
//                )
            },

            _updateSize: function() {
                if(userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){ return;}
                logger.log('updating size');
                width = window.innerWidth;
                height = window.innerHeight;
                canvasEngine.updateSize(0, 0, width, height);

            }
        }
    }]);