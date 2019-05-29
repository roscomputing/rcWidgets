/** 
 * Copyright 2018 Telerik EAD                                                                                                                                                                           
 *                                                                                                                                                                                                      
 * Licensed under the Apache License, Version 2.0 (the "License");                                                                                                                                      
 * you may not use this file except in compliance with the License.                                                                                                                                     
 * You may obtain a copy of the License at                                                                                                                                                              
 *                                                                                                                                                                                                      
 *     http://www.apache.org/licenses/LICENSE-2.0                                                                                                                                                       
 *                                                                                                                                                                                                      
 * Unless required by applicable law or agreed to in writing, software                                                                                                                                  
 * distributed under the License is distributed on an "AS IS" BASIS,                                                                                                                                    
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                                                                                                             
 * See the License for the specific language governing permissions and                                                                                                                                  
 * limitations under the License.                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
! function(e, define) {
    define("kendo.core.min", ["jquery"], e)
}(function() {
    return function(e, t, n) {
        function i() {}

        function o(e, t) {
            if (t) return "'" + e.split("'").join("\\'").split('\\"').join('\\\\\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") + "'";
            var n = e.charAt(0),
                i = e.substring(1);
            return "=" === n ? "+(" + i + ")+" : ":" === n ? "+$kendoHtmlEncode(" + i + ")+" : ";" + e + ";$kendoOutput+="
        }

        function a(e, t, n) {
            return e += "", t = t || 2, n = t - e.length, n ? W[t].substring(0, n) + e : e
        }

        function r(e) {
            var t = e.css(ve.support.transitions.css + "box-shadow") || e.css("box-shadow"),
                n = t ? t.match(Ie) || [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0],
                i = xe.max(+n[3], +(n[4] || 0));
            return {
                left: -n[1] + i,
                right: +n[1] + i,
                bottom: +n[2] + i
            }
        }

        function s(t, n) {
            var i, o, a, r, s, l, c, u = Te.browser,
                d = ve._outerWidth,
                p = ve._outerHeight;
            return t.parent().hasClass("k-animation-container") ? (l = t.parent(".k-animation-container"), c = l[0].style, l.is(":hidden") && l.css({
                display: "",
                position: ""
            }), i = Se.test(c.width) || Se.test(c.height), i || l.css({
                width: n ? d(t) + 1 : d(t),
                height: p(t),
                boxSizing: "content-box",
                mozBoxSizing: "content-box",
                webkitBoxSizing: "content-box"
            })) : (o = t[0].style.width, a = t[0].style.height, r = Se.test(o), s = Se.test(a), i = r || s, !r && (!n || n && o) && (o = n ? d(t) + 1 : d(t)), !s && (!n || n && a) && (a = p(t)), t.wrap(e("<div/>").addClass("k-animation-container").css({
                width: o,
                height: a
            })), i && t.css({
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            })), u.msie && xe.floor(u.version) <= 7 && (t.css({
                zoom: 1
            }), t.children(".k-menu").width(t.width())), t.parent()
        }

        function l(e) {
            var t = 1,
                n = arguments.length;
            for (t = 1; t < n; t++) c(e, arguments[t]);
            return e
        }

        function c(e, t) {
            var n, i, o, a, r, s = ve.data.ObservableArray,
                l = ve.data.LazyObservableArray,
                u = ve.data.DataSource,
                d = ve.data.HierarchicalDataSource;
            for (n in t) i = t[n], o = typeof i, a = o === Me && null !== i ? i.constructor : null, a && a !== Array && a !== s && a !== l && a !== u && a !== d && a !== RegExp ? i instanceof Date ? e[n] = new Date(i.getTime()) : P(i.clone) ? e[n] = i.clone() : (r = e[n], e[n] = typeof r === Me ? r || {} : {}, c(e[n], i)) : o !== ze && (e[n] = i);
            return e
        }

        function u(e, t, i) {
            for (var o in t)
                if (t.hasOwnProperty(o) && t[o].test(e)) return o;
            return i !== n ? i : e
        }

        function d(e) {
            return e.replace(/([a-z][A-Z])/g, function(e) {
                return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
            })
        }

        function p(e) {
            return e.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            })
        }

        function h(t, n) {
            var i, o = {};
            return document.defaultView && document.defaultView.getComputedStyle ? (i = document.defaultView.getComputedStyle(t, ""), n && e.each(n, function(e, t) {
                o[t] = i.getPropertyValue(t)
            })) : (i = t.currentStyle, n && e.each(n, function(e, t) {
                o[t] = i[p(t)]
            })), ve.size(o) || (o = i), o
        }

        function f(e) {
            if (e && e.className && "string" == typeof e.className && e.className.indexOf("k-auto-scrollable") > -1) return !0;
            var t = h(e, ["overflow"]).overflow;
            return "auto" == t || "scroll" == t
        }

        function m(t, i) {
            var o, a = Te.browser.webkit,
                r = Te.browser.mozilla,
                s = t instanceof e ? t[0] : t;
            if (t) return o = Te.isRtl(t), i === n ? o && a ? s.scrollWidth - s.clientWidth - s.scrollLeft : Math.abs(s.scrollLeft) : (s.scrollLeft = o && a ? s.scrollWidth - s.clientWidth - i : o && r ? -i : i, n)
        }

        function g(e) {
            var t, n = 0;
            for (t in e) e.hasOwnProperty(t) && "toJSON" != t && n++;
            return n
        }

        function v(e, n, i) {
            var o, a, r;
            return n || (n = "offset"), o = e[n](), a = {
                top: o.top,
                right: o.right,
                bottom: o.bottom,
                left: o.left
            }, Te.browser.msie && (Te.pointers || Te.msPointers) && !i && (r = Te.isRtl(e) ? 1 : -1, a.top -= t.pageYOffset - document.documentElement.scrollTop, a.left -= t.pageXOffset + r * document.documentElement.scrollLeft), a
        }

        function _(e) {
            var t = {};
            return be("string" == typeof e ? e.split(" ") : e, function(e) {
                t[e] = this
            }), t
        }

        function b(e) {
            return new ve.effects.Element(e)
        }

        function w(e, t, n, i) {
            return typeof e === Ae && (P(t) && (i = t, t = 400, n = !1), P(n) && (i = n, n = !1), typeof t === He && (n = t, t = 400), e = {
                effects: e,
                duration: t,
                reverse: n,
                complete: i
            }), _e({
                effects: {},
                duration: 400,
                reverse: !1,
                init: ye,
                teardown: ye,
                hide: !1
            }, e, {
                completeCallback: e.complete,
                complete: ye
            })
        }

        function k(t, n, i, o, a) {
            for (var r, s = 0, l = t.length; s < l; s++) r = e(t[s]), r.queue(function() {
                j.promise(r, w(n, i, o, a))
            });
            return t
        }

        function y(e, t, n, i) {
            return t && (t = t.split(" "), be(t, function(t, n) {
                e.toggleClass(n, i)
            })), e
        }

        function x(e) {
            return ("" + e).replace(q, "&amp;").replace($, "&lt;").replace(K, "&gt;").replace(G, "&quot;").replace(Y, "&#39;")
        }

        function C(e, t) {
            var i;
            return 0 === t.indexOf("data") && (t = t.substring(4), t = t.charAt(0).toLowerCase() + t.substring(1)), t = t.replace(oe, "-$1"), i = e.getAttribute("data-" + ve.ns + t), null === i ? i = n : "null" === i ? i = null : "true" === i ? i = !0 : "false" === i ? i = !1 : Ee.test(i) && "mask" != t ? i = parseFloat(i) : ne.test(i) && !ie.test(i) && (i = Function("return (" + i + ")")()), i
        }

        function T(t, i, o) {
            var a, r, s = {};
            for (a in i) r = C(t, a), r !== n && (te.test(a) && ("string" == typeof r ? e("#" + r).length ? r = ve.template(e("#" + r).html()) : o && (r = ve.template(o[r])) : r = t.getAttribute(a)), s[a] = r);
            return s
        }

        function S(t, n) {
            return e.contains(t, n) ? -1 : 1
        }

        function D() {
            var t = e(this);
            return e.inArray(t.attr("data-" + ve.ns + "role"), ["slider", "rangeslider"]) > -1 || t.is(":visible")
        }

        function I(e, t) {
            var n = e.nodeName.toLowerCase();
            return (/input|select|textarea|button|object/.test(n) ? !e.disabled : "a" === n ? e.href || t : t) && E(e)
        }

        function E(t) {
            return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                return "hidden" === e.css(this, "visibility")
            }).length
        }

        function F(e, t) {
            return new F.fn.init(e, t)
        }
        var A, P, M, O, H, z, V, B, L, N, R, W, U, j, q, $, G, Y, K, Q, J, X, Z, ee, te, ne, ie, oe, ae, re, se, le, ce, ue, de, pe, he, fe, me, ge, ve = t.kendo = t.kendo || {
                cultures: {}
            },
            _e = e.extend,
            be = e.each,
            we = e.isArray,
            ke = e.proxy,
            ye = e.noop,
            xe = Math,
            Ce = t.JSON || {},
            Te = {},
            Se = /%/,
            De = /\{(\d+)(:[^\}]+)?\}/g,
            Ie = /(\d+(?:\.?)\d*)px\s*(\d+(?:\.?)\d*)px\s*(\d+(?:\.?)\d*)px\s*(\d+)?/i,
            Ee = /^(\+|-?)\d+(\.?)\d*$/,
            Fe = "function",
            Ae = "string",
            Pe = "number",
            Me = "object",
            Oe = "null",
            He = "boolean",
            ze = "undefined",
            Ve = {},
            Be = {},
            Le = [].slice;
        ve.version = "2018.2.620".replace(/^\s+|\s+$/g, ""), i.extend = function(e) {
                var t, n, i = function() {},
                    o = this,
                    a = e && e.init ? e.init : function() {
                        o.apply(this, arguments)
                    };
                i.prototype = o.prototype, n = a.fn = a.prototype = new i;
                for (t in e) n[t] = null != e[t] && e[t].constructor === Object ? _e(!0, {}, i.prototype[t], e[t]) : e[t];
                return n.constructor = a, a.extend = o.extend, a
            }, i.prototype._initOptions = function(e) {
                this.options = l({}, this.options, e)
            }, P = ve.isFunction = function(e) {
                return "function" == typeof e
            }, M = function() {
                this._defaultPrevented = !0
            }, O = function() {
                return this._defaultPrevented === !0
            }, H = i.extend({
                init: function() {
                    this._events = {}
                },
                bind: function(e, t, i) {
                    var o, a, r, s, l, c = this,
                        u = typeof e === Ae ? [e] : e,
                        d = typeof t === Fe;
                    if (t === n) {
                        for (o in e) c.bind(o, e[o]);
                        return c
                    }
                    for (o = 0, a = u.length; o < a; o++) e = u[o], s = d ? t : t[e], s && (i && (r = s, s = function() {
                        c.unbind(e, s), r.apply(c, arguments)
                    }, s.original = r), l = c._events[e] = c._events[e] || [], l.push(s));
                    return c
                },
                one: function(e, t) {
                    return this.bind(e, t, !0)
                },
                first: function(e, t) {
                    var n, i, o, a, r = this,
                        s = typeof e === Ae ? [e] : e,
                        l = typeof t === Fe;
                    for (n = 0, i = s.length; n < i; n++) e = s[n], o = l ? t : t[e], o && (a = r._events[e] = r._events[e] || [], a.unshift(o));
                    return r
                },
                trigger: function(e, t) {
                    var n, i, o = this,
                        a = o._events[e];
                    if (a) {
                        for (t = t || {}, t.sender = o, t._defaultPrevented = !1, t.preventDefault = M, t.isDefaultPrevented = O, a = a.slice(), n = 0, i = a.length; n < i; n++) a[n].call(o, t);
                        return t._defaultPrevented === !0
                    }
                    return !1
                },
                unbind: function(e, t) {
                    var i, o = this,
                        a = o._events[e];
                    if (e === n) o._events = {};
                    else if (a)
                        if (t)
                            for (i = a.length - 1; i >= 0; i--) a[i] !== t && a[i].original !== t || a.splice(i, 1);
                        else o._events[e] = [];
                    return o
                }
            }), z = /^\w+/, V = /\$\{([^}]*)\}/g, B = /\\\}/g, L = /__CURLY__/g, N = /\\#/g, R = /__SHARP__/g, W = ["", "0", "00", "000", "0000"], A = {
                paramName: "data",
                useWithBlock: !0,
                render: function(e, t) {
                    var n, i, o = "";
                    for (n = 0, i = t.length; n < i; n++) o += e(t[n]);
                    return o
                },
                compile: function(e, t) {
                    var n, i, a, r = _e({}, this, t),
                        s = r.paramName,
                        l = s.match(z)[0],
                        c = r.useWithBlock,
                        u = "var $kendoOutput, $kendoHtmlEncode = kendo.htmlEncode;";
                    if (P(e)) return e;
                    for (u += c ? "with(" + s + "){" : "", u += "$kendoOutput=", i = e.replace(B, "__CURLY__").replace(V, "#=$kendoHtmlEncode($1)#").replace(L, "}").replace(N, "__SHARP__").split("#"), a = 0; a < i.length; a++) u += o(i[a], a % 2 === 0);
                    u += c ? ";}" : ";", u += "return $kendoOutput;", u = u.replace(R, "#");
                    try {
                        return n = Function(l, u), n._slotCount = Math.floor(i.length / 2), n
                    } catch (d) {
                        throw Error(ve.format("Invalid template:'{0}' Generated code:'{1}'", e, u))
                    }
                }
            },
            function() {
                function e(e) {
                    return r.lastIndex = 0, r.test(e) ? '"' + e.replace(r, function(e) {
                        var t = s[e];
                        return typeof t === Ae ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + e + '"'
                }

                function t(a, r) {
                    var s, c, u, d, p, h, f = n,
                        m = r[a];
                    if (m && typeof m === Me && typeof m.toJSON === Fe && (m = m.toJSON(a)), typeof o === Fe && (m = o.call(r, a, m)), h = typeof m, h === Ae) return e(m);
                    if (h === Pe) return isFinite(m) ? m + "" : Oe;
                    if (h === He || h === Oe) return m + "";
                    if (h === Me) {
                        if (!m) return Oe;
                        if (n += i, p = [], "[object Array]" === l.apply(m)) {
                            for (d = m.length, s = 0; s < d; s++) p[s] = t(s, m) || Oe;
                            return u = 0 === p.length ? "[]" : n ? "[\n" + n + p.join(",\n" + n) + "\n" + f + "]" : "[" + p.join(",") + "]", n = f, u
                        }
                        if (o && typeof o === Me)
                            for (d = o.length, s = 0; s < d; s++) typeof o[s] === Ae && (c = o[s], u = t(c, m), u && p.push(e(c) + (n ? ": " : ":") + u));
                        else
                            for (c in m) Object.hasOwnProperty.call(m, c) && (u = t(c, m), u && p.push(e(c) + (n ? ": " : ":") + u));
                        return u = 0 === p.length ? "{}" : n ? "{\n" + n + p.join(",\n" + n) + "\n" + f + "}" : "{" + p.join(",") + "}", n = f, u
                    }
                }
                var n, i, o, r = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    s = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    l = {}.toString;
                typeof Date.prototype.toJSON !== Fe && (Date.prototype.toJSON = function() {
                    var e = this;
                    return isFinite(e.valueOf()) ? a(e.getUTCFullYear(), 4) + "-" + a(e.getUTCMonth() + 1) + "-" + a(e.getUTCDate()) + "T" + a(e.getUTCHours()) + ":" + a(e.getUTCMinutes()) + ":" + a(e.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                }), typeof Ce.stringify !== Fe && (Ce.stringify = function(e, a, r) {
                    var s;
                    if (n = "", i = "", typeof r === Pe)
                        for (s = 0; s < r; s += 1) i += " ";
                    else typeof r === Ae && (i = r);
                    if (o = a, a && typeof a !== Fe && (typeof a !== Me || typeof a.length !== Pe)) throw Error("JSON.stringify");
                    return t("", {
                        "": e
                    })
                })
            }(),
            function() {
                function t(e) {
                    if (e) {
                        if (e.numberFormat) return e;
                        if (typeof e === Ae) {
                            var t = ve.cultures;
                            return t[e] || t[e.split("-")[0]] || null
                        }
                        return null
                    }
                    return null
                }

                function i(e) {
                    return e && (e = t(e)), e || ve.cultures.current
                }

                function o(e, t, o) {
                    o = i(o);
                    var r = o.calendars.standard,
                        s = r.days,
                        l = r.months;
                    return t = r.patterns[t] || t, t.replace(u, function(t) {
                        var i, o, c;
                        return "d" === t ? o = e.getDate() : "dd" === t ? o = a(e.getDate()) : "ddd" === t ? o = s.namesAbbr[e.getDay()] : "dddd" === t ? o = s.names[e.getDay()] : "M" === t ? o = e.getMonth() + 1 : "MM" === t ? o = a(e.getMonth() + 1) : "MMM" === t ? o = l.namesAbbr[e.getMonth()] : "MMMM" === t ? o = l.names[e.getMonth()] : "yy" === t ? o = a(e.getFullYear() % 100) : "yyyy" === t ? o = a(e.getFullYear(), 4) : "h" === t ? o = e.getHours() % 12 || 12 : "hh" === t ? o = a(e.getHours() % 12 || 12) : "H" === t ? o = e.getHours() : "HH" === t ? o = a(e.getHours()) : "m" === t ? o = e.getMinutes() : "mm" === t ? o = a(e.getMinutes()) : "s" === t ? o = e.getSeconds() : "ss" === t ? o = a(e.getSeconds()) : "f" === t ? o = xe.floor(e.getMilliseconds() / 100) : "ff" === t ? (o = e.getMilliseconds(), o > 99 && (o = xe.floor(o / 10)), o = a(o)) : "fff" === t ? o = a(e.getMilliseconds(), 3) : "tt" === t ? o = e.getHours() < 12 ? r.AM[0] : r.PM[0] : "zzz" === t ? (i = e.getTimezoneOffset(), c = i < 0, o = ("" + xe.abs(i / 60)).split(".")[0], i = xe.abs(i) - 60 * o, o = (c ? "+" : "-") + a(o), o += ":" + a(i)) : "zz" !== t && "z" !== t || (o = e.getTimezoneOffset() / 60, c = o < 0, o = ("" + xe.abs(o)).split(".")[0], o = (c ? "+" : "-") + ("zz" === t ? a(o) : o)), o !== n ? o : t.slice(1, t.length - 1)
                    })
                }

                function r(e, t, o) {
                    o = i(o);
                    var a, r, c, u, w, k, y, x, C, T, S, D, I, E, F, A, P, M, O, H, z, V, B, L = o.numberFormat,
                        N = L[m],
                        R = L.decimals,
                        W = L.pattern[0],
                        U = [],
                        j = e < 0,
                        q = f,
                        $ = f,
                        G = -1;
                    if (e === n) return f;
                    if (!isFinite(e)) return e;
                    if (!t) return o.name.length ? e.toLocaleString() : "" + e;
                    if (w = d.exec(t)) {
                        if (t = w[1].toLowerCase(), r = "c" === t, c = "p" === t, (r || c) && (L = r ? L.currency : L.percent, N = L[m], R = L.decimals, a = L.symbol, W = L.pattern[j ? 0 : 1]), u = w[2], u && (R = +u), "e" === t) return u ? e.toExponential(R) : e.toExponential();
                        if (c && (e *= 100), e = l(e, R), j = e < 0, e = e.split(m), k = e[0], y = e[1], j && (k = k.substring(1)), $ = s(k, 0, k.length, L), y && ($ += N + y), "n" === t && !j) return $;
                        for (e = f, T = 0, S = W.length; T < S; T++) D = W.charAt(T), e += "n" === D ? $ : "$" === D || "%" === D ? a : D;
                        return e
                    }
                    if ((t.indexOf("'") > -1 || t.indexOf('"') > -1 || t.indexOf("\\") > -1) && (t = t.replace(p, function(e) {
                            var t = e.charAt(0).replace("\\", ""),
                                n = e.slice(1).replace(t, "");
                            return U.push(n), b
                        })), t = t.split(";"), j && t[1]) t = t[1], E = !0;
                    else if (0 === e) {
                        if (t = t[2] || t[0], t.indexOf(v) == -1 && t.indexOf(_) == -1) return t
                    } else t = t[0];
                    if (H = t.indexOf("%"), z = t.indexOf("$"), c = H != -1, r = z != -1, c && (e *= 100), r && "\\" === t[z - 1] && (t = t.split("\\").join(""), r = !1), (r || c) && (L = r ? L.currency : L.percent, N = L[m], R = L.decimals, a = L.symbol), I = t.indexOf(g) > -1, I && (t = t.replace(h, f)), F = t.indexOf(m), S = t.length, F != -1 && (y = ("" + e).split("e"), y = y[1] ? l(e, Math.abs(y[1])) : y[0], y = y.split(m)[1] || f, P = t.lastIndexOf(_) - F, A = t.lastIndexOf(v) - F, M = P > -1, O = A > -1, T = y.length, M || O || (t = t.substring(0, F) + t.substring(F + 1), S = t.length, F = -1, T = 0), M && P > A ? T = P : A > P && (O && T > A ? T = A : M && T < P && (T = P))), e = l(e, T, j), A = t.indexOf(v), V = P = t.indexOf(_), G = A == -1 && P != -1 ? P : A != -1 && P == -1 ? A : A > P ? P : A, A = t.lastIndexOf(v), P = t.lastIndexOf(_), B = A == -1 && P != -1 ? P : A != -1 && P == -1 ? A : A > P ? A : P, G == S && (B = G), G != -1) {
                        for ($ = ("" + e).split(m), k = $[0], y = $[1] || f, x = k.length, C = y.length, j && e * -1 >= 0 && (j = !1), e = t.substring(0, G), j && !E && (e += "-"), T = G; T < S; T++) {
                            if (D = t.charAt(T), F == -1) {
                                if (B - T < x) {
                                    e += k;
                                    break
                                }
                            } else if (P != -1 && P < T && (q = f), F - T <= x && F - T > -1 && (e += k, T = F), F === T) {
                                e += (y ? N : f) + y, T += B - F + 1;
                                continue
                            }
                            D === _ ? (e += D, q = D) : D === v && (e += q)
                        }
                        if (I && (e = s(e, G + (j && !E ? 1 : 0), Math.max(B, x + G), L)), B >= G && (e += t.substring(B + 1)), r || c) {
                            for ($ = f, T = 0, S = e.length; T < S; T++) D = e.charAt(T), $ += "$" === D || "%" === D ? a : D;
                            e = $
                        }
                        if (S = U.length)
                            for (T = 0; T < S; T++) e = e.replace(b, U[T])
                    }
                    return e
                }
                var s, l, c, u = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|zzz|zz|z|"[^"]*"|'[^']*'/g,
                    d = /^(n|c|p|e)(\d*)$/i,
                    p = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g,
                    h = /\,/g,
                    f = "",
                    m = ".",
                    g = ",",
                    v = "#",
                    _ = "0",
                    b = "??",
                    w = "en-US",
                    k = {}.toString;
                ve.cultures["en-US"] = {
                    name: w,
                    numberFormat: {
                        pattern: ["-n"],
                        decimals: 2,
                        ",": ",",
                        ".": ".",
                        groupSize: [3],
                        percent: {
                            pattern: ["-n %", "n %"],
                            decimals: 2,
                            ",": ",",
                            ".": ".",
                            groupSize: [3],
                            symbol: "%"
                        },
                        currency: {
                            name: "US Dollar",
                            abbr: "USD",
                            pattern: ["($n)", "$n"],
                            decimals: 2,
                            ",": ",",
                            ".": ".",
                            groupSize: [3],
                            symbol: "$"
                        }
                    },
                    calendars: {
                        standard: {
                            days: {
                                names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                                namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                            },
                            months: {
                                names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                                namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                            },
                            AM: ["AM", "am", "AM"],
                            PM: ["PM", "pm", "PM"],
                            patterns: {
                                d: "M/d/yyyy",
                                D: "dddd, MMMM dd, yyyy",
                                F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                                g: "M/d/yyyy h:mm tt",
                                G: "M/d/yyyy h:mm:ss tt",
                                m: "MMMM dd",
                                M: "MMMM dd",
                                s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                                t: "h:mm tt",
                                T: "h:mm:ss tt",
                                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                                y: "MMMM, yyyy",
                                Y: "MMMM, yyyy"
                            },
                            "/": "/",
                            ":": ":",
                            firstDay: 0,
                            twoDigitYearMax: 2029
                        }
                    }
                }, ve.culture = function(e) {
                    var i, o = ve.cultures;
                    return e === n ? o.current : (i = t(e) || o[w], i.calendar = i.calendars.standard, o.current = i, n)
                }, ve.findCulture = t, ve.getCulture = i, ve.culture(w), s = function(e, t, i, o) {
                    var a, r, s, l, c, u, d = e.indexOf(o[m]),
                        p = o.groupSize.slice(),
                        h = p.shift();
                    if (i = d !== -1 ? d : i + 1, a = e.substring(t, i), r = a.length, r >= h) {
                        for (s = r, l = []; s > -1;)
                            if (c = a.substring(s - h, s), c && l.push(c), s -= h, u = p.shift(), h = u !== n ? u : h, 0 === h) {
                                s > 0 && l.push(a.substring(0, s));
                                break
                            }
                        a = l.reverse().join(o[g]), e = e.substring(0, t) + a + e.substring(i)
                    }
                    return e
                }, l = function(e, t, n) {
                    return t = t || 0, e = ("" + e).split("e"), e = Math.round(+(e[0] + "e" + (e[1] ? +e[1] + t : t))), n && (e = -e), e = ("" + e).split("e"), e = +(e[0] + "e" + (e[1] ? +e[1] - t : -t)), e.toFixed(Math.min(t, 20))
                }, c = function(e, t, i) {
                    if (t) {
                        if ("[object Date]" === k.call(e)) return o(e, t, i);
                        if (typeof e === Pe) return r(e, t, i)
                    }
                    return e !== n ? e : ""
                }, ve.format = function(e) {
                    var t = arguments;
                    return e.replace(De, function(e, n, i) {
                        var o = t[parseInt(n, 10) + 1];
                        return c(o, i ? i.substring(1) : "")
                    })
                }, ve._extractFormat = function(e) {
                    return "{0:" === e.slice(0, 3) && (e = e.slice(3, e.length - 1)), e
                }, ve._activeElement = function() {
                    try {
                        return document.activeElement
                    } catch (e) {
                        return document.documentElement.activeElement
                    }
                }, ve._round = l, ve._outerWidth = function(t, n) {
                    return e(t).outerWidth(n || !1) || 0
                }, ve._outerHeight = function(t, n) {
                    return e(t).outerHeight(n || !1) || 0
                }, ve.toString = c
            }(),
            function() {
                function t(e, t, n) {
                    return !(e >= t && e <= n)
                }

                function i(e) {
                    return e.charAt(0)
                }

                function o(t) {
                    return e.map(t, i)
                }

                function a(e, t) {
                    t || 23 !== e.getHours() || e.setHours(e.getHours() + 2)
                }

                function r(e) {
                    for (var t = 0, n = e.length, i = []; t < n; t++) i[t] = (e[t] + "").toLowerCase();
                    return i
                }

                function s(e) {
                    var t, n = {};
                    for (t in e) n[t] = r(e[t]);
                    return n
                }

                function l(e, i, r, l) {
                    if (!e) return null;
                    var c, u, d, p, h, g, v, _, b, k, y, x, C, T = function(e) {
                            for (var t = 0; i[V] === e;) t++, V++;
                            return t > 0 && (V -= 1), t
                        },
                        S = function(t) {
                            var n = w[t] || RegExp("^\\d{1," + t + "}"),
                                i = e.substr(B, t).match(n);
                            return i ? (i = i[0], B += i.length, parseInt(i, 10)) : null
                        },
                        D = function(t, n) {
                            for (var i, o, a, r = 0, s = t.length, l = 0, c = 0; r < s; r++) i = t[r], o = i.length, a = e.substr(B, o), n && (a = a.toLowerCase()), a == i && o > l && (l = o, c = r);
                            return l ? (B += l, c + 1) : null
                        },
                        I = function() {
                            var t = !1;
                            return e.charAt(B) === i[V] && (B++, t = !0), t
                        },
                        E = r.calendars.standard,
                        F = null,
                        A = null,
                        P = null,
                        M = null,
                        O = null,
                        H = null,
                        z = null,
                        V = 0,
                        B = 0,
                        L = !1,
                        N = new Date,
                        R = E.twoDigitYearMax || 2029,
                        W = N.getFullYear();
                    for (i || (i = "d"), p = E.patterns[i], p && (i = p), i = i.split(""), d = i.length; V < d; V++)
                        if (c = i[V], L) "'" === c ? L = !1 : I();
                        else if ("d" === c) {
                        if (u = T("d"), E._lowerDays || (E._lowerDays = s(E.days)), null !== P && u > 2) continue;
                        if (P = u < 3 ? S(2) : D(E._lowerDays[3 == u ? "namesAbbr" : "names"], !0), null === P || t(P, 1, 31)) return null
                    } else if ("M" === c) {
                        if (u = T("M"), E._lowerMonths || (E._lowerMonths = s(E.months)), A = u < 3 ? S(2) : D(E._lowerMonths[3 == u ? "namesAbbr" : "names"], !0), null === A || t(A, 1, 12)) return null;
                        A -= 1
                    } else if ("y" === c) {
                        if (u = T("y"), F = S(u), null === F) return null;
                        2 == u && ("string" == typeof R && (R = W + parseInt(R, 10)), F = W - W % 100 + F, F > R && (F -= 100))
                    } else if ("h" === c) {
                        if (T("h"), M = S(2), 12 == M && (M = 0), null === M || t(M, 0, 11)) return null
                    } else if ("H" === c) {
                        if (T("H"), M = S(2), null === M || t(M, 0, 23)) return null
                    } else if ("m" === c) {
                        if (T("m"), O = S(2), null === O || t(O, 0, 59)) return null
                    } else if ("s" === c) {
                        if (T("s"), H = S(2), null === H || t(H, 0, 59)) return null
                    } else if ("f" === c) {
                        if (u = T("f"), C = e.substr(B, u).match(w[3]), z = S(u), null !== z && (z = parseFloat("0." + C[0], 10), z = ve._round(z, 3), z *= 1e3), null === z || t(z, 0, 999)) return null
                    } else if ("t" === c) {
                        if (u = T("t"), _ = E.AM, b = E.PM, 1 === u && (_ = o(_), b = o(b)), h = D(b), !h && !D(_)) return null
                    } else if ("z" === c) {
                        if (g = !0, u = T("z"), "Z" === e.substr(B, 1)) {
                            I();
                            continue
                        }
                        if (v = e.substr(B, 6).match(u > 2 ? m : f), !v) return null;
                        if (v = v[0].split(":"), k = v[0], y = v[1], !y && k.length > 3 && (B = k.length - 2, y = k.substring(B), k = k.substring(0, B)), k = parseInt(k, 10), t(k, -12, 13)) return null;
                        if (u > 2 && (y = v[0][0] + y, y = parseInt(y, 10), isNaN(y) || t(y, -59, 59))) return null
                    } else if ("'" === c) L = !0, I();
                    else if (!I()) return null;
                    return l && !/^\s*$/.test(e.substr(B)) ? null : (x = null !== M || null !== O || H || null, null === F && null === A && null === P && x ? (F = W, A = N.getMonth(), P = N.getDate()) : (null === F && (F = W), null === P && (P = 1)), h && M < 12 && (M += 12), g ? (k && (M += -k), y && (O += -y), e = new Date(Date.UTC(F, A, P, M, O, H, z))) : (e = new Date(F, A, P, M, O, H, z), a(e, M)), F < 100 && e.setFullYear(F), e.getDate() !== P && g === n ? null : e)
                }

                function c(e) {
                    var t = "-" === e.substr(0, 1) ? -1 : 1;
                    return e = e.substring(1), e = 60 * parseInt(e.substr(0, 2), 10) + parseInt(e.substring(2), 10), t * e
                }

                function u(e) {
                    var t, n, i, o = xe.max(_.length, b.length),
                        a = e.calendar.patterns,
                        r = [];
                    for (i = 0; i < o; i++) {
                        for (t = _[i], n = 0; n < t.length; n++) r.push(a[t[n]]);
                        r = r.concat(b[i])
                    }
                    return r
                }

                function d(e, t, n, i) {
                    var o, a, r, s;
                    if ("[object Date]" === k.call(e)) return e;
                    if (o = 0, a = null, e && 0 === e.indexOf("/D") && (a = g.exec(e))) return a = a[1], s = v.exec(a.substring(1)), a = new Date(parseInt(a, 10)), s && (s = c(s[0]), a = ve.timezone.apply(a, 0), a = ve.timezone.convert(a, 0, -1 * s)), a;
                    for (n = ve.getCulture(n), t || (t = u(n)), t = we(t) ? t : [t], r = t.length; o < r; o++)
                        if (a = l(e, t[o], n, i)) return a;
                    return a
                }
                var p = /\u00A0/g,
                    h = /[eE][\-+]?[0-9]+/,
                    f = /[+|\-]\d{1,2}/,
                    m = /[+|\-]\d{1,2}:?\d{2}/,
                    g = /^\/Date\((.*?)\)\/$/,
                    v = /[+-]\d*/,
                    _ = [
                        [],
                        ["G", "g", "F"],
                        ["D", "d", "y", "m", "T", "t"]
                    ],
                    b = [
                        ["yyyy-MM-ddTHH:mm:ss.fffffffzzz", "yyyy-MM-ddTHH:mm:ss.fffffff", "yyyy-MM-ddTHH:mm:ss.fffzzz", "yyyy-MM-ddTHH:mm:ss.fff", "ddd MMM dd yyyy HH:mm:ss", "yyyy-MM-ddTHH:mm:sszzz", "yyyy-MM-ddTHH:mmzzz", "yyyy-MM-ddTHH:mmzz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-dd HH:mm:ss", "yyyy/MM/dd HH:mm:ss"],
                        ["yyyy-MM-ddTHH:mm", "yyyy-MM-dd HH:mm", "yyyy/MM/dd HH:mm"],
                        ["yyyy/MM/dd", "yyyy-MM-dd", "HH:mm:ss", "HH:mm"]
                    ],
                    w = {
                        2: /^\d{1,2}/,
                        3: /^\d{1,3}/,
                        4: /^\d{4}/
                    },
                    k = {}.toString;
                ve.parseDate = function(e, t, n) {
                    return d(e, t, n, !1)
                }, ve.parseExactDate = function(e, t, n) {
                    return d(e, t, n, !0)
                }, ve.parseInt = function(e, t) {
                    var n = ve.parseFloat(e, t);
                    return n && (n = 0 | n), n
                }, ve.parseFloat = function(e, t, n) {
                    if (!e && 0 !== e) return null;
                    if (typeof e === Pe) return e;
                    e = "" + e, t = ve.getCulture(t);
                    var i, o, a = t.numberFormat,
                        r = a.percent,
                        s = a.currency,
                        l = s.symbol,
                        c = r.symbol,
                        u = e.indexOf("-");
                    return h.test(e) ? (e = parseFloat(e.replace(a["."], ".")), isNaN(e) && (e = null), e) : u > 0 ? null : (u = u > -1, e.indexOf(l) > -1 || n && n.toLowerCase().indexOf("c") > -1 ? (a = s, i = a.pattern[0].replace("$", l).split("n"), e.indexOf(i[0]) > -1 && e.indexOf(i[1]) > -1 && (e = e.replace(i[0], "").replace(i[1], ""), u = !0)) : e.indexOf(c) > -1 && (o = !0, a = r, l = c), e = e.replace("-", "").replace(l, "").replace(p, " ").split(a[","].replace(p, " ")).join("").replace(a["."], "."), e = parseFloat(e), isNaN(e) ? e = null : u && (e *= -1), e && o && (e /= 100), e)
                }
            }(),
            function() {
                var i, o, a, r, s, l, c, d, p, h;
                Te._scrollbar = n, Te.scrollbar = function(e) {
                    if (isNaN(Te._scrollbar) || e) {
                        var t, n = document.createElement("div");
                        return n.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block", n.innerHTML = "&nbsp;", document.body.appendChild(n), Te._scrollbar = t = n.offsetWidth - n.scrollWidth, document.body.removeChild(n), t
                    }
                    return Te._scrollbar
                }, Te.isRtl = function(t) {
                    return e(t).closest(".k-rtl").length > 0
                }, i = document.createElement("table");
                try {
                    i.innerHTML = "<tr><td></td></tr>", Te.tbodyInnerHtml = !0
                } catch (f) {
                    Te.tbodyInnerHtml = !1
                }
                Te.touch = "ontouchstart" in t, o = document.documentElement.style, a = Te.transitions = !1, r = Te.transforms = !1, s = "HTMLElement" in t ? HTMLElement.prototype : [], Te.hasHW3D = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix || "MozPerspective" in o || "msPerspective" in o, Te.cssFlexbox = "flexWrap" in o || "WebkitFlexWrap" in o || "msFlexWrap" in o, be(["Moz", "webkit", "O", "ms"], function() {
                    var e, t = "" + this,
                        n = typeof i.style[t + "Transition"] === Ae;
                    if (n || typeof i.style[t + "Transform"] === Ae) return e = t.toLowerCase(), r = {
                        css: "ms" != e ? "-" + e + "-" : "",
                        prefix: t,
                        event: "o" === e || "webkit" === e ? e : ""
                    }, n && (a = r, a.event = a.event ? a.event + "TransitionEnd" : "transitionend"), !1
                }), i = null, Te.transforms = r, Te.transitions = a, Te.devicePixelRatio = t.devicePixelRatio === n ? 1 : t.devicePixelRatio;
                try {
                    Te.screenWidth = t.outerWidth || t.screen ? t.screen.availWidth : t.innerWidth, Te.screenHeight = t.outerHeight || t.screen ? t.screen.availHeight : t.innerHeight
                } catch (f) {
                    Te.screenWidth = t.screen.availWidth, Te.screenHeight = t.screen.availHeight
                }
                Te.detectOS = function(e) {
                        var n, i, o = !1,
                            a = [],
                            r = !/mobile safari/i.test(e),
                            s = {
                                wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
                                fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
                                android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,
                                iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                                ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                                meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                                webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
                                blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
                                playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
                                windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,
                                tizen: /(tizen).*?Version\/(\d+)\.(\d+(\.\d+)?)/i,
                                sailfish: /(sailfish).*rv:(\d+)\.(\d+(\.\d+)?).*firefox/i,
                                ffos: /(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/
                            },
                            l = {
                                ios: /^i(phone|pad|pod)$/i,
                                android: /^android|fire$/i,
                                blackberry: /^blackberry|playbook/i,
                                windows: /windows/,
                                wp: /wp/,
                                flat: /sailfish|ffos|tizen/i,
                                meego: /meego/
                            },
                            c = {
                                tablet: /playbook|ipad|fire/i
                            },
                            d = {
                                omini: /Opera\sMini/i,
                                omobile: /Opera\sMobi/i,
                                firefox: /Firefox|Fennec/i,
                                mobilesafari: /version\/.*safari/i,
                                ie: /MSIE|Windows\sPhone/i,
                                chrome: /chrome|crios/i,
                                webkit: /webkit/i
                            };
                        for (i in s)
                            if (s.hasOwnProperty(i) && (a = e.match(s[i]))) {
                                if ("windows" == i && "plugins" in navigator) return !1;
                                o = {}, o.device = i, o.tablet = u(i, c, !1), o.browser = u(e, d, "default"), o.name = u(i, l), o[o.name] = !0, o.majorVersion = a[2], o.minorVersion = a[3].replace("_", "."), n = o.minorVersion.replace(".", "").substr(0, 2), o.flatVersion = o.majorVersion + n + Array(3 - (n.length < 3 ? n.length : 2)).join("0"), o.cordova = typeof t.PhoneGap !== ze || typeof t.cordova !== ze, o.appMode = t.navigator.standalone || /file|local|wmapp/.test(t.location.protocol) || o.cordova, o.android && (Te.devicePixelRatio < 1.5 && o.flatVersion < 400 || r) && (Te.screenWidth > 800 || Te.screenHeight > 800) && (o.tablet = i);
                                break
                            }
                        return o
                    }, l = Te.mobileOS = Te.detectOS(navigator.userAgent), Te.wpDevicePixelRatio = l.wp ? screen.width / 320 : 0, Te.hasNativeScrolling = !1, (l.ios || l.android && l.majorVersion > 2 || l.wp) && (Te.hasNativeScrolling = l), Te.delayedClick = function() {
                        if (Te.touch) {
                            if (l.ios) return !0;
                            if (l.android) return !Te.browser.chrome || !(Te.browser.version < 32) && !(e("meta[name=viewport]").attr("content") || "").match(/user-scalable=no/i)
                        }
                        return !1
                    }, Te.mouseAndTouchPresent = Te.touch && !(Te.mobileOS.ios || Te.mobileOS.android), Te.detectBrowser = function(e) {
                        var t, n = !1,
                            i = [],
                            o = {
                                edge: /(edge)[ \/]([\w.]+)/i,
                                webkit: /(chrome|crios)[ \/]([\w.]+)/i,
                                safari: /(webkit)[ \/]([\w.]+)/i,
                                opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
                                msie: /(msie\s|trident.*? rv:)([\w.]+)/i,
                                mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                            };
                        for (t in o)
                            if (o.hasOwnProperty(t) && (i = e.match(o[t]))) {
                                n = {}, n[t] = !0, n[i[1].toLowerCase().split(" ")[0].split("/")[0]] = !0, n.version = parseInt(document.documentMode || i[2], 10);
                                break
                            }
                        return n
                    }, Te.browser = Te.detectBrowser(navigator.userAgent), Te.detectClipboardAccess = function() {
                        var e = {
                            copy: !!document.queryCommandSupported && document.queryCommandSupported("copy"),
                            cut: !!document.queryCommandSupported && document.queryCommandSupported("cut"),
                            paste: !!document.queryCommandSupported && document.queryCommandSupported("paste")
                        };
                        return Te.browser.chrome && (e.paste = !1, Te.browser.version >= 43 && (e.copy = !0, e.cut = !0)), e
                    }, Te.clipboard = Te.detectClipboardAccess(), Te.zoomLevel = function() {
                        var e, n, i;
                        try {
                            return e = Te.browser, n = 0, i = document.documentElement, e.msie && 11 == e.version && i.scrollHeight > i.clientHeight && !Te.touch && (n = Te.scrollbar()), Te.touch ? i.clientWidth / t.innerWidth : e.msie && e.version >= 10 ? ((top || t).document.documentElement.offsetWidth + n) / (top || t).innerWidth : 1
                        } catch (o) {
                            return 1
                        }
                    }, Te.cssBorderSpacing = n !== o.borderSpacing && !(Te.browser.msie && Te.browser.version < 8),
                    function(t) {
                        var n = "",
                            i = e(document.documentElement),
                            o = parseInt(t.version, 10);
                        t.msie ? n = "ie" : t.mozilla ? n = "ff" : t.safari ? n = "safari" : t.webkit ? n = "webkit" : t.opera ? n = "opera" : t.edge && (n = "edge"), n && (n = "k-" + n + " k-" + n + o), Te.mobileOS && (n += " k-mobile"), Te.cssFlexbox || (n += " k-no-flexbox"), i.addClass(n)
                    }(Te.browser), Te.eventCapture = document.documentElement.addEventListener, c = document.createElement("input"), Te.placeholder = "placeholder" in c, Te.propertyChangeEvent = "onpropertychange" in c, Te.input = function() {
                        for (var e, t = ["number", "date", "time", "month", "week", "datetime", "datetime-local"], n = t.length, i = "test", o = {}, a = 0; a < n; a++) e = t[a], c.setAttribute("type", e), c.value = i, o[e.replace("-", "")] = "text" !== c.type && c.value !== i;
                        return o
                    }(), c.style.cssText = "float:left;", Te.cssFloat = !!c.style.cssFloat, c = null, Te.stableSort = function() {
                        var e, t = 513,
                            n = [{
                                index: 0,
                                field: "b"
                            }];
                        for (e = 1; e < t; e++) n.push({
                            index: e,
                            field: "a"
                        });
                        return n.sort(function(e, t) {
                            return e.field > t.field ? 1 : e.field < t.field ? -1 : 0
                        }), 1 === n[0].index
                    }(), Te.matchesSelector = s.webkitMatchesSelector || s.mozMatchesSelector || s.msMatchesSelector || s.oMatchesSelector || s.matchesSelector || s.matches || function(t) {
                        for (var n = document.querySelectorAll ? (this.parentNode || document).querySelectorAll(t) || [] : e(t), i = n.length; i--;)
                            if (n[i] == this) return !0;
                        return !1
                    }, Te.pushState = t.history && t.history.pushState, d = document.documentMode, Te.hashChange = "onhashchange" in t && !(Te.browser.msie && (!d || d <= 8)), Te.customElements = "registerElement" in t.document, p = Te.browser.chrome, h = Te.browser.mozilla, Te.msPointers = !p && t.MSPointerEvent, Te.pointers = !p && !h && t.PointerEvent, Te.kineticScrollNeeded = l && (Te.touch || Te.msPointers || Te.pointers)
            }(), U = {
                left: {
                    reverse: "right"
                },
                right: {
                    reverse: "left"
                },
                down: {
                    reverse: "up"
                },
                up: {
                    reverse: "down"
                },
                top: {
                    reverse: "bottom"
                },
                bottom: {
                    reverse: "top"
                },
                "in": {
                    reverse: "out"
                },
                out: {
                    reverse: "in"
                }
            }, j = {}, e.extend(j, {
                enabled: !0,
                Element: function(t) {
                    this.element = e(t)
                },
                promise: function(e, t) {
                    e.is(":visible") || e.css({
                        display: e.data("olddisplay") || "block"
                    }).css("display"), t.hide && e.data("olddisplay", e.css("display")).hide(), t.init && t.init(), t.completeCallback && t.completeCallback(e), e.dequeue()
                },
                disable: function() {
                    this.enabled = !1, this.promise = this.promiseShim
                },
                enable: function() {
                    this.enabled = !0, this.promise = this.animatedPromise
                }
            }), j.promiseShim = j.promise, "kendoAnimate" in e.fn || _e(e.fn, {
                kendoStop: function(e, t) {
                    return this.stop(e, t)
                },
                kendoAnimate: function(e, t, n, i) {
                    return k(this, e, t, n, i)
                },
                kendoAddClass: function(e, t) {
                    return ve.toggleClass(this, e, t, !0)
                },
                kendoRemoveClass: function(e, t) {
                    return ve.toggleClass(this, e, t, !1)
                },
                kendoToggleClass: function(e, t, n) {
                    return ve.toggleClass(this, e, t, n)
                }
            }), q = /&/g, $ = /</g, G = /"/g, Y = /'/g, K = />/g, Q = function(e) {
                return e.target
            }, Te.touch && (Q = function(e) {
                var t = "originalEvent" in e ? e.originalEvent.changedTouches : "changedTouches" in e ? e.changedTouches : null;
                return t ? document.elementFromPoint(t[0].clientX, t[0].clientY) : e.target
            }, be(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(t, n) {
                e.fn[n] = function(e) {
                    return this.bind(n, e)
                }
            })), Te.touch ? Te.mobileOS ? (Te.mousedown = "touchstart", Te.mouseup = "touchend", Te.mousemove = "touchmove", Te.mousecancel = "touchcancel", Te.click = "touchend", Te.resize = "orientationchange") : (Te.mousedown = "mousedown touchstart", Te.mouseup = "mouseup touchend", Te.mousemove = "mousemove touchmove", Te.mousecancel = "mouseleave touchcancel", Te.click = "click", Te.resize = "resize") : Te.pointers ? (Te.mousemove = "pointermove", Te.mousedown = "pointerdown", Te.mouseup = "pointerup", Te.mousecancel = "pointercancel", Te.click = "pointerup", Te.resize = "orientationchange resize") : Te.msPointers ? (Te.mousemove = "MSPointerMove", Te.mousedown = "MSPointerDown", Te.mouseup = "MSPointerUp", Te.mousecancel = "MSPointerCancel", Te.click = "MSPointerUp", Te.resize = "orientationchange resize") : (Te.mousemove = "mousemove", Te.mousedown = "mousedown", Te.mouseup = "mouseup", Te.mousecancel = "mouseleave", Te.click = "click", Te.resize = "resize"), J = function(e, t) {
                var n, i, o, a, r = t || "d",
                    s = 1;
                for (i = 0, o = e.length; i < o; i++) a = e[i], "" !== a && (n = a.indexOf("["), 0 !== n && (n == -1 ? a = "." + a : (s++, a = "." + a.substring(0, n) + " || {})" + a.substring(n))), s++, r += a + (i < o - 1 ? " || {})" : ")"));
                return Array(s).join("(") + r
            }, X = /^([a-z]+:)?\/\//i, _e(ve, {
                widgets: [],
                _widgetRegisteredCallbacks: [],
                ui: ve.ui || {},
                fx: ve.fx || b,
                effects: ve.effects || j,
                mobile: ve.mobile || {},
                data: ve.data || {},
                dataviz: ve.dataviz || {},
                drawing: ve.drawing || {},
                spreadsheet: {
                    messages: {}
                },
                keys: {
                    INSERT: 45,
                    DELETE: 46,
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    ESC: 27,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    END: 35,
                    HOME: 36,
                    SPACEBAR: 32,
                    PAGEUP: 33,
                    PAGEDOWN: 34,
                    F2: 113,
                    F10: 121,
                    F12: 123,
                    NUMPAD_PLUS: 107,
                    NUMPAD_MINUS: 109,
                    NUMPAD_DOT: 110
                },
                support: ve.support || Te,
                animate: ve.animate || k,
                ns: "",
                attr: function(e) {
                    return "data-" + ve.ns + e
                },
                getShadows: r,
                wrap: s,
                deepExtend: l,
                getComputedStyles: h,
                webComponents: ve.webComponents || [],
                isScrollable: f,
                scrollLeft: m,
                size: g,
                toCamelCase: p,
                toHyphens: d,
                getOffset: ve.getOffset || v,
                parseEffects: ve.parseEffects || _,
                toggleClass: ve.toggleClass || y,
                directions: ve.directions || U,
                Observable: H,
                Class: i,
                Template: A,
                template: ke(A.compile, A),
                render: ke(A.render, A),
                stringify: ke(Ce.stringify, Ce),
                eventTarget: Q,
                htmlEncode: x,
                isLocalUrl: function(e) {
                    return e && !X.test(e)
                },
                expr: function(e, t, n) {
                    return e = e || "", typeof t == Ae && (n = t, t = !1), n = n || "d", e && "[" !== e.charAt(0) && (e = "." + e), t ? (e = e.replace(/"([^.]*)\.([^"]*)"/g, '"$1_$DOT$_$2"'), e = e.replace(/'([^.]*)\.([^']*)'/g, "'$1_$DOT$_$2'"), e = J(e.split("."), n), e = e.replace(/_\$DOT\$_/g, ".")) : e = n + e, e
                },
                getter: function(e, t) {
                    var n = e + t;
                    return Ve[n] = Ve[n] || Function("d", "return " + ve.expr(e, t))
                },
                setter: function(e) {
                    return Be[e] = Be[e] || Function("d,value", ve.expr(e) + "=value")
                },
                accessor: function(e) {
                    return {
                        get: ve.getter(e),
                        set: ve.setter(e)
                    }
                },
                guid: function() {
                    var e, t, n = "";
                    for (e = 0; e < 32; e++) t = 16 * xe.random() | 0, 8 != e && 12 != e && 16 != e && 20 != e || (n += "-"), n += (12 == e ? 4 : 16 == e ? 3 & t | 8 : t).toString(16);
                    return n
                },
                roleSelector: function(e) {
                    return e.replace(/(\S+)/g, "[" + ve.attr("role") + "=$1],").slice(0, -1)
                },
                directiveSelector: function(e) {
                    var t, n = e.split(" ");
                    if (n)
                        for (t = 0; t < n.length; t++) "view" != n[t] && (n[t] = n[t].replace(/(\w*)(view|bar|strip|over)$/, "$1-$2"));
                    return n.join(" ").replace(/(\S+)/g, "kendo-mobile-$1,").slice(0, -1)
                },
                triggeredByInput: function(e) {
                    return /^(label|input|textarea|select)$/i.test(e.target.tagName)
                },
                onWidgetRegistered: function(e) {
                    for (var t = 0, n = ve.widgets.length; t < n; t++) e(ve.widgets[t]);
                    ve._widgetRegisteredCallbacks.push(e)
                },
                logToConsole: function(e, i) {
                    var o = t.console;
                    !ve.suppressLog && n !== o && o.log && o[i || "log"](e)
                }
            }), Z = H.extend({
                init: function(e, t) {
                    var n, i = this;
                    i.element = ve.jQuery(e).handler(i), i.angular("init", t), H.fn.init.call(i), n = t ? t.dataSource : null, n && (t = _e({}, t, {
                        dataSource: {}
                    })), t = i.options = _e(!0, {}, i.options, t), n && (t.dataSource = n), i.element.attr(ve.attr("role")) || i.element.attr(ve.attr("role"), (t.name || "").toLowerCase()), i.element.data("kendo" + t.prefix + t.name, i), i.bind(i.events, t)
                },
                events: [],
                options: {
                    prefix: ""
                },
                _hasBindingTarget: function() {
                    return !!this.element[0].kendoBindingTarget
                },
                _tabindex: function(e) {
                    e = e || this.wrapper;
                    var t = this.element,
                        n = "tabindex",
                        i = e.attr(n) || t.attr(n);
                    t.removeAttr(n), e.attr(n, isNaN(i) ? 0 : i)
                },
                setOptions: function(t) {
                    this._setEvents(t), e.extend(this.options, t)
                },
                _setEvents: function(e) {
                    for (var t, n = this, i = 0, o = n.events.length; i < o; i++) t = n.events[i], n.options[t] && e[t] && n.unbind(t, n.options[t]);
                    n.bind(n.events, e)
                },
                resize: function(e) {
                    var t = this.getSize(),
                        n = this._size;
                    (e || (t.width > 0 || t.height > 0) && (!n || t.width !== n.width || t.height !== n.height)) && (this._size = t, this._resize(t, e), this.trigger("resize", t))
                },
                getSize: function() {
                    return ve.dimensions(this.element)
                },
                size: function(e) {
                    return e ? (this.setSize(e), n) : this.getSize()
                },
                setSize: e.noop,
                _resize: e.noop,
                destroy: function() {
                    var e = this;
                    e.element.removeData("kendo" + e.options.prefix + e.options.name), e.element.removeData("handler"), e.unbind()
                },
                _destroy: function() {
                    this.destroy()
                },
                angular: function() {},
                _muteAngularRebind: function(e) {
                    this._muteRebind = !0, e.call(this), this._muteRebind = !1
                }
            }), ee = Z.extend({
                dataItems: function() {
                    return this.dataSource.flatView()
                },
                _angularItems: function(t) {
                    var n = this;
                    n.angular(t, function() {
                        return {
                            elements: n.items(),
                            data: e.map(n.dataItems(), function(e) {
                                return {
                                    dataItem: e
                                }
                            })
                        }
                    })
                }
            }), ve.dimensions = function(e, t) {
                var n = e[0];
                return t && e.css(t), {
                    width: n.offsetWidth,
                    height: n.offsetHeight
                }
            }, ve.notify = ye, te = /template$/i, ne = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/, ie = /^\{(\d+)(:[^\}]+)?\}|^\[[A-Za-z_]+\]$/, oe = /([A-Z])/g, ve.initWidget = function(i, o, a) {
                var r, s, l, c, u, d, p, h, f, m, g, v, _;
                if (a ? a.roles && (a = a.roles) : a = ve.ui.roles, i = i.nodeType ? i : i[0], d = i.getAttribute("data-" + ve.ns + "role")) {
                    f = d.indexOf(".") === -1, l = f ? a[d] : ve.getter(d)(t), g = e(i).data(), v = l ? "kendo" + l.fn.options.prefix + l.fn.options.name : "", m = f ? RegExp("^kendo.*" + d + "$", "i") : RegExp("^" + v + "$", "i");
                    for (_ in g)
                        if (_.match(m)) {
                            if (_ !== v) return g[_];
                            r = g[_]
                        }
                    if (l) {
                        for (h = C(i, "dataSource"), o = e.extend({}, T(i, l.fn.options), o), h && (o.dataSource = typeof h === Ae ? ve.getter(h)(t) : h), c = 0, u = l.fn.events.length; c < u; c++) s = l.fn.events[c], p = C(i, s), p !== n && (o[s] = ve.getter(p)(t));
                        return r ? e.isEmptyObject(o) || r.setOptions(o) : r = new l(i, o), r
                    }
                }
            }, ve.rolesFromNamespaces = function(e) {
                var t, n, i = [];
                for (e[0] || (e = [ve.ui, ve.dataviz.ui]), t = 0, n = e.length; t < n; t++) i[t] = e[t].roles;
                return _e.apply(null, [{}].concat(i.reverse()))
            }, ve.init = function(t) {
                var n = ve.rolesFromNamespaces(Le.call(arguments, 1));
                e(t).find("[data-" + ve.ns + "role]").addBack().each(function() {
                    ve.initWidget(this, {}, n)
                })
            }, ve.destroy = function(t) {
                e(t).find("[data-" + ve.ns + "role]").addBack().each(function() {
                    var t, n = e(this).data();
                    for (t in n) 0 === t.indexOf("kendo") && typeof n[t].destroy === Fe && n[t].destroy()
                })
            }, ve.resize = function(t, n) {
                var i, o = e(t).find("[data-" + ve.ns + "role]").addBack().filter(D);
                o.length && (i = e.makeArray(o), i.sort(S), e.each(i, function() {
                    var t = ve.widgetInstance(e(this));
                    t && t.resize(n)
                }))
            }, ve.parseOptions = T, _e(ve.ui, {
                Widget: Z,
                DataBoundWidget: ee,
                roles: {},
                progress: function(t, n, i) {
                    var o, a, r, s, l, c = t.find(".k-loading-mask"),
                        u = ve.support,
                        d = u.browser;
                    i = e.extend({}, {
                        width: "100%",
                        height: "100%",
                        top: t.scrollTop(),
                        opacity: !1
                    }, i), l = i.opacity ? "k-loading-mask k-opaque" : "k-loading-mask", n ? c.length || (o = u.isRtl(t), a = o ? "right" : "left", s = t.scrollLeft(), r = d.webkit && o ? t[0].scrollWidth - t.width() - 2 * s : 0, c = e(ve.format("<div class='{0}'><span class='k-loading-text'>{1}</span><div class='k-loading-image'/><div class='k-loading-color'/></div>", l, ve.ui.progress.messages.loading)).width(i.width).height(i.height).css("top", i.top).css(a, Math.abs(s) + r).prependTo(t)) : c && c.remove()
                },
                plugin: function(t, i, o) {
                    var a, r, s, l, c = t.fn.options.name;
                    for (i = i || ve.ui, o = o || "", i[c] = t, i.roles[c.toLowerCase()] = t, a = "getKendo" + o + c, c = "kendo" + o + c, r = {
                            name: c,
                            widget: t,
                            prefix: o || ""
                        }, ve.widgets.push(r), s = 0, l = ve._widgetRegisteredCallbacks.length; s < l; s++) ve._widgetRegisteredCallbacks[s](r);
                    e.fn[c] = function(i) {
                        var o, a = this;
                        return typeof i === Ae ? (o = Le.call(arguments, 1), this.each(function() {
                            var t, r, s = e.data(this, c);
                            if (!s) throw Error(ve.format("Cannot call method '{0}' of {1} before it is initialized", i, c));
                            if (t = s[i], typeof t !== Fe) throw Error(ve.format("Cannot find method '{0}' of {1}", i, c));
                            if (r = t.apply(s, o), r !== n) return a = r, !1
                        })) : this.each(function() {
                            return new t(this, i)
                        }), a
                    }, e.fn[c].widget = t, e.fn[a] = function() {
                        return this.data(c)
                    }
                }
            }), ve.ui.progress.messages = {
                loading: "Loading..."
            }, ae = {
                bind: function() {
                    return this
                },
                nullObject: !0,
                options: {}
            }, re = Z.extend({
                init: function(e, t) {
                    Z.fn.init.call(this, e, t), this.element.autoApplyNS(), this.wrapper = this.element, this.element.addClass("km-widget")
                },
                destroy: function() {
                    Z.fn.destroy.call(this), this.element.kendoDestroy()
                },
                options: {
                    prefix: "Mobile"
                },
                events: [],
                view: function() {
                    var e = this.element.closest(ve.roleSelector("view splitview modalview drawer"));
                    return ve.widgetInstance(e, ve.mobile.ui) || ae
                },
                viewHasNativeScrolling: function() {
                    var e = this.view();
                    return e && e.options.useNativeScrolling
                },
                container: function() {
                    var e = this.element.closest(ve.roleSelector("view layout modalview drawer splitview"));
                    return ve.widgetInstance(e.eq(0), ve.mobile.ui) || ae
                }
            }), _e(ve.mobile, {
                init: function(e) {
                    ve.init(e, ve.mobile.ui, ve.ui, ve.dataviz.ui)
                },
                appLevelNativeScrolling: function() {
                    return ve.mobile.application && ve.mobile.application.options && ve.mobile.application.options.useNativeScrolling
                },
                roles: {},
                ui: {
                    Widget: re,
                    DataBoundWidget: ee.extend(re.prototype),
                    roles: {},
                    plugin: function(e) {
                        ve.ui.plugin(e, ve.mobile.ui, "Mobile")
                    }
                }
            }), l(ve.dataviz, {
                init: function(e) {
                    ve.init(e, ve.dataviz.ui)
                },
                ui: {
                    roles: {},
                    themes: {},
                    views: [],
                    plugin: function(e) {
                        ve.ui.plugin(e, ve.dataviz.ui)
                    }
                },
                roles: {}
            }), ve.touchScroller = function(t, n) {
                return n || (n = {}), n.useNative = !0, e(t).map(function(t, i) {
                    return i = e(i), !(!Te.kineticScrollNeeded || !ve.mobile.ui.Scroller || i.data("kendoMobileScroller")) && (i.kendoMobileScroller(n), i.data("kendoMobileScroller"))
                })[0]
            }, ve.preventDefault = function(e) {
                e.preventDefault()
            }, ve.widgetInstance = function(e, n) {
                var i, o, a, r, s, l = e.data(ve.ns + "role"),
                    c = [];
                if (l) {
                    if ("content" === l && (l = "scroller"), "editortoolbar" === l && (a = e.data("kendoEditorToolbar"))) return a;
                    if (n)
                        if (n[0])
                            for (i = 0, o = n.length; i < o; i++) c.push(n[i].roles[l]);
                        else c.push(n.roles[l]);
                    else c = [ve.ui.roles[l], ve.dataviz.ui.roles[l], ve.mobile.ui.roles[l]];
                    for (l.indexOf(".") >= 0 && (c = [ve.getter(l)(t)]), i = 0, o = c.length; i < o; i++)
                        if (r = c[i], r && (s = e.data("kendo" + r.fn.options.prefix + r.fn.options.name))) return s
                }
            }, ve.onResize = function(n) {
                var i = n;
                return Te.mobileOS.android && (i = function() {
                    setTimeout(n, 600)
                }), e(t).on(Te.resize, i), i
            }, ve.unbindResize = function(n) {
                e(t).off(Te.resize, n)
            }, ve.attrValue = function(e, t) {
                return e.data(ve.ns + t)
            }, ve.days = {
                Sunday: 0,
                Monday: 1,
                Tuesday: 2,
                Wednesday: 3,
                Thursday: 4,
                Friday: 5,
                Saturday: 6
            }, e.extend(e.expr[":"], {
                kendoFocusable: function(t) {
                    var n = e.attr(t, "tabindex");
                    return I(t, !isNaN(n) && n > -1)
                }
            }), se = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"], le = "label, input, [data-rel=external]", ce = {
                setupMouseMute: function() {
                    var t, n = 0,
                        i = se.length,
                        o = document.documentElement;
                    if (!ce.mouseTrap && Te.eventCapture)
                        for (ce.mouseTrap = !0, ce.bustClick = !1, ce.captureMouse = !1, t = function(t) {
                                ce.captureMouse && ("click" === t.type ? ce.bustClick && !e(t.target).is(le) && (t.preventDefault(), t.stopPropagation()) : t.stopPropagation())
                            }; n < i; n++) o.addEventListener(se[n], t, !0)
                },
                muteMouse: function(e) {
                    ce.captureMouse = !0, e.data.bustClick && (ce.bustClick = !0), clearTimeout(ce.mouseTrapTimeoutID)
                },
                unMuteMouse: function() {
                    clearTimeout(ce.mouseTrapTimeoutID), ce.mouseTrapTimeoutID = setTimeout(function() {
                        ce.captureMouse = !1, ce.bustClick = !1
                    }, 400)
                }
            }, ue = {
                down: "touchstart mousedown",
                move: "mousemove touchmove",
                up: "mouseup touchend touchcancel",
                cancel: "mouseleave touchcancel"
            }, Te.touch && (Te.mobileOS.ios || Te.mobileOS.android) ? ue = {
                down: "touchstart",
                move: "touchmove",
                up: "touchend touchcancel",
                cancel: "touchcancel"
            } : Te.pointers ? ue = {
                down: "pointerdown",
                move: "pointermove",
                up: "pointerup",
                cancel: "pointercancel pointerleave"
            } : Te.msPointers && (ue = {
                down: "MSPointerDown",
                move: "MSPointerMove",
                up: "MSPointerUp",
                cancel: "MSPointerCancel MSPointerLeave"
            }), !Te.msPointers || "onmspointerenter" in t || e.each({
                MSPointerEnter: "MSPointerOver",
                MSPointerLeave: "MSPointerOut"
            }, function(t, n) {
                e.event.special[t] = {
                    delegateType: n,
                    bindType: n,
                    handle: function(t) {
                        var i, o = this,
                            a = t.relatedTarget,
                            r = t.handleObj;
                        return a && (a === o || e.contains(o, a)) || (t.type = r.origType, i = r.handler.apply(this, arguments), t.type = n), i
                    }
                }
            }), de = function(e) {
                return ue[e] || e
            }, pe = /([^ ]+)/g, ve.applyEventMap = function(e, t) {
                return e = e.replace(pe, de), t && (e = e.replace(pe, "$1." + t)), e
            }, he = e.fn.on, _e(!0, F, e), F.fn = F.prototype = new e, F.fn.constructor = F, F.fn.init = function(t, n) {
                return n && n instanceof e && !(n instanceof F) && (n = F(n)), e.fn.init.call(this, t, n, fe)
            }, F.fn.init.prototype = F.fn, fe = F(document), _e(F.fn, {
                handler: function(e) {
                    return this.data("handler", e), this
                },
                autoApplyNS: function(e) {
                    return this.data("kendoNS", e || ve.guid()), this
                },
                on: function() {
                    var e, t, n, i, o, a, r = this,
                        s = r.data("kendoNS");
                    return 1 === arguments.length ? he.call(r, arguments[0]) : (e = r, t = Le.call(arguments), typeof t[t.length - 1] === ze && t.pop(), n = t[t.length - 1], i = ve.applyEventMap(t[0], s), Te.mouseAndTouchPresent && i.search(/mouse|click/) > -1 && this[0] !== document.documentElement && (ce.setupMouseMute(), o = 2 === t.length ? null : t[1], a = i.indexOf("click") > -1 && i.indexOf("touchend") > -1, he.call(this, {
                        touchstart: ce.muteMouse,
                        touchend: ce.unMuteMouse
                    }, o, {
                        bustClick: a
                    })), typeof n === Ae && (e = r.data("handler"), n = e[n], t[t.length - 1] = function(t) {
                        n.call(e, t)
                    }), t[0] = i, he.apply(r, t), r)
                },
                kendoDestroy: function(e) {
                    return e = e || this.data("kendoNS"), e && this.off("." + e), this
                }
            }), ve.jQuery = F, ve.eventMap = ue, ve.timezone = function() {
                function e(e, t) {
                    var n, i, o, a = t[3],
                        r = t[4],
                        s = t[5],
                        l = t[8];
                    return l || (t[8] = l = {}), l[e] ? l[e] : (isNaN(r) ? 0 === r.indexOf("last") ? (n = new Date(Date.UTC(e, u[a] + 1, 1, s[0] - 24, s[1], s[2], 0)), i = d[r.substr(4, 3)], o = n.getUTCDay(), n.setUTCDate(n.getUTCDate() + i - o - (i > o ? 7 : 0))) : r.indexOf(">=") >= 0 && (n = new Date(Date.UTC(e, u[a], r.substr(5), s[0], s[1], s[2], 0)), i = d[r.substr(0, 3)], o = n.getUTCDay(), n.setUTCDate(n.getUTCDate() + i - o + (i < o ? 7 : 0))) : n = new Date(Date.UTC(e, u[a], r, s[0], s[1], s[2], 0)), l[e] = n)
                }

                function t(t, n, i) {
                    var o, a, r, s;
                    return (n = n[i]) ? (r = new Date(t).getUTCFullYear(), n = jQuery.grep(n, function(e) {
                        var t = e[0],
                            n = e[1];
                        return t <= r && (n >= r || t == r && "only" == n || "max" == n)
                    }), n.push(t), n.sort(function(t, n) {
                        return "number" != typeof t && (t = +e(r, t)), "number" != typeof n && (n = +e(r, n)), t - n
                    }), s = n[jQuery.inArray(t, n) - 1] || n[n.length - 1], isNaN(s) ? s : null) : (o = i.split(":"), a = 0, o.length > 1 && (a = 60 * o[0] + +o[1]), [-1e6, "max", "-", "Jan", 1, [0, 0, 0], a, "-"])
                }

                function n(e, t, n) {
                    var i, o, a, r = t[n];
                    if ("string" == typeof r && (r = t[r]), !r) throw Error('Timezone "' + n + '" is either incorrect, or kendo.timezones.min.js is not included.');
                    for (i = r.length - 1; i >= 0 && (o = r[i][3], !(o && e > o)); i--);
                    if (a = r[i + 1], !a) throw Error('Timezone "' + n + '" not found on ' + e + ".");
                    return a
                }

                function i(e, i, o, a) {
                    typeof e != Pe && (e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
                    var r = n(e, i, a);
                    return {
                        zone: r,
                        rule: t(e, o, r[1])
                    }
                }

                function o(e, t) {
                    var n, o, a;
                    return "Etc/UTC" == t || "Etc/GMT" == t ? 0 : (n = i(e, this.zones, this.rules, t), o = n.zone, a = n.rule, ve.parseFloat(a ? o[0] - a[6] : o[0]))
                }

                function a(e, t) {
                    var n = i(e, this.zones, this.rules, t),
                        o = n.zone,
                        a = n.rule,
                        r = o[2];
                    return r.indexOf("/") >= 0 ? r.split("/")[a && +a[6] ? 1 : 0] : r.indexOf("%s") >= 0 ? r.replace("%s", a && "-" != a[7] ? a[7] : "") : r
                }

                function r(e, t, n) {
                    var i, o, a, r = n;
                    return typeof t == Ae && (t = this.offset(e, t)), typeof n == Ae && (n = this.offset(e, n)), o = e.getTimezoneOffset(), e = new Date(e.getTime() + 6e4 * (t - n)), a = e.getTimezoneOffset(), typeof r == Ae && (r = this.offset(e, r)), i = a - o + (n - r), new Date(e.getTime() + 6e4 * i)
                }

                function s(e, t) {
                    return this.convert(e, e.getTimezoneOffset(), t)
                }

                function l(e, t) {
                    return this.convert(e, t, e.getTimezoneOffset())
                }

                function c(e) {
                    return this.apply(new Date(e), "Etc/UTC")
                }
                var u = {
                        Jan: 0,
                        Feb: 1,
                        Mar: 2,
                        Apr: 3,
                        May: 4,
                        Jun: 5,
                        Jul: 6,
                        Aug: 7,
                        Sep: 8,
                        Oct: 9,
                        Nov: 10,
                        Dec: 11
                    },
                    d = {
                        Sun: 0,
                        Mon: 1,
                        Tue: 2,
                        Wed: 3,
                        Thu: 4,
                        Fri: 5,
                        Sat: 6
                    };
                return {
                    zones: {},
                    rules: {},
                    offset: o,
                    convert: r,
                    apply: s,
                    remove: l,
                    abbr: a,
                    toLocalDate: c
                }
            }(), ve.date = function() {
                function e(e, t) {
                    return 0 === t && 23 === e.getHours() && (e.setHours(e.getHours() + 2), !0)
                }

                function t(t, n, i) {
                    var o = t.getHours();
                    i = i || 1, n = (n - t.getDay() + 7 * i) % 7, t.setDate(t.getDate() + n), e(t, o)
                }

                function i(e, n, i) {
                    return e = new Date(e), t(e, n, i), e
                }

                function o(e) {
                    return new Date(e.getFullYear(), e.getMonth(), 1)
                }

                function a(e) {
                    var t = new Date(e.getFullYear(), e.getMonth() + 1, 0),
                        n = o(e),
                        i = Math.abs(t.getTimezoneOffset() - n.getTimezoneOffset());
                    return i && t.setHours(n.getHours() + i / 60), t
                }

                function r(e, t) {
                    return 1 !== t ? f(i(e, t, -1), 4) : f(e, 4 - (e.getDay() || 7))
                }

                function s(e, t) {
                    var n = new Date(e.getFullYear(), 0, 1, (-6)),
                        i = r(e, t),
                        o = i.getTime() - n.getTime(),
                        a = Math.floor(o / k);
                    return 1 + Math.floor(a / 7)
                }

                function l(e, t) {
                    var i, o, a;
                    return t === n && (t = ve.culture().calendar.firstDay), i = f(e, -7), o = f(e, 7), a = s(e, t), 0 === a ? s(i, t) + 1 : 53 === a && s(o, t) > 1 ? 1 : a
                }

                function c(t) {
                    return t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0), e(t, 0), t
                }

                function u(e) {
                    return Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds())
                }

                function d(e) {
                    return b(e).getTime() - c(b(e))
                }

                function p(e, t, n) {
                    var i, o = d(t),
                        a = d(n);
                    return !e || o == a || (t >= n && (n += k), i = d(e), o > i && (i += k), a < o && (a += k), i >= o && i <= a)
                }

                function h(e, t, n) {
                    var i, o = t.getTime(),
                        a = n.getTime();
                    return o >= a && (a += k), i = e.getTime(), i >= o && i <= a
                }

                function f(t, n) {
                    var i = t.getHours();
                    return t = new Date(t), m(t, n * k), e(t, i), t
                }

                function m(e, t, n) {
                    var i, o = e.getTimezoneOffset();
                    e.setTime(e.getTime() + t), n || (i = e.getTimezoneOffset() - o, e.setTime(e.getTime() + i * w))
                }

                function g(t, n) {
                    return t = new Date(ve.date.getDate(t).getTime() + ve.date.getMilliseconds(n)), e(t, n.getHours()), t
                }

                function v() {
                    return c(new Date)
                }

                function _(e) {
                    return c(e).getTime() == v().getTime()
                }

                function b(e) {
                    var t = new Date(1980, 1, 1, 0, 0, 0);
                    return e && t.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()), t
                }
                var w = 6e4,
                    k = 864e5;
                return {
                    adjustDST: e,
                    dayOfWeek: i,
                    setDayOfWeek: t,
                    getDate: c,
                    isInDateRange: h,
                    isInTimeRange: p,
                    isToday: _,
                    nextDay: function(e) {
                        return f(e, 1)
                    },
                    previousDay: function(e) {
                        return f(e, -1)
                    },
                    toUtcTime: u,
                    MS_PER_DAY: k,
                    MS_PER_HOUR: 60 * w,
                    MS_PER_MINUTE: w,
                    setTime: m,
                    setHours: g,
                    addDays: f,
                    today: v,
                    toInvariantTime: b,
                    firstDayOfMonth: o,
                    lastDayOfMonth: a,
                    weekInYear: l,
                    getMilliseconds: d
                }
            }(), ve.stripWhitespace = function(e) {
                var t, n, i;
                if (document.createNodeIterator)
                    for (t = document.createNodeIterator(e, NodeFilter.SHOW_TEXT, function(t) {
                            return t.parentNode == e ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
                        }, !1); t.nextNode();) t.referenceNode && !t.referenceNode.textContent.trim() && t.referenceNode.parentNode.removeChild(t.referenceNode);
                else
                    for (n = 0; n < e.childNodes.length; n++) i = e.childNodes[n], 3 != i.nodeType || /\S/.test(i.nodeValue) || (e.removeChild(i), n--), 1 == i.nodeType && ve.stripWhitespace(i)
            }, me = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
                setTimeout(e, 1e3 / 60)
            }, ve.animationFrame = function(e) {
                me.call(t, e)
            }, ge = [], ve.queueAnimation = function(e) {
                ge[ge.length] = e, 1 === ge.length && ve.runNextAnimation()
            }, ve.runNextAnimation = function() {
                ve.animationFrame(function() {
                    ge[0] && (ge.shift()(), ge[0] && ve.runNextAnimation())
                })
            }, ve.parseQueryStringParams = function(e) {
                for (var t = e.split("?")[1] || "", n = {}, i = t.split(/&|=/), o = i.length, a = 0; a < o; a += 2) "" !== i[a] && (n[decodeURIComponent(i[a])] = decodeURIComponent(i[a + 1]));
                return n
            }, ve.elementUnderCursor = function(e) {
                if (n !== e.x.client) return document.elementFromPoint(e.x.client, e.y.client)
            }, ve.wheelDeltaY = function(e) {
                var t, i = e.originalEvent,
                    o = i.wheelDeltaY;
                return i.wheelDelta ? (o === n || o) && (t = i.wheelDelta) : i.detail && i.axis === i.VERTICAL_AXIS && (t = 10 * -i.detail), t
            }, ve.throttle = function(e, t) {
                var i, o, a = 0;
                return !t || t <= 0 ? e : (o = function() {
                    function o() {
                        e.apply(r, l), a = +new Date
                    }
                    var r = this,
                        s = +new Date - a,
                        l = arguments;
                    return a ? (i && clearTimeout(i), s > t ? o() : i = setTimeout(o, t - s), n) : o()
                }, o.cancel = function() {
                    clearTimeout(i)
                }, o)
            }, ve.caret = function(t, i, o) {
                var a, r, s, l, c, u = i !== n;
                if (o === n && (o = i), t[0] && (t = t[0]), !u || !t.disabled) {
                    try {
                        t.selectionStart !== n ? u ? (t.focus(), r = Te.mobileOS, r.wp || r.android ? setTimeout(function() {
                            t.setSelectionRange(i, o)
                        }, 0) : t.setSelectionRange(i, o)) : i = [t.selectionStart, t.selectionEnd] : document.selection && (e(t).is(":visible") && t.focus(), a = t.createTextRange(), u ? (a.collapse(!0), a.moveStart("character", i), a.moveEnd("character", o - i), a.select()) : (s = a.duplicate(), a.moveToBookmark(document.selection.createRange().getBookmark()), s.setEndPoint("EndToStart", a), l = s.text.length, c = l + a.text.length, i = [l, c]))
                    } catch (d) {
                        i = []
                    }
                    return i
                }
            }, ve.compileMobileDirective = function(e, n) {
                var i = t.angular;
                return e.attr("data-" + ve.ns + "role", e[0].tagName.toLowerCase().replace("kendo-mobile-", "").replace("-", "")), i.element(e).injector().invoke(["$compile", function(t) {
                    t(e)(n), /^\$(digest|apply)$/.test(n.$$phase) || n.$digest()
                }]), ve.widgetInstance(e, ve.mobile.ui)
            }, ve.antiForgeryTokens = function() {
                var t = {},
                    i = e("meta[name=csrf-token],meta[name=_csrf]").attr("content"),
                    o = e("meta[name=csrf-param],meta[name=_csrf_header]").attr("content");
                return e("input[name^='__RequestVerificationToken']").each(function() {
                    t[this.name] = this.value
                }), o !== n && i !== n && (t[o] = i), t
            }, ve.cycleForm = function(e) {
                function t(e) {
                    var t = ve.widgetInstance(e);
                    t && t.focus ? t.focus() : e.focus()
                }
                var n = e.find("input, .k-widget").first(),
                    i = e.find("button, .k-button").last();
                i.on("keydown", function(e) {
                    e.keyCode != ve.keys.TAB || e.shiftKey || (e.preventDefault(), t(n))
                }), n.on("keydown", function(e) {
                    e.keyCode == ve.keys.TAB && e.shiftKey && (e.preventDefault(), t(i))
                })
            }, ve.focusElement = function(n) {
                var i = [],
                    o = n.parentsUntil("body").filter(function(e, t) {
                        var n = ve.getComputedStyles(t, ["overflow"]);
                        return "visible" !== n.overflow
                    }).add(t);
                o.each(function(t, n) {
                    i[t] = e(n).scrollTop()
                });
                try {
                    n[0].setActive()
                } catch (a) {
                    n[0].focus()
                }
                o.each(function(t, n) {
                    e(n).scrollTop(i[t])
                })
            },
            function() {
                function n(t, n, i, o) {
                    var a, r, s = e("<form>").attr({
                            action: i,
                            method: "POST",
                            target: o
                        }),
                        l = ve.antiForgeryTokens();
                    l.fileName = n, a = t.split(";base64,"), l.contentType = a[0].replace("data:", ""), l.base64 = a[1];
                    for (r in l) l.hasOwnProperty(r) && e("<input>").attr({
                        value: l[r],
                        name: r,
                        type: "hidden"
                    }).appendTo(s);
                    s.appendTo("body").submit().remove()
                }

                function i(e, t) {
                    var n, i, o, a, r, s = e;
                    if ("string" == typeof e) {
                        for (n = e.split(";base64,"), i = n[0], o = atob(n[1]), a = new Uint8Array(o.length), r = 0; r < o.length; r++) a[r] = o.charCodeAt(r);
                        s = new Blob([a.buffer], {
                            type: i
                        })
                    }
                    navigator.msSaveBlob(s, t)
                }

                function o(e, n) {
                    t.Blob && e instanceof Blob && (e = URL.createObjectURL(e)), a.download = n, a.href = e;
                    var i = document.createEvent("MouseEvents");
                    i.initMouseEvent("click", !0, !1, t, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), a.dispatchEvent(i), setTimeout(function() {
                        URL.revokeObjectURL(e)
                    })
                }
                var a = document.createElement("a"),
                    r = "download" in a && !ve.support.browser.edge;
                ve.saveAs = function(e) {
                    var t = n;
                    e.forceProxy || (r ? t = o : navigator.msSaveBlob && (t = i)), t(e.dataURI, e.fileName, e.proxyURL, e.proxyTarget)
                }
            }(), ve.proxyModelSetters = function(e) {
                var t = {};
                return Object.keys(e || {}).forEach(function(n) {
                    Object.defineProperty(t, n, {
                        get: function() {
                            return e[n]
                        },
                        set: function(t) {
                            e[n] = t, e.dirty = !0
                        }
                    })
                }), t
            }
    }(jQuery, window), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.router.min", ["kendo.core.min"], e)
}(function() {
    return function(e, t) {
            function n(e, t) {
                if (!t) return e;
                e + "/" === t && (e = t);
                var n = RegExp("^" + t, "i");
                return n.test(e) || (e = t + "/" + e), h.protocol + "//" + (h.host + "/" + e).replace(/\/\/+/g, "/")
            }

            function i(e) {
                return e ? "#!" : "#"
            }

            function o(e) {
                var t = h.href;
                return "#!" === e && t.indexOf("#") > -1 && t.indexOf("#!") < 0 ? null : t.split(e)[1] || ""
            }

            function a(e, t) {
                return 0 === t.indexOf(e) ? t.substr(e.length).replace(/\/\//g, "/") : t
            }

            function r(e) {
                return e.replace(/^(#)?/, "#")
            }

            function s(e) {
                return e.replace(/^(#(!)?)?/, "#!")
            }
            var l = window.kendo,
                c = "change",
                u = "back",
                d = "same",
                p = l.support,
                h = window.location,
                f = window.history,
                m = 50,
                g = l.support.browser.msie,
                v = /^#*/,
                _ = window.document,
                b = l.Class.extend({
                    back: function() {
                        g ? setTimeout(function() {
                            f.back()
                        }) : f.back()
                    },
                    forward: function() {
                        g ? setTimeout(function() {
                            f.forward()
                        }) : f.forward()
                    },
                    length: function() {
                        return f.length
                    },
                    replaceLocation: function(e) {
                        h.replace(e)
                    }
                }),
                w = b.extend({
                    init: function(e) {
                        this.root = e
                    },
                    navigate: function(e) {
                        f.pushState({}, _.title, n(e, this.root))
                    },
                    replace: function(e) {
                        f.replaceState({}, _.title, n(e, this.root))
                    },
                    normalize: function(e) {
                        return a(this.root, e)
                    },
                    current: function() {
                        var e = h.pathname;
                        return h.search && (e += h.search), a(this.root, e)
                    },
                    change: function(t) {
                        e(window).bind("popstate.kendo", t)
                    },
                    stop: function() {
                        e(window).unbind("popstate.kendo")
                    },
                    normalizeCurrent: function(e) {
                        var t, a = e.root,
                            r = h.pathname,
                            s = o(i(e.hashBang));
                        a === r + "/" && (t = a), a === r && s && (t = n(s.replace(v, ""), a)), t && f.pushState({}, _.title, t)
                    }
                }),
                k = b.extend({
                    init: function(e) {
                        this._id = l.guid(), this.prefix = i(e), this.fix = e ? s : r
                    },
                    navigate: function(e) {
                        h.hash = this.fix(e)
                    },
                    replace: function(e) {
                        this.replaceLocation(this.fix(e))
                    },
                    normalize: function(e) {
                        return e.indexOf(this.prefix) < 0 ? e : e.split(this.prefix)[1]
                    },
                    change: function(t) {
                        p.hashChange ? e(window).on("hashchange." + this._id, t) : this._interval = setInterval(t, m)
                    },
                    stop: function() {
                        e(window).off("hashchange." + this._id), clearInterval(this._interval)
                    },
                    current: function() {
                        return o(this.prefix)
                    },
                    normalizeCurrent: function(e) {
                        var t = h.pathname,
                            n = e.root;
                        return !(!e.pushState || n === t) && (this.replaceLocation(n + this.prefix + a(n, t)), !0)
                    }
                }),
                y = l.Observable.extend({
                    start: function(t) {
                        if (t = t || {}, this.bind([c, u, d], t), !this._started) {
                            this._started = !0, t.root = t.root || "/";
                            var n, i = this.createAdapter(t);
                            i.normalizeCurrent(t) || (n = i.current(), e.extend(this, {
                                adapter: i,
                                root: t.root,
                                historyLength: i.length(),
                                current: n,
                                locations: [n]
                            }), i.change(e.proxy(this, "_checkUrl")))
                        }
                    },
                    createAdapter: function(e) {
                        return p.pushState && e.pushState ? new w(e.root) : new k(e.hashBang)
                    },
                    stop: function() {
                        this._started && (this.adapter.stop(), this.unbind(c), this._started = !1)
                    },
                    change: function(e) {
                        this.bind(c, e)
                    },
                    replace: function(e, t) {
                        this._navigate(e, t, function(t) {
                            t.replace(e), this.locations[this.locations.length - 1] = this.current
                        })
                    },
                    navigate: function(e, n) {
                        return "#:back" === e ? (this.backCalled = !0, this.adapter.back(), t) : (this._navigate(e, n, function(t) {
                            t.navigate(e), this.locations.push(this.current)
                        }), t)
                    },
                    _navigate: function(e, n, i) {
                        var o = this.adapter;
                        return e = o.normalize(e), this.current === e || this.current === decodeURIComponent(e) ? (this.trigger(d), t) : (!n && this.trigger(c, {
                            url: e,
                            decode: !1
                        }) || (this.current = e, i.call(this, o), this.historyLength = o.length()), t)
                    },
                    _checkUrl: function() {
                        var e = this.adapter,
                            n = e.current(),
                            i = e.length(),
                            o = this.historyLength === i,
                            a = n === this.locations[this.locations.length - 2] && o,
                            r = this.backCalled,
                            s = this.current;
                        return null === n || this.current === n || this.current === decodeURIComponent(n) || (this.historyLength = i, this.backCalled = !1, this.current = n, a && this.trigger("back", {
                            url: s,
                            to: n
                        }) ? (e.forward(), this.current = s, t) : this.trigger(c, {
                            url: n,
                            backButtonPressed: !r
                        }) ? (a ? e.forward() : (e.back(), this.historyLength--), this.current = s, t) : (a ? this.locations.pop() : this.locations.push(n), t))
                    }
                });
            l.History = y, l.History.HistoryAdapter = b, l.History.HashAdapter = k, l.History.PushStateAdapter = w, l.absoluteURL = n, l.history = new y
        }(window.kendo.jQuery),
        function() {
            function e(e, t) {
                return t ? e : "([^/]+)"
            }

            function t(t, n) {
                return RegExp("^" + t.replace(f, "\\$&").replace(d, "(?:$1)?").replace(p, e).replace(h, "(.*?)") + "$", n ? "i" : "")
            }

            function n(e) {
                return e.replace(/(\?.*)|(#.*)/g, "")
            }
            var i = window.kendo,
                o = i.history,
                a = i.Observable,
                r = "init",
                s = "routeMissing",
                l = "change",
                c = "back",
                u = "same",
                d = /\((.*?)\)/g,
                p = /(\(\?)?:\w+/g,
                h = /\*\w+/g,
                f = /[\-{}\[\]+?.,\\\^$|#\s]/g,
                m = i.Class.extend({
                    init: function(e, n, i) {
                        e instanceof RegExp || (e = t(e, i)), this.route = e, this._callback = n
                    },
                    callback: function(e, t, o) {
                        var a, r, s = 0,
                            l = i.parseQueryStringParams(e);
                        if (l._back = t, e = n(e), a = this.route.exec(e).slice(1), r = a.length, o)
                            for (; s < r; s++) void 0 !== a[s] && (a[s] = decodeURIComponent(a[s]));
                        a.push(l), this._callback.apply(null, a)
                    },
                    worksWith: function(e, t, i) {
                        return !!this.route.test(n(e)) && (this.callback(e, t, i), !0)
                    }
                }),
                g = a.extend({
                    init: function(e) {
                        e || (e = {}), a.fn.init.call(this), this.routes = [], this.pushState = e.pushState, this.hashBang = e.hashBang, this.root = e.root, this.ignoreCase = e.ignoreCase !== !1, this.bind([r, s, l, u], e)
                    },
                    destroy: function() {
                        o.unbind(l, this._urlChangedProxy), o.unbind(u, this._sameProxy), o.unbind(c, this._backProxy), this.unbind()
                    },
                    start: function() {
                        var e, t = this,
                            n = function() {
                                t._same()
                            },
                            i = function(e) {
                                t._back(e)
                            },
                            a = function(e) {
                                t._urlChanged(e)
                            };
                        o.start({
                            same: n,
                            change: a,
                            back: i,
                            pushState: t.pushState,
                            hashBang: t.hashBang,
                            root: t.root
                        }), e = {
                            url: o.current || "/",
                            preventDefault: $.noop
                        }, t.trigger(r, e) || t._urlChanged(e), this._urlChangedProxy = a, this._backProxy = i
                    },
                    route: function(e, t) {
                        this.routes.push(new m(e, t, this.ignoreCase))
                    },
                    navigate: function(e, t) {
                        i.history.navigate(e, t)
                    },
                    replace: function(e, t) {
                        i.history.replace(e, t)
                    },
                    _back: function(e) {
                        this.trigger(c, {
                            url: e.url,
                            to: e.to
                        }) && e.preventDefault()
                    },
                    _same: function() {
                        this.trigger(u)
                    },
                    _urlChanged: function(e) {
                        var t, n, o, a, r = e.url,
                            c = !!e.decode,
                            u = e.backButtonPressed;
                        if (r || (r = "/"), this.trigger(l, {
                                url: e.url,
                                params: i.parseQueryStringParams(e.url),
                                backButtonPressed: u
                            })) return void e.preventDefault();
                        for (t = 0, n = this.routes, a = n.length; t < a; t++)
                            if (o = n[t], o.worksWith(r, u, c)) return;
                        this.trigger(s, {
                            url: r,
                            params: i.parseQueryStringParams(r),
                            backButtonPressed: u
                        }) && e.preventDefault()
                    }
                });
            i.Router = g
        }(), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.userevents.min", ["kendo.core.min"], e)
}(function() {
    return function(e, t) {
        function n(e, t) {
            var n = e.x.location,
                i = e.y.location,
                o = t.x.location,
                a = t.y.location,
                r = n - o,
                s = i - a;
            return {
                center: {
                    x: (n + o) / 2,
                    y: (i + a) / 2
                },
                distance: Math.sqrt(r * r + s * s)
            }
        }

        function i(e) {
            var t, n, i, o = [],
                a = e.originalEvent,
                s = e.currentTarget,
                l = 0;
            if (e.api) o.push({
                id: 2,
                event: e,
                target: e.target,
                currentTarget: e.target,
                location: e,
                type: "api"
            });
            else if (e.type.match(/touch/))
                for (n = a ? a.changedTouches : [], t = n.length; l < t; l++) i = n[l], o.push({
                    location: i,
                    event: e,
                    target: i.target,
                    currentTarget: s,
                    id: i.identifier,
                    type: "touch"
                });
            else o.push(r.pointers || r.msPointers ? {
                location: a,
                event: e,
                target: e.target,
                currentTarget: s,
                id: a.pointerId,
                type: "pointer"
            } : {
                id: 1,
                event: e,
                target: e.target,
                currentTarget: s,
                location: e,
                type: "mouse"
            });
            return o
        }

        function o(e) {
            for (var t = a.eventMap.up.split(" "), n = 0, i = t.length; n < i; n++) e(t[n])
        }
        var a = window.kendo,
            r = a.support,
            s = a.Class,
            l = a.Observable,
            c = e.now,
            u = e.extend,
            d = r.mobileOS,
            p = d && d.android,
            h = 800,
            f = r.browser.msie ? 5 : 0,
            m = "press",
            g = "hold",
            v = "select",
            _ = "start",
            b = "move",
            w = "end",
            k = "cancel",
            y = "tap",
            x = "release",
            C = "gesturestart",
            T = "gesturechange",
            S = "gestureend",
            D = "gesturetap",
            I = {
                api: 0,
                touch: 0,
                mouse: 9,
                pointer: 9
            },
            E = !r.touch || r.mouseAndTouchPresent,
            F = s.extend({
                init: function(e, t) {
                    var n = this;
                    n.axis = e, n._updateLocationData(t), n.startLocation = n.location, n.velocity = n.delta = 0, n.timeStamp = c()
                },
                move: function(e) {
                    var t = this,
                        n = e["page" + t.axis],
                        i = c(),
                        o = i - t.timeStamp || 1;
                    !n && p || (t.delta = n - t.location, t._updateLocationData(e), t.initialDelta = n - t.startLocation, t.velocity = t.delta / o, t.timeStamp = i)
                },
                _updateLocationData: function(e) {
                    var t = this,
                        n = t.axis;
                    t.location = e["page" + n], t.client = e["client" + n], t.screen = e["screen" + n]
                }
            }),
            A = s.extend({
                init: function(e, t, n) {
                    u(this, {
                        x: new F("X", n.location),
                        y: new F("Y", n.location),
                        type: n.type,
                        useClickAsTap: e.useClickAsTap,
                        threshold: e.threshold || I[n.type],
                        userEvents: e,
                        target: t,
                        currentTarget: n.currentTarget,
                        initialTouch: n.target,
                        id: n.id,
                        pressEvent: n,
                        _moved: !1,
                        _finished: !1
                    })
                },
                press: function() {
                    this._holdTimeout = setTimeout(e.proxy(this, "_hold"), this.userEvents.minHold), this._trigger(m, this.pressEvent)
                },
                _hold: function() {
                    this._trigger(g, this.pressEvent)
                },
                move: function(e) {
                    var t = this;
                    if (!t._finished) {
                        if (t.x.move(e.location), t.y.move(e.location), !t._moved) {
                            if (t._withinIgnoreThreshold()) return;
                            if (P.current && P.current !== t.userEvents) return t.dispose();
                            t._start(e)
                        }
                        t._finished || t._trigger(b, e)
                    }
                },
                end: function(e) {
                    this.endTime = c(), this._finished || (this._finished = !0, this._trigger(x, e), this._moved ? this._trigger(w, e) : this.useClickAsTap || this._trigger(y, e), clearTimeout(this._holdTimeout), this.dispose())
                },
                dispose: function() {
                    var t = this.userEvents,
                        n = t.touches;
                    this._finished = !0, this.pressEvent = null, clearTimeout(this._holdTimeout), n.splice(e.inArray(this, n), 1)
                },
                skip: function() {
                    this.dispose()
                },
                cancel: function() {
                    this.dispose()
                },
                isMoved: function() {
                    return this._moved
                },
                _start: function(e) {
                    clearTimeout(this._holdTimeout), this.startTime = c(), this._moved = !0, this._trigger(_, e)
                },
                _trigger: function(e, t) {
                    var n = this,
                        i = t.event,
                        o = {
                            touch: n,
                            x: n.x,
                            y: n.y,
                            target: n.target,
                            event: i
                        };
                    n.userEvents.notify(e, o) && i.preventDefault()
                },
                _withinIgnoreThreshold: function() {
                    var e = this.x.initialDelta,
                        t = this.y.initialDelta;
                    return Math.sqrt(e * e + t * t) <= this.threshold
                }
            }),
            P = l.extend({
                init: function(t, n) {
                    var i, s, c, d, p = this,
                        I = a.guid();
                    n = n || {}, i = p.filter = n.filter, p.threshold = n.threshold || f, p.minHold = n.minHold || h, p.touches = [], p._maxTouches = n.multiTouch ? 2 : 1, p.allowSelection = n.allowSelection, p.captureUpIfMoved = n.captureUpIfMoved, p.useClickAsTap = !n.fastTap && !r.delayedClick(), p.eventNS = I, t = e(t).handler(p), l.fn.init.call(p), u(p, {
                        element: t,
                        surface: e(n.global && E ? t[0].ownerDocument.documentElement : n.surface || t),
                        stopPropagation: n.stopPropagation,
                        pressed: !1
                    }), p.surface.handler(p).on(a.applyEventMap("move", I), "_move").on(a.applyEventMap("up cancel", I), "_end"), t.on(a.applyEventMap("down", I), i, "_start"), p.useClickAsTap && t.on(a.applyEventMap("click", I), i, "_click"), (r.pointers || r.msPointers) && (r.browser.version < 11 ? (s = "pinch-zoom double-tap-zoom", t.css("-ms-touch-action", n.touchAction && "none" != n.touchAction ? s + " " + n.touchAction : s)) : t.css("touch-action", n.touchAction || "none")), n.preventDragEvent && t.on(a.applyEventMap("dragstart", I), a.preventDefault), t.on(a.applyEventMap("mousedown", I), i, {
                        root: t
                    }, "_select"), p.captureUpIfMoved && r.eventCapture && (c = p.surface[0], d = e.proxy(p.preventIfMoving, p), o(function(e) {
                        c.addEventListener(e, d, !0)
                    })), p.bind([m, g, y, _, b, w, x, k, C, T, S, D, v], n)
                },
                preventIfMoving: function(e) {
                    this._isMoved() && e.preventDefault()
                },
                destroy: function() {
                    var e, t = this;
                    t._destroyed || (t._destroyed = !0, t.captureUpIfMoved && r.eventCapture && (e = t.surface[0], o(function(n) {
                        e.removeEventListener(n, t.preventIfMoving)
                    })), t.element.kendoDestroy(t.eventNS), t.surface.kendoDestroy(t.eventNS), t.element.removeData("handler"), t.surface.removeData("handler"), t._disposeAll(), t.unbind(), delete t.surface, delete t.element, delete t.currentTarget)
                },
                capture: function() {
                    P.current = this
                },
                cancel: function() {
                    this._disposeAll(), this.trigger(k)
                },
                notify: function(e, t) {
                    var i = this,
                        o = i.touches;
                    if (this._isMultiTouch()) {
                        switch (e) {
                            case b:
                                e = T;
                                break;
                            case w:
                                e = S;
                                break;
                            case y:
                                e = D
                        }
                        u(t, {
                            touches: o
                        }, n(o[0], o[1]))
                    }
                    return this.trigger(e, u(t, {
                        type: e
                    }))
                },
                press: function(e, t, n) {
                    this._apiCall("_start", e, t, n)
                },
                move: function(e, t) {
                    this._apiCall("_move", e, t)
                },
                end: function(e, t) {
                    this._apiCall("_end", e, t)
                },
                _isMultiTouch: function() {
                    return this.touches.length > 1
                },
                _maxTouchesReached: function() {
                    return this.touches.length >= this._maxTouches
                },
                _disposeAll: function() {
                    for (var e = this.touches; e.length > 0;) e.pop().dispose()
                },
                _isMoved: function() {
                    return e.grep(this.touches, function(e) {
                        return e.isMoved()
                    }).length
                },
                _select: function(e) {
                    this.allowSelection && !this.trigger(v, {
                        event: e
                    }) || e.preventDefault()
                },
                _start: function(t) {
                    var n, o, a = this,
                        r = 0,
                        s = a.filter,
                        l = i(t),
                        c = l.length,
                        u = t.which;
                    if (!(u && u > 1 || a._maxTouchesReached()))
                        for (P.current = null, a.currentTarget = t.currentTarget, a.stopPropagation && t.stopPropagation(); r < c && !a._maxTouchesReached(); r++) o = l[r], n = s ? e(o.currentTarget) : a.element, n.length && (o = new A(a, n, o), a.touches.push(o), o.press(), a._isMultiTouch() && a.notify("gesturestart", {}))
                },
                _move: function(e) {
                    this._eachTouch("move", e)
                },
                _end: function(e) {
                    this._eachTouch("end", e)
                },
                _click: function(t) {
                    var n = {
                        touch: {
                            initialTouch: t.target,
                            target: e(t.currentTarget),
                            endTime: c(),
                            x: {
                                location: t.pageX,
                                client: t.clientX
                            },
                            y: {
                                location: t.pageY,
                                client: t.clientY
                            }
                        },
                        x: t.pageX,
                        y: t.pageY,
                        target: e(t.currentTarget),
                        event: t,
                        type: "tap"
                    };
                    this.trigger("tap", n) && t.preventDefault()
                },
                _eachTouch: function(e, t) {
                    var n, o, a, r, s = this,
                        l = {},
                        c = i(t),
                        u = s.touches;
                    for (n = 0; n < u.length; n++) o = u[n], l[o.id] = o;
                    for (n = 0; n < c.length; n++) a = c[n], r = l[a.id], r && r[e](a)
                },
                _apiCall: function(t, n, i, o) {
                    this[t]({
                        api: !0,
                        pageX: n,
                        pageY: i,
                        clientX: n,
                        clientY: i,
                        target: e(o || this.element)[0],
                        stopPropagation: e.noop,
                        preventDefault: e.noop
                    })
                }
            });
        P.defaultThreshold = function(e) {
            f = e
        }, P.minHold = function(e) {
            h = e
        }, a.getTouches = i, a.touchDelta = n, a.UserEvents = P
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.touch.min", ["kendo.core.min", "kendo.userevents.min"], e)
}(function() {
    return function(e, t) {
        var n = window.kendo,
            i = n.ui.Widget,
            o = e.proxy,
            a = Math.abs,
            r = 20,
            s = i.extend({
                init: function(e, t) {
                    function a(e) {
                        return function(t) {
                            s._triggerTouch(e, t)
                        }
                    }

                    function r(e) {
                        return function(t) {
                            s.trigger(e, {
                                touches: t.touches,
                                distance: t.distance,
                                center: t.center,
                                event: t.event
                            })
                        }
                    }
                    var s = this;
                    i.fn.init.call(s, e, t), t = s.options, e = s.element, s.wrapper = e, s.events = new n.UserEvents(e, {
                        filter: t.filter,
                        surface: t.surface,
                        minHold: t.minHold,
                        multiTouch: t.multiTouch,
                        allowSelection: !0,
                        fastTap: t.fastTap,
                        press: a("touchstart"),
                        hold: a("hold"),
                        tap: o(s, "_tap"),
                        gesturestart: r("gesturestart"),
                        gesturechange: r("gesturechange"),
                        gestureend: r("gestureend")
                    }), t.enableSwipe ? (s.events.bind("start", o(s, "_swipestart")), s.events.bind("move", o(s, "_swipemove"))) : (s.events.bind("start", o(s, "_dragstart")), s.events.bind("move", a("drag")), s.events.bind("end", a("dragend"))), n.notify(s)
                },
                events: ["touchstart", "dragstart", "drag", "dragend", "tap", "doubletap", "hold", "swipe", "gesturestart", "gesturechange", "gestureend"],
                options: {
                    name: "Touch",
                    surface: null,
                    global: !1,
                    fastTap: !1,
                    filter: null,
                    multiTouch: !1,
                    enableSwipe: !1,
                    minXDelta: 30,
                    maxYDelta: 20,
                    maxDuration: 1e3,
                    minHold: 800,
                    doubleTapTimeout: 800
                },
                cancel: function() {
                    this.events.cancel()
                },
                destroy: function() {
                    i.fn.destroy.call(this), this.events.destroy()
                },
                _triggerTouch: function(e, t) {
                    this.trigger(e, {
                        touch: t.touch,
                        event: t.event
                    }) && t.preventDefault()
                },
                _tap: function(e) {
                    var t = this,
                        i = t.lastTap,
                        o = e.touch;
                    i && o.endTime - i.endTime < t.options.doubleTapTimeout && n.touchDelta(o, i).distance < r ? (t._triggerTouch("doubletap", e), t.lastTap = null) : (t._triggerTouch("tap", e), t.lastTap = o)
                },
                _dragstart: function(e) {
                    this._triggerTouch("dragstart", e)
                },
                _swipestart: function(e) {
                    2 * a(e.x.velocity) >= a(e.y.velocity) && e.sender.capture()
                },
                _swipemove: function(e) {
                    var t = this,
                        n = t.options,
                        i = e.touch,
                        o = e.event.timeStamp - i.startTime,
                        r = i.x.initialDelta > 0 ? "right" : "left";
                    a(i.x.initialDelta) >= n.minXDelta && a(i.y.initialDelta) < n.maxYDelta && o < n.maxDuration && (t.trigger("swipe", {
                        direction: r,
                        touch: e.touch
                    }), i.cancel())
                }
            });
        n.ui.plugin(s)
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.data.odata.min", ["kendo.core.min"], e)
}(function() {
    return function(e, t) {
        function n(i, o) {
            var a, r, s, l, c, u, d, p, h = [],
                f = i.logic || "and",
                g = i.filters;
            for (a = 0, r = g.length; a < r; a++) i = g[a], s = i.field, d = i.value, u = i.operator, i.filters ? i = n(i, o) : (p = i.ignoreCase, s = s.replace(/\./g, "/"), i = w[u], o && (i = k[u]), "isnull" === u || "isnotnull" === u ? i = m.format("{0} {1} null", s, i) : "isempty" === u || "isnotempty" === u ? i = m.format("{0} {1} ''", s, i) : i && d !== t && (l = e.type(d), "string" === l ? (c = "'{1}'", d = d.replace(/'/g, "''"), p === !0 && (s = "tolower(" + s + ")")) : "date" === l ? o ? (c = "{1:yyyy-MM-ddTHH:mm:ss+00:00}", d = m.timezone.apply(d, "Etc/UTC")) : c = "datetime'{1:yyyy-MM-ddTHH:mm:ss}'" : c = "{1}", i.length > 3 ? "substringof" !== i ? c = "{0}({2}," + c + ")" : (c = "{0}(" + c + ",{2})", "doesnotcontain" === u && (o ? (c = "{0}({2},'{1}') eq -1", i = "indexof") : c += " eq false")) : c = "{2} {0} " + c, i = m.format(c, i, d, s))), h.push(i);
            return i = h.join(" " + f + " "), h.length > 1 && (i = "(" + i + ")"), i
        }

        function i(e) {
            for (var t in e) 0 === t.indexOf("@odata") && delete e[t]
        }

        function o() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substr(1)
        }

        function a(e) {
            return e + o() + "-" + o() + "-" + o()
        }

        function r(e, t) {
            var n = v + "--" + e;
            return t && (n += "--"), n
        }

        function s(e, t, n, i) {
            var o = e.options[i].url,
                a = m.format("{0} ", n);
            return b(o) ? a + o(t) : a + o
        }

        function l(e, t) {
            var n = "";
            return n += r(e, !1), n += v + "Content-Type: application/http", n += v + "Content-Transfer-Encoding: binary", n += v + "Content-ID: " + t
        }

        function c(e) {
            var t = "";
            return t += v + "Content-Type: application/json;odata=minimalmetadata", t += v + "Prefer: return=representation", t += _ + m.stringify(e)
        }

        function u(e, t, n, i, o, a) {
            var r, u = "";
            for (r = 0; r < e.length; r++) u += l(t, n), u += _ + s(o, e[r], o.options[i].type, i) + " HTTP/1.1", a || (u += c(e[r])), u += v, n++;
            return u
        }

        function d(e, t, n, i, o, a, s) {
            var l = "";
            return l += p(t, n), l += u(e, n, i, a, o, s), l += r(n, !0), l += v
        }

        function p(e, t) {
            var n = "";
            return n += "--" + e + v, n += "Content-Type: multipart/mixed; boundary=" + t + v
        }

        function h(e, t) {
            var n = {},
                i = a("sf_batch_"),
                o = "",
                s = 0,
                l = e.options.batch.url,
                c = a("sf_changeset_");
            return n.type = e.options.batch.type, n.url = b(l) ? l() : l, n.headers = {
                "Content-Type": "multipart/mixed; boundary=" + i
            }, t.updated.length && (o += d(t.updated, i, c, s, e, "update", !1), s += t.updated.length, c = a("sf_changeset_")), t.destroyed.length && (o += d(t.destroyed, i, c, s, e, "destroy", !0), s += t.destroyed.length, c = a("sf_changeset_")), t.created.length && (o += d(t.created, i, c, s, e, "create", !1)), o += r(i, !0), n.data = o, n
        }

        function f(e) {
            var t, n, i, o, a, r, s = e.match(/--changesetresponse_[a-z0-9-]+$/gm),
                l = 0,
                c = [];
            for (c.push({
                    models: [],
                    passed: !0
                }), r = 0; r < s.length; r++) o = s[r], o.lastIndexOf("--", o.length - 1) ? r < s.length - 1 && c.push({
                models: [],
                passed: !0
            }) : (l = l ? e.indexOf(o, l + o.length) : e.indexOf(o), t = e.substring(l, e.indexOf("--", l + 1)), n = t.match(/^HTTP\/1\.\d (\d{3}) (.*)$/gm).pop(), i = m.parseFloat(n.match(/\d{3}/g).pop()), i >= 200 && i <= 299 ? (a = t.match(/\{.*\}/gm), a && c[c.length - 1].models.push(JSON.parse(a[0]))) : c[c.length - 1].passed = !1);
            return c
        }
        var m = window.kendo,
            g = e.extend,
            v = "\r\n",
            _ = "\r\n\r\n",
            b = m.isFunction,
            w = {
                eq: "eq",
                neq: "ne",
                gt: "gt",
                gte: "ge",
                lt: "lt",
                lte: "le",
                contains: "substringof",
                doesnotcontain: "substringof",
                endswith: "endswith",
                startswith: "startswith",
                isnull: "eq",
                isnotnull: "ne",
                isempty: "eq",
                isnotempty: "ne"
            },
            k = g({}, w, {
                contains: "contains"
            }),
            y = {
                pageSize: e.noop,
                page: e.noop,
                filter: function(e, t, i) {
                    t && (t = n(t, i), t && (e.$filter = t))
                },
                sort: function(t, n) {
                    var i = e.map(n, function(e) {
                        var t = e.field.replace(/\./g, "/");
                        return "desc" === e.dir && (t += " desc"), t
                    }).join(",");
                    i && (t.$orderby = i)
                },
                skip: function(e, t) {
                    t && (e.$skip = t)
                },
                take: function(e, t) {
                    t && (e.$top = t)
                }
            },
            x = {
                read: {
                    dataType: "jsonp"
                }
            };
        g(!0, m.data, {
            schemas: {
                odata: {
                    type: "json",
                    data: function(e) {
                        return e.d.results || [e.d]
                    },
                    total: "d.__count"
                }
            },
            transports: {
                odata: {
                    read: {
                        cache: !0,
                        dataType: "jsonp",
                        jsonp: "$callback"
                    },
                    update: {
                        cache: !0,
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    create: {
                        cache: !0,
                        dataType: "json",
                        contentType: "application/json",
                        type: "POST"
                    },
                    destroy: {
                        cache: !0,
                        dataType: "json",
                        type: "DELETE"
                    },
                    parameterMap: function(e, t, n) {
                        var i, o, a, r;
                        if (e = e || {}, t = t || "read", r = (this.options || x)[t], r = r ? r.dataType : "json", "read" === t) {
                            i = {
                                $inlinecount: "allpages"
                            }, "json" != r && (i.$format = "json");
                            for (a in e) y[a] ? y[a](i, e[a], n) : i[a] = e[a]
                        } else {
                            if ("json" !== r) throw Error("Only json dataType can be used for " + t + " operation.");
                            if ("destroy" !== t) {
                                for (a in e) o = e[a], "number" == typeof o && (e[a] = o + "");
                                i = m.stringify(e)
                            }
                        }
                        return i
                    }
                }
            }
        }), g(!0, m.data, {
            schemas: {
                "odata-v4": {
                    type: "json",
                    data: function(t) {
                        if (e.isArray(t)) {
                            for (var n = 0; n < t.length; n++) i(t[n]);
                            return t
                        }
                        return t = e.extend({}, t), i(t), t.value ? t.value : [t]
                    },
                    total: function(e) {
                        return e["@odata.count"]
                    }
                }
            },
            transports: {
                "odata-v4": {
                    batch: {
                        type: "POST"
                    },
                    read: {
                        cache: !0,
                        dataType: "json"
                    },
                    update: {
                        cache: !0,
                        dataType: "json",
                        contentType: "application/json;IEEE754Compatible=true",
                        type: "PUT"
                    },
                    create: {
                        cache: !0,
                        dataType: "json",
                        contentType: "application/json;IEEE754Compatible=true",
                        type: "POST"
                    },
                    destroy: {
                        cache: !0,
                        dataType: "json",
                        type: "DELETE"
                    },
                    parameterMap: function(e, t) {
                        var n = m.data.transports.odata.parameterMap(e, t, !0);
                        return "read" == t && (n.$count = !0, delete n.$inlinecount), n
                    },
                    submit: function(t) {
                        var n = this,
                            i = h(n, t.data),
                            o = t.data;
                        (o.updated.length || o.destroyed.length || o.created.length) && e.ajax(g(!0, {}, {
                            success: function(e) {
                                var n, i = f(e),
                                    a = 0;
                                o.updated.length && (n = i[a], n.passed && t.success(n.models.length ? n.models : [], "update"), a++), o.destroyed.length && (n = i[a], n.passed && t.success([], "destroy"), a++), o.created.length && (n = i[a], n.passed && t.success(n.models, "create"))
                            },
                            error: function(e, n, i) {
                                t.error(e, n, i)
                            }
                        }, i))
                    }
                }
            }
        })
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.data.xml.min", ["kendo.core.min"], e)
}(function() {
    return function(e, t) {
        var n = window.kendo,
            i = e.isArray,
            o = e.isPlainObject,
            a = e.map,
            r = e.each,
            s = e.extend,
            l = n.getter,
            c = n.Class,
            u = c.extend({
                init: function(t) {
                    var l, c, u, d, p = this,
                        h = t.total,
                        f = t.model,
                        m = t.parse,
                        g = t.errors,
                        v = t.serialize,
                        _ = t.data;
                    f && (o(f) && (l = t.modelBase || n.data.Model, f.fields && r(f.fields, function(t, n) {
                        o(n) && n.field ? e.isFunction(n.field) || (n = s(n, {
                            field: p.getter(n.field)
                        })) : n = {
                            field: p.getter(n)
                        }, f.fields[t] = n
                    }), c = f.id, c && (u = {}, u[p.xpathToMember(c, !0)] = {
                        field: p.getter(c)
                    }, f.fields = s(u, f.fields), f.id = p.xpathToMember(c)), f = l.define(f)), p.model = f), h && ("string" == typeof h ? (h = p.getter(h), p.total = function(e) {
                        return parseInt(h(e), 10)
                    }) : "function" == typeof h && (p.total = h)), g && ("string" == typeof g ? (g = p.getter(g), p.errors = function(e) {
                        return g(e) || null
                    }) : "function" == typeof g && (p.errors = g)), _ && ("string" == typeof _ ? (_ = p.xpathToMember(_), p.data = function(e) {
                        var t, n = p.evaluate(e, _);
                        return n = i(n) ? n : [n], p.model && f.fields ? (t = new p.model, a(n, function(e) {
                            if (e) {
                                var n, i = {};
                                for (n in f.fields) i[n] = t._parse(n, f.fields[n].field(e));
                                return i
                            }
                        })) : n
                    }) : "function" == typeof _ && (p.data = _)), "function" == typeof m && (d = p.parse, p.parse = function(e) {
                        var t = m.call(p, e);
                        return d.call(p, t)
                    }), "function" == typeof v && (p.serialize = v)
                },
                total: function(e) {
                    return this.data(e).length
                },
                errors: function(e) {
                    return e ? e.errors : null
                },
                serialize: function(e) {
                    return e
                },
                parseDOM: function(e) {
                    var n, o, a, r, s, l, c, u = {},
                        d = e.attributes,
                        p = d.length;
                    for (c = 0; c < p; c++) l = d[c], u["@" + l.nodeName] = l.nodeValue;
                    for (o = e.firstChild; o; o = o.nextSibling) a = o.nodeType, 3 === a || 4 === a ? u["#text"] = o.nodeValue : 1 === a && (n = this.parseDOM(o), r = o.nodeName, s = u[r], i(s) ? s.push(n) : s = s !== t ? [s, n] : n, u[r] = s);
                    return u
                },
                evaluate: function(e, t) {
                    for (var n, o, a, r, s, l = t.split("."); n = l.shift();)
                        if (e = e[n], i(e)) {
                            for (o = [], t = l.join("."), s = 0, a = e.length; s < a; s++) r = this.evaluate(e[s], t), r = i(r) ? r : [r], o.push.apply(o, r);
                            return o
                        }
                    return e
                },
                parse: function(t) {
                    var n, i, o = {};
                    return n = t.documentElement || e.parseXML(t).documentElement, i = this.parseDOM(n), o[n.nodeName] = i, o
                },
                xpathToMember: function(e, t) {
                    return e ? (e = e.replace(/^\//, "").replace(/\//g, "."), e.indexOf("@") >= 0 ? e.replace(/\.?(@.*)/, t ? "$1" : '["$1"]') : e.indexOf("text()") >= 0 ? e.replace(/(\.?text\(\))/, t ? "#text" : '["#text"]') : e) : ""
                },
                getter: function(e) {
                    return l(this.xpathToMember(e), !0)
                }
            });
        e.extend(!0, n.data, {
            XmlDataReader: u,
            readers: {
                xml: u
            }
        })
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.data.min", ["kendo.core.min", "kendo.data.odata.min", "kendo.data.xml.min"], e)
}(function() {
    return function(e, t) {
        function n(e, t, n, i) {
            return function(o) {
                var a, r = {};
                for (a in o) r[a] = o[a];
                r.field = i ? n + "." + o.field : n, t == Fe && e._notifyChange && e._notifyChange(r), e.trigger(t, r)
            }
        }

        function i(t, n) {
            if (t === n) return !0;
            var o, a = e.type(t),
                r = e.type(n);
            if (a !== r) return !1;
            if ("date" === a) return t.getTime() === n.getTime();
            if ("object" !== a && "array" !== a) return !1;
            for (o in t)
                if (!i(t[o], n[o])) return !1;
            return !0
        }

        function o(e, t) {
            var n, i;
            for (i in e) {
                if (n = e[i], he(n) && n.field && n.field === t) return n;
                if (n === t) return n
            }
            return null
        }

        function a(e) {
            this.data = e || []
        }

        function r(e, n) {
            if (e) {
                var i = typeof e === Ce ? {
                        field: e,
                        dir: n
                    } : e,
                    o = me(i) ? i : i !== t ? [i] : [];
                return ge(o, function(e) {
                    return !!e.dir
                })
            }
        }

        function s(e) {
            var t, n, i, o, a = e.filters;
            if (a)
                for (t = 0, n = a.length; t < n; t++) i = a[t], o = i.operator, o && typeof o === Ce && (i.operator = Z[o.toLowerCase()] || o), s(i)
        }

        function l(e) {
            if (e && !fe(e)) return !me(e) && e.filters || (e = {
                logic: "and",
                filters: me(e) ? e : [e]
            }), s(e), e
        }

        function c(e, t) {
            return !e.logic && !t.logic && (e.field === t.field && e.value === t.value && e.operator === t.operator)
        }

        function u(e) {
            return e = e || {}, fe(e) ? {
                logic: "and",
                filters: []
            } : l(e)
        }

        function d(e, t) {
            return t.logic || e.field > t.field ? 1 : e.field < t.field ? -1 : 0
        }

        function p(e, t) {
            var n, i, o, a, r;
            if (e = u(e), t = u(t), e.logic !== t.logic) return !1;
            if (o = (e.filters || []).slice(), a = (t.filters || []).slice(), o.length !== a.length) return !1;
            for (o = o.sort(d), a = a.sort(d), r = 0; r < o.length; r++)
                if (n = o[r], i = a[r], n.logic && i.logic) {
                    if (!p(n, i)) return !1
                } else if (!c(n, i)) return !1;
            return !0
        }

        function h(e) {
            return me(e) ? e : [e]
        }

        function f(e, n) {
            var i = typeof e === Ce ? {
                    field: e,
                    dir: n
                } : e,
                o = me(i) ? i : i !== t ? [i] : [];
            return j(o, function(e) {
                return {
                    field: e.field,
                    dir: e.dir || "asc",
                    aggregates: e.aggregates
                }
            })
        }

        function m(e, t) {
            return e && e.getTime && t && t.getTime ? e.getTime() === t.getTime() : e === t
        }

        function g(e, t, n, i, o, a) {
            var r, s, l, c, u;
            for (t = t || [], c = t.length, r = 0; r < c; r++) s = t[r], l = s.aggregate, u = s.field, e[u] = e[u] || {}, a[u] = a[u] || {}, a[u][l] = a[u][l] || {}, e[u][l] = ee[l.toLowerCase()](e[u][l], n, we.accessor(u), i, o, a[u][l])
        }

        function v(e) {
            return "number" == typeof e && !isNaN(e)
        }

        function _(e) {
            return e && e.getTime
        }

        function b(e) {
            var t, n = e.length,
                i = Array(n);
            for (t = 0; t < n; t++) i[t] = e[t].toJSON();
            return i
        }

        function w(e, t, n, i, o) {
            var a, r, s, l, c, u = {};
            for (l = 0, c = e.length; l < c; l++) {
                a = e[l];
                for (r in t) s = o[r], s && s !== r && (u[s] || (u[s] = we.setter(s)), u[s](a, t[r](a)), delete a[r])
            }
        }

        function k(e, t, n, i, o) {
            var a, r, s, l, c;
            for (l = 0, c = e.length; l < c; l++) {
                a = e[l];
                for (r in t) a[r] = n._parse(r, t[r](a)), s = o[r], s && s !== r && delete a[s]
            }
        }

        function y(e, t, n, i, o) {
            var a, r, s, l;
            for (r = 0, l = e.length; r < l; r++) a = e[r], s = i[a.field], s && s != a.field && (a.field = s), a.value = n._parse(a.field, a.value), a.hasSubgroups ? y(a.items, t, n, i, o) : k(a.items, t, n, i, o)
        }

        function x(e, t, n, i, o, a) {
            return function(r) {
                return r = e(r), C(t, n, i, o, a)(r)
            }
        }

        function C(e, t, n, i, o) {
            return function(a) {
                return a && !fe(n) && ("[object Array]" === Ke.call(a) || a instanceof Xe || (a = [a]), t(a, n, new e, i, o)), a || []
            }
        }

        function T(e, t) {
            var n, i, o;
            if (t.items && t.items.length)
                for (o = 0; o < t.items.length; o++) n = e.items[o], i = t.items[o], n && i ? n.hasSubgroups ? T(n, i) : n.field && n.value == i.value ? n.items.push.apply(n.items, i.items) : e.items.push.apply(e.items, [i]) : i && e.items.push.apply(e.items, [i])
        }

        function S(e, t, n, i) {
            for (var o, a, r, s = 0; t.length && i && (o = t[s], a = o.items, r = a.length, e && e.field === o.field && e.value === o.value ? (e.hasSubgroups && e.items.length ? S(e.items[e.items.length - 1], o.items, n, i) : (a = a.slice(n, n + i), e.items = e.items.concat(a)), t.splice(s--, 1)) : o.hasSubgroups && a.length ? (S(o, a, n, i), o.items.length || t.splice(s--, 1)) : (a = a.slice(n, n + i), o.items = a, o.items.length || t.splice(s--, 1)), 0 === a.length ? n -= r : (n = 0, i -= a.length), !(++s >= t.length)););
            s < t.length && t.splice(s, t.length - s)
        }

        function D(e) {
            var t, n, i, o, a, r = [];
            for (t = 0, n = e.length; t < n; t++)
                if (a = e.at(t), a.hasSubgroups) r = r.concat(D(a.items));
                else
                    for (i = a.items, o = 0; o < i.length; o++) r.push(i.at(o));
            return r
        }

        function I(e, t) {
            var n, i, o;
            if (t)
                for (n = 0, i = e.length; n < i; n++) o = e.at(n), o.hasSubgroups ? I(o.items, t) : o.items = new q(o.items, t)
        }

        function E(e, t) {
            for (var n = 0, i = e.length; n < i; n++)
                if (e[n].hasSubgroups) {
                    if (E(e[n].items, t)) return !0
                } else if (t(e[n].items, e[n])) return !0
        }

        function F(e, t, n, i) {
            for (var o = 0; o < e.length && e[o].data !== t && !A(e[o].data, n, i); o++);
        }

        function A(e, t, n) {
            for (var i = 0, o = e.length; i < o; i++) {
                if (e[i] && e[i].hasSubgroups) return A(e[i].items, t, n);
                if (e[i] === t || e[i] === n) return e[i] = n, !0
            }
        }

        function P(e, n, i, o, a) {
            var r, s, l, c;
            for (r = 0, s = e.length; r < s; r++)
                if (l = e[r], l && !(l instanceof o))
                    if (l.hasSubgroups === t || a) {
                        for (c = 0; c < n.length; c++)
                            if (n[c] === l) {
                                e[r] = n.at(c), F(i, n, l, e[r]);
                                break
                            }
                    } else P(l.items, n, i, o, a)
        }

        function M(e, t) {
            var n, i, o = e.length;
            for (i = 0; i < o; i++)
                if (n = e[i], n.uid && n.uid == t.uid) return e.splice(i, 1), n
        }

        function O(e, t) {
            return t ? z(e, function(e) {
                return e.uid && e.uid == t.uid || e[t.idField] === t.id && t.id !== t._defaultId
            }) : -1
        }

        function H(e, t) {
            return t ? z(e, function(e) {
                return e.uid == t.uid
            }) : -1
        }

        function z(e, t) {
            var n, i;
            for (n = 0, i = e.length; n < i; n++)
                if (t(e[n])) return n;
            return -1
        }

        function V(e, t) {
            var n, i;
            return e && !fe(e) ? (n = e[t], i = he(n) ? n.from || n.field || t : e[t] || t, ke(i) ? t : i) : t
        }

        function B(e, t) {
            var n, i, o, a = {};
            for (o in e) "filters" !== o && (a[o] = e[o]);
            if (e.filters)
                for (a.filters = [], n = 0, i = e.filters.length; n < i; n++) a.filters[n] = B(e.filters[n], t);
            else a.field = V(t.fields, a.field);
            return a
        }

        function L(e, t) {
            var n, i, o, a, r, s = [];
            for (n = 0, i = e.length; n < i; n++) {
                o = {}, a = e[n];
                for (r in a) o[r] = a[r];
                o.field = V(t.fields, o.field), o.aggregates && me(o.aggregates) && (o.aggregates = L(o.aggregates, t)), s.push(o)
            }
            return s
        }

        function N(t, n) {
            var i, o, a, r, s, l, c, u, d, p;
            for (t = e(t)[0], i = t.options, o = n[0], a = n[1], r = [], s = 0, l = i.length; s < l; s++) d = {}, u = i[s], c = u.parentNode, c === t && (c = null), u.disabled || c && c.disabled || (c && (d.optgroup = c.label), d[o.field] = u.text, p = u.attributes.value, p = p && p.specified ? u.value : u.text, d[a.field] = p, r.push(d));
            return r
        }

        function R(t, n) {
            var i, o, a, r, s, l, c, u = e(t)[0].tBodies[0],
                d = u ? u.rows : [],
                p = n.length,
                h = [];
            for (i = 0, o = d.length; i < o; i++) {
                for (s = {}, c = !0, r = d[i].cells, a = 0; a < p; a++) l = r[a], "th" !== l.nodeName.toLowerCase() && (c = !1, s[n[a].field] = l.innerHTML);
                c || h.push(s)
            }
            return h
        }

        function W(e) {
            return function() {
                var t = this._data,
                    n = ae.fn[e].apply(this, Ge.call(arguments));
                return this._data != t && this._attachBubbleHandlers(), n
            }
        }

        function U(t, n) {
            function i(e, t) {
                return e.filter(t).add(e.find(t))
            }
            var o, a, r, s, l, c, u, d, p = e(t).children(),
                h = [],
                f = n[0].field,
                m = n[1] && n[1].field,
                g = n[2] && n[2].field,
                v = n[3] && n[3].field;
            for (o = 0, a = p.length; o < a; o++) r = {
                _loaded: !0
            }, s = p.eq(o), c = s[0].firstChild, d = s.children(), t = d.filter("ul"), d = d.filter(":not(ul)"), l = s.attr("data-id"), l && (r.id = l), c && (r[f] = 3 == c.nodeType ? c.nodeValue : d.text()), m && (r[m] = i(d, "a").attr("href")), v && (r[v] = i(d, "img").attr("src")), g && (u = i(d, ".k-sprite").prop("className"), r[g] = u && e.trim(u.replace("k-sprite", ""))), t.length && (r.items = U(t.eq(0), n)), "true" == s.attr("data-hasChildren") && (r.hasChildren = !0), h.push(r);
            return h
        }
        var j, q, $, G, Y, K, Q, J, X, Z, ee, te, ne, ie, oe, ae, re, se, le, ce, ue, de = e.extend,
            pe = e.proxy,
            he = e.isPlainObject,
            fe = e.isEmptyObject,
            me = e.isArray,
            ge = e.grep,
            ve = e.ajax,
            _e = e.each,
            be = e.noop,
            we = window.kendo,
            ke = we.isFunction,
            ye = we.Observable,
            xe = we.Class,
            Ce = "string",
            Te = "function",
            Se = "create",
            De = "read",
            Ie = "update",
            Ee = "destroy",
            Fe = "change",
            Ae = "sync",
            Pe = "get",
            Me = "error",
            Oe = "requestStart",
            He = "progress",
            ze = "requestEnd",
            Ve = [Se, De, Ie, Ee],
            Be = function(e) {
                return e
            },
            Le = we.getter,
            Ne = we.stringify,
            Re = Math,
            We = [].push,
            Ue = [].join,
            je = [].pop,
            qe = [].splice,
            $e = [].shift,
            Ge = [].slice,
            Ye = [].unshift,
            Ke = {}.toString,
            Qe = we.support.stableSort,
            Je = /^\/Date\((.*?)\)\/$/,
            Xe = ye.extend({
                init: function(e, t) {
                    var n = this;
                    n.type = t || $, ye.fn.init.call(n), n.length = e.length, n.wrapAll(e, n)
                },
                at: function(e) {
                    return this[e]
                },
                toJSON: function() {
                    var e, t, n = this.length,
                        i = Array(n);
                    for (e = 0; e < n; e++) t = this[e], t instanceof $ && (t = t.toJSON()), i[e] = t;
                    return i
                },
                parent: be,
                wrapAll: function(e, t) {
                    var n, i, o = this,
                        a = function() {
                            return o
                        };
                    for (t = t || [], n = 0, i = e.length; n < i; n++) t[n] = o.wrap(e[n], a);
                    return t
                },
                wrap: function(e, t) {
                    var n, i = this;
                    return null !== e && "[object Object]" === Ke.call(e) && (n = e instanceof i.type || e instanceof K, n || (e = e instanceof $ ? e.toJSON() : e, e = new i.type(e)), e.parent = t, e.bind(Fe, function(e) {
                        i.trigger(Fe, {
                            field: e.field,
                            node: e.node,
                            index: e.index,
                            items: e.items || [this],
                            action: e.node ? e.action || "itemloaded" : "itemchange"
                        })
                    })), e
                },
                push: function() {
                    var e, t = this.length,
                        n = this.wrapAll(arguments);
                    return e = We.apply(this, n), this.trigger(Fe, {
                        action: "add",
                        index: t,
                        items: n
                    }), e
                },
                slice: Ge,
                sort: [].sort,
                join: Ue,
                pop: function() {
                    var e = this.length,
                        t = je.apply(this);
                    return e && this.trigger(Fe, {
                        action: "remove",
                        index: e - 1,
                        items: [t]
                    }), t
                },
                splice: function(e, t, n) {
                    var i, o, a, r = this.wrapAll(Ge.call(arguments, 2));
                    if (i = qe.apply(this, [e, t].concat(r)), i.length)
                        for (this.trigger(Fe, {
                                action: "remove",
                                index: e,
                                items: i
                            }), o = 0, a = i.length; o < a; o++) i[o] && i[o].children && i[o].unbind(Fe);
                    return n && this.trigger(Fe, {
                        action: "add",
                        index: e,
                        items: r
                    }), i
                },
                shift: function() {
                    var e = this.length,
                        t = $e.apply(this);
                    return e && this.trigger(Fe, {
                        action: "remove",
                        index: 0,
                        items: [t]
                    }), t
                },
                unshift: function() {
                    var e, t = this.wrapAll(arguments);
                    return e = Ye.apply(this, t), this.trigger(Fe, {
                        action: "add",
                        index: 0,
                        items: t
                    }), e
                },
                indexOf: function(e) {
                    var t, n, i = this;
                    for (t = 0, n = i.length; t < n; t++)
                        if (i[t] === e) return t;
                    return -1
                },
                forEach: function(e, t) {
                    for (var n = 0, i = this.length, o = t || window; n < i; n++) e.call(o, this[n], n, this)
                },
                map: function(e, t) {
                    for (var n = 0, i = [], o = this.length, a = t || window; n < o; n++) i[n] = e.call(a, this[n], n, this);
                    return i
                },
                reduce: function(e) {
                    var t, n = 0,
                        i = this.length;
                    for (2 == arguments.length ? t = arguments[1] : n < i && (t = this[n++]); n < i; n++) t = e(t, this[n], n, this);
                    return t
                },
                reduceRight: function(e) {
                    var t, n = this.length - 1;
                    for (2 == arguments.length ? t = arguments[1] : n > 0 && (t = this[n--]); n >= 0; n--) t = e(t, this[n], n, this);
                    return t
                },
                filter: function(e, t) {
                    for (var n, i = 0, o = [], a = this.length, r = t || window; i < a; i++) n = this[i], e.call(r, n, i, this) && (o[o.length] = n);
                    return o
                },
                find: function(e, t) {
                    for (var n, i = 0, o = this.length, a = t || window; i < o; i++)
                        if (n = this[i], e.call(a, n, i, this)) return n
                },
                every: function(e, t) {
                    for (var n, i = 0, o = this.length, a = t || window; i < o; i++)
                        if (n = this[i], !e.call(a, n, i, this)) return !1;
                    return !0
                },
                some: function(e, t) {
                    for (var n, i = 0, o = this.length, a = t || window; i < o; i++)
                        if (n = this[i], e.call(a, n, i, this)) return !0;
                    return !1
                },
                remove: function(e) {
                    var t = this.indexOf(e);
                    t !== -1 && this.splice(t, 1)
                },
                empty: function() {
                    this.splice(0, this.length)
                }
            });
        "undefined" != typeof Symbol && Symbol.iterator && !Xe.prototype[Symbol.iterator] && (Xe.prototype[Symbol.iterator] = [][Symbol.iterator]), q = Xe.extend({
            init: function(e, t) {
                ye.fn.init.call(this), this.type = t || $;
                for (var n = 0; n < e.length; n++) this[n] = e[n];
                this.length = n, this._parent = pe(function() {
                    return this
                }, this)
            },
            at: function(e) {
                var t = this[e];
                return t instanceof this.type ? t.parent = this._parent : t = this[e] = this.wrap(t, this._parent), t
            }
        }), $ = ye.extend({
            init: function(e) {
                var t, n, i = this,
                    o = function() {
                        return i
                    };
                ye.fn.init.call(this), this._handlers = {};
                for (n in e) t = e[n], "object" == typeof t && t && !t.getTime && "_" != n.charAt(0) && (t = i.wrap(t, n, o)), i[n] = t;
                i.uid = we.guid()
            },
            shouldSerialize: function(e) {
                return this.hasOwnProperty(e) && "_handlers" !== e && "_events" !== e && typeof this[e] !== Te && "uid" !== e
            },
            forEach: function(e) {
                for (var t in this) this.shouldSerialize(t) && e(this[t], t)
            },
            toJSON: function() {
                var e, t, n = {};
                for (t in this) this.shouldSerialize(t) && (e = this[t], (e instanceof $ || e instanceof Xe) && (e = e.toJSON()), n[t] = e);
                return n
            },
            get: function(e) {
                var t, n = this;
                return n.trigger(Pe, {
                    field: e
                }), t = "this" === e ? n : we.getter(e, !0)(n)
            },
            _set: function(e, t) {
                var n, i, o, a = this,
                    r = e.indexOf(".") >= 0;
                if (r)
                    for (n = e.split("."), i = ""; n.length > 1;) {
                        if (i += n.shift(), o = we.getter(i, !0)(a), o instanceof $) return o.set(n.join("."), t), r;
                        i += "."
                    }
                return we.setter(e)(a, t), r
            },
            set: function(e, t) {
                var n = this,
                    i = !1,
                    o = e.indexOf(".") >= 0,
                    a = we.getter(e, !0)(n);
                return a !== t && (a instanceof ye && this._handlers[e] && (this._handlers[e].get && a.unbind(Pe, this._handlers[e].get), a.unbind(Fe, this._handlers[e].change)), i = n.trigger("set", {
                    field: e,
                    value: t
                }), i || (o || (t = n.wrap(t, e, function() {
                    return n
                })), (!n._set(e, t) || e.indexOf("(") >= 0 || e.indexOf("[") >= 0) && n.trigger(Fe, {
                    field: e
                }))), i
            },
            parent: be,
            wrap: function(e, t, i) {
                var o, a, r, s, l = this,
                    c = Ke.call(e);
                return null == e || "[object Object]" !== c && "[object Array]" !== c || (r = e instanceof Xe, s = e instanceof ae, "[object Object]" !== c || s || r ? ("[object Array]" === c || r || s) && (r || s || (e = new Xe(e)), a = n(l, Fe, t, !1), e.bind(Fe, a), l._handlers[t] = {
                    change: a
                }) : (e instanceof $ || (e = new $(e)), o = n(l, Pe, t, !0), e.bind(Pe, o), a = n(l, Fe, t, !0), e.bind(Fe, a), l._handlers[t] = {
                    get: o,
                    change: a
                }), e.parent = i), e
            }
        }), G = {
            number: function(e) {
                return typeof e === Ce && "null" === e.toLowerCase() ? null : we.parseFloat(e)
            },
            date: function(e) {
                return typeof e === Ce && "null" === e.toLowerCase() ? null : we.parseDate(e)
            },
            "boolean": function(e) {
                return typeof e === Ce ? "null" === e.toLowerCase() ? null : "true" === e.toLowerCase() : null != e ? !!e : e
            },
            string: function(e) {
                return typeof e === Ce && "null" === e.toLowerCase() ? null : null != e ? e + "" : e
            },
            "default": function(e) {
                return e
            }
        }, Y = {
            string: "",
            number: 0,
            date: new Date,
            "boolean": !1,
            "default": ""
        }, K = $.extend({
            init: function(n) {
                var i, o, a = this;
                if ((!n || e.isEmptyObject(n)) && (n = e.extend({}, a.defaults, n), a._initializers))
                    for (i = 0; i < a._initializers.length; i++) o = a._initializers[i], n[o] = a.defaults[o]();
                $.fn.init.call(a, n), a.dirty = !1, a.dirtyFields = {}, a.idField && (a.id = a.get(a.idField), a.id === t && (a.id = a._defaultId))
            },
            shouldSerialize: function(e) {
                return $.fn.shouldSerialize.call(this, e) && "uid" !== e && !("id" !== this.idField && "id" === e) && "dirty" !== e && "dirtyFields" !== e && "_accessors" !== e
            },
            _parse: function(e, t) {
                var n, i = this,
                    a = e,
                    r = i.fields || {};
                return e = r[e], e || (e = o(r, a)), e && (n = e.parse, !n && e.type && (n = G[e.type.toLowerCase()])), n ? n(t) : t
            },
            _notifyChange: function(e) {
                var t = e.action;
                "add" != t && "remove" != t || (this.dirty = !0, this.dirtyFields[e.field] = !0)
            },
            editable: function(e) {
                return e = (this.fields || {})[e], !e || e.editable !== !1
            },
            set: function(e, t, n) {
                var o = this,
                    a = o.dirty;
                o.editable(e) && (t = o._parse(e, t), i(t, o.get(e)) ? o.trigger("equalSet", {
                    field: e,
                    value: t
                }) : (o.dirty = !0, o.dirtyFields[e] = !0, $.fn.set.call(o, e, t, n) && !a && (o.dirty = a, o.dirty || (o.dirtyFields[e] = !1))))
            },
            accept: function(e) {
                var t, n, i = this,
                    o = function() {
                        return i
                    };
                for (t in e) n = e[t], "_" != t.charAt(0) && (n = i.wrap(e[t], t, o)), i._set(t, n);
                i.idField && (i.id = i.get(i.idField)), i.dirty = !1, i.dirtyFields = {}
            },
            isNew: function() {
                return this.id === this._defaultId
            }
        }), K.define = function(e, n) {
            n === t && (n = e, e = K);
            var i, o, a, r, s, l, c, u, d = de({
                    defaults: {}
                }, n),
                p = {},
                h = d.id,
                f = [];
            if (h && (d.idField = h), d.id && delete d.id, h && (d.defaults[h] = d._defaultId = ""), "[object Array]" === Ke.call(d.fields)) {
                for (l = 0, c = d.fields.length; l < c; l++) a = d.fields[l], typeof a === Ce ? p[a] = {} : a.field && (p[a.field] = a);
                d.fields = p
            }
            for (o in d.fields) a = d.fields[o], r = a.type || "default", s = null, u = o, o = typeof a.field === Ce ? a.field : o, a.nullable || (s = d.defaults[u !== o ? u : o] = a.defaultValue !== t ? a.defaultValue : Y[r.toLowerCase()], "function" == typeof s && f.push(o)), n.id === o && (d._defaultId = s), d.defaults[u !== o ? u : o] = s, a.parse = a.parse || G[r];
            return f.length > 0 && (d._initializers = f), i = e.extend(d), i.define = function(e) {
                return K.define(i, e)
            }, d.fields && (i.fields = d.fields, i.idField = d.idField), i
        }, Q = {
            selector: function(e) {
                return ke(e) ? e : Le(e)
            },
            compare: function(e) {
                var t = this.selector(e);
                return function(e, n) {
                    return e = t(e), n = t(n), null == e && null == n ? 0 : null == e ? -1 : null == n ? 1 : e.localeCompare ? e.localeCompare(n) : e > n ? 1 : e < n ? -1 : 0
                }
            },
            create: function(e) {
                var t = e.compare || this.compare(e.field);
                return "desc" == e.dir ? function(e, n) {
                    return t(n, e, !0)
                } : t
            },
            combine: function(e) {
                return function(t, n) {
                    var i, o, a = e[0](t, n);
                    for (i = 1, o = e.length; i < o; i++) a = a || e[i](t, n);
                    return a
                }
            }
        }, J = de({}, Q, {
            asc: function(e) {
                var t = this.selector(e);
                return function(e, n) {
                    var i = t(e),
                        o = t(n);
                    return i && i.getTime && o && o.getTime && (i = i.getTime(), o = o.getTime()), i === o ? e.__position - n.__position : null == i ? -1 : null == o ? 1 : i.localeCompare ? i.localeCompare(o) : i > o ? 1 : -1
                }
            },
            desc: function(e) {
                var t = this.selector(e);
                return function(e, n) {
                    var i = t(e),
                        o = t(n);
                    return i && i.getTime && o && o.getTime && (i = i.getTime(), o = o.getTime()), i === o ? e.__position - n.__position : null == i ? 1 : null == o ? -1 : o.localeCompare ? o.localeCompare(i) : i < o ? 1 : -1
                }
            },
            create: function(e) {
                return this[e.dir](e.field)
            }
        }), j = function(e, t) {
            var n, i = e.length,
                o = Array(i);
            for (n = 0; n < i; n++) o[n] = t(e[n], n, e);
            return o
        }, X = function() {
            function e(e) {
                return "string" == typeof e && (e = e.replace(/[\r\n]+/g, "")), JSON.stringify(e)
            }

            function t(t) {
                return function(n, i, o) {
                    return i += "", o && (n = "(" + n + " || '').toLowerCase()", i = i.toLowerCase()), t(n, e(i), o)
                }
            }

            function n(t, n, i, o) {
                if (null != i) {
                    if (typeof i === Ce) {
                        var a = Je.exec(i);
                        a ? i = new Date((+a[1])) : o ? (i = e(i.toLowerCase()), n = "((" + n + " || '')+'').toLowerCase()") : i = e(i)
                    }
                    i.getTime && (n = "(" + n + "&&" + n + ".getTime?" + n + ".getTime():" + n + ")", i = i.getTime())
                }
                return n + " " + t + " " + i
            }

            function i(e) {
                var t, n, i, o;
                for (t = "/^", n = !1, i = 0; i < e.length; ++i) {
                    if (o = e.charAt(i), n) t += "\\" + o;
                    else {
                        if ("~" == o) {
                            n = !0;
                            continue
                        }
                        t += "*" == o ? ".*" : "?" == o ? "." : ".+^$()[]{}|\\/\n\r\u2028\u2029Â ".indexOf(o) >= 0 ? "\\" + o : o
                    }
                    n = !1
                }
                return t + "$/"
            }
            return {
                quote: function(t) {
                    return t && t.getTime ? "new Date(" + t.getTime() + ")" : e(t)
                },
                eq: function(e, t, i) {
                    return n("==", e, t, i)
                },
                neq: function(e, t, i) {
                    return n("!=", e, t, i)
                },
                gt: function(e, t, i) {
                    return n(">", e, t, i)
                },
                gte: function(e, t, i) {
                    return n(">=", e, t, i)
                },
                lt: function(e, t, i) {
                    return n("<", e, t, i)
                },
                lte: function(e, t, i) {
                    return n("<=", e, t, i)
                },
                startswith: t(function(e, t) {
                    return e + ".lastIndexOf(" + t + ", 0) == 0"
                }),
                doesnotstartwith: t(function(e, t) {
                    return e + ".lastIndexOf(" + t + ", 0) == -1"
                }),
                endswith: t(function(e, t) {
                    var n = t ? t.length - 2 : 0;
                    return e + ".indexOf(" + t + ", " + e + ".length - " + n + ") >= 0"
                }),
                doesnotendwith: t(function(e, t) {
                    var n = t ? t.length - 2 : 0;
                    return e + ".indexOf(" + t + ", " + e + ".length - " + n + ") < 0"
                }),
                contains: t(function(e, t) {
                    return e + ".indexOf(" + t + ") >= 0"
                }),
                doesnotcontain: t(function(e, t) {
                    return e + ".indexOf(" + t + ") == -1"
                }),
                matches: t(function(e, t) {
                    return t = t.substring(1, t.length - 1), i(t) + ".test(" + e + ")"
                }),
                doesnotmatch: t(function(e, t) {
                    return t = t.substring(1, t.length - 1), "!" + i(t) + ".test(" + e + ")"
                }),
                isempty: function(e) {
                    return e + " === ''"
                },
                isnotempty: function(e) {
                    return e + " !== ''"
                },
                isnull: function(e) {
                    return "(" + e + " == null)"
                },
                isnotnull: function(e) {
                    return "(" + e + " != null)"
                },
                isnullorempty: function(e) {
                    return "(" + e + " === null) || (" + e + " === '')"
                },
                isnotnullorempty: function(e) {
                    return "(" + e + " !== null) && (" + e + " !== '')"
                }
            }
        }(), a.filterExpr = function(e) {
            var n, i, o, r, s, l, c = [],
                u = {
                    and: " && ",
                    or: " || "
                },
                d = [],
                p = [],
                h = e.filters;
            for (n = 0, i = h.length; n < i; n++) o = h[n], s = o.field, l = o.operator, o.filters ? (r = a.filterExpr(o), o = r.expression.replace(/__o\[(\d+)\]/g, function(e, t) {
                return t = +t, "__o[" + (p.length + t) + "]"
            }).replace(/__f\[(\d+)\]/g, function(e, t) {
                return t = +t, "__f[" + (d.length + t) + "]"
            }), p.push.apply(p, r.operators), d.push.apply(d, r.fields)) : (typeof s === Te ? (r = "__f[" + d.length + "](d)", d.push(s)) : r = we.expr(s), typeof l === Te ? (o = "__o[" + p.length + "](" + r + ", " + X.quote(o.value) + ")", p.push(l)) : o = X[(l || "eq").toLowerCase()](r, o.value, o.ignoreCase === t || o.ignoreCase)), c.push(o);
            return {
                expression: "(" + c.join(u[e.logic]) + ")",
                fields: d,
                operators: p
            }
        }, Z = {
            "==": "eq",
            equals: "eq",
            isequalto: "eq",
            equalto: "eq",
            equal: "eq",
            "!=": "neq",
            ne: "neq",
            notequals: "neq",
            isnotequalto: "neq",
            notequalto: "neq",
            notequal: "neq",
            "<": "lt",
            islessthan: "lt",
            lessthan: "lt",
            less: "lt",
            "<=": "lte",
            le: "lte",
            islessthanorequalto: "lte",
            lessthanequal: "lte",
            ">": "gt",
            isgreaterthan: "gt",
            greaterthan: "gt",
            greater: "gt",
            ">=": "gte",
            isgreaterthanorequalto: "gte",
            greaterthanequal: "gte",
            ge: "gte",
            notsubstringof: "doesnotcontain",
            isnull: "isnull",
            isempty: "isempty",
            isnotempty: "isnotempty"
        }, a.normalizeFilter = l, a.compareFilters = p, a.prototype = {
            toArray: function() {
                return this.data
            },
            range: function(e, t) {
                return new a(this.data.slice(e, e + t))
            },
            skip: function(e) {
                return new a(this.data.slice(e))
            },
            take: function(e) {
                return new a(this.data.slice(0, e))
            },
            select: function(e) {
                return new a(j(this.data, e))
            },
            order: function(e, t, n) {
                var i = {
                    dir: t
                };
                return e && (e.compare ? i.compare = e.compare : i.field = e), new a(n ? this.data.sort(Q.create(i)) : this.data.slice(0).sort(Q.create(i)))
            },
            orderBy: function(e, t) {
                return this.order(e, "asc", t)
            },
            orderByDescending: function(e, t) {
                return this.order(e, "desc", t)
            },
            sort: function(e, t, n, i) {
                var o, a, s = r(e, t),
                    l = [];
                if (n = n || Q, s.length) {
                    for (o = 0, a = s.length; o < a; o++) l.push(n.create(s[o]));
                    return this.orderBy({
                        compare: n.combine(l)
                    }, i)
                }
                return this
            },
            filter: function(e) {
                var t, n, i, o, r, s, c, u, d = this.data,
                    p = [];
                if (e = l(e), !e || 0 === e.filters.length) return this;
                for (o = a.filterExpr(e), s = o.fields, c = o.operators, r = u = Function("d, __f, __o", "return " + o.expression), (s.length || c.length) && (u = function(e) {
                        return r(e, s, c)
                    }), t = 0, i = d.length; t < i; t++) n = d[t], u(n) && p.push(n);
                return new a(p)
            },
            group: function(e, t) {
                e = f(e || []), t = t || this.data;
                var n, i = this,
                    o = new a(i.data);
                return e.length > 0 && (n = e[0], o = o.groupBy(n).select(function(i) {
                    var o = new a(t).filter([{
                        field: i.field,
                        operator: "eq",
                        value: i.value,
                        ignoreCase: !1
                    }]);
                    return {
                        field: i.field,
                        value: i.value,
                        items: e.length > 1 ? new a(i.items).group(e.slice(1), o.toArray()).toArray() : i.items,
                        hasSubgroups: e.length > 1,
                        aggregates: o.aggregate(n.aggregates)
                    }
                })), o
            },
            groupBy: function(e) {
                if (fe(e) || !this.data.length) return new a([]);
                var t, n, i, o, r = e.field,
                    s = this._sortForGrouping(r, e.dir || "asc"),
                    l = we.accessor(r),
                    c = l.get(s[0], r),
                    u = {
                        field: r,
                        value: c,
                        items: []
                    },
                    d = [u];
                for (i = 0, o = s.length; i < o; i++) t = s[i], n = l.get(t, r), m(c, n) || (c = n, u = {
                    field: r,
                    value: c,
                    items: []
                }, d.push(u)), u.items.push(t);
                return new a(d)
            },
            _sortForGrouping: function(e, t) {
                var n, i, o = this.data;
                if (!Qe) {
                    for (n = 0, i = o.length; n < i; n++) o[n].__position = n;
                    for (o = new a(o).sort(e, t, J).toArray(), n = 0, i = o.length; n < i; n++) delete o[n].__position;
                    return o
                }
                return this.sort(e, t).toArray()
            },
            aggregate: function(e) {
                var t, n, i = {},
                    o = {};
                if (e && e.length)
                    for (t = 0, n = this.data.length; t < n; t++) g(i, e, this.data[t], t, n, o);
                return i
            }
        }, ee = {
            sum: function(e, t, n) {
                var i = n.get(t);
                return v(e) ? v(i) && (e += i) : e = i, e
            },
            count: function(e) {
                return (e || 0) + 1
            },
            average: function(e, n, i, o, a, r) {
                var s = i.get(n);
                return r.count === t && (r.count = 0), v(e) ? v(s) && (e += s) : e = s, v(s) && r.count++, o == a - 1 && v(e) && (e /= r.count), e
            },
            max: function(e, t, n) {
                var i = n.get(t);
                return v(e) || _(e) || (e = i), e < i && (v(i) || _(i)) && (e = i), e
            },
            min: function(e, t, n) {
                var i = n.get(t);
                return v(e) || _(e) || (e = i), e > i && (v(i) || _(i)) && (e = i), e
            }
        }, a.process = function(e, n, i) {
            n = n || {};
            var o, s = new a(e),
                l = n.group,
                c = f(l || []).concat(r(n.sort || [])),
                u = n.filterCallback,
                d = n.filter,
                p = n.skip,
                h = n.take;
            return c && i && (s = s.sort(c, t, t, i)), d && (s = s.filter(d), u && (s = u(s)), o = s.toArray().length), c && !i && (s = s.sort(c), l && (e = s.toArray())), p !== t && h !== t && (s = s.range(p, h)), l && (s = s.group(l, e)), {
                total: o,
                data: s.toArray()
            }
        }, te = xe.extend({
            init: function(e) {
                this.data = e.data
            },
            read: function(e) {
                e.success(this.data)
            },
            update: function(e) {
                e.success(e.data)
            },
            create: function(e) {
                e.success(e.data)
            },
            destroy: function(e) {
                e.success(e.data)
            }
        }), ne = xe.extend({
            init: function(e) {
                var t, n = this;
                e = n.options = de({}, n.options, e), _e(Ve, function(t, n) {
                    typeof e[n] === Ce && (e[n] = {
                        url: e[n]
                    })
                }), n.cache = e.cache ? ie.create(e.cache) : {
                    find: be,
                    add: be
                }, t = e.parameterMap, e.submit && (n.submit = e.submit), ke(e.push) && (n.push = e.push), n.push || (n.push = Be), n.parameterMap = ke(t) ? t : function(e) {
                    var n = {};
                    return _e(e, function(e, i) {
                        e in t && (e = t[e], he(e) && (i = e.value(i), e = e.key)), n[e] = i
                    }), n
                }
            },
            options: {
                parameterMap: Be
            },
            create: function(e) {
                return ve(this.setup(e, Se))
            },
            read: function(n) {
                var i, o, a, r = this,
                    s = r.cache;
                n = r.setup(n, De), i = n.success || be, o = n.error || be, a = s.find(n.data), a !== t ? i(a) : (n.success = function(e) {
                    s.add(n.data, e), i(e)
                }, e.ajax(n))
            },
            update: function(e) {
                return ve(this.setup(e, Ie))
            },
            destroy: function(e) {
                return ve(this.setup(e, Ee))
            },
            setup: function(e, t) {
                e = e || {};
                var n, i = this,
                    o = i.options[t],
                    a = ke(o.data) ? o.data(e.data) : o.data;
                return e = de(!0, {}, o, e), n = de(!0, {}, a, e.data), e.data = i.parameterMap(n, t), ke(e.url) && (e.url = e.url(n)), e
            }
        }), ie = xe.extend({
            init: function() {
                this._store = {}
            },
            add: function(e, n) {
                e !== t && (this._store[Ne(e)] = n)
            },
            find: function(e) {
                return this._store[Ne(e)]
            },
            clear: function() {
                this._store = {}
            },
            remove: function(e) {
                delete this._store[Ne(e)]
            }
        }), ie.create = function(e) {
            var t = {
                inmemory: function() {
                    return new ie
                }
            };
            return he(e) && ke(e.find) ? e : e === !0 ? new ie : t[e]()
        }, oe = xe.extend({
            init: function(e) {
                var t, n, i, o, a, r, s, l, c, u, d, p, h, f, m = this;
                e = e || {};
                for (t in e) n = e[t], m[t] = typeof n === Ce ? Le(n) : n;
                o = e.modelBase || K, he(m.model) && (m.model = i = o.define(m.model)), a = pe(m.data, m), m._dataAccessFunction = a, m.model && (r = pe(m.groups, m), s = pe(m.serialize, m), l = {}, c = {}, u = {}, d = {}, p = !1, i = m.model, i.fields && (_e(i.fields, function(e, t) {
                    var n;
                    h = e, he(t) && t.field ? h = t.field : typeof t === Ce && (h = t), he(t) && t.from && (n = t.from), p = p || n && n !== e || h !== e, f = n || h, c[e] = f.indexOf(".") !== -1 ? Le(f, !0) : Le(f), u[e] = Le(e), l[n || h] = e, d[e] = n || h
                }), !e.serialize && p && (m.serialize = x(s, i, w, u, l, d))), m._dataAccessFunction = a, m._wrapDataAccessBase = C(i, k, c, l, d), m.data = x(a, i, k, c, l, d), m.groups = x(r, i, y, c, l, d))
            },
            errors: function(e) {
                return e ? e.errors : null
            },
            parse: Be,
            data: Be,
            total: function(e) {
                return e.length
            },
            groups: Be,
            aggregates: function() {
                return {}
            },
            serialize: function(e) {
                return e
            }
        }), ae = ye.extend({
            init: function(e) {
                var n, i, o, a = this;
                e && (i = e.data), e = a.options = de({}, a.options, e), a._map = {}, a._prefetch = {}, a._data = [], a._pristineData = [], a._ranges = [], a._view = [], a._pristineTotal = 0, a._destroyed = [], a._pageSize = e.pageSize, a._page = e.page || (e.pageSize ? 1 : t), a._sort = r(e.sort), a._filter = l(e.filter), a._group = f(e.group), a._aggregate = e.aggregate, a._total = e.total, a._shouldDetachObservableParents = !0, ye.fn.init.call(a), a.transport = re.create(e, i, a), ke(a.transport.push) && a.transport.push({
                    pushCreate: pe(a._pushCreate, a),
                    pushUpdate: pe(a._pushUpdate, a),
                    pushDestroy: pe(a._pushDestroy, a)
                }), null != e.offlineStorage && ("string" == typeof e.offlineStorage ? (o = e.offlineStorage, a._storage = {
                    getItem: function() {
                        return JSON.parse(localStorage.getItem(o))
                    },
                    setItem: function(e) {
                        localStorage.setItem(o, Ne(a.reader.serialize(e)))
                    }
                }) : a._storage = e.offlineStorage), a.reader = new we.data.readers[e.schema.type || "json"](e.schema), n = a.reader.model || {}, a._detachObservableParents(), a._data = a._observe(a._data), a._online = !0, a.bind(["push", Me, Fe, Oe, Ae, ze, He], e)
            },
            options: {
                data: null,
                schema: {
                    modelBase: K
                },
                offlineStorage: null,
                serverSorting: !1,
                serverPaging: !1,
                serverFiltering: !1,
                serverGrouping: !1,
                serverAggregates: !1,
                batch: !1,
                inPlaceSort: !1
            },
            clone: function() {
                return this
            },
            online: function(n) {
                return n !== t ? this._online != n && (this._online = n, n) ? this.sync() : e.Deferred().resolve().promise() : this._online
            },
            offlineData: function(e) {
                return null == this.options.offlineStorage ? null : e !== t ? this._storage.setItem(e) : this._storage.getItem() || []
            },
            _isServerGrouped: function() {
                var e = this.group() || [];
                return this.options.serverGrouping && e.length
            },
            _pushCreate: function(e) {
                this._push(e, "pushCreate")
            },
            _pushUpdate: function(e) {
                this._push(e, "pushUpdate")
            },
            _pushDestroy: function(e) {
                this._push(e, "pushDestroy")
            },
            _push: function(e, t) {
                var n = this._readData(e);
                n || (n = e), this[t](n)
            },
            _flatData: function(e, t) {
                if (e) {
                    if (this._isServerGrouped()) return D(e);
                    if (!t)
                        for (var n = 0; n < e.length; n++) e.at(n)
                }
                return e
            },
            parent: be,
            get: function(e) {
                var t, n, i = this._flatData(this._data, this.options.useRanges);
                for (t = 0, n = i.length; t < n; t++)
                    if (i[t].id == e) return i[t]
            },
            getByUid: function(e) {
                return this._getByUid(e, this._data)
            },
            _getByUid: function(e, t) {
                var n, i, o = this._flatData(t, this.options.useRanges);
                if (o)
                    for (n = 0, i = o.length; n < i; n++)
                        if (o[n].uid == e) return o[n]
            },
            indexOf: function(e) {
                return H(this._data, e)
            },
            at: function(e) {
                return this._data.at(e)
            },
            data: function(e) {
                var n, i = this;
                if (e === t) {
                    if (i._data)
                        for (n = 0; n < i._data.length; n++) i._data.at(n);
                    return i._data
                }
                i._detachObservableParents(), i._data = this._observe(e), i._pristineData = e.slice(0), i._storeData(), i._ranges = [], i.trigger("reset"), i._addRange(i._data), i._total = i._data.length, i._pristineTotal = i._total, i._process(i._data)
            },
            view: function(e) {
                return e === t ? this._view : (this._view = this._observeView(e), t)
            },
            _observeView: function(e) {
                var t, n = this;
                return P(e, n._data, n._ranges, n.reader.model || $, n._isServerGrouped()), t = new q(e, n.reader.model), t.parent = function() {
                    return n.parent()
                }, t
            },
            flatView: function() {
                var e = this.group() || [];
                return e.length ? D(this._view) : this._view
            },
            add: function(e) {
                return this.insert(this._data.length, e)
            },
            _createNewModel: function(e) {
                return this.reader.model ? new this.reader.model(e) : e instanceof $ ? e : new $(e)
            },
            insert: function(e, t) {
                return t || (t = e, e = 0), t instanceof K || (t = this._createNewModel(t)), this._isServerGrouped() ? this._data.splice(e, 0, this._wrapInEmptyGroup(t)) : this._data.splice(e, 0, t), this._insertModelInRange(e, t), t
            },
            pushInsert: function(t, n) {
                var i, o, a, r, s, l, c = this,
                    u = c._getCurrentRangeSpan();
                n || (n = t, t = 0), me(n) || (n = [n]), i = [], o = this.options.autoSync, this.options.autoSync = !1;
                try {
                    for (a = 0; a < n.length; a++) r = n[a], s = this.insert(t, r), i.push(s), l = s.toJSON(), this._isServerGrouped() && (l = this._wrapInEmptyGroup(l)), this._pristineData.push(l), u && u.length && e(u).last()[0].pristineData.push(l), t++
                } finally {
                    this.options.autoSync = o
                }
                i.length && this.trigger("push", {
                    type: "create",
                    items: i
                })
            },
            pushCreate: function(e) {
                this.pushInsert(this._data.length, e)
            },
            pushUpdate: function(e) {
                var t, n, i, o, a;
                for (me(e) || (e = [e]), t = [], n = 0; n < e.length; n++) i = e[n], o = this._createNewModel(i), a = this.get(o.id), a ? (t.push(a), a.accept(i), a.trigger(Fe), this._updatePristineForModel(a, i)) : this.pushCreate(i);
                t.length && this.trigger("push", {
                    type: "update",
                    items: t
                })
            },
            pushDestroy: function(e) {
                var t = this._removeItems(e);
                t.length && this.trigger("push", {
                    type: "destroy",
                    items: t
                })
            },
            _removeItems: function(e) {
                var t, n, i, o, a, r;
                me(e) || (e = [e]), t = [], n = this.options.autoSync, this.options.autoSync = !1;
                try {
                    for (i = 0; i < e.length; i++) o = e[i], a = this._createNewModel(o), r = !1, this._eachItem(this._data, function(e) {
                        var n, i;
                        for (n = 0; n < e.length; n++)
                            if (i = e.at(n), i.id === a.id) {
                                t.push(i), e.splice(n, 1), r = !0;
                                break
                            }
                    }), r && (this._removePristineForModel(a), this._destroyed.pop())
                } finally {
                    this.options.autoSync = n
                }
                return t
            },
            remove: function(e) {
                var t, n = this,
                    i = n._isServerGrouped();
                return this._eachItem(n._data, function(o) {
                    if (t = M(o, e), t && i) return t.isNew && t.isNew() || n._destroyed.push(t), !0
                }), this._removeModelFromRanges(e), e
            },
            destroyed: function() {
                return this._destroyed
            },
            created: function() {
                var e, t, n = [],
                    i = this._flatData(this._data, this.options.useRanges);
                for (e = 0, t = i.length; e < t; e++) i[e].isNew && i[e].isNew() && n.push(i[e]);
                return n
            },
            updated: function() {
                var e, t, n = [],
                    i = this._flatData(this._data, this.options.useRanges);
                for (e = 0, t = i.length; e < t; e++) i[e].isNew && !i[e].isNew() && i[e].dirty && n.push(i[e]);
                return n
            },
            sync: function() {
                var t, n = this,
                    i = [],
                    o = [],
                    a = n._destroyed,
                    r = e.Deferred().resolve().promise();
                if (n.online()) {
                    if (!n.reader.model) return r;
                    i = n.created(), o = n.updated(), t = [], n.options.batch && n.transport.submit ? t = n._sendSubmit(i, o, a) : (t.push.apply(t, n._send("create", i)), t.push.apply(t, n._send("update", o)), t.push.apply(t, n._send("destroy", a))), r = e.when.apply(null, t).then(function() {
                        var e, t;
                        for (e = 0, t = arguments.length; e < t; e++) arguments[e] && n._accept(arguments[e]);
                        n._storeData(!0), n._change({
                            action: "sync"
                        }), n.trigger(Ae)
                    })
                } else n._storeData(!0), n._change({
                    action: "sync"
                });
                return r
            },
            cancelChanges: function(e) {
                var t = this;
                e instanceof we.data.Model ? t._cancelModel(e) : (t._destroyed = [], t._detachObservableParents(), t._data = t._observe(t._pristineData), t.options.serverPaging && (t._total = t._pristineTotal), t._ranges = [], t._addRange(t._data, 0), t._change(), t._markOfflineUpdatesAsDirty())
            },
            _markOfflineUpdatesAsDirty: function() {
                var e = this;
                null != e.options.offlineStorage && e._eachItem(e._data, function(e) {
                    var t, n;
                    for (t = 0; t < e.length; t++) n = e.at(t), "update" != n.__state__ && "create" != n.__state__ || (n.dirty = !0)
                })
            },
            hasChanges: function() {
                var e, t, n = this._flatData(this._data, this.options.useRanges);
                if (this._destroyed.length) return !0;
                for (e = 0, t = n.length; e < t; e++)
                    if (n[e].isNew && n[e].isNew() || n[e].dirty) return !0;
                return !1
            },
            _accept: function(t) {
                var n, i = this,
                    o = t.models,
                    a = t.response,
                    r = 0,
                    s = i._isServerGrouped(),
                    l = i._pristineData,
                    c = t.type;
                if (i.trigger(ze, {
                        response: a,
                        type: c
                    }), a && !fe(a)) {
                    if (a = i.reader.parse(a), i._handleCustomErrors(a)) return;
                    a = i.reader.data(a), me(a) || (a = [a])
                } else a = e.map(o, function(e) {
                    return e.toJSON()
                });
                for ("destroy" === c && (i._destroyed = []), r = 0, n = o.length; r < n; r++) "destroy" !== c ? (o[r].accept(a[r]), "create" === c ? l.push(s ? i._wrapInEmptyGroup(o[r]) : a[r]) : "update" === c && i._updatePristineForModel(o[r], a[r])) : i._removePristineForModel(o[r])
            },
            _updatePristineForModel: function(e, t) {
                this._executeOnPristineForModel(e, function(e, n) {
                    we.deepExtend(n[e], t)
                })
            },
            _executeOnPristineForModel: function(e, t) {
                this._eachPristineItem(function(n) {
                    var i = O(n, e);
                    if (i > -1) return t(i, n), !0
                })
            },
            _removePristineForModel: function(e) {
                this._executeOnPristineForModel(e, function(e, t) {
                    t.splice(e, 1)
                })
            },
            _readData: function(e) {
                var t = this._isServerGrouped() ? this.reader.groups : this.reader.data;
                return t.call(this.reader, e)
            },
            _eachPristineItem: function(e) {
                var t = this,
                    n = t.options,
                    i = t._getCurrentRangeSpan();
                t._eachItem(t._pristineData, e), n.serverPaging && n.useRanges && _e(i, function(n, i) {
                    t._eachItem(i.pristineData, e)
                })
            },
            _eachItem: function(e, t) {
                e && e.length && (this._isServerGrouped() ? E(e, t) : t(e))
            },
            _pristineForModel: function(e) {
                var t, n, i = function(i) {
                    if (n = O(i, e), n > -1) return t = i[n], !0
                };
                return this._eachPristineItem(i), t
            },
            _cancelModel: function(e) {
                var t = this,
                    n = this._pristineForModel(e);
                this._eachItem(this._data, function(i) {
                    var o = H(i, e);
                    o >= 0 && (!n || e.isNew() && !n.__state__ ? (i.splice(o, 1), t._removeModelFromRanges(e)) : (i[o].accept(n), "update" == n.__state__ && (i[o].dirty = !0)))
                })
            },
            _submit: function(t, n) {
                var i = this;
                i.trigger(Oe, {
                    type: "submit"
                }), i.trigger(He), i.transport.submit(de({
                    success: function(n, i) {
                        var o = e.grep(t, function(e) {
                            return e.type == i
                        })[0];
                        o && o.resolve({
                            response: n,
                            models: o.models,
                            type: i
                        })
                    },
                    error: function(e, n, o) {
                        for (var a = 0; a < t.length; a++) t[a].reject(e);
                        i.error(e, n, o)
                    }
                }, n))
            },
            _sendSubmit: function(t, n, i) {
                var o = this,
                    a = [];
                return o.options.batch && (t.length && a.push(e.Deferred(function(e) {
                    e.type = "create", e.models = t
                })), n.length && a.push(e.Deferred(function(e) {
                    e.type = "update", e.models = n
                })), i.length && a.push(e.Deferred(function(e) {
                    e.type = "destroy", e.models = i
                })), o._submit(a, {
                    data: {
                        created: o.reader.serialize(b(t)),
                        updated: o.reader.serialize(b(n)),
                        destroyed: o.reader.serialize(b(i))
                    }
                })), a
            },
            _promise: function(t, n, i) {
                var o = this;
                return e.Deferred(function(e) {
                    o.trigger(Oe, {
                        type: i
                    }), o.trigger(He), o.transport[i].call(o.transport, de({
                        success: function(t) {
                            e.resolve({
                                response: t,
                                models: n,
                                type: i
                            })
                        },
                        error: function(t, n, i) {
                            e.reject(t), o.error(t, n, i)
                        }
                    }, t))
                }).promise()
            },
            _send: function(e, t) {
                var n, i, o = this,
                    a = [],
                    r = o.reader.serialize(b(t));
                if (o.options.batch) t.length && a.push(o._promise({
                    data: {
                        models: r
                    }
                }, t, e));
                else
                    for (n = 0, i = t.length; n < i; n++) a.push(o._promise({
                        data: r[n]
                    }, [t[n]], e));
                return a
            },
            read: function(t) {
                var n = this,
                    i = n._params(t),
                    o = e.Deferred();
                return n._queueRequest(i, function() {
                    var e = n.trigger(Oe, {
                        type: "read"
                    });
                    e ? (n._dequeueRequest(), o.resolve(e)) : (n.trigger(He), n._ranges = [], n.trigger("reset"), n.online() ? n.transport.read({
                        data: i,
                        success: function(e) {
                            n._ranges = [], n.success(e, i), o.resolve()
                        },
                        error: function() {
                            var e = Ge.call(arguments);
                            n.error.apply(n, e), o.reject.apply(o, e)
                        }
                    }) : null != n.options.offlineStorage && (n.success(n.offlineData(), i), o.resolve()))
                }), o.promise()
            },
            _readAggregates: function(e) {
                return this.reader.aggregates(e)
            },
            success: function(e) {
                var n, i, o, a, r, s, l, c, u, d = this,
                    p = d.options;
                if (d.trigger(ze, {
                        response: e,
                        type: "read"
                    }), d.online()) {
                    if (e = d.reader.parse(e), d._handleCustomErrors(e)) return d._dequeueRequest(), t;
                    d._total = d.reader.total(e), d._pageSize > d._total && (d._pageSize = d._total, d.options.pageSize && d.options.pageSize > d._pageSize && (d._pageSize = d.options.pageSize)), d._aggregate && p.serverAggregates && (d._aggregateResult = d._readAggregates(e)), e = d._readData(e), d._destroyed = []
                } else {
                    for (e = d._readData(e), n = [], i = {}, o = d.reader.model, a = o ? o.idField : "id", r = 0; r < this._destroyed.length; r++) s = this._destroyed[r][a], i[s] = s;
                    for (r = 0; r < e.length; r++) l = e[r], c = l.__state__, "destroy" == c ? i[l[a]] || this._destroyed.push(this._createNewModel(l)) : n.push(l);
                    e = n, d._total = e.length
                }
                if (d._pristineTotal = d._total, d._pristineData = e.slice(0), d._detachObservableParents(), d.options.endless) {
                    for (d._data.unbind(Fe, d._changeHandler), d._isServerGrouped() && d._data[d._data.length - 1].value === e[0].value && (T(d._data[d._data.length - 1], e[0]), e.shift()), e = d._observe(e), u = 0; u < e.length; u++) d._data.push(e[u]);
                    d._data.bind(Fe, d._changeHandler)
                } else d._data = d._observe(e);
                d._markOfflineUpdatesAsDirty(), d._storeData(), d._addRange(d._data), d._process(d._data), d._dequeueRequest()
            },
            _detachObservableParents: function() {
                if (this._data && this._shouldDetachObservableParents)
                    for (var e = 0; e < this._data.length; e++) this._data[e].parent && (this._data[e].parent = be)
            },
            _storeData: function(e) {
                function t(e) {
                    var n, i, o, a = [];
                    for (n = 0; n < e.length; n++) i = e.at(n), o = i.toJSON(), r && i.items ? o.items = t(i.items) : (o.uid = i.uid, s && (i.isNew() ? o.__state__ = "create" : i.dirty && (o.__state__ = "update"))), a.push(o);
                    return a
                }
                var n, i, o, a, r = this._isServerGrouped(),
                    s = this.reader.model;
                if (null != this.options.offlineStorage) {
                    for (n = t(this._data), i = [], o = 0; o < this._destroyed.length; o++) a = this._destroyed[o].toJSON(), a.__state__ = "destroy", i.push(a);
                    this.offlineData(n.concat(i)), e && (this._pristineData = this.reader._wrapDataAccessBase(n))
                }
            },
            _addRange: function(e, n) {
                var i = this,
                    o = t !== n ? n : i._skip || 0,
                    a = o + i._flatData(e, !0).length;
                i._ranges.push({
                    start: o,
                    end: a,
                    data: e,
                    pristineData: e.toJSON(),
                    timestamp: i._timeStamp()
                }), i._sortRanges()
            },
            _sortRanges: function() {
                this._ranges.sort(function(e, t) {
                    return e.start - t.start
                })
            },
            error: function(e, t, n) {
                this._dequeueRequest(), this.trigger(ze, {}), this.trigger(Me, {
                    xhr: e,
                    status: t,
                    errorThrown: n
                })
            },
            _params: function(e) {
                var t = this,
                    n = de({
                        take: t.take(),
                        skip: t.skip(),
                        page: t.page(),
                        pageSize: t.pageSize(),
                        sort: t._sort,
                        filter: t._filter,
                        group: t._group,
                        aggregate: t._aggregate
                    }, e);
                return t.options.serverPaging || (delete n.take, delete n.skip, delete n.page, delete n.pageSize), t.options.serverGrouping ? t.reader.model && n.group && (n.group = L(n.group, t.reader.model)) : delete n.group, t.options.serverFiltering ? t.reader.model && n.filter && (n.filter = B(n.filter, t.reader.model)) : delete n.filter, t.options.serverSorting ? t.reader.model && n.sort && (n.sort = L(n.sort, t.reader.model)) : delete n.sort, t.options.serverAggregates ? t.reader.model && n.aggregate && (n.aggregate = L(n.aggregate, t.reader.model)) : delete n.aggregate, n
            },
            _queueRequest: function(e, n) {
                var i = this;
                i._requestInProgress ? i._pending = {
                    callback: pe(n, i),
                    options: e
                } : (i._requestInProgress = !0, i._pending = t, n())
            },
            _dequeueRequest: function() {
                var e = this;
                e._requestInProgress = !1, e._pending && e._queueRequest(e._pending.options, e._pending.callback)
            },
            _handleCustomErrors: function(e) {
                if (this.reader.errors) {
                    var t = this.reader.errors(e);
                    if (t) return this.trigger(Me, {
                        xhr: null,
                        status: "customerror",
                        errorThrown: "custom error",
                        errors: t
                    }), !0
                }
                return !1
            },
            _shouldWrap: function(e) {
                var t = this.reader.model;
                return !(!t || !e.length) && !(e[0] instanceof t)
            },
            _observe: function(e) {
                var t, n = this,
                    i = n.reader.model;
                return n._shouldDetachObservableParents = !0, e instanceof Xe ? (n._shouldDetachObservableParents = !1, n._shouldWrap(e) && (e.type = n.reader.model, e.wrapAll(e, e))) : (t = n.pageSize() && !n.options.serverPaging ? q : Xe, e = new t(e, n.reader.model), e.parent = function() {
                    return n.parent()
                }), n._isServerGrouped() && I(e, i), n._changeHandler && n._data && n._data instanceof Xe ? n._data.unbind(Fe, n._changeHandler) : n._changeHandler = pe(n._change, n), e.bind(Fe, n._changeHandler)
            },
            _updateTotalForAction: function(e, t) {
                var n = this,
                    i = parseInt(n._total, 10);
                v(n._total) || (i = parseInt(n._pristineTotal, 10)), "add" === e ? i += t.length : "remove" === e ? i -= t.length : "itemchange" === e || "sync" === e || n.options.serverPaging ? "sync" === e && (i = n._pristineTotal = parseInt(n._total, 10)) : i = n._pristineTotal, n._total = i
            },
            _change: function(e) {
                var t, n, i, o = this,
                    a = e ? e.action : "";
                if ("remove" === a)
                    for (t = 0, n = e.items.length; t < n; t++) e.items[t].isNew && e.items[t].isNew() || o._destroyed.push(e.items[t]);
                !o.options.autoSync || "add" !== a && "remove" !== a && "itemchange" !== a ? (o._updateTotalForAction(a, e ? e.items : []), o._process(o._data, e)) : (i = function(t) {
                    "sync" === t.action && (o.unbind("change", i), o._updateTotalForAction(a, e.items))
                }, o.first("change", i), o.sync())
            },
            _calculateAggregates: function(e, t) {
                t = t || {};
                var n = new a(e),
                    i = t.aggregate,
                    o = t.filter;
                return o && (n = n.filter(o)), n.aggregate(i)
            },
            _process: function(e, n) {
                var i, o = this,
                    a = {};
                o.options.serverPaging !== !0 && (a.skip = o._skip, a.take = o._take || o._pageSize, a.skip === t && o._page !== t && o._pageSize !== t && (a.skip = (o._page - 1) * o._pageSize), o.options.useRanges && (a.skip = o.currentRangeStart())), o.options.serverSorting !== !0 && (a.sort = o._sort), o.options.serverFiltering !== !0 && (a.filter = o._filter), o.options.serverGrouping !== !0 && (a.group = o._group), o.options.serverAggregates !== !0 && (a.aggregate = o._aggregate, o._aggregateResult = o._calculateAggregates(e, a)), i = o._queryProcess(e, a), o.view(i.data), i.total === t || o.options.serverFiltering || (o._total = i.total), n = n || {}, n.items = n.items || o._view, o.trigger(Fe, n)
            },
            _queryProcess: function(e, t) {
                return this.options.inPlaceSort ? a.process(e, t, this.options.inPlaceSort) : a.process(e, t)
            },
            _mergeState: function(e) {
                var n = this;
                return e !== t && (n._pageSize = e.pageSize, n._page = e.page, n._sort = e.sort, n._filter = e.filter, n._group = e.group, n._aggregate = e.aggregate, n._skip = n._currentRangeStart = e.skip, n._take = e.take, n._skip === t && (n._skip = n._currentRangeStart = n.skip(), e.skip = n.skip()), n._take === t && n._pageSize !== t && (n._take = n._pageSize, e.take = n._take), e.sort && (n._sort = e.sort = r(e.sort)), e.filter && (n._filter = e.filter = l(e.filter)), e.group && (n._group = e.group = f(e.group)), e.aggregate && (n._aggregate = e.aggregate = h(e.aggregate))), e
            },
            query: function(n) {
                var i, o, a, r = this.options.serverSorting || this.options.serverPaging || this.options.serverFiltering || this.options.serverGrouping || this.options.serverAggregates;
                return r || (this._data === t || 0 === this._data.length) && !this._destroyed.length ? (this.options.endless && (o = n.pageSize - this.pageSize(), o > 0 ? (o = this.pageSize(), n.page = n.pageSize / o, n.pageSize = o) : (n.page = 1, this.options.endless = !1)), this.read(this._mergeState(n))) : (a = this.trigger(Oe, {
                    type: "read"
                }), a || (this.trigger(He), i = this._queryProcess(this._data, this._mergeState(n)), this.options.serverFiltering || (this._total = i.total !== t ? i.total : this._data.length), this._aggregateResult = this._calculateAggregates(this._data, n), this.view(i.data), this.trigger(ze, {
                    type: "read"
                }), this.trigger(Fe, {
                    items: i.data
                })), e.Deferred().resolve(a).promise())
            },
            fetch: function(e) {
                var t = this,
                    n = function(n) {
                        n !== !0 && ke(e) && e.call(t)
                    };
                return this._query().then(n)
            },
            _query: function(e) {
                var t = this;
                return t.query(de({}, {
                    page: t.page(),
                    pageSize: t.pageSize(),
                    sort: t.sort(),
                    filter: t.filter(),
                    group: t.group(),
                    aggregate: t.aggregate()
                }, e))
            },
            next: function(e) {
                var t = this,
                    n = t.page(),
                    i = t.total();
                if (e = e || {}, n && !(i && n + 1 > t.totalPages())) return t._skip = t._currentRangeStart = n * t.take(), n += 1, e.page = n, t._query(e), n
            },
            prev: function(e) {
                var t = this,
                    n = t.page();
                if (e = e || {}, n && 1 !== n) return t._skip = t._currentRangeStart = t._skip - t.take(), n -= 1, e.page = n, t._query(e), n
            },
            page: function(e) {
                var n, i = this;
                return e !== t ? (e = Re.max(Re.min(Re.max(e, 1), i.totalPages()), 1), i._query({
                    page: e
                }), t) : (n = i.skip(), n !== t ? Re.round((n || 0) / (i.take() || 1)) + 1 : t)
            },
            pageSize: function(e) {
                var n = this;
                return e !== t ? (n._query({
                    pageSize: e,
                    page: 1
                }), t) : n.take()
            },
            sort: function(e) {
                var n = this;
                return e !== t ? (n._query({
                    sort: e
                }), t) : n._sort
            },
            filter: function(e) {
                var n = this;
                return e === t ? n._filter : (n.trigger("reset"), n._query({
                    filter: e,
                    page: 1
                }), t)
            },
            group: function(e) {
                var n = this;
                return e !== t ? (n._query({
                    group: e
                }), t) : n._group
            },
            total: function() {
                return parseInt(this._total || 0, 10)
            },
            aggregate: function(e) {
                var n = this;
                return e !== t ? (n._query({
                    aggregate: e
                }), t) : n._aggregate
            },
            aggregates: function() {
                var e = this._aggregateResult;
                return fe(e) && (e = this._emptyAggregates(this.aggregate())), e
            },
            _emptyAggregates: function(e) {
                var t, n, i = {};
                if (!fe(e))
                    for (t = {}, me(e) || (e = [e]), n = 0; n < e.length; n++) t[e[n].aggregate] = 0, i[e[n].field] = t;
                return i
            },
            _wrapInEmptyGroup: function(e) {
                var t, n, i, o, a = this.group();
                for (i = a.length - 1, o = 0; i >= o; i--) n = a[i], t = {
                    value: e.get(n.field),
                    field: n.field,
                    items: t ? [t] : [e],
                    hasSubgroups: !!t,
                    aggregates: this._emptyAggregates(n.aggregates)
                };
                return t
            },
            totalPages: function() {
                var e = this,
                    t = e.pageSize() || e.total();
                return Re.ceil((e.total() || 0) / t)
            },
            inRange: function(e, t) {
                var n = this,
                    i = Re.min(e + t, n.total());
                return !n.options.serverPaging && n._data.length > 0 || n._findRange(e, i).length > 0
            },
            lastRange: function() {
                var e = this._ranges;
                return e[e.length - 1] || {
                    start: 0,
                    end: 0,
                    data: []
                }
            },
            firstItemUid: function() {
                var e = this._ranges;
                return e.length && e[0].data.length && e[0].data[0].uid
            },
            enableRequestsInProgress: function() {
                this._skipRequestsInProgress = !1
            },
            _timeStamp: function() {
                return (new Date).getTime()
            },
            range: function(e, n, i) {
                this._currentRequestTimeStamp = this._timeStamp(), this._skipRequestsInProgress = !0, e = Re.min(e || 0, this.total()), i = ke(i) ? i : be;
                var o, a = this,
                    r = Re.max(Re.floor(e / n), 0) * n,
                    s = Re.min(r + n, a.total());
                return o = a._findRange(e, Re.min(e + n, a.total())), o.length || 0 === a.total() ? (a._processRangeData(o, e, n, r, s), i(), t) : (n !== t && (a._rangeExists(r, s) ? r < e && a.prefetch(s, n, function() {
                    a.range(e, n, i)
                }) : a.prefetch(r, n, function() {
                    e > r && s < a.total() && !a._rangeExists(s, Re.min(s + n, a.total())) ? a.prefetch(s, n, function() {
                        a.range(e, n, i)
                    }) : a.range(e, n, i)
                })), t)
            },
            _findRange: function(e, n) {
                var i, o, a, s, l, c, u, d, p, h, m, g, v = this,
                    _ = v._ranges,
                    b = [],
                    w = v.options,
                    k = w.serverSorting || w.serverPaging || w.serverFiltering || w.serverGrouping || w.serverAggregates;
                for (o = 0, m = _.length; o < m; o++)
                    if (i = _[o], e >= i.start && e <= i.end) {
                        for (h = 0, a = o; a < m; a++)
                            if (i = _[a], p = v._flatData(i.data, !0), p.length && e + h >= i.start && (c = i.data, u = i.end, k || (w.inPlaceSort ? d = v._queryProcess(i.data, {
                                    filter: v.filter()
                                }) : (g = f(v.group() || []).concat(r(v.sort() || [])), d = v._queryProcess(i.data, {
                                    sort: g,
                                    filter: v.filter()
                                })), p = c = d.data, d.total !== t && (u = d.total)), s = 0, e + h > i.start && (s = e + h - i.start), l = p.length, u > n && (l -= u - n), h += l - s, b = v._mergeGroups(b, c, s, l), n <= i.end && h == n - e)) return b;
                        break
                    }
                return []
            },
            _mergeGroups: function(e, t, n, i) {
                if (this._isServerGrouped()) {
                    var o, a = t.toJSON();
                    return e.length && (o = e[e.length - 1]), S(o, a, n, i), e.concat(a)
                }
                return e.concat(t.slice(n, i))
            },
            _processRangeData: function(e, n, i, o, a) {
                var r, s, l, c, u = this;
                u._pending = t, u._skip = n > u.skip() ? Re.min(a, (u.totalPages() - 1) * u.take()) : o, u._currentRangeStart = n, u._take = i, r = u.options.serverPaging, s = u.options.serverSorting, l = u.options.serverFiltering, c = u.options.serverAggregates;
                try {
                    u.options.serverPaging = !0, u._isServerGrouped() || u.group() && u.group().length || (u.options.serverSorting = !0), u.options.serverFiltering = !0, u.options.serverPaging = !0, u.options.serverAggregates = !0, r && (u._detachObservableParents(), u._data = e = u._observe(e)), u._process(e)
                } finally {
                    u.options.serverPaging = r, u.options.serverSorting = s, u.options.serverFiltering = l, u.options.serverAggregates = c
                }
            },
            skip: function() {
                var e = this;
                return e._skip === t ? e._page !== t ? (e._page - 1) * (e.take() || 1) : t : e._skip
            },
            currentRangeStart: function() {
                return this._currentRangeStart || 0
            },
            take: function() {
                return this._take || this._pageSize
            },
            _prefetchSuccessHandler: function(e, t, n, i) {
                var o = this,
                    a = o._timeStamp();
                return function(r) {
                    var s, l, c, u = !1,
                        d = {
                            start: e,
                            end: t,
                            data: [],
                            timestamp: o._timeStamp()
                        };
                    if (o._dequeueRequest(), o.trigger(ze, {
                            response: r,
                            type: "read"
                        }), r = o.reader.parse(r), c = o._readData(r), c.length) {
                        for (s = 0, l = o._ranges.length; s < l; s++)
                            if (o._ranges[s].start === e) {
                                u = !0, d = o._ranges[s], d.pristineData = c, d.data = o._observe(c), d.end = d.start + o._flatData(d.data, !0).length, o._sortRanges();
                                break
                            }
                        u || o._addRange(o._observe(c), e)
                    }
                    o._total = o.reader.total(r), (i || a >= o._currentRequestTimeStamp || !o._skipRequestsInProgress) && (n && c.length ? n() : o.trigger(Fe, {}))
                }
            },
            prefetch: function(e, t, n) {
                var i = this,
                    o = Re.min(e + t, i.total()),
                    a = {
                        take: t,
                        skip: e,
                        page: e / t + 1,
                        pageSize: t,
                        sort: i._sort,
                        filter: i._filter,
                        group: i._group,
                        aggregate: i._aggregate
                    };
                i._rangeExists(e, o) ? n && n() : (clearTimeout(i._timeout), i._timeout = setTimeout(function() {
                    i._queueRequest(a, function() {
                        i.trigger(Oe, {
                            type: "read"
                        }) ? i._dequeueRequest() : i.transport.read({
                            data: i._params(a),
                            success: i._prefetchSuccessHandler(e, o, n),
                            error: function() {
                                var e = Ge.call(arguments);
                                i.error.apply(i, e)
                            }
                        })
                    })
                }, 100))
            },
            _multiplePrefetch: function(e, t, n) {
                var i = this,
                    o = Re.min(e + t, i.total()),
                    a = {
                        take: t,
                        skip: e,
                        page: e / t + 1,
                        pageSize: t,
                        sort: i._sort,
                        filter: i._filter,
                        group: i._group,
                        aggregate: i._aggregate
                    };
                i._rangeExists(e, o) ? n && n() : i.trigger(Oe, {
                    type: "read"
                }) || i.transport.read({
                    data: i._params(a),
                    success: i._prefetchSuccessHandler(e, o, n, !0)
                })
            },
            _rangeExists: function(e, t) {
                var n, i, o = this,
                    a = o._ranges;
                for (n = 0, i = a.length; n < i; n++)
                    if (a[n].start <= e && a[n].end >= t) return !0;
                return !1
            },
            _getCurrentRangeSpan: function() {
                var e, t, n = this,
                    i = n._ranges,
                    o = n.currentRangeStart(),
                    a = o + (n.take() || 0),
                    r = [],
                    s = i.length;
                for (t = 0; t < s; t++) e = i[t], (e.start <= o && e.end >= o || e.start >= o && e.start <= a) && r.push(e);
                return r
            },
            _removeModelFromRanges: function(e) {
                var t, n, i, o, a = this;
                for (i = 0, o = this._ranges.length; i < o && (n = this._ranges[i], this._eachItem(n.data, function(n) {
                        t = M(n, e)
                    }), !t); i++);
                a._updateRangesLength()
            },
            _insertModelInRange: function(e, t) {
                var n, i, o = this,
                    a = o._ranges || [],
                    r = a.length;
                for (i = 0; i < r; i++)
                    if (n = a[i], n.start <= e && n.end >= e) {
                        o._getByUid(t.uid, n.data) || (o._isServerGrouped() ? n.data.splice(e, 0, o._wrapInEmptyGroup(t)) : n.data.splice(e, 0, t));
                        break
                    }
                o._updateRangesLength()
            },
            _updateRangesLength: function() {
                var e, t, n = this,
                    i = n._ranges || [],
                    o = i.length,
                    a = !1,
                    r = 0,
                    s = 0;
                for (t = 0; t < o; t++) e = i[t], s = n._flatData(e.data, !0).length - Re.abs(e.end - e.start), a || 0 === s ? a && (e.start += r, e.end += r) : (a = !0, r = s, e.end += r)
            }
        }), re = {}, re.create = function(t, n, i) {
            var o, a = t.transport ? e.extend({}, t.transport) : null;
            return a ? (a.read = typeof a.read === Ce ? {
                url: a.read
            } : a.read, "jsdo" === t.type && (a.dataSource = i), t.type && (we.data.transports = we.data.transports || {}, we.data.schemas = we.data.schemas || {}, we.data.transports[t.type] ? he(we.data.transports[t.type]) ? a = de(!0, {}, we.data.transports[t.type], a) : o = new we.data.transports[t.type](de(a, {
                data: n
            })) : we.logToConsole("Unknown DataSource transport type '" + t.type + "'.\nVerify that registration scripts for this type are included after Kendo UI on the page.", "warn"), t.schema = de(!0, {}, we.data.schemas[t.type], t.schema)), o || (o = ke(a.read) ? a : new ne(a))) : o = new te({
                data: t.data || []
            }), o
        }, ae.create = function(e) {
            (me(e) || e instanceof Xe) && (e = {
                data: e
            });
            var n, i, o, a = e || {},
                r = a.data,
                s = a.fields,
                l = a.table,
                c = a.select,
                u = {};
            if (r || !s || a.transport || (l ? r = R(l, s) : c && (r = N(c, s), a.group === t && r[0] && r[0].optgroup !== t && (a.group = "optgroup"))), we.data.Model && s && (!a.schema || !a.schema.model)) {
                for (n = 0, i = s.length; n < i; n++) o = s[n], o.type && (u[o.field] = o);
                fe(u) || (a.schema = de(!0, a.schema, {
                    model: {
                        fields: u
                    }
                }))
            }
            return a.data = r, c = null, a.select = null, l = null, a.table = null, a instanceof ae ? a : new ae(a)
        }, se = K.define({
            idField: "id",
            init: function(e) {
                var t, n = this,
                    i = n.hasChildren || e && e.hasChildren,
                    o = "items",
                    a = {};
                we.data.Model.fn.init.call(n, e), typeof n.children === Ce && (o = n.children), a = {
                    schema: {
                        data: o,
                        model: {
                            hasChildren: i,
                            id: n.idField,
                            fields: n.fields
                        }
                    }
                }, typeof n.children !== Ce && de(a, n.children), a.data = e, i || (i = a.schema.data), typeof i === Ce && (i = we.getter(i)), ke(i) && (t = i.call(n, n), n.hasChildren = (!t || 0 !== t.length) && !!t), n._childrenOptions = a, n.hasChildren && n._initChildren(), n._loaded = !(!e || !e._loaded)
            },
            _initChildren: function() {
                var e, t, n, i = this;
                i.children instanceof le || (e = i.children = new le(i._childrenOptions), t = e.transport, n = t.parameterMap, t.parameterMap = function(e, t) {
                    return e[i.idField || "id"] = i.id, n && (e = n(e, t)), e
                }, e.parent = function() {
                    return i
                }, e.bind(Fe, function(e) {
                    e.node = e.node || i, i.trigger(Fe, e)
                }), e.bind(Me, function(e) {
                    var t = i.parent();
                    t && (e.node = e.node || i, t.trigger(Me, e))
                }), i._updateChildrenField())
            },
            append: function(e) {
                this._initChildren(), this.loaded(!0), this.children.add(e)
            },
            hasChildren: !1,
            level: function() {
                for (var e = this.parentNode(), t = 0; e && e.parentNode;) t++, e = e.parentNode ? e.parentNode() : null;
                return t
            },
            _updateChildrenField: function() {
                var e = this._childrenOptions.schema.data;
                this[e || "items"] = this.children.data()
            },
            _childrenLoaded: function() {
                this._loaded = !0, this._updateChildrenField()
            },
            load: function() {
                var n, i, o = {},
                    a = "_query";
                return this.hasChildren ? (this._initChildren(), n = this.children, o[this.idField || "id"] = this.id, this._loaded || (n._data = t, a = "read"), n.one(Fe, pe(this._childrenLoaded, this)), this._matchFilter && (o.filter = {
                    field: "_matchFilter",
                    operator: "eq",
                    value: !0
                }), i = n[a](o)) : this.loaded(!0), i || e.Deferred().resolve().promise()
            },
            parentNode: function() {
                var e = this.parent();
                return e.parent()
            },
            loaded: function(e) {
                return e === t ? this._loaded : (this._loaded = e, t)
            },
            shouldSerialize: function(e) {
                return K.fn.shouldSerialize.call(this, e) && "children" !== e && "_loaded" !== e && "hasChildren" !== e && "_childrenOptions" !== e
            }
        }), le = ae.extend({
            init: function(e) {
                var t = se.define({
                    children: e
                });
                e.filter && !e.serverFiltering && (this._hierarchicalFilter = e.filter, e.filter = null), ae.fn.init.call(this, de(!0, {}, {
                    schema: {
                        modelBase: t,
                        model: t
                    }
                }, e)), this._attachBubbleHandlers()
            },
            _attachBubbleHandlers: function() {
                var e = this;
                e._data.bind(Me, function(t) {
                    e.trigger(Me, t)
                })
            },
            read: function(e) {
                var t = ae.fn.read.call(this, e);
                return this._hierarchicalFilter && (this._data && this._data.length > 0 ? this.filter(this._hierarchicalFilter) : (this.options.filter = this._hierarchicalFilter, this._filter = l(this.options.filter), this._hierarchicalFilter = null)), t
            },
            remove: function(e) {
                var t, n = e.parentNode(),
                    i = this;
                return n && n._initChildren && (i = n.children), t = ae.fn.remove.call(i, e), n && !i.data().length && (n.hasChildren = !1), t
            },
            success: W("success"),
            data: W("data"),
            insert: function(e, t) {
                var n = this.parent();
                return n && n._initChildren && (n.hasChildren = !0, n._initChildren()), ae.fn.insert.call(this, e, t)
            },
            filter: function(e) {
                return e === t ? this._filter : (!this.options.serverFiltering && this._markHierarchicalQuery(e) && (e = {
                    logic: "or",
                    filters: [e, {
                        field: "_matchFilter",
                        operator: "equals",
                        value: !0
                    }]
                }), this.trigger("reset"), this._query({
                    filter: e,
                    page: 1
                }), t)
            },
            _markHierarchicalQuery: function(e) {
                var t, n, i, o, r;
                return e = l(e), e && 0 !== e.filters.length ? (t = a.filterExpr(e), i = t.fields, o = t.operators, n = r = Function("d, __f, __o", "return " + t.expression), (i.length || o.length) && (r = function(e) {
                    return n(e, i, o)
                }), this._updateHierarchicalFilter(r), !0) : (this._updateHierarchicalFilter(function() {
                    return !0
                }), !1)
            },
            _updateHierarchicalFilter: function(e) {
                var t, n, i = this._data,
                    o = !1;
                for (n = 0; n < i.length; n++) t = i[n], t.hasChildren ? (t._matchFilter = t.children._updateHierarchicalFilter(e), t._matchFilter || (t._matchFilter = e(t))) : t._matchFilter = e(t), t._matchFilter && (o = !0);
                return o
            },
            _find: function(e, t) {
                var n, i, o, a, r = this._data;
                if (r) {
                    if (o = ae.fn[e].call(this, t)) return o;
                    for (r = this._flatData(this._data), n = 0, i = r.length; n < i; n++)
                        if (a = r[n].children, a instanceof le && (o = a[e](t))) return o
                }
            },
            get: function(e) {
                return this._find("get", e)
            },
            getByUid: function(e) {
                return this._find("getByUid", e)
            }
        }), le.create = function(e) {
            e = e && e.push ? {
                data: e
            } : e;
            var t = e || {},
                n = t.data,
                i = t.fields,
                o = t.list;
            return n && n._dataSource ? n._dataSource : (n || !i || t.transport || o && (n = U(o, i)), t.data = n, t instanceof le ? t : new le(t))
        }, ce = we.Observable.extend({
            init: function(e, t, n) {
                we.Observable.fn.init.call(this), this._prefetching = !1, this.dataSource = e, this.prefetch = !n;
                var i = this;
                e.bind("change", function() {
                    i._change()
                }), e.bind("reset", function() {
                    i._reset()
                }), this._syncWithDataSource(), this.setViewSize(t)
            },
            setViewSize: function(e) {
                this.viewSize = e, this._recalculate()
            },
            at: function(e) {
                var n = this.pageSize,
                    i = !0;
                return e >= this.total() ? (this.trigger("endreached", {
                    index: e
                }), null) : this.useRanges ? this.useRanges ? ((e < this.dataOffset || e >= this.skip + n) && (i = this.range(Math.floor(e / n) * n)), e === this.prefetchThreshold && this._prefetch(), e === this.midPageThreshold ? this.range(this.nextMidRange, !0) : e === this.nextPageThreshold ? this.range(this.nextFullRange) : e === this.pullBackThreshold && this.range(this.offset === this.skip ? this.previousMidRange : this.previousFullRange), i ? this.dataSource.at(e - this.dataOffset) : (this.trigger("endreached", {
                    index: e
                }), null)) : t : this.dataSource.view()[e]
            },
            indexOf: function(e) {
                return this.dataSource.data().indexOf(e) + this.dataOffset
            },
            total: function() {
                return parseInt(this.dataSource.total(), 10)
            },
            next: function() {
                var e = this,
                    t = e.pageSize,
                    n = e.skip - e.viewSize + t,
                    i = Re.max(Re.floor(n / t), 0) * t;
                this.offset = n, this.dataSource.prefetch(i, t, function() {
                    e._goToRange(n, !0)
                })
            },
            range: function(e, t) {
                if (this.offset === e) return !0;
                var n = this,
                    i = this.pageSize,
                    o = Re.max(Re.floor(e / i), 0) * i,
                    a = this.dataSource;
                return t && (o += i), a.inRange(e, i) ? (this.offset = e, this._recalculate(), this._goToRange(e), !0) : !this.prefetch || (a.prefetch(o, i, function() {
                    n.offset = e, n._recalculate(), n._goToRange(e, !0)
                }), !1)
            },
            syncDataSource: function() {
                var e = this.offset;
                this.offset = null, this.range(e)
            },
            destroy: function() {
                this.unbind()
            },
            _prefetch: function() {
                var e = this,
                    t = this.pageSize,
                    n = this.skip + t,
                    i = this.dataSource;
                i.inRange(n, t) || this._prefetching || !this.prefetch || (this._prefetching = !0, this.trigger("prefetching", {
                    skip: n,
                    take: t
                }), i.prefetch(n, t, function() {
                    e._prefetching = !1, e.trigger("prefetched", {
                        skip: n,
                        take: t
                    })
                }))
            },
            _goToRange: function(e, t) {
                this.offset === e && (this.dataOffset = e, this._expanding = t, this.dataSource.range(e, this.pageSize), this.dataSource.enableRequestsInProgress())
            },
            _reset: function() {
                this._syncPending = !0
            },
            _change: function() {
                var e = this.dataSource;
                this.length = this.useRanges ? e.lastRange().end : e.view().length, this._syncPending && (this._syncWithDataSource(), this._recalculate(), this._syncPending = !1, this.trigger("reset", {
                    offset: this.offset
                })), this.trigger("resize"), this._expanding && this.trigger("expand"), delete this._expanding
            },
            _syncWithDataSource: function() {
                var e = this.dataSource;
                this._firstItemUid = e.firstItemUid(), this.dataOffset = this.offset = e.skip() || 0, this.pageSize = e.pageSize(), this.useRanges = e.options.serverPaging
            },
            _recalculate: function() {
                var e = this.pageSize,
                    t = this.offset,
                    n = this.viewSize,
                    i = Math.ceil(t / e) * e;
                this.skip = i, this.midPageThreshold = i + e - 1, this.nextPageThreshold = i + n - 1, this.prefetchThreshold = i + Math.floor(e / 3 * 2), this.pullBackThreshold = this.offset - 1, this.nextMidRange = i + e - n, this.nextFullRange = i, this.previousMidRange = t - n, this.previousFullRange = i - e
            }
        }), ue = we.Observable.extend({
            init: function(e, t) {
                var n = this;
                we.Observable.fn.init.call(n), this.dataSource = e, this.batchSize = t, this._total = 0, this.buffer = new ce(e, 3 * t), this.buffer.bind({
                    endreached: function(e) {
                        n.trigger("endreached", {
                            index: e.index
                        })
                    },
                    prefetching: function(e) {
                        n.trigger("prefetching", {
                            skip: e.skip,
                            take: e.take
                        })
                    },
                    prefetched: function(e) {
                        n.trigger("prefetched", {
                            skip: e.skip,
                            take: e.take
                        })
                    },
                    reset: function() {
                        n._total = 0, n.trigger("reset")
                    },
                    resize: function() {
                        n._total = Math.ceil(this.length / n.batchSize), n.trigger("resize", {
                            total: n.total(),
                            offset: this.offset
                        })
                    }
                })
            },
            syncDataSource: function() {
                this.buffer.syncDataSource()
            },
            at: function(e) {
                var t, n, i = this.buffer,
                    o = e * this.batchSize,
                    a = this.batchSize,
                    r = [];
                for (i.offset > o && i.at(i.offset - 1), n = 0; n < a && (t = i.at(o + n), null !== t); n++) r.push(t);
                return r
            },
            total: function() {
                return this._total
            },
            destroy: function() {
                this.buffer.destroy(), this.unbind()
            }
        }), de(!0, we.data, {
            readers: {
                json: oe
            },
            Query: a,
            DataSource: ae,
            HierarchicalDataSource: le,
            Node: se,
            ObservableObject: $,
            ObservableArray: Xe,
            LazyObservableArray: q,
            LocalTransport: te,
            RemoteTransport: ne,
            Cache: ie,
            DataReader: oe,
            Model: K,
            Buffer: ce,
            BatchBuffer: ue
        })
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),
function(e, define) {
    define("kendo.binder.min", ["kendo.core.min", "kendo.data.min"], e)
}(function() {
    return function(e, t) {
        function n(t, n, i) {
            return v.extend({
                init: function(e, t, n) {
                    var i = this;
                    v.fn.init.call(i, e.element[0], t, n), i.widget = e, i._dataBinding = A(i.dataBinding, i), i._dataBound = A(i.dataBound, i), i._itemChange = A(i.itemChange, i)
                },
                itemChange: function(e) {
                    r(e.item[0], e.data, this._ns(e.ns), [e.data].concat(this.bindings[t]._parents()))
                },
                dataBinding: function(e) {
                    var t, n, i = this.widget,
                        o = e.removedItems || i.items();
                    for (t = 0, n = o.length; t < n; t++) c(o[t], !1)
                },
                _ns: function(t) {
                    t = t || C.ui;
                    var n = [C.ui, C.dataviz.ui, C.mobile.ui];
                    return n.splice(e.inArray(t, n), 1), n.unshift(t), C.rolesFromNamespaces(n)
                },
                dataBound: function(e) {
                    var i, o, a, s, l = this.widget,
                        c = e.addedItems || l.items(),
                        u = l[n],
                        d = C.data.HierarchicalDataSource;
                    if (!(d && u instanceof d) && c.length)
                        for (a = e.addedDataItems || u.flatView(), s = this.bindings[t]._parents(), i = 0, o = a.length; i < o; i++) c[i] && r(c[i], a[i], this._ns(e.ns), [a[i]].concat(s))
                },
                refresh: function(e) {
                    var o, a, r, s, l = this,
                        c = l.widget;
                    e = e || {}, e.action || (l.destroy(), c.bind("dataBinding", l._dataBinding), c.bind("dataBound", l._dataBound), c.bind("itemChange", l._itemChange), o = l.bindings[t].get(), c[n] instanceof C.data.DataSource && c[n] != o && (o instanceof C.data.DataSource ? c[i](o) : o && o._dataSource ? c[i](o._dataSource) : (a = C.ui.Select && c instanceof C.ui.Select, r = C.ui.MultiSelect && c instanceof C.ui.MultiSelect, s = C.ui.DropDownTree && c instanceof C.ui.DropDownTree, s ? c.treeview[n].data(o) : c[n].data(o), l.bindings.value && (a || r) && c.value(h(l.bindings.value.get(), c.options.dataValueField)))))
                },
                destroy: function() {
                    var e = this.widget;
                    e.unbind("dataBinding", this._dataBinding), e.unbind("dataBound", this._dataBound), e.unbind("itemChange", this._itemChange)
                }
            })
        }

        function i(e, t) {
            var n = C.initWidget(e, {}, t);
            if (n) return new k(n)
        }

        function o(e) {
            var t, n, i, a, r, s, l, c = {};
            for (l = e.match(y), t = 0, n = l.length; t < n; t++) i = l[t], a = i.indexOf(":"), r = i.substring(0, a), s = i.substring(a + 1), "{" == s.charAt(0) && (s = o(s)), c[r] = s;
            return c
        }

        function a(e, t, n) {
            var i, o = {};
            for (i in e) o[i] = new n(t, e[i]);
            return o
        }

        function r(e, t, n, s) {
            var c, u, d, p, h, v, _, b, k;
            if (e && !e.getAttribute("data-" + C.ns + "stop") && (c = e.getAttribute("data-" + C.ns + "role"), d = e.getAttribute("data-" + C.ns + "bind"), p = [], h = !0, _ = {}, s = s || [t], (c || d) && l(e, !1), c && (b = i(e, n)), d && (d = o(d.replace(x, "")), b || (_ = C.parseOptions(e, {
                    textField: "",
                    valueField: "",
                    template: "",
                    valueUpdate: L,
                    valuePrimitive: !1,
                    autoBind: !0
                }, t), _.roles = n, b = new w(e, _)), b.source = t, v = a(d, s, f), _.template && (v.template = new g(s, "", _.template)), v.click && (d.events = d.events || {}, d.events.click = d.click, v.click.destroy(), delete v.click), v.source && (h = !1), d.attr && (v.attr = a(d.attr, s, f)), d.style && (v.style = a(d.style, s, f)), d.events && (v.events = a(d.events, s, m)), d.css && (v.css = a(d.css, s, f)), b.bind(v)), b && (e.kendoBindingTarget = b), k = e.children, h && k)) {
                for (u = 0; u < k.length; u++) p[u] = k[u];
                for (u = 0; u < p.length; u++) r(p[u], t, n, s)
            }
        }

        function s(t, n) {
            var i, o, a, s = C.rolesFromNamespaces([].slice.call(arguments, 2));
            for (n = C.observable(n), t = e(t), i = 0, o = t.length; i < o; i++) a = t[i], 1 === a.nodeType && r(a, n, s)
        }

        function l(t, n) {
            var i, o = t.kendoBindingTarget;
            o && (o.destroy(), V ? delete t.kendoBindingTarget : t.removeAttribute ? t.removeAttribute("kendoBindingTarget") : t.kendoBindingTarget = null), n && (i = C.widgetInstance(e(t)), i && typeof i.destroy === B && i.destroy())
        }

        function c(e, t) {
            l(e, t), u(e, t)
        }

        function u(e, t) {
            var n, i, o = e.children;
            if (o)
                for (n = 0, i = o.length; n < i; n++) c(o[n], t)
        }

        function d(t) {
            var n, i;
            for (t = e(t), n = 0, i = t.length; n < i; n++) c(t[n], !1)
        }

        function p(e, t) {
            var n = e.element,
                i = n[0].kendoBindingTarget;
            i && s(n, i.source, t)
        }

        function h(e, t) {
            var n, i, o = [],
                a = 0;
            if (!t) return e;
            if (e instanceof D) {
                for (n = e.length; a < n; a++) i = e[a], o[a] = i.get ? i.get(t) : i[t];
                e = o
            } else e instanceof S && (e = e.get(t));
            return e
        }
        var f, m, g, v, _, b, w, k, y, x, C = window.kendo,
            T = C.Observable,
            S = C.data.ObservableObject,
            D = C.data.ObservableArray,
            I = {}.toString,
            E = {},
            F = C.Class,
            A = e.proxy,
            P = "value",
            M = "source",
            O = "events",
            H = "checked",
            z = "css",
            V = !0,
            B = "function",
            L = "change";
        ! function() {
            var e = document.createElement("a");
            try {
                delete e.test
            } catch (t) {
                V = !1
            }
        }(), f = T.extend({
            init: function(e, t) {
                var n = this;
                T.fn.init.call(n), n.source = e[0], n.parents = e, n.path = t, n.dependencies = {}, n.dependencies[t] = !0, n.observable = n.source instanceof T, n._access = function(e) {
                    n.dependencies[e.field] = !0
                }, n.observable && (n._change = function(e) {
                    n.change(e)
                }, n.source.bind(L, n._change))
            },
            _parents: function() {
                var t, n = this.parents,
                    i = this.get();
                return i && "function" == typeof i.parent && (t = i.parent(), e.inArray(t, n) < 0 && (n = [t].concat(n))), n
            },
            change: function(e) {
                var t, n, i = e.field,
                    o = this;
                if ("this" === o.path) o.trigger(L, e);
                else
                    for (t in o.dependencies)
                        if (0 === t.indexOf(i) && (n = t.charAt(i.length), !n || "." === n || "[" === n)) {
                            o.trigger(L, e);
                            break
                        }
            },
            start: function(e) {
                e.bind("get", this._access)
            },
            stop: function(e) {
                e.unbind("get", this._access)
            },
            get: function() {
                var e = this,
                    n = e.source,
                    i = 0,
                    o = e.path,
                    a = n;
                if (!e.observable) return a;
                for (e.start(e.source), a = n.get(o); a === t && n;) n = e.parents[++i], n instanceof S && (a = n.get(o));
                if (a === t)
                    for (n = e.source; a === t && n;) n = n.parent(), n instanceof S && (a = n.get(o));
                return "function" == typeof a && (i = o.lastIndexOf("."), i > 0 && (n = n.get(o.substring(0, i))), e.start(n), a = n !== e.source ? a.call(n, e.source) : a.call(n), e.stop(n)), n && n !== e.source && (e.currentSource = n, n.unbind(L, e._change).bind(L, e._change)), e.stop(e.source), a
            },
            set: function(e) {
                var t = this.currentSource || this.source,
                    n = C.getter(this.path)(t);
                "function" == typeof n ? t !== this.source ? n.call(t, this.source, e) : n.call(t, e) : t.set(this.path, e)
            },
            destroy: function() {
                this.observable && (this.source.unbind(L, this._change), this.currentSource && this.currentSource.unbind(L, this._change)), this.unbind()
            }
        }), m = f.extend({
            get: function() {
                var e, t = this.source,
                    n = this.path,
                    i = 0;
                for (e = t.get(n); !e && t;) t = this.parents[++i], t instanceof S && (e = t.get(n));
                return A(e, t)
            }
        }), g = f.extend({
            init: function(e, t, n) {
                var i = this;
                f.fn.init.call(i, e, t), i.template = n
            },
            render: function(e) {
                var t;
                return this.start(this.source), t = C.render(this.template, e), this.stop(this.source), t
            }
        }), v = F.extend({
            init: function(e, t, n) {
                this.element = e, this.bindings = t, this.options = n
            },
            bind: function(e, t) {
                var n = this;
                e = t ? e[t] : e, e.bind(L, function(e) {
                    n.refresh(t || e)
                }), n.refresh(t)
            },
            destroy: function() {}
        }), _ = v.extend({
            dataType: function() {
                var e = this.element.getAttribute("data-type") || this.element.type || "text";
                return e.toLowerCase()
            },
            parsedValue: function() {
                return this._parseValue(this.element.value, this.dataType())
            },
            _parseValue: function(e, t) {
                return "date" == t ? e = C.parseDate(e, "yyyy-MM-dd") : "datetime-local" == t ? e = C.parseDate(e, ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"]) : "number" == t ? e = C.parseFloat(e) : "boolean" == t && (e = e.toLowerCase(), e = null !== C.parseFloat(e) ? !!C.parseFloat(e) : "true" === e.toLowerCase()), e
            }
        }), E.attr = v.extend({
            refresh: function(e) {
                this.element.setAttribute(e, this.bindings.attr[e].get())
            }
        }), E.css = v.extend({
            init: function(e, t, n) {
                v.fn.init.call(this, e, t, n), this.classes = {}
            },
            refresh: function(t) {
                var n = e(this.element),
                    i = this.bindings.css[t],
                    o = this.classes[t] = i.get();
                o ? n.addClass(t) : n.removeClass(t)
            }
        }), E.style = v.extend({
            refresh: function(e) {
                this.element.style[e] = this.bindings.style[e].get() || ""
            }
        }), E.enabled = v.extend({
            refresh: function() {
                this.bindings.enabled.get() ? this.element.removeAttribute("disabled") : this.element.setAttribute("disabled", "disabled")
            }
        }), E.readonly = v.extend({
            refresh: function() {
                this.bindings.readonly.get() ? this.element.setAttribute("readonly", "readonly") : this.element.removeAttribute("readonly")
            }
        }), E.disabled = v.extend({
            refresh: function() {
                this.bindings.disabled.get() ? this.element.setAttribute("disabled", "disabled") : this.element.removeAttribute("disabled")
            }
        }), E.events = v.extend({
            init: function(e, t, n) {
                v.fn.init.call(this, e, t, n), this.handlers = {}
            },
            refresh: function(t) {
                var n = e(this.element),
                    i = this.bindings.events[t],
                    o = this.handlers[t];
                o && n.off(t, o), o = this.handlers[t] = i.get(), n.on(t, i.source, o)
            },
            destroy: function() {
                var t, n = e(this.element);
                for (t in this.handlers) n.off(t, this.handlers[t])
            }
        }), E.text = v.extend({
            refresh: function() {
                var t = this.bindings.text.get(),
                    n = this.element.getAttribute("data-format") || "";
                null == t && (t = ""), e(this.element).text(C.toString(t, n))
            }
        }), E.visible = v.extend({
            refresh: function() {
                this.element.style.display = this.bindings.visible.get() ? "" : "none"
            }
        }), E.invisible = v.extend({
            refresh: function() {
                this.element.style.display = this.bindings.invisible.get() ? "none" : ""
            }
        }), E.html = v.extend({
            refresh: function() {
                this.element.innerHTML = this.bindings.html.get()
            }
        }), E.value = _.extend({
            init: function(t, n, i) {
                _.fn.init.call(this, t, n, i), this._change = A(this.change, this), this.eventName = i.valueUpdate || L, e(this.element).on(this.eventName, this._change), this._initChange = !1
            },
            change: function() {
                this._initChange = this.eventName != L, this.bindings[P].set(this.parsedValue()), this._initChange = !1
            },
            refresh: function() {
                var e, t;
                this._initChange || (e = this.bindings[P].get(), null == e && (e = ""), t = this.dataType(), "date" == t ? e = C.toString(e, "yyyy-MM-dd") : "datetime-local" == t && (e = C.toString(e, "yyyy-MM-ddTHH:mm:ss")), this.element.value = e), this._initChange = !1
            },
            destroy: function() {
                e(this.element).off(this.eventName, this._change)
            }
        }), E.source = v.extend({
            init: function(e, t, n) {
                v.fn.init.call(this, e, t, n);
                var i = this.bindings.source.get();
                i instanceof C.data.DataSource && n.autoBind !== !1 && i.fetch()
            },
            refresh: function(e) {
                var t = this,
                    n = t.bindings.source.get();
                n instanceof D || n instanceof C.data.DataSource ? (e = e || {}, "add" == e.action ? t.add(e.index, e.items) : "remove" == e.action ? t.remove(e.index, e.items) : "itemchange" != e.action && t.render()) : t.render()
            },
            container: function() {
                var e = this.element;
                return "table" == e.nodeName.toLowerCase() && (e.tBodies[0] || e.appendChild(document.createElement("tbody")), e = e.tBodies[0]), e
            },
            template: function() {
                var e = this.options,
                    t = e.template,
                    n = this.container().nodeName.toLowerCase();
                return t || (t = "select" == n ? e.valueField || e.textField ? C.format('<option value="#:{0}#">#:{1}#</option>', e.valueField || e.textField, e.textField || e.valueField) : "<option>#:data#</option>" : "tbody" == n ? "<tr><td>#:data#</td></tr>" : "ul" == n || "ol" == n ? "<li>#:data#</li>" : "#:data#", t = C.template(t)), t
            },
            add: function(t, n) {
                var i, o, a, s, l = this.container(),
                    c = l.cloneNode(!1),
                    u = l.children[t];
                if (e(c).html(C.render(this.template(), n)), c.children.length)
                    for (i = this.bindings.source._parents(), o = 0, a = n.length; o < a; o++) s = c.children[0], l.insertBefore(s, u || null), r(s, n[o], this.options.roles, [n[o]].concat(i))
            },
            remove: function(e, t) {
                var n, i, o = this.container();
                for (n = 0; n < t.length; n++) i = o.children[e], c(i, !0), i.parentNode == o && o.removeChild(i)
            },
            render: function() {
                var t, n, i, o = this.bindings.source.get(),
                    a = this.container(),
                    s = this.template();
                if (null != o)
                    if (o instanceof C.data.DataSource && (o = o.view()), o instanceof D || "[object Array]" === I.call(o) || (o = [o]), this.bindings.template) {
                        if (u(a, !0), e(a).html(this.bindings.template.render(o)), a.children.length)
                            for (t = this.bindings.source._parents(), n = 0, i = o.length; n < i; n++) r(a.children[n], o[n], this.options.roles, [o[n]].concat(t))
                    } else e(a).html(C.render(s, o))
            }
        }), E.input = {
            checked: _.extend({
                init: function(t, n, i) {
                    _.fn.init.call(this, t, n, i), this._change = A(this.change, this), e(this.element).change(this._change)
                },
                change: function() {
                    var e, t, n, i = this.element,
                        o = this.value();
                    if ("radio" == i.type) o = this.parsedValue(), this.bindings[H].set(o);
                    else if ("checkbox" == i.type)
                        if (e = this.bindings[H].get(), e instanceof D) {
                            if (o = this.parsedValue(), o instanceof Date) {
                                for (n = 0; n < e.length; n++)
                                    if (e[n] instanceof Date && +e[n] === +o) {
                                        t = n;
                                        break
                                    }
                            } else t = e.indexOf(o);
                            t > -1 ? e.splice(t, 1) : e.push(o)
                        } else this.bindings[H].set(o)
                },
                refresh: function() {
                    var e, n, i = this.bindings[H].get(),
                        o = i,
                        a = this.dataType(),
                        r = this.element;
                    if ("checkbox" == r.type)
                        if (o instanceof D) {
                            if (e = -1, i = this.parsedValue(), i instanceof Date) {
                                for (n = 0; n < o.length; n++)
                                    if (o[n] instanceof Date && +o[n] === +i) {
                                        e = n;
                                        break
                                    }
                            } else e = o.indexOf(i);
                            r.checked = e >= 0
                        } else r.checked = o;
                    else "radio" == r.type && ("date" == a ? i = C.toString(i, "yyyy-MM-dd") : "datetime-local" == a && (i = C.toString(i, "yyyy-MM-ddTHH:mm:ss")), r.checked = null !== i && t !== i && r.value === "" + i)
                },
                value: function() {
                    var e = this.element,
                        t = e.value;
                    return "checkbox" == e.type && (t = e.checked), t
                },
                destroy: function() {
                    e(this.element).off(L, this._change)
                }
            })
        }, E.select = {
            source: E.source.extend({
                refresh: function(n) {
                    var i, o = this,
                        a = o.bindings.source.get();
                    a instanceof D || a instanceof C.data.DataSource ? (n = n || {}, "add" == n.action ? o.add(n.index, n.items) : "remove" == n.action ? o.remove(n.index, n.items) : "itemchange" != n.action && n.action !== t || (o.render(), o.bindings.value && o.bindings.value && (i = h(o.bindings.value.get(), e(o.element).data("valueField")), null === i ? o.element.selectedIndex = -1 : o.element.value = i))) : o.render()
                }
            }),
            value: _.extend({
                init: function(t, n, i) {
                    _.fn.init.call(this, t, n, i), this._change = A(this.change, this), e(this.element).change(this._change)
                },
                parsedValue: function() {
                    var e, t, n, i, o = this.dataType(),
                        a = [];
                    for (n = 0, i = this.element.options.length; n < i; n++) t = this.element.options[n], t.selected && (e = t.attributes.value, e = e && e.specified ? t.value : t.text, a.push(this._parseValue(e, o)));
                    return a
                },
                change: function() {
                    var e, n, i, o, a, r, s, l, c = [],
                        u = this.element,
                        d = this.options.valueField || this.options.textField,
                        p = this.options.valuePrimitive;
                    for (a = 0, r = u.options.length; a < r; a++) n = u.options[a], n.selected && (o = n.attributes.value, o = o && o.specified ? n.value : n.text, c.push(d ? o : this._parseValue(o, this.dataType())));
                    if (d)
                        for (e = this.bindings.source.get(), e instanceof C.data.DataSource && (e = e.view()), i = 0; i < c.length; i++)
                            for (a = 0, r = e.length; a < r; a++)
                                if (s = e[a].get(d), l = s + "" === c[i]) {
                                    c[i] = e[a];
                                    break
                                }
                    o = this.bindings[P].get(), o instanceof D ? o.splice.apply(o, [0, o.length].concat(c)) : this.bindings[P].set(p || !(o instanceof S || null === o || o === t) && d ? c[0].get(d) : c[0])
                },
                refresh: function() {
                    var e, t, n, i = this.element,
                        o = i.options,
                        a = this.bindings[P].get(),
                        r = a,
                        s = this.options.valueField || this.options.textField,
                        l = !1,
                        c = this.dataType();
                    for (r instanceof D || (r = new D([a])), i.selectedIndex = -1, n = 0; n < r.length; n++)
                        for (a = r[n], s && a instanceof S && (a = a.get(s)), "date" == c ? a = C.toString(r[n], "yyyy-MM-dd") : "datetime-local" == c && (a = C.toString(r[n], "yyyy-MM-ddTHH:mm:ss")), e = 0; e < o.length; e++) t = o[e].value, "" === t && "" !== a && (t = o[e].text), null != a && t == "" + a && (o[e].selected = !0, l = !0)
                },
                destroy: function() {
                    e(this.element).off(L, this._change)
                }
            })
        }, E.widget = {
            events: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e, this.handlers = {}
                },
                refresh: function(e) {
                    var t = this.bindings.events[e],
                        n = this.handlers[e];
                    n && this.widget.unbind(e, n), n = t.get(), this.handlers[e] = function(e) {
                        e.data = t.source, n(e), e.data === t.source && delete e.data
                    }, this.widget.bind(e, this.handlers[e])
                },
                destroy: function() {
                    var e;
                    for (e in this.handlers) this.widget.unbind(e, this.handlers[e])
                }
            }),
            checked: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e, this._change = A(this.change, this), this.widget.bind(L, this._change)
                },
                change: function() {
                    this.bindings[H].set(this.value())
                },
                refresh: function() {
                    this.widget.check(this.bindings[H].get() === !0)
                },
                value: function() {
                    var e = this.element,
                        t = e.value;
                    return "on" != t && "off" != t || (t = e.checked), t
                },
                destroy: function() {
                    this.widget.unbind(L, this._change)
                }
            }),
            visible: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e
                },
                refresh: function() {
                    var e = this.bindings.visible.get();
                    this.widget.wrapper[0].style.display = e ? "" : "none"
                }
            }),
            invisible: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e
                },
                refresh: function() {
                    var e = this.bindings.invisible.get();
                    this.widget.wrapper[0].style.display = e ? "none" : ""
                }
            }),
            enabled: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e
                },
                refresh: function() {
                    this.widget.enable && this.widget.enable(this.bindings.enabled.get())
                }
            }),
            disabled: v.extend({
                init: function(e, t, n) {
                    v.fn.init.call(this, e.element[0], t, n), this.widget = e
                },
                refresh: function() {
                    this.widget.enable && this.widget.enable(!this.bindings.disabled.get())
                }
            }),
            source: n("source", "dataSource", "setDataSource"),
            value: v.extend({
                init: function(t, n, i) {
                    v.fn.init.call(this, t.element[0], n, i), this.widget = t, this._change = e.proxy(this.change, this), this.widget.first(L, this._change);
                    var o = this.bindings.value.get();
                    this._valueIsObservableObject = !i.valuePrimitive && (null == o || o instanceof S), this._valueIsObservableArray = o instanceof D, this._initChange = !1
                },
                _source: function() {
                    var e;
                    return this.widget.dataItem && (e = this.widget.dataItem(), e && e instanceof S) ? [e] : (this.bindings.source && (e = this.bindings.source.get()), (!e || e instanceof C.data.DataSource) && (e = this.widget.dataSource.flatView()), e)
                },
                change: function() {
                    var e, t, n, i, o, a, r, s = this.widget.value(),
                        l = this.options.dataValueField || this.options.dataTextField,
                        c = "[object Array]" === I.call(s),
                        u = this._valueIsObservableObject,
                        d = [];
                    if (this._initChange = !0, l)
                        if ("" === s && (u || this.options.valuePrimitive)) s = null;
                        else {
                            for (r = this._source(), c && (t = s.length, d = s.slice(0)), o = 0, a = r.length; o < a; o++)
                                if (n = r[o], i = n.get(l), c) {
                                    for (e = 0; e < t; e++)
                                        if (i == d[e]) {
                                            d[e] = n;
                                            break
                                        }
                                } else if (i == s) {
                                s = u ? n : i;
                                break
                            }
                            d[0] && (s = this._valueIsObservableArray ? d : u || !l ? d[0] : d[0].get(l))
                        }
                    this.bindings.value.set(s), this._initChange = !1
                },
                refresh: function() {
                    var e, n, i, o, a, r, s, l, c;
                    if (!this._initChange) {
                        if (e = this.widget, n = e.options, i = n.dataTextField, o = n.dataValueField || i, a = this.bindings.value.get(), r = n.text || "", s = 0, c = [], a === t && (a = null), o)
                            if (a instanceof D) {
                                for (l = a.length; s < l; s++) c[s] = a[s].get(o);
                                a = c
                            } else a instanceof S && (r = a.get(i), a = a.get(o));
                        n.autoBind !== !1 || n.cascadeFrom || !e.listView || e.listView.bound() ? e.value(a) : (i !== o || r || (r = a), r || !a && 0 !== a || !n.valuePrimitive ? e._preselect(a, r) : e.value(a))
                    }
                    this._initChange = !1
                },
                destroy: function() {
                    this.widget.unbind(L, this._change)
                }
            }),
            dropdowntree: {
                value: v.extend({
                    init: function(t, n, i) {
                        v.fn.init.call(this, t.element[0], n, i), this.widget = t, this._change = e.proxy(this.change, this), this.widget.first(L, this._change), this._initChange = !1
                    },
                    change: function() {
                        var e, n, i, o, a, r, s, l, c, u = this,
                            d = u.bindings[P].get(),
                            p = u.options.valuePrimitive,
                            h = u.widget.treeview.select(),
                            f = u.widget._isMultipleSelection() ? u.widget._getAllChecked() : u.widget.treeview.dataItem(h) || u.widget.value(),
                            m = p || u.widget.options.autoBind === !1 ? u.widget.value() : f,
                            g = this.options.dataValueField || this.options.dataTextField;
                        if (m = m.slice ? m.slice(0) : m, u._initChange = !0, d instanceof D) {
                            for (e = [], n = m.length, i = 0, o = 0, a = d[i], r = !1; a !== t;) {
                                for (c = !1, o = 0; o < n; o++)
                                    if (p ? r = m[o] == a : (l = m[o], l = l.get ? l.get(g) : l, r = l == (a.get ? a.get(g) : a)), r) {
                                        m.splice(o, 1), n -= 1, c = !0;
                                        break
                                    }
                                c ? i += 1 : (e.push(a), b(d, i, 1), s = i), a = d[i]
                            }
                            b(d, d.length, 0, m), e.length && d.trigger("change", {
                                action: "remove",
                                items: e,
                                index: s
                            }), m.length && d.trigger("change", {
                                action: "add",
                                items: m,
                                index: d.length - 1
                            })
                        } else u.bindings[P].set(m);
                        u._initChange = !1
                    },
                    refresh: function() {
                        if (!this._initChange) {
                            var e, t, n = this.options,
                                i = this.widget,
                                o = n.dataValueField || n.dataTextField,
                                a = this.bindings.value.get(),
                                r = a,
                                s = 0,
                                l = [];
                            if (o)
                                if (a instanceof D) {
                                    for (e = a.length; s < e; s++) t = a[s], l[s] = t.get ? t.get(o) : t;
                                    a = l
                                } else a instanceof S && (a = a.get(o));
                            n.autoBind === !1 && n.valuePrimitive !== !0 ? i._preselect(r, a) : i.value(a)
                        }
                    },
                    destroy: function() {
                        this.widget.unbind(L, this._change)
                    }
                })
            },
            gantt: {
                dependencies: n("dependencies", "dependencies", "setDependenciesDataSource")
            },
            multiselect: {
                value: v.extend({
                    init: function(t, n, i) {
                        v.fn.init.call(this, t.element[0], n, i), this.widget = t, this._change = e.proxy(this.change, this), this.widget.first(L, this._change), this._initChange = !1
                    },
                    change: function() {
                        var e, n, i, o, a, r, s, l, c, u = this,
                            d = u.bindings[P].get(),
                            p = u.options.valuePrimitive,
                            h = p ? u.widget.value() : u.widget.dataItems(),
                            f = this.options.dataValueField || this.options.dataTextField;
                        if (h = h.slice(0), u._initChange = !0, d instanceof D) {
                            for (e = [], n = h.length, i = 0, o = 0, a = d[i], r = !1; a !== t;) {
                                for (c = !1, o = 0; o < n; o++)
                                    if (p ? r = h[o] == a : (l = h[o], l = l.get ? l.get(f) : l, r = l == (a.get ? a.get(f) : a)), r) {
                                        h.splice(o, 1), n -= 1, c = !0;
                                        break
                                    }
                                c ? i += 1 : (e.push(a), b(d, i, 1), s = i), a = d[i]
                            }
                            b(d, d.length, 0, h), e.length && d.trigger("change", {
                                action: "remove",
                                items: e,
                                index: s
                            }), h.length && d.trigger("change", {
                                action: "add",
                                items: h,
                                index: d.length - 1
                            })
                        } else u.bindings[P].set(h);
                        u._initChange = !1
                    },
                    refresh: function() {
                        if (!this._initChange) {
                            var e, n, i = this.options,
                                o = this.widget,
                                a = i.dataValueField || i.dataTextField,
                                r = this.bindings.value.get(),
                                s = r,
                                l = 0,
                                c = [];
                            if (r === t && (r = null), a)
                                if (r instanceof D) {
                                    for (e = r.length; l < e; l++) n = r[l], c[l] = n.get ? n.get(a) : n;
                                    r = c
                                } else r instanceof S && (r = r.get(a));
                            i.autoBind !== !1 || i.valuePrimitive === !0 || o._isBound() ? o.value(r) : o._preselect(s, r)
                        }
                    },
                    destroy: function() {
                        this.widget.unbind(L, this._change)
                    }
                })
            },
            scheduler: {
                source: n("source", "dataSource", "setDataSource").extend({
                    dataBound: function(e) {
                        var t, n, i, o, a = this.widget,
                            s = e.addedItems || a.items();
                        if (s.length)
                            for (i = e.addedDataItems || a.dataItems(), o = this.bindings.source._parents(), t = 0, n = i.length; t < n; t++) r(s[t], i[t], this._ns(e.ns), [i[t]].concat(o))
                    }
                })
            }
        }, b = function(e, t, n, i) {
            var o, a, r, s, l;
            if (i = i || [], n = n || 0, o = i.length, a = e.length, r = [].slice.call(e, t + n), s = r.length, o) {
                for (o = t + o, l = 0; t < o; t++) e[t] = i[l], l++;
                e.length = o
            } else if (n)
                for (e.length = t, n += t; t < n;) delete e[--n];
            if (s) {
                for (s = t + s, l = 0; t < s; t++) e[t] = r[l], l++;
                e.length = s
            }
            for (t = e.length; t < a;) delete e[t], t++
        }, w = F.extend({
            init: function(e, t) {
                this.target = e, this.options = t, this.toDestroy = []
            },
            bind: function(e) {
                var t, n, i, o, a, r, s = this instanceof k,
                    l = this.binders();
                for (t in e) t == P ? n = !0 : t == M ? i = !0 : t != O || s ? t == H ? a = !0 : t == z ? r = !0 : this.applyBinding(t, e, l) : o = !0;
                i && this.applyBinding(M, e, l), n && this.applyBinding(P, e, l), a && this.applyBinding(H, e, l), o && !s && this.applyBinding(O, e, l), r && !s && this.applyBinding(z, e, l)
            },
            binders: function() {
                return E[this.target.nodeName.toLowerCase()] || {}
            },
            applyBinding: function(e, t, n) {
                var i, o = n[e] || E[e],
                    a = this.toDestroy,
                    r = t[e];
                if (o)
                    if (o = new o(this.target, t, this.options), a.push(o), r instanceof f) o.bind(r), a.push(r);
                    else
                        for (i in r) o.bind(r, i), a.push(r[i]);
                else if ("template" !== e) throw Error("The " + e + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element")
            },
            destroy: function() {
                var e, t, n = this.toDestroy;
                for (e = 0, t = n.length; e < t; e++) n[e].destroy()
            }
        }), k = w.extend({
            binders: function() {
                return E.widget[this.target.options.name.toLowerCase()] || {}
            },
            applyBinding: function(e, t, n) {
                var i, o = n[e] || E.widget[e],
                    a = this.toDestroy,
                    r = t[e];
                if (!o) throw Error("The " + e + " binding is not supported by the " + this.target.options.name + " widget");
                if (o = new o(this.target, t, this.target.options), a.push(o), r instanceof f) o.bind(r), a.push(r);
                else
                    for (i in r) o.bind(r, i), a.push(r[i])
            }
        }), y = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g, x = /\s/g, C.unbind = d, C.bind = s, C.data.binders = E, C.data.Binder = v, C.notify = p, C.observable = function(e) {
            return e instanceof S || (e = new S(e)), e
        }, C.observableHierarchy = function(e) {
            function t(e) {
                var n, i;
                for (n = 0; n < e.length; n++) e[n]._initChildren(), i = e[n].children, i.fetch(), e[n].items = i.data(), t(e[n].items)
            }
            var n = C.data.HierarchicalDataSource.create(e);
            return n.fetch(), t(n.data()), n._data._dataSource = n, n._data
        }
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),

function(e, define) {
    define("kendo.data.signalr.min", ["kendo.data.min"], e)
}(function() {
    return function(e) {
        function t(e) {
            return e && o(e.done) && o(e.fail)
        }

        function n(e) {
            return e && o(e.then) && o(e["catch"])
        }
        var i = window.kendo,
            o = i.isFunction,
            a = i.data.RemoteTransport.extend({
                init: function(e) {
                    var o, a = e && e.signalr ? e.signalr : {},
                        r = a.promise;
                    if (!r) throw Error('The "promise" option must be set.');
                    if (!t(r) && !n(r)) throw Error('The "promise" option must be a Promise.');
                    if (this.promise = r, o = a.hub, !o) throw Error('The "hub" option must be set.');
                    if ("function" != typeof o.on || "function" != typeof o.invoke) throw Error('The "hub" option is not a valid SignalR hub proxy.');
                    this.hub = o, i.data.RemoteTransport.fn.init.call(this, e)
                },
                push: function(e) {
                    var t = this.options.signalr.client || {};
                    t.create && this.hub.on(t.create, e.pushCreate), t.update && this.hub.on(t.update, e.pushUpdate), t.destroy && this.hub.on(t.destroy, e.pushDestroy)
                },
                _crud: function(o, a) {
                    var r, s, l = this.hub,
                        c = this.promise,
                        u = this.options.signalr.server;
                    if (!u || !u[a]) throw Error(i.format('The "server.{0}" option must be set.', a));
                    r = [u[a]], s = this.parameterMap(o.data, a), e.isEmptyObject(s) || r.push(s), t(c) ? c.done(function() {
                        l.invoke.apply(l, r).done(o.success).fail(o.error)
                    }) : n(c) && c.then(function() {
                        l.invoke.apply(l, r).then(o.success)["catch"](o.error)
                    })
                },
                read: function(e) {
                    this._crud(e, "read")
                },
                create: function(e) {
                    this._crud(e, "create")
                },
                update: function(e) {
                    this._crud(e, "update")
                },
                destroy: function(e) {
                    this._crud(e, "destroy")
                }
            });
        e.extend(!0, i.data, {
            transports: {
                signalr: a
            }
        })
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),

function(e, define) {
    define("kendo.maskedtextbox.min", ["kendo.core.min"], e)
}(function() {
    return function(e, t) {
        function n(e) {
            return e + d
        }

        function i(e, t) {
            for (var n = 0; n < t.length && e[n] === t[n];) n++;
            return n
        }
        var o = window,
            a = o.Math.min,
            r = o.kendo,
            s = r.caret,
            l = r.keys,
            c = r.ui,
            u = c.Widget,
            d = ".kendoMaskedTextBox",
            p = e.proxy,
            h = window.setTimeout,
            f = "k-state-disabled",
            m = "k-state-invalid",
            g = "disabled",
            v = "readonly",
            _ = "change",
            b = "mouseup",
            w = "drop",
            k = "keydown",
            y = "paste",
            x = "input",
            C = n(r.support.propertyChangeEvent ? "propertychange" : x),
            T = u.extend({
                init: function(t, n) {
                    var i, o, a = this;
                    u.fn.init.call(a, t, n), a._rules = e.extend({}, a.rules, a.options.rules), t = a.element, i = t[0], a._wrapper(), a._tokenize(), a._form(), a.element.addClass("k-textbox").attr("autocomplete", "off").on("focus" + d, function() {
                        var e = i.value;
                        e ? a._togglePrompt(!0) : i.value = a._old = a._emptyMask, a._oldValue = e, a._timeoutId = h(function() {
                            s(t, 0, e ? a._maskLength : 0)
                        })
                    }).on("focusout" + d, function() {
                        var e = t.val();
                        clearTimeout(a._timeoutId), i.value = a._old = "", e !== a._emptyMask && (i.value = a._old = e), a._change(), a._togglePrompt()
                    }), o = t.is("[disabled]") || e(a.element).parents("fieldset").is(":disabled"), o ? a.enable(!1) : a.readonly(t.is("[readonly]")), a.value(a.options.value || t.val()), a._validationIcon = e("<span class='k-icon k-i-warning'></span>").insertAfter(t), r.notify(a)
                },
                options: {
                    name: "MaskedTextBox",
                    clearPromptChar: !1,
                    unmaskOnPost: !1,
                    promptChar: "_",
                    culture: "",
                    rules: {},
                    value: "",
                    mask: ""
                },
                events: [_],
                rules: {
                    0: /\d/,
                    9: /\d|\s/,
                    "#": /\d|\s|\+|\-/,
                    L: /[a-zA-Z]/,
                    "?": /[a-zA-Z]|\s/,
                    "&": /\S/,
                    C: /./,
                    A: /[a-zA-Z0-9]/,
                    a: /[a-zA-Z0-9]|\s/
                },
                setOptions: function(t) {
                    var n = this;
                    u.fn.setOptions.call(n, t), n._rules = e.extend({}, n.rules, n.options.rules), n._tokenize(), this._unbindInput(), this._bindInput(), n.value(n.element.val())
                },
                destroy: function() {
                    var e = this;
                    e.element.off(d), e._formElement && (e._formElement.off("reset", e._resetHandler), e._formElement.off("submit", e._submitHandler)), u.fn.destroy.call(e)
                },
                raw: function() {
                    var e = this._unmask(this.element.val(), 0);
                    return e.replace(RegExp(this.options.promptChar, "g"), "")
                },
                value: function(e) {
                    var n = this.element,
                        i = this._emptyMask;
                    return e === t ? this.element.val() : (null === e && (e = ""), i ? (e = this._unmask(e + ""), n.val(e ? i : ""), this._mask(0, this._maskLength, e), this._unmaskedValue = null, e = n.val(), this._oldValue = e, r._activeElement() !== n && (e === i ? n.val("") : this._togglePrompt()), t) : (this._oldValue = e, n.val(e), t))
                },
                _togglePrompt: function(e) {
                    var t = this.element[0],
                        n = t.value;
                    this.options.clearPromptChar && (n = e ? this._oldValue : n.replace(RegExp(this.options.promptChar, "g"), " "), t.value = this._old = n)
                },
                readonly: function(e) {
                    this._editable({
                        readonly: e === t || e,
                        disable: !1
                    })
                },
                enable: function(e) {
                    this._editable({
                        readonly: !1,
                        disable: !(e = e === t || e)
                    })
                },
                _bindInput: function() {
                    var e, t, i = this;
                    i._maskLength && (i.options.$angular && i.element.off(x), i.element.on(n(k), p(i._keydown, i)).on(n(w), p(i._drop, i)).on(n(_), p(i._trackChange, i)).on(C, p(i._inputHandler, i)), r.support.browser.msie && (e = r.support.browser.version, e > 8 && e < 11 && (t = [n(b), n(w), n(k), n(y)].join(" "), i.element.on(t, p(i._legacyIEInputHandler, i)))))
                },
                _unbindInput: function() {
                    var e = [C, n(k), n(b), n(w), n(y)].join(" ");
                    this.element.off(e)
                },
                _editable: function(e) {
                    var t = this,
                        n = t.element,
                        i = t.wrapper,
                        o = e.disable,
                        a = e.readonly;
                    t._unbindInput(), a || o ? (n.attr(g, o).attr(v, a), i.toggleClass(f, o)) : (n.removeAttr(g).removeAttr(v), i.removeClass(f), t._bindInput())
                },
                _change: function() {
                    var e = this,
                        t = e.value();
                    t !== e._oldValue ? (e._oldValue = t, e.trigger(_), e.element.trigger(_)) : "" === t && e.__changing && e.element.trigger(_)
                },
                inputChange: function(e) {
                    var t, n, o, l, c, u = this,
                        d = u._old,
                        p = u.element[0],
                        h = p.value,
                        f = s(p),
                        m = f[1],
                        g = h.length - d.length,
                        v = r.support.mobileOS;
                    u.__dropping && g < 0 || (g === -1 && v.android && "chrome" === v.browser && (e = !0), t = a(m, i(h, d)), n = h.substring(t, m), p.value = h.substring(0, t) + u._emptyMask.substring(t), o = u._mask(t, m, n), l = u._trimStartPromptChars(h.substring(m), a(g, o - t)), c = u._unmask(l, d.length - l.length), u._mask(o, o, c), e && (o = u._findCaretPosBackwards(t)), s(p, o), u.__dropping = !1)
                },
                _trimStartPromptChars: function(e, t) {
                    for (var n = this.options.promptChar; t-- > 0 && 0 === e.indexOf(n);) e = e.substring(1);
                    return e
                },
                _findCaretPosBackwards: function(e) {
                    var t = this._find(e, !0);
                    return t < e && (t += 1), t
                },
                _inputHandler: function() {
                    r._activeElement() === this.element[0] && this.inputChange(this.__backward)
                },
                _legacyIEInputHandler: function(e) {
                    var t = this,
                        n = t.element[0],
                        i = n.value,
                        o = e.type;
                    t.__pasting = "paste" === o, h(function() {
                        "mouseup" === o && t.__pasting || n.value && n.value !== i && t.inputChange(t.__backward)
                    })
                },
                _trackChange: function() {
                    var e = this;
                    e.__changing = !0, h(function() {
                        e.__changing = !1
                    })
                },
                _form: function() {
                    var t = this,
                        n = t.element,
                        i = n.attr("form"),
                        o = i ? e("#" + i) : n.closest("form");
                    o[0] && (t._resetHandler = function() {
                        h(function() {
                            t.value(n[0].value)
                        })
                    }, t._submitHandler = function() {
                        t.element[0].value = t._old = t.raw()
                    }, t.options.unmaskOnPost && o.on("submit", t._submitHandler), t._formElement = o.on("reset", t._resetHandler))
                },
                _keydown: function(e) {
                    var t = e.keyCode;
                    this.__backward = t === l.BACKSPACE, t === l.ENTER && this._change()
                },
                _drop: function() {
                    this.__dropping = !0
                },
                _find: function(e, t) {
                    var n = this.element.val() || this._emptyMask,
                        i = 1;
                    for (t === !0 && (i = -1); e > -1 || e <= this._maskLength;) {
                        if (n.charAt(e) !== this.tokens[e]) return e;
                        e += i
                    }
                    return -1
                },
                _mask: function(e, n, i, o) {
                    var a, l, c, u, d = this.element[0],
                        p = d.value || this._emptyMask,
                        h = this.options.promptChar,
                        f = 0;
                    for (e = this._find(e, o), e > n && (n = e), l = this._unmask(p.substring(n), n), i = this._unmask(i, e), a = i.length, i && (l = l.replace(RegExp("^_{0," + a + "}"), "")), i += l, p = p.split(""), c = i.charAt(f); e < this._maskLength;) p[e] = c || h, c = i.charAt(++f), u === t && f > a && (u = e), e = this._find(e + 1);
                    return d.value = this._old = p.join(""), r._activeElement() === d && (u === t && (u = this._maskLength), s(d, u)), u
                },
                _unmask: function(t, n) {
                    var i, o, a, r, s, l, c, u;
                    if (!t) return "";
                    if (this._unmaskedValue === t) return this._unmaskedValue;
                    for (t = (t + "").split(""), a = 0, r = n || 0, s = this.options.promptChar, l = t.length, c = this.tokens.length, u = ""; r < c && (i = t[a], o = this.tokens[r], i === o || i === s ? (u += i === s ? s : "", a += 1, r += 1) : "string" != typeof o ? (o && o.test && o.test(i) || e.isFunction(o) && o(i) ? (u += i, r += 1) : 1 === l && this._blinkInvalidState(), a += 1) : r += 1, !(a >= l)););
                    return this._unmaskedValue = u, u
                },
                _wrapper: function() {
                    var e = this,
                        t = e.element,
                        n = t[0],
                        i = t.wrap("<span class='k-widget k-maskedtextbox'></span>").parent();
                    i[0].style.cssText = n.style.cssText, n.style.width = "100%", e.wrapper = i.addClass(n.className)
                },
                _blinkInvalidState: function() {
                    var e = this;
                    e.wrapper.addClass(m), clearTimeout(e._invalidStateTimeout), e._invalidStateTimeout = h(p(e._removeInvalidState, e), 100)
                },
                _removeInvalidState: function() {
                    var e = this;
                    e.wrapper.removeClass(m), e._invalidStateTimeout = null
                },
                _tokenize: function() {
                    for (var e, t, n, i, o = [], a = 0, s = this.options.mask || "", l = s.split(""), c = l.length, u = 0, d = "", p = this.options.promptChar, h = r.getCulture(this.options.culture).numberFormat, f = this._rules; u < c; u++)
                        if (e = l[u], t = f[e]) o[a] = t, d += p, a += 1;
                        else
                            for ("." === e || "," === e ? e = h[e] : "$" === e ? e = h.currency.symbol : "\\" === e && (u += 1, e = l[u]), e = e.split(""), n = 0, i = e.length; n < i; n++) o[a] = e[n], d += e[n], a += 1;
                    this.tokens = o, this._emptyMask = d, this._maskLength = d.length
                }
            });
        c.plugin(T)
    }(window.kendo.jQuery), window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
}),

function(e, define) {
    define("kendo.ui.core.min", ["kendo.core.min", "kendo.router.min", "kendo.touch.min", "kendo.data.odata.min", "kendo.data.xml.min", "kendo.data.min", "kendo.data.signalr.min", "kendo.binder.min", "kendo.userevents.min", "kendo.maskedtextbox.min"], e)
}(function() {
    "bundle all";
    return window.kendo
}, "function" == typeof define && define.amd ? define : function(e, t, n) {
    (n || t)()
});
//# sourceMappingURL=kendo.ui.core.min.js.map