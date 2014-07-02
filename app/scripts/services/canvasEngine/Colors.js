/**
 * Created by zeshe_000 on 11/2/13.
 */

canvasEngine.Colors = {

    colorFromRGBA: function(red, green, blue, alpha) {
        return new canvasEngine.Color(red, green, blue, alpha);
    },

    colorFromHex: function(hex, alpha) {
        if (hex) {
            var hexString = hex.toString(16);

            // valid hex color
            if (6 == hexString.length) {
                var red = hexString.substring(0,2);
                var green = hexString.substring(2,4);
                var blue = hexString.substring(4,6);
                return new canvasEngine.Color(parseInt(red), parseInt(green), parseInt(blue), alpha);
            }
        }

        return new canvasEngine.Color(0,0,0,1);
    }
};

canvasEngine.Color = function(red, green, blue, alpha) {
    var me = this;
    if (red < 0) {
        red = 0;
    }
    else if (red > 255) {
        red = 255;
    }

    if (green < 0) {
        green = 0;
    }
    else if (green > 255) {
        green = 255;
    }

    if (blue < 0) {
        blue = 0;
    }
    else if (blue > 255) {
        blue = 255;
    }

    me.r = red;
    me.g = green;
    me.b = blue;
    me.a = (typeof alpha === "undefined") ? 1.0 : alpha;
};

canvasEngine.Color.prototype = {
    constructor: canvasEngine.Color,

    _convertDigitToHex: function(intValue) {
        var hexString = intValue.toString(16);
        if (hexString.length < 2 ) {
            hexString = '0' + hexString;
        }
        return hexString;
    },

    hexValue: function() {
        var me = this;
        var hexString = '0x' + me._convertDigitToHex(me.r) + me._convertDigitToHex(me.g) + me._convertDigitToHex(me.b);
        return parseInt(hexString);
    },

    setColor: function(red, green, blue, alpha) {
        var me = this;
        me.r = red;
        me.g = green;
        me.b = blue;
        me.alpha = alpha;
    }
};

