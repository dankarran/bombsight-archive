if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'},
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case'string':
                return quote(value);
            case'number':
                return isFinite(value) ? String(value) : 'null';
            case'boolean':
            case'null':
                return String(value);
            case'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
            }
            ck[a] = e
        }
        return ck[a]
    }

    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function ct() {
        cr = b
    }

    function cs() {
        setTimeout(ct, 0);
        return cr = f.now()
    }

    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ci() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        }); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l
    }

    function bZ(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }

    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(f.expando)
        }
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/,
            m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g,
            r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/,
            u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty,
            E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf,
            I = {};
        e.fn = e.prototype = {
            constructor: e, init: function (a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a)) return f.ready(a);
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this)
            }, selector: "", jquery: "1.7.1", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return F.call(this, 0)
            }, get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            }, pushStack: function (a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            }, each: function (a, b) {
                return e.each(this, a, b)
            }, ready: function (a) {
                e.bindReady(), A.add(a);
                return this
            }, eq: function (a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: E, sort: [].sort, splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({
            noConflict: function (b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {
                        }
                        c.documentElement.doScroll && b && J()
                    }
                }
            }, isFunction: function (a) {
                return e.type(a) === "function"
            }, isArray: Array.isArray || function (a) {
                return e.type(a) === "array"
            }, isWindow: function (a) {
                return a && typeof a == "object" && "setInterval" in a
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d)
            }, isEmptyObject: function (a) {
                for (var b in a) return !1;
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                e.error("Invalid JSON: " + b)
            }, parseXML: function (c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            }, noop: function () {
            }, globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break
                    } else for (; g < h;) if (c.apply(a[g++], d) === !1) break
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break
                } else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
                return a
            }, trim: G ? function (a) {
                return a == null ? "" : G.call(a)
            } : function (a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) if (c in b && b[c] === a) return c
                }
                return -1
            }, merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                a.length = d;
                return a
            }, grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d
            }, map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length,
                    k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            }, access: function (a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) e.access(a, j, c[j], f, g, d);
                    return a
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                    return a
                }
                return i ? g(a[0], c) : b
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            }, browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
        }, n = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
            for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
        }, o = {
            add: function () {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                }
                return this
            }, remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                        if (a.unique) break
                    }
                }
                return this
            }, has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) if (a === c[b]) return !0
                }
                return !1
            }, empty: function () {
                c = [];
                return this
            }, disable: function () {
                c = d = e = b;
                return this
            }, disabled: function () {
                return !c
            }, lock: function () {
                d = b, (!e || e === !0) && o.disable();
                return this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                return this
            }, fire: function () {
                o.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!e
            }
        };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"),
                e = "pending", g = {resolve: b, reject: c, notify: d}, h = {
                    done: b.add, fail: c.add, progress: d.add, state: function () {
                        return e
                    }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    }, always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    }, pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    }, promise: function (a) {
                        if (a == null) a = h; else for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        }, when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {marginRight: 0}).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in {
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        k.removeChild(q), k = g = h = j = q = i = null, f(function () {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h
            }
            return this.each(function () {
                var b = f(this), e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            })
        }, removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        }, _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) return f.queue(this[0], a);
            return this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        }, delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }

            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise()
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, a, b, !0, f.attr)
        }, removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return f.access(this, a, b, !0, f.prop)
        }, removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g)
                    }
                }
            }
            return this
        }, removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h)
                    } else g.className = ""
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        }, hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        }, val: function (a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                }, set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            }, value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                }, set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {name: !0, id: !0}, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        }, set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get, set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/,
        D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({elem: l, matches: q})
                }
            }
            d.length > e && i.push({elem: this, matches: d.slice(e)});
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {setup: f.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
    }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        }, teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        }, handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            }, teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        }, off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        }, die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        }, toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1,
            i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === q) if (g == null) m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                } else if (d === 3 || d === 4) return a.nodeValue
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                    }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                }, "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                }, "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                }, TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                }, PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        d || e.push.apply(e, g);
                        return !1
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b
                }, POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                }, radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                }, checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                }, file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                }, password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                }, image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case"last":
                            while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                            return !0;
                        case"nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1],
                        d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                        e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d)
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) return s([], f);
                                if (i.id === h[3]) return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice,
        Q = f.expr.match.POS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break
                }
            }
            return e
        }, has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0
            })
        }, not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        }, index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return f.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        }, next: function (a) {
            return f.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return f.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return f.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return f.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return f.sibling(a.firstChild)
        }, contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        }, dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a
        }, sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i,
        _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return f.text(this)
        }, wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        }, remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        }, html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function (b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this), d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, bp)
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        }, clean: function (a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || ["", ""])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0],
                        o = b.createElement("div");
                    b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k),
                            q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                    }
                    !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [j + 1, 0].concat(s))
                    }
                    d.appendChild(h[j])
                }
            }
            return h
        }, cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/,
        bv = /^([\-+])=([\-+.\de]+)/, bw = {position: "absolute", visibility: "hidden", display: "block"},
        bx = ["Left", "Right"], by = ["Top", "Bottom"], bz, bA, bB;
    f.fn.css = function (a, c) {
        if (arguments.length === 2 && c === b) return this;
        return f.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {
                }
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) return bC(a, b, d);
                    f.swap(a, bw, function () {
                        e = bC(a, b, d)
                    });
                    return e
                }
            }, set: function (a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                f.swap(a, {display: "inline-block"}, function () {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c
    }), c.documentElement.currentStyle && (bB = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//,
        bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/,
        bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {},
        bV, bW, bX = ["*/"] + ["*"];
    try {
        bV = e.href
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        }, serialize: function () {
            return f.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {name: b.name, value: a.replace(bF, "\r\n")}
                }) : {name: b.name, value: c.replace(bF, "\r\n")}
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0; else try {
                            r = cc(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }

            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(),
                i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u,
                v = {
                    readyState: 0, setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    }, getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    }, overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    }, abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {success: 1, error: 1, complete: 1}) v[u](d[u]);
            p = b$(bU, d, c, v);
            if (!p) w(-1, "No Transport"); else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z); else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            }); else for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+")
        }
    }), f.extend({active: 0, lastModified: {}, etag: {}});
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return f.expando + "_" + cd++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h],
                j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                }, abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cf = a.ActiveXObject ? function () {
        for (var a in ch) ch[a](0, 1)
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ci() || cj()
    } : ci, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {
                    }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp,
        cq = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
        cr;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        }, hide: function (a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m,
                    n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }

            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        }, stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }

                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        }, easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            }, swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        }, custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }

            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
        }, show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(cp), cp = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function (a, b) {
        f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
        var b = this[0], c;
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {
        }
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {top: c.top, left: c.left} : {top: 0, left: 0};
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j,
            o = c.left + m - k;
        return {top: n, left: o}
    } : f.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {top: l, left: m}
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {top: b, left: c}
        }, setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(),
                d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {top: c.top - d.top, left: c.left - d.left}
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function (c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) return null;
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
            }
            return this.each(function () {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function (a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
(function (B) {
    B.color = {};
    B.color.make = function (F, E, C, D) {
        var G = {};
        G.r = F || 0;
        G.g = E || 0;
        G.b = C || 0;
        G.a = D != null ? D : 1;
        G.add = function (J, I) {
            for (var H = 0; H < J.length; ++H) {
                G[J.charAt(H)] += I
            }
            return G.normalize()
        };
        G.scale = function (J, I) {
            for (var H = 0; H < J.length; ++H) {
                G[J.charAt(H)] *= I
            }
            return G.normalize()
        };
        G.toString = function () {
            if (G.a >= 1) {
                return "rgb(" + [G.r, G.g, G.b].join(",") + ")"
            } else {
                return "rgba(" + [G.r, G.g, G.b, G.a].join(",") + ")"
            }
        };
        G.normalize = function () {
            function H(J, K, I) {
                return K < J ? J : (K > I ? I : K)
            }

            G.r = H(0, parseInt(G.r), 255);
            G.g = H(0, parseInt(G.g), 255);
            G.b = H(0, parseInt(G.b), 255);
            G.a = H(0, G.a, 1);
            return G
        };
        G.clone = function () {
            return B.color.make(G.r, G.b, G.g, G.a)
        };
        return G.normalize()
    };
    B.color.extract = function (D, C) {
        var E;
        do {
            E = D.css(C).toLowerCase();
            if (E != "" && E != "transparent") {
                break
            }
            D = D.parent()
        } while (!B.nodeName(D.get(0), "body"));
        if (E == "rgba(0, 0, 0, 0)") {
            E = "transparent"
        }
        return B.color.parse(E)
    };
    B.color.parse = function (F) {
        var E, C = B.color.make;
        if (E = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(F)) {
            return C(parseInt(E[1], 10), parseInt(E[2], 10), parseInt(E[3], 10))
        }
        if (E = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(F)) {
            return C(parseInt(E[1], 10), parseInt(E[2], 10), parseInt(E[3], 10), parseFloat(E[4]))
        }
        if (E = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(F)) {
            return C(parseFloat(E[1]) * 2.55, parseFloat(E[2]) * 2.55, parseFloat(E[3]) * 2.55)
        }
        if (E = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(F)) {
            return C(parseFloat(E[1]) * 2.55, parseFloat(E[2]) * 2.55, parseFloat(E[3]) * 2.55, parseFloat(E[4]))
        }
        if (E = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(F)) {
            return C(parseInt(E[1], 16), parseInt(E[2], 16), parseInt(E[3], 16))
        }
        if (E = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(F)) {
            return C(parseInt(E[1] + E[1], 16), parseInt(E[2] + E[2], 16), parseInt(E[3] + E[3], 16))
        }
        var D = B.trim(F).toLowerCase();
        if (D == "transparent") {
            return C(255, 255, 255, 0)
        } else {
            E = A[D] || [0, 0, 0];
            return C(E[0], E[1], E[2])
        }
    };
    var A = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
(function ($) {
    function Plot(placeholder, data_, options_, plugins) {
        var series = [], options = {
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: 0.85
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null,
                    monthNames: null,
                    timeformat: null,
                    twelveHourClock: false
                },
                yaxis: {autoscaleMargin: 0.02, position: "left"},
                xaxes: [],
                yaxes: [],
                series: {
                    points: {show: false, radius: 3, lineWidth: 2, fill: true, fillColor: "#ffffff", symbol: "circle"},
                    lines: {lineWidth: 2, fill: false, fillColor: null, steps: false},
                    bars: {
                        show: false,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: true,
                        fillColor: null,
                        align: "left",
                        horizontal: false
                    },
                    shadowSize: 3
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true,
                    mouseActiveRadius: 10
                },
                hooks: {}
            }, canvas = null, overlay = null, eventHolder = null, ctx = null, octx = null, xaxes = [], yaxes = [],
            plotOffset = {left: 0, right: 0, top: 0, bottom: 0}, canvasWidth = 0, canvasHeight = 0, plotWidth = 0,
            plotHeight = 0, hooks = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            }, plot = this;
        plot.setData = setData;
        plot.setupGrid = setupGrid;
        plot.draw = draw;
        plot.getPlaceholder = function () {
            return placeholder;
        };
        plot.getCanvas = function () {
            return canvas;
        };
        plot.getPlotOffset = function () {
            return plotOffset;
        };
        plot.width = function () {
            return plotWidth;
        };
        plot.height = function () {
            return plotHeight;
        };
        plot.offset = function () {
            var o = eventHolder.offset();
            o.left += plotOffset.left;
            o.top += plotOffset.top;
            return o;
        };
        plot.getData = function () {
            return series;
        };
        plot.getAxes = function () {
            var res = {}, i;
            $.each(xaxes.concat(yaxes), function (_, axis) {
                if (axis)
                    res[axis.direction + (axis.n != 1 ? axis.n : "") + "axis"] = axis;
            });
            return res;
        };
        plot.getXAxes = function () {
            return xaxes;
        };
        plot.getYAxes = function () {
            return yaxes;
        };
        plot.c2p = canvasToAxisCoords;
        plot.p2c = axisToCanvasCoords;
        plot.getOptions = function () {
            return options;
        };
        plot.highlight = highlight;
        plot.unhighlight = unhighlight;
        plot.triggerRedrawOverlay = triggerRedrawOverlay;
        plot.pointOffset = function (point) {
            return {
                left: parseInt(xaxes[axisNumber(point, "x") - 1].p2c(+point.x) + plotOffset.left),
                top: parseInt(yaxes[axisNumber(point, "y") - 1].p2c(+point.y) + plotOffset.top)
            };
        };
        plot.shutdown = shutdown;
        plot.resize = function () {
            getCanvasDimensions();
            resizeCanvas(canvas);
            resizeCanvas(overlay);
        };
        plot.hooks = hooks;
        initPlugins(plot);
        parseOptions(options_);
        setupCanvases();
        setData(data_);
        setupGrid();
        draw();
        bindEvents();

        function executeHooks(hook, args) {
            args = [plot].concat(args);
            for (var i = 0; i < hook.length; ++i)
                hook[i].apply(this, args);
        }

        function initPlugins() {
            for (var i = 0; i < plugins.length; ++i) {
                var p = plugins[i];
                p.init(plot);
                if (p.options)
                    $.extend(true, options, p.options);
            }
        }

        function parseOptions(opts) {
            var i;
            $.extend(true, options, opts);
            if (options.xaxis.color == null)
                options.xaxis.color = options.grid.color;
            if (options.yaxis.color == null)
                options.yaxis.color = options.grid.color;
            if (options.xaxis.tickColor == null)
                options.xaxis.tickColor = options.grid.tickColor;
            if (options.yaxis.tickColor == null)
                options.yaxis.tickColor = options.grid.tickColor;
            if (options.grid.borderColor == null)
                options.grid.borderColor = options.grid.color;
            if (options.grid.tickColor == null)
                options.grid.tickColor = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            for (i = 0; i < Math.max(1, options.xaxes.length); ++i)
                options.xaxes[i] = $.extend(true, {}, options.xaxis, options.xaxes[i]);
            for (i = 0; i < Math.max(1, options.yaxes.length); ++i)
                options.yaxes[i] = $.extend(true, {}, options.yaxis, options.yaxes[i]);
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
            if (options.x2axis) {
                options.xaxes[1] = $.extend(true, {}, options.xaxis, options.x2axis);
                options.xaxes[1].position = "top";
            }
            if (options.y2axis) {
                options.yaxes[1] = $.extend(true, {}, options.yaxis, options.y2axis);
                options.yaxes[1].position = "right";
            }
            if (options.grid.coloredAreas)
                options.grid.markings = options.grid.coloredAreas;
            if (options.grid.coloredAreasColor)
                options.grid.markingsColor = options.grid.coloredAreasColor;
            if (options.lines)
                $.extend(true, options.series.lines, options.lines);
            if (options.points)
                $.extend(true, options.series.points, options.points);
            if (options.bars)
                $.extend(true, options.series.bars, options.bars);
            if (options.shadowSize != null)
                options.series.shadowSize = options.shadowSize;
            for (i = 0; i < options.xaxes.length; ++i)
                getOrCreateAxis(xaxes, i + 1).options = options.xaxes[i];
            for (i = 0; i < options.yaxes.length; ++i)
                getOrCreateAxis(yaxes, i + 1).options = options.yaxes[i];
            for (var n in hooks)
                if (options.hooks[n] && options.hooks[n].length)
                    hooks[n] = hooks[n].concat(options.hooks[n]);
            executeHooks(hooks.processOptions, [options]);
        }

        function setData(d) {
            series = parseData(d);
            fillInSeriesOptions();
            processData();
        }

        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s = $.extend(true, {}, options.series);
                if (d[i].data != null) {
                    s.data = d[i].data;
                    delete d[i].data;
                    $.extend(true, s, d[i]);
                    d[i].data = s.data;
                } else
                    s.data = d[i];
                res.push(s);
            }
            return res;
        }

        function axisNumber(obj, coord) {
            var a = obj[coord + "axis"];
            if (typeof a == "object")
                a = a.n;
            if (typeof a != "number")
                a = 1;
            return a;
        }

        function allAxes() {
            return $.grep(xaxes.concat(yaxes), function (a) {
                return a;
            });
        }

        function canvasToAxisCoords(pos) {
            var res = {}, i, axis;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used)
                    res["x" + axis.n] = axis.c2p(pos.left);
            }
            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used)
                    res["y" + axis.n] = axis.c2p(pos.top);
            }
            if (res.x1 !== undefined)
                res.x = res.x1;
            if (res.y1 !== undefined)
                res.y = res.y1;
            return res;
        }

        function axisToCanvasCoords(pos) {
            var res = {}, i, axis, key;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used) {
                    key = "x" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "x";
                    if (pos[key] != null) {
                        res.left = axis.p2c(pos[key]);
                        break;
                    }
                }
            }
            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used) {
                    key = "y" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "y";
                    if (pos[key] != null) {
                        res.top = axis.p2c(pos[key]);
                        break;
                    }
                }
            }
            return res;
        }

        function getOrCreateAxis(axes, number) {
            if (!axes[number - 1])
                axes[number - 1] = {
                    n: number,
                    direction: axes == xaxes ? "x" : "y",
                    options: $.extend(true, {}, axes == xaxes ? options.xaxis : options.yaxis)
                };
            return axes[number - 1];
        }

        function fillInSeriesOptions() {
            var i;
            var neededColors = series.length, usedColors = [], assignedColors = [];
            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    --neededColors;
                    if (typeof sc == "number")
                        assignedColors.push(sc); else
                        usedColors.push($.color.parse(series[i].color));
                }
            }
            for (i = 0; i < assignedColors.length; ++i) {
                neededColors = Math.max(neededColors, assignedColors[i] + 1);
            }
            var colors = [], variation = 0;
            i = 0;
            while (colors.length < neededColors) {
                var c;
                if (options.colors.length == i)
                    c = $.color.make(100, 100, 100); else
                    c = $.color.parse(options.colors[i]);
                var sign = variation % 2 == 1 ? -1 : 1;
                c.scale('rgb', 1 + sign * Math.ceil(variation / 2) * 0.2)
                colors.push(c);
                ++i;
                if (i >= options.colors.length) {
                    i = 0;
                    ++variation;
                }
            }
            var colori = 0, s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                } else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();
                if (s.lines.show == null) {
                    var v, show = true;
                    for (v in s)
                        if (s[v] && s[v].show) {
                            show = false;
                            break;
                        }
                    if (show)
                        s.lines.show = true;
                }
                s.xaxis = getOrCreateAxis(xaxes, axisNumber(s, "x"));
                s.yaxis = getOrCreateAxis(yaxes, axisNumber(s, "y"));
            }
        }

        function processData() {
            var topSentry = Number.POSITIVE_INFINITY, bottomSentry = Number.NEGATIVE_INFINITY,
                fakeInfinity = Number.MAX_VALUE, i, j, k, m, length, s, points, ps, x, y, axis, val, f, p;

            function updateAxis(axis, min, max) {
                if (min < axis.datamin && min != -fakeInfinity)
                    axis.datamin = min;
                if (max > axis.datamax && max != fakeInfinity)
                    axis.datamax = max;
            }

            $.each(allAxes(), function (_, axis) {
                axis.datamin = topSentry;
                axis.datamax = bottomSentry;
                axis.used = false;
            });
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                s.datapoints = {points: []};
                executeHooks(hooks.processRawData, [s, s.data, s.datapoints]);
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                var data = s.data, format = s.datapoints.format;
                if (!format) {
                    format = [];
                    format.push({x: true, number: true, required: true});
                    format.push({y: true, number: true, required: true});
                    if (s.bars.show || (s.lines.show && s.lines.fill)) {
                        format.push({y: true, number: true, required: false, defaultValue: 0});
                        if (s.bars.horizontal) {
                            delete format[format.length - 1].y;
                            format[format.length - 1].x = true;
                        }
                    }
                    s.datapoints.format = format;
                }
                if (s.datapoints.pointsize != null)
                    continue;
                s.datapoints.pointsize = format.length;
                ps = s.datapoints.pointsize;
                points = s.datapoints.points;
                insertSteps = s.lines.show && s.lines.steps;
                s.xaxis.used = s.yaxis.used = true;
                for (j = k = 0; j < data.length; ++j, k += ps) {
                    p = data[j];
                    var nullify = p == null;
                    if (!nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = p[m];
                            f = format[m];
                            if (f) {
                                if (f.number && val != null) {
                                    val = +val;
                                    if (isNaN(val))
                                        val = null; else if (val == Infinity)
                                        val = fakeInfinity; else if (val == -Infinity)
                                        val = -fakeInfinity;
                                }
                                if (val == null) {
                                    if (f.required)
                                        nullify = true;
                                    if (f.defaultValue != null)
                                        val = f.defaultValue;
                                }
                            }
                            points[k + m] = val;
                        }
                    }
                    if (nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = points[k + m];
                            if (val != null) {
                                f = format[m];
                                if (f.x)
                                    updateAxis(s.xaxis, val, val);
                                if (f.y)
                                    updateAxis(s.yaxis, val, val);
                            }
                            points[k + m] = null;
                        }
                    } else {
                        if (insertSteps && k > 0 && points[k - ps] != null && points[k - ps] != points[k] && points[k - ps + 1] != points[k + 1]) {
                            for (m = 0; m < ps; ++m)
                                points[k + ps + m] = points[k + m];
                            points[k + 1] = points[k - ps + 1];
                            k += ps;
                        }
                    }
                }
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                executeHooks(hooks.processDatapoints, [s, s.datapoints]);
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                points = s.datapoints.points, ps = s.datapoints.pointsize;
                var xmin = topSentry, ymin = topSentry, xmax = bottomSentry, ymax = bottomSentry;
                for (j = 0; j < points.length; j += ps) {
                    if (points[j] == null)
                        continue;
                    for (m = 0; m < ps; ++m) {
                        val = points[j + m];
                        f = format[m];
                        if (!f || val == fakeInfinity || val == -fakeInfinity)
                            continue;
                        if (f.x) {
                            if (val < xmin)
                                xmin = val;
                            if (val > xmax)
                                xmax = val;
                        }
                        if (f.y) {
                            if (val < ymin)
                                ymin = val;
                            if (val > ymax)
                                ymax = val;
                        }
                    }
                }
                if (s.bars.show) {
                    var delta = s.bars.align == "left" ? 0 : -s.bars.barWidth / 2;
                    if (s.bars.horizontal) {
                        ymin += delta;
                        ymax += delta + s.bars.barWidth;
                    } else {
                        xmin += delta;
                        xmax += delta + s.bars.barWidth;
                    }
                }
                updateAxis(s.xaxis, xmin, xmax);
                updateAxis(s.yaxis, ymin, ymax);
            }
            $.each(allAxes(), function (_, axis) {
                if (axis.datamin == topSentry)
                    axis.datamin = null;
                if (axis.datamax == bottomSentry)
                    axis.datamax = null;
            });
        }

        function makeCanvas(skipPositioning, cls) {
            var c = document.createElement('canvas');
            c.className = cls;
            c.width = canvasWidth;
            c.height = canvasHeight;
            if (!skipPositioning)
                $(c).css({position: 'absolute', left: 0, top: 0});
            $(c).appendTo(placeholder);
            if (!c.getContext)
                c = window.G_vmlCanvasManager.initElement(c);
            c.getContext("2d").save();
            return c;
        }

        function getCanvasDimensions() {
            canvasWidth = placeholder.width();
            canvasHeight = placeholder.height();
            if (canvasWidth <= 0 || canvasHeight <= 0)
                throw"Invalid dimensions for plot, width = " + canvasWidth + ", height = " + canvasHeight;
        }

        function resizeCanvas(c) {
            if (c.width != canvasWidth)
                c.width = canvasWidth;
            if (c.height != canvasHeight)
                c.height = canvasHeight;
            var cctx = c.getContext("2d");
            cctx.restore();
            cctx.save();
        }

        function setupCanvases() {
            var reused, existingCanvas = placeholder.children("canvas.base"),
                existingOverlay = placeholder.children("canvas.overlay");
            if (existingCanvas.length == 0 || existingOverlay == 0) {
                placeholder.html("");
                placeholder.css({padding: 0});
                if (placeholder.css("position") == 'static')
                    placeholder.css("position", "relative");
                getCanvasDimensions();
                canvas = makeCanvas(true, "base");
                overlay = makeCanvas(false, "overlay");
                reused = false;
            } else {
                canvas = existingCanvas.get(0);
                overlay = existingOverlay.get(0);
                reused = true;
            }
            ctx = canvas.getContext("2d");
            octx = overlay.getContext("2d");
            eventHolder = $([overlay, canvas]);
            if (reused) {
                placeholder.data("plot").shutdown();
                plot.resize();
                octx.clearRect(0, 0, canvasWidth, canvasHeight);
                eventHolder.unbind();
                placeholder.children().not([canvas, overlay]).remove();
            }
            placeholder.data("plot", plot);
        }

        function bindEvents() {
            if (options.grid.hoverable) {
                eventHolder.mousemove(onMouseMove);
                eventHolder.mouseleave(onMouseLeave);
            }
            if (options.grid.clickable)
                eventHolder.click(onClick);
            executeHooks(hooks.bindEvents, [eventHolder]);
        }

        function shutdown() {
            if (redrawTimeout)
                clearTimeout(redrawTimeout);
            eventHolder.unbind("mousemove", onMouseMove);
            eventHolder.unbind("mouseleave", onMouseLeave);
            eventHolder.unbind("click", onClick);
            executeHooks(hooks.shutdown, [eventHolder]);
        }

        function setTransformationHelpers(axis) {
            function identity(x) {
                return x;
            }

            var s, m, t = axis.options.transform || identity, it = axis.options.inverseTransform;
            if (axis.direction == "x") {
                s = axis.scale = plotWidth / Math.abs(t(axis.max) - t(axis.min));
                m = Math.min(t(axis.max), t(axis.min));
            } else {
                s = axis.scale = plotHeight / Math.abs(t(axis.max) - t(axis.min));
                s = -s;
                m = Math.max(t(axis.max), t(axis.min));
            }
            if (t == identity)
                axis.p2c = function (p) {
                    return (p - m) * s;
                }; else
                axis.p2c = function (p) {
                    return (t(p) - m) * s;
                };
            if (!it)
                axis.c2p = function (c) {
                    return m + c / s;
                }; else
                axis.c2p = function (c) {
                    return it(m + c / s);
                };
        }

        function measureTickLabels(axis) {
            var opts = axis.options, i, ticks = axis.ticks || [], labels = [], l, w = opts.labelWidth,
                h = opts.labelHeight, dummyDiv;

            function makeDummyDiv(labels, width) {
                return $('<div style="position:absolute;top:-10000px;' + width + 'font-size:smaller">' + '<div class="' + axis.direction + 'Axis ' + axis.direction + axis.n + 'Axis">'
                    + labels.join("") + '</div></div>').appendTo(placeholder);
            }

            if (axis.direction == "x") {
                if (w == null)
                    w = Math.floor(canvasWidth / (ticks.length > 0 ? ticks.length : 1));
                if (h == null) {
                    labels = [];
                    for (i = 0; i < ticks.length; ++i) {
                        l = ticks[i].label;
                        if (l)
                            labels.push('<div class="tickLabel" style="float:left;width:' + w + 'px">' + l + '</div>');
                    }
                    if (labels.length > 0) {
                        labels.push('<div style="clear:left"></div>');
                        dummyDiv = makeDummyDiv(labels, "width:10000px;");
                        h = dummyDiv.height();
                        dummyDiv.remove();
                    }
                }
            } else if (w == null || h == null) {
                for (i = 0; i < ticks.length; ++i) {
                    l = ticks[i].label;
                    if (l)
                        labels.push('<div class="tickLabel">' + l + '</div>');
                }
                if (labels.length > 0) {
                    dummyDiv = makeDummyDiv(labels, "");
                    if (w == null)
                        w = dummyDiv.children().width();
                    if (h == null)
                        h = dummyDiv.find("div.tickLabel").height();
                    dummyDiv.remove();
                }
            }
            if (w == null)
                w = 0;
            if (h == null)
                h = 0;
            axis.labelWidth = w;
            axis.labelHeight = h;
        }

        function allocateAxisBoxFirstPhase(axis) {
            var lw = axis.labelWidth, lh = axis.labelHeight, pos = axis.options.position,
                tickLength = axis.options.tickLength, axismargin = options.grid.axisMargin,
                padding = options.grid.labelMargin, all = axis.direction == "x" ? xaxes : yaxes, index;
            var samePosition = $.grep(all, function (a) {
                return a && a.options.position == pos && a.reserveSpace;
            });
            if ($.inArray(axis, samePosition) == samePosition.length - 1)
                axismargin = 0;
            if (tickLength == null)
                tickLength = "full";
            var sameDirection = $.grep(all, function (a) {
                return a && a.reserveSpace;
            });
            var innermost = $.inArray(axis, sameDirection) == 0;
            if (!innermost && tickLength == "full")
                tickLength = 5;
            if (!isNaN(+tickLength))
                padding += +tickLength;
            if (axis.direction == "x") {
                lh += padding;
                if (pos == "bottom") {
                    plotOffset.bottom += lh + axismargin;
                    axis.box = {top: canvasHeight - plotOffset.bottom, height: lh};
                } else {
                    axis.box = {top: plotOffset.top + axismargin, height: lh};
                    plotOffset.top += lh + axismargin;
                }
            } else {
                lw += padding;
                if (pos == "left") {
                    axis.box = {left: plotOffset.left + axismargin, width: lw};
                    plotOffset.left += lw + axismargin;
                } else {
                    plotOffset.right += lw + axismargin;
                    axis.box = {left: canvasWidth - plotOffset.right, width: lw};
                }
            }
            axis.position = pos;
            axis.tickLength = tickLength;
            axis.box.padding = padding;
            axis.innermost = innermost;
        }

        function allocateAxisBoxSecondPhase(axis) {
            if (axis.direction == "x") {
                axis.box.left = plotOffset.left;
                axis.box.width = plotWidth;
            } else {
                axis.box.top = plotOffset.top;
                axis.box.height = plotHeight;
            }
        }

        function setupGrid() {
            var i, axes = allAxes();
            $.each(axes, function (_, axis) {
                axis.show = axis.options.show;
                if (axis.show == null)
                    axis.show = axis.used;
                axis.reserveSpace = axis.show || axis.options.reserveSpace;
                setRange(axis);
            });
            allocatedAxes = $.grep(axes, function (axis) {
                return axis.reserveSpace;
            });
            plotOffset.left = plotOffset.right = plotOffset.top = plotOffset.bottom = 0;
            if (options.grid.show) {
                $.each(allocatedAxes, function (_, axis) {
                    setupTickGeneration(axis);
                    setTicks(axis);
                    snapRangeToTicks(axis, axis.ticks);
                    measureTickLabels(axis);
                });
                for (i = allocatedAxes.length - 1; i >= 0; --i)
                    allocateAxisBoxFirstPhase(allocatedAxes[i]);
                var minMargin = options.grid.minBorderMargin;
                if (minMargin == null) {
                    minMargin = 0;
                    for (i = 0; i < series.length; ++i)
                        minMargin = Math.max(minMargin, series[i].points.radius + series[i].points.lineWidth / 2);
                }
                for (var a in plotOffset) {
                    plotOffset[a] += options.grid.borderWidth;
                    plotOffset[a] = Math.max(minMargin, plotOffset[a]);
                }
            }
            plotWidth = canvasWidth - plotOffset.left - plotOffset.right;
            plotHeight = canvasHeight - plotOffset.bottom - plotOffset.top;
            $.each(axes, function (_, axis) {
                setTransformationHelpers(axis);
            });
            if (options.grid.show) {
                $.each(allocatedAxes, function (_, axis) {
                    allocateAxisBoxSecondPhase(axis);
                });
                insertAxisLabels();
            }
            insertLegend();
        }

        function setRange(axis) {
            var opts = axis.options, min = +(opts.min != null ? opts.min : axis.datamin),
                max = +(opts.max != null ? opts.max : axis.datamax), delta = max - min;
            if (delta == 0.0) {
                var widen = max == 0 ? 1 : 0.01;
                if (opts.min == null)
                    min -= widen;
                if (opts.max == null || opts.min != null)
                    max += widen;
            } else {
                var margin = opts.autoscaleMargin;
                if (margin != null) {
                    if (opts.min == null) {
                        min -= delta * margin;
                        if (min < 0 && axis.datamin != null && axis.datamin >= 0)
                            min = 0;
                    }
                    if (opts.max == null) {
                        max += delta * margin;
                        if (max > 0 && axis.datamax != null && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function setupTickGeneration(axis) {
            var opts = axis.options;
            var noTicks;
            if (typeof opts.ticks == "number" && opts.ticks > 0)
                noTicks = opts.ticks; else
                noTicks = 0.3 * Math.sqrt(axis.direction == "x" ? canvasWidth : canvasHeight);
            var delta = (axis.max - axis.min) / noTicks, size, generator, unit, formatter, i, magn, norm;
            if (opts.mode == "time") {
                var timeUnitSize = {
                    "second": 1000,
                    "minute": 60 * 1000,
                    "hour": 60 * 60 * 1000,
                    "day": 24 * 60 * 60 * 1000,
                    "month": 30 * 24 * 60 * 60 * 1000,
                    "year": 365.2425 * 24 * 60 * 60 * 1000
                };
                var spec = [[1, "second"], [2, "second"], [5, "second"], [10, "second"], [30, "second"], [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"], [30, "minute"], [1, "hour"], [2, "hour"], [4, "hour"], [8, "hour"], [12, "hour"], [1, "day"], [2, "day"], [3, "day"], [0.25, "month"], [0.5, "month"], [1, "month"], [2, "month"], [3, "month"], [6, "month"], [1, "year"]];
                var minSize = 0;
                if (opts.minTickSize != null) {
                    if (typeof opts.tickSize == "number")
                        minSize = opts.tickSize; else
                        minSize = opts.minTickSize[0] * timeUnitSize[opts.minTickSize[1]];
                }
                for (var i = 0; i < spec.length - 1; ++i)
                    if (delta < (spec[i][0] * timeUnitSize[spec[i][1]]
                        + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2 && spec[i][0] * timeUnitSize[spec[i][1]] >= minSize)
                        break;
                size = spec[i][0];
                unit = spec[i][1];
                if (unit == "year") {
                    magn = Math.pow(10, Math.floor(Math.log(delta / timeUnitSize.year) / Math.LN10));
                    norm = (delta / timeUnitSize.year) / magn;
                    if (norm < 1.5)
                        size = 1; else if (norm < 3)
                        size = 2; else if (norm < 7.5)
                        size = 5; else
                        size = 10;
                    size *= magn;
                }
                axis.tickSize = opts.tickSize || [size, unit];
                generator = function (axis) {
                    var ticks = [], tickSize = axis.tickSize[0], unit = axis.tickSize[1], d = new Date(axis.min);
                    var step = tickSize * timeUnitSize[unit];
                    if (unit == "second")
                        d.setUTCSeconds(floorInBase(d.getUTCSeconds(), tickSize));
                    if (unit == "minute")
                        d.setUTCMinutes(floorInBase(d.getUTCMinutes(), tickSize));
                    if (unit == "hour")
                        d.setUTCHours(floorInBase(d.getUTCHours(), tickSize));
                    if (unit == "month")
                        d.setUTCMonth(floorInBase(d.getUTCMonth(), tickSize));
                    if (unit == "year")
                        d.setUTCFullYear(floorInBase(d.getUTCFullYear(), tickSize));
                    d.setUTCMilliseconds(0);
                    if (step >= timeUnitSize.minute)
                        d.setUTCSeconds(0);
                    if (step >= timeUnitSize.hour)
                        d.setUTCMinutes(0);
                    if (step >= timeUnitSize.day)
                        d.setUTCHours(0);
                    if (step >= timeUnitSize.day * 4)
                        d.setUTCDate(1);
                    if (step >= timeUnitSize.year)
                        d.setUTCMonth(0);
                    var carry = 0, v = Number.NaN, prev;
                    do {
                        prev = v;
                        v = d.getTime();
                        ticks.push(v);
                        if (unit == "month") {
                            if (tickSize < 1) {
                                d.setUTCDate(1);
                                var start = d.getTime();
                                d.setUTCMonth(d.getUTCMonth() + 1);
                                var end = d.getTime();
                                d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
                                carry = d.getUTCHours();
                                d.setUTCHours(0);
                            } else
                                d.setUTCMonth(d.getUTCMonth() + tickSize);
                        } else if (unit == "year") {
                            d.setUTCFullYear(d.getUTCFullYear() + tickSize);
                        } else
                            d.setTime(v + step);
                    } while (v < axis.max && v != prev);
                    return ticks;
                };
                formatter = function (v, axis) {
                    var d = new Date(v);
                    if (opts.timeformat != null)
                        return $.plot.formatDate(d, opts.timeformat, opts.monthNames);
                    var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
                    var span = axis.max - axis.min;
                    var suffix = (opts.twelveHourClock) ? " %p" : "";
                    if (t < timeUnitSize.minute)
                        fmt = "%h:%M:%S" + suffix; else if (t < timeUnitSize.day) {
                        if (span < 2 * timeUnitSize.day)
                            fmt = "%h:%M" + suffix; else
                            fmt = "%b %d %h:%M" + suffix;
                    } else if (t < timeUnitSize.month)
                        fmt = "%b %d"; else if (t < timeUnitSize.year) {
                        if (span < timeUnitSize.year)
                            fmt = "%b"; else
                            fmt = "%b %y";
                    } else
                        fmt = "%y";
                    return $.plot.formatDate(d, fmt, opts.monthNames);
                };
            } else {
                var maxDec = opts.tickDecimals;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                if (maxDec != null && dec > maxDec)
                    dec = maxDec;
                magn = Math.pow(10, -dec);
                norm = delta / magn;
                if (norm < 1.5)
                    size = 1; else if (norm < 3) {
                    size = 2;
                    if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                        size = 2.5;
                        ++dec;
                    }
                } else if (norm < 7.5)
                    size = 5; else
                    size = 10;
                size *= magn;
                if (opts.minTickSize != null && size < opts.minTickSize)
                    size = opts.minTickSize;
                axis.tickDecimals = Math.max(0, maxDec != null ? maxDec : dec);
                axis.tickSize = opts.tickSize || size;
                generator = function (axis) {
                    var ticks = [];
                    var start = floorInBase(axis.min, axis.tickSize), i = 0, v = Number.NaN, prev;
                    do {
                        prev = v;
                        v = start + i * axis.tickSize;
                        ticks.push(v);
                        ++i;
                    } while (v < axis.max && v != prev);
                    return ticks;
                };
                formatter = function (v, axis) {
                    return v.toFixed(axis.tickDecimals);
                };
            }
            if (opts.alignTicksWithAxis != null) {
                var otherAxis = (axis.direction == "x" ? xaxes : yaxes)[opts.alignTicksWithAxis - 1];
                if (otherAxis && otherAxis.used && otherAxis != axis) {
                    var niceTicks = generator(axis);
                    if (niceTicks.length > 0) {
                        if (opts.min == null)
                            axis.min = Math.min(axis.min, niceTicks[0]);
                        if (opts.max == null && niceTicks.length > 1)
                            axis.max = Math.max(axis.max, niceTicks[niceTicks.length - 1]);
                    }
                    generator = function (axis) {
                        var ticks = [], v, i;
                        for (i = 0; i < otherAxis.ticks.length; ++i) {
                            v = (otherAxis.ticks[i].v - otherAxis.min) / (otherAxis.max - otherAxis.min);
                            v = axis.min + v * (axis.max - axis.min);
                            ticks.push(v);
                        }
                        return ticks;
                    };
                    if (axis.mode != "time" && opts.tickDecimals == null) {
                        var extraDec = Math.max(0, -Math.floor(Math.log(delta) / Math.LN10) + 1), ts = generator(axis);
                        if (!(ts.length > 1 && /\..*0$/.test((ts[1] - ts[0]).toFixed(extraDec))))
                            axis.tickDecimals = extraDec;
                    }
                }
            }
            axis.tickGenerator = generator;
            if ($.isFunction(opts.tickFormatter))
                axis.tickFormatter = function (v, axis) {
                    return "" + opts.tickFormatter(v, axis);
                }; else
                axis.tickFormatter = formatter;
        }

        function setTicks(axis) {
            var oticks = axis.options.ticks, ticks = [];
            if (oticks == null || (typeof oticks == "number" && oticks > 0))
                ticks = axis.tickGenerator(axis); else if (oticks) {
                if ($.isFunction(oticks))
                    ticks = oticks({min: axis.min, max: axis.max}); else
                    ticks = oticks;
            }
            var i, v;
            axis.ticks = [];
            for (i = 0; i < ticks.length; ++i) {
                var label = null;
                var t = ticks[i];
                if (typeof t == "object") {
                    v = +t[0];
                    if (t.length > 1)
                        label = t[1];
                } else
                    v = +t;
                if (label == null)
                    label = axis.tickFormatter(v, axis);
                if (!isNaN(v))
                    axis.ticks.push({v: v, label: label});
            }
        }

        function snapRangeToTicks(axis, ticks) {
            if (axis.options.autoscaleMargin && ticks.length > 0) {
                if (axis.options.min == null)
                    axis.min = Math.min(axis.min, ticks[0].v);
                if (axis.options.max == null && ticks.length > 1)
                    axis.max = Math.max(axis.max, ticks[ticks.length - 1].v);
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            var grid = options.grid;
            if (grid.show && grid.backgroundColor)
                drawBackground();
            if (grid.show && !grid.aboveData)
                drawGrid();
            for (var i = 0; i < series.length; ++i) {
                executeHooks(hooks.drawSeries, [ctx, series[i]]);
                drawSeries(series[i]);
            }
            executeHooks(hooks.draw, [ctx]);
            if (grid.show && grid.aboveData)
                drawGrid();
        }

        function extractRange(ranges, coord) {
            var axis, from, to, key, axes = allAxes();
            for (i = 0; i < axes.length; ++i) {
                axis = axes[i];
                if (axis.direction == coord) {
                    key = coord + axis.n + "axis";
                    if (!ranges[key] && axis.n == 1)
                        key = coord + "axis";
                    if (ranges[key]) {
                        from = ranges[key].from;
                        to = ranges[key].to;
                        break;
                    }
                }
            }
            if (!ranges[key]) {
                axis = coord == "x" ? xaxes[0] : yaxes[0];
                from = ranges[coord + "1"];
                to = ranges[coord + "2"];
            }
            if (from != null && to != null && from > to) {
                var tmp = from;
                from = to;
                to = tmp;
            }
            return {from: from, to: to, axis: axis};
        }

        function drawBackground() {
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.fillStyle = getColorOrGradient(options.grid.backgroundColor, plotHeight, 0, "rgba(255, 255, 255, 0)");
            ctx.fillRect(0, 0, plotWidth, plotHeight);
            ctx.restore();
        }

        function drawGrid() {
            var i;
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            var markings = options.grid.markings;
            if (markings) {
                if ($.isFunction(markings)) {
                    var axes = plot.getAxes();
                    axes.xmin = axes.xaxis.min;
                    axes.xmax = axes.xaxis.max;
                    axes.ymin = axes.yaxis.min;
                    axes.ymax = axes.yaxis.max;
                    markings = markings(axes);
                }
                for (i = 0; i < markings.length; ++i) {
                    var m = markings[i], xrange = extractRange(m, "x"), yrange = extractRange(m, "y");
                    if (xrange.from == null)
                        xrange.from = xrange.axis.min;
                    if (xrange.to == null)
                        xrange.to = xrange.axis.max;
                    if (yrange.from == null)
                        yrange.from = yrange.axis.min;
                    if (yrange.to == null)
                        yrange.to = yrange.axis.max;
                    if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max || yrange.to < yrange.axis.min || yrange.from > yrange.axis.max)
                        continue;
                    xrange.from = Math.max(xrange.from, xrange.axis.min);
                    xrange.to = Math.min(xrange.to, xrange.axis.max);
                    yrange.from = Math.max(yrange.from, yrange.axis.min);
                    yrange.to = Math.min(yrange.to, yrange.axis.max);
                    if (xrange.from == xrange.to && yrange.from == yrange.to)
                        continue;
                    xrange.from = xrange.axis.p2c(xrange.from);
                    xrange.to = xrange.axis.p2c(xrange.to);
                    yrange.from = yrange.axis.p2c(yrange.from);
                    yrange.to = yrange.axis.p2c(yrange.to);
                    if (xrange.from == xrange.to || yrange.from == yrange.to) {
                        ctx.beginPath();
                        ctx.strokeStyle = m.color || options.grid.markingsColor;
                        ctx.lineWidth = m.lineWidth || options.grid.markingsLineWidth;
                        ctx.moveTo(xrange.from, yrange.from);
                        ctx.lineTo(xrange.to, yrange.to);
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = m.color || options.grid.markingsColor;
                        ctx.fillRect(xrange.from, yrange.to, xrange.to - xrange.from, yrange.from - yrange.to);
                    }
                }
            }
            var axes = allAxes(), bw = options.grid.borderWidth;
            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j], box = axis.box, t = axis.tickLength, x, y, xoff, yoff;
                if (!axis.show || axis.ticks.length == 0)
                    continue
                ctx.strokeStyle = axis.options.tickColor || $.color.parse(axis.options.color).scale('a', 0.22).toString();
                ctx.lineWidth = 1;
                if (axis.direction == "x") {
                    x = 0;
                    if (t == "full")
                        y = (axis.position == "top" ? 0 : plotHeight); else
                        y = box.top - plotOffset.top + (axis.position == "top" ? box.height : 0);
                } else {
                    y = 0;
                    if (t == "full")
                        x = (axis.position == "left" ? 0 : plotWidth); else
                        x = box.left - plotOffset.left + (axis.position == "left" ? box.width : 0);
                }
                if (!axis.innermost) {
                    ctx.beginPath();
                    xoff = yoff = 0;
                    if (axis.direction == "x")
                        xoff = plotWidth; else
                        yoff = plotHeight;
                    if (ctx.lineWidth == 1) {
                        x = Math.floor(x) + 0.5;
                        y = Math.floor(y) + 0.5;
                    }
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                    ctx.stroke();
                }
                ctx.beginPath();
                for (i = 0; i < axis.ticks.length; ++i) {
                    var v = axis.ticks[i].v;
                    xoff = yoff = 0;
                    if (v < axis.min || v > axis.max || (t == "full" && bw > 0 && (v == axis.min || v == axis.max)))
                        continue;
                    if (axis.direction == "x") {
                        x = axis.p2c(v);
                        yoff = t == "full" ? -plotHeight : t;
                        if (axis.position == "top")
                            yoff = -yoff;
                    } else {
                        y = axis.p2c(v);
                        xoff = t == "full" ? -plotWidth : t;
                        if (axis.position == "left")
                            xoff = -xoff;
                    }
                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x")
                            x = Math.floor(x) + 0.5; else
                            y = Math.floor(y) + 0.5;
                    }
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                }
                ctx.stroke();
            }
            if (bw) {
                ctx.lineWidth = bw;
                ctx.strokeStyle = options.grid.borderColor;
                ctx.strokeRect(-bw / 2, -bw / 2, plotWidth + bw, plotHeight + bw);
            }
            ctx.restore();
        }

        function insertAxisLabels() {
            placeholder.find(".tickLabels").remove();
            var html = ['<div class="tickLabels" style="font-size:smaller">'];
            var axes = allAxes();
            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j], box = axis.box;
                if (!axis.show)
                    continue;
                html.push('<div class="' + axis.direction + 'Axis ' + axis.direction + axis.n + 'Axis" style="color:' + axis.options.color + '">');
                for (var i = 0; i < axis.ticks.length; ++i) {
                    var tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;
                    var pos = {}, align;
                    if (axis.direction == "x") {
                        align = "center";
                        pos.left = Math.round(plotOffset.left + axis.p2c(tick.v) - axis.labelWidth / 2);
                        if (axis.position == "bottom")
                            pos.top = box.top + box.padding; else
                            pos.bottom = canvasHeight - (box.top + box.height - box.padding);
                    } else {
                        pos.top = Math.round(plotOffset.top + axis.p2c(tick.v) - axis.labelHeight / 2);
                        if (axis.position == "left") {
                            pos.right = canvasWidth - (box.left + box.width - box.padding)
                            align = "right";
                        } else {
                            pos.left = box.left + box.padding;
                            align = "left";
                        }
                    }
                    pos.width = axis.labelWidth;
                    var style = ["position:absolute", "text-align:" + align];
                    for (var a in pos)
                        style.push(a + ":" + pos[a] + "px")
                    html.push('<div class="tickLabel" style="' + style.join(';') + '">' + tick.label + '</div>');
                }
                html.push('</div>');
            }
            html.push('</div>');
            placeholder.append(html.join(""));
        }

        function drawSeries(series) {
            if (series.lines.show)
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }

        function drawSeriesLines(series) {
            function plotLine(datapoints, xoffset, yoffset, axisx, axisy) {
                var points = datapoints.points, ps = datapoints.pointsize, prevx = null, prevy = null;
                ctx.beginPath();
                for (var i = ps; i < points.length; i += ps) {
                    var x1 = points[i - ps], y1 = points[i - ps + 1], x2 = points[i], y2 = points[i + 1];
                    if (x1 == null || x2 == null)
                        continue;
                    if (y1 <= y2 && y1 < axisy.min) {
                        if (y2 < axisy.min)
                            continue;
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    } else if (y2 <= y1 && y2 < axisy.min) {
                        if (y1 < axisy.min)
                            continue;
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }
                    if (y1 >= y2 && y1 > axisy.max) {
                        if (y2 > axisy.max)
                            continue;
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    } else if (y2 >= y1 && y2 > axisy.max) {
                        if (y1 > axisy.max)
                            continue;
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    } else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    } else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }
                    if (x1 != prevx || y1 != prevy)
                        ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset);
                    prevx = x2;
                    prevy = y2;
                    ctx.lineTo(axisx.p2c(x2) + xoffset, axisy.p2c(y2) + yoffset);
                }
                ctx.stroke();
            }

            function plotLineArea(datapoints, axisx, axisy) {
                var points = datapoints.points, ps = datapoints.pointsize,
                    bottom = Math.min(Math.max(0, axisy.min), axisy.max), i = 0, top, areaOpen = false, ypos = 1,
                    segmentStart = 0, segmentEnd = 0;
                while (true) {
                    if (ps > 0 && i > points.length + ps)
                        break;
                    i += ps;
                    var x1 = points[i - ps], y1 = points[i - ps + ypos], x2 = points[i], y2 = points[i + ypos];
                    if (areaOpen) {
                        if (ps > 0 && x1 != null && x2 == null) {
                            segmentEnd = i;
                            ps = -ps;
                            ypos = 2;
                            continue;
                        }
                        if (ps < 0 && i == segmentStart + ps) {
                            ctx.fill();
                            areaOpen = false;
                            ps = -ps;
                            ypos = 1;
                            i = segmentStart = segmentEnd + ps;
                            continue;
                        }
                    }
                    if (x1 == null || x2 == null)
                        continue;
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    } else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    } else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }
                    if (!areaOpen) {
                        ctx.beginPath();
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom));
                        areaOpen = true;
                    }
                    if (y1 >= axisy.max && y2 >= axisy.max) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max));
                        continue;
                    } else if (y1 <= axisy.min && y2 <= axisy.min) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min));
                        continue;
                    }
                    var x1old = x1, x2old = x2;
                    if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) {
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    } else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) {
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }
                    if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) {
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    } else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) {
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }
                    if (x1 != x1old) {
                        ctx.lineTo(axisx.p2c(x1old), axisy.p2c(y1));
                    }
                    ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1));
                    ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                    if (x2 != x2old) {
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                        ctx.lineTo(axisx.p2c(x2old), axisy.p2c(y2));
                    }
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";
            var lw = series.lines.lineWidth, sw = series.shadowSize;
            if (lw > 0 && sw > 0) {
                ctx.lineWidth = sw;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                var angle = Math.PI / 18;
                plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 2), Math.cos(angle) * (lw / 2 + sw / 2), series.xaxis, series.yaxis);
                ctx.lineWidth = sw / 2;
                plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 4), Math.cos(angle) * (lw / 2 + sw / 4), series.xaxis, series.yaxis);
            }
            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            var fillStyle = getFillStyle(series.lines, series.color, 0, plotHeight);
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                plotLineArea(series.datapoints, series.xaxis, series.yaxis);
            }
            if (lw > 0)
                plotLine(series.datapoints, 0, 0, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(datapoints, radius, fillStyle, offset, shadow, axisx, axisy, symbol) {
                var points = datapoints.points, ps = datapoints.pointsize;
                for (var i = 0; i < points.length; i += ps) {
                    var x = points[i], y = points[i + 1];
                    if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;
                    ctx.beginPath();
                    x = axisx.p2c(x);
                    y = axisy.p2c(y) + offset;
                    if (symbol == "circle")
                        ctx.arc(x, y, radius, 0, shadow ? Math.PI : Math.PI * 2, false); else
                        symbol(ctx, x, y, radius, shadow);
                    ctx.closePath();
                    if (fillStyle) {
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            var lw = series.points.lineWidth, sw = series.shadowSize, radius = series.points.radius,
                symbol = series.points.symbol;
            if (lw > 0 && sw > 0) {
                var w = sw / 2;
                ctx.lineWidth = w;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPoints(series.datapoints, radius, null, w + w / 2, true, series.xaxis, series.yaxis, symbol);
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPoints(series.datapoints, radius, null, w / 2, true, series.xaxis, series.yaxis, symbol);
            }
            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            plotPoints(series.datapoints, radius, getFillStyle(series.points, series.color), 0, false, series.xaxis, series.yaxis, symbol);
            ctx.restore();
        }

        function drawBar(x, y, b, barLeft, barRight, offset, fillStyleCallback, axisx, axisy, c, horizontal, lineWidth) {
            var left, right, bottom, top, drawLeft, drawRight, drawTop, drawBottom, tmp;
            if (horizontal) {
                drawBottom = drawRight = drawTop = true;
                drawLeft = false;
                left = b;
                right = x;
                top = y + barLeft;
                bottom = y + barRight;
                if (right < left) {
                    tmp = right;
                    right = left;
                    left = tmp;
                    drawLeft = true;
                    drawRight = false;
                }
            } else {
                drawLeft = drawRight = drawTop = true;
                drawBottom = false;
                left = x + barLeft;
                right = x + barRight;
                bottom = b;
                top = y;
                if (top < bottom) {
                    tmp = top;
                    top = bottom;
                    bottom = tmp;
                    drawBottom = true;
                    drawTop = false;
                }
            }
            if (right < axisx.min || left > axisx.max || top < axisy.min || bottom > axisy.max)
                return;
            if (left < axisx.min) {
                left = axisx.min;
                drawLeft = false;
            }
            if (right > axisx.max) {
                right = axisx.max;
                drawRight = false;
            }
            if (bottom < axisy.min) {
                bottom = axisy.min;
                drawBottom = false;
            }
            if (top > axisy.max) {
                top = axisy.max;
                drawTop = false;
            }
            left = axisx.p2c(left);
            bottom = axisy.p2c(bottom);
            right = axisx.p2c(right);
            top = axisy.p2c(top);
            if (fillStyleCallback) {
                c.beginPath();
                c.moveTo(left, bottom);
                c.lineTo(left, top);
                c.lineTo(right, top);
                c.lineTo(right, bottom);
                c.fillStyle = fillStyleCallback(bottom, top);
                c.fill();
            }
            if (lineWidth > 0 && (drawLeft || drawRight || drawTop || drawBottom)) {
                c.beginPath();
                c.moveTo(left, bottom + offset);
                if (drawLeft)
                    c.lineTo(left, top + offset); else
                    c.moveTo(left, top + offset);
                if (drawTop)
                    c.lineTo(right, top + offset); else
                    c.moveTo(right, top + offset);
                if (drawRight)
                    c.lineTo(right, bottom + offset); else
                    c.moveTo(right, bottom + offset);
                if (drawBottom)
                    c.lineTo(left, bottom + offset); else
                    c.moveTo(left, bottom + offset);
                c.stroke();
            }
        }

        function drawSeriesBars(series) {
            function plotBars(datapoints, barLeft, barRight, offset, fillStyleCallback, axisx, axisy) {
                var points = datapoints.points, ps = datapoints.pointsize;
                for (var i = 0; i < points.length; i += ps) {
                    if (points[i] == null)
                        continue;
                    drawBar(points[i], points[i + 1], points[i + 2], barLeft, barRight, offset, fillStyleCallback, axisx, axisy, ctx, series.bars.horizontal, series.bars.lineWidth);
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineWidth = series.bars.lineWidth;
            ctx.strokeStyle = series.color;
            var barLeft = series.bars.align == "left" ? 0 : -series.bars.barWidth / 2;
            var fillStyleCallback = series.bars.fill ? function (bottom, top) {
                return getFillStyle(series.bars, series.color, bottom, top);
            } : null;
            plotBars(series.datapoints, barLeft, barLeft + series.bars.barWidth, 0, fillStyleCallback, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function getFillStyle(filloptions, seriesColor, bottom, top) {
            var fill = filloptions.fill;
            if (!fill)
                return null;
            if (filloptions.fillColor)
                return getColorOrGradient(filloptions.fillColor, bottom, top, seriesColor);
            var c = $.color.parse(seriesColor);
            c.a = typeof fill == "number" ? fill : 0.4;
            c.normalize();
            return c.toString();
        }

        function insertLegend() {
            placeholder.find(".legend").remove();
            if (!options.legend.show)
                return;
            var fragments = [], rowStarted = false, lf = options.legend.labelFormatter, s, label;
            for (var i = 0; i < series.length; ++i) {
                s = series[i];
                label = s.label;
                if (!label)
                    continue;
                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }
                if (lf)
                    label = lf(label, s);
                fragments.push('<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + s.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + label + '</td>');
            }
            if (rowStarted)
                fragments.push('</tr>');
            if (fragments.length == 0)
                return;
            var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
            if (options.legend.container != null)
                $(options.legend.container).html(table); else {
                var pos = "", p = options.legend.position, m = options.legend.margin;
                if (m[0] == null)
                    m = [m, m];
                if (p.charAt(0) == "n")
                    pos += 'top:' + (m[1] + plotOffset.top) + 'px;'; else if (p.charAt(0) == "s")
                    pos += 'bottom:' + (m[1] + plotOffset.bottom) + 'px;';
                if (p.charAt(1) == "e")
                    pos += 'right:' + (m[0] + plotOffset.right) + 'px;'; else if (p.charAt(1) == "w")
                    pos += 'left:' + (m[0] + plotOffset.left) + 'px;';
                var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos + ';') + '</div>').appendTo(placeholder);
                if (options.legend.backgroundOpacity != 0.0) {
                    var c = options.legend.backgroundColor;
                    if (c == null) {
                        c = options.grid.backgroundColor;
                        if (c && typeof c == "string")
                            c = $.color.parse(c); else
                            c = $.color.extract(legend, 'background-color');
                        c.a = 1;
                        c = c.toString();
                    }
                    var div = legend.children();
                    $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos + 'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                }
            }
        }

        var highlights = [], redrawTimeout = null;

        function findNearbyItem(mouseX, mouseY, seriesFilter) {
            var maxDistance = options.grid.mouseActiveRadius, smallestDistance = maxDistance * maxDistance + 1,
                item = null, foundPoint = false, i, j;
            for (i = series.length - 1; i >= 0; --i) {
                if (!seriesFilter(series[i]))
                    continue;
                var s = series[i], axisx = s.xaxis, axisy = s.yaxis, points = s.datapoints.points,
                    ps = s.datapoints.pointsize, mx = axisx.c2p(mouseX), my = axisy.c2p(mouseY),
                    maxx = maxDistance / axisx.scale, maxy = maxDistance / axisy.scale;
                if (axisx.options.inverseTransform)
                    maxx = Number.MAX_VALUE;
                if (axisy.options.inverseTransform)
                    maxy = Number.MAX_VALUE;
                if (s.lines.show || s.points.show) {
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1];
                        if (x == null)
                            continue;
                        if (x - mx > maxx || x - mx < -maxx || y - my > maxy || y - my < -maxy)
                            continue;
                        var dx = Math.abs(axisx.p2c(x) - mouseX), dy = Math.abs(axisy.p2c(y) - mouseY),
                            dist = dx * dx + dy * dy;
                        if (dist < smallestDistance) {
                            smallestDistance = dist;
                            item = [i, j / ps];
                        }
                    }
                }
                if (s.bars.show && !item) {
                    var barLeft = s.bars.align == "left" ? 0 : -s.bars.barWidth / 2,
                        barRight = barLeft + s.bars.barWidth;
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1], b = points[j + 2];
                        if (x == null)
                            continue;
                        if (series[i].bars.horizontal ? (mx <= Math.max(b, x) && mx >= Math.min(b, x) && my >= y + barLeft && my <= y + barRight) : (mx >= x + barLeft && mx <= x + barRight && my >= Math.min(b, y) && my <= Math.max(b, y)))
                            item = [i, j / ps];
                    }
                }
            }
            if (item) {
                i = item[0];
                j = item[1];
                ps = series[i].datapoints.pointsize;
                return {
                    datapoint: series[i].datapoints.points.slice(j * ps, (j + 1) * ps),
                    dataIndex: j,
                    series: series[i],
                    seriesIndex: i
                };
            }
            return null;
        }

        function onMouseMove(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e, function (s) {
                    return s["hoverable"] != false;
                });
        }

        function onMouseLeave(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e, function (s) {
                    return false;
                });
        }

        function onClick(e) {
            triggerClickHoverEvent("plotclick", e, function (s) {
                return s["clickable"] != false;
            });
        }

        function triggerClickHoverEvent(eventname, event, seriesFilter) {
            var offset = eventHolder.offset(), canvasX = event.pageX - offset.left - plotOffset.left,
                canvasY = event.pageY - offset.top - plotOffset.top,
                pos = canvasToAxisCoords({left: canvasX, top: canvasY});
            pos.pageX = event.pageX;
            pos.pageY = event.pageY;
            var item = findNearbyItem(canvasX, canvasY, seriesFilter);
            if (item) {
                item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left);
                item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top);
            }
            if (options.grid.autoHighlight) {
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto == eventname && !(item && h.series == item.series && h.point[0] == item.datapoint[0] && h.point[1] == item.datapoint[1]))
                        unhighlight(h.series, h.point);
                }
                if (item)
                    highlight(item.series, item.datapoint, eventname);
            }
            placeholder.trigger(eventname, [pos, item]);
        }

        function triggerRedrawOverlay() {
            if (!redrawTimeout)
                redrawTimeout = setTimeout(drawOverlay, 30);
        }

        function drawOverlay() {
            redrawTimeout = null;
            octx.save();
            octx.clearRect(0, 0, canvasWidth, canvasHeight);
            octx.translate(plotOffset.left, plotOffset.top);
            var i, hi;
            for (i = 0; i < highlights.length; ++i) {
                hi = highlights[i];
                if (hi.series.bars.show)
                    drawBarHighlight(hi.series, hi.point); else
                    drawPointHighlight(hi.series, hi.point);
            }
            octx.restore();
            executeHooks(hooks.drawOverlay, [octx]);
        }

        function highlight(s, point, auto) {
            if (typeof s == "number")
                s = series[s];
            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }
            var i = indexOfHighlight(s, point);
            if (i == -1) {
                highlights.push({series: s, point: point, auto: auto});
                triggerRedrawOverlay();
            } else if (!auto)
                highlights[i].auto = false;
        }

        function unhighlight(s, point) {
            if (s == null && point == null) {
                highlights = [];
                triggerRedrawOverlay();
            }
            if (typeof s == "number")
                s = series[s];
            if (typeof point == "number")
                point = s.data[point];
            var i = indexOfHighlight(s, point);
            if (i != -1) {
                highlights.splice(i, 1);
                triggerRedrawOverlay();
            }
        }

        function indexOfHighlight(s, p) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s && h.point[0] == p[0] && h.point[1] == p[1])
                    return i;
            }
            return -1;
        }

        function drawPointHighlight(series, point) {
            var x = point[0], y = point[1], axisx = series.xaxis, axisy = series.yaxis;
            if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                return;
            var pointRadius = series.points.radius + series.points.lineWidth / 2;
            octx.lineWidth = pointRadius;
            octx.strokeStyle = $.color.parse(series.color).scale('a', 0.5).toString();
            var radius = 1.5 * pointRadius, x = axisx.p2c(x), y = axisy.p2c(y);
            octx.beginPath();
            if (series.points.symbol == "circle")
                octx.arc(x, y, radius, 0, 2 * Math.PI, false); else
                series.points.symbol(octx, x, y, radius, false);
            octx.closePath();
            octx.stroke();
        }

        function drawBarHighlight(series, point) {
            octx.lineWidth = series.bars.lineWidth;
            octx.strokeStyle = $.color.parse(series.color).scale('a', 0.5).toString();
            var fillStyle = $.color.parse(series.color).scale('a', 0.5).toString();
            var barLeft = series.bars.align == "left" ? 0 : -series.bars.barWidth / 2;
            drawBar(point[0], point[1], point[2] || 0, barLeft, barLeft + series.bars.barWidth, 0, function () {
                return fillStyle;
            }, series.xaxis, series.yaxis, octx, series.bars.horizontal, series.bars.lineWidth);
        }

        function getColorOrGradient(spec, bottom, top, defaultColor) {
            if (typeof spec == "string")
                return spec; else {
                var gradient = ctx.createLinearGradient(0, top, 0, bottom);
                for (var i = 0, l = spec.colors.length; i < l; ++i) {
                    var c = spec.colors[i];
                    if (typeof c != "string") {
                        var co = $.color.parse(defaultColor);
                        if (c.brightness != null)
                            co = co.scale('rgb', c.brightness)
                        if (c.opacity != null)
                            co.a *= c.opacity;
                        c = co.toString();
                    }
                    gradient.addColorStop(i / (l - 1), c);
                }
                return gradient;
            }
        }
    }

    $.plot = function (placeholder, data, options) {
        var plot = new Plot($(placeholder), data, options, $.plot.plugins);
        return plot;
    };
    $.plot.version = "0.7";
    $.plot.plugins = [];
    $.plot.formatDate = function (d, fmt, monthNames) {
        var leftPad = function (n) {
            n = "" + n;
            return n.length == 1 ? "0" + n : n;
        };
        var r = [];
        var escape = false, padNext = false;
        var hours = d.getUTCHours();
        var isAM = hours < 12;
        if (monthNames == null)
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (fmt.search(/%p|%P/) != -1) {
            if (hours > 12) {
                hours = hours - 12;
            } else if (hours == 0) {
                hours = 12;
            }
        }
        for (var i = 0; i < fmt.length; ++i) {
            var c = fmt.charAt(i);
            if (escape) {
                switch (c) {
                    case'h':
                        c = "" + hours;
                        break;
                    case'H':
                        c = leftPad(hours);
                        break;
                    case'M':
                        c = leftPad(d.getUTCMinutes());
                        break;
                    case'S':
                        c = leftPad(d.getUTCSeconds());
                        break;
                    case'd':
                        c = "" + d.getUTCDate();
                        break;
                    case'm':
                        c = "" + (d.getUTCMonth() + 1);
                        break;
                    case'y':
                        c = "" + d.getUTCFullYear();
                        break;
                    case'b':
                        c = "" + monthNames[d.getUTCMonth()];
                        break;
                    case'p':
                        c = (isAM) ? ("" + "am") : ("" + "pm");
                        break;
                    case'P':
                        c = (isAM) ? ("" + "AM") : ("" + "PM");
                        break;
                    case'0':
                        c = "";
                        padNext = true;
                        break;
                }
                if (c && padNext) {
                    c = leftPad(c);
                    padNext = false;
                }
                r.push(c);
                if (!padNext)
                    escape = false;
            } else {
                if (c == "%")
                    escape = true; else
                    r.push(c);
            }
        }
        return r.join("");
    };

    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }
})(jQuery);
(function ($) {
    var options = {series: {stack: null}};

    function init(plot) {
        function findMatchingSeries(s, allseries) {
            var res = null
            for (var i = 0; i < allseries.length; ++i) {
                if (s == allseries[i])
                    break;
                if (allseries[i].stack == s.stack)
                    res = allseries[i];
            }
            return res;
        }

        function stackData(plot, s, datapoints) {
            if (s.stack == null)
                return;
            var other = findMatchingSeries(s, plot.getData());
            if (!other)
                return;
            var ps = datapoints.pointsize, points = datapoints.points, otherps = other.datapoints.pointsize,
                otherpoints = other.datapoints.points, newpoints = [], px, py, intery, qx, qy, bottom,
                withlines = s.lines.show, horizontal = s.bars.horizontal,
                withbottom = ps > 2 && (horizontal ? datapoints.format[2].x : datapoints.format[2].y),
                withsteps = withlines && s.lines.steps, fromgap = true, keyOffset = horizontal ? 1 : 0,
                accumulateOffset = horizontal ? 0 : 1, i = 0, j = 0, l;
            while (true) {
                if (i >= points.length)
                    break;
                l = newpoints.length;
                if (points[i] == null) {
                    for (m = 0; m < ps; ++m)
                        newpoints.push(points[i + m]);
                    i += ps;
                } else if (j >= otherpoints.length) {
                    if (!withlines) {
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                    }
                    i += ps;
                } else if (otherpoints[j] == null) {
                    for (m = 0; m < ps; ++m)
                        newpoints.push(null);
                    fromgap = true;
                    j += otherps;
                } else {
                    px = points[i + keyOffset];
                    py = points[i + accumulateOffset];
                    qx = otherpoints[j + keyOffset];
                    qy = otherpoints[j + accumulateOffset];
                    bottom = 0;
                    if (px == qx) {
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                        newpoints[l + accumulateOffset] += qy;
                        bottom = qy;
                        i += ps;
                        j += otherps;
                    } else if (px > qx) {
                        if (withlines && i > 0 && points[i - ps] != null) {
                            intery = py + (points[i - ps + accumulateOffset] - py) * (qx - px) / (points[i - ps + keyOffset] - px);
                            newpoints.push(qx);
                            newpoints.push(intery + qy);
                            for (m = 2; m < ps; ++m)
                                newpoints.push(points[i + m]);
                            bottom = qy;
                        }
                        j += otherps;
                    } else {
                        if (fromgap && withlines) {
                            i += ps;
                            continue;
                        }
                        for (m = 0; m < ps; ++m)
                            newpoints.push(points[i + m]);
                        if (withlines && j > 0 && otherpoints[j - otherps] != null)
                            bottom = qy + (otherpoints[j - otherps + accumulateOffset] - qy) * (px - qx) / (otherpoints[j - otherps + keyOffset] - qx);
                        newpoints[l + accumulateOffset] += bottom;
                        i += ps;
                    }
                    fromgap = false;
                    if (l != newpoints.length && withbottom)
                        newpoints[l + 2] += bottom;
                }
                if (withsteps && l != newpoints.length && l > 0 && newpoints[l] != null && newpoints[l] != newpoints[l - ps] && newpoints[l + 1] != newpoints[l - ps + 1]) {
                    for (m = 0; m < ps; ++m)
                        newpoints[l + ps + m] = newpoints[l + m];
                    newpoints[l + 1] = newpoints[l - ps + 1];
                }
            }
            datapoints.points = newpoints;
        }

        plot.hooks.processDatapoints.push(stackData);
    }

    $.plot.plugins.push({init: init, options: options, name: 'stack', version: '1.2'});
})(jQuery);
(function ($, h, c) {
    var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event",
        b = "delay", f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {w: l.width(), h: l.height()});
            if (a.length === 1) {
                g()
            }
        }, teardown: function () {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i)
            }
        }, add: function (l) {
            if (!e[f] && this[k]) {
                return false
            }
            var n;

            function m(s, o, p) {
                var q = $(this), r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments)
            }

            if ($.isFunction(l)) {
                n = l;
                return m
            } else {
                n = l.handler;
                l.handler = m
            }
        }
    };

    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l])
                }
            });
            g()
        }, e[b])
    }
})(jQuery, this);
(function ($) {
    var options = {};

    function init(plot) {
        function onResize() {
            var placeholder = plot.getPlaceholder();
            if (placeholder.width() == 0 || placeholder.height() == 0)
                return;
            plot.resize();
            plot.setupGrid();
            plot.draw();
        }

        function bindEvents(plot, eventHolder) {
            plot.getPlaceholder().resize(onResize);
        }

        function shutdown(plot, eventHolder) {
            plot.getPlaceholder().unbind("resize", onResize);
        }

        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }

    $.plot.plugins.push({init: init, options: options, name: 'resize', version: '1.0'});
})(jQuery);
(function ($) {
    var options = {
        tooltip: false,
        tooltipOpts: {
            content: "%s | X: %x | Y: %y.2",
            dateFormat: "%y-%0m-%0d",
            shifts: {x: 10, y: 20},
            defaultTheme: true
        }
    };
    var init = function (plot) {
        var tipPosition = {x: 0, y: 0};
        var opts = plot.getOptions();
        var updateTooltipPosition = function (pos) {
            tipPosition.x = pos.x;
            tipPosition.y = pos.y;
        };
        var onMouseMove = function (e) {
            var pos = {x: 0, y: 0};
            pos.x = e.pageX;
            pos.y = e.pageY;
            updateTooltipPosition(pos);
        };
        var timestampToDate = function (tmst) {
            var theDate = new Date(tmst);
            return $.plot.formatDate(theDate, opts.tooltipOpts.dateFormat);
        };
        plot.hooks.bindEvents.push(function (plot, eventHolder) {
            var to = opts.tooltipOpts;
            var placeholder = plot.getPlaceholder();
            var $tip;
            if (opts.tooltip === false) return;
            if ($('#flotTip').length > 0) {
                $tip = $('#flotTip');
            } else {
                $tip = $('<div />').attr('id', 'flotTip');
                $tip.appendTo('body').hide().css({position: 'absolute'});
                if (to.defaultTheme) {
                    $tip.css({
                        'background': '#fff',
                        'z-index': '100',
                        'padding': '0.4em 0.6em',
                        'border-radius': '0.5em',
                        'font-size': '0.8em',
                        'border': '1px solid #111'
                    });
                }
            }
            $(placeholder).bind("plothover", function (event, pos, item) {
                if (item) {
                    var tipText;
                    if (opts.xaxis.mode === "time" || opts.xaxes[0].mode === "time") {
                        tipText = stringFormat(to.content, item, timestampToDate);
                    } else {
                        tipText = stringFormat(to.content, item);
                    }
                    $tip.html(tipText).css({
                        left: tipPosition.x + to.shifts.x,
                        top: tipPosition.y + to.shifts.y
                    }).show();
                } else {
                    $tip.hide().html('');
                }
            });
            eventHolder.mousemove(onMouseMove);
        });
        var stringFormat = function (content, item, fnct) {
            var percentPattern = /%p\.{0,1}(\d{0,})/;
            var seriesPattern = /%s/;
            var xPattern = /%x\.{0,1}(\d{0,})/;
            var yPattern = /%y\.{0,1}(\d{0,})/;
            if (typeof (item.series.percent) !== 'undefined') {
                content = adjustValPrecision(percentPattern, content, item.series.percent);
            }
            if (typeof (item.series.label) !== 'undefined') {
                content = content.replace(seriesPattern, item.series.label);
            }
            if (typeof (fnct) === 'function') {
                content = content.replace(xPattern, fnct(item.series.data[item.dataIndex][0]));
            } else if (typeof item.series.data[item.dataIndex][0] === 'number') {
                content = adjustValPrecision(xPattern, content, item.series.data[item.dataIndex][0]);
            }
            if (typeof item.series.data[item.dataIndex][1] === 'number') {
                content = adjustValPrecision(yPattern, content, item.series.data[item.dataIndex][1]);
            }
            return content;
        };
        var adjustValPrecision = function (pattern, content, value) {
            var precision;
            if (content.match(pattern) !== 'null') {
                if (RegExp.$1 !== '') {
                    precision = RegExp.$1;
                    value = value.toFixed(precision)
                }
                content = content.replace(pattern, value);
            }
            return content;
        };
    }
    $.plot.plugins.push({init: init, options: options, name: 'tooltip', version: '0.4.4'});
})(jQuery);
(function ($, document, undefined) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);
            return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }
        return null;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };
})(jQuery, document);

function humaneDate(date, compareTo) {
    if (!date) {
        return;
    }
    var lang = {
            ago: 'Ago',
            from: '',
            now: 'Just Now',
            minute: 'Minute',
            minutes: 'Minutes',
            hour: 'Hour',
            hours: 'Hours',
            day: 'Day',
            days: 'Days',
            week: 'Week',
            weeks: 'Weeks',
            month: 'Month',
            months: 'Months',
            year: 'Year',
            years: 'Years'
        },
        formats = [[60, lang.now], [3600, lang.minute, lang.minutes, 60], [86400, lang.hour, lang.hours, 3600], [604800, lang.day, lang.days, 86400], [2628000, lang.week, lang.weeks, 604800], [31536000, lang.month, lang.months, 2628000], [Infinity, lang.year, lang.years, 31536000]],
        isString = typeof date == 'string',
        date = isString ? new Date(('' + date).replace(/-/g, "/").replace(/[TZ]/g, " ")) : date,
        compareTo = compareTo || new Date, seconds = (compareTo - date +
            (compareTo.getTimezoneOffset() -
                (isString ? 0 : date.getTimezoneOffset())) * 60000) / 1000, token;
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = lang.from ? ' ' + lang.from : '';
    } else {
        token = lang.ago ? ' ' + lang.ago : '';
    }

    function normalize(val, single) {
        var margin = 0.1;
        if (val >= single && val <= single * (1 + margin)) {
            return single;
        }
        return val;
    }

    for (var i = 0, format = formats[0]; formats[i]; format = formats[++i]) {
        if (seconds < format[0]) {
            if (i === 0) {
                return format[1];
            }
            var val = Math.ceil(normalize(seconds, format[3]) / (format[3]));
            return val + ' ' +
                (val != 1 ? format[2] : format[1]) +
                (i > 0 ? token : '');
        }
    }
};
if (typeof jQuery != 'undefined') {
    jQuery.fn.humaneDates = function (options) {
        var settings = jQuery.extend({'lowercase': false}, options);
        return this.each(function () {
            var $t = jQuery(this), date = $t.attr('datetime') || $t.attr('title');
            date = humaneDate(date);
            if (date && settings['lowercase']) {
                date = date.toLowerCase();
            }
            if (date && $t.html() != date) {
                $t.html(date);
            }
        });
    };
}
(function (window, undefined) {
    '$:nomunge';
    var $ = window.jQuery || window.Cowboy || (window.Cowboy = {}), jq_throttle;
    $.throttle = jq_throttle = function (delay, no_trailing, callback, debounce_mode) {
        var timeout_id, last_exec = 0;
        if (typeof no_trailing !== 'boolean') {
            debounce_mode = callback;
            callback = no_trailing;
            no_trailing = undefined;
        }

        function wrapper() {
            var that = this, elapsed = +new Date() - last_exec, args = arguments;

            function exec() {
                last_exec = +new Date();
                callback.apply(that, args);
            };

            function clear() {
                timeout_id = undefined;
            };
            if (debounce_mode && !timeout_id) {
                exec();
            }
            timeout_id && clearTimeout(timeout_id);
            if (debounce_mode === undefined && elapsed > delay) {
                exec();
            } else if (no_trailing !== true) {
                timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
            }
        };
        if ($.guid) {
            wrapper.guid = callback.guid = callback.guid || $.guid++;
        }
        return wrapper;
    };
    $.debounce = function (delay, at_begin, callback) {
        return callback === undefined ? jq_throttle(delay, at_begin, false) : jq_throttle(delay, callback, at_begin !== false);
    };
})(this);
(function (e, t) {
    var n, r;
    typeof exports != t + "" ? n = exports : (r = e.L, n = {}, n.noConflict = function () {
        return e.L = r, this
    }, e.L = n), n.version = "0.4.5", n.Util = {
        extend: function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            for (var n = 0, r = t.length, i; n < r; n++) {
                i = t[n] || {};
                for (var s in i) i.hasOwnProperty(s) && (e[s] = i[s])
            }
            return e
        }, bind: function (e, t) {
            var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function () {
                return e.apply(t, n || arguments)
            }
        }, stamp: function () {
            var e = 0, t = "_leaflet_id";
            return function (n) {
                return n[t] = n[t] || ++e, n[t]
            }
        }(), limitExecByInterval: function (e, t, n) {
            var r, i;
            return function s() {
                var o = arguments;
                if (r) {
                    i = !0;
                    return
                }
                r = !0, setTimeout(function () {
                    r = !1, i && (s.apply(n, o), i = !1)
                }, t), e.apply(n, o)
            }
        }, falseFn: function () {
            return !1
        }, formatNum: function (e, t) {
            var n = Math.pow(10, t || 5);
            return Math.round(e * n) / n
        }, splitWords: function (e) {
            return e.replace(/^\s+|\s+$/g, "").split(/\s+/)
        }, setOptions: function (e, t) {
            return e.options = n.Util.extend({}, e.options, t), e.options
        }, getParamString: function (e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
            return "?" + t.join("&")
        }, template: function (e, t) {
            return e.replace(/\{ *([\w_]+) *\}/g, function (e, n) {
                var r = t[n];
                if (!t.hasOwnProperty(n)) throw Error("No value provided for variable " + e);
                return r
            })
        }, emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }, function () {
        function t(t) {
            var n, r, i = ["webkit", "moz", "o", "ms"];
            for (n = 0; n < i.length && !r; n++) r = e[i[n] + t];
            return r
        }

        function r(t) {
            return e.setTimeout(t, 1e3 / 60)
        }

        var i = e.requestAnimationFrame || t("RequestAnimationFrame") || r,
            s = e.cancelAnimationFrame || t("CancelAnimationFrame") || t("CancelRequestAnimationFrame") || function (t) {
                e.clearTimeout(t)
            };
        n.Util.requestAnimFrame = function (t, s, o, u) {
            t = n.Util.bind(t, s);
            if (!o || i !== r) return i.call(e, t, u);
            t()
        }, n.Util.cancelAnimFrame = function (t) {
            t && s.call(e, t)
        }
    }(), n.Class = function () {
    }, n.Class.extend = function (e) {
        var t = function () {
            this.initialize && this.initialize.apply(this, arguments)
        }, r = function () {
        };
        r.prototype = this.prototype;
        var i = new r;
        i.constructor = t, t.prototype = i;
        for (var s in this) this.hasOwnProperty(s) && s !== "prototype" && (t[s] = this[s]);
        return e.statics && (n.Util.extend(t, e.statics), delete e.statics), e.includes && (n.Util.extend.apply(null, [i].concat(e.includes)), delete e.includes), e.options && i.options && (e.options = n.Util.extend({}, i.options, e.options)), n.Util.extend(i, e), t
    }, n.Class.include = function (e) {
        n.Util.extend(this.prototype, e)
    }, n.Class.mergeOptions = function (e) {
        n.Util.extend(this.prototype.options, e)
    };
    var i = "_leaflet_events";
    n.Mixin = {}, n.Mixin.Events = {
        addEventListener: function (e, t, r) {
            var s = this[i] = this[i] || {}, o, u, a;
            if (typeof e == "object") {
                for (o in e) e.hasOwnProperty(o) && this.addEventListener(o, e[o], t);
                return this
            }
            e = n.Util.splitWords(e);
            for (u = 0, a = e.length; u < a; u++) s[e[u]] = s[e[u]] || [], s[e[u]].push({
                action: t,
                context: r || this
            });
            return this
        }, hasEventListeners: function (e) {
            return i in this && e in this[i] && this[i][e].length > 0
        }, removeEventListener: function (e, t, r) {
            var s = this[i], o, u, a, f, l;
            if (typeof e == "object") {
                for (o in e) e.hasOwnProperty(o) && this.removeEventListener(o, e[o], t);
                return this
            }
            e = n.Util.splitWords(e);
            for (u = 0, a = e.length; u < a; u++) if (this.hasEventListeners(e[u])) {
                f = s[e[u]];
                for (l = f.length - 1; l >= 0; l--) (!t || f[l].action === t) && (!r || f[l].context === r) && f.splice(l, 1)
            }
            return this
        }, fireEvent: function (e, t) {
            if (!this.hasEventListeners(e)) return this;
            var r = n.Util.extend({type: e, target: this}, t), s = this[i][e].slice();
            for (var o = 0, u = s.length; o < u; o++) s[o].action.call(s[o].context || this, r);
            return this
        }
    }, n.Mixin.Events.on = n.Mixin.Events.addEventListener, n.Mixin.Events.off = n.Mixin.Events.removeEventListener, n.Mixin.Events.fire = n.Mixin.Events.fireEvent, function () {
        var r = navigator.userAgent.toLowerCase(), i = !!e.ActiveXObject, s = i && !e.XMLHttpRequest,
            o = r.indexOf("webkit") !== -1, u = r.indexOf("gecko") !== -1, a = r.indexOf("chrome") !== -1, f = e.opera,
            l = r.indexOf("android") !== -1, c = r.search("android [23]") !== -1,
            h = typeof orientation != t + "" ? !0 : !1, p = document.documentElement, d = i && "transition" in p.style,
            v = o && "WebKitCSSMatrix" in e && "m11" in new e.WebKitCSSMatrix, m = u && "MozPerspective" in p.style,
            g = f && "OTransition" in p.style, y = !e.L_NO_TOUCH && function () {
                var e = "ontouchstart";
                if (e in p) return !0;
                var t = document.createElement("div"), n = !1;
                return t.setAttribute ? (t.setAttribute(e, "return;"), typeof t[e] == "function" && (n = !0), t.removeAttribute(e), t = null, n) : !1
            }(),
            b = "devicePixelRatio" in e && e.devicePixelRatio > 1 || "matchMedia" in e && e.matchMedia("(min-resolution:144dpi)").matches;
        n.Browser = {
            ua: r,
            ie: i,
            ie6: s,
            webkit: o,
            gecko: u,
            opera: f,
            android: l,
            android23: c,
            chrome: a,
            ie3d: d,
            webkit3d: v,
            gecko3d: m,
            opera3d: g,
            any3d: !e.L_DISABLE_3D && (d || v || m || g),
            mobile: h,
            mobileWebkit: h && o,
            mobileWebkit3d: h && v,
            mobileOpera: h && f,
            touch: y,
            retina: b
        }
    }(), n.Point = function (e, t, n) {
        this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t
    }, n.Point.prototype = {
        add: function (e) {
            return this.clone()._add(n.point(e))
        }, _add: function (e) {
            return this.x += e.x, this.y += e.y, this
        }, subtract: function (e) {
            return this.clone()._subtract(n.point(e))
        }, _subtract: function (e) {
            return this.x -= e.x, this.y -= e.y, this
        }, divideBy: function (e, t) {
            return new n.Point(this.x / e, this.y / e, t)
        }, multiplyBy: function (e, t) {
            return new n.Point(this.x * e, this.y * e, t)
        }, distanceTo: function (e) {
            e = n.point(e);
            var t = e.x - this.x, r = e.y - this.y;
            return Math.sqrt(t * t + r * r)
        }, round: function () {
            return this.clone()._round()
        }, _round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }, floor: function () {
            return this.clone()._floor()
        }, _floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }, clone: function () {
            return new n.Point(this.x, this.y)
        }, toString: function () {
            return "Point(" + n.Util.formatNum(this.x) + ", " + n.Util.formatNum(this.y) + ")"
        }
    }, n.point = function (e, t, r) {
        return e instanceof n.Point ? e : e instanceof Array ? new n.Point(e[0], e[1]) : isNaN(e) ? e : new n.Point(e, t, r)
    }, n.Bounds = n.Class.extend({
        initialize: function (e, t) {
            if (!e) return;
            var n = t ? [e, t] : e;
            for (var r = 0, i = n.length; r < i; r++) this.extend(n[r])
        }, extend: function (e) {
            return e = n.point(e), !this.min && !this.max ? (this.min = e.clone(), this.max = e.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(e.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(e.y, this.max.y)), this
        }, getCenter: function (e) {
            return new n.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e)
        }, getBottomLeft: function () {
            return new n.Point(this.min.x, this.max.y)
        }, getTopRight: function () {
            return new n.Point(this.max.x, this.min.y)
        }, contains: function (e) {
            var t, r;
            return typeof e[0] == "number" || e instanceof n.Point ? e = n.point(e) : e = n.bounds(e), e instanceof n.Bounds ? (t = e.min, r = e.max) : t = r = e, t.x >= this.min.x && r.x <= this.max.x && t.y >= this.min.y && r.y <= this.max.y
        }, intersects: function (e) {
            e = n.bounds(e);
            var t = this.min, r = this.max, i = e.min, s = e.max, o = s.x >= t.x && i.x <= r.x,
                u = s.y >= t.y && i.y <= r.y;
            return o && u
        }
    }), n.bounds = function (e, t) {
        return !e || e instanceof n.Bounds ? e : new n.Bounds(e, t)
    }, n.Transformation = n.Class.extend({
        initialize: function (e, t, n, r) {
            this._a = e, this._b = t, this._c = n, this._d = r
        }, transform: function (e, t) {
            return this._transform(e.clone(), t)
        }, _transform: function (e, t) {
            return t = t || 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e
        }, untransform: function (e, t) {
            return t = t || 1, new n.Point((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c)
        }
    }), n.DomUtil = {
        get: function (e) {
            return typeof e == "string" ? document.getElementById(e) : e
        }, getStyle: function (e, t) {
            var n = e.style[t];
            !n && e.currentStyle && (n = e.currentStyle[t]);
            if (!n || n === "auto") {
                var r = document.defaultView.getComputedStyle(e, null);
                n = r ? r[t] : null
            }
            return n === "auto" ? null : n
        }, getViewportOffset: function (e) {
            var t = 0, r = 0, i = e, s = document.body;
            do {
                t += i.offsetTop || 0, r += i.offsetLeft || 0;
                if (i.offsetParent === s && n.DomUtil.getStyle(i, "position") === "absolute") break;
                if (n.DomUtil.getStyle(i, "position") === "fixed") {
                    t += s.scrollTop || 0, r += s.scrollLeft || 0;
                    break
                }
                i = i.offsetParent
            } while (i);
            i = e;
            do {
                if (i === s) break;
                t -= i.scrollTop || 0, r -= i.scrollLeft || 0, i = i.parentNode
            } while (i);
            return new n.Point(r, t)
        }, create: function (e, t, n) {
            var r = document.createElement(e);
            return r.className = t, n && n.appendChild(r), r
        }, disableTextSelection: function () {
            document.selection && document.selection.empty && document.selection.empty(), this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = n.Util.falseFn)
        }, enableTextSelection: function () {
            document.onselectstart = this._onselectstart, this._onselectstart = null
        }, hasClass: function (e, t) {
            return e.className.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
        }, addClass: function (e, t) {
            n.DomUtil.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
        }, removeClass: function (e, t) {
            function n(e, n) {
                return n === t ? "" : e
            }

            e.className = e.className.replace(/(\S+)\s*/g, n).replace(/(^\s+|\s+$)/, "")
        }, setOpacity: function (e, t) {
            if ("opacity" in e.style) e.style.opacity = t; else if (n.Browser.ie) {
                var r = !1, i = "DXImageTransform.Microsoft.Alpha";
                try {
                    r = e.filters.item(i)
                } catch (s) {
                }
                t = Math.round(t * 100), r ? (r.Enabled = t !== 100, r.Opacity = t) : e.style.filter += " progid:" + i + "(opacity=" + t + ")"
            }
        }, testProp: function (e) {
            var t = document.documentElement.style;
            for (var n = 0; n < e.length; n++) if (e[n] in t) return e[n];
            return !1
        }, getTranslateString: function (e) {
            var t = n.Browser.webkit3d, r = "translate" + (t ? "3d" : "") + "(", i = (t ? ",0" : "") + ")";
            return r + e.x + "px," + e.y + "px" + i
        }, getScaleString: function (e, t) {
            var r = n.DomUtil.getTranslateString(t.add(t.multiplyBy(-1 * e))), i = " scale(" + e + ") ";
            return r + i
        }, setPosition: function (e, t, r) {
            e._leaflet_pos = t, !r && n.Browser.any3d ? (e.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(t), n.Browser.mobileWebkit3d && (e.style.WebkitBackfaceVisibility = "hidden")) : (e.style.left = t.x + "px", e.style.top = t.y + "px")
        }, getPosition: function (e) {
            return e._leaflet_pos
        }
    }, n.Util.extend(n.DomUtil, {
        TRANSITION: n.DomUtil.testProp(["transition", "webkitTransition", "OTransition", "MozTransition", "msTransition"]),
        TRANSFORM: n.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"])
    }), n.LatLng = function (e, t, n) {
        var r = parseFloat(e), i = parseFloat(t);
        if (isNaN(r) || isNaN(i)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
        n !== !0 && (r = Math.max(Math.min(r, 90), -90), i = (i + 180) % 360 + (i < -180 || i === 180 ? 180 : -180)), this.lat = r, this.lng = i
    }, n.Util.extend(n.LatLng, {
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MAX_MARGIN: 1e-9
    }), n.LatLng.prototype = {
        equals: function (e) {
            if (!e) return !1;
            e = n.latLng(e);
            var t = Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng));
            return t <= n.LatLng.MAX_MARGIN
        }, toString: function () {
            return "LatLng(" + n.Util.formatNum(this.lat) + ", " + n.Util.formatNum(this.lng) + ")"
        }, distanceTo: function (e) {
            e = n.latLng(e);
            var t = 6378137, r = n.LatLng.DEG_TO_RAD, i = (e.lat - this.lat) * r, s = (e.lng - this.lng) * r,
                o = this.lat * r, u = e.lat * r, a = Math.sin(i / 2), f = Math.sin(s / 2),
                l = a * a + f * f * Math.cos(o) * Math.cos(u);
            return t * 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l))
        }
    }, n.latLng = function (e, t, r) {
        return e instanceof n.LatLng ? e : e instanceof Array ? new n.LatLng(e[0], e[1]) : isNaN(e) ? e : new n.LatLng(e, t, r)
    }, n.LatLngBounds = n.Class.extend({
        initialize: function (e, t) {
            if (!e) return;
            var n = t ? [e, t] : e;
            for (var r = 0, i = n.length; r < i; r++) this.extend(n[r])
        }, extend: function (e) {
            return typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e), e instanceof n.LatLng ? !this._southWest && !this._northEast ? (this._southWest = new n.LatLng(e.lat, e.lng, !0), this._northEast = new n.LatLng(e.lat, e.lng, !0)) : (this._southWest.lat = Math.min(e.lat, this._southWest.lat), this._southWest.lng = Math.min(e.lng, this._southWest.lng), this._northEast.lat = Math.max(e.lat, this._northEast.lat), this._northEast.lng = Math.max(e.lng, this._northEast.lng)) : e instanceof n.LatLngBounds && (this.extend(e._southWest), this.extend(e._northEast)), this
        }, pad: function (e) {
            var t = this._southWest, r = this._northEast, i = Math.abs(t.lat - r.lat) * e,
                s = Math.abs(t.lng - r.lng) * e;
            return new n.LatLngBounds(new n.LatLng(t.lat - i, t.lng - s), new n.LatLng(r.lat + i, r.lng + s))
        }, getCenter: function () {
            return new n.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        }, getSouthWest: function () {
            return this._southWest
        }, getNorthEast: function () {
            return this._northEast
        }, getNorthWest: function () {
            return new n.LatLng(this._northEast.lat, this._southWest.lng, !0)
        }, getSouthEast: function () {
            return new n.LatLng(this._southWest.lat, this._northEast.lng, !0)
        }, contains: function (e) {
            typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e);
            var t = this._southWest, r = this._northEast, i, s;
            return e instanceof n.LatLngBounds ? (i = e.getSouthWest(), s = e.getNorthEast()) : i = s = e, i.lat >= t.lat && s.lat <= r.lat && i.lng >= t.lng && s.lng <= r.lng
        }, intersects: function (e) {
            e = n.latLngBounds(e);
            var t = this._southWest, r = this._northEast, i = e.getSouthWest(), s = e.getNorthEast(),
                o = s.lat >= t.lat && i.lat <= r.lat, u = s.lng >= t.lng && i.lng <= r.lng;
            return o && u
        }, toBBoxString: function () {
            var e = this._southWest, t = this._northEast;
            return [e.lng, e.lat, t.lng, t.lat].join(",")
        }, equals: function (e) {
            return e ? (e = n.latLngBounds(e), this._southWest.equals(e.getSouthWest()) && this._northEast.equals(e.getNorthEast())) : !1
        }
    }), n.latLngBounds = function (e, t) {
        return !e || e instanceof n.LatLngBounds ? e : new n.LatLngBounds(e, t)
    }, n.Projection = {}, n.Projection.SphericalMercator = {
        MAX_LATITUDE: 85.0511287798, project: function (e) {
            var t = n.LatLng.DEG_TO_RAD, r = this.MAX_LATITUDE, i = Math.max(Math.min(r, e.lat), -r), s = e.lng * t,
                o = i * t;
            return o = Math.log(Math.tan(Math.PI / 4 + o / 2)), new n.Point(s, o)
        }, unproject: function (e) {
            var t = n.LatLng.RAD_TO_DEG, r = e.x * t, i = (2 * Math.atan(Math.exp(e.y)) - Math.PI / 2) * t;
            return new n.LatLng(i, r, !0)
        }
    }, n.Projection.LonLat = {
        project: function (e) {
            return new n.Point(e.lng, e.lat)
        }, unproject: function (e) {
            return new n.LatLng(e.y, e.x, !0)
        }
    }, n.CRS = {
        latLngToPoint: function (e, t) {
            var n = this.projection.project(e), r = this.scale(t);
            return this.transformation._transform(n, r)
        }, pointToLatLng: function (e, t) {
            var n = this.scale(t), r = this.transformation.untransform(e, n);
            return this.projection.unproject(r)
        }, project: function (e) {
            return this.projection.project(e)
        }, scale: function (e) {
            return 256 * Math.pow(2, e)
        }
    }, n.CRS.EPSG3857 = n.Util.extend({}, n.CRS, {
        code: "EPSG:3857",
        projection: n.Projection.SphericalMercator,
        transformation: new n.Transformation(.5 / Math.PI, .5, -0.5 / Math.PI, .5),
        project: function (e) {
            var t = this.projection.project(e), n = 6378137;
            return t.multiplyBy(n)
        }
    }), n.CRS.EPSG900913 = n.Util.extend({}, n.CRS.EPSG3857, {code: "EPSG:900913"}), n.CRS.EPSG4326 = n.Util.extend({}, n.CRS, {
        code: "EPSG:4326",
        projection: n.Projection.LonLat,
        transformation: new n.Transformation(1 / 360, .5, -1 / 360, .5)
    }), n.Map = n.Class.extend({
        includes: n.Mixin.Events,
        options: {
            crs: n.CRS.EPSG3857,
            fadeAnimation: n.DomUtil.TRANSITION && !n.Browser.android23,
            trackResize: !0,
            markerZoomAnimation: n.DomUtil.TRANSITION && n.Browser.any3d
        },
        initialize: function (e, r) {
            r = n.Util.setOptions(this, r), this._initContainer(e), this._initLayout(), this._initHooks(), this._initEvents(), r.maxBounds && this.setMaxBounds(r.maxBounds), r.center && r.zoom !== t && this.setView(n.latLng(r.center), r.zoom, !0), this._initLayers(r.layers)
        },
        setView: function (e, t) {
            return this._resetView(n.latLng(e), this._limitZoom(t)), this
        },
        setZoom: function (e) {
            return this.setView(this.getCenter(), e)
        },
        zoomIn: function () {
            return this.setZoom(this._zoom + 1)
        },
        zoomOut: function () {
            return this.setZoom(this._zoom - 1)
        },
        fitBounds: function (e) {
            var t = this.getBoundsZoom(e);
            return this.setView(n.latLngBounds(e).getCenter(), t)
        },
        fitWorld: function () {
            var e = new n.LatLng(-60, -170), t = new n.LatLng(85, 179);
            return this.fitBounds(new n.LatLngBounds(e, t))
        },
        panTo: function (e) {
            return this.setView(e, this._zoom)
        },
        panBy: function (e) {
            return this.fire("movestart"), this._rawPanBy(n.point(e)), this.fire("move"), this.fire("moveend")
        },
        setMaxBounds: function (e) {
            e = n.latLngBounds(e), this.options.maxBounds = e;
            if (!e) return this._boundsMinZoom = null, this;
            var t = this.getBoundsZoom(e, !0);
            return this._boundsMinZoom = t, this._loaded && (this._zoom < t ? this.setView(e.getCenter(), t) : this.panInsideBounds(e)), this
        },
        panInsideBounds: function (e) {
            e = n.latLngBounds(e);
            var t = this.getBounds(), r = this.project(t.getSouthWest()), i = this.project(t.getNorthEast()),
                s = this.project(e.getSouthWest()), o = this.project(e.getNorthEast()), u = 0, a = 0;
            return i.y < o.y && (a = o.y - i.y), i.x > o.x && (u = o.x - i.x), r.y > s.y && (a = s.y - r.y), r.x < s.x && (u = s.x - r.x), this.panBy(new n.Point(u, a, !0))
        },
        addLayer: function (e) {
            var t = n.Util.stamp(e);
            if (this._layers[t]) return this;
            this._layers[t] = e, e.options && !isNaN(e.options.maxZoom) && (this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, e.options.maxZoom)), e.options && !isNaN(e.options.minZoom) && (this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, e.options.minZoom)), this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, e.on("load", this._onTileLayerLoad, this));
            var r = function () {
                e.onAdd(this), this.fire("layeradd", {layer: e})
            };
            return this._loaded ? r.call(this) : this.on("load", r, this), this
        },
        removeLayer: function (e) {
            var t = n.Util.stamp(e);
            if (!this._layers[t]) return;
            return e.onRemove(this), delete this._layers[t], this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, e.off("load", this._onTileLayerLoad, this)), this.fire("layerremove", {layer: e})
        },
        hasLayer: function (e) {
            var t = n.Util.stamp(e);
            return this._layers.hasOwnProperty(t)
        },
        invalidateSize: function (e) {
            var t = this.getSize();
            this._sizeChanged = !0, this.options.maxBounds && this.setMaxBounds(this.options.maxBounds);
            if (!this._loaded) return this;
            var r = t.subtract(this.getSize()).divideBy(2, !0);
            return e === !0 ? this.panBy(r) : (this._rawPanBy(r), this.fire("move"), clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(n.Util.bind(this.fire, this, "moveend"), 200)), this
        },
        addHandler: function (e, t) {
            if (!t) return;
            return this[e] = new t(this), this.options[e] && this[e].enable(), this
        },
        getCenter: function () {
            return this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function () {
            return this._zoom
        },
        getBounds: function () {
            var e = this.getPixelBounds(), t = this.unproject(e.getBottomLeft()), r = this.unproject(e.getTopRight());
            return new n.LatLngBounds(t, r)
        },
        getMinZoom: function () {
            var e = this.options.minZoom || 0, t = this._layersMinZoom || 0, n = this._boundsMinZoom || 0;
            return Math.max(e, t, n)
        },
        getMaxZoom: function () {
            var e = this.options.maxZoom === t ? Infinity : this.options.maxZoom,
                n = this._layersMaxZoom === t ? Infinity : this._layersMaxZoom;
            return Math.min(e, n)
        },
        getBoundsZoom: function (e, t) {
            e = n.latLngBounds(e);
            var r = this.getSize(), i = this.options.minZoom || 0, s = this.getMaxZoom(), o = e.getNorthEast(),
                u = e.getSouthWest(), a, f, l, c = !0;
            t && i--;
            do i++, f = this.project(o, i), l = this.project(u, i), a = new n.Point(Math.abs(f.x - l.x), Math.abs(l.y - f.y)), t ? c = a.x < r.x || a.y < r.y : c = a.x <= r.x && a.y <= r.y; while (c && i <= s);
            return c && t ? null : t ? i : i - 1
        },
        getSize: function () {
            if (!this._size || this._sizeChanged) this._size = new n.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1;
            return this._size
        },
        getPixelBounds: function () {
            var e = this._getTopLeftPoint();
            return new n.Bounds(e, e.add(this.getSize()))
        },
        getPixelOrigin: function () {
            return this._initialTopLeftPoint
        },
        getPanes: function () {
            return this._panes
        },
        getContainer: function () {
            return this._container
        },
        getZoomScale: function (e) {
            var t = this.options.crs;
            return t.scale(e) / t.scale(this._zoom)
        },
        getScaleZoom: function (e) {
            return this._zoom + Math.log(e) / Math.LN2
        },
        project: function (e, r) {
            return r = r === t ? this._zoom : r, this.options.crs.latLngToPoint(n.latLng(e), r)
        },
        unproject: function (e, r) {
            return r = r === t ? this._zoom : r, this.options.crs.pointToLatLng(n.point(e), r)
        },
        layerPointToLatLng: function (e) {
            var t = n.point(e).add(this._initialTopLeftPoint);
            return this.unproject(t)
        },
        latLngToLayerPoint: function (e) {
            var t = this.project(n.latLng(e))._round();
            return t._subtract(this._initialTopLeftPoint)
        },
        containerPointToLayerPoint: function (e) {
            return n.point(e).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function (e) {
            return n.point(e).add(this._getMapPanePos())
        },
        containerPointToLatLng: function (e) {
            var t = this.containerPointToLayerPoint(n.point(e));
            return this.layerPointToLatLng(t)
        },
        latLngToContainerPoint: function (e) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(n.latLng(e)))
        },
        mouseEventToContainerPoint: function (e) {
            return n.DomEvent.getMousePosition(e, this._container)
        },
        mouseEventToLayerPoint: function (e) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e))
        },
        mouseEventToLatLng: function (e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e))
        },
        _initContainer: function (e) {
            var t = this._container = n.DomUtil.get(e);
            if (t._leaflet) throw Error("Map container is already initialized.");
            t._leaflet = !0
        },
        _initLayout: function () {
            var e = this._container;
            e.innerHTML = "", n.DomUtil.addClass(e, "leaflet-container"), n.Browser.touch && n.DomUtil.addClass(e, "leaflet-touch"), this.options.fadeAnimation && n.DomUtil.addClass(e, "leaflet-fade-anim");
            var t = n.DomUtil.getStyle(e, "position");
            t !== "absolute" && t !== "relative" && t !== "fixed" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
        },
        _initPanes: function () {
            var e = this._panes = {};
            this._mapPane = e.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = e.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), this._objectsPane = e.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), e.shadowPane = this._createPane("leaflet-shadow-pane"), e.overlayPane = this._createPane("leaflet-overlay-pane"), e.markerPane = this._createPane("leaflet-marker-pane"), e.popupPane = this._createPane("leaflet-popup-pane");
            var t = " leaflet-zoom-hide";
            this.options.markerZoomAnimation || (n.DomUtil.addClass(e.markerPane, t), n.DomUtil.addClass(e.shadowPane, t), n.DomUtil.addClass(e.popupPane, t))
        },
        _createPane: function (e, t) {
            return n.DomUtil.create("div", e, t || this._objectsPane)
        },
        _initializers: [],
        _initHooks: function () {
            var e, t;
            for (e = 0, t = this._initializers.length; e < t; e++) this._initializers[e].call(this)
        },
        _initLayers: function (e) {
            e = e ? e instanceof Array ? e : [e] : [], this._layers = {}, this._tileLayersNum = 0;
            var t, n;
            for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t])
        },
        _resetView: function (e, t, r, i) {
            var s = this._zoom !== t;
            i || (this.fire("movestart"), s && this.fire("zoomstart")), this._zoom = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(e), r ? this._initialTopLeftPoint._add(this._getMapPanePos()) : n.DomUtil.setPosition(this._mapPane, new n.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum, this.fire("viewreset", {hard: !r}), this.fire("move"), (s || i) && this.fire("zoomend"), this.fire("moveend", {hard: !r}), this._loaded || (this._loaded = !0, this.fire("load"))
        },
        _rawPanBy: function (e) {
            n.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(e))
        },
        _initEvents: function () {
            if (!n.DomEvent) return;
            n.DomEvent.on(this._container, "click", this._onMouseClick, this);
            var t = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"], r, i;
            for (r = 0, i = t.length; r < i; r++) n.DomEvent.on(this._container, t[r], this._fireMouseEvent, this);
            this.options.trackResize && n.DomEvent.on(e, "resize", this._onResize, this)
        },
        _onResize: function () {
            n.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = n.Util.requestAnimFrame(this.invalidateSize, this, !1, this._container)
        },
        _onMouseClick: function (e) {
            if (!this._loaded || this.dragging && this.dragging.moved()) return;
            this.fire("preclick"), this._fireMouseEvent(e)
        },
        _fireMouseEvent: function (e) {
            if (!this._loaded) return;
            var t = e.type;
            t = t === "mouseenter" ? "mouseover" : t === "mouseleave" ? "mouseout" : t;
            if (!this.hasEventListeners(t)) return;
            t === "contextmenu" && n.DomEvent.preventDefault(e);
            var r = this.mouseEventToContainerPoint(e), i = this.containerPointToLayerPoint(r),
                s = this.layerPointToLatLng(i);
            this.fire(t, {latlng: s, layerPoint: i, containerPoint: r, originalEvent: e})
        },
        _onTileLayerLoad: function () {
            this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this._tileBg && (clearTimeout(this._clearTileBgTimer), this._clearTileBgTimer = setTimeout(n.Util.bind(this._clearTileBg, this), 500))
        },
        _getMapPanePos: function () {
            return n.DomUtil.getPosition(this._mapPane)
        },
        _getTopLeftPoint: function () {
            if (!this._loaded) throw Error("Set map center and zoom first.");
            return this._initialTopLeftPoint.subtract(this._getMapPanePos())
        },
        _getNewTopLeftPoint: function (e, t) {
            var n = this.getSize().divideBy(2);
            return this.project(e, t)._subtract(n)._round()
        },
        _latLngToNewLayerPoint: function (e, t, n) {
            var r = this._getNewTopLeftPoint(n, t).add(this._getMapPanePos());
            return this.project(e, t)._subtract(r)
        },
        _getCenterLayerPoint: function () {
            return this.containerPointToLayerPoint(this.getSize().divideBy(2))
        },
        _getCenterOffset: function (e) {
            return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint())
        },
        _limitZoom: function (e) {
            var t = this.getMinZoom(), n = this.getMaxZoom();
            return Math.max(t, Math.min(n, e))
        }
    }), n.Map.addInitHook = function (e) {
        var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function () {
            this[e].apply(this, t)
        };
        this.prototype._initializers.push(n)
    }, n.map = function (e, t) {
        return new n.Map(e, t)
    }, n.Projection.Mercator = {
        MAX_LATITUDE: 85.0840591556,
        R_MINOR: 6356752.3142,
        R_MAJOR: 6378137,
        project: function (e) {
            var t = n.LatLng.DEG_TO_RAD, r = this.MAX_LATITUDE, i = Math.max(Math.min(r, e.lat), -r), s = this.R_MAJOR,
                o = this.R_MINOR, u = e.lng * t * s, a = i * t, f = o / s, l = Math.sqrt(1 - f * f),
                c = l * Math.sin(a);
            c = Math.pow((1 - c) / (1 + c), l * .5);
            var h = Math.tan(.5 * (Math.PI * .5 - a)) / c;
            return a = -o * Math.log(h), new n.Point(u, a)
        },
        unproject: function (e) {
            var t = n.LatLng.RAD_TO_DEG, r = this.R_MAJOR, i = this.R_MINOR, s = e.x * t / r, o = i / r,
                u = Math.sqrt(1 - o * o), a = Math.exp(-e.y / i), f = Math.PI / 2 - 2 * Math.atan(a), l = 15, c = 1e-7,
                h = l, p = .1, d;
            while (Math.abs(p) > c && --h > 0) d = u * Math.sin(f), p = Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - d) / (1 + d), .5 * u)) - f, f += p;
            return new n.LatLng(f * t, s, !0)
        }
    }, n.CRS.EPSG3395 = n.Util.extend({}, n.CRS, {
        code: "EPSG:3395",
        projection: n.Projection.Mercator,
        transformation: function () {
            var e = n.Projection.Mercator, t = e.R_MAJOR, r = e.R_MINOR;
            return new n.Transformation(.5 / (Math.PI * t), .5, -0.5 / (Math.PI * r), .5)
        }()
    }), n.TileLayer = n.Class.extend({
        includes: n.Mixin.Events,
        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: "abc",
            errorTileUrl: "",
            attribution: "",
            zoomOffset: 0,
            opacity: 1,
            unloadInvisibleTiles: n.Browser.mobile,
            updateWhenIdle: n.Browser.mobile
        },
        initialize: function (e, t) {
            t = n.Util.setOptions(this, t), t.detectRetina && n.Browser.retina && t.maxZoom > 0 && (t.tileSize = Math.floor(t.tileSize / 2), t.zoomOffset++, t.minZoom > 0 && t.minZoom--, this.options.maxZoom--), this._url = e;
            var r = this.options.subdomains;
            typeof r == "string" && (this.options.subdomains = r.split(""))
        },
        onAdd: function (e) {
            this._map = e, this._initContainer(), this._createTileProto(), e.on({
                viewreset: this._resetCallback,
                moveend: this._update
            }, this), this.options.updateWhenIdle || (this._limitedUpdate = n.Util.limitExecByInterval(this._update, 150, this), e.on("move", this._limitedUpdate, this)), this._reset(), this._update()
        },
        addTo: function (e) {
            return e.addLayer(this), this
        },
        onRemove: function (e) {
            e._panes.tilePane.removeChild(this._container), e.off({
                viewreset: this._resetCallback,
                moveend: this._update
            }, this), this.options.updateWhenIdle || e.off("move", this._limitedUpdate, this), this._container = null, this._map = null
        },
        bringToFront: function () {
            var e = this._map._panes.tilePane;
            return this._container && (e.appendChild(this._container), this._setAutoZIndex(e, Math.max)), this
        },
        bringToBack: function () {
            var e = this._map._panes.tilePane;
            return this._container && (e.insertBefore(this._container, e.firstChild), this._setAutoZIndex(e, Math.min)), this
        },
        getAttribution: function () {
            return this.options.attribution
        },
        setOpacity: function (e) {
            return this.options.opacity = e, this._map && this._updateOpacity(), this
        },
        setZIndex: function (e) {
            return this.options.zIndex = e, this._updateZIndex(), this
        },
        setUrl: function (e, t) {
            return this._url = e, t || this.redraw(), this
        },
        redraw: function () {
            return this._map && (this._map._panes.tilePane.empty = !1, this._reset(!0), this._update()), this
        },
        _updateZIndex: function () {
            this._container && this.options.zIndex !== t && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function (e, t) {
            var n = e.getElementsByClassName("leaflet-layer"), r = -t(Infinity, -Infinity), i;
            for (var s = 0, o = n.length; s < o; s++) n[s] !== this._container && (i = parseInt(n[s].style.zIndex, 10), isNaN(i) || (r = t(r, i)));
            this._container.style.zIndex = isFinite(r) ? r + t(1, -1) : ""
        },
        _updateOpacity: function () {
            n.DomUtil.setOpacity(this._container, this.options.opacity);
            var e, t = this._tiles;
            if (n.Browser.webkit) for (e in t) t.hasOwnProperty(e) && (t[e].style.webkitTransform += " translate(0,0)")
        },
        _initContainer: function () {
            var e = this._map._panes.tilePane;
            if (!this._container || e.empty) this._container = n.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), e.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
        },
        _resetCallback: function (e) {
            this._reset(e.hard)
        },
        _reset: function (e) {
            var t, n = this._tiles;
            for (t in n) n.hasOwnProperty(t) && this.fire("tileunload", {tile: n[t]});
            this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), e && this._container && (this._container.innerHTML = ""), this._initContainer()
        },
        _update: function (e) {
            if (this._map._panTransition && this._map._panTransition._inProgress) return;
            var t = this._map.getPixelBounds(), r = this._map.getZoom(), i = this.options.tileSize;
            if (r > this.options.maxZoom || r < this.options.minZoom) return;
            var s = new n.Point(Math.floor(t.min.x / i), Math.floor(t.min.y / i)),
                o = new n.Point(Math.floor(t.max.x / i), Math.floor(t.max.y / i)), u = new n.Bounds(s, o);
            this._addTilesFromCenterOut(u), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(u)
        },
        _addTilesFromCenterOut: function (e) {
            var t = [], r = e.getCenter(), i, s, o;
            for (i = e.min.y; i <= e.max.y; i++) for (s = e.min.x; s <= e.max.x; s++) o = new n.Point(s, i), this._tileShouldBeLoaded(o) && t.push(o);
            var u = t.length;
            if (u === 0) return;
            t.sort(function (e, t) {
                return e.distanceTo(r) - t.distanceTo(r)
            });
            var a = document.createDocumentFragment();
            this._tilesToLoad || this.fire("loading"), this._tilesToLoad += u;
            for (s = 0; s < u; s++) this._addTile(t[s], a);
            this._container.appendChild(a)
        },
        _tileShouldBeLoaded: function (e) {
            if (e.x + ":" + e.y in this._tiles) return !1;
            if (!this.options.continuousWorld) {
                var t = this._getWrapTileNum();
                if (this.options.noWrap && (e.x < 0 || e.x >= t) || e.y < 0 || e.y >= t) return !1
            }
            return !0
        },
        _removeOtherTiles: function (e) {
            var t, n, r, i;
            for (i in this._tiles) this._tiles.hasOwnProperty(i) && (t = i.split(":"), n = parseInt(t[0], 10), r = parseInt(t[1], 10), (n < e.min.x || n > e.max.x || r < e.min.y || r > e.max.y) && this._removeTile(i))
        },
        _removeTile: function (e) {
            var t = this._tiles[e];
            this.fire("tileunload", {
                tile: t,
                url: t.src
            }), this.options.reuseTiles ? (n.DomUtil.removeClass(t, "leaflet-tile-loaded"), this._unusedTiles.push(t)) : t.parentNode === this._container && this._container.removeChild(t), n.Browser.android || (t.src = n.Util.emptyImageUrl), delete this._tiles[e]
        },
        _addTile: function (e, t) {
            var r = this._getTilePos(e), i = this._getTile();
            n.DomUtil.setPosition(i, r, n.Browser.chrome || n.Browser.android23), this._tiles[e.x + ":" + e.y] = i, this._loadTile(i, e), i.parentNode !== this._container && t.appendChild(i)
        },
        _getZoomForUrl: function () {
            var e = this.options, t = this._map.getZoom();
            return e.zoomReverse && (t = e.maxZoom - t), t + e.zoomOffset
        },
        _getTilePos: function (e) {
            var t = this._map.getPixelOrigin(), n = this.options.tileSize;
            return e.multiplyBy(n).subtract(t)
        },
        getTileUrl: function (e) {
            return this._adjustTilePoint(e), n.Util.template(this._url, n.Util.extend({
                s: this._getSubdomain(e),
                z: this._getZoomForUrl(),
                x: e.x,
                y: e.y
            }, this.options))
        },
        _getWrapTileNum: function () {
            return Math.pow(2, this._getZoomForUrl())
        },
        _adjustTilePoint: function (e) {
            var t = this._getWrapTileNum();
            !this.options.continuousWorld && !this.options.noWrap && (e.x = (e.x % t + t) % t), this.options.tms && (e.y = t - e.y - 1)
        },
        _getSubdomain: function (e) {
            var t = (e.x + e.y) % this.options.subdomains.length;
            return this.options.subdomains[t]
        },
        _createTileProto: function () {
            var e = this._tileImg = n.DomUtil.create("img", "leaflet-tile");
            e.galleryimg = "no";
            var t = this.options.tileSize;
            e.style.width = t + "px", e.style.height = t + "px"
        },
        _getTile: function () {
            if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                var e = this._unusedTiles.pop();
                return this._resetTile(e), e
            }
            return this._createTile()
        },
        _resetTile: function (e) {
        },
        _createTile: function () {
            var e = this._tileImg.cloneNode(!1);
            return e.onselectstart = e.onmousemove = n.Util.falseFn, e
        },
        _loadTile: function (e, t) {
            e._layer = this, e.onload = this._tileOnLoad, e.onerror = this._tileOnError, e.src = this.getTileUrl(t)
        },
        _tileLoaded: function () {
            this._tilesToLoad--, this._tilesToLoad || this.fire("load")
        },
        _tileOnLoad: function (e) {
            var t = this._layer;
            this.src !== n.Util.emptyImageUrl && (n.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
                tile: this,
                url: this.src
            })), t._tileLoaded()
        },
        _tileOnError: function (e) {
            var t = this._layer;
            t.fire("tileerror", {tile: this, url: this.src});
            var n = t.options.errorTileUrl;
            n && (this.src = n), t._tileLoaded()
        }
    }), n.tileLayer = function (e, t) {
        return new n.TileLayer(e, t)
    }, n.TileLayer.WMS = n.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
        }, initialize: function (e, t) {
            this._url = e;
            var r = n.Util.extend({}, this.defaultWmsParams);
            t.detectRetina && n.Browser.retina ? r.width = r.height = this.options.tileSize * 2 : r.width = r.height = this.options.tileSize;
            for (var i in t) this.options.hasOwnProperty(i) || (r[i] = t[i]);
            this.wmsParams = r, n.Util.setOptions(this, t)
        }, onAdd: function (e) {
            var t = parseFloat(this.wmsParams.version) >= 1.3 ? "crs" : "srs";
            this.wmsParams[t] = e.options.crs.code, n.TileLayer.prototype.onAdd.call(this, e)
        }, getTileUrl: function (e, t) {
            var r = this._map, i = r.options.crs, s = this.options.tileSize, o = e.multiplyBy(s),
                u = o.add(new n.Point(s, s)), a = i.project(r.unproject(o, t)), f = i.project(r.unproject(u, t)),
                l = [a.x, f.y, f.x, a.y].join(","), c = n.Util.template(this._url, {s: this._getSubdomain(e)});
            return c + n.Util.getParamString(this.wmsParams) + "&bbox=" + l
        }, setParams: function (e, t) {
            return n.Util.extend(this.wmsParams, e), t || this.redraw(), this
        }
    }), n.tileLayer.wms = function (e, t) {
        return new n.TileLayer.WMS(e, t)
    }, n.TileLayer.Canvas = n.TileLayer.extend({
        options: {async: !1}, initialize: function (e) {
            n.Util.setOptions(this, e)
        }, redraw: function () {
            var e, t = this._tiles;
            for (e in t) t.hasOwnProperty(e) && this._redrawTile(t[e])
        }, _redrawTile: function (e) {
            this.drawTile(e, e._tilePoint, e._zoom)
        }, _createTileProto: function () {
            var e = this._canvasProto = n.DomUtil.create("canvas", "leaflet-tile"), t = this.options.tileSize;
            e.width = t, e.height = t
        }, _createTile: function () {
            var e = this._canvasProto.cloneNode(!1);
            return e.onselectstart = e.onmousemove = n.Util.falseFn, e
        }, _loadTile: function (e, t, n) {
            e._layer = this, e._tilePoint = t, e._zoom = n, this.drawTile(e, t, n), this.options.async || this.tileDrawn(e)
        }, drawTile: function (e, t, n) {
        }, tileDrawn: function (e) {
            this._tileOnLoad.call(e)
        }
    }), n.tileLayer.canvas = function (e) {
        return new n.TileLayer.Canvas(e)
    }, n.ImageOverlay = n.Class.extend({
        includes: n.Mixin.Events, options: {opacity: 1}, initialize: function (e, t, r) {
            this._url = e, this._bounds = n.latLngBounds(t), n.Util.setOptions(this, r)
        }, onAdd: function (e) {
            this._map = e, this._image || this._initImage(), e._panes.overlayPane.appendChild(this._image), e.on("viewreset", this._reset, this), e.options.zoomAnimation && n.Browser.any3d && e.on("zoomanim", this._animateZoom, this), this._reset()
        }, onRemove: function (e) {
            e.getPanes().overlayPane.removeChild(this._image), e.off("viewreset", this._reset, this), e.options.zoomAnimation && e.off("zoomanim", this._animateZoom, this)
        }, addTo: function (e) {
            return e.addLayer(this), this
        }, setOpacity: function (e) {
            return this.options.opacity = e, this._updateOpacity(), this
        }, bringToFront: function () {
            return this._image && this._map._panes.overlayPane.appendChild(this._image), this
        }, bringToBack: function () {
            var e = this._map._panes.overlayPane;
            return this._image && e.insertBefore(this._image, e.firstChild), this
        }, _initImage: function () {
            this._image = n.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && n.Browser.any3d ? n.DomUtil.addClass(this._image, "leaflet-zoom-animated") : n.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), n.Util.extend(this._image, {
                galleryimg: "no",
                onselectstart: n.Util.falseFn,
                onmousemove: n.Util.falseFn,
                onload: n.Util.bind(this._onImageLoad, this),
                src: this._url
            })
        }, _animateZoom: function (e) {
            var t = this._map, r = this._image, i = t.getZoomScale(e.zoom), s = this._bounds.getNorthWest(),
                o = this._bounds.getSouthEast(), u = t._latLngToNewLayerPoint(s, e.zoom, e.center),
                a = t._latLngToNewLayerPoint(o, e.zoom, e.center).subtract(u),
                f = t.latLngToLayerPoint(o).subtract(t.latLngToLayerPoint(s)), l = u.add(a.subtract(f).divideBy(2));
            r.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(l) + " scale(" + i + ") "
        }, _reset: function () {
            var e = this._image, t = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                r = this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(t);
            n.DomUtil.setPosition(e, t), e.style.width = r.x + "px", e.style.height = r.y + "px"
        }, _onImageLoad: function () {
            this.fire("load")
        }, _updateOpacity: function () {
            n.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    }), n.imageOverlay = function (e, t, r) {
        return new n.ImageOverlay(e, t, r)
    }, n.Icon = n.Class.extend({
        options: {className: ""}, initialize: function (e) {
            n.Util.setOptions(this, e)
        }, createIcon: function () {
            return this._createIcon("icon")
        }, createShadow: function () {
            return this._createIcon("shadow")
        }, _createIcon: function (e) {
            var t = this._getIconUrl(e);
            if (!t) {
                if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            var n = this._createImg(t);
            return this._setIconStyles(n, e), n
        }, _setIconStyles: function (e, t) {
            var r = this.options, i = n.point(r[t + "Size"]), s;
            t === "shadow" ? s = n.point(r.shadowAnchor || r.iconAnchor) : s = n.point(r.iconAnchor), !s && i && (s = i.divideBy(2, !0)), e.className = "leaflet-marker-" + t + " " + r.className, s && (e.style.marginLeft = -s.x + "px", e.style.marginTop = -s.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px")
        }, _createImg: function (e) {
            var t;
            return n.Browser.ie6 ? (t = document.createElement("div"), t.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + e + '")') : (t = document.createElement("img"), t.src = e), t
        }, _getIconUrl: function (e) {
            return this.options[e + "Url"]
        }
    }), n.icon = function (e) {
        return new n.Icon(e)
    }, n.Icon.Default = n.Icon.extend({
        options: {
            iconSize: new n.Point(25, 41),
            iconAnchor: new n.Point(13, 41),
            popupAnchor: new n.Point(1, -34),
            shadowSize: new n.Point(41, 41)
        }, _getIconUrl: function (e) {
            var t = e + "Url";
            if (this.options[t]) return this.options[t];
            var r = n.Icon.Default.imagePath;
            if (!r) throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return r + "/marker-" + e + ".png"
        }
    }), n.Icon.Default.imagePath = function () {
        var e = document.getElementsByTagName("script"), t = /\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/, n, r, i, s;
        for (n = 0, r = e.length; n < r; n++) {
            i = e[n].src, s = i.match(t);
            if (s) return i.split(t)[0] + "/images"
        }
    }(), n.Marker = n.Class.extend({
        includes: n.Mixin.Events,
        options: {icon: new n.Icon.Default, title: "", clickable: !0, draggable: !1, zIndexOffset: 0, opacity: 1},
        initialize: function (e, t) {
            n.Util.setOptions(this, t), this._latlng = n.latLng(e)
        },
        onAdd: function (e) {
            this._map = e, e.on("viewreset", this.update, this), this._initIcon(), this.update(), e.options.zoomAnimation && e.options.markerZoomAnimation && e.on("zoomanim", this._animateZoom, this)
        },
        addTo: function (e) {
            return e.addLayer(this), this
        },
        onRemove: function (e) {
            this._removeIcon(), this.closePopup && this.closePopup(), e.off({
                viewreset: this.update,
                zoomanim: this._animateZoom
            }, this), this._map = null
        },
        getLatLng: function () {
            return this._latlng
        },
        setLatLng: function (e) {
            this._latlng = n.latLng(e), this.update(), this._popup && this._popup.setLatLng(e)
        },
        setZIndexOffset: function (e) {
            this.options.zIndexOffset = e, this.update()
        },
        setIcon: function (e) {
            this._map && this._removeIcon(), this.options.icon = e, this._map && (this._initIcon(), this.update())
        },
        update: function () {
            if (!this._icon) return;
            var e = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(e)
        },
        _initIcon: function () {
            var e = this.options, t = this._map, r = t.options.zoomAnimation && t.options.markerZoomAnimation,
                i = r ? "leaflet-zoom-animated" : "leaflet-zoom-hide", s = !1;
            this._icon || (this._icon = e.icon.createIcon(), e.title && (this._icon.title = e.title), this._initInteraction(), s = this.options.opacity < 1, n.DomUtil.addClass(this._icon, i)), this._shadow || (this._shadow = e.icon.createShadow(), this._shadow && (n.DomUtil.addClass(this._shadow, i), s = this.options.opacity < 1)), s && this._updateOpacity();
            var o = this._map._panes;
            o.markerPane.appendChild(this._icon), this._shadow && o.shadowPane.appendChild(this._shadow)
        },
        _removeIcon: function () {
            var e = this._map._panes;
            e.markerPane.removeChild(this._icon), this._shadow && e.shadowPane.removeChild(this._shadow), this._icon = this._shadow = null
        },
        _setPos: function (e) {
            n.DomUtil.setPosition(this._icon, e), this._shadow && n.DomUtil.setPosition(this._shadow, e), this._icon.style.zIndex = e.y + this.options.zIndexOffset
        },
        _animateZoom: function (e) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            this._setPos(t)
        },
        _initInteraction: function () {
            if (!this.options.clickable) return;
            var e = this._icon, t = ["dblclick", "mousedown", "mouseover", "mouseout"];
            n.DomUtil.addClass(e, "leaflet-clickable"), n.DomEvent.on(e, "click", this._onMouseClick, this);
            for (var r = 0; r < t.length; r++) n.DomEvent.on(e, t[r], this._fireMouseEvent, this);
            n.Handler.MarkerDrag && (this.dragging = new n.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
        },
        _onMouseClick: function (e) {
            n.DomEvent.stopPropagation(e);
            if (this.dragging && this.dragging.moved()) return;
            if (this._map.dragging && this._map.dragging.moved()) return;
            this.fire(e.type, {originalEvent: e})
        },
        _fireMouseEvent: function (e) {
            this.fire(e.type, {originalEvent: e}), e.type !== "mousedown" && n.DomEvent.stopPropagation(e)
        },
        setOpacity: function (e) {
            this.options.opacity = e, this._map && this._updateOpacity()
        },
        _updateOpacity: function () {
            n.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && n.DomUtil.setOpacity(this._shadow, this.options.opacity)
        }
    }), n.marker = function (e, t) {
        return new n.Marker(e, t)
    }, n.DivIcon = n.Icon.extend({
        options: {iconSize: new n.Point(12, 12), className: "leaflet-div-icon"},
        createIcon: function () {
            var e = document.createElement("div"), t = this.options;
            return t.html && (e.innerHTML = t.html), t.bgPos && (e.style.backgroundPosition = -t.bgPos.x + "px " + -t.bgPos.y + "px"), this._setIconStyles(e, "icon"), e
        },
        createShadow: function () {
            return null
        }
    }), n.divIcon = function (e) {
        return new n.DivIcon(e)
    }, n.Map.mergeOptions({closePopupOnClick: !0}), n.Popup = n.Class.extend({
        includes: n.Mixin.Events,
        options: {
            minWidth: 50,
            maxWidth: 300,
            maxHeight: null,
            autoPan: !0,
            closeButton: !0,
            offset: new n.Point(0, 6),
            autoPanPadding: new n.Point(5, 5),
            className: ""
        },
        initialize: function (e, t) {
            n.Util.setOptions(this, e), this._source = t
        },
        onAdd: function (e) {
            this._map = e, this._container || this._initLayout(), this._updateContent();
            var t = e.options.fadeAnimation;
            t && n.DomUtil.setOpacity(this._container, 0), e._panes.popupPane.appendChild(this._container), e.on("viewreset", this._updatePosition, this), n.Browser.any3d && e.on("zoomanim", this._zoomAnimation, this), e.options.closePopupOnClick && e.on("preclick", this._close, this), this._update(), t && n.DomUtil.setOpacity(this._container, 1)
        },
        addTo: function (e) {
            return e.addLayer(this), this
        },
        openOn: function (e) {
            return e.openPopup(this), this
        },
        onRemove: function (e) {
            e._panes.popupPane.removeChild(this._container), n.Util.falseFn(this._container.offsetWidth), e.off({
                viewreset: this._updatePosition,
                preclick: this._close,
                zoomanim: this._zoomAnimation
            }, this), e.options.fadeAnimation && n.DomUtil.setOpacity(this._container, 0), this._map = null
        },
        setLatLng: function (e) {
            return this._latlng = n.latLng(e), this._update(), this
        },
        setContent: function (e) {
            return this._content = e, this._update(), this
        },
        _close: function () {
            var e = this._map;
            e && (e._popup = null, e.removeLayer(this).fire("popupclose", {popup: this}))
        },
        _initLayout: function () {
            var e = "leaflet-popup",
                t = this._container = n.DomUtil.create("div", e + " " + this.options.className + " leaflet-zoom-animated"),
                r;
            this.options.closeButton && (r = this._closeButton = n.DomUtil.create("a", e + "-close-button", t), r.href = "#close", r.innerHTML = "&#215;", n.DomEvent.on(r, "click", this._onCloseButtonClick, this));
            var i = this._wrapper = n.DomUtil.create("div", e + "-content-wrapper", t);
            n.DomEvent.disableClickPropagation(i), this._contentNode = n.DomUtil.create("div", e + "-content", i), n.DomEvent.on(this._contentNode, "mousewheel", n.DomEvent.stopPropagation), this._tipContainer = n.DomUtil.create("div", e + "-tip-container", t), this._tip = n.DomUtil.create("div", e + "-tip", this._tipContainer)
        },
        _update: function () {
            if (!this._map) return;
            this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan()
        },
        _updateContent: function () {
            if (!this._content) return;
            if (typeof this._content == "string") this._contentNode.innerHTML = this._content; else {
                while (this._contentNode.hasChildNodes()) this._contentNode.removeChild(this._contentNode.firstChild);
                this._contentNode.appendChild(this._content)
            }
            this.fire("contentupdate")
        },
        _updateLayout: function () {
            var e = this._contentNode, t = e.style;
            t.width = "", t.whiteSpace = "nowrap";
            var r = e.offsetWidth;
            r = Math.min(r, this.options.maxWidth), r = Math.max(r, this.options.minWidth), t.width = r + 1 + "px", t.whiteSpace = "", t.height = "";
            var i = e.offsetHeight, s = this.options.maxHeight, o = "leaflet-popup-scrolled";
            s && i > s ? (t.height = s + "px", n.DomUtil.addClass(e, o)) : n.DomUtil.removeClass(e, o), this._containerWidth = this._container.offsetWidth
        },
        _updatePosition: function () {
            var e = this._map.latLngToLayerPoint(this._latlng), t = n.Browser.any3d, r = this.options.offset;
            t && n.DomUtil.setPosition(this._container, e), this._containerBottom = -r.y - (t ? 0 : e.y), this._containerLeft = -Math.round(this._containerWidth / 2) + r.x + (t ? 0 : e.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
        },
        _zoomAnimation: function (e) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            n.DomUtil.setPosition(this._container, t)
        },
        _adjustPan: function () {
            if (!this.options.autoPan) return;
            var e = this._map, t = this._container.offsetHeight, r = this._containerWidth,
                i = new n.Point(this._containerLeft, -t - this._containerBottom);
            n.Browser.any3d && i._add(n.DomUtil.getPosition(this._container));
            var s = e.layerPointToContainerPoint(i), o = this.options.autoPanPadding, u = e.getSize(), a = 0, f = 0;
            s.x < 0 && (a = s.x - o.x), s.x + r > u.x && (a = s.x + r - u.x + o.x), s.y < 0 && (f = s.y - o.y), s.y + t > u.y && (f = s.y + t - u.y + o.y), (a || f) && e.panBy(new n.Point(a, f))
        },
        _onCloseButtonClick: function (e) {
            this._close(), n.DomEvent.stop(e)
        }
    }), n.popup = function (e, t) {
        return new n.Popup(e, t)
    }, n.Marker.include({
        openPopup: function () {
            return this._popup && this._map && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
        }, closePopup: function () {
            return this._popup && this._popup._close(), this
        }, bindPopup: function (e, t) {
            var r = n.point(this.options.icon.options.popupAnchor) || new n.Point(0, 0);
            return r = r.add(n.Popup.prototype.options.offset), t && t.offset && (r = r.add(t.offset)), t = n.Util.extend({offset: r}, t), this._popup || this.on("click", this.openPopup, this), this._popup = (new n.Popup(t, this)).setContent(e), this
        }, unbindPopup: function () {
            return this._popup && (this._popup = null, this.off("click", this.openPopup)), this
        }
    }), n.Map.include({
        openPopup: function (e) {
            return this.closePopup(), this._popup = e, this.addLayer(e).fire("popupopen", {popup: this._popup})
        }, closePopup: function () {
            return this._popup && this._popup._close(), this
        }
    }), n.LayerGroup = n.Class.extend({
        initialize: function (e) {
            this._layers = {};
            var t, n;
            if (e) for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t])
        }, addLayer: function (e) {
            var t = n.Util.stamp(e);
            return this._layers[t] = e, this._map && this._map.addLayer(e), this
        }, removeLayer: function (e) {
            var t = n.Util.stamp(e);
            return delete this._layers[t], this._map && this._map.removeLayer(e), this
        }, clearLayers: function () {
            return this.eachLayer(this.removeLayer, this), this
        }, invoke: function (e) {
            var t = Array.prototype.slice.call(arguments, 1), n, r;
            for (n in this._layers) this._layers.hasOwnProperty(n) && (r = this._layers[n], r[e] && r[e].apply(r, t));
            return this
        }, onAdd: function (e) {
            this._map = e, this.eachLayer(e.addLayer, e)
        }, onRemove: function (e) {
            this.eachLayer(e.removeLayer, e), this._map = null
        }, addTo: function (e) {
            return e.addLayer(this), this
        }, eachLayer: function (e, t) {
            for (var n in this._layers) this._layers.hasOwnProperty(n) && e.call(t, this._layers[n])
        }
    }), n.layerGroup = function (e) {
        return new n.LayerGroup(e)
    }, n.FeatureGroup = n.LayerGroup.extend({
        includes: n.Mixin.Events, addLayer: function (e) {
            return this._layers[n.Util.stamp(e)] ? this : (e.on("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.addLayer.call(this, e), this._popupContent && e.bindPopup && e.bindPopup(this._popupContent), this)
        }, removeLayer: function (e) {
            return e.off("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.removeLayer.call(this, e), this._popupContent ? this.invoke("unbindPopup") : this
        }, bindPopup: function (e) {
            return this._popupContent = e, this.invoke("bindPopup", e)
        }, setStyle: function (e) {
            return this.invoke("setStyle", e)
        }, bringToFront: function () {
            return this.invoke("bringToFront")
        }, bringToBack: function () {
            return this.invoke("bringToBack")
        }, getBounds: function () {
            var e = new n.LatLngBounds;
            return this.eachLayer(function (t) {
                e.extend(t instanceof n.Marker ? t.getLatLng() : t.getBounds())
            }, this), e
        }, _propagateEvent: function (e) {
            e.layer = e.target, e.target = this, this.fire(e.type, e)
        }
    }), n.featureGroup = function (e) {
        return new n.FeatureGroup(e)
    }, n.Path = n.Class.extend({
        includes: [n.Mixin.Events],
        statics: {CLIP_PADDING: n.Browser.mobile ? Math.max(0, Math.min(.5, (1280 / Math.max(e.innerWidth, e.innerHeight) - 1) / 2)) : .5},
        options: {
            stroke: !0,
            color: "#0033ff",
            dashArray: null,
            weight: 5,
            opacity: .5,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            clickable: !0
        },
        initialize: function (e) {
            n.Util.setOptions(this, e)
        },
        onAdd: function (e) {
            this._map = e, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), e.on({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        addTo: function (e) {
            return e.addLayer(this), this
        },
        onRemove: function (e) {
            e._pathRoot.removeChild(this._container), this._map = null, n.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), e.off({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        projectLatlngs: function () {
        },
        setStyle: function (e) {
            return n.Util.setOptions(this, e), this._container && this._updateStyle(), this
        },
        redraw: function () {
            return this._map && (this.projectLatlngs(), this._updatePath()), this
        }
    }), n.Map.include({
        _updatePathViewport: function () {
            var e = n.Path.CLIP_PADDING, t = this.getSize(), r = n.DomUtil.getPosition(this._mapPane),
                i = r.multiplyBy(-1)._subtract(t.multiplyBy(e)), s = i.add(t.multiplyBy(1 + e * 2));
            this._pathViewport = new n.Bounds(i, s)
        }
    }), n.Path.SVG_NS = "http://www.w3.org/2000/svg", n.Browser.svg = !!document.createElementNS && !!document.createElementNS(n.Path.SVG_NS, "svg").createSVGRect, n.Path = n.Path.extend({
        statics: {SVG: n.Browser.svg}, bringToFront: function () {
            return this._container && this._map._pathRoot.appendChild(this._container), this
        }, bringToBack: function () {
            if (this._container) {
                var e = this._map._pathRoot;
                e.insertBefore(this._container, e.firstChild)
            }
            return this
        }, getPathString: function () {
        }, _createElement: function (e) {
            return document.createElementNS(n.Path.SVG_NS, e)
        }, _initElements: function () {
            this._map._initPathRoot(), this._initPath(), this._initStyle()
        }, _initPath: function () {
            this._container = this._createElement("g"), this._path = this._createElement("path"), this._container.appendChild(this._path)
        }, _initStyle: function () {
            this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this._updateStyle()
        }, _updateStyle: function () {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray")) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
        }, _updatePath: function () {
            var e = this.getPathString();
            e || (e = "M0 0"), this._path.setAttribute("d", e)
        }, _initEvents: function () {
            if (this.options.clickable) {
                (n.Browser.svg || !n.Browser.vml) && this._path.setAttribute("class", "leaflet-clickable"), n.DomEvent.on(this._container, "click", this._onMouseClick, this);
                var e = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"];
                for (var t = 0; t < e.length; t++) n.DomEvent.on(this._container, e[t], this._fireMouseEvent, this)
            }
        }, _onMouseClick: function (e) {
            if (this._map.dragging && this._map.dragging.moved()) return;
            this._fireMouseEvent(e), n.DomEvent.stopPropagation(e)
        }, _fireMouseEvent: function (e) {
            if (!this.hasEventListeners(e.type)) return;
            e.type === "contextmenu" && n.DomEvent.preventDefault(e);
            var t = this._map, r = t.mouseEventToContainerPoint(e), i = t.containerPointToLayerPoint(r),
                s = t.layerPointToLatLng(i);
            this.fire(e.type, {latlng: s, layerPoint: i, containerPoint: r, originalEvent: e})
        }
    }), n.Map.include({
        _initPathRoot: function () {
            this._pathRoot || (this._pathRoot = n.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && n.Browser.any3d ? (this._pathRoot.setAttribute("class", " leaflet-zoom-animated"), this.on({
                zoomanim: this._animatePathZoom,
                zoomend: this._endPathZoom
            })) : this._pathRoot.setAttribute("class", " leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
        }, _animatePathZoom: function (e) {
            var t = this.getZoomScale(e.zoom), r = this._getCenterOffset(e.center).divideBy(1 - 1 / t),
                i = this.containerPointToLayerPoint(this.getSize().multiplyBy(-n.Path.CLIP_PADDING)),
                s = i.add(r).round();
            this._pathRoot.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(s.multiplyBy(-1).add(n.DomUtil.getPosition(this._pathRoot)).multiplyBy(t).add(s)) + " scale(" + t + ") ", this._pathZooming = !0
        }, _endPathZoom: function () {
            this._pathZooming = !1
        }, _updateSvgViewport: function () {
            if (this._pathZooming) return;
            this._updatePathViewport();
            var e = this._pathViewport, t = e.min, r = e.max, i = r.x - t.x, s = r.y - t.y, o = this._pathRoot,
                u = this._panes.overlayPane;
            n.Browser.mobileWebkit && u.removeChild(o), n.DomUtil.setPosition(o, t), o.setAttribute("width", i), o.setAttribute("height", s), o.setAttribute("viewBox", [t.x, t.y, i, s].join(" ")), n.Browser.mobileWebkit && u.appendChild(o)
        }
    }), n.Path.include({
        bindPopup: function (e, t) {
            if (!this._popup || this._popup.options !== t) this._popup = new n.Popup(t, this);
            return this._popup.setContent(e), this._openPopupAdded || (this.on("click", this._openPopup, this), this._openPopupAdded = !0), this
        }, openPopup: function (e) {
            return this._popup && (e = e || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({latlng: e})), this
        }, _openPopup: function (e) {
            this._popup.setLatLng(e.latlng), this._map.openPopup(this._popup)
        }
    }), n.Browser.vml = function () {
        try {
            var e = document.createElement("div");
            e.innerHTML = '<v:shape adj="1"/>';
            var t = e.firstChild;
            return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object"
        } catch (n) {
            return !1
        }
    }(), n.Path = n.Browser.svg || !n.Browser.vml ? n.Path : n.Path.extend({
        statics: {VML: !0, CLIP_PADDING: .02}, _createElement: function () {
            try {
                return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function (e) {
                    return document.createElement("<lvml:" + e + ' class="lvml">')
                }
            } catch (e) {
                return function (e) {
                    return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        }(), _initPath: function () {
            var e = this._container = this._createElement("shape");
            n.DomUtil.addClass(e, "leaflet-vml-shape"), this.options.clickable && n.DomUtil.addClass(e, "leaflet-clickable"), e.coordsize = "1 1", this._path = this._createElement("path"), e.appendChild(this._path), this._map._pathRoot.appendChild(e)
        }, _initStyle: function () {
            this._updateStyle()
        }, _updateStyle: function () {
            var e = this._stroke, t = this._fill, n = this.options, r = this._container;
            r.stroked = n.stroke, r.filled = n.fill, n.stroke ? (e || (e = this._stroke = this._createElement("stroke"), e.endcap = "round", r.appendChild(e)), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = n.dashArray.replace(/ *, */g, " ") : e.dashStyle = "") : e && (r.removeChild(e), this._stroke = null), n.fill ? (t || (t = this._fill = this._createElement("fill"), r.appendChild(t)), t.color = n.fillColor || n.color, t.opacity = n.fillOpacity) : t && (r.removeChild(t), this._fill = null)
        }, _updatePath: function () {
            var e = this._container.style;
            e.display = "none", this._path.v = this.getPathString() + " ", e.display = ""
        }
    }), n.Map.include(n.Browser.svg || !n.Browser.vml ? {} : {
        _initPathRoot: function () {
            if (this._pathRoot) return;
            var e = this._pathRoot = document.createElement("div");
            e.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(e), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
        }
    }), n.Browser.canvas = function () {
        return !!document.createElement("canvas").getContext
    }(), n.Path = n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? n.Path : n.Path.extend({
        statics: {CANVAS: !0, SVG: !1}, redraw: function () {
            return this._map && (this.projectLatlngs(), this._requestUpdate()), this
        }, setStyle: function (e) {
            return n.Util.setOptions(this, e), this._map && (this._updateStyle(), this._requestUpdate()), this
        }, onRemove: function (e) {
            e.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this._requestUpdate(), this._map = null
        }, _requestUpdate: function () {
            this._map && (n.Util.cancelAnimFrame(this._fireMapMoveEnd), this._updateRequest = n.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
        }, _fireMapMoveEnd: function () {
            this.fire("moveend")
        }, _initElements: function () {
            this._map._initPathRoot(), this._ctx = this._map._canvasCtx
        }, _updateStyle: function () {
            var e = this.options;
            e.stroke && (this._ctx.lineWidth = e.weight, this._ctx.strokeStyle = e.color), e.fill && (this._ctx.fillStyle = e.fillColor || e.color)
        }, _drawPath: function () {
            var e, t, r, i, s, o;
            this._ctx.beginPath();
            for (e = 0, r = this._parts.length; e < r; e++) {
                for (t = 0, i = this._parts[e].length; t < i; t++) s = this._parts[e][t], o = (t === 0 ? "move" : "line") + "To", this._ctx[o](s.x, s.y);
                this instanceof n.Polygon && this._ctx.closePath()
            }
        }, _checkIfEmpty: function () {
            return !this._parts.length
        }, _updatePath: function () {
            if (this._checkIfEmpty()) return;
            var e = this._ctx, t = this.options;
            this._drawPath(), e.save(), this._updateStyle(), t.fill && (t.fillOpacity < 1 && (e.globalAlpha = t.fillOpacity), e.fill()), t.stroke && (t.opacity < 1 && (e.globalAlpha = t.opacity), e.stroke()), e.restore()
        }, _initEvents: function () {
            this.options.clickable && this._map.on("click", this._onClick, this)
        }, _onClick: function (e) {
            this._containsPoint(e.layerPoint) && this.fire("click", e)
        }
    }), n.Map.include(n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? {} : {
        _initPathRoot: function () {
            var e = this._pathRoot, t;
            e || (e = this._pathRoot = document.createElement("canvas"), e.style.position = "absolute", t = this._canvasCtx = e.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(e), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
        }, _updateCanvasViewport: function () {
            if (this._pathZooming) return;
            this._updatePathViewport();
            var e = this._pathViewport, t = e.min, r = e.max.subtract(t), i = this._pathRoot;
            n.DomUtil.setPosition(i, t), i.width = r.x, i.height = r.y, i.getContext("2d").translate(-t.x, -t.y)
        }
    }), n.LineUtil = {
        simplify: function (e, t) {
            if (!t || !e.length) return e.slice();
            var n = t * t;
            return e = this._reducePoints(e, n), e = this._simplifyDP(e, n), e
        }, pointToSegmentDistance: function (e, t, n) {
            return Math.sqrt(this._sqClosestPointOnSegment(e, t, n, !0))
        }, closestPointOnSegment: function (e, t, n) {
            return this._sqClosestPointOnSegment(e, t, n)
        }, _simplifyDP: function (e, n) {
            var r = e.length, i = typeof Uint8Array != t + "" ? Uint8Array : Array, s = new i(r);
            s[0] = s[r - 1] = 1, this._simplifyDPStep(e, s, n, 0, r - 1);
            var o, u = [];
            for (o = 0; o < r; o++) s[o] && u.push(e[o]);
            return u
        }, _simplifyDPStep: function (e, t, n, r, i) {
            var s = 0, o, u, a;
            for (u = r + 1; u <= i - 1; u++) a = this._sqClosestPointOnSegment(e[u], e[r], e[i], !0), a > s && (o = u, s = a);
            s > n && (t[o] = 1, this._simplifyDPStep(e, t, n, r, o), this._simplifyDPStep(e, t, n, o, i))
        }, _reducePoints: function (e, t) {
            var n = [e[0]];
            for (var r = 1, i = 0, s = e.length; r < s; r++) this._sqDist(e[r], e[i]) > t && (n.push(e[r]), i = r);
            return i < s - 1 && n.push(e[s - 1]), n
        }, clipSegment: function (e, t, n, r) {
            var i = n.min, s = n.max, o = r ? this._lastCode : this._getBitCode(e, n), u = this._getBitCode(t, n);
            this._lastCode = u;
            for (; ;) {
                if (!(o | u)) return [e, t];
                if (o & u) return !1;
                var a = o || u, f = this._getEdgeIntersection(e, t, a, n), l = this._getBitCode(f, n);
                a === o ? (e = f, o = l) : (t = f, u = l)
            }
        }, _getEdgeIntersection: function (e, t, r, i) {
            var s = t.x - e.x, o = t.y - e.y, u = i.min, a = i.max;
            if (r & 8) return new n.Point(e.x + s * (a.y - e.y) / o, a.y);
            if (r & 4) return new n.Point(e.x + s * (u.y - e.y) / o, u.y);
            if (r & 2) return new n.Point(a.x, e.y + o * (a.x - e.x) / s);
            if (r & 1) return new n.Point(u.x, e.y + o * (u.x - e.x) / s)
        }, _getBitCode: function (e, t) {
            var n = 0;
            return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n
        }, _sqDist: function (e, t) {
            var n = t.x - e.x, r = t.y - e.y;
            return n * n + r * r
        }, _sqClosestPointOnSegment: function (e, t, r, i) {
            var s = t.x, o = t.y, u = r.x - s, a = r.y - o, f = u * u + a * a, l;
            return f > 0 && (l = ((e.x - s) * u + (e.y - o) * a) / f, l > 1 ? (s = r.x, o = r.y) : l > 0 && (s += u * l, o += a * l)), u = e.x - s, a = e.y - o, i ? u * u + a * a : new n.Point(s, o)
        }
    }, n.Polyline = n.Path.extend({
        initialize: function (e, t) {
            n.Path.prototype.initialize.call(this, t), this._latlngs = this._convertLatLngs(e), n.Handler.PolyEdit && (this.editing = new n.Handler.PolyEdit(this), this.options.editable && this.editing.enable())
        }, options: {smoothFactor: 1, noClip: !1}, projectLatlngs: function () {
            this._originalPoints = [];
            for (var e = 0, t = this._latlngs.length; e < t; e++) this._originalPoints[e] = this._map.latLngToLayerPoint(this._latlngs[e])
        }, getPathString: function () {
            for (var e = 0, t = this._parts.length, n = ""; e < t; e++) n += this._getPathPartStr(this._parts[e]);
            return n
        }, getLatLngs: function () {
            return this._latlngs
        }, setLatLngs: function (e) {
            return this._latlngs = this._convertLatLngs(e), this.redraw()
        }, addLatLng: function (e) {
            return this._latlngs.push(n.latLng(e)), this.redraw()
        }, spliceLatLngs: function (e, t) {
            var n = [].splice.apply(this._latlngs, arguments);
            return this._convertLatLngs(this._latlngs), this.redraw(), n
        }, closestLayerPoint: function (e) {
            var t = Infinity, r = this._parts, i, s, o = null;
            for (var u = 0, a = r.length; u < a; u++) {
                var f = r[u];
                for (var l = 1, c = f.length; l < c; l++) {
                    i = f[l - 1], s = f[l];
                    var h = n.LineUtil._sqClosestPointOnSegment(e, i, s, !0);
                    h < t && (t = h, o = n.LineUtil._sqClosestPointOnSegment(e, i, s))
                }
            }
            return o && (o.distance = Math.sqrt(t)), o
        }, getBounds: function () {
            var e = new n.LatLngBounds, t = this.getLatLngs();
            for (var r = 0, i = t.length; r < i; r++) e.extend(t[r]);
            return e
        }, onAdd: function (e) {
            n.Path.prototype.onAdd.call(this, e), this.editing && this.editing.enabled() && this.editing.addHooks()
        }, onRemove: function (e) {
            this.editing && this.editing.enabled() && this.editing.removeHooks(), n.Path.prototype.onRemove.call(this, e)
        }, _convertLatLngs: function (e) {
            var t, r;
            for (t = 0, r = e.length; t < r; t++) {
                if (e[t] instanceof Array && typeof e[t][0] != "number") return;
                e[t] = n.latLng(e[t])
            }
            return e
        }, _initEvents: function () {
            n.Path.prototype._initEvents.call(this)
        }, _getPathPartStr: function (e) {
            var t = n.Path.VML;
            for (var r = 0, i = e.length, s = "", o; r < i; r++) o = e[r], t && o._round(), s += (r ? "L" : "M") + o.x + " " + o.y;
            return s
        }, _clipPoints: function () {
            var e = this._originalPoints, t = e.length, r, i, s;
            if (this.options.noClip) {
                this._parts = [e];
                return
            }
            this._parts = [];
            var o = this._parts, u = this._map._pathViewport, a = n.LineUtil;
            for (r = 0, i = 0; r < t - 1; r++) {
                s = a.clipSegment(e[r], e[r + 1], u, r);
                if (!s) continue;
                o[i] = o[i] || [], o[i].push(s[0]);
                if (s[1] !== e[r + 1] || r === t - 2) o[i].push(s[1]), i++
            }
        }, _simplifyPoints: function () {
            var e = this._parts, t = n.LineUtil;
            for (var r = 0, i = e.length; r < i; r++) e[r] = t.simplify(e[r], this.options.smoothFactor)
        }, _updatePath: function () {
            if (!this._map) return;
            this._clipPoints(), this._simplifyPoints(), n.Path.prototype._updatePath.call(this)
        }
    }), n.polyline = function (e, t) {
        return new n.Polyline(e, t)
    }, n.PolyUtil = {}, n.PolyUtil.clipPolygon = function (e, t) {
        var r = t.min, i = t.max, s, o = [1, 4, 2, 8], u, a, f, l, c, h, p, d, v = n.LineUtil;
        for (u = 0, h = e.length; u < h; u++) e[u]._code = v._getBitCode(e[u], t);
        for (f = 0; f < 4; f++) {
            p = o[f], s = [];
            for (u = 0, h = e.length, a = h - 1; u < h; a = u++) l = e[u], c = e[a], l._code & p ? c._code & p || (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)) : (c._code & p && (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)), s.push(l));
            e = s
        }
        return e
    }, n.Polygon = n.Polyline.extend({
        options: {fill: !0}, initialize: function (e, t) {
            n.Polyline.prototype.initialize.call(this, e, t), e && e[0] instanceof Array && typeof e[0][0] != "number" && (this._latlngs = this._convertLatLngs(e[0]), this._holes = e.slice(1))
        }, projectLatlngs: function () {
            n.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [];
            if (!this._holes) return;
            for (var e = 0, t = this._holes.length, r; e < t; e++) {
                this._holePoints[e] = [];
                for (var i = 0, s = this._holes[e].length; i < s; i++) this._holePoints[e][i] = this._map.latLngToLayerPoint(this._holes[e][i])
            }
        }, _clipPoints: function () {
            var e = this._originalPoints, t = [];
            this._parts = [e].concat(this._holePoints);
            if (this.options.noClip) return;
            for (var r = 0, i = this._parts.length; r < i; r++) {
                var s = n.PolyUtil.clipPolygon(this._parts[r], this._map._pathViewport);
                if (!s.length) continue;
                t.push(s)
            }
            this._parts = t
        }, _getPathPartStr: function (e) {
            var t = n.Polyline.prototype._getPathPartStr.call(this, e);
            return t + (n.Browser.svg ? "z" : "x")
        }
    }), n.polygon = function (e, t) {
        return new n.Polygon(e, t)
    }, function () {
        function e(e) {
            return n.FeatureGroup.extend({
                initialize: function (e, t) {
                    this._layers = {}, this._options = t, this.setLatLngs(e)
                }, setLatLngs: function (t) {
                    var n = 0, r = t.length;
                    this.eachLayer(function (e) {
                        n < r ? e.setLatLngs(t[n++]) : this.removeLayer(e)
                    }, this);
                    while (n < r) this.addLayer(new e(t[n++], this._options));
                    return this
                }
            })
        }

        n.MultiPolyline = e(n.Polyline), n.MultiPolygon = e(n.Polygon), n.multiPolyline = function (e, t) {
            return new n.MultiPolyline(e, t)
        }, n.multiPolygon = function (e, t) {
            return new n.MultiPolygon(e, t)
        }
    }(), n.Rectangle = n.Polygon.extend({
        initialize: function (e, t) {
            n.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(e), t)
        }, setBounds: function (e) {
            this.setLatLngs(this._boundsToLatLngs(e))
        }, _boundsToLatLngs: function (e) {
            return e = n.latLngBounds(e), [e.getSouthWest(), e.getNorthWest(), e.getNorthEast(), e.getSouthEast(), e.getSouthWest()]
        }
    }), n.rectangle = function (e, t) {
        return new n.Rectangle(e, t)
    }, n.Circle = n.Path.extend({
        initialize: function (e, t, r) {
            n.Path.prototype.initialize.call(this, r), this._latlng = n.latLng(e), this._mRadius = t
        }, options: {fill: !0}, setLatLng: function (e) {
            return this._latlng = n.latLng(e), this.redraw()
        }, setRadius: function (e) {
            return this._mRadius = e, this.redraw()
        }, projectLatlngs: function () {
            var e = this._getLngRadius(), t = new n.LatLng(this._latlng.lat, this._latlng.lng - e, !0),
                r = this._map.latLngToLayerPoint(t);
            this._point = this._map.latLngToLayerPoint(this._latlng), this._radius = Math.max(Math.round(this._point.x - r.x), 1)
        }, getBounds: function () {
            var e = this._map, t = this._radius * Math.cos(Math.PI / 4), r = e.project(this._latlng),
                i = new n.Point(r.x - t, r.y + t), s = new n.Point(r.x + t, r.y - t), o = e.unproject(i),
                u = e.unproject(s);
            return new n.LatLngBounds(o, u)
        }, getLatLng: function () {
            return this._latlng
        }, getPathString: function () {
            var e = this._point, t = this._radius;
            return this._checkIfEmpty() ? "" : n.Browser.svg ? "M" + e.x + "," + (e.y - t) + "A" + t + "," + t + ",0,1,1," + (e.x - .1) + "," + (e.y - t) + " z" : (e._round(), t = Math.round(t), "AL " + e.x + "," + e.y + " " + t + "," + t + " 0," + 23592600)
        }, getRadius: function () {
            return this._mRadius
        }, _getLngRadius: function () {
            var e = 40075017, t = e * Math.cos(n.LatLng.DEG_TO_RAD * this._latlng.lat);
            return this._mRadius / t * 360
        }, _checkIfEmpty: function () {
            if (!this._map) return !1;
            var e = this._map._pathViewport, t = this._radius, n = this._point;
            return n.x - t > e.max.x || n.y - t > e.max.y || n.x + t < e.min.x || n.y + t < e.min.y
        }
    }), n.circle = function (e, t, r) {
        return new n.Circle(e, t, r)
    }, n.CircleMarker = n.Circle.extend({
        options: {radius: 10, weight: 2}, initialize: function (e, t) {
            n.Circle.prototype.initialize.call(this, e, null, t), this._radius = this.options.radius
        }, projectLatlngs: function () {
            this._point = this._map.latLngToLayerPoint(this._latlng)
        }, setRadius: function (e) {
            return this._radius = e, this.redraw()
        }
    }), n.circleMarker = function (e, t) {
        return new n.CircleMarker(e, t)
    }, n.Polyline.include(n.Path.CANVAS ? {
        _containsPoint: function (e, t) {
            var r, i, s, o, u, a, f, l = this.options.weight / 2;
            n.Browser.touch && (l += 10);
            for (r = 0, o = this._parts.length; r < o; r++) {
                f = this._parts[r];
                for (i = 0, u = f.length, s = u - 1; i < u; s = i++) {
                    if (!t && i === 0) continue;
                    a = n.LineUtil.pointToSegmentDistance(e, f[s], f[i]);
                    if (a <= l) return !0
                }
            }
            return !1
        }
    } : {}), n.Polygon.include(n.Path.CANVAS ? {
        _containsPoint: function (e) {
            var t = !1, r, i, s, o, u, a, f, l;
            if (n.Polyline.prototype._containsPoint.call(this, e, !0)) return !0;
            for (o = 0, f = this._parts.length; o < f; o++) {
                r = this._parts[o];
                for (u = 0, l = r.length, a = l - 1; u < l; a = u++) i = r[u], s = r[a], i.y > e.y != s.y > e.y && e.x < (s.x - i.x) * (e.y - i.y) / (s.y - i.y) + i.x && (t = !t)
            }
            return t
        }
    } : {}), n.Circle.include(n.Path.CANVAS ? {
        _drawPath: function () {
            var e = this._point;
            this._ctx.beginPath(), this._ctx.arc(e.x, e.y, this._radius, 0, Math.PI * 2, !1)
        }, _containsPoint: function (e) {
            var t = this._point, n = this.options.stroke ? this.options.weight / 2 : 0;
            return e.distanceTo(t) <= this._radius + n
        }
    } : {}), n.GeoJSON = n.FeatureGroup.extend({
        initialize: function (e, t) {
            n.Util.setOptions(this, t), this._layers = {}, e && this.addData(e)
        }, addData: function (e) {
            var t = e instanceof Array ? e : e.features, r, i;
            if (t) {
                for (r = 0, i = t.length; r < i; r++) this.addData(t[r]);
                return this
            }
            var s = this.options;
            if (s.filter && !s.filter(e)) return;
            var o = n.GeoJSON.geometryToLayer(e, s.pointToLayer);
            return o.feature = e, this.resetStyle(o), s.onEachFeature && s.onEachFeature(e, o), this.addLayer(o)
        }, resetStyle: function (e) {
            var t = this.options.style;
            t && this._setLayerStyle(e, t)
        }, setStyle: function (e) {
            this.eachLayer(function (t) {
                this._setLayerStyle(t, e)
            }, this)
        }, _setLayerStyle: function (e, t) {
            typeof t == "function" && (t = t(e.feature)), e.setStyle && e.setStyle(t)
        }
    }), n.Util.extend(n.GeoJSON, {
        geometryToLayer: function (e, t) {
            var r = e.type === "Feature" ? e.geometry : e, i = r.coordinates, s = [], o, u, a, f, l;
            switch (r.type) {
                case"Point":
                    return o = this.coordsToLatLng(i), t ? t(e, o) : new n.Marker(o);
                case"MultiPoint":
                    for (a = 0, f = i.length; a < f; a++) o = this.coordsToLatLng(i[a]), l = t ? t(e, o) : new n.Marker(o), s.push(l);
                    return new n.FeatureGroup(s);
                case"LineString":
                    return u = this.coordsToLatLngs(i), new n.Polyline(u);
                case"Polygon":
                    return u = this.coordsToLatLngs(i, 1), new n.Polygon(u);
                case"MultiLineString":
                    return u = this.coordsToLatLngs(i, 1), new n.MultiPolyline(u);
                case"MultiPolygon":
                    return u = this.coordsToLatLngs(i, 2), new n.MultiPolygon(u);
                case"GeometryCollection":
                    for (a = 0, f = r.geometries.length; a < f; a++) l = this.geometryToLayer(r.geometries[a], t), s.push(l);
                    return new n.FeatureGroup(s);
                default:
                    throw Error("Invalid GeoJSON object.")
            }
        }, coordsToLatLng: function (e, t) {
            var r = parseFloat(e[t ? 0 : 1]), i = parseFloat(e[t ? 1 : 0]);
            return new n.LatLng(r, i, !0)
        }, coordsToLatLngs: function (e, t, n) {
            var r, i = [], s, o;
            for (s = 0, o = e.length; s < o; s++) r = t ? this.coordsToLatLngs(e[s], t - 1, n) : this.coordsToLatLng(e[s], n), i.push(r);
            return i
        }
    }), n.geoJson = function (e, t) {
        return new n.GeoJSON(e, t)
    }, n.DomEvent = {
        addListener: function (e, t, r, i) {
            var s = n.Util.stamp(r), o = "_leaflet_" + t + s, u, a, f;
            return e[o] ? this : (u = function (t) {
                return r.call(i || e, t || n.DomEvent._getEvent())
            }, n.Browser.touch && t === "dblclick" && this.addDoubleTapListener ? this.addDoubleTapListener(e, u, s) : ("addEventListener" in e ? t === "mousewheel" ? (e.addEventListener("DOMMouseScroll", u, !1), e.addEventListener(t, u, !1)) : t === "mouseenter" || t === "mouseleave" ? (a = u, f = t === "mouseenter" ? "mouseover" : "mouseout", u = function (t) {
                if (!n.DomEvent._checkMouse(e, t)) return;
                return a(t)
            }, e.addEventListener(f, u, !1)) : e.addEventListener(t, u, !1) : "attachEvent" in e && e.attachEvent("on" + t, u), e[o] = u, this))
        }, removeListener: function (e, t, r) {
            var i = n.Util.stamp(r), s = "_leaflet_" + t + i, o = e[s];
            if (!o) return;
            return n.Browser.touch && t === "dblclick" && this.removeDoubleTapListener ? this.removeDoubleTapListener(e, i) : "removeEventListener" in e ? t === "mousewheel" ? (e.removeEventListener("DOMMouseScroll", o, !1), e.removeEventListener(t, o, !1)) : t === "mouseenter" || t === "mouseleave" ? e.removeEventListener(t === "mouseenter" ? "mouseover" : "mouseout", o, !1) : e.removeEventListener(t, o, !1) : "detachEvent" in e && e.detachEvent("on" + t, o), e[s] = null, this
        }, stopPropagation: function (e) {
            return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, this
        }, disableClickPropagation: function (e) {
            var t = n.DomEvent.stopPropagation;
            return n.DomEvent.addListener(e, n.Draggable.START, t).addListener(e, "click", t).addListener(e, "dblclick", t)
        }, preventDefault: function (e) {
            return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this
        }, stop: function (e) {
            return n.DomEvent.preventDefault(e).stopPropagation(e)
        }, getMousePosition: function (e, t) {
            var r = document.body, i = document.documentElement,
                s = e.pageX ? e.pageX : e.clientX + r.scrollLeft + i.scrollLeft,
                o = e.pageY ? e.pageY : e.clientY + r.scrollTop + i.scrollTop, u = new n.Point(s, o);
            return t ? u._subtract(n.DomUtil.getViewportOffset(t)) : u
        }, getWheelDelta: function (e) {
            var t = 0;
            return e.wheelDelta && (t = e.wheelDelta / 120), e.detail && (t = -e.detail / 3), t
        }, _checkMouse: function (e, t) {
            var n = t.relatedTarget;
            if (!n) return !0;
            try {
                while (n && n !== e) n = n.parentNode
            } catch (r) {
                return !1
            }
            return n !== e
        }, _getEvent: function () {
            var t = e.event;
            if (!t) {
                var n = arguments.callee.caller;
                while (n) {
                    t = n.arguments[0];
                    if (t && e.Event === t.constructor) break;
                    n = n.caller
                }
            }
            return t
        }
    }, n.DomEvent.on = n.DomEvent.addListener, n.DomEvent.off = n.DomEvent.removeListener, n.Draggable = n.Class.extend({
        includes: n.Mixin.Events,
        statics: {
            START: n.Browser.touch ? "touchstart" : "mousedown",
            END: n.Browser.touch ? "touchend" : "mouseup",
            MOVE: n.Browser.touch ? "touchmove" : "mousemove",
            TAP_TOLERANCE: 15
        },
        initialize: function (e, t) {
            this._element = e, this._dragStartTarget = t || e
        },
        enable: function () {
            if (this._enabled) return;
            n.DomEvent.on(this._dragStartTarget, n.Draggable.START, this._onDown, this), this._enabled = !0
        },
        disable: function () {
            if (!this._enabled) return;
            n.DomEvent.off(this._dragStartTarget, n.Draggable.START, this._onDown), this._enabled = !1, this._moved = !1
        },
        _onDown: function (e) {
            if (!n.Browser.touch && e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) return;
            this._simulateClick = !0;
            if (e.touches && e.touches.length > 1) {
                this._simulateClick = !1;
                return
            }
            var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, r = t.target;
            n.DomEvent.preventDefault(e), n.Browser.touch && r.tagName.toLowerCase() === "a" && n.DomUtil.addClass(r, "leaflet-active"), this._moved = !1;
            if (this._moving) return;
            this._startPos = this._newPos = n.DomUtil.getPosition(this._element), this._startPoint = new n.Point(t.clientX, t.clientY), n.DomEvent.on(document, n.Draggable.MOVE, this._onMove, this), n.DomEvent.on(document, n.Draggable.END, this._onUp, this)
        },
        _onMove: function (e) {
            if (e.touches && e.touches.length > 1) return;
            var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, r = new n.Point(t.clientX, t.clientY),
                i = r.subtract(this._startPoint);
            if (!i.x && !i.y) return;
            n.DomEvent.preventDefault(e), this._moved || (this.fire("dragstart"), this._moved = !0, n.Browser.touch || (n.DomUtil.disableTextSelection(), this._setMovingCursor())), this._newPos = this._startPos.add(i), this._moving = !0, n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)
        },
        _updatePosition: function () {
            this.fire("predrag"), n.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
        },
        _onUp: function (e) {
            if (this._simulateClick && e.changedTouches) {
                var t = e.changedTouches[0], r = t.target,
                    i = this._newPos && this._newPos.distanceTo(this._startPos) || 0;
                r.tagName.toLowerCase() === "a" && n.DomUtil.removeClass(r, "leaflet-active"), i < n.Draggable.TAP_TOLERANCE && this._simulateEvent("click", t)
            }
            n.Browser.touch || (n.DomUtil.enableTextSelection(), this._restoreCursor()), n.DomEvent.off(document, n.Draggable.MOVE, this._onMove), n.DomEvent.off(document, n.Draggable.END, this._onUp), this._moved && (n.Util.cancelAnimFrame(this._animRequest), this.fire("dragend")), this._moving = !1
        },
        _setMovingCursor: function () {
            n.DomUtil.addClass(document.body, "leaflet-dragging")
        },
        _restoreCursor: function () {
            n.DomUtil.removeClass(document.body, "leaflet-dragging")
        },
        _simulateEvent: function (t, n) {
            var r = document.createEvent("MouseEvents");
            r.initMouseEvent(t, !0, !0, e, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(r)
        }
    }), n.Handler = n.Class.extend({
        initialize: function (e) {
            this._map = e
        }, enable: function () {
            if (this._enabled) return;
            this._enabled = !0, this.addHooks()
        }, disable: function () {
            if (!this._enabled) return;
            this._enabled = !1, this.removeHooks()
        }, enabled: function () {
            return !!this._enabled
        }
    }), n.Map.mergeOptions({
        dragging: !0,
        inertia: !n.Browser.android23,
        inertiaDeceleration: 3e3,
        inertiaMaxSpeed: 1500,
        inertiaThreshold: n.Browser.touch ? 32 : 14,
        worldCopyJump: !0
    }), n.Map.Drag = n.Handler.extend({
        addHooks: function () {
            if (!this._draggable) {
                this._draggable = new n.Draggable(this._map._mapPane, this._map._container), this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this);
                var e = this._map.options;
                e.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), this._map.on("viewreset", this._onViewReset, this))
            }
            this._draggable.enable()
        }, removeHooks: function () {
            this._draggable.disable()
        }, moved: function () {
            return this._draggable && this._draggable._moved
        }, _onDragStart: function () {
            var e = this._map;
            e.fire("movestart").fire("dragstart"), e._panTransition && e._panTransition._onTransitionEnd(!0), e.options.inertia && (this._positions = [], this._times = [])
        }, _onDrag: function () {
            if (this._map.options.inertia) {
                var e = this._lastTime = +(new Date), t = this._lastPos = this._draggable._newPos;
                this._positions.push(t), this._times.push(e), e - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move").fire("drag")
        }, _onViewReset: function () {
            var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint(new n.LatLng(0, 0));
            this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.project(new n.LatLng(0, 180)).x
        }, _onPreDrag: function () {
            var e = this._map, t = this._worldWidth, n = Math.round(t / 2), r = this._initialWorldOffset,
                i = this._draggable._newPos.x, s = (i - n + r) % t + n - r, o = (i + n + r) % t - n - r,
                u = Math.abs(s + r) < Math.abs(o + r) ? s : o;
            this._draggable._newPos.x = u
        }, _onDragEnd: function () {
            var e = this._map, r = e.options, i = +(new Date) - this._lastTime,
                s = !r.inertia || i > r.inertiaThreshold || this._positions[0] === t;
            if (s) e.fire("moveend"); else {
                var o = this._lastPos.subtract(this._positions[0]), u = (this._lastTime + i - this._times[0]) / 1e3,
                    a = o.multiplyBy(.58 / u), f = a.distanceTo(new n.Point(0, 0)), l = Math.min(r.inertiaMaxSpeed, f),
                    c = a.multiplyBy(l / f), h = l / r.inertiaDeceleration, p = c.multiplyBy(-h / 2).round(),
                    d = {duration: h, easing: "ease-out"};
                n.Util.requestAnimFrame(n.Util.bind(function () {
                    this._map.panBy(p, d)
                }, this))
            }
            e.fire("dragend"), r.maxBounds && n.Util.requestAnimFrame(this._panInsideMaxBounds, e, !0, e._container)
        }, _panInsideMaxBounds: function () {
            this.panInsideBounds(this.options.maxBounds)
        }
    }), n.Map.addInitHook("addHandler", "dragging", n.Map.Drag), n.Map.mergeOptions({doubleClickZoom: !0}), n.Map.DoubleClickZoom = n.Handler.extend({
        addHooks: function () {
            this._map.on("dblclick", this._onDoubleClick)
        }, removeHooks: function () {
            this._map.off("dblclick", this._onDoubleClick)
        }, _onDoubleClick: function (e) {
            this.setView(e.latlng, this._zoom + 1)
        }
    }), n.Map.addInitHook("addHandler", "doubleClickZoom", n.Map.DoubleClickZoom),n.Map.mergeOptions({scrollWheelZoom: !n.Browser.touch}),n.Map.ScrollWheelZoom = n.Handler.extend({
        addHooks: function () {
            n.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
        }, removeHooks: function () {
            n.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll)
        }, _onWheelScroll: function (e) {
            var t = n.DomEvent.getWheelDelta(e);
            this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), clearTimeout(this._timer), this._timer = setTimeout(n.Util.bind(this._performZoom, this), 40), n.DomEvent.preventDefault(e)
        }, _performZoom: function () {
            var e = this._map, t = Math.round(this._delta), n = e.getZoom();
            t = Math.max(Math.min(t, 4), -4), t = e._limitZoom(n + t) - n, this._delta = 0;
            if (!t) return;
            var r = n + t, i = this._getCenterForScrollWheelZoom(this._lastMousePos, r);
            e.setView(i, r)
        }, _getCenterForScrollWheelZoom: function (e, t) {
            var n = this._map, r = n.getZoomScale(t), i = n.getSize().divideBy(2),
                s = e.subtract(i).multiplyBy(1 - 1 / r), o = n._getTopLeftPoint().add(i).add(s);
            return n.unproject(o)
        }
    }),n.Map.addInitHook("addHandler", "scrollWheelZoom", n.Map.ScrollWheelZoom),n.Util.extend(n.DomEvent, {
        addDoubleTapListener: function (e, t, n) {
            function l(e) {
                if (e.touches.length !== 1) return;
                var t = Date.now(), n = t - (r || t);
                o = e.touches[0], i = n > 0 && n <= s, r = t
            }

            function c(e) {
                i && (o.type = "dblclick", t(o), r = null)
            }

            var r, i = !1, s = 250, o, u = "_leaflet_", a = "touchstart", f = "touchend";
            return e[u + a + n] = l, e[u + f + n] = c, e.addEventListener(a, l, !1), e.addEventListener(f, c, !1), this
        }, removeDoubleTapListener: function (e, t) {
            var n = "_leaflet_";
            return e.removeEventListener(e, e[n + "touchstart" + t], !1), e.removeEventListener(e, e[n + "touchend" + t], !1), this
        }
    }),n.Map.mergeOptions({touchZoom: n.Browser.touch && !n.Browser.android23}),n.Map.TouchZoom = n.Handler.extend({
        addHooks: function () {
            n.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        }, removeHooks: function () {
            n.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        }, _onTouchStart: function (e) {
            var t = this._map;
            if (!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming) return;
            var r = t.mouseEventToLayerPoint(e.touches[0]), i = t.mouseEventToLayerPoint(e.touches[1]),
                s = t._getCenterLayerPoint();
            this._startCenter = r.add(i).divideBy(2, !0), this._startDist = r.distanceTo(i), this._moved = !1, this._zooming = !0, this._centerOffset = s.subtract(this._startCenter), n.DomEvent.on(document, "touchmove", this._onTouchMove, this).on(document, "touchend", this._onTouchEnd, this), n.DomEvent.preventDefault(e)
        }, _onTouchMove: function (e) {
            if (!e.touches || e.touches.length !== 2) return;
            var t = this._map, r = t.mouseEventToLayerPoint(e.touches[0]), i = t.mouseEventToLayerPoint(e.touches[1]);
            this._scale = r.distanceTo(i) / this._startDist, this._delta = r.add(i).divideBy(2, !0).subtract(this._startCenter);
            if (this._scale === 1) return;
            this._moved || (n.DomUtil.addClass(t._mapPane, "leaflet-zoom-anim leaflet-touching"), t.fire("movestart").fire("zoomstart")._prepareTileBg(), this._moved = !0), n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), n.DomEvent.preventDefault(e)
        }, _updateOnMove: function () {
            var e = this._map, t = this._getScaleOrigin(), r = e.layerPointToLatLng(t);
            e.fire("zoomanim", {
                center: r,
                zoom: e.getScaleZoom(this._scale)
            }), e._tileBg.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(this._delta) + " " + n.DomUtil.getScaleString(this._scale, this._startCenter)
        }, _onTouchEnd: function (e) {
            if (!this._moved || !this._zooming) return;
            var t = this._map;
            this._zooming = !1, n.DomUtil.removeClass(t._mapPane, "leaflet-touching"), n.DomEvent.off(document, "touchmove", this._onTouchMove).off(document, "touchend", this._onTouchEnd);
            var r = this._getScaleOrigin(), i = t.layerPointToLatLng(r), s = t.getZoom(),
                o = t.getScaleZoom(this._scale) - s, u = o > 0 ? Math.ceil(o) : Math.floor(o), a = t._limitZoom(s + u);
            t.fire("zoomanim", {center: i, zoom: a}), t._runAnimation(i, a, t.getZoomScale(a) / this._scale, r, !0)
        }, _getScaleOrigin: function () {
            var e = this._centerOffset.subtract(this._delta).divideBy(this._scale);
            return this._startCenter.add(e)
        }
    }),n.Map.addInitHook("addHandler", "touchZoom", n.Map.TouchZoom),n.Map.mergeOptions({boxZoom: !0}),n.Map.BoxZoom = n.Handler.extend({
        initialize: function (e) {
            this._map = e, this._container = e._container, this._pane = e._panes.overlayPane
        }, addHooks: function () {
            n.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        }, removeHooks: function () {
            n.DomEvent.off(this._container, "mousedown", this._onMouseDown)
        }, _onMouseDown: function (e) {
            if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
            n.DomUtil.disableTextSelection(), this._startLayerPoint = this._map.mouseEventToLayerPoint(e), this._box = n.DomUtil.create("div", "leaflet-zoom-box", this._pane), n.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", n.DomEvent.on(document, "mousemove", this._onMouseMove, this).on(document, "mouseup", this._onMouseUp, this).preventDefault(e), this._map.fire("boxzoomstart")
        }, _onMouseMove: function (e) {
            var t = this._startLayerPoint, r = this._box, i = this._map.mouseEventToLayerPoint(e), s = i.subtract(t),
                o = new n.Point(Math.min(i.x, t.x), Math.min(i.y, t.y));
            n.DomUtil.setPosition(r, o), r.style.width = Math.abs(s.x) - 4 + "px", r.style.height = Math.abs(s.y) - 4 + "px"
        }, _onMouseUp: function (e) {
            this._pane.removeChild(this._box), this._container.style.cursor = "", n.DomUtil.enableTextSelection(), n.DomEvent.off(document, "mousemove", this._onMouseMove).off(document, "mouseup", this._onMouseUp);
            var t = this._map, r = t.mouseEventToLayerPoint(e),
                i = new n.LatLngBounds(t.layerPointToLatLng(this._startLayerPoint), t.layerPointToLatLng(r));
            t.fitBounds(i), t.fire("boxzoomend", {boxZoomBounds: i})
        }
    }),n.Map.addInitHook("addHandler", "boxZoom", n.Map.BoxZoom),n.Map.mergeOptions({
        keyboard: !0,
        keyboardPanOffset: 80,
        keyboardZoomOffset: 1
    }),n.Map.Keyboard = n.Handler.extend({
        keyCodes: {left: [37], right: [39], down: [40], up: [38], zoomIn: [187, 107, 61], zoomOut: [189, 109]},
        initialize: function (e) {
            this._map = e, this._setPanOffset(e.options.keyboardPanOffset), this._setZoomOffset(e.options.keyboardZoomOffset)
        },
        addHooks: function () {
            var e = this._map._container;
            e.tabIndex === -1 && (e.tabIndex = "0"), n.DomEvent.addListener(e, "focus", this._onFocus, this).addListener(e, "blur", this._onBlur, this).addListener(e, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
        },
        removeHooks: function () {
            this._removeHooks();
            var e = this._map._container;
            n.DomEvent.removeListener(e, "focus", this._onFocus, this).removeListener(e, "blur", this._onBlur, this).removeListener(e, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
        },
        _onMouseDown: function () {
            this._focused || this._map._container.focus()
        },
        _onFocus: function () {
            this._focused = !0, this._map.fire("focus")
        },
        _onBlur: function () {
            this._focused = !1, this._map.fire("blur")
        },
        _setPanOffset: function (e) {
            var t = this._panKeys = {}, n = this.keyCodes, r, i;
            for (r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
            for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
            for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
            for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e]
        },
        _setZoomOffset: function (e) {
            var t = this._zoomKeys = {}, n = this.keyCodes, r, i;
            for (r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
            for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e
        },
        _addHooks: function () {
            n.DomEvent.addListener(document, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function () {
            n.DomEvent.removeListener(document, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function (e) {
            var t = e.keyCode;
            if (this._panKeys.hasOwnProperty(t)) this._map.panBy(this._panKeys[t]); else {
                if (!this._zoomKeys.hasOwnProperty(t)) return;
                this._map.setZoom(this._map.getZoom() + this._zoomKeys[t])
            }
            n.DomEvent.stop(e)
        }
    }),n.Map.addInitHook("addHandler", "keyboard", n.Map.Keyboard),n.Handler.MarkerDrag = n.Handler.extend({
        initialize: function (e) {
            this._marker = e
        }, addHooks: function () {
            var e = this._marker._icon;
            this._draggable || (this._draggable = (new n.Draggable(e, e)).on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this)), this._draggable.enable()
        }, removeHooks: function () {
            this._draggable.disable()
        }, moved: function () {
            return this._draggable && this._draggable._moved
        }, _onDragStart: function (e) {
            this._marker.closePopup().fire("movestart").fire("dragstart")
        }, _onDrag: function (e) {
            var t = n.DomUtil.getPosition(this._marker._icon);
            this._marker._shadow && n.DomUtil.setPosition(this._marker._shadow, t), this._marker._latlng = this._marker._map.layerPointToLatLng(t), this._marker.fire("move").fire("drag")
        }, _onDragEnd: function () {
            this._marker.fire("moveend").fire("dragend")
        }
    }),n.Handler.PolyEdit = n.Handler.extend({
        options: {
            icon: new n.DivIcon({
                iconSize: new n.Point(8, 8),
                className: "leaflet-div-icon leaflet-editing-icon"
            })
        }, initialize: function (e, t) {
            this._poly = e, n.Util.setOptions(this, t)
        }, addHooks: function () {
            this._poly._map && (this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup))
        }, removeHooks: function () {
            this._poly._map && (this._poly._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers)
        }, updateMarkers: function () {
            this._markerGroup.clearLayers(), this._initMarkers()
        }, _initMarkers: function () {
            this._markerGroup || (this._markerGroup = new n.LayerGroup), this._markers = [];
            var e = this._poly._latlngs, t, r, i, s;
            for (t = 0, i = e.length; t < i; t++) s = this._createMarker(e[t], t), s.on("click", this._onMarkerClick, this), this._markers.push(s);
            var o, u;
            for (t = 0, r = i - 1; t < i; r = t++) {
                if (t === 0 && !(n.Polygon && this._poly instanceof n.Polygon)) continue;
                o = this._markers[r], u = this._markers[t], this._createMiddleMarker(o, u), this._updatePrevNext(o, u)
            }
        }, _createMarker: function (e, t) {
            var r = new n.Marker(e, {draggable: !0, icon: this.options.icon});
            return r._origLatLng = e, r._index = t, r.on("drag", this._onMarkerDrag, this), r.on("dragend", this._fireEdit, this), this._markerGroup.addLayer(r), r
        }, _fireEdit: function () {
            this._poly.fire("edit")
        }, _onMarkerDrag: function (e) {
            var t = e.target;
            n.Util.extend(t._origLatLng, t._latlng), t._middleLeft && t._middleLeft.setLatLng(this._getMiddleLatLng(t._prev, t)), t._middleRight && t._middleRight.setLatLng(this._getMiddleLatLng(t, t._next)), this._poly.redraw()
        }, _onMarkerClick: function (e) {
            if (this._poly._latlngs.length < 3) return;
            var t = e.target, n = t._index;
            t._prev && t._next && (this._createMiddleMarker(t._prev, t._next), this._updatePrevNext(t._prev, t._next)), this._markerGroup.removeLayer(t), t._middleLeft && this._markerGroup.removeLayer(t._middleLeft), t._middleRight && this._markerGroup.removeLayer(t._middleRight), this._markers.splice(n, 1), this._poly.spliceLatLngs(n, 1), this._updateIndexes(n, -1), this._poly.fire("edit")
        }, _updateIndexes: function (e, t) {
            this._markerGroup.eachLayer(function (n) {
                n._index > e && (n._index += t)
            })
        }, _createMiddleMarker: function (e, t) {
            var n = this._getMiddleLatLng(e, t), r = this._createMarker(n), i, s, o;
            r.setOpacity(.6), e._middleRight = t._middleLeft = r, s = function () {
                var s = t._index;
                r._index = s, r.off("click", i).on("click", this._onMarkerClick, this), n.lat = r.getLatLng().lat, n.lng = r.getLatLng().lng, this._poly.spliceLatLngs(s, 0, n), this._markers.splice(s, 0, r), r.setOpacity(1), this._updateIndexes(s, 1), t._index++, this._updatePrevNext(e, r), this._updatePrevNext(r, t)
            }, o = function () {
                r.off("dragstart", s, this), r.off("dragend", o, this), this._createMiddleMarker(e, r), this._createMiddleMarker(r, t)
            }, i = function () {
                s.call(this), o.call(this), this._poly.fire("edit")
            }, r.on("click", i, this).on("dragstart", s, this).on("dragend", o, this), this._markerGroup.addLayer(r)
        }, _updatePrevNext: function (e, t) {
            e._next = t, t._prev = e
        }, _getMiddleLatLng: function (e, t) {
            var n = this._poly._map, r = n.latLngToLayerPoint(e.getLatLng()), i = n.latLngToLayerPoint(t.getLatLng());
            return n.layerPointToLatLng(r._add(i).divideBy(2))
        }
    }),n.Control = n.Class.extend({
        options: {position: "topright"}, initialize: function (e) {
            n.Util.setOptions(this, e)
        }, getPosition: function () {
            return this.options.position
        }, setPosition: function (e) {
            var t = this._map;
            return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this
        }, addTo: function (e) {
            this._map = e;
            var t = this._container = this.onAdd(e), r = this.getPosition(), i = e._controlCorners[r];
            return n.DomUtil.addClass(t, "leaflet-control"), r.indexOf("bottom") !== -1 ? i.insertBefore(t, i.firstChild) : i.appendChild(t), this
        }, removeFrom: function (e) {
            var t = this.getPosition(), n = e._controlCorners[t];
            return n.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(e), this
        }
    }),n.control = function (e) {
        return new n.Control(e)
    },n.Map.include({
        addControl: function (e) {
            return e.addTo(this), this
        }, removeControl: function (e) {
            return e.removeFrom(this), this
        }, _initControlPos: function () {
            function i(i, s) {
                var o = t + i + " " + t + s;
                e[i + s] = n.DomUtil.create("div", o, r)
            }

            var e = this._controlCorners = {}, t = "leaflet-",
                r = this._controlContainer = n.DomUtil.create("div", t + "control-container", this._container);
            i("top", "left"), i("top", "right"), i("bottom", "left"), i("bottom", "right")
        }
    }),n.Control.Zoom = n.Control.extend({
        options: {position: "topleft"}, onAdd: function (e) {
            var t = "leaflet-control-zoom", r = n.DomUtil.create("div", t);
            return this._createButton("Zoom in", t + "-in", r, e.zoomIn, e), this._createButton("Zoom out", t + "-out", r, e.zoomOut, e), r
        }, _createButton: function (e, t, r, i, s) {
            var o = n.DomUtil.create("a", t, r);
            return o.href = "#", o.title = e, n.DomEvent.on(o, "click", n.DomEvent.stopPropagation).on(o, "click", n.DomEvent.preventDefault).on(o, "click", i, s).on(o, "dblclick", n.DomEvent.stopPropagation), o
        }
    }),n.Map.mergeOptions({zoomControl: !0}),n.Map.addInitHook(function () {
        this.options.zoomControl && (this.zoomControl = new n.Control.Zoom, this.addControl(this.zoomControl))
    }),n.control.zoom = function (e) {
        return new n.Control.Zoom(e)
    },n.Control.Attribution = n.Control.extend({
        options: {position: "bottomright", prefix: 'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>'},
        initialize: function (e) {
            n.Util.setOptions(this, e), this._attributions = {}
        },
        onAdd: function (e) {
            return this._container = n.DomUtil.create("div", "leaflet-control-attribution"), n.DomEvent.disableClickPropagation(this._container), e.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
        },
        onRemove: function (e) {
            e.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
        },
        setPrefix: function (e) {
            return this.options.prefix = e, this._update(), this
        },
        addAttribution: function (e) {
            if (!e) return;
            return this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update(), this
        },
        removeAttribution: function (e) {
            if (!e) return;
            return this._attributions[e]--, this._update(), this
        },
        _update: function () {
            if (!this._map) return;
            var e = [];
            for (var t in this._attributions) this._attributions.hasOwnProperty(t) && this._attributions[t] && e.push(t);
            var n = [];
            this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" &#8212; ")
        },
        _onLayerAdd: function (e) {
            e.layer.getAttribution && this.addAttribution(e.layer.getAttribution())
        },
        _onLayerRemove: function (e) {
            e.layer.getAttribution && this.removeAttribution(e.layer.getAttribution())
        }
    }),n.Map.mergeOptions({attributionControl: !0}),n.Map.addInitHook(function () {
        this.options.attributionControl && (this.attributionControl = (new n.Control.Attribution).addTo(this))
    }),n.control.attribution = function (e) {
        return new n.Control.Attribution(e)
    },n.Control.Scale = n.Control.extend({
        options: {position: "bottomleft", maxWidth: 100, metric: !0, imperial: !0, updateWhenIdle: !1},
        onAdd: function (e) {
            this._map = e;
            var t = "leaflet-control-scale", r = n.DomUtil.create("div", t), i = this.options;
            return this._addScales(i, t, r), e.on(i.updateWhenIdle ? "moveend" : "move", this._update, this), this._update(), r
        },
        onRemove: function (e) {
            e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function (e, t, r) {
            e.metric && (this._mScale = n.DomUtil.create("div", t + "-line", r)), e.imperial && (this._iScale = n.DomUtil.create("div", t + "-line", r))
        },
        _update: function () {
            var e = this._map.getBounds(), t = e.getCenter().lat, n = 6378137 * Math.PI * Math.cos(t * Math.PI / 180),
                r = n * (e.getNorthEast().lng - e.getSouthWest().lng) / 180, i = this._map.getSize(), s = this.options,
                o = 0;
            i.x > 0 && (o = r * (s.maxWidth / i.x)), this._updateScales(s, o)
        },
        _updateScales: function (e, t) {
            e.metric && t && this._updateMetric(t), e.imperial && t && this._updateImperial(t)
        },
        _updateMetric: function (e) {
            var t = this._getRoundNum(e);
            this._mScale.style.width = this._getScaleWidth(t / e) + "px", this._mScale.innerHTML = t < 1e3 ? t + " m" : t / 1e3 + " km"
        },
        _updateImperial: function (e) {
            var t = e * 3.2808399, n = this._iScale, r, i, s;
            t > 5280 ? (r = t / 5280, i = this._getRoundNum(r), n.style.width = this._getScaleWidth(i / r) + "px", n.innerHTML = i + " mi") : (s = this._getRoundNum(t), n.style.width = this._getScaleWidth(s / t) + "px", n.innerHTML = s + " ft")
        },
        _getScaleWidth: function (e) {
            return Math.round(this.options.maxWidth * e) - 10
        },
        _getRoundNum: function (e) {
            var t = Math.pow(10, (Math.floor(e) + "").length - 1), n = e / t;
            return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n
        }
    }),n.control.scale = function (e) {
        return new n.Control.Scale(e)
    },n.Control.Layers = n.Control.extend({
        options: {collapsed: !0, position: "topright", autoZIndex: !0}, initialize: function (e, t, r) {
            n.Util.setOptions(this, r), this._layers = {}, this._lastZIndex = 0;
            for (var i in e) e.hasOwnProperty(i) && this._addLayer(e[i], i);
            for (i in t) t.hasOwnProperty(i) && this._addLayer(t[i], i, !0)
        }, onAdd: function (e) {
            return this._initLayout(), this._update(), this._container
        }, addBaseLayer: function (e, t) {
            return this._addLayer(e, t), this._update(), this
        }, addOverlay: function (e, t) {
            return this._addLayer(e, t, !0), this._update(), this
        }, removeLayer: function (e) {
            var t = n.Util.stamp(e);
            return delete this._layers[t], this._update(), this
        }, _initLayout: function () {
            var e = "leaflet-control-layers", t = this._container = n.DomUtil.create("div", e);
            n.Browser.touch ? n.DomEvent.on(t, "click", n.DomEvent.stopPropagation) : n.DomEvent.disableClickPropagation(t);
            var r = this._form = n.DomUtil.create("form", e + "-list");
            if (this.options.collapsed) {
                n.DomEvent.on(t, "mouseover", this._expand, this).on(t, "mouseout", this._collapse, this);
                var i = this._layersLink = n.DomUtil.create("a", e + "-toggle", t);
                i.href = "#", i.title = "Layers", n.Browser.touch ? n.DomEvent.on(i, "click", n.DomEvent.stopPropagation).on(i, "click", n.DomEvent.preventDefault).on(i, "click", this._expand, this) : n.DomEvent.on(i, "focus", this._expand, this), this._map.on("movestart", this._collapse, this)
            } else this._expand();
            this._baseLayersList = n.DomUtil.create("div", e + "-base", r), this._separator = n.DomUtil.create("div", e + "-separator", r), this._overlaysList = n.DomUtil.create("div", e + "-overlays", r), t.appendChild(r)
        }, _addLayer: function (e, t, r) {
            var i = n.Util.stamp(e);
            this._layers[i] = {
                layer: e,
                name: t,
                overlay: r
            }, this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex))
        }, _update: function () {
            if (!this._container) return;
            this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
            var e = !1, t = !1;
            for (var n in this._layers) if (this._layers.hasOwnProperty(n)) {
                var r = this._layers[n];
                this._addItem(r), t = t || r.overlay, e = e || !r.overlay
            }
            this._separator.style.display = t && e ? "" : "none"
        }, _createRadioElement: function (e, t) {
            var n = '<input type="radio" name="' + e + '"';
            t && (n += ' checked="checked"'), n += "/>";
            var r = document.createElement("div");
            return r.innerHTML = n, r.firstChild
        }, _addItem: function (e) {
            var t = document.createElement("label"), r, i = this._map.hasLayer(e.layer);
            e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.defaultChecked = i) : r = this._createRadioElement("leaflet-base-layers", i), r.layerId = n.Util.stamp(e.layer), n.DomEvent.on(r, "click", this._onInputClick, this);
            var s = document.createTextNode(" " + e.name);
            t.appendChild(r), t.appendChild(s);
            var o = e.overlay ? this._overlaysList : this._baseLayersList;
            o.appendChild(t)
        }, _onInputClick: function () {
            var e, t, n, r = this._form.getElementsByTagName("input"), i = r.length;
            for (e = 0; e < i; e++) t = r[e], n = this._layers[t.layerId], t.checked ? this._map.addLayer(n.layer, !n.overlay) : this._map.removeLayer(n.layer)
        }, _expand: function () {
            n.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
        }, _collapse: function () {
            this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
        }
    }),n.control.layers = function (e, t, r) {
        return new n.Control.Layers(e, t, r)
    },n.Transition = n.Class.extend({
        includes: n.Mixin.Events,
        statics: {
            CUSTOM_PROPS_SETTERS: {position: n.DomUtil.setPosition}, implemented: function () {
                return n.Transition.NATIVE || n.Transition.TIMER
            }
        },
        options: {easing: "ease", duration: .5},
        _setProperty: function (e, t) {
            var r = n.Transition.CUSTOM_PROPS_SETTERS;
            e in r ? r[e](this._el, t) : this._el.style[e] = t
        }
    }),n.Transition = n.Transition.extend({
        statics: function () {
            var e = n.DomUtil.TRANSITION,
                t = e === "webkitTransition" || e === "OTransition" ? e + "End" : "transitionend";
            return {
                NATIVE: !!e,
                TRANSITION: e,
                PROPERTY: e + "Property",
                DURATION: e + "Duration",
                EASING: e + "TimingFunction",
                END: t,
                CUSTOM_PROPS_PROPERTIES: {position: n.Browser.any3d ? n.DomUtil.TRANSFORM : "top, left"}
            }
        }(), options: {fakeStepInterval: 100}, initialize: function (e, t) {
            this._el = e, n.Util.setOptions(this, t), n.DomEvent.on(e, n.Transition.END, this._onTransitionEnd, this), this._onFakeStep = n.Util.bind(this._onFakeStep, this)
        }, run: function (e) {
            var t, r = [], i = n.Transition.CUSTOM_PROPS_PROPERTIES;
            for (t in e) e.hasOwnProperty(t) && (t = i[t] ? i[t] : t, t = this._dasherize(t), r.push(t));
            this._el.style[n.Transition.DURATION] = this.options.duration + "s", this._el.style[n.Transition.EASING] = this.options.easing, this._el.style[n.Transition.PROPERTY] = "all";
            for (t in e) e.hasOwnProperty(t) && this._setProperty(t, e[t]);
            n.Util.falseFn(this._el.offsetWidth), this._inProgress = !0, n.Browser.mobileWebkit && (this.backupEventFire = setTimeout(n.Util.bind(this._onBackupFireEnd, this), this.options.duration * 1.2 * 1e3)), n.Transition.NATIVE ? (clearInterval(this._timer), this._timer = setInterval(this._onFakeStep, this.options.fakeStepInterval)) : this._onTransitionEnd()
        }, _dasherize: function () {
            function t(e) {
                return "-" + e.toLowerCase()
            }

            var e = /([A-Z])/g;
            return function (n) {
                return n.replace(e, t)
            }
        }(), _onFakeStep: function () {
            this.fire("step")
        }, _onTransitionEnd: function (e) {
            this._inProgress && (this._inProgress = !1, clearInterval(this._timer), this._el.style[n.Transition.TRANSITION] = "", clearTimeout(this.backupEventFire), delete this.backupEventFire, this.fire("step"), e && e.type && this.fire("end"))
        }, _onBackupFireEnd: function () {
            var e = document.createEvent("Event");
            e.initEvent(n.Transition.END, !0, !1), this._el.dispatchEvent(e)
        }
    }),n.Transition = n.Transition.NATIVE ? n.Transition : n.Transition.extend({
        statics: {
            getTime: Date.now || function () {
                return +(new Date)
            }, TIMER: !0, EASINGS: {
                linear: function (e) {
                    return e
                }, "ease-out": function (e) {
                    return e * (2 - e)
                }
            }, CUSTOM_PROPS_GETTERS: {position: n.DomUtil.getPosition}, UNIT_RE: /^[\d\.]+(\D*)$/
        }, options: {fps: 50}, initialize: function (e, t) {
            this._el = e, n.Util.extend(this.options, t), this._easing = n.Transition.EASINGS[this.options.easing] || n.Transition.EASINGS["ease-out"], this._step = n.Util.bind(this._step, this), this._interval = Math.round(1e3 / this.options.fps)
        }, run: function (e) {
            this._props = {};
            var t = n.Transition.CUSTOM_PROPS_GETTERS, r = n.Transition.UNIT_RE;
            this.fire("start");
            for (var i in e) if (e.hasOwnProperty(i)) {
                var s = {};
                if (i in t) s.from = t[i](this._el); else {
                    var o = this._el.style[i].match(r);
                    s.from = parseFloat(o[0]), s.unit = o[1]
                }
                s.to = e[i], this._props[i] = s
            }
            clearInterval(this._timer), this._timer = setInterval(this._step, this._interval), this._startTime = n.Transition.getTime()
        }, _step: function () {
            var e = n.Transition.getTime(), t = e - this._startTime, r = this.options.duration * 1e3;
            t < r ? this._runFrame(this._easing(t / r)) : (this._runFrame(1), this._complete())
        }, _runFrame: function (e) {
            var t = n.Transition.CUSTOM_PROPS_SETTERS, r, i, s;
            for (r in this._props) this._props.hasOwnProperty(r) && (i = this._props[r], r in t ? (s = i.to.subtract(i.from).multiplyBy(e).add(i.from), t[r](this._el, s)) : this._el.style[r] = (i.to - i.from) * e + i.from + i.unit);
            this.fire("step")
        }, _complete: function () {
            clearInterval(this._timer), this.fire("end")
        }
    }),n.Map.include(!n.Transition || !n.Transition.implemented() ? {} : {
        setView: function (e, t, n) {
            t = this._limitZoom(t);
            var r = this._zoom !== t;
            if (this._loaded && !n && this._layers) {
                var i = r ? this._zoomToIfClose && this._zoomToIfClose(e, t) : this._panByIfClose(e);
                if (i) return clearTimeout(this._sizeTimer), this
            }
            return this._resetView(e, t), this
        }, panBy: function (e, t) {
            return e = n.point(e), !e.x && !e.y ? this : (this._panTransition || (this._panTransition = new n.Transition(this._mapPane), this._panTransition.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)), n.Util.setOptions(this._panTransition, n.Util.extend({duration: .25}, t)), this.fire("movestart"), n.DomUtil.addClass(this._mapPane, "leaflet-pan-anim"), this._panTransition.run({position: n.DomUtil.getPosition(this._mapPane).subtract(e)}), this)
        }, _onPanTransitionStep: function () {
            this.fire("move")
        }, _onPanTransitionEnd: function () {
            n.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
        }, _panByIfClose: function (e) {
            var t = this._getCenterOffset(e)._floor();
            return this._offsetIsWithinView(t) ? (this.panBy(t), !0) : !1
        }, _offsetIsWithinView: function (e, t) {
            var n = t || 1, r = this.getSize();
            return Math.abs(e.x) <= r.x * n && Math.abs(e.y) <= r.y * n
        }
    }),n.Map.mergeOptions({zoomAnimation: n.DomUtil.TRANSITION && !n.Browser.android23 && !n.Browser.mobileOpera}),n.DomUtil.TRANSITION && n.Map.addInitHook(function () {
        n.DomEvent.on(this._mapPane, n.Transition.END, this._catchTransitionEnd, this)
    }),n.Map.include(n.DomUtil.TRANSITION ? {
        _zoomToIfClose: function (e, t) {
            if (this._animatingZoom) return !0;
            if (!this.options.zoomAnimation) return !1;
            var r = this.getZoomScale(t), i = this._getCenterOffset(e).divideBy(1 - 1 / r);
            if (!this._offsetIsWithinView(i, 1)) return !1;
            n.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this.fire("movestart").fire("zoomstart"), this.fire("zoomanim", {
                center: e,
                zoom: t
            });
            var s = this._getCenterLayerPoint().add(i);
            return this._prepareTileBg(), this._runAnimation(e, t, r, s), !0
        }, _catchTransitionEnd: function (e) {
            this._animatingZoom && this._onZoomTransitionEnd()
        }, _runAnimation: function (e, t, r, i, s) {
            this._animateToCenter = e, this._animateToZoom = t, this._animatingZoom = !0;
            var o = n.DomUtil.TRANSFORM, u = this._tileBg;
            clearTimeout(this._clearTileBgTimer), n.Util.falseFn(u.offsetWidth);
            var a = n.DomUtil.getScaleString(r, i), f = u.style[o];
            u.style[o] = s ? f + " " + a : a + " " + f
        }, _prepareTileBg: function () {
            var e = this._tilePane, t = this._tileBg;
            if (t && this._getLoadedTilesPercentage(t) > .5 && this._getLoadedTilesPercentage(e) < .5) {
                e.style.visibility = "hidden", e.empty = !0, this._stopLoadingImages(e);
                return
            }
            t || (t = this._tileBg = this._createPane("leaflet-tile-pane", this._mapPane), t.style.zIndex = 1), t.style[n.DomUtil.TRANSFORM] = "", t.style.visibility = "hidden", t.empty = !0, e.empty = !1, this._tilePane = this._panes.tilePane = t;
            var r = this._tileBg = e;
            n.DomUtil.addClass(r, "leaflet-zoom-animated"), this._stopLoadingImages(r)
        }, _getLoadedTilesPercentage: function (e) {
            var t = e.getElementsByTagName("img"), n, r, i = 0;
            for (n = 0, r = t.length; n < r; n++) t[n].complete && i++;
            return i / r
        }, _stopLoadingImages: function (e) {
            var t = Array.prototype.slice.call(e.getElementsByTagName("img")), r, i, s;
            for (r = 0, i = t.length; r < i; r++) s = t[r], s.complete || (s.onload = n.Util.falseFn, s.onerror = n.Util.falseFn, s.src = n.Util.emptyImageUrl, s.parentNode.removeChild(s))
        }, _onZoomTransitionEnd: function () {
            this._restoreTileFront(), n.Util.falseFn(this._tileBg.offsetWidth), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), n.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1
        }, _restoreTileFront: function () {
            this._tilePane.innerHTML = "", this._tilePane.style.visibility = "", this._tilePane.style.zIndex = 2, this._tileBg.style.zIndex = 1
        }, _clearTileBg: function () {
            !this._animatingZoom && !this.touchZoom._zooming && (this._tileBg.innerHTML = "")
        }
    } : {}),n.Map.include({
        _defaultLocateOptions: {
            watch: !1,
            setView: !1,
            maxZoom: Infinity,
            timeout: 1e4,
            maximumAge: 0,
            enableHighAccuracy: !1
        }, locate: function (e) {
            e = this._locationOptions = n.Util.extend(this._defaultLocateOptions, e);
            if (!navigator.geolocation) return this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
            }), this;
            var t = n.Util.bind(this._handleGeolocationResponse, this),
                r = n.Util.bind(this._handleGeolocationError, this);
            return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this
        }, stopLocate: function () {
            return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this
        }, _handleGeolocationError: function (e) {
            var t = e.code,
                n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
            this._locationOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                code: t,
                message: "Geolocation error: " + n + "."
            })
        }, _handleGeolocationResponse: function (e) {
            var t = 180 * e.coords.accuracy / 4e7, r = t * 2, i = e.coords.latitude, s = e.coords.longitude,
                o = new n.LatLng(i, s), u = new n.LatLng(i - t, s - r), a = new n.LatLng(i + t, s + r),
                f = new n.LatLngBounds(u, a), l = this._locationOptions;
            if (l.setView) {
                var c = Math.min(this.getBoundsZoom(f), l.maxZoom);
                this.setView(o, c)
            }
            this.fire("locationfound", {latlng: o, bounds: f, accuracy: e.coords.accuracy})
        }
    })
})(this);
(function (e, t) {
    L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            animateAddingMarkers: !1,
            polygonOptions: {}
        }, initialize: function (e) {
            L.Util.setOptions(this, e), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), L.FeatureGroup.prototype.initialize.call(this, []), this._inZoomAnimation = 0, this._needsClustering = [], this._currentShownBounds = null
        }, addLayer: function (e) {
            if (e instanceof L.LayerGroup) {
                var t = [];
                for (var n in e._layers) e._layers.hasOwnProperty(n) && t.push(e._layers[n]);
                return this.addLayers(t)
            }
            this.options.singleMarkerMode && (e.options.icon = this.options.iconCreateFunction({
                getChildCount: function () {
                    return 1
                }, getAllChildMarkers: function () {
                    return [e]
                }
            }));
            if (!this._map) return this._needsClustering.push(e), this;
            if (this.hasLayer(e)) return this;
            this._unspiderfy && this._unspiderfy(), this._addLayer(e, this._maxZoom);
            var r = e, i = this._map.getZoom();
            if (e.__parent) while (r.__parent._zoom >= i) r = r.__parent;
            return this._currentShownBounds.contains(r.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, r) : this._animationAddLayerNonAnimated(e, r)), this
        }, removeLayer: function (e) {
            return this._map ? e.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(e)), this._removeLayer(e, !0), e._icon && (L.FeatureGroup.prototype.removeLayer.call(this, e), e.setOpacity(1)), this) : this : (this._arraySplice(this._needsClustering, e), this)
        }, addLayers: function (e) {
            if (!this._map) return this._needsClustering = this._needsClustering.concat(e), this;
            for (var t = 0, n = e.length; t < n; t++) {
                var r = e[t];
                this._addLayer(r, this._maxZoom);
                if (r.__parent && r.__parent.getChildCount() === 2) {
                    var i = r.__parent.getAllChildMarkers(), s = i[0] === r ? i[1] : i[0];
                    L.FeatureGroup.prototype.removeLayer.call(this, s)
                }
            }
            return this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), this
        }, removeLayers: function (e) {
            var t, n, r;
            if (!this._map) {
                for (t = 0, n = e.length; t < n; t++) this._arraySplice(this._needsClustering, e[t]);
                return this
            }
            for (t = 0, n = e.length; t < n; t++) r = e[t], this._removeLayer(r, !0, !0), r._icon && (L.FeatureGroup.prototype.removeLayer.call(this, r), r.setOpacity(1));
            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
            for (t in this._layers) this._layers.hasOwnProperty(t) && (r = this._layers[t], r instanceof L.MarkerCluster && r._updateIcon());
            return this
        }, clearLayers: function () {
            if (!this._map) return this._needsClustering = [], this;
            this._unspiderfy && this._unspiderfy();
            for (var e in this._layers) this._layers.hasOwnProperty(e) && L.FeatureGroup.prototype.removeLayer.call(this, this._layers[e]);
            return this._generateInitialClusters(), this
        }, hasLayer: function (e) {
            if (this._needsClustering.length > 0) {
                var t = this._needsClustering;
                for (var n = t.length - 1; n >= 0; n--) if (t[n] === e) return !0
            }
            return !!e.__parent && e.__parent._group === this
        }, zoomToShowLayer: function (e, t) {
            var n = function () {
                if ((e._icon || e.__parent._icon) && !this._inZoomAnimation) {
                    this._map.off("moveend", n, this), this.off("animationend", n, this);
                    if (e._icon) t(); else if (e.__parent._icon) {
                        var r = function () {
                            this.off("spiderfied", r, this), t()
                        };
                        this.on("spiderfied", r, this), e.__parent.spiderfy()
                    }
                }
            };
            e._icon ? t() : e.__parent._zoom < this._map.getZoom() ? (this._map.on("moveend", n, this), e._icon || this._map.panTo(e.getLatLng())) : (this._map.on("moveend", n, this), this.on("animationend", n, this), this._map.setView(e.getLatLng(), e.__parent._zoom + 1), e.__parent.zoomToBounds())
        }, onAdd: function (e) {
            L.FeatureGroup.prototype.onAdd.call(this, e), this._gridClusters || this._generateInitialClusters();
            for (var t = 0, n = this._needsClustering.length; t < n; t++) this._addLayer(this._needsClustering[t], this._maxZoom);
            this._needsClustering = [], this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), this._zoom = this._map.getZoom(), this._currentShownBounds = this._getExpandedVisibleBounds(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)
        }, onRemove: function (e) {
            this._map.off("zoomend", this._zoomEnd, this), this._map.off("moveend", this._moveEnd, this), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), L.FeatureGroup.prototype.onRemove.call(this, e)
        }, _arraySplice: function (e, t) {
            for (var n = e.length - 1; n >= 0; n--) if (e[n] === t) {
                e.splice(n, 1);
                return
            }
        }, _removeLayer: function (e, t, n) {
            var r = this._gridClusters, i = this._gridUnclustered, s = this._map;
            if (t) for (var o = this._maxZoom; o >= 0; o--) if (!i[o].removeObject(e, s.project(e.getLatLng(), o))) break;
            var u = e.__parent, a = u._markers, f;
            this._arraySplice(a, e);
            while (u) {
                u._childCount--;
                if (u._zoom < 0) break;
                t && u._childCount <= 1 ? (f = u._markers[0] === e ? u._markers[1] : u._markers[0], r[u._zoom].removeObject(u, s.project(u._cLatLng, u._zoom)), i[u._zoom].addObject(f, s.project(f.getLatLng(), u._zoom)), this._arraySplice(u.__parent._childClusters, u), u.__parent._markers.push(f), f.__parent = u.__parent, u._icon && (L.FeatureGroup.prototype.removeLayer.call(this, u), n || L.FeatureGroup.prototype.addLayer.call(this, f))) : (u._recalculateBounds(), (!n || !u._icon) && u._updateIcon()), u = u.__parent
            }
        }, _propagateEvent: function (e) {
            e.target instanceof L.MarkerCluster && (e.type = "cluster" + e.type), L.FeatureGroup.prototype._propagateEvent.call(this, e)
        }, _defaultIconCreateFunction: function (e) {
            var t = e.getChildCount(), n = " marker-cluster-";
            return t < 10 ? n += "small" : t < 100 ? n += "medium" : n += "large", new L.DivIcon({
                html: "<div><span>" + t + "</span></div>",
                className: "marker-cluster" + n,
                iconSize: new L.Point(40, 40)
            })
        }, _bindEvents: function () {
            var e = null, t = this._map, n = this.options.spiderfyOnMaxZoom, r = this.options.showCoverageOnHover,
                i = this.options.zoomToBoundsOnClick;
            (n || i) && this.on("clusterclick", function (e) {
                t.getMaxZoom() === t.getZoom() ? n && e.layer.spiderfy() : i && e.layer.zoomToBounds()
            }, this), r && (this.on("clustermouseover", function (n) {
                if (this._inZoomAnimation) return;
                e && t.removeLayer(e), n.layer.getChildCount() > 2 && (e = new L.Polygon(n.layer.getConvexHull(), this.options.polygonOptions), t.addLayer(e))
            }, this), this.on("clustermouseout", function () {
                e && (t.removeLayer(e), e = null)
            }, this), t.on("zoomend", function () {
                e && (t.removeLayer(e), e = null)
            }, this), t.on("layerremove", function (n) {
                e && n.layer === this && (t.removeLayer(e), e = null)
            }, this))
        }, _zoomEnd: function () {
            if (!this._map) return;
            this._mergeSplitClusters(), this._zoom = this._map._zoom, this._currentShownBounds = this._getExpandedVisibleBounds()
        }, _moveEnd: function () {
            if (this._inZoomAnimation) return;
            var e = this._getExpandedVisibleBounds();
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, e), this._currentShownBounds = e;
            return
        }, _generateInitialClusters: function () {
            var e = this._map.getMaxZoom(), t = this.options.maxClusterRadius;
            this.options.disableClusteringAtZoom && (e = this.options.disableClusteringAtZoom - 1), this._maxZoom = e, this._gridClusters = {}, this._gridUnclustered = {};
            for (var n = e; n >= 0; n--) this._gridClusters[n] = new L.DistanceGrid(t), this._gridUnclustered[n] = new L.DistanceGrid(t);
            this._topClusterLevel = new L.MarkerCluster(this, -1)
        }, _addLayer: function (e, t) {
            var n = this._gridClusters, r = this._gridUnclustered, i, s;
            for (; t >= 0; t--) {
                i = this._map.project(e.getLatLng(), t);
                var o = n[t].getNearObject(i);
                if (o) {
                    o._addChild(e), e.__parent = o;
                    return
                }
                o = r[t].getNearObject(i);
                if (o) {
                    o.__parent && this._removeLayer(o, !1);
                    var u = o.__parent, a = new L.MarkerCluster(this, t, o, e);
                    n[t].addObject(a, this._map.project(a._cLatLng, t)), o.__parent = a, e.__parent = a;
                    var f = a;
                    for (s = t - 1; s > u._zoom; s--) f = new L.MarkerCluster(this, s, f), n[s].addObject(f, this._map.project(o.getLatLng(), s));
                    u._addChild(f);
                    for (s = t; s >= 0; s--) if (!r[s].removeObject(o, this._map.project(o.getLatLng(), s))) break;
                    return
                }
                r[t].addObject(e, i)
            }
            this._topClusterLevel._addChild(e), e.__parent = this._topClusterLevel;
            return
        }, _mergeSplitClusters: function () {
            this._zoom < this._map._zoom ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, this._map._zoom)) : this._zoom > this._map._zoom ? (this._animationStart(), this._animationZoomOut(this._zoom, this._map._zoom)) : this._moveEnd()
        }, _getExpandedVisibleBounds: function () {
            var e = this._map, t = e.getPixelBounds(), n = L.Browser.mobile ? 0 : Math.abs(t.max.x - t.min.x),
                r = L.Browser.mobile ? 0 : Math.abs(t.max.y - t.min.y),
                i = e.unproject(new L.Point(t.min.x - n, t.min.y - r)),
                s = e.unproject(new L.Point(t.max.x + n, t.max.y + r));
            return new L.LatLngBounds(i, s)
        }, _animationAddLayerNonAnimated: function (e, t) {
            if (t === e) L.FeatureGroup.prototype.addLayer.call(this, e); else if (t._childCount === 2) {
                t._addToMap();
                var n = t.getAllChildMarkers();
                L.FeatureGroup.prototype.removeLayer.call(this, n[0]), L.FeatureGroup.prototype.removeLayer.call(this, n[1])
            } else t._updateIcon()
        }
    }), L.MarkerClusterGroup.include(L.DomUtil.TRANSITION ? {
        _animationStart: function () {
            this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++
        }, _animationEnd: function () {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend")
        }, _animationZoomIn: function (e, t) {
            var n = this, r = this._getExpandedVisibleBounds(), i;
            this._topClusterLevel._recursively(r, e, 0, function (s) {
                var o = s._latlng, u = s._markers, a;
                s._isSingleParent() && e + 1 === t ? (L.FeatureGroup.prototype.removeLayer.call(n, s), s._recursivelyAddChildrenToMap(null, t, r)) : (s.setOpacity(0), s._recursivelyAddChildrenToMap(o, t, r));
                for (i = u.length - 1; i >= 0; i--) a = u[i], r.contains(a._latlng) || L.FeatureGroup.prototype.removeLayer.call(n, a)
            }), this._forceLayout();
            var s, o;
            n._topClusterLevel._recursivelyBecomeVisible(r, t);
            for (s in n._layers) n._layers.hasOwnProperty(s) && (o = n._layers[s], !(o instanceof L.MarkerCluster) && o._icon && o.setOpacity(1));
            n._topClusterLevel._recursively(r, e, t, function (e) {
                e._recursivelyRestoreChildPositions(t)
            }), setTimeout(function () {
                n._topClusterLevel._recursively(r, e, 0, function (e) {
                    L.FeatureGroup.prototype.removeLayer.call(n, e), e.setOpacity(1)
                }), n._animationEnd()
            }, 250)
        }, _animationZoomOut: function (e, t) {
            this._animationZoomOutSingle(this._topClusterLevel, e - 1, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e, this._getExpandedVisibleBounds())
        }, _animationZoomOutSingle: function (e, t, n) {
            var r = this._getExpandedVisibleBounds();
            e._recursivelyAnimateChildrenInAndAddSelfToMap(r, t + 1, n);
            var i = this;
            this._forceLayout(), e._recursivelyBecomeVisible(r, n), setTimeout(function () {
                if (e._childCount === 1) {
                    var s = e._markers[0];
                    s.setLatLng(s.getLatLng()), s.setOpacity(1);
                    return
                }
                e._recursively(r, n, 0, function (e) {
                    e._recursivelyRemoveChildrenFromMap(r, t + 1)
                }), i._animationEnd()
            }, 250)
        }, _animationAddLayer: function (e, t) {
            var n = this;
            L.FeatureGroup.prototype.addLayer.call(this, e), t !== e && (t._childCount > 2 ? (t._updateIcon(), this._forceLayout(), this._animationStart(), e._setPos(this._map.latLngToLayerPoint(t.getLatLng())), e.setOpacity(0), setTimeout(function () {
                L.FeatureGroup.prototype.removeLayer.call(n, e), e.setOpacity(1), n._animationEnd()
            }, 250)) : (this._forceLayout(), n._animationStart(), n._animationZoomOutSingle(t, this._map.getMaxZoom(), this._map.getZoom())))
        }, _forceLayout: function () {
            L.Util.falseFn(document.body.offsetWidth)
        }
    } : {
        _animationStart: function () {
        }, _animationZoomIn: function (e, t) {
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds())
        }, _animationZoomOut: function (e, t) {
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds())
        }, _animationAddLayer: function (e, t) {
            this._animationAddLayerNonAnimated(e, t)
        }
    }), L.MarkerCluster = L.Marker.extend({
        initialize: function (e, t, n, r) {
            L.Marker.prototype.initialize.call(this, n ? n._cLatLng || n.getLatLng() : new L.LatLng(0, 0), {icon: this}), this._group = e, this._zoom = t, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._bounds = new L.LatLngBounds, n && this._addChild(n), r && this._addChild(r)
        }, getAllChildMarkers: function (e) {
            e = e || [];
            for (var t = this._childClusters.length - 1; t >= 0; t--) this._childClusters[t].getAllChildMarkers(e);
            for (var n = this._markers.length - 1; n >= 0; n--) e.push(this._markers[n]);
            return e
        }, getChildCount: function () {
            return this._childCount
        }, zoomToBounds: function () {
            this._group._map.fitBounds(this._bounds)
        }, _updateIcon: function () {
            this._iconNeedsUpdate = !0, this._icon && this.setIcon(this)
        }, createIcon: function () {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon()
        }, createShadow: function () {
            return this._iconObj.createShadow()
        }, _addChild: function (e, t) {
            this._iconNeedsUpdate = !0, this._expandBounds(e), e instanceof L.MarkerCluster ? (t || (this._childClusters.push(e), e.__parent = this), this._childCount += e._childCount) : (t || this._markers.push(e), this._childCount++), this.__parent && this.__parent._addChild(e, !0)
        }, _expandBounds: function (e) {
            var t, n = e._wLatLng || e._latlng;
            e instanceof L.MarkerCluster ? (this._bounds.extend(e._bounds), t = e._childCount) : (this._bounds.extend(n), t = 1), this._cLatLng || (this._cLatLng = e._cLatLng || n);
            var r = this._childCount + t;
            this._wLatLng ? (this._wLatLng.lat = (n.lat * t + this._wLatLng.lat * this._childCount) / r, this._wLatLng.lng = (n.lng * t + this._wLatLng.lng * this._childCount) / r) : this._latlng = this._wLatLng = new L.LatLng(n.lat, n.lng)
        }, _addToMap: function (e) {
            e && (this._backupLatlng = this._latlng, this.setLatLng(e)), L.FeatureGroup.prototype.addLayer.call(this._group, this)
        }, _recursivelyAnimateChildrenIn: function (e, t, n) {
            this._recursively(e, 0, n - 1, function (e) {
                var n = e._markers, r, i;
                for (r = n.length - 1; r >= 0; r--) i = n[r], i._icon && (i._setPos(t), i.setOpacity(0))
            }, function (e) {
                var n = e._childClusters, r, i;
                for (r = n.length - 1; r >= 0; r--) i = n[r], i._icon && (i._setPos(t), i.setOpacity(0))
            })
        }, _recursivelyAnimateChildrenInAndAddSelfToMap: function (e, t, n) {
            this._recursively(e, n, 0, function (r) {
                r._recursivelyAnimateChildrenIn(e, r._group._map.latLngToLayerPoint(r.getLatLng()).round(), t), r._isSingleParent() && t - 1 === n ? (r.setOpacity(1), r._recursivelyRemoveChildrenFromMap(e, t)) : r.setOpacity(0), r._addToMap()
            })
        }, _recursivelyBecomeVisible: function (e, t) {
            this._recursively(e, 0, t, null, function (e) {
                e.setOpacity(1)
            })
        }, _recursivelyAddChildrenToMap: function (e, t, n) {
            this._recursively(n, -1, t, function (r) {
                if (t === r._zoom) return;
                for (var i = r._markers.length - 1; i >= 0; i--) {
                    var s = r._markers[i];
                    if (!n.contains(s._latlng)) continue;
                    e && (s._backupLatlng = s.getLatLng(), s.setLatLng(e), s.setOpacity(0)), L.FeatureGroup.prototype.addLayer.call(r._group, s)
                }
            }, function (t) {
                t._addToMap(e)
            })
        }, _recursivelyRestoreChildPositions: function (e) {
            for (var t = this._markers.length - 1; t >= 0; t--) {
                var n = this._markers[t];
                n._backupLatlng && (n.setLatLng(n._backupLatlng), delete n._backupLatlng)
            }
            if (e - 1 === this._zoom) for (var r = this._childClusters.length - 1; r >= 0; r--) this._childClusters[r]._restorePosition(); else for (var i = this._childClusters.length - 1; i >= 0; i--) this._childClusters[i]._recursivelyRestoreChildPositions(e)
        }, _restorePosition: function () {
            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng)
        }, _recursivelyRemoveChildrenFromMap: function (e, t, n) {
            var r, i;
            this._recursively(e, -1, t - 1, function (e) {
                for (i = e._markers.length - 1; i >= 0; i--) {
                    r = e._markers[i];
                    if (!n || !n.contains(r._latlng)) L.FeatureGroup.prototype.removeLayer.call(e._group, r), r.setOpacity(1)
                }
            }, function (e) {
                for (i = e._childClusters.length - 1; i >= 0; i--) {
                    r = e._childClusters[i];
                    if (!n || !n.contains(r._latlng)) L.FeatureGroup.prototype.removeLayer.call(e._group, r), r.setOpacity(1)
                }
            })
        }, _recursively: function (e, t, n, r, i) {
            var s = this._childClusters, o = this._zoom, u, a;
            if (t > o) for (u = s.length - 1; u >= 0; u--) a = s[u], e.intersects(a._bounds) && a._recursively(e, t, n, r, i); else {
                r && r(this), i && this._zoom === n && i(this);
                if (n > o) for (u = s.length - 1; u >= 0; u--) a = s[u], e.intersects(a._bounds) && a._recursively(e, t, n, r, i)
            }
        }, _recalculateBounds: function () {
            var e = this._markers, t = this._childClusters, n;
            this._bounds = new L.LatLngBounds, delete this._wLatLng;
            for (n = e.length - 1; n >= 0; n--) this._expandBounds(e[n]);
            for (n = t.length - 1; n >= 0; n--) this._expandBounds(t[n])
        }, _isSingleParent: function () {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }
    }), L.DistanceGrid = function (e) {
        this._cellSize = e, this._sqCellSize = e * e, this._grid = {}, this._objectPoint = {}
    }, L.DistanceGrid.prototype = {
        addObject: function (e, t) {
            var n = this._getCoord(t.x), r = this._getCoord(t.y), i = this._grid, s = i[r] = i[r] || {},
                o = s[n] = s[n] || [], u = L.Util.stamp(e);
            this._objectPoint[u] = t, o.push(e)
        }, updateObject: function (e, t) {
            this.removeObject(e), this.addObject(e, t)
        }, removeObject: function (e, t) {
            var n = this._getCoord(t.x), r = this._getCoord(t.y), i = this._grid, s = i[r] = i[r] || {},
                o = s[n] = s[n] || [], u, a;
            delete this._objectPoint[L.Util.stamp(e)];
            for (u = 0, a = o.length; u < a; u++) if (o[u] === e) return o.splice(u, 1), a === 1 && delete s[n], !0
        }, eachObject: function (e, t) {
            var n, r, i, s, o, u, a, f = this._grid;
            for (n in f) if (f.hasOwnProperty(n)) {
                o = f[n];
                for (r in o) if (o.hasOwnProperty(r)) {
                    u = o[r];
                    for (i = 0, s = u.length; i < s; i++) a = e.call(t, u[i]), a && (i--, s--)
                }
            }
        }, getNearObject: function (e) {
            var t = this._getCoord(e.x), n = this._getCoord(e.y), r, i, s, o, u, a, f, l, c = this._objectPoint,
                h = this._sqCellSize, p = null;
            for (r = n - 1; r <= n + 1; r++) {
                o = this._grid[r];
                if (o) for (i = t - 1; i <= t + 1; i++) {
                    u = o[i];
                    if (u) for (s = 0, a = u.length; s < a; s++) f = u[s], l = this._sqDist(c[L.Util.stamp(f)], e), l < h && (h = l, p = f)
                }
            }
            return p
        }, _getCoord: function (e) {
            return Math.floor(e / this._cellSize)
        }, _sqDist: function (e, t) {
            var n = t.x - e.x, r = t.y - e.y;
            return n * n + r * r
        }
    }, function () {
        L.QuickHull = {
            getDistant: function (e, t) {
                var n = t[1].lat - t[0].lat, r = t[0].lng - t[1].lng;
                return r * (e.lat - t[0].lat) + n * (e.lng - t[0].lng)
            }, findMostDistantPointFromBaseLine: function (e, t) {
                var n = 0, r = null, i = [], s, o, u;
                for (s = t.length - 1; s >= 0; s--) {
                    o = t[s], u = this.getDistant(o, e);
                    if (!(u > 0)) continue;
                    i.push(o), u > n && (n = u, r = o)
                }
                return {maxPoint: r, newPoints: i}
            }, buildConvexHull: function (e, t) {
                var n = [], r = this.findMostDistantPointFromBaseLine(e, t);
                return r.maxPoint ? (n = n.concat(this.buildConvexHull([e[0], r.maxPoint], r.newPoints)), n = n.concat(this.buildConvexHull([r.maxPoint, e[1]], r.newPoints)), n) : [e]
            }, getConvexHull: function (e) {
                var t = !1, n = !1, r = null, i = null, s;
                for (s = e.length - 1; s >= 0; s--) {
                    var o = e[s];
                    if (t === !1 || o.lat > t) r = o, t = o.lat;
                    if (n === !1 || o.lat < n) i = o, n = o.lat
                }
                var u = [].concat(this.buildConvexHull([i, r], e), this.buildConvexHull([r, i], e));
                return u
            }
        }
    }(), L.MarkerCluster.include({
        getConvexHull: function () {
            var e = this.getAllChildMarkers(), t = [], n = [], r, i, s;
            for (s = e.length - 1; s >= 0; s--) i = e[s].getLatLng(), t.push(i);
            r = L.QuickHull.getConvexHull(t);
            for (s = r.length - 1; s >= 0; s--) n.push(r[s][0]);
            return n
        }
    }), L.MarkerCluster.include({
        _2PI: Math.PI * 2,
        _circleFootSeparation: 25,
        _circleStartAngle: Math.PI / 6,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function () {
            if (this._group._spiderfied === this || this._group._inZoomAnimation) return;
            var e = this.getAllChildMarkers(), t = this._group, n = t._map, r = n.latLngToLayerPoint(this._latlng), i;
            this._group._unspiderfy(), this._group._spiderfied = this, e.length >= this._circleSpiralSwitchover ? i = this._generatePointsSpiral(e.length, r) : (r.y += 10, i = this._generatePointsCircle(e.length, r)), this._animationSpiderfy(e, i)
        },
        unspiderfy: function (e) {
            if (this._group._inZoomAnimation) return;
            this._animationUnspiderfy(e), this._group._spiderfied = null
        },
        _generatePointsCircle: function (e, t) {
            var n = this._circleFootSeparation * (2 + e), r = n / this._2PI, i = this._2PI / e, s = [], o, u;
            s.length = e;
            for (o = e - 1; o >= 0; o--) u = this._circleStartAngle + o * i, s[o] = (new L.Point(t.x + r * Math.cos(u), t.y + r * Math.sin(u)))._round();
            return s
        },
        _generatePointsSpiral: function (e, t) {
            var n = this._spiralLengthStart, r = 0, i = [], s;
            i.length = e;
            for (s = e - 1; s >= 0; s--) r += this._spiralFootSeparation / n + s * 5e-4, i[s] = (new L.Point(t.x + n * Math.cos(r), t.y + n * Math.sin(r)))._round(), n += this._2PI * this._spiralLengthFactor / r;
            return i
        }
    }), L.MarkerCluster.include(L.DomUtil.TRANSITION ? {
        _animationSpiderfy: function (e, t) {
            var n = this, r = this._group, i = r._map, s = i.latLngToLayerPoint(this._latlng), o, u, a, f;
            for (o = e.length - 1; o >= 0; o--) u = e[o], u.setZIndexOffset(1e6), u.setOpacity(0), L.FeatureGroup.prototype.addLayer.call(r, u), u._setPos(s);
            r._forceLayout(), r._animationStart();
            var l = L.Path.SVG ? 0 : .3, c = L.Path.SVG_NS;
            for (o = e.length - 1; o >= 0; o--) {
                f = i.layerPointToLatLng(t[o]), u = e[o], u._preSpiderfyLatlng = u._latlng, u.setLatLng(f), u.setOpacity(1), a = new L.Polyline([n._latlng, f], {
                    weight: 1.5,
                    color: "#222",
                    opacity: l
                }), i.addLayer(a), u._spiderLeg = a;
                if (!L.Path.SVG) continue;
                var h = a._path.getTotalLength();
                a._path.setAttribute("stroke-dasharray", h + "," + h);
                var p = document.createElementNS(c, "animate");
                p.setAttribute("attributeName", "stroke-dashoffset"), p.setAttribute("begin", "indefinite"), p.setAttribute("from", h), p.setAttribute("to", 0), p.setAttribute("dur", .25), a._path.appendChild(p), p.beginElement(), p = document.createElementNS(c, "animate"), p.setAttribute("attributeName", "stroke-opacity"), p.setAttribute("attributeName", "stroke-opacity"), p.setAttribute("begin", "indefinite"), p.setAttribute("from", 0), p.setAttribute("to", .5), p.setAttribute("dur", .25), a._path.appendChild(p), p.beginElement()
            }
            n.setOpacity(.3);
            if (L.Path.SVG) {
                this._group._forceLayout();
                for (o = e.length - 1; o >= 0; o--) u = e[o]._spiderLeg, u.options.opacity = .5, u._path.setAttribute("stroke-opacity", .5)
            }
            setTimeout(function () {
                r._animationEnd(), r.fire("spiderfied")
            }, 250)
        }, _animationUnspiderfy: function (e) {
            var t = this._group, n = t._map,
                r = e ? n._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : n.latLngToLayerPoint(this._latlng),
                i = this.getAllChildMarkers(), s = L.Path.SVG, o, u, a;
            t._animationStart(), this.setOpacity(1);
            for (u = i.length - 1; u >= 0; u--) o = i[u], o.setLatLng(o._preSpiderfyLatlng), delete o._preSpiderfyLatlng, o._setPos(r), o.setOpacity(0), s && (a = o._spiderLeg._path.childNodes[0], a.setAttribute("to", a.getAttribute("from")), a.setAttribute("from", 0), a.beginElement(), a = o._spiderLeg._path.childNodes[1], a.setAttribute("from", .5), a.setAttribute("to", 0), a.setAttribute("stroke-opacity", 0), a.beginElement(), o._spiderLeg._path.setAttribute("stroke-opacity", 0));
            setTimeout(function () {
                var e = 0;
                for (u = i.length - 1; u >= 0; u--) o = i[u], o._spiderLeg && e++;
                for (u = i.length - 1; u >= 0; u--) {
                    o = i[u];
                    if (!o._spiderLeg) continue;
                    o.setOpacity(1), o.setZIndexOffset(0), e > 1 && L.FeatureGroup.prototype.removeLayer.call(t, o), n.removeLayer(o._spiderLeg), delete o._spiderLeg
                }
                t._animationEnd()
            }, 250)
        }
    } : {
        _animationSpiderfy: function (e, t) {
            var n = this._group, r = n._map, i, s, o, u;
            for (i = e.length - 1; i >= 0; i--) u = r.layerPointToLatLng(t[i]), s = e[i], s._preSpiderfyLatlng = s._latlng, s.setLatLng(u), s.setZIndexOffset(1e6), L.FeatureGroup.prototype.addLayer.call(n, s), o = new L.Polyline([this._latlng, u], {
                weight: 1.5,
                color: "#222"
            }), r.addLayer(o), s._spiderLeg = o;
            this.setOpacity(.3), n.fire("spiderfied")
        }, _animationUnspiderfy: function () {
            var e = this._group, t = e._map, n = this.getAllChildMarkers(), r, i;
            this.setOpacity(1);
            for (i = n.length - 1; i >= 0; i--) r = n[i], L.FeatureGroup.prototype.removeLayer.call(e, r), r.setLatLng(r._preSpiderfyLatlng), delete r._preSpiderfyLatlng, r.setZIndexOffset(0), t.removeLayer(r._spiderLeg), delete r._spiderLeg
        }
    }), L.MarkerClusterGroup.include({
        _spiderfied: null, _spiderfierOnAdd: function () {
            this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation ? this._map.on("zoomstart", this._unspiderfyZoomStart, this) : this._map.on("zoomend", this._unspiderfyWrapper, this), L.Path.SVG && !L.Browser.touch && this._map._initPathRoot()
        }, _spiderfierOnRemove: function () {
            this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy()
        }, _unspiderfyZoomStart: function () {
            if (!this._map) return;
            this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        }, _unspiderfyZoomAnim: function (e) {
            if (L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching")) return;
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(e)
        }, _unspiderfyWrapper: function () {
            this._unspiderfy()
        }, _unspiderfy: function (e) {
            this._spiderfied && this._spiderfied.unspiderfy(e)
        }, _unspiderfyLayer: function (e) {
            e._spiderLeg && (L.FeatureGroup.prototype.removeLayer.call(this, e), e.setOpacity(1), e.setZIndexOffset(0), this._map.removeLayer(e._spiderLeg), delete e._spiderLeg)
        }
    })
})(this);
L.Control.Zoomslider = L.Control.extend({
    options: {position: 'topleft', stepHeight: 9}, onAdd: function (map) {
        var className = 'leaflet-control-zoomslider', container = L.DomUtil.create('div', className);
        this._map = map;
        this._createButton('Zoom in', className + '-in', container, this._zoomIn, this);
        this._createSlider(className + '-slider', container, map);
        this._createButton('Zoom out', className + '-out', container, this._zoomOut, this);
        this._map.on('zoomend', this._snapToSliderValue, this);
        this._snapToSliderValue();
        return container;
    }, onRemove: function (map) {
        map.off('zoomend', this._snapToSliderValue);
    }, _createSlider: function (className, container, map) {
        var zoomLevels = map.getMaxZoom() - map.getMinZoom();
        this._sliderHeight = this.options.stepHeight * zoomLevels;
        var wrapper = L.DomUtil.create('div', className + '-wrap', container);
        wrapper.style.height = (this._sliderHeight + 5) + "px";
        var slider = L.DomUtil.create('div', className, wrapper);
        this._knob = L.DomUtil.create('div', className + '-knob', slider);
        this._draggable = this._createDraggable();
        this._draggable.enable();
        L.DomEvent.on(slider, 'click', L.DomEvent.stopPropagation).on(slider, 'click', L.DomEvent.preventDefault).on(slider, 'click', this._onSliderClick, this);
        return slider;
    }, _zoomIn: function (e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
    }, _zoomOut: function (e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
    }, _createButton: function (title, className, container, fn, context) {
        var link = L.DomUtil.create('a', className, container);
        link.href = '#';
        link.title = title;
        L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation).on(link, 'click', L.DomEvent.preventDefault).on(link, 'click', fn, context);
        return link;
    }, _createDraggable: function () {
        L.DomUtil.setPosition(this._knob, new L.Point(0, 0));
        L.DomEvent.on(this._knob, L.Draggable.START, L.DomEvent.stopPropagation).on(this._knob, 'click', L.DomEvent.stopPropagation);
        var bounds = new L.Bounds(new L.Point(0, 0), new L.Point(0, this._sliderHeight));
        var draggable = new L.BoundedDraggable(this._knob, this._knob, bounds).on('drag', this._snap, this).on('dragend', this._setZoom, this);
        return draggable;
    }, _snap: function () {
        this._snapToSliderValue(this._posToSliderValue());
    }, _setZoom: function () {
        this._map.setZoom(this._toZoomLevel(this._posToSliderValue()));
    }, _onSliderClick: function (e) {
        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e);
        var offset = first.offsetY ? first.offsetY : L.DomEvent.getMousePosition(first).y
            - L.DomUtil.getViewportOffset(this._knob).y;
        var value = this._posToSliderValue(offset - this._knob.offsetHeight / 2);
        this._snapToSliderValue(value);
        this._map.setZoom(this._toZoomLevel(value));
    }, _posToSliderValue: function (pos) {
        pos = isNaN(pos) ? L.DomUtil.getPosition(this._knob).y : pos
        return Math.round((this._sliderHeight - pos) / this.options.stepHeight);
    }, _snapToSliderValue: function (sliderValue) {
        if (this._knob) {
            sliderValue = isNaN(sliderValue) ? this._getSliderValue() : sliderValue;
            var y = this._sliderHeight
                - (sliderValue * this.options.stepHeight);
            L.DomUtil.setPosition(this._knob, new L.Point(0, y));
        }
    }, _toZoomLevel: function (sliderValue) {
        return sliderValue + this._map.getMinZoom();
    }, _toSliderValue: function (zoomLevel) {
        return zoomLevel - this._map.getMinZoom();
    }, _getSliderValue: function () {
        return this._toSliderValue(this._map.getZoom());
    }
});
L.Map.mergeOptions({zoomControl: false, zoomsliderControl: true});
L.Map.addInitHook(function () {
    if (this.options.zoomsliderControl) {
        this.zoomsliderControl = new L.Control.Zoomslider();
        this.addControl(this.zoomsliderControl);
    }
});
L.control.zoomslider = function (options) {
    return new L.Control.Zoomslider(options);
};
L.BoundedDraggable = L.Draggable.extend({
    initialize: function (element, dragStartTarget, bounds) {
        L.Draggable.prototype.initialize.call(this, element, dragStartTarget);
        this._bounds = bounds;
        this.on('predrag', function () {
            if (!this._bounds.contains(this._newPos)) {
                this._newPos = this._fitPoint(this._newPos);
            }
        }, this);
    }, _fitPoint: function (point) {
        var closest = new L.Point(Math.min(point.x, this._bounds.max.x), Math.min(point.y, this._bounds.max.y));
        closest.x = Math.max(closest.x, this._bounds.min.x);
        closest.y = Math.max(closest.y, this._bounds.min.y);
        return closest;
    }
});
L.Control.Pan = L.Control.extend({
    options: {position: 'topleft', panOffset: 500}, onAdd: function (map) {
        var className = 'leaflet-control-pan', container = L.DomUtil.create('div', className),
            off = this.options.panOffset;
        this._panButton('Up', className + '-up', container, map, new L.Point(0, -off));
        this._panButton('Left', className + '-left', container, map, new L.Point(-off, 0));
        this._panButton('Right', className + '-right', container, map, new L.Point(off, 0));
        this._panButton('Down', className + '-down', container, map, new L.Point(0, off));
        return container;
    }, _panButton: function (title, className, container, map, offset, text) {
        var wrapper = L.DomUtil.create('div', className + "-wrap", container);
        var link = L.DomUtil.create('a', className, wrapper);
        link.href = '#';
        link.title = title;
        L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation).on(link, 'click', L.DomEvent.preventDefault).on(link, 'click', function () {
            map.panBy(offset);
        }, map).on(link, 'dblclick', L.DomEvent.stopPropagation)
        return link;
    }
});
L.Map.mergeOptions({panControl: true});
L.Map.addInitHook(function () {
    if (this.options.panControl) {
        this.panControl = new L.Control.Pan();
        this.addControl(this.panControl);
    }
});
L.control.pan = function (options) {
    return new L.Control.Pan(options);
};
(function (window) {
    var HAS_HASHCHANGE = (function () {
        var doc_mode = window.documentMode;
        return ('onhashchange' in window) && (doc_mode === undefined || doc_mode > 7);
    })();
    L.Hash = function (map) {
        this.onHashChange = L.Util.bind(this.onHashChange, this);
        if (map) {
            this.init(map);
        }
    };
    L.Hash.prototype = {
        map: null, lastHash: null, parseHash: function (hash) {
            if (hash.indexOf('#') == 0) {
                hash = hash.substr(1);
            }
            var args = hash.split("/");
            if (args.length == 3) {
                var zoom = parseInt(args[0], 10), lat = parseFloat(args[1]), lon = parseFloat(args[2]);
                if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
                    return false;
                } else {
                    return {center: new L.LatLng(lat, lon), zoom: zoom};
                }
            } else {
                return false;
            }
        }, formatHash: function (map) {
            var center = map.getCenter(), zoom = map.getZoom(),
                precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
            return "#" + [zoom, center.lat.toFixed(precision), center.lng.toFixed(precision)].join("/");
        }, init: function (map) {
            this.map = map;
            this.map.on("move", this.onMapMove, this);
            this.lastHash = null;
            this.onHashChange();
            if (!this.isListening) {
                this.startListening();
            }
        }, remove: function () {
            this.map = null;
            if (this.isListening) {
                this.stopListening();
            }
        }, onMapMove: function (map) {
            if (this.movingMap || this.map.getZoom() === 0) {
                return false;
            }
            var hash = this.formatHash(this.map);
            if (this.lastHash != hash) {
                location.replace(hash);
                this.lastHash = hash;
            }
        }, movingMap: false, update: function () {
            var hash = location.hash;
            if (hash === this.lastHash) {
                return;
            }
            var parsed = this.parseHash(hash);
            if (parsed) {
                this.movingMap = true;
                this.map.setView(parsed.center, parsed.zoom);
                this.movingMap = false;
            } else {
                this.onMapMove(this.map);
            }
        }, changeDefer: 100, changeTimeout: null, onHashChange: function () {
            if (!this.changeTimeout) {
                var that = this;
                this.changeTimeout = setTimeout(function () {
                    that.update();
                    that.changeTimeout = null;
                }, this.changeDefer);
            }
        }, isListening: false, hashChangeInterval: null, startListening: function () {
            if (HAS_HASHCHANGE) {
                L.DomEvent.addListener(window, "hashchange", this.onHashChange);
            } else {
                clearInterval(this.hashChangeInterval);
                this.hashChangeInterval = setInterval(this.onHashChange, 50);
            }
            this.isListening = true;
        }, stopListening: function () {
            if (HAS_HASHCHANGE) {
                L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
            } else {
                clearInterval(this.hashChangeInterval);
            }
            this.isListening = false;
        }
    };
})(window);
L.BingLayer = L.TileLayer.extend({
    options: {subdomains: [0, 1, 2, 3], type: 'AerialWithLabels', attribution: 'Bing', culture: ''},
    initialize: function (key, options) {
        L.Util.setOptions(this, options);
        this._key = key;
        this._url = null;
        this.meta = {};
        this.loadMetadata();
    },
    tile2quad: function (x, y, z) {
        var quad = '';
        for (var i = z; i > 0; i--) {
            var digit = 0;
            var mask = 1 << (i - 1);
            if ((x & mask) != 0) digit += 1;
            if ((y & mask) != 0) digit += 2;
            quad = quad + digit;
        }
        return quad;
    },
    getTileUrl: function (p, z) {
        var z = this._getZoomForUrl();
        var subdomains = this.options.subdomains,
            s = this.options.subdomains[Math.abs((p.x + p.y) % subdomains.length)];
        return this._url.replace('{subdomain}', s).replace('{quadkey}', this.tile2quad(p.x, p.y, z)).replace('{culture}', this.options.culture);
    },
    loadMetadata: function () {
        var _this = this;
        var cbid = '_bing_metadata_' + L.Util.stamp(this);
        window[cbid] = function (meta) {
            _this.meta = meta;
            window[cbid] = undefined;
            var e = document.getElementById(cbid);
            e.parentNode.removeChild(e);
            if (meta.errorDetails) {
                alert("Got metadata" + meta.errorDetails);
                return;
            }
            _this.initMetadata();
        };
        var url = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.options.type + "?include=ImageryProviders&jsonp=" + cbid + "&key=" + this._key;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = cbid;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    initMetadata: function () {
        var r = this.meta.resourceSets[0].resources[0];
        this.options.subdomains = r.imageUrlSubdomains;
        this._url = r.imageUrl;
        this._providers = [];
        for (var i = 0; i < r.imageryProviders.length; i++) {
            var p = r.imageryProviders[i];
            for (var j = 0; j < p.coverageAreas.length; j++) {
                var c = p.coverageAreas[j];
                var coverage = {zoomMin: c.zoomMin, zoomMax: c.zoomMax, active: false};
                var bounds = new L.LatLngBounds(new L.LatLng(c.bbox[0] + 0.01, c.bbox[1] + 0.01), new L.LatLng(c.bbox[2] - 0.01, c.bbox[3] - 0.01));
                coverage.bounds = bounds;
                coverage.attrib = p.attribution;
                this._providers.push(coverage);
            }
        }
        this._update();
    },
    _update: function () {
        if (this._url == null || !this._map) return;
        this._update_attribution();
        L.TileLayer.prototype._update.apply(this, []);
    },
    _update_attribution: function () {
        var bounds = this._map.getBounds();
        var zoom = this._map.getZoom();
        for (var i = 0; i < this._providers.length; i++) {
            var p = this._providers[i];
            if ((zoom <= p.zoomMax && zoom >= p.zoomMin) && bounds.intersects(p.bounds)) {
                if (!p.active)
                    this._map.attributionControl.addAttribution(p.attrib);
                p.active = true;
            } else {
                if (p.active)
                    this._map.attributionControl.removeAttribution(p.attrib);
                p.active = false;
            }
        }
    },
    onRemove: function (map) {
        for (var i = 0; i < this._providers.length; i++) {
            var p = this._providers[i];
            if (p.active) {
                this._map.attributionControl.removeAttribution(p.attrib);
                p.active = false;
            }
        }
        L.TileLayer.prototype.onRemove.apply(this, [map]);
    }
});

function newAlert(type, message) {
    $("#alert-area").append($("<div class='alert " + type + " fade in' data-alert><button type=\'button\' class=\'close\' data-dismiss=\'alert\'>×</button><p> " + message + " </p></div>"));
    $(".alert").delay(2000).fadeOut("slow", function () {
        $(this).remove();
    });
}

var STATIC_PREFIX = (typeof STATIC_PREFIX === "undefined") ? 'http://static.prod.bombsight.org/static/' : STATIC_PREFIX;
var HYBRID_BASE_TEXT = (typeof HYBRID_BASE_TEXT === "undefined") ? 'Satellite View' : HYBRID_BASE_TEXT;
var OSM_BASE_TEXT = (typeof OSM_BASE_TEXT === "undefined") ? 'Street Map View' : OSM_BASE_TEXT;
var BOMBS_TEXT = (typeof BOMBS_TEXT === "undefined") ? 'Bomb Incidents' : BOMBS_TEXT;
var BOMB_MAPS_TEXT = (typeof BOMB_MAPS_TEXT === "undefined") ? '1940s Bomb Maps' : BOMB_MAPS_TEXT;
var DOB_TEXT = (typeof DOB_TEXT === "undefined") ? 'Anti-Invasion Sites' : DOB_TEXT;
var AGG_BOMBS_ID = (typeof AGG_BOMBS_ID === "undefined") ? 'agg_bomb' : AGG_BOMBS_ID;
var WEEK_BOMBS_ID = (typeof WEEK_BOMBS_ID === "undefined") ? 'week_bomb' : WEEK_BOMBS_ID;
var DAY_BOMBS_ID = (typeof DAY_BOMBS_ID === "undefined") ? 'day_bomb' : DAY_BOMBS_ID;
var AGG_BOMBS_MAPS_ID = (typeof AGG_BOMBS_MAPS_ID === "undefined") ? 'agg_mosaic_auto_contrast_sharpen_15' : AGG_BOMBS_MAPS_ID;
var WEEK_BOMBS_MAPS_ID = (typeof WEEK_BOMBS_MAPS_ID === "undefined") ? 'weekly_mosaic_auto_contrast_sharpen_15' : WEEK_BOMBS_MAPS_ID;
var DOB_ID = (typeof DOB_ID === "undefined") ? 'defence_site' : DOB_ID;
var WMS_PATH = (typeof WMS_PATH === "undefined") ? 'geoserver/sit/wms' : WMS_PATH;
var GWC_PATH = (typeof GWC_PATH === "undefined") ? 'geoserver/gwc/service/tms/1.0.0/sit:' : GWC_PATH;

function LMap(container, mapState, options) {
    var that = this;
    this._zoomSwitch = 14;
    this._dataState = {
        mapState: (typeof mapState === "undefined") ? AGG_BOMBS_ID : mapState,
        visibility: {bombs: true, bombMapSheets: false, defenceSites: true}
    };
    this._mapOptions = (typeof options === "undefined") ? {
        center: new L.LatLng(51.505, -0.09),
        zoom: 15,
        maxZoom: 17,
        minZoom: 5,
        zoomControl: false,
        panControl: false,
        zoomsliderControl: false
    } : options;
    this._LeafIcon = L.Icon.extend({options: {iconSize: [35, 35], iconAnchor: [17, 17], popupAnchor: [0, -14]}});
    this._bombType = {
        'XB': 'High-Explosive Bomb',
        'UXB': 'Unexploded Bomb',
        'OIL': 'Oil Bomb',
        'UXOIL': 'UX Oil Bomb',
        'PMINE': 'Parachute Mine',
        'UXPM': 'Unexploded Parachute Mine',
        'INC': 'Incendiary Bomb',
        'IB': 'Incendiary Bomb',
        'UNKNOWN': 'Unknown Bomb Type'
    };
    this.icons = {
        defence_anti_tank: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/defence_tank.png'}),
        defence_anti_plane: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/defence_plane.png'}),
        defence_anti_personnel: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/defence_personnel.png'}),
        defence_ancillary: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/defence_ancillary.png'}),
        bomb_generic: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/bomb_generic.png'}),
        bomb_parachute: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/bomb_parachute.png'}),
        bomb_incendiary: new this._LeafIcon({iconUrl: STATIC_PREFIX + 'img/bomb_incendiary.png'})
    };
    this.overlayLayerControl = {};
    this.baseLayerControl = {};
    this.bombMapSheets = new L.TileLayer(GEOSERVER_URL + GWC_PATH, {tms: true});
    this.bombMapSheets.name = BOMB_MAPS_TEXT;
    this.osmBaseLayer = new L.TileLayer(BACKGROUND_URL, {
        maxZoom: 18,
        attribution: BACKGROUND_ATTRIBUTION
    });
    this.osmBaseLayer.name = OSM_BASE_TEXT;
    //this.aerialBaseLayer = new L.BingLayer("As3TZ_SSRPWJvy8_OxrA9kDk66ngRxEGTZPcQ6u6kKZj3YOIypvjXvCwGEJSq3jm");
    //this.aerialBaseLayer.name = HYBRID_BASE_TEXT;
    this.ajaxClusterMarkers = new L.MarkerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-';
            if (childCount < 10) {
                c += 'small';
            } else if (childCount < 100) {
                c += 'medium';
            } else {
                c += 'large';
            }
            return new L.DivIcon({
                html: '<div><span>' + childCount + '</span></div>',
                className: 'bombs-marker-cluster' + c,
                iconSize: new L.Point(40, 40)
            });
        }, maxClusterRadius: 50, showCoverageOnHover: false
    });
    this.ajaxClusterMarkers.name = BOMBS_TEXT;
    this.defenceSiteMarkers = new L.MarkerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-';
            if (childCount < 10) {
                c += 'small';
            } else if (childCount < 100) {
                c += 'medium';
            } else {
                c += 'large';
            }
            return new L.DivIcon({
                html: '<div><span>' + childCount + '</span></div>',
                className: 'defence-marker-cluster' + c,
                iconSize: new L.Point(40, 40)
            });
        }, maxClusterRadius: 35, showCoverageOnHover: false
    });
    this.defenceSiteMarkers.name = DOB_TEXT;
    this.defenceSiteWMSLayer = new L.TileLayer(GEOSERVER_URL + GWC_PATH, {tms: true});
    this.defenceSiteWMSLayer.name = DOB_TEXT;
    this.bombsWMSLayer = new L.TileLayer(GEOSERVER_URL + GWC_PATH, {tms: true});
    this.bombsWMSLayer.name = BOMBS_TEXT;
    this.refreshClusterMarkers = function (json, layer, clickCallback) {
        var clickAction = (typeof clickCallback === undefined) ? function (e) {
        } : clickCallback;
        var markers = [];
        for (var i = 0; i < json.features.length; i++) {
            var item = json.features[i];
            var x = item.geometry.coordinates[1];
            var y = item.geometry.coordinates[0];
            var icon = that.icons.bomb_generic;
            var markerType;
            if (item.properties.type) {
                markerType = item.properties.type
            } else if (item.properties.defence_type) {
                markerType = item.properties.defence_type
            }
            switch (markerType) {
                case'XB':
                    icon = that.icons.bomb_generic;
                    break;
                case'UXB':
                    icon = that.icons.bomb_generic;
                    break;
                case'OIL':
                    icon = that.icons.bomb_incendiary;
                    break;
                case'UXOIL':
                    icon = that.icons.bomb_incendiary;
                    break;
                case'PMINE':
                    icon = that.icons.bomb_parachute;
                    break;
                case'UXPM':
                    icon = that.icons.bomb_parachute;
                    break;
                case'INC':
                    icon = that.icons.bomb_incendiary;
                    break;
                case'IB':
                    icon = that.icons.bomb_incendiary;
                    break;
                case'UNKNOWN':
                    icon = that.icons.bomb_generic;
                    break;
                case'Anti-tank':
                    icon = that.icons.defence_anti_tank;
                    break;
                case'Anti-aircraft':
                    icon = that.icons.defence_anti_plane;
                    break;
                case'Anti-personnel':
                    icon = that.icons.defence_anti_personnel;
                    break;
                case'Ancillary Site':
                    icon = that.icons.defence_ancillary;
                    break;
            }
            var point = new L.Marker(new L.LatLng(x, y), {icon: icon});
            point.properties = item.properties;
            point.on('click', function (e) {
                clickAction(e);
            });
            markers.push(point);
        }
        ;layer.clearLayers();
        layer.addLayers(markers);
    };
    this.ajaxInProgress = false;
    this.refreshAjaxClusterMarkers = function (layer, name, clickCallback) {
        var clickAction = (typeof clickCallback === undefined) ? function (e) {
        } : clickCallback;
        var url = GEOSERVER_URL + 'geoserver/ows?' + 'SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature' + '&typeName=' + name + '&maxFeatures=5000' + '&outputFormat=' + 'text/javascript' + '&format_options=callback:parseResponse';
        var BBOX = this.map.getBounds()._southWest.lng + "," + this.map.getBounds()._southWest.lat + "," + this.map.getBounds()._northEast.lng + "," + this.map.getBounds()._northEast.lat;
        url += '&BBOX=' + BBOX;
        if (this.ajaxInProgress) {
            setTimeout(function () {
                that.refreshAjaxClusterMarkers(layer, name, clickCallback);
            }, 250);
        } else {
            this._ajaxRequest(url, name, layer, clickAction);
        }
    };
    this._ajaxRequest = function (url, name, layer, clickAction) {
        this.ajaxInProgress = true;
        $("#loading-area").show();
        $(".alert").delay(2000).fadeOut("slow", function () {
            $(this).remove();
        });
        $.ajax({
            url: url, dataType: 'jsonp', jsonpCallback: "parseResponse", success: function (data) {
                that.refreshClusterMarkers(data, layer, clickAction);
                $("#loading-area").hide();
            }, error: function () {
                that.ajaxInProgress = false;
                $("#loading-area").hide();
            }, complete: function () {
                that.ajaxInProgress = false;
                $("#loading-area").hide();
            }
        });
    };
    this.refreshTMSLayer = function (layer, name, format, toFront) {
        layer.setUrl(GEOSERVER_URL + GWC_PATH + name + "@EPSG:900913@" + format + "/{z}/{x}/{y}." + format, {
            tms: true,
            transparent: true,
            opacity: true
        });
        if (toFront) {
            layer.setZIndex(10);
        }
        layer.redraw();
    };
    this._bombMarkerPopup = function (e) {
        var prop = e.target.properties;
        var content = "<h5 class=\'hidden-phone\'>" + that._bombType[prop.type] + "</h5>";
        if (prop.address_road) {
            content += "<h5 class=\'visible-phone\'>" + that._bombType[prop.type] + "</br>at " + prop.address_road + "</h5>";
        } else {
            content += "<h5 class=\'visible-phone\'>" + that._bombType[prop.type] + "</h5>";
        }
        var id = (typeof prop.id === 'undefined') ? prop.pk : prop.id;
        if (typeof prop.address !== 'undefined' && prop.address) {
            content += "<span class=\'hidden-phone\'>";
            content += "<p>" + "recorded close to: </br>" + prop.address + "</p>";
            content += "</span>";
        }
        //content += "<a href=\'/bombs/" + id + "/\'>" + "Read more" + "</a>";
        e.target.bindPopup(content).openPopup();
    };
    this._defenceMarkerPopup = function (e) {
        var prop = e.target.properties;
        var content = "<h5>" + prop.defence_type + "</h5>";
        content += '<p>' + prop.description + '</p>';
        e.target.bindPopup(content).openPopup();
    };
    this._getLayerControlState = function (layer) {
        return $("label:contains('" + layer.name + "') > input").is(':checked');
    };
    this._onLayerControlStateUpdate = function (e) {
        if (this.parentElement.innerText.indexOf(BOMB_MAPS_TEXT) !== -1) {
            that._dataState.visibility.bombMapSheets = this.checked;
        } else if (this.parentElement.innerText.indexOf(BOMBS_TEXT) !== -1) {
            that._dataState.visibility.bombs = this.checked;
        } else if (this.parentElement.innerText.indexOf(DOB_TEXT) !== -1) {
            that._dataState.visibility.defenceSites = this.checked;
        }
        ;$.cookie('mapState', that._dataState);
    };
    this._updateLayerControl = function () {
        var layers = $('.leaflet-control-layers-overlays > label > input');
        layers.off('click', this._onLayerControlStateUpdate);
        layers.on('click', this._onLayerControlStateUpdate);
    };
    this._onZoom = function (e) {
        if (that.map.getZoom() <= this._zoomSwitch) {
            if (this._getLayerControlState(this.ajaxClusterMarkers)) {
                that._addLayer(that.bombsWMSLayer, true);
            } else {
                that._addLayer(that.bombsWMSLayer, false);
            }
            ;that._removeLayer(that.ajaxClusterMarkers);
            if (this._getLayerControlState(this.defenceSiteMarkers)) {
                that._addLayer(that.defenceSiteWMSLayer, true);
            } else {
                that._addLayer(that.defenceSiteWMSLayer, false);
            }
            ;that._removeLayer(that.defenceSiteMarkers);
        } else if (that.map.getZoom() > this._zoomSwitch) {
            if (this._getLayerControlState(this.bombsWMSLayer)) {
                that._addLayer(that.ajaxClusterMarkers, true);
            } else {
                that._addLayer(that.ajaxClusterMarkers, false);
            }
            ;that._removeLayer(that.bombsWMSLayer);
            if (this._getLayerControlState(this.defenceSiteMarkers)) {
                that._addLayer(that.defenceSiteMarkers, true);
            } else {
                that._addLayer(that.defenceSiteMarkers, false);
            }
            ;that._removeLayer(that.defenceSiteWMSLayer);
        }
    };
    this._onExtentChange = function (e) {
        if (that.map.getZoom() > this._zoomSwitch) {
            that.refreshAjaxClusterMarkers(that.ajaxClusterMarkers, that._dataState.mapState, this._bombMarkerPopup);
            that.refreshAjaxClusterMarkers(that.defenceSiteMarkers, DOB_ID, this._defenceMarkerPopup);
        }
    };
    this._addLayer = function (layer, visible, base) {
        var ibase = (typeof base === 'undefined') ? false : base;
        var ivisible = (typeof visible === 'undefined') ? true : visible;
        if (ibase) {
            this.map.addLayer(layer);
            this.layerControl.addBaseLayer(layer, layer.name);
        }
        if (ivisible) {
            this.map.addLayer(layer);
            this.layerControl.addOverlay(layer, layer.name);
        } else if (!ivisible) {
            this.layerControl.addOverlay(layer, layer.name);
        }
        this._updateLayerControl();
    };
    this._removeLayer = function (layer) {
        this.layerControl.removeLayer(layer);
        this.map.removeLayer(layer);
        this._updateLayerControl();
    };
    this.updateMapState = function (state) {
        this._dataState = state;
        this.map.off('zoomend', this._onZoom);
        this.map.off('moveend', this._onExtentChange);
        this._removeLayer(this.defenceSiteWMSLayer);
        this._removeLayer(this.defenceSiteMarkers);
        this._removeLayer(this.bombMapSheets);
        this.refreshTMSLayer(this.defenceSiteWMSLayer, DOB_ID, 'png', true);
        this._addLayer(this.defenceSiteWMSLayer, this._dataState.visibility.defenceSites);
        this._addLayer(this.defenceSiteMarkers, this._dataState.visibility.defenceSites);
        this.defenceSiteMarkers.clearLayers();
        switch (this._dataState.mapState) {
            case DAY_BOMBS_ID:
                this.refreshTMSLayer(this.bombsWMSLayer, DAY_BOMBS_ID, 'png', true);
                this._addLayer(this.bombsWMSLayer, this._dataState.visibility.bombs);
                this._addLayer(this.ajaxClusterMarkers, this._dataState.visibility.bombs);
                this.ajaxClusterMarkers.clearLayers();
                break;
            case WEEK_BOMBS_ID:
                this.refreshTMSLayer(this.bombMapSheets, WEEK_BOMBS_MAPS_ID, 'jpeg');
                this._addLayer(this.bombMapSheets, this._dataState.visibility.bombMapSheets);
                this.refreshTMSLayer(this.bombsWMSLayer, WEEK_BOMBS_ID, 'png', true);
                this._addLayer(this.bombsWMSLayer, this._dataState.visibility.bombs);
                this._addLayer(this.ajaxClusterMarkers, this._dataState.visibility.bombs);
                this.ajaxClusterMarkers.clearLayers();
                break;
            case AGG_BOMBS_ID:
                this.refreshTMSLayer(this.bombMapSheets, AGG_BOMBS_MAPS_ID, 'jpeg');
                this._addLayer(this.bombMapSheets, this._dataState.visibility.bombMapSheets);
                this.refreshTMSLayer(this.bombsWMSLayer, AGG_BOMBS_ID, 'png', true);
                this._addLayer(this.bombsWMSLayer, this._dataState.visibility.bombs);
                this._addLayer(this.ajaxClusterMarkers, this._dataState.visibility.bombs);
                this.ajaxClusterMarkers.clearLayers();
                break;
        }
        ;this.map.on('zoomend', this._onZoom, this);
        this.map.fire('zoomend');
        this.map.on('moveend', this._onExtentChange, this);
        this.map.fire('moveend');
    };
    this._initialise = function (mapDiv) {
        this.map = new L.Map(mapDiv, this._mapOptions);
        var hash = new L.Hash(this.map);
        L.control.pan().addTo(this.map);
        this.map.addControl(new geoLocation());
        this.map.addControl(new legend());
        L.control.zoomslider().addTo(this.map);
        L.control.zoom().addTo(this.map);
        $('.leaflet-control-legend').addClass('hidden-phone');
        $('.leaflet-control-pan').addClass('hidden-phone').addClass('hidden-tablet');
        $('.leaflet-control-zoomslider').addClass('hidden-phone').addClass('hidden-tablet');
        $('.leaflet-control-zoom').addClass('visible-phone').addClass('visible-tablet');
        this.layerControl = L.control.layers(this.baseLayerControl, this.overlayLayerControl, {autoZIndex: false}).addTo(this.map);
        this.locationSearchLayer = new L.LayerGroup();
        this.locationResultPopup = null;
        this.map.addLayer(this.locationSearchLayer);
        this.map.addLayer(this.osmBaseLayer, true);
        this.layerControl.addBaseLayer(this.osmBaseLayer, this.osmBaseLayer.name);
        //this.layerControl.addBaseLayer(this.aerialBaseLayer, this.aerialBaseLayer.name);
        this.updateMapState(this._dataState);
    };
    this._initialise(container);
};var geoLocation = L.Control.extend({
    options: {position: 'topleft'}, onAdd: function (map) {
        var className = 'leaflet-control-geolocation';
        var container = L.DomUtil.create('div', className);
        this._locationButton('Show my location ', className + '-button', container, map);
        map.on('locationfound', function (e) {
            londonLatLngB = new L.LatLngBounds([[51.72, -0.55], [51.26, 0.31]]);
            if (londonLatLngB.contains(e.latlng)) {
                map.setView(e.latlng, 16);
                var radius = e.accuracy / 2;
                var circle = L.circle(e.latlng, radius);
                map.addLayer(circle);
                var popup = L.popup().setLatLng(e.latlng).setContent("You are within " + radius + " meters from this point").openOn(map);
                map.on('popupclose', function (e) {
                    if (e.popup === popup) {
                        map.removeLayer(circle);
                    }
                });
            } else {
                newAlert('alert-error', '<strong>Sorry</strong> you\'re located outside of London!');
            }
        });
        map.on('locationerror', function (e) {
            newAlert('alert-error', '<strong>Sorry</strong> we couldn\'t determine your location!');
        });
        return container;
    }, _locationButton: function (title, className, container, map) {
        var wrapper = L.DomUtil.create('div', className + "-wrap", container);
        var link = L.DomUtil.create('a', className, wrapper);
        link.href = '#';
        link.title = title;
        var icon = L.DomUtil.create('i', 'icon-screenshot', link);
        L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation).on(link, 'click', L.DomEvent.preventDefault).on(link, 'click', function () {
            map.locate({setView: false, maxZoom: 16})
        }, map).on(link, 'dblclick', L.DomEvent.stopPropagation)
        return link;
    }
});
var legend = L.Control.extend({
    options: {position: 'topright', autoZIndex: true}, onAdd: function (map) {
        this._initLayout();
        return this._container;
    }, _initLayout: function () {
        var className = 'leaflet-control-legend', container = this._container = L.DomUtil.create('div', className);
        if (!L.Browser.touch) {
            L.DomEvent.disableClickPropagation(container);
        } else {
            L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
        }
        L.DomEvent.on(container, 'mouseover', this._expand, this).on(container, 'mouseout', this._collapse, this);
        var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
        link.href = '#';
        link.title = 'Legend';
        if (L.Browser.touch) {
            L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation).on(link, 'click', L.DomEvent.preventDefault).on(link, 'click', this._expand, this);
        } else {
            L.DomEvent.on(link, 'focus', this._expand, this);
        }
        this._map.on('movestart', this._collapse, this);
        var contentDiv = this._form = L.DomUtil.create('div', className + '-content');
        var content = document.createElement('span');
        content.innerHTML = $('#legend').html();
        contentDiv.appendChild(content);
        this._container.appendChild(contentDiv)
    }, _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-legend-expanded');
    }, _collapse: function () {
        this._container.className = this._container.className.replace(' leaflet-control-legend-expanded', '');
    }
});
