((webpackChunkscratch_extensions) => {
    /**
     * @type {{
     *   getValueInJSON: (js: string, jsonObj: any) => string | number | boolean | undefined;
     *   setValueInJSON: (js: string, jsonObj: any, valueObj: any) => string;
     * }}
     */
    const safeEval = (() => {
        const i = document.createElement("iframe");
        i.style.display = "none";
        i.src = "about:blank";
        document.body.appendChild(i);
        const safeEval = i.contentWindow.eval(`
            ((myEval) => {
                "use strict";
                const { stringify } = JSON;
                const { isArray } = Array;
                function cloneInputObj(input, copiedObj = (new Map)) {
                    if (input == null) return input;
                    switch (typeof input) {
                        case "object":
                            if (copiedObj.has(input)) return copiedObj.get(input);
                            const out = isArray(input) ? [] : {};
                            copiedObj.set(input, out);
                            for (const key in input) {
                                out[key] = cloneInputObj(input[key], copiedObj);
                            }
                            return out;
                        case "string":
                        case "number":
                        case "boolean":
                            return input;
                    }
                    return '' + input;
                };
                function _typeof(e) {
                    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    }
                    : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                    ,
                    _typeof(e)
                };
                return {
                    getValueInJSON: (js, jsonObj) => {
                        "use strict";
                        js += '';
                        jsonObj = cloneInputObj(jsonObj);
                        var rtObj = myEval(js, jsonObj);
                        if ("object" === _typeof(rtObj)) return stringify(rtObj);
                        switch (typeof rtObj) {
                            case "string":
                            case "number":
                            case "boolean":
                            case "undefined":
                                return rtObj;
                        }
                        return '' + rtObj;
                    },
                    setValueInJSON: (js, jsonObj, valueObj) => {
                        "use strict";
                        js += '';
                        jsonObj = cloneInputObj(jsonObj);
                        valueObj = cloneInputObj(valueObj);
                        myEval(js, jsonObj, valueObj);
                        return stringify(jsonObj);
                    }
                };
            })((js, jsonObj, valueObj) => eval(js))
        `);
        /* 务必移除iframe，防止沙盒逃逸 */
        document.body.removeChild(i);
        return safeEval
    })();

    const injectMethods = {
        getValueInJSON(t) {
            var e, r = String(t.KEY), a = String(t.JSON);
            try {
                e = JSON.parse(a)
            } catch (t) {
                return "error: ".concat(t.message)
            }
            if (/[()=]/gm.test(r))
                return "error: invalid key ".concat(r, ", cannot contain ()=");
            var n, o = "jsonObj[".concat(r, "]");
            Array.isArray(e) ? r = r.startsWith("[") ? "jsonObj".concat(r) : "jsonObj[".concat(r, "]") : /\s/gm.test(r) ? (console.warn("[CCW Data] warning: invalid key ".concat(r, ", space and dot cannot be used together")),
                r = 'jsonObj["'.concat(r, '"]')) : r = "jsonObj.".concat(r);
            try {
                n = safeEval.getValueInJSON(r, e)
            } catch (t) {
                try {
                    n = safeEval.getValueInJSON(o, e)
                } catch (t) {
                    return "error: key or expression invalid"
                }
            }
            return n
        },
        setValueInJSON(t) {
            var e, r = String(t.KEY), a = String(t.VALUE), n = String(t.JSON);
            try {
                e = JSON.parse(n)
            } catch (t) {
                return "error: ".concat(t.message)
            }
            if (/[()=]/gm.test(r))
                return "error: invalid key ".concat(r, ", cannot contain ()=");
            var o = a;
            if (/^[\[].*?[\]]$/gm.test(a) || /^[\{].*?[\}]$/gm.test(a))
                try {
                    o = JSON.parse(a)
                } catch (t) { }
            "string" == typeof o && /^-?\d*\.?\d*$/gm.test(o) && (o = Number(o));
            try {
                if (!Array.isArray(e) && /[\.\[\]]/gm.test(r))
                    return safeEval.setValueInJSON("jsonObj.".concat(r, " =valueObj"), e, o);
                e[r] = o
            } catch (t) {
                return "error: key or expression invalid"
            }
            return JSON.stringify(e)
        }
    };

    return {
        push(...args) {
            for (const a of args) {
                if (typeof a != 'object' || !a) continue;
                const mods = a[1];
                for (const modNumber in mods) {
                    const mod = mods[modNumber];
                    if (!/\b[gs]etValueInJSON\b/.test(mod + '')) continue;
                    mods[modNumber] = function (t, e, r, ...args) {
                        function _r() {
                            return r.apply(this, arguments)
                        }
                        Object.assign(_r, r);
                        _r.d = function (e, exp, ...args) {
                            const _default = exp.default;
                            exp.default = function () {
                                /** @type {new (runtime: any) => any} */
                                const CCWData = _default.apply(this, arguments);
                                Object.assign(CCWData.prototype, injectMethods);
                                exp.default = _default;
                                return CCWData
                            };
                            return r.d.call(this, e, exp, ...args)
                        };
                        return mod.call(this, t, e, _r, ...args)
                    }
                }
            }
            return webpackChunkscratch_extensions.push(...args)
        }
    }
})