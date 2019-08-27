module.exports = function(raw) {
    var self = this;
    self.raw = raw;
    self.parsed = parse(self.raw);

    return self;
};
    
var VALID_TRANSFORMS = {
    "HEIGHT" : function(value) {
        var h = parseInt(value, 10);
        return h ? "h-" + h : "";
    },
    "WIDTH" : function(value) {
        var w = parseInt(value, 10);
        return w ? "w-" + w : "";
    },
    "QUALITY" : function(value) {
        var q = parseInt(value, 10);
        return q ? "q-" + q : "";
    },
    "CROP" : function(value) {
        return value ? "c-" + value : "";
    },
    "CROP_MODE" : function(value) {
        return value ? "cm-" + value : "";
    },
    "FOCUS" : function(value) {
        return value ? "fo-" + value : "";
    },
    "FORMAT" : function(value) {
        return value ? "f-" + value : "";
    },
    "ROUNDED_CORNER" : function(value) {
        var r = parseInt(value, 10);
        return r ? "r-" + r : "";
    },
    "BORDER" : function(value) {
        return value ? "b-" + value : "";
    },
    "ROTATION" : function(value) {
        var rt = parseInt(value, 10);
        return rt ? "rt-" + rt : "";
    },
    "BLUR" : function(value) {
        var bl = parseInt(value, 10);
        return bl ? "bl-" + bl : "";
    },
    "NAMED" : function(value) {
        return value ? "n-" + value : "";
    },
    "OVERLAY_IMAGE" : function(value) {
        return value ? "oi-" + value : "";
    },
    "OVERLAY_X" : function(value) {
        var ox = parseInt(value, 10);
        return ox ? "ox-" + ox : "";
    },
    "OVERLAY_Y" : function(value) {
        var oy = parseInt(value, 10);
        return oy ? "oy-" + oy : "";
    },
    "OVERLAY_FOCUS" : function(value) {
        return value ? "ofo-" + value : "";
    },
    "BACKGROUND" : function(value) {
        value = value || "";
        var regex = /[A-F0-9]{6}/;
        if(regex.test(value)) {
            return "bg-" + value;
        } else {
            return "";
        }
    },
    "PROGRESSIVE" : function(value) {
        if(value == true) {
            return "pr-true";
        } else {
            return "pr-false";
        }
    },
    "COLOR_PROFILE" : function(value) {
        if(value == true) {
            return "cp-true";
        } else {
            return "cp-false";
        }
    },
    "METADATA" : function(value) {
        if(value == true) {
            return "md-true";
        } else {
            return "md-false";
        }
    }
};

var parse = function(raw) {
    var parsed = [];
    for(var transform in raw) {
        if(!raw.hasOwnProperty(transform)) {
            continue;
        } 

        if(VALID_TRANSFORMS[transform]) {
            parsed.push(VALID_TRANSFORMS[transform](raw[transform]));
        }
    }

    return parsed.join(",");
};