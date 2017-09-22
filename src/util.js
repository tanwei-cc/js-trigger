var Arr = Array;
var Obj = Object;
var ObjPT = Obj.prototype;
var hasOwnProp = ObjPT.hasOwnProperty;

export function toLower(str) {
    return str ? str.toLowerCase() : '';
}

export function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

export function isType(obj, type) {
    return toLower(ObjPT.toString.call(obj)) === '[object ' + toLower(type) + ']';
}

export function isStr(obj) {
    return isType(obj, "string");
}

export function isFn(obj) {
    return isType(obj, "function");
}

export function isNull(obj) {
    return obj === null;
}

export function isObj(obj) {
    return isType(obj, "Object");
}

export function isNum(obj) {
    return isType(obj, "number");
}

export function isDate(obj) {
    return isType(obj, "date");
}

export function isArr(obj) {
    return (Arr.isArray || isType)(obj, "array");
}

export function isUnd(val) {
    return val === void 0;
}

export function has(obj, key) {
    return obj && hasOwnProp.call(obj, key);
}

export function keys(obj) {
    if (!isObj(obj)) return [];

    var fn = Obj.keys || function() {
        var result = [];
        for (var key in obj) {
            has(obj, key) && result.push(key);
        }
    };
    return fn(obj);
}

export function each(obj, fn) {
    if (!obj) return;

    var len = obj.length;
    if (len !== undefined) {
        for (var i = 0; i < len; i++) {
            if (false === fn(obj[i], i)) break;
        }
    } else {
        var _keys = keys(obj);
        len = _keys.length;
        for (var i = 0; i < len; i++) {
            if (false === fn(obj[_keys[i]], i)) break;
        }
    }
}

export function extend(target) {
    if (!target) return;

    each(arguments, function(source, idx) {
        if (idx && isObj(source)) {
            for (var k in source) {
                target[k] = source[k];
            }
        }
    });

    return target;
}