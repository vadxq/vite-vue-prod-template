/**
 * es6-proxy-polyfill
 * @version 2.1.1
 * @author Ambit-Tsai <ambit_tsai@qq.com>
 * @license Apache-2.0
 * @see {@link https://github.com/ambit-tsai/es6-proxy-polyfill#readme}
 */
// eslint-disable-next-line
!(function (t, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Proxy =
        n());
})(this, function () {
  'use strict';
  var t,
    n = '[[ProxyTarget]]',
    e = '[[ProxyHandler]]',
    r = '[[Get]]',
    o = '[[Set]]',
    i = '[[Call]]',
    c = '[[Construct]]',
    u = '__proto__',
    f = 'REVOKED',
    a = Object.defineProperty,
    s = Object.defineProperties,
    p = Object.getPrototypeOf,
    y = Object.getOwnPropertyDescriptor,
    _ = !!s && h(s),
    l = _
      ? Object.__proto__
        ? p
        : function (t) {
            return 'function' == typeof t ? t.__proto__ || {} : p(t);
          }
      : function (t) {
          return (_isVbObject(t) && _getVbInternalOf(t).__proto__) || {};
        };
  function h(t) {
    return 'function' == typeof t && /\[native code\]/.test(t.toString());
  }
  function v(t, n) {
    if (this instanceof v) return b(new g(t, n));
    d("Constructor Proxy requires 'new'");
  }
  function b(e) {
    var u = e[n];
    return 'function' == typeof u
      ? (function (t) {
          var e = t[n];
          function r() {
            return this instanceof r
              ? t[c](arguments, r)
              : t[i](this, arguments);
          }
          if (((r.prototype = e.prototype), _)) {
            var o = m(t),
              u = T(p(e), o);
            for (var f in (w(r, u), (o = R(e, t)))) j(r, f) && delete o[f];
            s(r, o);
          } else C(r, e);
          return r;
        })(e)
      : u instanceof Array
      ? (function (e) {
          var i,
            c,
            u = e[n];
          _ &&
            (((i = m(e)).concat.get = function () {
              var t = e[r]('concat', this);
              return t === Array.prototype.concat ? t.bind(u) : t;
            }),
            (c = T(p(u), i)));
          return (
            ((i = R(u, e)).length.set = function (r) {
              var i = r - u.length;
              e[o]('length', r, this),
                i &&
                  (function (e, r, o) {
                    var i = o[n];
                    if (e > 0)
                      for (var c = i.length, u = c - e; u < c; ++u) {
                        var f = y(r, u);
                        f ? a(i, u, f) : (i[u] = t),
                          (f = V(i, u, o)),
                          a(r, u, f);
                      }
                    else
                      for (var s = (u = i.length) - e; u < s; ++u) delete r[u];
                  })(i, this, e);
            }),
            T(c, i)
          );
        })(e)
      : (function (t) {
          var e,
            r,
            o = t[n];
          _ && ((e = m(t)), (r = T(p(o), e)));
          return (e = R(o, t)), T(r, e);
        })(e);
  }
  function g(t, r) {
    (P(t) && P(r)) ||
      d('Cannot create proxy with a non-object as target or handler'),
      (l(t).__PROXY__ || l(r).__PROXY__) === f &&
        d('Cannot create proxy with a revoked proxy as target or handler'),
      (this[n] = t),
      (this[e] = r);
  }
  function O(t, n) {
    t || d("Cannot perform '" + n + "' on a proxy that has been revoked");
  }
  function d(t) {
    throw new TypeError(t);
  }
  function P(t) {
    return !!t && ('object' == typeof t || 'function' == typeof t);
  }
  function j(t, n) {
    return Object.prototype.hasOwnProperty.call(t, n);
  }
  (v.revocable = function (r, o) {
    this instanceof v.revocable && d('Proxy.revocable is not a constructor');
    var i = new g(r, o),
      c = b(i);
    return {
      proxy: c,
      revoke: function () {
        (i[n] = t), (i[e] = t), _ || (l(c).__PROXY__ = f);
      }
    };
  }),
    (g.prototype[r] = function (r, o) {
      var i = this[e];
      return (
        O(i, 'get'),
        i.get == t
          ? this[n][r]
          : 'function' == typeof i.get
          ? i.get(this[n], r, o)
          : void d("Trap 'get' is not a function: " + i.get)
      );
    }),
    (g.prototype[o] = function (r, o, i) {
      var c = this[e];
      if ((O(c, 'set'), c.set == t)) this[n][r] = o;
      else {
        if ('function' == typeof c.set) {
          var u = c.set(this[n], r, o, i);
          return (
            u ||
              console.warn(
                "Trap 'set' returned false for property '" + r + "'"
              ),
            Boolean(u)
          );
        }
        d("Trap 'set' is not a function: " + c.set);
      }
    }),
    (g.prototype[i] = function (r, o) {
      var i = this[e];
      return (
        O(i, 'apply'),
        i.apply == t
          ? this[n].apply(r, o)
          : 'function' == typeof i.apply
          ? i.apply(this[n], r, o)
          : void d("Trap 'apply' is not a function: " + i.apply)
      );
    }),
    (g.prototype[c] = function (r, o) {
      var i,
        c = this[e];
      if (
        (O(c, 'construct'),
        c.construct == t
          ? (i = (function (t, n) {
              for (var e = [], r = 0, o = n.length; r < o; ++r)
                e.push('args[' + r + ']');
              return new Function(
                'Ctor',
                'args',
                'return new Ctor(' + e.join(', ') + ')'
              )(t, n);
            })(this[n], r))
          : 'function' == typeof c.construct
          ? (i = c.construct(this[n], r, o))
          : d("Trap 'construct' is not a function: " + c.construct),
        P(i))
      )
        return i;
      d("Trap 'construct' returned non-object: " + i);
    });
  var x =
      Object.getOwnPropertyNames ||
      function (t) {
        var n = [];
        for (var e in t) j(t, e) && n.push(e);
        return n;
      },
    w = h(Object.setPrototypeOf)
      ? Object.setPrototypeOf
      : Object.__proto__
      ? function (t, n) {
          return (t.__proto__ = n), t;
        }
      : function (t, n) {
          return a(t, u, { value: n });
        },
    T = _
      ? Object.create
      : function (n, e) {
          var r = s({}, e);
          if (_isVbObject(r)) {
            var o = {};
            (o.__PROXY__ = t), (_getVbInternalOf(r).__proto__ = o);
          }
          return r;
        },
    C =
      Object.assign ||
      function (t, n) {
        for (var e in n) j(n, e) && (t[e] = n[e]);
        return t;
      };
  function m(e) {
    for (var r = {}, o = e[n]; (o = p(o)); ) {
      var i = R(o, e);
      C(r, i);
    }
    return (
      (r.__PROXY__ = {
        get: function () {
          return e[n] ? t : f;
        }
      }),
      r
    );
  }
  function R(t, n) {
    for (var e = x(t), r = {}, o = e.length - 1; o >= 0; --o)
      r[e[o]] = V(t, e[o], n);
    return r;
  }
  function V(t, n, e) {
    var i = y(t, n);
    return {
      get: function () {
        return e[r](n, this);
      },
      set: function (t) {
        e[o](n, t, this);
      },
      enumerable: i.enumerable,
      configurable: i.configurable
    };
  }
  return 'undefined' == typeof Proxy ? v : Proxy;
});
