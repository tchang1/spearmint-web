canvasEngine.InterpolationConstants = {
    TRANSLATION_INTERPOLATION: 'translationInterpolation',
    ROTATION_INTERPOLATION: 'rotationInterpolation',
    SCALE_INTERPOLATION: 'scaleInterpolation',
    COLOR_INTERPOLATION: 'colorInterpolation',
    ALPHA_INTERPOLATION: 'alphaInterpolation',
    BLUR_INTERPOLATION: 'blurInterpolation',
    TINT_INTERPOLATION: 'tintInterpolation',
    TINT_STRENGTH_INTERPOLATION: 'tintStrengthInterpolation'
};

canvasEngine.Object3D = Class.$extend({
    __init__: function(objectProperties) {
        var me = this;
        me.id = '';
        canvasEngine.IDManager.setID(me);
        me.position = new canvasEngine.Math.Vector3(0,0,0);
        me.rotation = new canvasEngine.Math.Vector3(0,0,0);
        me.size = new canvasEngine.Math.Vector3(1.0, 1.0, 1.0);
        me.repeats = [];
        me.pauses = [];
        me.pauseBlocks = [];

        if (objectProperties) {
            me.position = ('undefined' == typeof objectProperties.position) ? me.position
                : new canvasEngine.Math.Vector3(objectProperties.position.x, objectProperties.position.y, objectProperties.position.z);
            me.rotation = ('undefined' == typeof objectProperties.rotation) ? me.rotation
                : new canvasEngine.Math.Vector3(objectProperties.rotation.x, objectProperties.rotation.y, objectProperties.rotation.z);
            me.size = ('undefined' == typeof objectProperties.size) ? me.size
                : new canvasEngine.Math.Vector3(objectProperties.size.x, objectProperties.size.y, objectProperties.size.z);
        }
        me.interpolations = new canvasEngine.HashArray();
        me.promises = [];
    },

    setPosition: function(position) {
        if (position) {
            var me = this;
            me.position.x = position.x;
            me.position.y = position.y;
            me.position.z = position.z;

        }
    },
    
    getPosition: function() {
        return this.position;    
    },
    
    setRotation: function(rotation) {
        if (rotation) {
            var me = this;
            me.rotation.x = rotation.x;
            me.rotation.y = rotation.y;
            me.rotation.z = rotation.z;
        }
    },
    
    getRotation: function() {
        return this.rotation;    
    },
    
    setScale: function(scale) {
        if (scale) {
            var me = this;
            me.scale.x = scale.x;
            me.scale.y = scale.y;
            me.scale.z = scale.z;
        }
    },
    
    getScale: function() {
        return this.scale;    
    },
    
    setState: function(state) {
        if (state) {
            var me = this;
            if ('undefined' != typeof state.position) {
                me.setPosition(state.position);
            }
            if ('undefined' != typeof state.rotation) {
                me.setRotation(state.rotation);    
            }
            if ('undefined' != typeof state.scale) {
                me.setScale(state.scale);    
            }
        }
    },

    startRepeat: function(repeatBlockName, repeatBlock) {
        var me = this;
        me.repeats[repeatBlockName] = repeatBlock;
        repeatBlock.apply(me);
    },

    repeat: function(repeatBlockName) {
        var me = this;
        if (me.repeats[repeatBlockName]) {
            me.repeats[repeatBlockName].apply(me);
        }
    },

    pauseThen: function(pauseTime, block) {
        var me = this;
        var pause = new canvasEngine.Pause(pauseTime);
        me.pauses[pause.id] = pause;
        me.pauseBlocks[pause.id] = block;
    },
    
    translate: function(position, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (!(time) || 0 > time) {
            time = 0;
        }
        if (0 == time) {
            me.setPosition(position);
        }
        else {
            var interpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(0,0,0), position, time, false);
            me.interpolations.add(canvasEngine.InterpolationConstants.TRANSLATION_INTERPOLATION, interpolation);
            me.promises[interpolation.id] = promise;
        }

        return promise;
    },
    
    translateTo: function(position, time) {
        var me = this;
        if (!(position instanceof canvasEngine.Math.Vector3)) {
            position = new canvasEngine.Math.Vector3(position.x, position.y, position.z);
        }

        position = position.subtract(me.position);
        return me.translate(position, time);
    },
    
    rotate: function(rotation, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (!(time) || 0 > time) {
            time = 0;
        }
        if (0 == time) {
            me.setRotation(rotation);
        }
        else {
            var interpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(0,0,0), rotation, time, false);
            me.interpolations.add(canvasEngine.InterpolationConstants.ROTATION_INTERPOLATION, interpolation);
            me.promises[interpolation.id] = promise;
        }

        return promise;
    },
    
    rotateTo: function(rotation, time) {
        var me = this;
        if (!(rotation instanceof canvasEngine.Math.Vector3)) {
            rotation = new canvasEngine.Math.Vector3(rotation.x, rotation.y, rotation.z);
        }

        rotation = rotation.subtract(me.rotation);
        return me.rotate(rotation, time);
    },

    scale: function(scale, time) {
        var me = this;
        var promise = new canvasEngine.Promise();
        promise.setSuccessful(false);
        promise.setResponse(me);

        if (!(time) || 0 > time) {
            time = 0;
        }
        if (0 == time) {
            me.setScale(scale);
        }
        else {
            var interpolation = new canvasEngine.LinearInterpolation(new canvasEngine.Math.Vector3(1,1,1), scale, time, false);
            me.interpolations.add(canvasEngine.InterpolationConstants.SCALE_INTERPOLATION, interpolation);
            me.promises[interpolation.id] = promise;
        }

        return promise;
    },
    
    scaleTo: function(scale, time) {
        var me = this;
        if (!(scale instanceof canvasEngine.Math.Vector3)) {
            scale = new canvasEngine.Math.Vector3(scale.x, scale.y, scale.z);
        }

        scale = scale.subtract(me.scale);
        return me.scale(scale, time);
    },

    haltTranslation: function() {
        var me = this;
        me._halt(canvasEngine.InterpolationConstants.TRANSLATION_INTERPOLATION);
    },

    haltRotation: function() {
        var me = this;
        me._halt(canvasEngine.InterpolationConstants.ROTATION_INTERPOLATION);
    },

    haltScale: function() {
        var me = this;
        me._halt(canvasEngine.InterpolationConstants.SCALE_INTERPOLATION);
    },

    _halt: function(type) {
        var me = this;
        var interpolation = me.interpolations.getNext(type);
        while (interpolation) {
            var promise = me.promises[interpolation.id];
            promise.setResponse(me);
            promise.setSuccessful(false);
            promise.fulfill();
            delete me.promises[interpolation.id];
            me.interpolations.remove(type, interpolation);
            interpolation = me.interpolations.getNext(type);
        }
    },

    haltRepeat: function(name) {
        var me = this;
        if (name) {
            if (me.repeats[name]) {
                delete me.repeats[name];
            }
            else {
                Logger.warn('Invalid repeat block name', name);
            }
        }
        else {
            var toDelete = [];
            var name;
            var i;
            for (name in me.repeats) {
                toDelete.push(name);
            }
            for (i = 0; i < toDelete.length; i++) {
                delete me.repeats[toDelete[i]];
            }
        }
    },

    haltAll: function() {
        var me = this;
        me.haltRepeat();
        me.haltTranslation();
        me.haltRotation();
        me.haltScale();
    },

    update: function() {
        var me = this;
        var promise;
        var promisesToFullfil = [];
        var i;
        var value;
        var interpolationType = me.interpolations.getNextIndex();
        while (interpolationType) {
            value = new canvasEngine.Math.Vector3(0,0,0);

            var interpolation = me.interpolations.getNext(interpolationType);
            while (interpolation) {
//                value += interpolation.getNextPosition().subtract(me.position);
                var interpolationSlice = interpolation.getNextSlice();
                value = value.add(interpolationSlice);
                if (interpolation.isFinished()) {
                    me.interpolations.remove(interpolationType, interpolation);
                    promise = me.promises[interpolation.id];
                    delete me.promises[interpolation.id];
                    interpolation = null;
                    promise.setSuccessful(true);
                    promise.setResponse(me);
                    promisesToFullfil.push(promise);
                }
                interpolation = me.interpolations.getNext(interpolationType);
            }

            switch (interpolationType) {
                case canvasEngine.InterpolationConstants.TRANSLATION_INTERPOLATION:
                    me.position = me.position.add(value);
                    break;
                case canvasEngine.InterpolationConstants.ROTATION_INTERPOLATION:
                    me.rotation = me.rotation.add(value);
                    break;
                case canvasEngine.InterpolationConstants.SCALE_INTERPOLATION:
                    me.size = me.size.add(value);
                    break;
            }

            interpolationType = me.interpolations.getNextIndex();
        }

        for (i = 0; i < promisesToFullfil.length; i++) {
            promisesToFullfil[i].fulfill();
        }
        me.updatePauses();
    },

    updatePauses: function() {
        var me = this;
        var pauseID;
        var i;
        var pausesToRemove = [];
        for (pauseID in me.pauses) {
            if (me.pauses.hasOwnProperty(pauseID)) {
                if (me.pauses[pauseID].isFinished()) {
                    pausesToRemove.push(pauseID);
                    me.pauseBlocks[pauseID].apply(me);
                }
            }
        }
        for (i = 0; i < pausesToRemove.length; i++) {
            delete me.pauses[pausesToRemove[i]];
            delete me.pauseBlocks[pausesToRemove[i]];
        }
    }
});