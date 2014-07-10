//var mul_table = [ 1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1];
//
//
//var shg_table = [0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];

var mul_table = [ 1,57,41,21,203,34,97,73,227,91,149,62,105,45,39,137,241,107,3,173,39,71,65,238,219,101,187,87,81,151,141,133,249,117,221,209,197,187,177,169,5,153,73,139,133,127,243,233,223,107,103,99,191,23,177,171,165,159,77,149,9,139,135,131,253,245,119,231,224,109,211,103,25,195,189,23,45,175,171,83,81,79,155,151,147,9,141,137,67,131,129,251,123,30,235,115,113,221,217,53,13,51,50,49,193,189,185,91,179,175,43,169,83,163,5,79,155,19,75,147,145,143,35,69,17,67,33,65,255,251,247,243,239,59,29,229,113,111,219,27,213,105,207,51,201,199,49,193,191,47,93,183,181,179,11,87,43,85,167,165,163,161,159,157,155,77,19,75,37,73,145,143,141,35,138,137,135,67,33,131,129,255,63,250,247,61,121,239,237,117,29,229,227,225,111,55,109,216,213,211,209,207,205,203,201,199,197,195,193,48,190,47,93,185,183,181,179,178,176,175,173,171,85,21,167,165,41,163,161,5,79,157,78,154,153,19,75,149,74,147,73,144,143,71,141,140,139,137,17,135,134,133,66,131,65,129,1];


var shg_table = [0,9,10,10,14,12,14,14,16,15,16,15,16,15,15,17,18,17,12,18,16,17,17,19,19,18,19,18,18,19,19,19,20,19,20,20,20,20,20,20,15,20,19,20,20,20,21,21,21,20,20,20,21,18,21,21,21,21,20,21,17,21,21,21,22,22,21,22,22,21,22,21,19,22,22,19,20,22,22,21,21,21,22,22,22,18,22,22,21,22,22,23,22,20,23,22,22,23,23,21,19,21,21,21,23,23,23,22,23,23,21,23,22,23,18,22,23,20,22,23,23,23,21,22,20,22,21,22,24,24,24,24,24,22,21,24,23,23,24,21,24,23,24,22,24,24,22,24,24,22,23,24,24,24,20,23,22,23,24,24,24,24,24,24,24,23,21,23,22,23,24,24,24,22,24,24,24,23,22,24,24,25,23,25,25,23,24,25,25,24,22,25,25,25,24,23,24,25,25,25,25,25,25,25,25,25,25,25,25,23,25,23,24,25,25,25,25,25,25,25,25,25,24,22,25,25,23,25,25,20,24,25,24,25,25,22,24,25,24,25,24,25,25,24,25,25,25,25,22,25,25,25,24,25,24,25,18];


var mul_table = [ 1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1];


var shg_table = [0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9
];


canvasEngine.ImageManager = {

    _imageMap: {},

    _shouldDraw: false,

    createImage: function(imageName, imageProperties) {
        var me = this;
        me._imageMap[imageName] = new canvasEngine.Image(imageProperties);

        return me._imageMap[imageName]._completePromise;
    },


    getImage: function(name) {
        var me = this;
        if (name && me._imageMap[name]) {
            return me._imageMap[name];
        }
        else {
            return null;
        }
        
    },

    renameImage: function(oldName, newName) {
        var me = this;
        me.removeImage(newName);
        me._imageMap[newName] = me._imageMap[oldName];
        delete me._imageMap[oldName];
    },

    setImage: function(name, image) {
        var me = this;
        me._imageMap[name] = null;
        me._imageMap[name] = image;
    },

    removeImage: function(name) {
        var me = this;
        if (name && me._imageMap[name]) {
            me._imageMap[name] = null;
            delete me._imageMap[name];
        }
    },

    resizeAllImagesTo: function(size) {
        var me = this;
        var image;

        for (image in me._imageMap) {
            if (me._imageMap.hasOwnProperty(image)) {
                if (me._imageMap[image]) {
                    me._imageMap[image].setSize(size);
                }
            }
        }
    },

    clearImage: function(name) {
        var me = this;
        if (name && me._imageMap[name]) {
            me._imageMap[name] = null;
        }
    },

    clearImages: function() {
        var me = this;
        me._imageMap = {};
    },


    update: function() {
        var me = this;
        var image;
        var shouldDraw = false;
        var promisesToFulfill = [];
        var i;
        for (image in me._imageMap) {
            if (me._imageMap.hasOwnProperty(image)) {
                if (me._imageMap[image]) {
                    if (me._imageMap[image]._image.complete && me._imageMap[image]._completePromise) {
                        me._imageMap[image]._completePromise.setSuccessful(true);
                        me._imageMap[image]._completePromise.setResponse(me._imageMap[image]);

                        me._imageMap[image]._completePromise.fulfill();
                        me._imageMap[image]._completePromise = null;
                        me._imageMap[image].setDirty(true);
                    }

                    var promises = me._imageMap[image].update();
                    if (promises.length > 0) {
                        promisesToFulfill = promisesToFulfill.concat(promises);
                    }

                    shouldDraw = me._imageMap[image].isDirty();
                    if (shouldDraw) {
                        me._shouldDraw = true;
                    }
                    me._imageMap[image].setDirty(false);
                }
            }
        }
        for (i = 0; i < promisesToFulfill.length; i++) {
            if (promisesToFulfill[i]) {
                promisesToFulfill[i].fulfill();
                promisesToFulfill[i] = null;
            }
        }
    },

    draw: function(context) {
        var me = this;
        var image;
        var imageData;
        if (me._shouldDraw) {
            canvasEngine.clear();
            context.save();
            for (image in me._imageMap) {
                if (me._imageMap.hasOwnProperty(image)) {
                    if (me._imageMap[image] && me._imageMap[image]._url !='' && me._imageMap[image]._image.complete) {

                        var bottomData;

                        // Draw the image so we can access all dem pixels
                        context.drawImage(me._imageMap[image].getImage(), me._imageMap[image]._position.x, me._imageMap[image]._position.y, me._imageMap[image]._size.x, me._imageMap[image]._size.y);
                        if (imageData) {
                            bottomData = imageData;
                        }
                        else {
                            var copy;
                            var copyData;
                            copy = context.createImageData(me._imageMap[image]._size.x, me._imageMap[image]._size.y);
//                            copyData = new Uint8ClampedArray(imageData.data);
//                            copy.data.set(copyData);
                            bottomData = copy;
                        }

                        imageData = me._imageMap[image]._getImageData(context);
                        if (imageData) {

                            if (me._imageMap[image]._blurRadius > 1) {
                                imageData = me._imageMap[image]._blurImageData(imageData, context);
                            }

                            if (me._imageMap[image]._color.a < 1.0 || me._imageMap[image]._tint) {
                                imageData = me._imageMap[image]._setTint(imageData, bottomData);
                            }
                            context.putImageData(imageData, me._imageMap[image]._position.x, me._imageMap[image]._position.y);
                        }
                    }
                    context.restore();


                }
                me._shouldDraw = false;
            }
            me._displayedTop = false;
        }
    }
};

canvasEngine.Image = canvasEngine.Object3D.$extend({
//    _color: null,
//    _blurRadius: 0,
//    _imageInterpolations: new canvasEngine.HashArray(),
//    _image: null,
//    _size: new canvasEngine.Math.Vector3(0,0,0),
//    _tint: null,
//    _url: null,
//    _position: null,
//    _imageLoaded: false,
//    _imagePromises: {},
//    _completePromise: null,
//    _dirty: true,
//    _cachedBlurs: [],
//    _cachedImageData: null,

    __init__: function(properties) {
        var me = this;
        properties = (properties) ? properties : {};
        me.$super(properties);

        me._completePromise = new canvasEngine.Promise();
        me._completePromise.setSuccessful(false);
        me._completePromise.setResponse(me);

        me._url = (properties.url) ? properties.url : '';
        me._position = (properties.position) ? properties.position : new canvasEngine.Math.Vector3(0,0,0);

        me._color = (properties.color) ? properties.color : new canvasEngine.Color(0,0,0, 1.0);
        me._color.a = (typeof properties.alpha === 'undefined') ? 1.0 : properties.alpha;
        me._blurRadius = (properties.blurRadius) ? properties.blurRadius : 0;
        me._size = (properties.size) ? (properties.size) : new canvasEngine.Math.Vector3(0,0,0);
        me._tint = properties.tint;

        me._image = new Image();
        me._imagedLoaded = false;
        me._image.onLoad = function() {
            me._imageLoaded = true;
        };
        me._image.src = me._url;
        me._imagePromises = {};
        me._imageInterpolations = new canvasEngine.HashArray();
        me._dirty = true;
        me._cachedBlurs = [];
        me._cachedImageData = null;

        return me._completePromise;
    },

    isDirty: function() {
        var me = this;
        return me._dirty;
    },

    setDirty: function(dirty) {
        var me = this;
        me._dirty = dirty;
    },

    getImage: function() {
        var me = this;
        return me._image;
    },

    getSize: function() {
        var me = this;
        return me._size;
    },

    setSize: function(size) {
        var me = this;
        me._dirty = true;
        me._size.x = size.width;
        me._size.y = size.height;
    },

    setTint: function(color, strength, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (0 > time) {
            time = 0;
        }

        if (color) {
            color.a = strength;
        }

        if (0 == time) {
            me._dirty = true;
            me._color = color;

        }
        else {
            var tintAmountInterpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(me._tint.a, 0, 0), new canvasEngine.Math.Vector3(color.a, 0, 0), time, false);
            var tintInterpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(me._tint.r, me._tint.g, me._tint.b), new canvasEngine.Math.Vector3(color.r, color.g, color.b), time, false);
            me._imageInterpolations.add(canvasEngine.InterpolationConstants.TINT_INTERPOLATION, tintInterpolation);
            me._imageInterpolations.add(canvasEngine.InterpolationConstants.TINT_STRENGTH_INTERPOLATION, tintAmountInterpolation);

            me._imagePromises[tintInterpolation.id] = promise;
        }

        return promise;
    },

    setColor: function(color, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (0 > time) {
            time = 0;
        }

        if (0 == time) {
            me._dirty = true;
            me._color = color;

        }
        else {
            var colorInterpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(me._color.r, me._color.g, me._color.b), new canvasEngine.Math.Vector3(color.r, color.g, color.b), time, false);
            var alphaInterpolation  = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(me._color.a, 0, 0), new canvasEngine.Math.Vector3(color.a, 0, 0), time, false);
            me._imageInterpolations.add(canvasEngine.InterpolationConstants.COLOR_INTERPOLATION, colorInterpolation);
            me._imageInterpolations.add(canvasEngine.InterpolationConstants.ALPHA_INTERPOLATION, alphaInterpolation);

            me._imagePromises[alphaInterpolation.id] = promise;
        }

        return promise;
    },

    setAlpha: function(alpha, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (0 > time) {
            time = 0;
        }

        if (0 == time) {
            me._dirty = true;
            me._color.a = alpha;

        }
        else {
            var newColor = new canvasEngine.Color(me._color.r, me._color.g ,me._color.b, alpha);
            newColor.a = alpha;
            me.setColor(newColor, time).then(
                function(success) {
                    promise.setSuccessful(true);
                    promise.setResponse(success);
                    promise.fulfill();
                }
            );
        }

        return promise;
    },

    setBlur: function(blurRadius, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (0 > time) {
            time = 0;
        }

        if (0 == time) {
            me._dirty = true;
            me._blurRadius = blurRadius;
        }
        else {
            var blurInterpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(me._blurRadius, 0, 0), new canvasEngine.Math.Vector3(blurRadius, 0,0), time, false);
            me._imageInterpolations.add(canvasEngine.InterpolationConstants.BLUR_INTERPOLATION, blurInterpolation);

            me._imagePromises[blurInterpolation.id] = promise;
        }

        return promise;
    },

    update: function() {
        var me = this;

        me.$super();

        var promise;
        var promisesToFulfill = [];
        var i;
        var value;
        var interpolationType = me._imageInterpolations.getNextIndex();
        var updated = false;
        while (interpolationType) {
            value = new canvasEngine.Math.Vector3(0,0,0);
            var interpolation = me._imageInterpolations.getNext(interpolationType);
            while (interpolation) {
                me._dirty = true;
//                value += interpolation.getNextPosition().subtract(me.position);
                var interpolationSlice = interpolation.getNextSlice();
                value = value.add(interpolationSlice);
                if (interpolation.isFinished()) {
                    me._imageInterpolations.remove(interpolationType, interpolation);

                    promise = me._imagePromises[interpolation.id];
                    if (promise) {
                        delete me._imagePromises[interpolation.id];
                        interpolation = null;
                        promise.setSuccessful(true);
                        promise.setResponse(me);
                        promisesToFulfill.push(promise);
                    }
                }
                interpolation = me._imageInterpolations.getNext(interpolationType);
            }

            switch (interpolationType) {
                case canvasEngine.InterpolationConstants.COLOR_INTERPOLATION:
                    me._color.setColor(me._color.r + value.x, me._color.g + value.y, me._color.b + value.z, me._color.a);
                    break;
                case canvasEngine.InterpolationConstants.ALPHA_INTERPOLATION:
                    me._color.a += value.x;
                    break;
                case canvasEngine.InterpolationConstants.TINT_INTERPOLATION:
                    me._color.setColor(me._tint.r + value.x, me._tint.g + value.y, me._tint.b + value.z, me._tint.a);
                    break;
                case canvasEngine.InterpolationConstants.TINT_STRENGTH_INTERPOLATION:
                    me._color.setColor(me._tint.r, me._tint.g, me._tint.b, me._tint.a + value.x);
                    break;
                case canvasEngine.InterpolationConstants.BLUR_INTERPOLATION:
                    me._blurRadius = me._blurRadius + value.x;
                    break;
            }

            interpolationType = me._imageInterpolations.getNextIndex();
        }

//        for (i = 0; i < promisesToFulfill.length; i++) {
//            promisesToFulfill[i].fulfill();
//        }
        return promisesToFulfill;
    },

    _copyImageData: function(imageData, context) {
        var me = this;
        var copy;
        var copyData;
        var i;
        copy = context.createImageData(imageData);
        copyData = new Uint8ClampedArray(imageData.data);
        copy.data.set(copyData);

        for (i = 0; i < imageData.data.length; i ++) {
            copy.data[i] = imageData.data[i];
        }

        return copy;
    },

    _getImageData: function(context) {

        var me = this;
        if (me._cachedImageData) {
            return me._copyImageData(me._cachedImageData, context);
        }
        var imageData;
        var top_x = me._position.x;
        var top_y = me._position.y;
        var width = me._size.x;
        var height = me._size.y;
        try {
            try {
                imageData = context.getImageData( top_x, top_y, width, height );
            } catch(e) {

                // NOTE: this part is supposedly only needed if you want to work with local files
                // so it might be okay to remove the whole try/catch block and just use
                // imageData = context.getImageData( top_x, top_y, width, height );
                try {
//                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                    imageData = context.getImageData( top_x, top_y, width, height );
                } catch(e) {
                    alert("Cannot access local image");
                    throw new Error("unable to access local image data: " + e);
                }
            }
        } catch(e) {
            alert("Cannot access image");
            throw new Error("unable to access image data: " + e);
        }

        me._cachedImageData = me._copyImageData(imageData, context);
        return imageData;
    },

    _setTint: function(imageData, oldImageData) {
        var me = this;

        var alpha = me._color.a;
        var ta = 0;
        var tr = 0;
        var tg = 0;
        var tb = 0;
        if (me._tint) {
            ta = me._tint.a;
            tr = me._tint.r;
            tg = me._tint.g;
            tb = me._tint.b;
        }
        var i;

        for (i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.min(255, ((imageData.data[i] * alpha) * (1.0 - ta) + tr * ta) + oldImageData.data[i] * (1.0-alpha));
            imageData.data[i+1] = Math.min(255, ((imageData.data[i+1] * alpha) * (1.0 - ta) + tg * ta) + oldImageData.data[i+1] * (1.0-alpha));
            imageData.data[i+2] = Math.min(255, ((imageData.data[i+2] * alpha) * (1.0 - ta) + tb * ta) + oldImageData.data[i+2] * (1.0-alpha));

        }

        return imageData;
    },


//    _blurImageData: function(imageData){
//        var me = this;
//
//        var radius = me._blurRadius;
//        var iterations = 1;
//        if ( isNaN(radius) || radius < 1 ) return imageData;
//
//        radius |= 0;
//
//        if ( isNaN(iterations) ) iterations = 1;
//        iterations |= 0;
//        if ( iterations > 3 ) iterations = 3;
//        if ( iterations < 1 ) iterations = 1;
//
//        var position = me.getPosition();
//        var top_x = position.x;
//        var top_y = position.y;
//        var size = me.getSize();
//        var width = size.x;
//        var height = size. y;
//
//
//
//        var pixels = imageData.data;
//
//        var rsum,gsum,bsum,asum,x,y,i,p,p1,p2,yp,yi,yw,idx;
//        var wm = width - 1;
//        var hm = height - 1;
//        var wh = width * height;
//        var rad1 = radius + 1;
//
//        var r = [];
//        var g = [];
//        var b = [];
//
//        var mul_sum = mul_table[radius];
//        var shg_sum = shg_table[radius];
//
//        var vmin = [];
//        var vmax = [];
//
//        while ( iterations-- > 0 ){
//            yw = yi = 0;
//
//            for ( y=0; y < height; y++ ){
//                rsum = pixels[yw]   * rad1;
//                gsum = pixels[yw+1] * rad1;
//                bsum = pixels[yw+2] * rad1;
//
//                for( i = 1; i <= radius; i++ ){
//                    p = yw + (((i > wm ? wm : i )) << 2 );
//                    rsum += pixels[p++];
//                    gsum += pixels[p++];
//                    bsum += pixels[p++];
//                }
//
//                for ( x = 0; x < width; x++ ){
//                    r[yi] = rsum;
//                    g[yi] = gsum;
//                    b[yi] = bsum;
//
//                    if( y==0) {
//                        vmin[x] = ( ( p = x + rad1) < wm ? p : wm ) << 2;
//                        vmax[x] = ( ( p = x - radius) > 0 ? p << 2 : 0 );
//                    }
//
//                    p1 = yw + vmin[x];
//                    p2 = yw + vmax[x];
//
//                    rsum += pixels[p1++] - pixels[p2++];
//                    gsum += pixels[p1++] - pixels[p2++];
//                    bsum += pixels[p1++] - pixels[p2++];
//
//                    yi++;
//                }
//                yw += ( width << 2 );
//            }
//
//            for ( x = 0; x < width; x++ ){
//                yp = x;
//                rsum = r[yp] * rad1;
//                gsum = g[yp] * rad1;
//                bsum = b[yp] * rad1;
//
//                for( i = 1; i <= radius; i++ ){
//                    yp += ( i > hm ? 0 : width );
//                    rsum += r[yp];
//                    gsum += g[yp];
//                    bsum += b[yp];
//                }
//
//                yi = x << 2;
//                for ( y = 0; y < height; y++){
//                    pixels[yi]   = (rsum * mul_sum) >>> shg_sum;
//                    pixels[yi+1] = (gsum * mul_sum) >>> shg_sum;
//                    pixels[yi+2] = (bsum * mul_sum) >>> shg_sum;
//
//                    if( x == 0 ) {
//                        vmin[y] = ( ( p = y + rad1) < hm ? p : hm ) * width;
//                        vmax[y] = ( ( p = y - radius) > 0 ? p * width : 0 );
//                    }
//
//                    p1 = x + vmin[y];
//                    p2 = x + vmax[y];
//
//                    rsum += r[p1] - r[p2];
//                    gsum += g[p1] - g[p2];
//                    bsum += b[p1] - b[p2];
//
//                    yi += width << 2;
//                }
//            }
//        }
//        return imageData;
//    }

    _blurImageData: function(imageData, context) {
        var me = this;

        var copy;
        var copyData;
        var radius = Math.round(me._blurRadius);

        if (me._cachedBlurs[radius]) {
            return me._copyImageData(me._cachedBlurs[radius], context);
        }

        var position = me.getPosition();
        var top_x = position.x;
        var top_y = position.y;
        var size = me.getSize();
        var width = size.x;
        var height = size. y;
//        var radius = me._blurRadius;
        var iterations = 2;
        if ( isNaN(radius) || radius < 1 ) return;
        radius |= 0;

        if ( isNaN(iterations) ) iterations = 1;
        iterations |= 0;
        if ( iterations > 3 ) iterations = 3;
        if ( iterations < 1 ) iterations = 1;

        var pixels = imageData.data;

        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
            r_out_sum, g_out_sum, b_out_sum,
            r_in_sum, g_in_sum, b_in_sum,
            pr, pg, pb, rbs;

        var div = radius + radius + 1;
        var w4 = width << 2;
        var widthMinus1  = width - 1;
        var heightMinus1 = height - 1;
        var radiusPlus1  = radius + 1;

        var stackStart = new me._blurStack();
        var stack = stackStart;
        for ( i = 1; i < div; i++ )
        {
            stack = stack.next = new me._blurStack();
            if ( i == radiusPlus1 ) var stackEnd = stack;
        }
        stack.next = stackStart;
        var stackIn = null;



        var mul_sum = mul_table[radius];
        var shg_sum = shg_table[radius];

        while ( iterations-- > 0 ) {
            yw = yi = 0;

            for ( y = height; --y >-1; )
            {
                r_sum = radiusPlus1 * ( pr = pixels[yi] );
                g_sum = radiusPlus1 * ( pg = pixels[yi+1] );
                b_sum = radiusPlus1 * ( pb = pixels[yi+2] );

                stack = stackStart;

                for( i = radiusPlus1; --i > -1; )
                {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }

                for( i = 1; i < radiusPlus1; i++ )
                {
                    p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
                    r_sum += ( stack.r = pixels[p++]);
                    g_sum += ( stack.g = pixels[p++]);
                    b_sum += ( stack.b = pixels[p]);

                    stack = stack.next;
                }

                stackIn = stackStart;
                for ( x = 0; x < width; x++ )
                {
                    pixels[yi++] = (r_sum * mul_sum) >>> shg_sum;
                    pixels[yi++] = (g_sum * mul_sum) >>> shg_sum;
                    pixels[yi++] = (b_sum * mul_sum) >>> shg_sum;
                    yi++;

                    p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

                    r_sum -= stackIn.r - ( stackIn.r = pixels[p++]);
                    g_sum -= stackIn.g - ( stackIn.g = pixels[p++]);
                    b_sum -= stackIn.b - ( stackIn.b = pixels[p]);

                    stackIn = stackIn.next;
                }
                yw += width;
            }


            for ( x = 0; x < width; x++ )
            {
                yi = x << 2;

                r_sum = radiusPlus1 * ( pr = pixels[yi++]);
                g_sum = radiusPlus1 * ( pg = pixels[yi++]);
                b_sum = radiusPlus1 * ( pb = pixels[yi]);

                stack = stackStart;

                for( i = 0; i < radiusPlus1; i++ )
                {
                    stack.r = pr;
                    stack.g = pg;
                    stack.b = pb;
                    stack = stack.next;
                }

                yp = width;

                for( i = 1; i <= radius; i++ )
                {
                    yi = ( yp + x ) << 2;

                    r_sum += ( stack.r = pixels[yi++]);
                    g_sum += ( stack.g = pixels[yi++]);
                    b_sum += ( stack.b = pixels[yi]);

                    stack = stack.next;

                    if ( i < heightMinus1 ) yp += width;
                }

                yi = x;
                stackIn = stackStart;
                for ( y = 0; y < height; y++ )
                {
                    p = yi << 2;
                    pixels[p]   = (r_sum * mul_sum) >>> shg_sum;
                    pixels[p+1] = (g_sum * mul_sum) >>> shg_sum;
                    pixels[p+2] = (b_sum * mul_sum) >>> shg_sum;

                    p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

                    r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
                    g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
                    b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);

                    stackIn = stackIn.next;

                    yi += width;
                }
            }
        }

        me._cachedBlurs[radius] = me._copyImageData(imageData, context);

        return imageData;
    },

    _blurStack: function() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.next = null;
    }
});