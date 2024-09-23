"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      init_react_shim();
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r2 = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m2 = 0; m2 < g; m2++) f[m2] = arguments[m2 + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape2(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape2("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r2;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m2 = 0; m2 < f; m2++) g[m2] = arguments[m2 + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      init_react_shim();
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // react-shim.js
  var import_react;
  var init_react_shim = __esm({
    "react-shim.js"() {
      "use strict";
      import_react = __toESM(require_react(), 1);
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      init_react_shim();
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m2 = 2 * (d + 1) - 1, C = a[m2], n = m2 + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m2] = c, d = m2);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r2 = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r2, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r2)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r2); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r2) && k(r2);
              G(b);
            } else k(r2);
            v = h(r2);
          }
          if (null !== v) var w = true;
          else {
            var m2 = h(t);
            null !== m2 && K(H, m2.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r2);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r2) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r2, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      init_react_shim();
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      init_react_shim();
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m2) {
          this.onError(m2);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m2(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r2(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r2(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m3 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r2(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m3 ? l2 = n2 : m3.sibling = n2;
            m3 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m3 ? l2 = u : m3.sibling = u, m3 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m3 ? l2 = x : m3.sibling = x, m3 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m3 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m3 && !n2.done; w++, n2 = h2.next()) {
            m3.index > w ? (x = m3, m3 = null) : x = m3.sibling;
            var t2 = r2(e2, m3, n2.value, k2);
            if (null === t2) {
              null === m3 && (m3 = x);
              break;
            }
            a && m3 && null === t2.alternate && b(e2, m3);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m3 = x;
          }
          if (n2.done) return c(
            e2,
            m3
          ), I && tg(e2, w), l2;
          if (null === m3) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m3 = d(e2, m3); !n2.done; w++, n2 = h2.next()) n2 = y(m3, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m3.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m3.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m2 = a.alternate;
          null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l : h.next = l, m2.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m2 = l = k = null;
          h = f;
          do {
            var r2 = h.lane, y = h.eventTime;
            if ((d & r2) === r2) {
              null !== m2 && (m2 = m2.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r2 = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r2);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r2 = "function" === typeof n ? n.call(y, q, r2) : n;
                    if (null === r2 || void 0 === r2) break a;
                    q = A({}, q, r2);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
            } else y = { eventTime: y, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l = m2 = y, k = q) : m2 = m2.next = y, g |= r2;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
          } while (1);
          null === m2 && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m2;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m2 = l.lane;
            if ((Hh & m2) === m2) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m2,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m2;
              rh |= m2;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m2 = c.getDerivedStateFromProps, q = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r2 = b.memoizedState;
          g.state = r2;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r2 !== k || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r2 = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m2 = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r2 !== k) && Hi(b, g, d, k);
          jh = false;
          r2 = b.memoizedState;
          g.state = r2;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r2 !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r2, n, k) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m2 = 0, q = a, r2 = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r2 = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r2 === c && ++l === e && (h = g);
                  r2 === f && ++m2 === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r2;
                  r2 = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X) throw Error(p(160));
            Zj(f, g, e);
            X = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m2 = k[g], q = k[g + 1];
                  "style" === m2 ? sb(e, q) : "dangerouslySetInnerHTML" === m2 ? nb(e, q) : "children" === m2 ? ob(e, q) : ta(e, m2, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r2 = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r2 !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m2 = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m2, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
                for (q = V = m2; null !== V; ) {
                  r2 = V;
                  y = r2.child;
                  switch (r2.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r2, r2.return);
                      break;
                    case 1:
                      Lj(r2, r2.return);
                      var n = r2.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r2;
                        c = r2.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r2, r2.return);
                      break;
                    case 22:
                      if (null !== r2.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r2, V = y) : gk(q);
                }
                m2 = m2.sibling;
              }
              a: for (m2 = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m2) {
                    m2 = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m2) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m2 === q && (m2 = null);
                  q = q.return;
                }
                m2 === q && (m2 = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m2 = l.memoizedState;
                      if (null !== m2) {
                        var q = m2.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r2) {
              W(b, b.return, r2);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m2 = h, q = m2.tag;
                if (0 === (m2.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r2 = m2.alternate;
                  r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m2 = V;
                        switch (m2.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m2, f);
                        }
                        var q = m2.child;
                        if (null !== q) q.return = m2, V = q;
                        else for (; null !== V; ) {
                          m2 = V;
                          var r2 = m2.sibling, y = m2.return;
                          Sj(m2);
                          if (m2 === l) {
                            V = null;
                            break;
                          }
                          if (null !== r2) {
                            r2.return = y;
                            V = r2;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m2 = l.pending;
                          null === m2 ? k.next = k : (k.next = m2.next, m2.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      init_react_shim();
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      init_react_shim();
      var m2 = require_react_dom();
      if (true) {
        exports.createRoot = m2.createRoot;
        exports.hydrateRoot = m2.hydrateRoot;
      } else {
        i = m2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m2.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m2.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/jquery/dist/jquery.js
  var require_jquery = __commonJS({
    "node_modules/jquery/dist/jquery.js"(exports, module) {
      init_react_shim();
      (function(global, factory) {
        "use strict";
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
          };
        } else {
          factory(global);
        }
      })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function(array) {
          return arr.flat.call(array);
        } : function(array) {
          return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction2(obj) {
          return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
        };
        var isWindow = function isWindow2(obj) {
          return obj != null && obj === obj.window;
        };
        var document2 = window2.document;
        var preservedScriptAttributes = {
          type: true,
          src: true,
          nonce: true,
          noModule: true
        };
        function DOMEval(code, node, doc) {
          doc = doc || document2;
          var i, val, script = doc.createElement("script");
          script.text = code;
          if (node) {
            for (i in preservedScriptAttributes) {
              val = node[i] || node.getAttribute && node.getAttribute(i);
              if (val) {
                script.setAttribute(i, val);
              }
            }
          }
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj) {
          if (obj == null) {
            return obj + "";
          }
          return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        }
        var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery = function(selector, context) {
          return new jQuery.fn.init(selector, context);
        };
        jQuery.fn = jQuery.prototype = {
          // The current version of jQuery being used
          jquery: version,
          constructor: jQuery,
          // The default length of a jQuery object is 0
          length: 0,
          toArray: function() {
            return slice.call(this);
          },
          // Get the Nth element in the matched element set OR
          // Get the whole matched element set as a clean array
          get: function(num) {
            if (num == null) {
              return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
          },
          // Take an array of elements and push it onto the stack
          // (returning the new matched element set)
          pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
          },
          // Execute a callback for every element in the matched set.
          each: function(callback) {
            return jQuery.each(this, callback);
          },
          map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
              return callback.call(elem, i, elem);
            }));
          },
          slice: function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          even: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return (i + 1) % 2;
            }));
          },
          odd: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return i % 2;
            }));
          },
          eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
          },
          end: function() {
            return this.prevObject || this.constructor();
          },
          // For internal use only.
          // Behaves like an Array's method, not like a jQuery method.
          push,
          sort: arr.sort,
          splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
          var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
          if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
          }
          if (typeof target !== "object" && !isFunction(target)) {
            target = {};
          }
          if (i === length) {
            target = this;
            i--;
          }
          for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
              for (name in options) {
                copy = options[name];
                if (name === "__proto__" || target === copy) {
                  continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                  src = target[name];
                  if (copyIsArray && !Array.isArray(src)) {
                    clone = [];
                  } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                    clone = {};
                  } else {
                    clone = src;
                  }
                  copyIsArray = false;
                  target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== void 0) {
                  target[name] = copy;
                }
              }
            }
          }
          return target;
        };
        jQuery.extend({
          // Unique for each copy of jQuery on the page
          expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
          // Assume jQuery is ready without the ready module
          isReady: true,
          error: function(msg) {
            throw new Error(msg);
          },
          noop: function() {
          },
          isPlainObject: function(obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
              return false;
            }
            proto = getProto(obj);
            if (!proto) {
              return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
          },
          isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
              return false;
            }
            return true;
          },
          // Evaluates a script in a provided context; falls back to the global one
          // if not specified.
          globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
          },
          each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
              length = obj.length;
              for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            } else {
              for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            }
            return obj;
          },
          // Retrieve the text value of an array of DOM nodes
          text: function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i++]) {
                ret += jQuery.text(node);
              }
            }
            if (nodeType === 1 || nodeType === 11) {
              return elem.textContent;
            }
            if (nodeType === 9) {
              return elem.documentElement.textContent;
            }
            if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          },
          // results is for internal usage only
          makeArray: function(arr2, results) {
            var ret = results || [];
            if (arr2 != null) {
              if (isArrayLike(Object(arr2))) {
                jQuery.merge(
                  ret,
                  typeof arr2 === "string" ? [arr2] : arr2
                );
              } else {
                push.call(ret, arr2);
              }
            }
            return ret;
          },
          inArray: function(elem, arr2, i) {
            return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
          },
          isXMLDoc: function(elem) {
            var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
          },
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (; j < len; j++) {
              first[i++] = second[j];
            }
            first.length = i;
            return first;
          },
          grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
              callbackInverse = !callback(elems[i], i);
              if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
              }
            }
            return matches;
          },
          // arg is for internal usage only
          map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
              length = elems.length;
              for (; i < length; i++) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            } else {
              for (i in elems) {
                value = callback(elems[i], i, arg);
                if (value != null) {
                  ret.push(value);
                }
              }
            }
            return flat(ret);
          },
          // A global GUID counter for objects
          guid: 1,
          // jQuery.support is not used in Core but other projects attach their
          // properties to it so it needs to exist.
          support
        });
        if (typeof Symbol === "function") {
          jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery.each(
          "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
          function(_i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
          }
        );
        function isArrayLike(obj) {
          var length = !!obj && "length" in obj && obj.length, type = toType(obj);
          if (isFunction(obj) || isWindow(obj)) {
            return false;
          }
          return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
        }
        function nodeName(elem, name) {
          return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var pop = arr.pop;
        var sort = arr.sort;
        var splice = arr.splice;
        var whitespace = "[\\x20\\t\\r\\n\\f]";
        var rtrimCSS = new RegExp(
          "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
          "g"
        );
        jQuery.contains = function(a, b) {
          var bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
          // IE doesn't have `contains` on SVG.
          (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
        };
        var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
        function fcssescape(ch, asCodePoint) {
          if (asCodePoint) {
            if (ch === "\0") {
              return "\uFFFD";
            }
            return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
          }
          return "\\" + ch;
        }
        jQuery.escapeSelector = function(sel) {
          return (sel + "").replace(rcssescape, fcssescape);
        };
        var preferredDoc = document2, pushNative = push;
        (function() {
          var i, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape2, nonHex) {
            var high = "0x" + escape2.slice(1) - 65536;
            if (nonHex) {
              return nonHex;
            }
            return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(
            function(elem) {
              return elem.disabled === true && nodeName(elem, "fieldset");
            },
            { dir: "parentNode", next: "legend" }
          );
          function safeActiveElement() {
            try {
              return document3.activeElement;
            } catch (err) {
            }
          }
          try {
            push2.apply(
              arr = slice.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: function(target, els) {
                pushNative.apply(target, slice.call(els));
              },
              call: function(target) {
                pushNative.apply(target, slice.call(arguments, 1));
              }
            };
          }
          function find(selector, context, results, seed) {
            var m2, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m2 = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m2)) {
                        if (elem.id === m2) {
                          push2.call(results, elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m2)) && find.contains(context, elem) && elem.id === m2) {
                        push2.call(results, elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m2 = match[3]) && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m2));
                    return results;
                  }
                }
                if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext != context || !support.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = jQuery.escapeSelector(nid);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            return cache;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function createInputPseudo(type) {
            return function(elem) {
              return nodeName(elem, "input") && elem.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem) {
              return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                  elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          function setDocument(node) {
            var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            documentElement2 = document3.documentElement;
            documentIsHTML = !jQuery.isXMLDoc(document3);
            matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
            if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              subWindow.addEventListener("unload", unloadHandler);
            }
            support.getById = assert(function(el) {
              documentElement2.appendChild(el).id = jQuery.expando;
              return !document3.getElementsByName || !document3.getElementsByName(jQuery.expando).length;
            });
            support.disconnectedMatch = assert(function(el) {
              return matches.call(el, "*");
            });
            support.scope = assert(function() {
              return document3.querySelectorAll(":scope");
            });
            support.cssHas = assert(function() {
              try {
                document3.querySelector(":has(*,:jqfake)");
                return false;
              } catch (e) {
                return true;
              }
            });
            if (support.getById) {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i2 = 0;
                    while (elem = elems[i2++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find.TAG = function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else {
                return context.querySelectorAll(tag);
              }
            };
            Expr.find.CLASS = function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyQSA = [];
            assert(function(el) {
              var input;
              documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
              if (!el.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
              }
              if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }
              if (!el.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
              if (!el.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }
              input = document3.createElement("input");
              input.setAttribute("type", "hidden");
              el.appendChild(input).setAttribute("name", "D");
              documentElement2.appendChild(el).disabled = true;
              if (el.querySelectorAll(":disabled").length !== 2) {
                rbuggyQSA.push(":enabled", ":disabled");
              }
              input = document3.createElement("input");
              input.setAttribute("name", "");
              el.appendChild(input);
              if (!el.querySelectorAll("[name='']").length) {
                rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
              }
            });
            if (!support.cssHas) {
              rbuggyQSA.push(":has");
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            sortOrder = function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                // Otherwise we know they are disconnected
                1
              );
              if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a === document3 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
                  return -1;
                }
                if (b === document3 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            };
            return document3;
          }
          find.matches = function(expr, elements) {
            return find(expr, null, null, elements);
          };
          find.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return find(expr, document3, null, [elem]).length > 0;
          };
          find.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return jQuery.contains(context, elem);
          };
          find.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            if (val !== void 0) {
              return val;
            }
            return elem.getAttribute(name);
          };
          find.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          jQuery.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support.sortStable;
            sortInput = !support.sortStable && slice.call(results, 0);
            sort.call(results, sortOrder);
            if (hasDuplicate) {
              while (elem = results[i2++]) {
                if (elem === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                splice.call(results, duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          jQuery.fn.uniqueSort = function() {
            return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
          };
          Expr = jQuery.expr = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              ATTR: function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              CHILD: function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    find.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  find.error(match[0]);
                }
                return match;
              },
              PSEUDO: function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr.CHILD.test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              TAG: function(nodeNameSelector) {
                var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return nodeName(elem, expectedNodeName);
                };
              },
              CLASS: function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                  return pattern.test(
                    typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                  );
                });
              },
              ATTR: function(name, operator, check) {
                return function(elem) {
                  var result = find.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  if (operator === "=") {
                    return result === check;
                  }
                  if (operator === "!=") {
                    return result !== check;
                  }
                  if (operator === "^=") {
                    return check && result.indexOf(check) === 0;
                  }
                  if (operator === "*=") {
                    return check && result.indexOf(check) > -1;
                  }
                  if (operator === "$=") {
                    return check && result.slice(-check.length) === check;
                  }
                  if (operator === "~=") {
                    return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                  }
                  if (operator === "|=") {
                    return result === check || result.slice(0, check.length + 1) === check + "-";
                  }
                  return false;
                };
              },
              CHILD: function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? (
                  // Shortcut for :nth-*(n)
                  function(elem) {
                    return !!elem.parentNode;
                  }
                ) : function(elem, _context, xml) {
                  var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      outerCache = parent[expando] || (parent[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                      (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          outerCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        outerCache = elem[expando] || (elem[expando] = {});
                        cache = outerCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              outerCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              PSEUDO: function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf.call(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              // Potentially complex pseudos
              not: markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              has: markFunction(function(selector) {
                return function(elem) {
                  return find(selector, elem).length > 0;
                };
              }),
              contains: markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
                };
              }),
              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // https://www.w3.org/TR/selectors/#lang-pseudo
              lang: markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  find.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              // Miscellaneous
              target: function(elem) {
                var hash = window2.location && window2.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              root: function(elem) {
                return elem === documentElement2;
              },
              focus: function(elem) {
                return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              // Boolean properties
              enabled: createDisabledPseudo(false),
              disabled: createDisabledPseudo(true),
              checked: function(elem) {
                return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
              },
              selected: function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              // Contents
              empty: function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              parent: function(elem) {
                return !Expr.pseudos.empty(elem);
              },
              // Element/input types
              header: function(elem) {
                return rheader.test(elem.nodeName);
              },
              input: function(elem) {
                return rinputs.test(elem.nodeName);
              },
              button: function(elem) {
                return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
              },
              text: function(elem) {
                var attr;
                return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
                // New HTML5 attribute values (e.g., "search") appear
                // with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              // Position-in-collection
              first: createPositionalPseudo(function() {
                return [0];
              }),
              last: createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              even: createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 0;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              odd: createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 1;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2;
                if (argument < 0) {
                  i2 = argument + length;
                } else if (argument > length) {
                  i2 = length;
                } else {
                  i2 = argument;
                }
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument;
                for (; ++i2 < length; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos.nth = Expr.pseudos.eq;
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rleadingCombinator.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  // Cast descendant combinators to space
                  type: match[0].replace(rtrimCSS, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            if (parseOnly) {
              return soFar.length;
            }
            return soFar ? find.error(selector) : (
              // Cache the tokens
              tokenCache(selector, groups).slice(0)
            );
          }
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? (
              // Check against closest ancestor/preceding element
              function(elem, context, xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                  }
                }
                return false;
              }
            ) : (
              // Check against all ancestor/preceding elements
              function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      if (matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                } else {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      if (skip && nodeName(elem, skip)) {
                        elem = elem[dir2] || elem;
                      } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      } else {
                        outerCache[key] = newCache;
                        if (newCache[2] = matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              }
            );
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              find(selector, contexts[i2], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem = unmatched[i2]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
              if (matcher) {
                matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                  // ...intermediate processing is necessary
                  []
                ) : (
                  // ...otherwise use results directly
                  results
                );
                matcher(matcherIn, matcherOut, context, xml);
              } else {
                matcherOut = matcherIn;
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i2 > 1 && elementMatcher(matchers),
                    i2 > 1 && toSelector(
                      // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                      tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                    ).replace(rtrimCSS, "$1"),
                    matcher,
                    i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                    j < len && matcherFromTokens(tokens = tokens.slice(j)),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document3, xml)) {
                      push2.call(results, elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  jQuery.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          function compile(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          }
          function select(selector, context, results, seed) {
            var i2, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find.ID(
                  token.matches[0].replace(runescape, funescape),
                  context
                ) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find2 = Expr.find[type]) {
                  if (seed = find2(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          }
          support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          setDocument();
          support.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          jQuery.find = find;
          jQuery.expr[":"] = jQuery.expr.pseudos;
          jQuery.unique = jQuery.uniqueSort;
          find.compile = compile;
          find.select = select;
          find.setDocument = setDocument;
          find.tokenize = tokenize;
          find.escape = jQuery.escapeSelector;
          find.getText = jQuery.text;
          find.isXML = jQuery.isXMLDoc;
          find.selectors = jQuery.expr;
          find.support = jQuery.support;
          find.uniqueSort = jQuery.uniqueSort;
        })();
        var dir = function(elem, dir2, until) {
          var matched = [], truncate = until !== void 0;
          while ((elem = elem[dir2]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
              if (truncate && jQuery(elem).is(until)) {
                break;
              }
              matched.push(elem);
            }
          }
          return matched;
        };
        var siblings = function(n, elem) {
          var matched = [];
          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
              matched.push(n);
            }
          }
          return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function winnow(elements, qualifier, not) {
          if (isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
              return !!qualifier.call(elem, i, elem) !== not;
            });
          }
          if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
              return elem === qualifier !== not;
            });
          }
          if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function(elem) {
              return indexOf.call(qualifier, elem) > -1 !== not;
            });
          }
          return jQuery.filter(qualifier, elements, not);
        }
        jQuery.filter = function(expr, elems, not) {
          var elem = elems[0];
          if (not) {
            expr = ":not(" + expr + ")";
          }
          if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
          }
          return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
            return elem2.nodeType === 1;
          }));
        };
        jQuery.fn.extend({
          find: function(selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
              return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) {
                  if (jQuery.contains(self[i], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
              jQuery.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
          },
          filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
          },
          not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is: function(selector) {
            return !!winnow(
              this,
              // If this is a positional/relative selector, check membership in the returned set
              // so $("p:first").is("p:last") won't return true for a doc with two "p".
              typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
              false
            ).length;
          }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root2) {
          var match, elem;
          if (!selector) {
            return this;
          }
          root2 = root2 || rootjQuery;
          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;
                jQuery.merge(this, jQuery.parseHTML(
                  match[1],
                  context && context.nodeType ? context.ownerDocument || context : document2,
                  true
                ));
                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);
                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;
              } else {
                elem = document2.getElementById(match[2]);
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root2).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (isFunction(selector)) {
            return root2.ready !== void 0 ? root2.ready(selector) : (
              // Execute immediately if ready is not present
              selector(jQuery)
            );
          }
          return jQuery.makeArray(selector, this);
        };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document2);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
        jQuery.fn.extend({
          has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
              var i = 0;
              for (; i < l; i++) {
                if (jQuery.contains(this, targets[i])) {
                  return true;
                }
              }
            });
          },
          closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
            if (!rneedsContext.test(selectors)) {
              for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                    // Don't pass non-elements to jQuery#find
                    cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
                  ))) {
                    matched.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
          },
          // Determine the position of an element within the set
          index: function(elem) {
            if (!elem) {
              return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
              return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(
              this,
              // If it receives a jQuery object, the first element is used
              elem.jquery ? elem[0] : elem
            );
          },
          add: function(selector, context) {
            return this.pushStack(
              jQuery.uniqueSort(
                jQuery.merge(this.get(), jQuery(selector, context))
              )
            );
          },
          addBack: function(selector) {
            return this.add(
              selector == null ? this.prevObject : this.prevObject.filter(selector)
            );
          }
        });
        function sibling(cur, dir2) {
          while ((cur = cur[dir2]) && cur.nodeType !== 1) {
          }
          return cur;
        }
        jQuery.each({
          parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
          },
          parents: function(elem) {
            return dir(elem, "parentNode");
          },
          parentsUntil: function(elem, _i, until) {
            return dir(elem, "parentNode", until);
          },
          next: function(elem) {
            return sibling(elem, "nextSibling");
          },
          prev: function(elem) {
            return sibling(elem, "previousSibling");
          },
          nextAll: function(elem) {
            return dir(elem, "nextSibling");
          },
          prevAll: function(elem) {
            return dir(elem, "previousSibling");
          },
          nextUntil: function(elem, _i, until) {
            return dir(elem, "nextSibling", until);
          },
          prevUntil: function(elem, _i, until) {
            return dir(elem, "previousSibling", until);
          },
          siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
          },
          children: function(elem) {
            return siblings(elem.firstChild);
          },
          contents: function(elem) {
            if (elem.contentDocument != null && // Support: IE 11+
            // <object> elements with no `data` attribute has an object
            // `contentDocument` with a `null` prototype.
            getProto(elem.contentDocument)) {
              return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
              elem = elem.content || elem;
            }
            return jQuery.merge([], elem.childNodes);
          }
        }, function(name, fn) {
          jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
              selector = until;
            }
            if (selector && typeof selector === "string") {
              matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
              if (!guaranteedUnique[name]) {
                jQuery.uniqueSort(matched);
              }
              if (rparentsprev.test(name)) {
                matched.reverse();
              }
            }
            return this.pushStack(matched);
          };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        function createOptions(options) {
          var object = {};
          jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
          });
          return object;
        }
        jQuery.Callbacks = function(options) {
          options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
          var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }
            if (!options.memory) {
              memory = false;
            }
            firing = false;
            if (locked) {
              if (memory) {
                list = [];
              } else {
                list = "";
              }
            }
          }, self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add(args) {
                  jQuery.each(args, function(_, arg) {
                    if (isFunction(arg)) {
                      if (!options.unique || !self.has(arg)) {
                        list.push(arg);
                      }
                    } else if (arg && arg.length && toType(arg) !== "string") {
                      add(arg);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            // Remove a callback from the list
            remove: function() {
              jQuery.each(arguments, function(_, arg) {
                var index;
                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function(fn) {
              return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            // Remove all callbacks from the list
            empty: function() {
              if (list) {
                list = [];
              }
              return this;
            },
            // Disable .fire and .add
            // Abort any current/pending executions
            // Clear all callbacks and values
            disable: function() {
              locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function() {
              return !list;
            },
            // Disable .fire
            // Also disable .add unless we have memory (since it would have no effect)
            // Abort any pending executions
            lock: function() {
              locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function() {
              return !!locked;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function(context, args) {
              if (!locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
              self.fireWith(this, arguments);
              return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
              return !!fired;
            }
          };
          return self;
        };
        function Identity(v) {
          return v;
        }
        function Thrower(ex) {
          throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
          var method;
          try {
            if (value && isFunction(method = value.promise)) {
              method.call(value).done(resolve).fail(reject);
            } else if (value && isFunction(method = value.then)) {
              method.call(value, resolve, reject);
            } else {
              resolve.apply(void 0, [value].slice(noValue));
            }
          } catch (value2) {
            reject.apply(void 0, [value2]);
          }
        }
        jQuery.extend({
          Deferred: function(func) {
            var tuples = [
              // action, add listener, callbacks,
              // ... .then handlers, argument index, [final state]
              [
                "notify",
                "progress",
                jQuery.Callbacks("memory"),
                jQuery.Callbacks("memory"),
                2
              ],
              [
                "resolve",
                "done",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                0,
                "resolved"
              ],
              [
                "reject",
                "fail",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                1,
                "rejected"
              ]
            ], state = "pending", promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              // Keep pipe for back-compat
              pipe: function() {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each(tuples, function(_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](
                          this,
                          fn ? [returned] : arguments
                        );
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred2, handler, special) {
                  return function() {
                    var that = this, args = arguments, mightThrow = function() {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred2.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }
                      then = returned && // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      (typeof returned === "object" || typeof returned === "function") && returned.then;
                      if (isFunction(then)) {
                        if (special) {
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special)
                          );
                        } else {
                          maxDepth++;
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special),
                            resolve(
                              maxDepth,
                              deferred2,
                              Identity,
                              deferred2.notifyWith
                            )
                          );
                        }
                      } else {
                        if (handler !== Identity) {
                          that = void 0;
                          args = [returned];
                        }
                        (special || deferred2.resolveWith)(that, args);
                      }
                    }, process2 = special ? mightThrow : function() {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (jQuery.Deferred.exceptionHook) {
                          jQuery.Deferred.exceptionHook(
                            e,
                            process2.error
                          );
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = void 0;
                            args = [e];
                          }
                          deferred2.rejectWith(that, args);
                        }
                      }
                    };
                    if (depth) {
                      process2();
                    } else {
                      if (jQuery.Deferred.getErrorHook) {
                        process2.error = jQuery.Deferred.getErrorHook();
                      } else if (jQuery.Deferred.getStackHook) {
                        process2.error = jQuery.Deferred.getStackHook();
                      }
                      window2.setTimeout(process2);
                    }
                  };
                }
                return jQuery.Deferred(function(newDefer) {
                  tuples[0][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onProgress) ? onProgress : Identity,
                      newDefer.notifyWith
                    )
                  );
                  tuples[1][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onFulfilled) ? onFulfilled : Identity
                    )
                  );
                  tuples[2][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onRejected) ? onRejected : Thrower
                    )
                  );
                }).promise();
              },
              // Get a promise for this deferred
              // If obj is provided, the promise aspect is added to the object
              promise: function(obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
              }
            }, deferred = {};
            jQuery.each(tuples, function(i, tuple) {
              var list = tuple[2], stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(
                  function() {
                    state = stateString;
                  },
                  // rejected_callbacks.disable
                  // fulfilled_callbacks.disable
                  tuples[3 - i][2].disable,
                  // rejected_handlers.disable
                  // fulfilled_handlers.disable
                  tuples[3 - i][3].disable,
                  // progress_callbacks.lock
                  tuples[0][2].lock,
                  // progress_handlers.lock
                  tuples[0][3].lock
                );
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                return this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
              func.call(deferred, deferred);
            }
            return deferred;
          },
          // Deferred helper
          when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
              return function(value) {
                resolveContexts[i2] = this;
                resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!--remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
            if (remaining <= 1) {
              adoptValue(
                singleValue,
                primary.done(updateFunc(i)).resolve,
                primary.reject,
                !remaining
              );
              if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                return primary.then();
              }
            }
            while (i--) {
              adoptValue(resolveValues[i], updateFunc(i), primary.reject);
            }
            return primary.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function(error, asyncError) {
          if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
            window2.console.warn(
              "jQuery.Deferred exception: " + error.message,
              error.stack,
              asyncError
            );
          }
        };
        jQuery.readyException = function(error) {
          window2.setTimeout(function() {
            throw error;
          });
        };
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function(fn) {
          readyList.then(fn).catch(function(error) {
            jQuery.readyException(error);
          });
          return this;
        };
        jQuery.extend({
          // Is the DOM ready to be used? Set to true once it occurs.
          isReady: false,
          // A counter to track how many items to wait for before
          // the ready event fires. See trac-6781
          readyWait: 1,
          // Handle when the DOM is ready
          ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
              return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
              return;
            }
            readyList.resolveWith(document2, [jQuery]);
          }
        });
        jQuery.ready.then = readyList.then;
        function completed() {
          document2.removeEventListener("DOMContentLoaded", completed);
          window2.removeEventListener("load", completed);
          jQuery.ready();
        }
        if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
          window2.setTimeout(jQuery.ready);
        } else {
          document2.addEventListener("DOMContentLoaded", completed);
          window2.addEventListener("load", completed);
        }
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
          var i = 0, len = elems.length, bulk = key == null;
          if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
              access(elems, fn, i, key[i], true, emptyGet, raw);
            }
          } else if (value !== void 0) {
            chainable = true;
            if (!isFunction(value)) {
              raw = true;
            }
            if (bulk) {
              if (raw) {
                fn.call(elems, value);
                fn = null;
              } else {
                bulk = fn;
                fn = function(elem, _key, value2) {
                  return bulk.call(jQuery(elem), value2);
                };
              }
            }
            if (fn) {
              for (; i < len; i++) {
                fn(
                  elems[i],
                  key,
                  raw ? value : value.call(elems[i], i, fn(elems[i], key))
                );
              }
            }
          }
          if (chainable) {
            return elems;
          }
          if (bulk) {
            return fn.call(elems);
          }
          return len ? fn(elems[0], key) : emptyGet;
        };
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        function fcamelCase(_all, letter) {
          return letter.toUpperCase();
        }
        function camelCase(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function(owner) {
          return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
          this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
          cache: function(owner) {
            var value = owner[this.expando];
            if (!value) {
              value = {};
              if (acceptData(owner)) {
                if (owner.nodeType) {
                  owner[this.expando] = value;
                } else {
                  Object.defineProperty(owner, this.expando, {
                    value,
                    configurable: true
                  });
                }
              }
            }
            return value;
          },
          set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
              cache[camelCase(data)] = value;
            } else {
              for (prop in data) {
                cache[camelCase(prop)] = data[prop];
              }
            }
            return cache;
          },
          get: function(owner, key) {
            return key === void 0 ? this.cache(owner) : (
              // Always use camelCase key (gh-2257)
              owner[this.expando] && owner[this.expando][camelCase(key)]
            );
          },
          access: function(owner, key, value) {
            if (key === void 0 || key && typeof key === "string" && value === void 0) {
              return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== void 0 ? value : key;
          },
          remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (cache === void 0) {
              return;
            }
            if (key !== void 0) {
              if (Array.isArray(key)) {
                key = key.map(camelCase);
              } else {
                key = camelCase(key);
                key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
              }
              i = key.length;
              while (i--) {
                delete cache[key[i]];
              }
            }
            if (key === void 0 || jQuery.isEmptyObject(cache)) {
              if (owner.nodeType) {
                owner[this.expando] = void 0;
              } else {
                delete owner[this.expando];
              }
            }
          },
          hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== void 0 && !jQuery.isEmptyObject(cache);
          }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data) {
          if (data === "true") {
            return true;
          }
          if (data === "false") {
            return false;
          }
          if (data === "null") {
            return null;
          }
          if (data === +data + "") {
            return +data;
          }
          if (rbrace.test(data)) {
            return JSON.parse(data);
          }
          return data;
        }
        function dataAttr(elem, key, data) {
          var name;
          if (data === void 0 && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
              try {
                data = getData(data);
              } catch (e) {
              }
              dataUser.set(elem, key, data);
            } else {
              data = void 0;
            }
          }
          return data;
        }
        jQuery.extend({
          hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
          },
          data: function(elem, name, data) {
            return dataUser.access(elem, name, data);
          },
          removeData: function(elem, name) {
            dataUser.remove(elem, name);
          },
          // TODO: Now that all calls to _data and _removeData have been replaced
          // with direct calls to dataPriv methods, these can be deprecated.
          _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data);
          },
          _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
          }
        });
        jQuery.fn.extend({
          data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === void 0) {
              if (this.length) {
                data = dataUser.get(elem);
                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                  i = attrs.length;
                  while (i--) {
                    if (attrs[i]) {
                      name = attrs[i].name;
                      if (name.indexOf("data-") === 0) {
                        name = camelCase(name.slice(5));
                        dataAttr(elem, name, data[name]);
                      }
                    }
                  }
                  dataPriv.set(elem, "hasDataAttrs", true);
                }
              }
              return data;
            }
            if (typeof key === "object") {
              return this.each(function() {
                dataUser.set(this, key);
              });
            }
            return access(this, function(value2) {
              var data2;
              if (elem && value2 === void 0) {
                data2 = dataUser.get(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                data2 = dataAttr(elem, key);
                if (data2 !== void 0) {
                  return data2;
                }
                return;
              }
              this.each(function() {
                dataUser.set(this, key, value2);
              });
            }, null, value, arguments.length > 1, null, true);
          },
          removeData: function(key) {
            return this.each(function() {
              dataUser.remove(this, key);
            });
          }
        });
        jQuery.extend({
          queue: function(elem, type, data) {
            var queue;
            if (elem) {
              type = (type || "fx") + "queue";
              queue = dataPriv.get(elem, type);
              if (data) {
                if (!queue || Array.isArray(data)) {
                  queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                } else {
                  queue.push(data);
                }
              }
              return queue || [];
            }
          },
          dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
              jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
              fn = queue.shift();
              startLength--;
            }
            if (fn) {
              if (type === "fx") {
                queue.unshift("inprogress");
              }
              delete hooks.stop;
              fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
              hooks.empty.fire();
            }
          },
          // Not public - generate a queueHooks object, or return the current one
          _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
              empty: jQuery.Callbacks("once memory").add(function() {
                dataPriv.remove(elem, [type + "queue", key]);
              })
            });
          }
        });
        jQuery.fn.extend({
          queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
              data = type;
              type = "fx";
              setter--;
            }
            if (arguments.length < setter) {
              return jQuery.queue(this[0], type);
            }
            return data === void 0 ? this : this.each(function() {
              var queue = jQuery.queue(this, type, data);
              jQuery._queueHooks(this, type);
              if (type === "fx" && queue[0] !== "inprogress") {
                jQuery.dequeue(this, type);
              }
            });
          },
          dequeue: function(type) {
            return this.each(function() {
              jQuery.dequeue(this, type);
            });
          },
          clearQueue: function(type) {
            return this.queue(type || "fx", []);
          },
          // Get a promise resolved when queues of a certain type
          // are emptied (fx is the type by default)
          promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
              if (!--count) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if (typeof type !== "string") {
              obj = type;
              type = void 0;
            }
            type = type || "fx";
            while (i--) {
              tmp = dataPriv.get(elements[i], type + "queueHooks");
              if (tmp && tmp.empty) {
                count++;
                tmp.empty.add(resolve);
              }
            }
            resolve();
            return defer.promise(obj);
          }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document2.documentElement;
        var isAttached = function(elem) {
          return jQuery.contains(elem.ownerDocument, elem);
        }, composed = { composed: true };
        if (documentElement.getRootNode) {
          isAttached = function(elem) {
            return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
          };
        }
        var isHiddenWithinTree = function(elem, el) {
          elem = el || elem;
          return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
          // Support: Firefox <=43 - 45
          // Disconnected elements can have computed display: none, so first confirm that elem is
          // in the document.
          isAttached(elem) && jQuery.css(elem, "display") === "none";
        };
        function adjustCSS(elem, prop, valueParts, tween) {
          var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery.css(elem, prop, "");
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
              jQuery.style(elem, prop, initialInUnit + unit);
              if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                maxIterations = 0;
              }
              initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
              tween.unit = unit;
              tween.start = initialInUnit;
              tween.end = adjusted;
            }
          }
          return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
          var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
          if (display) {
            return display;
          }
          temp = doc.body.appendChild(doc.createElement(nodeName2));
          display = jQuery.css(temp, "display");
          temp.parentNode.removeChild(temp);
          if (display === "none") {
            display = "block";
          }
          defaultDisplayMap[nodeName2] = display;
          return display;
        }
        function showHide(elements, show) {
          var display, elem, values = [], index = 0, length = elements.length;
          for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
              continue;
            }
            display = elem.style.display;
            if (show) {
              if (display === "none") {
                values[index] = dataPriv.get(elem, "display") || null;
                if (!values[index]) {
                  elem.style.display = "";
                }
              }
              if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                values[index] = getDefaultDisplay(elem);
              }
            } else {
              if (display !== "none") {
                values[index] = "none";
                dataPriv.set(elem, "display", display);
              }
            }
          }
          for (index = 0; index < length; index++) {
            if (values[index] != null) {
              elements[index].style.display = values[index];
            }
          }
          return elements;
        }
        jQuery.fn.extend({
          show: function() {
            return showHide(this, true);
          },
          hide: function() {
            return showHide(this);
          },
          toggle: function(state) {
            if (typeof state === "boolean") {
              return state ? this.show() : this.hide();
            }
            return this.each(function() {
              if (isHiddenWithinTree(this)) {
                jQuery(this).show();
              } else {
                jQuery(this).hide();
              }
            });
          }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
          var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("checked", "checked");
          input.setAttribute("name", "t");
          div.appendChild(input);
          support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
          div.innerHTML = "<textarea>x</textarea>";
          support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
          div.innerHTML = "<option></option>";
          support.option = !!div.lastChild;
        })();
        var wrapMap = {
          // XHTML parsers do not magically insert elements in the
          // same way that tag soup parsers do. So we cannot shorten
          // this by omitting <tbody> or other required elements.
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
          var ret;
          if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
          } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
          } else {
            ret = [];
          }
          if (tag === void 0 || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
          }
          return ret;
        }
        function setGlobalEval(elems, refElements) {
          var i = 0, l = elems.length;
          for (; i < l; i++) {
            dataPriv.set(
              elems[i],
              "globalEval",
              !refElements || dataPriv.get(refElements[i], "globalEval")
            );
          }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
          var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
          for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
              if (toType(elem) === "object") {
                jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
              } else if (!rhtml.test(elem)) {
                nodes.push(context.createTextNode(elem));
              } else {
                tmp = tmp || fragment.appendChild(context.createElement("div"));
                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                j = wrap[0];
                while (j--) {
                  tmp = tmp.lastChild;
                }
                jQuery.merge(nodes, tmp.childNodes);
                tmp = fragment.firstChild;
                tmp.textContent = "";
              }
            }
          }
          fragment.textContent = "";
          i = 0;
          while (elem = nodes[i++]) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
              if (ignored) {
                ignored.push(elem);
              }
              continue;
            }
            attached = isAttached(elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (attached) {
              setGlobalEval(tmp);
            }
            if (scripts) {
              j = 0;
              while (elem = tmp[j++]) {
                if (rscriptType.test(elem.type || "")) {
                  scripts.push(elem);
                }
              }
            }
          }
          return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function on(elem, types, selector, data, fn, one) {
          var origFn, type;
          if (typeof types === "object") {
            if (typeof selector !== "string") {
              data = data || selector;
              selector = void 0;
            }
            for (type in types) {
              on(elem, type, selector, data, types[type], one);
            }
            return elem;
          }
          if (data == null && fn == null) {
            fn = selector;
            data = selector = void 0;
          } else if (fn == null) {
            if (typeof selector === "string") {
              fn = data;
              data = void 0;
            } else {
              fn = data;
              data = selector;
              selector = void 0;
            }
          }
          if (fn === false) {
            fn = returnFalse;
          } else if (!fn) {
            return elem;
          }
          if (one === 1) {
            origFn = fn;
            fn = function(event) {
              jQuery().off(event);
              return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
          }
          return elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
          });
        }
        jQuery.event = {
          global: {},
          add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!acceptData(elem)) {
              return;
            }
            if (handler.handler) {
              handleObjIn = handler;
              handler = handleObjIn.handler;
              selector = handleObjIn.selector;
            }
            if (selector) {
              jQuery.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
              handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
              events = elemData.events = /* @__PURE__ */ Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
              eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
              };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              special = jQuery.event.special[type] || {};
              handleObj = jQuery.extend({
                type,
                origType,
                data,
                handler,
                guid: handler.guid,
                selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
              }, handleObjIn);
              if (!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;
                if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                  if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle);
                  }
                }
              }
              if (special.add) {
                special.add.call(elem, handleObj);
                if (!handleObj.handler.guid) {
                  handleObj.handler.guid = handler.guid;
                }
              }
              if (selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
              } else {
                handlers.push(handleObj);
              }
              jQuery.event.global[type] = true;
            }
          },
          // Detach an event or set of events from an element
          remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
              return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                for (type in events) {
                  jQuery.event.remove(elem, type + types[t], handler, selector, true);
                }
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              handlers = events[type] || [];
              tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
              origCount = j = handlers.length;
              while (j--) {
                handleObj = handlers[j];
                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                  handlers.splice(j, 1);
                  if (handleObj.selector) {
                    handlers.delegateCount--;
                  }
                  if (special.remove) {
                    special.remove.call(elem, handleObj);
                  }
                }
              }
              if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                  jQuery.removeEvent(elem, type, elemData.handle);
                }
                delete events[type];
              }
            }
            if (jQuery.isEmptyObject(events)) {
              dataPriv.remove(elem, "handle events");
            }
          },
          dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
              return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
              event.currentTarget = matched.elem;
              j = 0;
              while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                  event.handleObj = handleObj;
                  event.data = handleObj.data;
                  ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                  if (ret !== void 0) {
                    if ((event.result = ret) === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
            }
            if (special.postDispatch) {
              special.postDispatch.call(this, event);
            }
            return event.result;
          },
          handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && // Support: IE <=9
            // Black-hole SVG <use> instance trees (trac-13180)
            cur.nodeType && // Support: Firefox <=42
            // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
            // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
            // Support: IE 11 only
            // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
            !(event.type === "click" && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                  matchedHandlers = [];
                  matchedSelectors = {};
                  for (i = 0; i < delegateCount; i++) {
                    handleObj = handlers[i];
                    sel = handleObj.selector + " ";
                    if (matchedSelectors[sel] === void 0) {
                      matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                    }
                    if (matchedSelectors[sel]) {
                      matchedHandlers.push(handleObj);
                    }
                  }
                  if (matchedHandlers.length) {
                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                  }
                }
              }
            }
            cur = this;
            if (delegateCount < handlers.length) {
              handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
          },
          addProp: function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
              enumerable: true,
              configurable: true,
              get: isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name];
                }
              },
              set: function(value) {
                Object.defineProperty(this, name, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value
                });
              }
            });
          },
          fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
          },
          special: {
            load: {
              // Prevent triggered image.load events from bubbling to window.load
              noBubble: true
            },
            click: {
              // Utilize native event to ensure correct state for checkable inputs
              setup: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click", true);
                }
                return false;
              },
              trigger: function(data) {
                var el = this || data;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click");
                }
                return true;
              },
              // For cross-browser consistency, suppress native .click() on links
              // Also prevent it if we're currently inside a leveraged native-event stack
              _default: function(event) {
                var target = event.target;
                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
              }
            },
            beforeunload: {
              postDispatch: function(event) {
                if (event.result !== void 0 && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        function leverageNative(el, type, isSetup) {
          if (!isSetup) {
            if (dataPriv.get(el, type) === void 0) {
              jQuery.event.add(el, type, returnTrue);
            }
            return;
          }
          dataPriv.set(el, type, false);
          jQuery.event.add(el, type, {
            namespace: false,
            handler: function(event) {
              var result, saved = dataPriv.get(this, type);
              if (event.isTrigger & 1 && this[type]) {
                if (!saved) {
                  saved = slice.call(arguments);
                  dataPriv.set(this, type, saved);
                  this[type]();
                  result = dataPriv.get(this, type);
                  dataPriv.set(this, type, false);
                  if (saved !== result) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return result;
                  }
                } else if ((jQuery.event.special[type] || {}).delegateType) {
                  event.stopPropagation();
                }
              } else if (saved) {
                dataPriv.set(this, type, jQuery.event.trigger(
                  saved[0],
                  saved.slice(1),
                  this
                ));
                event.stopPropagation();
                event.isImmediatePropagationStopped = returnTrue;
              }
            }
          });
        }
        jQuery.removeEvent = function(elem, type, handle) {
          if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
          }
        };
        jQuery.Event = function(src, props) {
          if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
            src.returnValue === false ? returnTrue : returnFalse;
            this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery.expando] = true;
        };
        jQuery.Event.prototype = {
          constructor: jQuery.Event,
          isDefaultPrevented: returnFalse,
          isPropagationStopped: returnFalse,
          isImmediatePropagationStopped: returnFalse,
          isSimulated: false,
          preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery.each({
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          "char": true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        }, jQuery.event.addProp);
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
          function focusMappedHandler(nativeEvent) {
            if (document2.documentMode) {
              var handle = dataPriv.get(this, "handle"), event = jQuery.event.fix(nativeEvent);
              event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
              event.isSimulated = true;
              handle(nativeEvent);
              if (event.target === event.currentTarget) {
                handle(event);
              }
            } else {
              jQuery.event.simulate(
                delegateType,
                nativeEvent.target,
                jQuery.event.fix(nativeEvent)
              );
            }
          }
          jQuery.event.special[type] = {
            // Utilize native event if possible so blur/focus sequence is correct
            setup: function() {
              var attaches;
              leverageNative(this, type, true);
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType);
                if (!attaches) {
                  this.addEventListener(delegateType, focusMappedHandler);
                }
                dataPriv.set(this, delegateType, (attaches || 0) + 1);
              } else {
                return false;
              }
            },
            trigger: function() {
              leverageNative(this, type);
              return true;
            },
            teardown: function() {
              var attaches;
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType) - 1;
                if (!attaches) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                  dataPriv.remove(this, delegateType);
                } else {
                  dataPriv.set(this, delegateType, attaches);
                }
              } else {
                return false;
              }
            },
            // Suppress native focus or blur if we're currently inside
            // a leveraged native-event stack
            _default: function(event) {
              return dataPriv.get(event.target, type);
            },
            delegateType
          };
          jQuery.event.special[delegateType] = {
            setup: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
              if (!attaches) {
                if (document2.documentMode) {
                  this.addEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.addEventListener(type, focusMappedHandler, true);
                }
              }
              dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
            },
            teardown: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
              if (!attaches) {
                if (document2.documentMode) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.removeEventListener(type, focusMappedHandler, true);
                }
                dataPriv.remove(dataHolder, delegateType);
              } else {
                dataPriv.set(dataHolder, delegateType, attaches);
              }
            }
          };
        });
        jQuery.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function(orig, fix) {
          jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
              var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
              if (!related || related !== target && !jQuery.contains(target, related)) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply(this, arguments);
                event.type = fix;
              }
              return ret;
            }
          };
        });
        jQuery.fn.extend({
          on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
          },
          one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
          },
          off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
              handleObj = types.handleObj;
              jQuery(types.delegateTarget).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
              );
              return this;
            }
            if (typeof types === "object") {
              for (type in types) {
                this.off(type, selector, types[type]);
              }
              return this;
            }
            if (selector === false || typeof selector === "function") {
              fn = selector;
              selector = void 0;
            }
            if (fn === false) {
              fn = returnFalse;
            }
            return this.each(function() {
              jQuery.event.remove(this, types, fn, selector);
            });
          }
        });
        var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function manipulationTarget(elem, content) {
          if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery(elem).children("tbody")[0] || elem;
          }
          return elem;
        }
        function disableScript(elem) {
          elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
          return elem;
        }
        function restoreScript(elem) {
          if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
          } else {
            elem.removeAttribute("type");
          }
          return elem;
        }
        function cloneCopyEvent(src, dest) {
          var i, l, type, pdataOld, udataOld, udataCur, events;
          if (dest.nodeType !== 1) {
            return;
          }
          if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;
            if (events) {
              dataPriv.remove(dest, "handle events");
              for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                  jQuery.event.add(dest, type, events[type][i]);
                }
              }
            }
          }
          if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur);
          }
        }
        function fixInput(src, dest) {
          var nodeName2 = dest.nodeName.toLowerCase();
          if (nodeName2 === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
          } else if (nodeName2 === "input" || nodeName2 === "textarea") {
            dest.defaultValue = src.defaultValue;
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = flat(args);
          var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
          if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
            return collection.each(function(index) {
              var self = collection.eq(index);
              if (valueIsFunction) {
                args[0] = value.call(this, index, self.html());
              }
              domManip(self, args, callback, ignored);
            });
          }
          if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
              fragment = first;
            }
            if (first || ignored) {
              scripts = jQuery.map(getAll(fragment, "script"), disableScript);
              hasScripts = scripts.length;
              for (; i < l; i++) {
                node = fragment;
                if (i !== iNoClone) {
                  node = jQuery.clone(node, true, true);
                  if (hasScripts) {
                    jQuery.merge(scripts, getAll(node, "script"));
                  }
                }
                callback.call(collection[i], node, i);
              }
              if (hasScripts) {
                doc = scripts[scripts.length - 1].ownerDocument;
                jQuery.map(scripts, restoreScript);
                for (i = 0; i < hasScripts; i++) {
                  node = scripts[i];
                  if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                    if (node.src && (node.type || "").toLowerCase() !== "module") {
                      if (jQuery._evalUrl && !node.noModule) {
                        jQuery._evalUrl(node.src, {
                          nonce: node.nonce || node.getAttribute("nonce")
                        }, doc);
                      }
                    } else {
                      DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                    }
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(elem, selector, keepData) {
          var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
          for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
              jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
              if (keepData && isAttached(node)) {
                setGlobalEval(getAll(node, "script"));
              }
              node.parentNode.removeChild(node);
            }
          }
          return elem;
        }
        jQuery.extend({
          htmlPrefilter: function(html) {
            return html;
          },
          clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
              destElements = getAll(clone);
              srcElements = getAll(elem);
              for (i = 0, l = srcElements.length; i < l; i++) {
                fixInput(srcElements[i], destElements[i]);
              }
            }
            if (dataAndEvents) {
              if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                for (i = 0, l = srcElements.length; i < l; i++) {
                  cloneCopyEvent(srcElements[i], destElements[i]);
                }
              } else {
                cloneCopyEvent(elem, clone);
              }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
              setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
          },
          cleanData: function(elems) {
            var data, elem, type, special = jQuery.event.special, i = 0;
            for (; (elem = elems[i]) !== void 0; i++) {
              if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                  if (data.events) {
                    for (type in data.events) {
                      if (special[type]) {
                        jQuery.event.remove(elem, type);
                      } else {
                        jQuery.removeEvent(elem, type, data.handle);
                      }
                    }
                  }
                  elem[dataPriv.expando] = void 0;
                }
                if (elem[dataUser.expando]) {
                  elem[dataUser.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery.fn.extend({
          detach: function(selector) {
            return remove(this, selector, true);
          },
          remove: function(selector) {
            return remove(this, selector);
          },
          text: function(value) {
            return access(this, function(value2) {
              return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  this.textContent = value2;
                }
              });
            }, null, value, arguments.length);
          },
          append: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.appendChild(elem);
              }
            });
          },
          prepend: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.insertBefore(elem, target.firstChild);
              }
            });
          },
          before: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this);
              }
            });
          },
          after: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this.nextSibling);
              }
            });
          },
          empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.textContent = "";
              }
            }
            return this;
          },
          clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
              return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
          },
          html: function(value) {
            return access(this, function(value2) {
              var elem = this[0] || {}, i = 0, l = this.length;
              if (value2 === void 0 && elem.nodeType === 1) {
                return elem.innerHTML;
              }
              if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
                value2 = jQuery.htmlPrefilter(value2);
                try {
                  for (; i < l; i++) {
                    elem = this[i] || {};
                    if (elem.nodeType === 1) {
                      jQuery.cleanData(getAll(elem, false));
                      elem.innerHTML = value2;
                    }
                  }
                  elem = 0;
                } catch (e) {
                }
              }
              if (elem) {
                this.empty().append(value2);
              }
            }, null, value, arguments.length);
          },
          replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
              var parent = this.parentNode;
              if (jQuery.inArray(this, ignored) < 0) {
                jQuery.cleanData(getAll(this));
                if (parent) {
                  parent.replaceChild(elem, this);
                }
              }
            }, ignored);
          }
        });
        jQuery.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function(name, original) {
          jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
              elems = i === last ? this : this.clone(true);
              jQuery(insert[i])[original](elems);
              push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var rcustomProp = /^--/;
        var getStyles = function(elem) {
          var view = elem.ownerDocument.defaultView;
          if (!view || !view.opener) {
            view = window2;
          }
          return view.getComputedStyle(elem);
        };
        var swap = function(elem, options, callback) {
          var ret, name, old = {};
          for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
          }
          ret = callback.call(elem);
          for (name in options) {
            elem.style[name] = old[name];
          }
          return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function() {
          function computeStyleTests() {
            if (!div) {
              return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
            div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);
            var divStyle = window2.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div = null;
          }
          function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
          }
          var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
          if (!div.style) {
            return;
          }
          div.style.backgroundClip = "content-box";
          div.cloneNode(true).style.backgroundClip = "";
          support.clearCloneStyle = div.style.backgroundClip === "content-box";
          jQuery.extend(support, {
            boxSizingReliable: function() {
              computeStyleTests();
              return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
              computeStyleTests();
              return pixelBoxStylesVal;
            },
            pixelPosition: function() {
              computeStyleTests();
              return pixelPositionVal;
            },
            reliableMarginLeft: function() {
              computeStyleTests();
              return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
              computeStyleTests();
              return scrollboxSizeVal;
            },
            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            //
            // Support: Firefox 70+
            // Only Firefox includes border widths
            // in computed dimensions. (gh-4529)
            reliableTrDimensions: function() {
              var table, tr, trChild, trStyle;
              if (reliableTrDimensionsVal == null) {
                table = document2.createElement("table");
                tr = document2.createElement("tr");
                trChild = document2.createElement("div");
                table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                tr.style.cssText = "box-sizing:content-box;border:1px solid";
                tr.style.height = "1px";
                trChild.style.height = "9px";
                trChild.style.display = "block";
                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                trStyle = window2.getComputedStyle(tr);
                reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
                documentElement.removeChild(table);
              }
              return reliableTrDimensionsVal;
            }
          });
        })();
        function curCSS(elem, name, computed) {
          var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
          computed = computed || getStyles(elem);
          if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (isCustomProp && ret) {
              ret = ret.replace(rtrimCSS, "$1") || void 0;
            }
            if (ret === "" && !isAttached(elem)) {
              ret = jQuery.style(elem, name);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
              width = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          return ret !== void 0 ? (
            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + ""
          ) : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get: function() {
              if (conditionFn()) {
                delete this.get;
                return;
              }
              return (this.get = hookFn).apply(this, arguments);
            }
          };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
        function vendorPropName(name) {
          var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
          while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
              return name;
            }
          }
        }
        function finalPropName(name) {
          var final = jQuery.cssProps[name] || vendorProps[name];
          if (final) {
            return final;
          }
          if (name in emptyStyle) {
            return name;
          }
          return vendorProps[name] = vendorPropName(name) || name;
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
        function setPositiveNumber(_elem, value, subtract) {
          var matches = rcssNum.exec(value);
          return matches ? (
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
          ) : value;
        }
        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
          var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
          if (box === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i < 4; i += 2) {
            if (box === "margin") {
              marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
            }
            if (!isBorderBox) {
              delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              if (box !== "padding") {
                delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              } else {
                extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            } else {
              if (box === "content") {
                delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              }
              if (box !== "margin") {
                delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            }
          }
          if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(
              elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
              // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
              // Use an explicit zero to avoid NaN (gh-3964)
            )) || 0;
          }
          return delta + marginDelta;
        }
        function getWidthOrHeight(elem, dimension, extra) {
          var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
          if (rnumnonpx.test(val)) {
            if (!extra) {
              return val;
            }
            val = "auto";
          }
          if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Interestingly, in some cases IE 9 doesn't suffer from this issue.
          !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
          // This happens for inline elements with no explicit setting (gh-3571)
          val === "auto" || // Support: Android <=4.1 - 4.3 only
          // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
          !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
          elem.getClientRects().length) {
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
              val = elem[offsetProp];
            }
          }
          val = parseFloat(val) || 0;
          return val + boxModelAdjustment(
            elem,
            dimension,
            extra || (isBorderBox ? "border" : "content"),
            valueIsBorderBox,
            styles,
            // Provide the current computed size to request scroll gutter calculation (gh-3589)
            val
          ) + "px";
        }
        jQuery.extend({
          // Add in style property hooks for overriding the default
          // behavior of getting and setting a style property
          cssHooks: {
            opacity: {
              get: function(elem, computed) {
                if (computed) {
                  var ret = curCSS(elem, "opacity");
                  return ret === "" ? "1" : ret;
                }
              }
            }
          },
          // Don't automatically add "px" to these possibly-unitless properties
          cssNumber: {
            animationIterationCount: true,
            aspectRatio: true,
            borderImageSlice: true,
            columnCount: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            gridArea: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnStart: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowStart: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            scale: true,
            widows: true,
            zIndex: true,
            zoom: true,
            // SVG-related
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeMiterlimit: true,
            strokeOpacity: true
          },
          // Add in properties whose names you wish to fix before
          // setting or getting the value
          cssProps: {},
          // Get and set the style property on a DOM Node
          style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
              return;
            }
            var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== void 0) {
              type = typeof value;
              if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                value = adjustCSS(elem, name, ret);
                type = "number";
              }
              if (value == null || value !== value) {
                return;
              }
              if (type === "number" && !isCustomProp) {
                value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
              }
              if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                style[name] = "inherit";
              }
              if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
                if (isCustomProp) {
                  style.setProperty(name, value);
                } else {
                  style[name] = value;
                }
              }
            } else {
              if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
                return ret;
              }
              return style[name];
            }
          },
          css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
              val = hooks.get(elem, true, extra);
            }
            if (val === void 0) {
              val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
              val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
              num = parseFloat(val);
              return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
          }
        });
        jQuery.each(["height", "width"], function(_i, dimension) {
          jQuery.cssHooks[dimension] = {
            get: function(elem, computed, extra) {
              if (computed) {
                return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
                // Table columns in Safari have non-zero offsetWidth & zero
                // getBoundingClientRect().width unless display is changed.
                // Support: IE <=11 only
                // Running getBoundingClientRect on a disconnected node
                // in IE throws an error.
                (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                  return getWidthOrHeight(elem, dimension, extra);
                }) : getWidthOrHeight(elem, dimension, extra);
              }
            },
            set: function(elem, value, extra) {
              var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
                elem,
                dimension,
                extra,
                isBorderBox,
                styles
              ) : 0;
              if (isBorderBox && scrollboxSizeBuggy) {
                subtract -= Math.ceil(
                  elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
                );
              }
              if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                elem.style[dimension] = value;
                value = jQuery.css(elem, dimension);
              }
              return setPositiveNumber(elem, value, subtract);
            }
          };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(
          support.reliableMarginLeft,
          function(elem, computed) {
            if (computed) {
              return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
                return elem.getBoundingClientRect().left;
              })) + "px";
            }
          }
        );
        jQuery.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function(prefix, suffix) {
          jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
              var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
              for (; i < 4; i++) {
                expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
              }
              return expanded;
            }
          };
          if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
          }
        });
        jQuery.fn.extend({
          css: function(name, value) {
            return access(this, function(elem, name2, value2) {
              var styles, len, map = {}, i = 0;
              if (Array.isArray(name2)) {
                styles = getStyles(elem);
                len = name2.length;
                for (; i < len; i++) {
                  map[name2[i]] = jQuery.css(elem, name2[i], false, styles);
                }
                return map;
              }
              return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
            }, name, value, arguments.length > 1);
          }
        });
        function Tween(elem, options, prop, end, easing) {
          return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
          constructor: Tween,
          init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
          },
          cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
              this.pos = eased = jQuery.easing[this.easing](
                percent,
                this.options.duration * percent,
                0,
                1,
                this.options.duration
              );
            } else {
              this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
              this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
              hooks.set(this);
            } else {
              Tween.propHooks._default.set(this);
            }
            return this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default: {
            get: function(tween) {
              var result;
              if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                return tween.elem[tween.prop];
              }
              result = jQuery.css(tween.elem, tween.prop, "");
              return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
              if (jQuery.fx.step[tween.prop]) {
                jQuery.fx.step[tween.prop](tween);
              } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
              } else {
                tween.elem[tween.prop] = tween.now;
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery.easing = {
          linear: function(p) {
            return p;
          },
          swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
          },
          _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
          if (inProgress) {
            if (document2.hidden === false && window2.requestAnimationFrame) {
              window2.requestAnimationFrame(schedule);
            } else {
              window2.setTimeout(schedule, jQuery.fx.interval);
            }
            jQuery.fx.tick();
          }
        }
        function createFxNow() {
          window2.setTimeout(function() {
            fxNow = void 0;
          });
          return fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which, i = 0, attrs = { height: type };
          includeWidth = includeWidth ? 1 : 0;
          for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
          }
          if (includeWidth) {
            attrs.opacity = attrs.width = type;
          }
          return attrs;
        }
        function createTween(value, prop, animation) {
          var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
          for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
              return tween;
            }
          }
        }
        function defaultPrefilter(elem, props, opts) {
          var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
          if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
              hooks.unqueued = 0;
              oldfire = hooks.empty.fire;
              hooks.empty.fire = function() {
                if (!hooks.unqueued) {
                  oldfire();
                }
              };
            }
            hooks.unqueued++;
            anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery.queue(elem, "fx").length) {
                  hooks.empty.fire();
                }
              });
            });
          }
          for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
              delete props[prop];
              toggle = toggle || value === "toggle";
              if (value === (hidden ? "hide" : "show")) {
                if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                  hidden = true;
                } else {
                  continue;
                }
              }
              orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
          }
          propTween = !jQuery.isEmptyObject(props);
          if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
          }
          if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
              restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
              if (restoreDisplay) {
                display = restoreDisplay;
              } else {
                showHide([elem], true);
                restoreDisplay = elem.style.display || restoreDisplay;
                display = jQuery.css(elem, "display");
                showHide([elem]);
              }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
              if (jQuery.css(elem, "float") === "none") {
                if (!propTween) {
                  anim.done(function() {
                    style.display = restoreDisplay;
                  });
                  if (restoreDisplay == null) {
                    display = style.display;
                    restoreDisplay = display === "none" ? "" : display;
                  }
                }
                style.display = "inline-block";
              }
            }
          }
          if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
              style.overflow = opts.overflow[0];
              style.overflowX = opts.overflow[1];
              style.overflowY = opts.overflow[2];
            });
          }
          propTween = false;
          for (prop in orig) {
            if (!propTween) {
              if (dataShow) {
                if ("hidden" in dataShow) {
                  hidden = dataShow.hidden;
                }
              } else {
                dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
              }
              if (toggle) {
                dataShow.hidden = !hidden;
              }
              if (hidden) {
                showHide([elem], true);
              }
              anim.done(function() {
                if (!hidden) {
                  showHide([elem]);
                }
                dataPriv.remove(elem, "fxshow");
                for (prop in orig) {
                  jQuery.style(elem, prop, orig[prop]);
                }
              });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
              dataShow[prop] = propTween.start;
              if (hidden) {
                propTween.end = propTween.start;
                propTween.start = 0;
              }
            }
          }
        }
        function propFilter(props, specialEasing) {
          var index, name, easing, value, hooks;
          for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
              easing = value[1];
              value = props[index] = value[0];
            }
            if (index !== name) {
              props[name] = value;
              delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
              value = hooks.expand(value);
              delete props[name];
              for (index in value) {
                if (!(index in props)) {
                  props[index] = value[index];
                  specialEasing[index] = easing;
                }
              }
            } else {
              specialEasing[name] = easing;
            }
          }
        }
        function Animation(elem, properties, options) {
          var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
          }), tick = function() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length2) {
              return remaining;
            }
            if (!length2) {
              deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
          }, animation = deferred.promise({
            elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
              specialEasing: {},
              easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
              var tween = jQuery.Tween(
                elem,
                animation.opts,
                prop,
                end,
                animation.opts.specialEasing[prop] || animation.opts.easing
              );
              animation.tweens.push(tween);
              return tween;
            },
            stop: function(gotoEnd) {
              var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index2 < length2; index2++) {
                animation.tweens[index2].run(1);
              }
              if (gotoEnd) {
                deferred.notifyWith(elem, [animation, 1, 0]);
                deferred.resolveWith(elem, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem, [animation, gotoEnd]);
              }
              return this;
            }
          }), props = animation.props;
          propFilter(props, animation.opts.specialEasing);
          for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
              if (isFunction(result.stop)) {
                jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
              }
              return result;
            }
          }
          jQuery.map(props, createTween, animation);
          if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
          }
          animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
          jQuery.fx.timer(
            jQuery.extend(tick, {
              elem,
              anim: animation,
              queue: animation.opts.queue
            })
          );
          return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
          tweeners: {
            "*": [function(prop, value) {
              var tween = this.createTween(prop, value);
              adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
              return tween;
            }]
          },
          tweener: function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
              prop = props[index];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters: [defaultPrefilter],
          prefilter: function(callback, prepend) {
            if (prepend) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery.speed = function(speed, easing, fn) {
          var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
          };
          if (jQuery.fx.off) {
            opt.duration = 0;
          } else {
            if (typeof opt.duration !== "number") {
              if (opt.duration in jQuery.fx.speeds) {
                opt.duration = jQuery.fx.speeds[opt.duration];
              } else {
                opt.duration = jQuery.fx.speeds._default;
              }
            }
          }
          if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
          }
          opt.old = opt.complete;
          opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery.dequeue(this, opt.queue);
            }
          };
          return opt;
        };
        jQuery.fn.extend({
          fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
          },
          animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
              var anim = Animation(this, jQuery.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
              var stop = hooks.stop;
              delete hooks.stop;
              stop(gotoEnd);
            };
            if (typeof type !== "string") {
              gotoEnd = clearQueue;
              clearQueue = type;
              type = void 0;
            }
            if (clearQueue) {
              this.queue(type || "fx", []);
            }
            return this.each(function() {
              var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
              if (index) {
                if (data[index] && data[index].stop) {
                  stopQueue(data[index]);
                }
              } else {
                for (index in data) {
                  if (data[index] && data[index].stop && rrun.test(index)) {
                    stopQueue(data[index]);
                  }
                }
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                  timers[index].anim.stop(gotoEnd);
                  dequeue = false;
                  timers.splice(index, 1);
                }
              }
              if (dequeue || !gotoEnd) {
                jQuery.dequeue(this, type);
              }
            });
          },
          finish: function(type) {
            if (type !== false) {
              type = type || "fx";
            }
            return this.each(function() {
              var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
              data.finish = true;
              jQuery.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && timers[index].queue === type) {
                  timers[index].anim.stop(true);
                  timers.splice(index, 1);
                }
              }
              for (index = 0; index < length; index++) {
                if (queue[index] && queue[index].finish) {
                  queue[index].finish.call(this);
                }
              }
              delete data.finish;
            });
          }
        });
        jQuery.each(["toggle", "show", "hide"], function(_i, name) {
          var cssFn = jQuery.fn[name];
          jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
          };
        });
        jQuery.each({
          slideDown: genFx("show"),
          slideUp: genFx("hide"),
          slideToggle: genFx("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        }, function(name, props) {
          jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
          };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
          var timer, i = 0, timers = jQuery.timers;
          fxNow = Date.now();
          for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
              timers.splice(i--, 1);
            }
          }
          if (!timers.length) {
            jQuery.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery.fx.timer = function(timer) {
          jQuery.timers.push(timer);
          jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
          if (inProgress) {
            return;
          }
          inProgress = true;
          schedule();
        };
        jQuery.fx.stop = function() {
          inProgress = null;
        };
        jQuery.fx.speeds = {
          slow: 600,
          fast: 200,
          // Default speed
          _default: 400
        };
        jQuery.fn.delay = function(time, type) {
          time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
          type = type || "fx";
          return this.queue(type, function(next, hooks) {
            var timeout = window2.setTimeout(next, time);
            hooks.stop = function() {
              window2.clearTimeout(timeout);
            };
          });
        };
        (function() {
          var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
          input.type = "checkbox";
          support.checkOn = input.value !== "";
          support.optSelected = opt.selected;
          input = document2.createElement("input");
          input.value = "t";
          input.type = "radio";
          support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
          attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
          },
          removeAttr: function(name) {
            return this.each(function() {
              jQuery.removeAttr(this, name);
            });
          }
        });
        jQuery.extend({
          attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (typeof elem.getAttribute === "undefined") {
              return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
              hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
            }
            if (value !== void 0) {
              if (value === null) {
                jQuery.removeAttr(elem, name);
                return;
              }
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              elem.setAttribute(name, value + "");
              return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? void 0 : ret;
          },
          attrHooks: {
            type: {
              set: function(elem, value) {
                if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                  var val = elem.value;
                  elem.setAttribute("type", value);
                  if (val) {
                    elem.value = val;
                  }
                  return value;
                }
              }
            }
          },
          removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
              while (name = attrNames[i++]) {
                elem.removeAttribute(name);
              }
            }
          }
        });
        boolHook = {
          set: function(elem, value, name) {
            if (value === false) {
              jQuery.removeAttr(elem, name);
            } else {
              elem.setAttribute(name, name);
            }
            return name;
          }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
          var getter = attrHandle[name] || jQuery.find.attr;
          attrHandle[name] = function(elem, name2, isXML) {
            var ret, handle, lowercaseName = name2.toLowerCase();
            if (!isXML) {
              handle = attrHandle[lowercaseName];
              attrHandle[lowercaseName] = ret;
              ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
              attrHandle[lowercaseName] = handle;
            }
            return ret;
          };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
          prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
          },
          removeProp: function(name) {
            return this.each(function() {
              delete this[jQuery.propFix[name] || name];
            });
          }
        });
        jQuery.extend({
          prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
              name = jQuery.propFix[name] || name;
              hooks = jQuery.propHooks[name];
            }
            if (value !== void 0) {
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              return elem[name] = value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            return elem[name];
          },
          propHooks: {
            tabIndex: {
              get: function(elem) {
                var tabindex = jQuery.find.attr(elem, "tabindex");
                if (tabindex) {
                  return parseInt(tabindex, 10);
                }
                if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                  return 0;
                }
                return -1;
              }
            }
          },
          propFix: {
            "for": "htmlFor",
            "class": "className"
          }
        });
        if (!support.optSelected) {
          jQuery.propHooks.selected = {
            get: function(elem) {
              var parent = elem.parentNode;
              if (parent && parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
              return null;
            },
            set: function(elem) {
              var parent = elem.parentNode;
              if (parent) {
                parent.selectedIndex;
                if (parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery.each([
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ], function() {
          jQuery.propFix[this.toLowerCase()] = this;
        });
        function stripAndCollapse(value) {
          var tokens = value.match(rnothtmlwhite) || [];
          return tokens.join(" ");
        }
        function getClass(elem) {
          return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function classesToArray(value) {
          if (Array.isArray(value)) {
            return value;
          }
          if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
          }
          return [];
        }
        jQuery.fn.extend({
          addClass: function(value) {
            var classNames, cur, curValue, className, i, finalValue;
            if (isFunction(value)) {
              return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, getClass(this)));
              });
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    if (cur.indexOf(" " + className + " ") < 0) {
                      cur += className + " ";
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          removeClass: function(value) {
            var classNames, cur, curValue, className, i, finalValue;
            if (isFunction(value)) {
              return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    while (cur.indexOf(" " + className + " ") > -1) {
                      cur = cur.replace(" " + className + " ", " ");
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          toggleClass: function(value, stateVal) {
            var classNames, className, i, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
            if (isFunction(value)) {
              return this.each(function(i2) {
                jQuery(this).toggleClass(
                  value.call(this, i2, getClass(this), stateVal),
                  stateVal
                );
              });
            }
            if (typeof stateVal === "boolean" && isValidValue) {
              return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            classNames = classesToArray(value);
            return this.each(function() {
              if (isValidValue) {
                self = jQuery(this);
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (self.hasClass(className)) {
                    self.removeClass(className);
                  } else {
                    self.addClass(className);
                  }
                }
              } else if (value === void 0 || type === "boolean") {
                className = getClass(this);
                if (className) {
                  dataPriv.set(this, "__className__", className);
                }
                if (this.setAttribute) {
                  this.setAttribute(
                    "class",
                    className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                  );
                }
              }
            });
          },
          hasClass: function(selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while (elem = this[i++]) {
              if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
          val: function(value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            if (!arguments.length) {
              if (elem) {
                hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                  return ret;
                }
                ret = elem.value;
                if (typeof ret === "string") {
                  return ret.replace(rreturn, "");
                }
                return ret == null ? "" : ret;
              }
              return;
            }
            valueIsFunction = isFunction(value);
            return this.each(function(i) {
              var val;
              if (this.nodeType !== 1) {
                return;
              }
              if (valueIsFunction) {
                val = value.call(this, i, jQuery(this).val());
              } else {
                val = value;
              }
              if (val == null) {
                val = "";
              } else if (typeof val === "number") {
                val += "";
              } else if (Array.isArray(val)) {
                val = jQuery.map(val, function(value2) {
                  return value2 == null ? "" : value2 + "";
                });
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
                this.value = val;
              }
            });
          }
        });
        jQuery.extend({
          valHooks: {
            option: {
              get: function(elem) {
                var val = jQuery.find.attr(elem, "value");
                return val != null ? val : (
                  // Support: IE <=10 - 11 only
                  // option.text throws exceptions (trac-14686, trac-14858)
                  // Strip and collapse whitespace
                  // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                  stripAndCollapse(jQuery.text(elem))
                );
              }
            },
            select: {
              get: function(elem) {
                var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                if (index < 0) {
                  i = max;
                } else {
                  i = one ? index : 0;
                }
                for (; i < max; i++) {
                  option = options[i];
                  if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                  !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                    value = jQuery(option).val();
                    if (one) {
                      return value;
                    }
                    values.push(value);
                  }
                }
                return values;
              },
              set: function(elem, value) {
                var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                while (i--) {
                  option = options[i];
                  if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                    optionSet = true;
                  }
                }
                if (!optionSet) {
                  elem.selectedIndex = -1;
                }
                return values;
              }
            }
          }
        });
        jQuery.each(["radio", "checkbox"], function() {
          jQuery.valHooks[this] = {
            set: function(elem, value) {
              if (Array.isArray(value)) {
                return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
              return elem.getAttribute("value") === null ? "on" : elem.value;
            };
          }
        });
        var location = window2.location;
        var nonce = { guid: Date.now() };
        var rquery = /\?/;
        jQuery.parseXML = function(data) {
          var xml, parserErrorElem;
          if (!data || typeof data !== "string") {
            return null;
          }
          try {
            xml = new window2.DOMParser().parseFromString(data, "text/xml");
          } catch (e) {
          }
          parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
          if (!xml || parserErrorElem) {
            jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
              return el.textContent;
            }).join("\n") : data));
          }
          return xml;
        };
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
          e.stopPropagation();
        };
        jQuery.extend(jQuery.event, {
          trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp = elem = elem || document2;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
              return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
              return;
            }
            if (type.indexOf(".") > -1) {
              namespaces = type.split(".");
              type = namespaces.shift();
              namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = void 0;
            if (!event.target) {
              event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
              return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
              bubbleType = special.delegateType || type;
              if (!rfocusMorph.test(bubbleType + type)) {
                cur = cur.parentNode;
              }
              for (; cur; cur = cur.parentNode) {
                eventPath.push(cur);
                tmp = cur;
              }
              if (tmp === (elem.ownerDocument || document2)) {
                eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
              }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
              lastElement = cur;
              event.type = i > 1 ? bubbleType : special.bindType || type;
              handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
              if (handle) {
                handle.apply(cur, data);
              }
              handle = ontype && cur[ontype];
              if (handle && handle.apply && acceptData(cur)) {
                event.result = handle.apply(cur, data);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
              if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                  tmp = elem[ontype];
                  if (tmp) {
                    elem[ontype] = null;
                  }
                  jQuery.event.triggered = type;
                  if (event.isPropagationStopped()) {
                    lastElement.addEventListener(type, stopPropagationCallback);
                  }
                  elem[type]();
                  if (event.isPropagationStopped()) {
                    lastElement.removeEventListener(type, stopPropagationCallback);
                  }
                  jQuery.event.triggered = void 0;
                  if (tmp) {
                    elem[ontype] = tmp;
                  }
                }
              }
            }
            return event.result;
          },
          // Piggyback on a donor event to simulate a different one
          // Used only for `focus(in | out)` events
          simulate: function(type, elem, event) {
            var e = jQuery.extend(
              new jQuery.Event(),
              event,
              {
                type,
                isSimulated: true
              }
            );
            jQuery.event.trigger(e, null, elem);
          }
        });
        jQuery.fn.extend({
          trigger: function(type, data) {
            return this.each(function() {
              jQuery.event.trigger(type, data, this);
            });
          },
          triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
              return jQuery.event.trigger(type, data, elem, true);
            }
          }
        });
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
          var name;
          if (Array.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(
                  prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                  v,
                  traditional,
                  add
                );
              }
            });
          } else if (!traditional && toType(obj) === "object") {
            for (name in obj) {
              buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
          } else {
            add(prefix, obj);
          }
        }
        jQuery.param = function(a, traditional) {
          var prefix, s = [], add = function(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
          if (a == null) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
              add(this.name, this.value);
            });
          } else {
            for (prefix in a) {
              buildParams(prefix, a[prefix], traditional, add);
            }
          }
          return s.join("&");
        };
        jQuery.fn.extend({
          serialize: function() {
            return jQuery.param(this.serializeArray());
          },
          serializeArray: function() {
            return this.map(function() {
              var elements = jQuery.prop(this, "elements");
              return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
              var type = this.type;
              return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(_i, elem) {
              var val = jQuery(this).val();
              if (val == null) {
                return null;
              }
              if (Array.isArray(val)) {
                return jQuery.map(val, function(val2) {
                  return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
                });
              }
              return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
          }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
        originAnchor.href = location.href;
        function addToPrefiltersOrTransports(structure) {
          return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
              func = dataTypeExpression;
              dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) {
              while (dataType = dataTypes[i++]) {
                if (dataType[0] === "+") {
                  dataType = dataType.slice(1) || "*";
                  (structure[dataType] = structure[dataType] || []).unshift(func);
                } else {
                  (structure[dataType] = structure[dataType] || []).push(func);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          var inspected = {}, seekingTransport = structure === transports;
          function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                options.dataTypes.unshift(dataTypeOrTransport);
                inspect(dataTypeOrTransport);
                return false;
              } else if (seekingTransport) {
                return !(selected = dataTypeOrTransport);
              }
            });
            return selected;
          }
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
          var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
          for (key in src) {
            if (src[key] !== void 0) {
              (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
          }
          if (deep) {
            jQuery.extend(true, target, deep);
          }
          return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
          var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
          while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === void 0) {
              ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
          }
          if (ct) {
            for (type in contents) {
              if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
              }
            }
          }
          if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
          } else {
            for (type in responses) {
              if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                finalDataType = type;
                break;
              }
              if (!firstDataType) {
                firstDataType = type;
              }
            }
            finalDataType = finalDataType || firstDataType;
          }
          if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
              dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
          }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
          var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
          if (dataTypes[1]) {
            for (conv in s.converters) {
              converters[conv.toLowerCase()] = s.converters[conv];
            }
          }
          current = dataTypes.shift();
          while (current) {
            if (s.responseFields[current]) {
              jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
              response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
              if (current === "*") {
                current = prev;
              } else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) {
                  for (conv2 in converters) {
                    tmp = conv2.split(" ");
                    if (tmp[1] === current) {
                      conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                      if (conv) {
                        if (conv === true) {
                          conv = converters[conv2];
                        } else if (converters[conv2] !== true) {
                          current = tmp[0];
                          dataTypes.unshift(tmp[1]);
                        }
                        break;
                      }
                    }
                  }
                }
                if (conv !== true) {
                  if (conv && s.throws) {
                    response = conv(response);
                  } else {
                    try {
                      response = conv(response);
                    } catch (e) {
                      return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                      };
                    }
                  }
                }
              }
            }
          }
          return { state: "success", data: response };
        }
        jQuery.extend({
          // Counter for holding the number of active queries
          active: 0,
          // Last-Modified header cache for next request
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */
            accepts: {
              "*": allTypes,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
              // Convert anything to text
              "* text": String,
              // Text to html (true = no transformation)
              "text html": true,
              // Evaluate text as a json expression
              "text json": JSON.parse,
              // Parse text as xml
              "text xml": jQuery.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
              url: true,
              context: true
            }
          },
          // Creates a full fledged settings object into target
          // with both ajaxSettings and settings fields.
          // If target is omitted, writes into ajaxSettings.
          ajaxSetup: function(target, settings) {
            return settings ? (
              // Building a settings object
              ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
            ) : (
              // Extending ajaxSettings
              ajaxExtend(jQuery.ajaxSettings, target)
            );
          },
          ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
          ajaxTransport: addToPrefiltersOrTransports(transports),
          // Main method
          ajax: function(url, options) {
            if (typeof url === "object") {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
              readyState: 0,
              // Builds headers hashtable if needed
              getResponseHeader: function(key) {
                var match;
                if (completed2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              // Raw string
              getAllResponseHeaders: function() {
                return completed2 ? responseHeadersString : null;
              },
              // Caches the header
              setRequestHeader: function(name, value) {
                if (completed2 == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              // Overrides response content-type header
              overrideMimeType: function(type) {
                if (completed2 == null) {
                  s.mimeType = type;
                }
                return this;
              },
              // Status-dependent callbacks
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed2) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              // Cancel the request
              abort: function(statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
              urlAnchor = document2.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (e) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
              s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed2) {
              return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
              jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
              uncached = s.url.slice(cacheURL.length);
              if (s.data && (s.processData || typeof s.data === "string")) {
                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                delete s.data;
              }
              if (s.cache === false) {
                cacheURL = cacheURL.replace(rantiCache, "$1");
                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
              }
              s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
              s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
              if (jQuery.lastModified[cacheURL]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
              }
              if (jQuery.etag[cacheURL]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
              }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
              jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader(
              "Accept",
              s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
            );
            for (i in s.headers) {
              jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
              return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
              done(-1, "No Transport");
            } else {
              jqXHR.readyState = 1;
              if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
              }
              if (completed2) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                timeoutTimer = window2.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed2 = false;
                transport.send(requestHeaders, done);
              } catch (e) {
                if (completed2) {
                  throw e;
                }
                done(-1, e);
              }
            }
            function done(status, nativeStatusText, responses, headers) {
              var isSuccess, success, error, response, modified, statusText = nativeStatusText;
              if (completed2) {
                return;
              }
              completed2 = true;
              if (timeoutTimer) {
                window2.clearTimeout(timeoutTimer);
              }
              transport = void 0;
              responseHeadersString = headers || "";
              jqXHR.readyState = status > 0 ? 4 : 0;
              isSuccess = status >= 200 && status < 300 || status === 304;
              if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
              }
              if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
                s.converters["text script"] = function() {
                };
              }
              response = ajaxConvert(s, response, jqXHR, isSuccess);
              if (isSuccess) {
                if (s.ifModified) {
                  modified = jqXHR.getResponseHeader("Last-Modified");
                  if (modified) {
                    jQuery.lastModified[cacheURL] = modified;
                  }
                  modified = jqXHR.getResponseHeader("etag");
                  if (modified) {
                    jQuery.etag[cacheURL] = modified;
                  }
                }
                if (status === 204 || s.type === "HEAD") {
                  statusText = "nocontent";
                } else if (status === 304) {
                  statusText = "notmodified";
                } else {
                  statusText = response.state;
                  success = response.data;
                  error = response.error;
                  isSuccess = !error;
                }
              } else {
                error = statusText;
                if (status || !statusText) {
                  statusText = "error";
                  if (status < 0) {
                    status = 0;
                  }
                }
              }
              jqXHR.status = status;
              jqXHR.statusText = (nativeStatusText || statusText) + "";
              if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
              } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
              }
              jqXHR.statusCode(statusCode);
              statusCode = void 0;
              if (fireGlobals) {
                globalEventContext.trigger(
                  isSuccess ? "ajaxSuccess" : "ajaxError",
                  [jqXHR, s, isSuccess ? success : error]
                );
              }
              completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
              if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                if (!--jQuery.active) {
                  jQuery.event.trigger("ajaxStop");
                }
              }
            }
            return jqXHR;
          },
          getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
          },
          getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
          }
        });
        jQuery.each(["get", "post"], function(_i, method) {
          jQuery[method] = function(url, data, callback, type) {
            if (isFunction(data)) {
              type = type || callback;
              callback = data;
              data = void 0;
            }
            return jQuery.ajax(jQuery.extend({
              url,
              type: method,
              dataType: type,
              data,
              success: callback
            }, jQuery.isPlainObject(url) && url));
          };
        });
        jQuery.ajaxPrefilter(function(s) {
          var i;
          for (i in s.headers) {
            if (i.toLowerCase() === "content-type") {
              s.contentType = s.headers[i] || "";
            }
          }
        });
        jQuery._evalUrl = function(url, options, doc) {
          return jQuery.ajax({
            url,
            // Make this explicit, since user can override this through ajaxSetup (trac-11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            // Only evaluate the response if it is successful (gh-4126)
            // dataFilter is not invoked for failure responses, so using it instead
            // of the default converter is kludgy but it works.
            converters: {
              "text script": function() {
              }
            },
            dataFilter: function(response) {
              jQuery.globalEval(response, options, doc);
            }
          });
        };
        jQuery.fn.extend({
          wrapAll: function(html) {
            var wrap;
            if (this[0]) {
              if (isFunction(html)) {
                html = html.call(this[0]);
              }
              wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
              if (this[0].parentNode) {
                wrap.insertBefore(this[0]);
              }
              wrap.map(function() {
                var elem = this;
                while (elem.firstElementChild) {
                  elem = elem.firstElementChild;
                }
                return elem;
              }).append(this);
            }
            return this;
          },
          wrapInner: function(html) {
            if (isFunction(html)) {
              return this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
              });
            }
            return this.each(function() {
              var self = jQuery(this), contents = self.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                self.append(html);
              }
            });
          },
          wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i) {
              jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
          },
          unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
              jQuery(this).replaceWith(this.childNodes);
            });
            return this;
          }
        });
        jQuery.expr.pseudos.hidden = function(elem) {
          return !jQuery.expr.pseudos.visible(elem);
        };
        jQuery.expr.pseudos.visible = function(elem) {
          return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function() {
          try {
            return new window2.XMLHttpRequest();
          } catch (e) {
          }
        };
        var xhrSuccessStatus = {
          // File protocol always yields status code 0, assume 200
          0: 200,
          // Support: IE <=9 only
          // trac-1450: sometimes IE returns 1223 when it should be 204
          1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
          var callback, errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send: function(headers, complete) {
                var i, xhr = options.xhr();
                xhr.open(
                  options.type,
                  options.url,
                  options.async,
                  options.username,
                  options.password
                );
                if (options.xhrFields) {
                  for (i in options.xhrFields) {
                    xhr[i] = options.xhrFields[i];
                  }
                }
                if (options.mimeType && xhr.overrideMimeType) {
                  xhr.overrideMimeType(options.mimeType);
                }
                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }
                for (i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
                }
                callback = function(type) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if (type === "abort") {
                        xhr.abort();
                      } else if (type === "error") {
                        if (typeof xhr.status !== "number") {
                          complete(0, "error");
                        } else {
                          complete(
                            // File: protocol always yields status 0; see trac-8605, trac-14207
                            xhr.status,
                            xhr.statusText
                          );
                        }
                      } else {
                        complete(
                          xhrSuccessStatus[xhr.status] || xhr.status,
                          xhr.statusText,
                          // Support: IE <=9 only
                          // IE9 has no XHR2 but throws on binary (trac-11426)
                          // For XHR2 non-text, let the caller handle it (gh-2498)
                          (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                          xhr.getAllResponseHeaders()
                        );
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (xhr.onabort !== void 0) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                      window2.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                  if (callback) {
                    throw e;
                  }
                }
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery.ajaxPrefilter(function(s) {
          if (s.crossDomain) {
            s.contents.script = false;
          }
        });
        jQuery.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function(text) {
              jQuery.globalEval(text);
              return text;
            }
          }
        });
        jQuery.ajaxPrefilter("script", function(s) {
          if (s.cache === void 0) {
            s.cache = false;
          }
          if (s.crossDomain) {
            s.type = "GET";
          }
        });
        jQuery.ajaxTransport("script", function(s) {
          if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
              send: function(_, complete) {
                script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                  script.remove();
                  callback = null;
                  if (evt) {
                    complete(evt.type === "error" ? 404 : 200, evt.type);
                  }
                });
                document2.head.appendChild(script[0]);
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
            this[callback] = true;
            return callback;
          }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
          var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
          if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
              s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
              s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
              if (!responseContainer) {
                jQuery.error(callbackName + " was not called");
              }
              return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window2[callbackName];
            window2[callbackName] = function() {
              responseContainer = arguments;
            };
            jqXHR.always(function() {
              if (overwritten === void 0) {
                jQuery(window2).removeProp(callbackName);
              } else {
                window2[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            });
            return "script";
          }
        });
        support.createHTMLDocument = function() {
          var body = document2.implementation.createHTMLDocument("").body;
          body.innerHTML = "<form></form><form></form>";
          return body.childNodes.length === 2;
        }();
        jQuery.parseHTML = function(data, context, keepScripts) {
          if (typeof data !== "string") {
            return [];
          }
          if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
          }
          var base, parsed, scripts;
          if (!context) {
            if (support.createHTMLDocument) {
              context = document2.implementation.createHTMLDocument("");
              base = context.createElement("base");
              base.href = document2.location.href;
              context.head.appendChild(base);
            } else {
              context = document2;
            }
          }
          parsed = rsingleTag.exec(data);
          scripts = !keepScripts && [];
          if (parsed) {
            return [context.createElement(parsed[1])];
          }
          parsed = buildFragment([data], context, scripts);
          if (scripts && scripts.length) {
            jQuery(scripts).remove();
          }
          return jQuery.merge([], parsed.childNodes);
        };
        jQuery.fn.load = function(url, params, callback) {
          var selector, type, response, self = this, off = url.indexOf(" ");
          if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
          }
          if (isFunction(params)) {
            callback = params;
            params = void 0;
          } else if (params && typeof params === "object") {
            type = "POST";
          }
          if (self.length > 0) {
            jQuery.ajax({
              url,
              // If "type" variable is undefined, then "GET" method will be used.
              // Make value of this field explicit since
              // user can override it through ajaxSetup method
              type: type || "GET",
              dataType: "html",
              data: params
            }).done(function(responseText) {
              response = arguments;
              self.html(selector ? (
                // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
              ) : (
                // Otherwise use the full result
                responseText
              ));
            }).always(callback && function(jqXHR, status) {
              self.each(function() {
                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
              });
            });
          }
          return this;
        };
        jQuery.expr.pseudos.animated = function(elem) {
          return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
          }).length;
        };
        jQuery.offset = {
          setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
              elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
              curPosition = curElem.position();
              curTop = curPosition.top;
              curLeft = curPosition.left;
            } else {
              curTop = parseFloat(curCSSTop) || 0;
              curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(elem, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
              props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
              props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
              options.using.call(elem, props);
            } else {
              curElem.css(props);
            }
          }
        };
        jQuery.fn.extend({
          // offset() relates an element's border box to the document origin
          offset: function(options) {
            if (arguments.length) {
              return options === void 0 ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
              });
            }
            var rect, win, elem = this[0];
            if (!elem) {
              return;
            }
            if (!elem.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            };
          },
          // position() relates an element's margin box to its offset parent's padding box
          // This corresponds to the behavior of CSS absolute positioning
          position: function() {
            if (!this[0]) {
              return;
            }
            var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery.css(elem, "position") === "fixed") {
              offset = elem.getBoundingClientRect();
            } else {
              offset = this.offset();
              doc = elem.ownerDocument;
              offsetParent = elem.offsetParent || doc.documentElement;
              while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.parentNode;
              }
              if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                parentOffset = jQuery(offsetParent).offset();
                parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
              }
            }
            return {
              top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
              left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
          },
          // This method will return documentElement in the following cases:
          // 1) For the element inside the iframe without offsetParent, this method will return
          //    documentElement of the parent window
          // 2) For the hidden or detached element
          // 3) For body or html element, i.e. in case of the html node - it will return itself
          //
          // but those exceptions were never presented as a real life use-cases
          // and might be considered as more preferable results.
          //
          // This logic, however, is not guaranteed and can change at any point in the future
          offsetParent: function() {
            return this.map(function() {
              var offsetParent = this.offsetParent;
              while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || documentElement;
            });
          }
        });
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
          var top = "pageYOffset" === prop;
          jQuery.fn[method] = function(val) {
            return access(this, function(elem, method2, val2) {
              var win;
              if (isWindow(elem)) {
                win = elem;
              } else if (elem.nodeType === 9) {
                win = elem.defaultView;
              }
              if (val2 === void 0) {
                return win ? win[prop] : elem[method2];
              }
              if (win) {
                win.scrollTo(
                  !top ? val2 : win.pageXOffset,
                  top ? val2 : win.pageYOffset
                );
              } else {
                elem[method2] = val2;
              }
            }, method, val, arguments.length);
          };
        });
        jQuery.each(["top", "left"], function(_i, prop) {
          jQuery.cssHooks[prop] = addGetHookIf(
            support.pixelPosition,
            function(elem, computed) {
              if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
              }
            }
          );
        });
        jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
          jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
          }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
              var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
              return access(this, function(elem, type2, value2) {
                var doc;
                if (isWindow(elem)) {
                  return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                }
                if (elem.nodeType === 9) {
                  doc = elem.documentElement;
                  return Math.max(
                    elem.body["scroll" + name],
                    doc["scroll" + name],
                    elem.body["offset" + name],
                    doc["offset" + name],
                    doc["client" + name]
                  );
                }
                return value2 === void 0 ? (
                  // Get width or height on the element, requesting but not forcing parseFloat
                  jQuery.css(elem, type2, extra)
                ) : (
                  // Set width or height on the element
                  jQuery.style(elem, type2, value2, extra)
                );
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery.each([
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend"
        ], function(_i, type) {
          jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
          };
        });
        jQuery.fn.extend({
          bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
          },
          unbind: function(types, fn) {
            return this.off(types, null, fn);
          },
          delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
          },
          undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
          },
          hover: function(fnOver, fnOut) {
            return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
          }
        });
        jQuery.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
          function(_i, name) {
            jQuery.fn[name] = function(data, fn) {
              return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
            };
          }
        );
        var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        jQuery.proxy = function(fn, context) {
          var tmp, args, proxy;
          if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
          }
          if (!isFunction(fn)) {
            return void 0;
          }
          args = slice.call(arguments, 2);
          proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
          };
          proxy.guid = fn.guid = fn.guid || jQuery.guid++;
          return proxy;
        };
        jQuery.holdReady = function(hold) {
          if (hold) {
            jQuery.readyWait++;
          } else {
            jQuery.ready(true);
          }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = toType;
        jQuery.now = Date.now;
        jQuery.isNumeric = function(obj) {
          var type = jQuery.type(obj);
          return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
          // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
          // subtraction forces infinities to NaN
          !isNaN(obj - parseFloat(obj));
        };
        jQuery.trim = function(text) {
          return text == null ? "" : (text + "").replace(rtrim, "$1");
        };
        if (typeof define === "function" && define.amd) {
          define("jquery", [], function() {
            return jQuery;
          });
        }
        var _jQuery = window2.jQuery, _$ = window2.$;
        jQuery.noConflict = function(deep) {
          if (window2.$ === jQuery) {
            window2.$ = _$;
          }
          if (deep && window2.jQuery === jQuery) {
            window2.jQuery = _jQuery;
          }
          return jQuery;
        };
        if (typeof noGlobal === "undefined") {
          window2.jQuery = window2.$ = jQuery;
        }
        return jQuery;
      });
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      init_react_shim();
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m2 = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m2.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      init_react_shim();
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // src/log-in.jsx
  init_react_shim();
  var import_client = __toESM(require_client(), 1);

  // src/LogIn.jsx
  init_react_shim();
  var import_jquery5 = __toESM(require_jquery(), 1);

  // prime-src/prepare.js
  init_react_shim();
  var import_jquery = __toESM(require_jquery(), 1);
  var m = window.m = window.m || {};
  m.$window = (0, import_jquery.default)(window);
  m.$document = (0, import_jquery.default)(document);
  m.myCatList = [];
  m.catUriList = [];
  m.userRecos = {};
  m.recoDefs = {};
  m.timeout = {};
  m.maxShowReco = 20;
  m.fsTimezone = [];
  m.fsTimezone[0] = m.fsTimezone[1] = [];
  m.fsTimezone.catsSplit = [];
  m.fsTimezone[0].k = m.fsTimezone[1].k = -1;
  m.fsTimezone.fullList = [];
  m.fsGotoCats = [];
  m.fsGotoCats[0] = m.fsGotoCats[1] = [];
  m.fsGotoCats.catsSplit = [];
  m.fsGotoCats[0].k = m.fsGotoCats[1].k = -1;
  m.fsGotoCats.fullList = [];
  m.fsCat = [];
  m.fsCat[0] = m.fsCat[1] = [];
  m.fsCat.catsSplit = [];
  m.fsCat[0].k = m.fsCat[1].k = -1;
  m.fsCat.fullList = [];
  m.fsMRCat = [];
  m.fsMRCat[0] = m.fsMRCat[1] = [];
  m.fsMRCat.catsSplit = [];
  m.fsMRCat[0].k = m.fsMRCat[1].k = -1;
  m.fsMRCat.fullList = [];
  m.fsGo = [];
  m.fsGo[0] = m.fsGo[1] = [];
  m.fsGo.fullList = [];
  m.fsGo.shuffledOnce = false;
  m.fsToRs = [];
  m.fsToRs[0] = m.fsToRs[1] = [];
  m.fsToRs.fixed = false;
  m.fsToRs.lastIndex = -2;
  m.fsToRs.currentIndex = -1;
  m.fsToRs.fullList = [];
  m.fsToRs.shuffled = [];
  m.fsToRs.shuffledOnce = false;
  m.fsToRs.skip = false;
  m.fsToRs.oneLoop = false;
  m.fsToRs.loop = false;
  m.YtPlayer = null;
  m.YtAPILoaded = Boolean((0, import_jquery.default)("#youtube-API").length);
  m.neighbors = {};
  m.neighborsRecos = {};
  m.recoms = {};
  m.recomsSorted = {};
  m.recomsPlusRandomSorted = {};
  m.mdInPRL = false;
  m.mdInPRR = false;
  m.mdInPRL1 = false;
  m.mdInPRR1 = false;
  m.PRmax = 10;
  m.fullPts = 10;
  m.sW = screen.width;
  m.sH = screen.height;
  if (m.sW < m.sH) {
    m.sW = screen.height;
    m.sH = screen.width;
  }
  m.getSearchVars = function(searchStr) {
    let vars = [];
    if (searchStr !== null && searchStr !== void 0 && typeof searchStr === "string" && searchStr.length !== 0) {
      if (searchStr.startsWith("?")) {
        searchStr = searchStr.substring(1);
      }
      let j = searchStr.indexOf("#");
      if (j !== -1) {
        searchStr = searchStr.substring(0, j);
      }
      let splits = searchStr.replace(/&amp;/ig, "&").replace(/\+/g, "%20").split("&");
      for (let i = 0; i < splits.length; i++) {
        let key = splits[i];
        let val = "";
        let k = key.indexOf("=");
        if (k !== -1) {
          val = decodeURIComponent(key.substring(k + 1));
          key = key.substring(0, k);
        }
        key = decodeURIComponent(key);
        vars[i] = vars[key] = { key, val };
      }
    }
    return vars;
  };
  m.arrayToSearch = function(searchVars) {
    let res = "";
    for (let i = 0; i < searchVars.length; i++) {
      res += `&${encodeURIComponent(searchVars[i].key)}=${encodeURIComponent(searchVars[i].val)}`;
    }
    if (res.length > 1) {
      return `?${res.substring(1)}`;
    } else {
      return "";
    }
  };
  m.expire = 365 * 24 * 60 * 60;
  m.docCookies = {
    hasItem: function(sKey) {
      return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    getItem: function(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    removeItem: function(sKey, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      let sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    keys: function() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      return aKeys;
    }
  };
  m.localStorage = {
    setItem: function(key, val) {
      localStorage.setItem(key, val);
      return true;
    },
    getItem: function(key) {
      return localStorage.getItem(key);
    },
    removeItem: function(key) {
      localStorage.removeItem(key);
      return true;
    },
    clear: function() {
      localStorage.clear();
      return true;
    }
  };
  m.saveSSN = function() {
    if (m.docCookies.hasItem("salt")) {
      m.localStorage.setItem("salt", m.docCookies.getItem("salt"));
      m.docCookies.removeItem("salt", "/", "recoeve.net", true);
    }
    if (m.docCookies.hasItem("session")) {
      m.localStorage.setItem("session", m.docCookies.getItem("session"));
      m.docCookies.removeItem("session", "/", "recoeve.net", true);
    }
  };
  m.saveSSN();
  m.pathOfCat = function(cat, mode, lang, hashURI, args) {
    let argsSearch = "";
    if (args) {
      for (const prop in args) {
        if (prop !== "cat" && prop !== "lang") {
          argsSearch += `&${encodeURIComponent(prop)}=${encodeURIComponent(
            args[prop]
          )}`;
        }
      }
    }
    return `${m.userPath}${mode ? `/mode/${mode}` : ""}?${cat !== null && cat !== void 0 ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
  };
  m.pathOfNeighbor = function(user_id, cat, mode, lang, hashURI, args) {
    let argsSearch = "";
    if (args) {
      for (const prop in args) {
        if (prop !== "cat" && prop !== "lang") {
          argsSearch += `&${encodeURIComponent(prop)}=${encodeURIComponent(
            args[prop]
          )}`;
        }
      }
    }
    return `/user/${user_id}${mode ? `/mode/${mode}` : ""}?${cat !== null && cat !== void 0 ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
  };
  m.pathOfRecoStat = function(uri, lang, hash, args) {
    let argsSearch = "";
    if (args) {
      for (const prop in args) {
        argsSearch += `&${prop}=${encodeURIComponent(args[prop])}`;
      }
    }
    return `/recostat?uri=${encodeURIComponent(uri)}${argsSearch}${hash ? `#${encodeURIComponent(hash)}` : ""}`;
  };
  m.ptnURI = [];
  m.ptnURL = /https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
  m.ptnFILE = /file:\/\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
  m.ptnTag = /<\w+[\s\S]+>/ig;
  m.ptnVal = /^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/;
  m.decomposeURI = function(uri) {
    uri = String(uri);
    uri = uri.split(/\s\t\n/)[0];
    const res = { uri, uriHost: null, pathname: null, search: null, hash: null };
    if (uri.length > 4 && uri.substring(0, 4).toLowerCase() === "http") {
      let k = 4;
      if (uri.charAt(k) == "s" || uri.charAt(k) == "S") {
        k++;
      }
      if (uri.startsWith("://", k)) {
        k += 3;
        let l = uri.indexOf("/", k);
        if (l > 0) {
          res.uriHost = uri.substring(k, l);
          let m2 = uri.indexOf("?", l);
          if (m2 > 0) {
            res.pathname = uri.substring(l, m2);
            let n = uri.indexOf("#", m2);
            if (n > 0) {
              res.search = uri.substring(m2, n);
              res.hash = uri.substring(n);
            } else {
              res.search = uri.substring(m2);
              res.hash = "";
            }
          } else {
            res.search = "";
            let n = uri.indexOf("#", l);
            if (n > 0) {
              res.pathname = uri.substring(l, n);
              res.hash = uri.substring(n);
            } else {
              res.pathname = uri.substring(k);
              res.hash = "";
            }
          }
        } else {
          res.pathname = "";
          let m2 = uri.indexOf("?", k);
          if (m2 > 0) {
            res.uriHost = uri.substring(k, m2);
            let n = uri.indexOf("#", m2);
            if (n > 0) {
              res.search = uri.substring(m2, n);
              res.hash = uri.substring(n);
            } else {
              res.search = uri.substring(m2);
              res.hash = "";
            }
          } else {
            res.search = "";
            let n = uri.indexOf("#", k);
            if (n > 0) {
              res.uriHost = uri.substring(k, n);
              res.hash = uri.substring(n);
            } else {
              res.uriHost = uri.substring(k);
              res.hash = "";
            }
          }
        }
      }
    }
    if (res.uriHost) {
      res.uriHost = res.uriHost.toLowerCase();
    }
    return res;
  };
  m.pad = function(str, max) {
    str = str.toString();
    return str.length < max ? m.pad("0" + str, max) : str;
  };
  m.hash1 = function(str) {
    let h = -17 - str.length;
    for (let i = 0; i < str.length; i++) {
      h += str.charCodeAt(i);
      h += h << 10;
      h ^= h >>> 6;
    }
    h += (h >>> 0) % 1318489 << 7;
    h += h << 3;
    h ^= h >>> 11;
    h += h << 15;
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash2 = function(str) {
    let h = str.length + 1;
    let tmp;
    for (let i = 0; i < str.length; i++) {
      h += str.charCodeAt(i);
      tmp = str.charCodeAt(str.length - 1 - i) << 11 ^ h;
      h += h << 16 ^ tmp;
      h ^= h >>> 7;
      h += h << 11;
    }
    h += (h >>> 0) % 918679 << 11;
    h ^= h << 3;
    h += h >>> 5;
    h ^= h << 4;
    h += h >>> 17;
    h ^= h << 25;
    h += h >>> 6;
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash3 = function(str) {
    let h = -1023 + str.length;
    for (let i = 0; i < str.length; i++) {
      h ^= (h << 5) + (h >>> 2) + str.charCodeAt(i);
    }
    h ^= h << 15;
    h += h << 15;
    h += (h >>> 0) % 1299451 << 2;
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash4 = function(str) {
    let b = 378551;
    let a = 63689;
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      let q = 0;
      for (let j = 0; j < 32; j++) {
        if (a & 1 << j) {
          q = q + (h << j) >>> 0;
        }
      }
      h = q + str.charCodeAt(i) >>> 0;
      q = 0;
      for (let j = 0; j < 32; j++) {
        if (b & 1 << j) {
          q = q + (a << j) >>> 0;
        }
      }
      a = q;
    }
    return m.pad(h.toString(16), 8);
  };
  m.hash5 = function(str) {
    let h = 1315423911;
    for (let i = 0; i < str.length; i++) {
      h ^= (h << 5) + str.charCodeAt(i) + (h >> 2) >>> 0;
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash6 = function(str) {
    let h = 0;
    let x = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 4) + str.charCodeAt(i) >>> 0;
      if ((x = h & 4026531840) != 0) {
        h ^= x >> 24;
      }
      h &= ~x;
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash7 = function(str) {
    let a = 131;
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      let q = 0;
      for (let j = 0; j < 32; j++) {
        if (a & 1 << j) {
          q = q + (h << j) >>> 0;
        }
      }
      h = q + str.charCodeAt(i) >>> 0;
    }
    return m.pad(h.toString(16), 8);
  };
  m.hash8 = function(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = str.charCodeAt(i) + (h << 6) + (h << 16) - h >>> 0;
    }
    return m.pad(h.toString(16), 8);
  };
  m.hash9 = function(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) + h + str.charCodeAt(i) >>> 0;
    }
    return m.pad(h.toString(16), 8);
  };
  m.hash10 = function(str) {
    let h = str.length;
    for (let i = 0; i < str.length; i++) {
      h = h << 5 ^ h >> 27 ^ str.charCodeAt(i);
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash11 = function(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = h << 7 ^ str.charCodeAt(i);
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash12 = function(str) {
    let a = 2166136261;
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      let q = 0;
      for (let j = 0; j < 32; j++) {
        if (a & 1 << j) {
          q = q + (h << j) >>> 0;
        }
      }
      h = q >>> 0;
      h ^= str.charCodeAt(i);
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.hash13 = function(str) {
    let h = 2863311530;
    for (let i = 0; i < str.length; i++) {
      if ((i & 1) == 0) {
        h ^= h << 7 ^ str.charCodeAt(i) * (h >> 3);
      } else {
        h ^= ~((h << 11) + str.charCodeAt(i) ^ h >> 5);
      }
    }
    h = h >>> 0;
    return m.pad(h.toString(16), 8);
  };
  m.encrypt = function(salt, pwd, iter) {
    iter = pwd.length + 131 + (iter && iter.constructor == Number && iter >= 0 ? iter : 0);
    ;
    pwd = salt + pwd;
    let h1 = m.hash1(pwd);
    let h2 = m.hash2(pwd);
    let h3 = m.hash3(pwd);
    let h4 = m.hash4(pwd);
    let h5 = m.hash5(pwd);
    let h6 = m.hash6(pwd);
    let h7 = m.hash7(pwd);
    let h8 = m.hash8(pwd);
    let h9 = m.hash9(pwd);
    let h10 = m.hash10(pwd);
    let h11 = m.hash11(pwd);
    let h12 = m.hash12(pwd);
    let h13 = m.hash13(pwd);
    let tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
    for (let i = 0; i < iter; i++) {
      tmp1 = h13 + h12 + h11 + h10 + h9 + salt + h8 + h7 + h6 + h5 + h4 + h3 + h2 + h1;
      tmp2 = h1 + h3 + salt + h2;
      tmp3 = salt + h2 + h8 + h1 + h3;
      tmp4 = h7 + salt + h5;
      tmp5 = h4 + salt + h8;
      tmp6 = h10 + h13 + salt + h6;
      tmp7 = h6 + h1 + h9 + salt;
      tmp8 = h9 + salt + h10;
      tmp9 = h7 + salt + h12;
      tmp10 = h11 + salt + h5;
      tmp11 = h4 + salt + h13 + h2;
      tmp12 = h11 + salt + h6;
      tmp13 = h4 + h12 + salt + h8;
      h1 = m.hash1(tmp1);
      h2 = m.hash2(tmp2);
      h3 = m.hash3(tmp3);
      h4 = m.hash4(tmp4);
      h5 = m.hash5(tmp5);
      h6 = m.hash6(tmp6);
      h7 = m.hash7(tmp7);
      h8 = m.hash8(tmp8);
      h9 = m.hash9(tmp9);
      h10 = m.hash10(tmp10);
      h11 = m.hash11(tmp11);
      h12 = m.hash12(tmp12);
      h13 = m.hash13(tmp13);
    }
    return h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8 + h9 + h10 + h11 + h12 + h13;
  };
  m.iterFull = 1e4;
  m.iterSessionFull = 1e3;
  m.escapeHTML = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  m.escapeOnlyTag = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  m.unescapeHTML = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
  };
  m.escapeAMP = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/%/g, "%25").replace(/&/g, "%26").replace(/#/g, "%23");
  };
  m.unescapeAMP = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/%23/g, "#").replace(/%26/g, "&").replace(/%25/g, "%");
  };
  m.escapeEncodePctg = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/([\!\@\#\$\%\^\&\*\[\]\{\}_\<\>\(\)\,\.\/\?\~])/g, "\\$1");
  };
  m.unescapeEncodePctg = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    return str.replace(/\\([\!\@\#\$\%\^\&\*\[\]\{\}_\<\>\(\)\,\.\/\?\~])/g, "$1");
  };
  m.encloseStr = function(str) {
    if (!str || typeof str !== "string") {
      str = String(str);
    }
    if (str.charAt(0) === '"' || /[\n\t]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  m.strToJSON = function(str, colMap = true, rowMap = false) {
    return new Promise(function(resolve, reject) {
      if (!str || typeof str !== "string") {
        str = String(str);
      }
      if (str.charAt(str.length - 1) !== "\n") {
        str += "\n";
      }
      const ret = [];
      const delimiter = /([^\t\n]*)([\t\n])/g;
      const lastQuote = /[^"](?:"")*"([\t\n])/g;
      let exec;
      let start = 0;
      let row = -1, col = -1, delim = "\n";
      let strElem = "";
      function increaseRC(delim2) {
        if (delim2 === "	") {
          col++;
          return true;
        } else if (delim2 === "\n") {
          row++;
          col = 0;
          ret.push([]);
          return true;
        }
        return false;
      }
      while (start < str.length && increaseRC(delim)) {
        if (str.substring(start, start + 1) === '"') {
          lastQuote.lastIndex = start + 1;
          if ((exec = lastQuote.exec(str)) !== null) {
            strElem = str.substring(start + 1, lastQuote.lastIndex - 2);
            delim = exec[1];
            start = delimiter.lastIndex = lastQuote.lastIndex;
          } else {
            strElem = str.substring(start + 1);
            delim = "";
            start = str.length;
          }
          strElem = strElem.replace(/""/g, '"');
        } else {
          if ((exec = delimiter.exec(str)) !== null) {
            strElem = exec[1];
            delim = exec[2];
            start = delimiter.lastIndex;
          } else {
            strElem = str.substring(start);
            delim = "";
            start = str.length;
          }
        }
        ret[row][col] = strElem;
      }
      if (colMap) {
        const firstColSize = ret[0].length;
        for (let i = 0; i < ret.length; i++) {
          let jMax = ret[i].length > firstColSize ? firstColSize : ret[i].length;
          for (let j = 0; j < firstColSize; j++) {
            let key = ret[0][j];
            if (j < jMax) {
              ret[i][key] = ret[i][j];
            } else {
              ret[i][key] = "";
            }
          }
        }
      }
      if (rowMap) {
        for (let i = 0; i < ret.length; i++) {
          let key = ret[i][0];
          ret[key] = ret[i];
        }
      }
      resolve(ret);
    });
  };
  m.csvToJSON = function(str, colMap = true, rowMap = false) {
    return new Promise(function(resolve, reject) {
      if (!str || typeof str !== "string") {
        str = String(str);
      }
      let rows = str.split("\n");
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].substring(0, 1) === '"' && rows[i].substring(rows[i].length - 1) === '"') {
          rows[i] = rows[i].substring(1, rows[i].length - 1).split('","');
        } else {
          rows[i] = rows[i].split(",");
        }
      }
      if (colMap) {
        const firstColSize = rows[0].length;
        for (let i = 0; i < rows.length; i++) {
          let jMax = rows[i].length > firstColSize ? firstColSize : rows[i].length;
          for (let j = 0; j < jMax; j++) {
            let key = rows[0][j];
            if (key !== void 0) {
              rows[i][key] = rows[i][j];
            }
          }
        }
      }
      if (rowMap) {
        for (let i = 0; i < rows.length; i++) {
          let key = rows[i][0];
          if (key !== void 0) {
            rows[key] = rows[i];
          }
        }
      }
      resolve(rows);
    });
  };
  m.arrayToTableHTML = async function(txtArray, escapeTag = true, colgroup = []) {
    return new Promise((resolve, reject) => {
      if (!txtArray || txtArray.constructor !== Array) {
        return "";
      }
      let tableStr = `<table style="background:black; color:white; border:1px solid white; width:100%"><tbody>`;
      for (const widthPctg of colgroup) {
        tableStr += `<colgroup>${widthPctg ? `<col width="${widthPctg}%"/>` : `<col/>`}</colgroup>`;
      }
      for (let row = 0; row < txtArray.length; row++) {
        tableStr += "<tr>";
        for (let col = 0; col < txtArray[0].length; col++) {
          tableStr += `<td>${txtArray[row][col] ? (escapeTag ? m.escapeOnlyTag(txtArray[row][col]) : String(txtArray[row][col])).replace(/\n/g, "<br/>") : ""}</td>`;
        }
        tableStr += "</tr>";
      }
      tableStr += "</tbody></table>";
      resolve(tableStr);
    });
  };
  m.memoCalcCorrectRatio = function(str) {
    let totalCount = 0;
    let correctCount = 0;
    if (str && str?.length) {
      for (let i = 0; i < str.length; i++) {
        totalCount++;
        if (str.charAt(i) === "O") {
          correctCount++;
        }
      }
    }
    return totalCount === 0 ? 0 : correctCount / totalCount;
  };
  m.memoRGBColor = function(resultI) {
    let correctRatio = resultI.Correct / resultI.Try;
    let recentCorrectRatio = m.memoCalcCorrectRatio(resultI.Recentest);
    let r2 = parseInt(128 * (1 - correctRatio) + 127 * recentCorrectRatio);
    let g = parseInt(128 * correctRatio + 127 * recentCorrectRatio);
    let b = parseInt(127 * recentCorrectRatio);
    return `rgb(${r2},${g},${b})`;
  };
  m.memoArrayToTableHTML = function(txtArray, escapeTag = true) {
    if (!txtArray || txtArray.constructor !== Array) {
      return "";
    }
    let tableStr = `<table style="background:white; color:black; border:1px solid white; width:100%"><tbody>`;
    tableStr += `<colgroup><col width="5%"/></colgroup>
<colgroup><col width="15%"/></colgroup>
<colgroup><col width="55%"/></colgroup>
<colgroup><col width="5%"/></colgroup>
<colgroup><col width="5%"/></colgroup>
<colgroup><col width="15%" style="font-family:monospace"/></colgroup>`;
    tableStr += `<tr style="background:white">`;
    if (txtArray?.[0]?.length) {
      for (let col = 0; col < txtArray[0].length; col++) {
        tableStr += `<td>${(escapeTag ? m.escapeOnlyTag(txtArray[0][col]) : txtArray[0][col]).replace(/\n/g, "<br/>")}</td>`;
      }
    }
    tableStr += "</tr>";
    if (txtArray?.length) {
      for (let row = 1; row < txtArray.length; row++) {
        tableStr += `<tr style="background:${m.memoRGBColor(txtArray[row])}">`;
        if (txtArray?.[row]?.length) {
          for (let col = 0; col < txtArray[0].length; col++) {
            tableStr += `<td>${txtArray[row][txtArray[0][col]] || txtArray[row][txtArray[0][col]] === 0 ? (escapeTag ? m.escapeOnlyTag(txtArray[row][txtArray[0][col]]) : txtArray[row][txtArray[0][col]]).replace(/\n/g, "<br/>") : ""}</td>`;
          }
        }
        tableStr += "</tr>";
      }
    }
    tableStr += "</tbody></table>";
    return tableStr;
  };
  m.JSONtoStr = function(json) {
    return new Promise((resolve, reject) => {
      if (!json || json.constructor !== Array) {
        return "";
      }
      let res = m.encloseStr(json[0][0]);
      for (let j = 1; j < json[0].length; j++) {
        res += "	" + m.encloseStr(json[0][j]);
      }
      for (let i = 1; i < json.length; i++) {
        res += "\n" + m.encloseStr(json[i][json[0][0]]);
        let jMax = json[0].length;
        for (let j = 1; j < jMax; j++) {
          res += "	" + (json[i][json[0][j]] ? m.encloseStr(json[i][json[0][j]]) : "");
        }
      }
      resolve(res);
    });
  };
  m.JSONtoStrRev = function(json) {
    let res = m.encloseStr(json[0][0]);
    for (let j = 1; j < json[0].length; j++) {
      res += "	" + m.encloseStr(json[0][j]);
    }
    for (let i = json.length - 1; i > 0; i--) {
      res += "\n" + m.encloseStr(json[i][json[0][0]]);
      let jMax = json[0].length < json[i].length ? json[0].length : json[i].length;
      for (let j = 1; j < jMax; j++) {
        res += "	" + m.encloseStr(json[i][json[0][j]]);
      }
    }
    return Promise.resolve(res);
  };
  m.heapify = function(arr, key, sorted, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r2 = 2 * i + 2;
    if (l < n && arr[sorted[l]][key] > arr[sorted[largest]][key]) {
      largest = l;
    }
    if (r2 < n && arr[sorted[r2]][key] > arr[sorted[largest]][key]) {
      largest = r2;
    }
    if (largest != i) {
      let swap = sorted[i];
      sorted[i] = sorted[largest];
      sorted[largest] = swap;
      m.heapify(arr, key, sorted, n, largest);
    }
  };
  m.heapsort = function(arr, key, sorted, upto) {
    let n = sorted.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      m.heapify(arr, key, sorted, n, i);
    }
    upto = Number(upto);
    if (isNaN(upto)) {
      upto = n;
    } else {
      upto = upto > n ? n : upto;
    }
    let until = n - upto;
    for (let i = n - 1; i >= until; i--) {
      let temp = sorted[0];
      sorted[0] = sorted[i];
      sorted[i] = temp;
      m.heapify(arr, key, sorted, i, 0);
    }
    return until;
  };
  m.heapsortRest = function(arr, key, sorted, upto, n) {
    upto = upto > n ? n : upto;
    let until = n - upto;
    for (let i = n - 1; i >= until; i--) {
      let temp = sorted[0];
      sorted[0] = sorted[i];
      sorted[i] = temp;
      m.heapify(arr, key, sorted, i, 0);
    }
    return until;
  };
  m.a_log_in = function(e) {
    e.stopPropagation();
    e.preventDefault();
    let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
    let href = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
    m.$a_log_in.attr("href", href);
    if (e?.which === 2) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
    return false;
  };
  m.log_out_do = function(args, err) {
    if (err) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(err);
    }
    import_jquery.default.ajax({
      type: "POST",
      url: "/account/log-out.do",
      data: args,
      dataType: "text"
    }).fail(function(resp) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(`[--Log-out has failed.--] ${resp}<br/><a target="_blank" href="/account/log-out?goto=${args.goto}">Click me to [--Log-out from Recoeve.net--]</a>`);
    }).done(function(resp) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(resp);
      setTimeout(function() {
        window.location.href = args.href;
      }, m.wait);
    });
  };
  m.a_log_out = function(e) {
    e.stopPropagation();
    e.preventDefault();
    let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
    let href_log_out = `/account/log-out?goto=${encodeURIComponent(fullPath)}`;
    m.$a_log_out.attr("href", href_log_out);
    if (e?.which === 2) {
      window.open(href_log_out, "_blank");
    } else {
      m.$log_out_do_container.show();
      m.$log_out_do.html(`[--Log-out from Recoeve.net--]`);
      let href_log_in = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
      m.rmb_me(m.log_out_do, { href: href_log_in, goto: fullPath });
    }
    return false;
  };
  m.log_out_do_from_all = function(args, err) {
    if (err) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(err);
    }
    import_jquery.default.ajax({
      type: "POST",
      url: "/account/log-out-from-all.do",
      data: args,
      dataType: "text"
    }).fail(function(resp) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(`[--Log-out has failed.--] ${resp}<br/><a target="_blank" href="/account/log-out-from-all?goto=${args.goto}">Click me to [--Log-out at all devices from Recoeve.net--]</a>`);
    }).done(function(resp) {
      m.$log_out_do_container.show();
      m.$log_out_do.html(resp);
      setTimeout(function() {
        window.location.href = args.href;
      }, m.wait);
    });
  };
  m.a_log_out_from_all = function(e) {
    e.stopPropagation();
    e.preventDefault();
    let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
    let href_log_out_from_all = `/account/log-out-from-all?goto=${encodeURIComponent(fullPath)}`;
    m.$a_log_out_from_all.attr("href", href_log_out_from_all);
    if (e?.which === 2) {
      window.open(href_log_out_from_all, "_blank");
    } else {
      m.$log_out_do_container.show();
      m.$log_out_do.html(`[--Log-out at all devices from Recoeve.net--]`);
      let href_log_in = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
      m.rmb_me(m.log_out_do_from_all, { href: href_log_in, goto: fullPath });
    }
    return false;
  };
  m.a_to_my_page = function(e) {
    e.stopPropagation();
    e.preventDefault();
    let fullPath = m.pathOfNeighbor(m.myId, m.currentCat, m.recoMode, null, m.hashURI, m.args);
    m.$a_to_my_page.attr("href", fullPath);
    if (e?.which === 2) {
      window.open(fullPath, "_blank");
    } else {
      window.location.href = fullPath;
    }
    return false;
  };
  m.delayedLogOut = function(msg, delayTime = 27, $result) {
    let delay = delayTime && delayTime.constructor === Number ? delayTime : 27;
    clearInterval(m.setIntervalDeleyedLogOut);
    m.setIntervalDeleyedLogOut = setInterval(function() {
      m.$error.html(`${msg}<br/>[--You may be not logged-in: 0--]${encodeURIComponent(m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args))}[--You may be not logged-in: 1--] ${delay} [--You may be not logged-in: 2--] [--Or try again, or refresh the page and try again.--]`);
      $result?.html(m.$error.html());
      delay--;
    }, 1e3);
    clearTimeout(m.setTimeoutDeleyedLogOut);
    m.setTimeoutDeleyedLogOut = setTimeout(function() {
      window.location.href = `/account/log-out?goto=${encodeURIComponent(m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args))}`;
    }, delay * 1e3);
  };
  m.val = function(val) {
    let res = { valid: false, str: "", val: -1 };
    if (val === null || val === void 0) {
      return res;
    } else if (typeof val !== "string") {
      return res;
    }
    res.str = val;
    if (val.length === 0) {
      res.valid = true;
      res.val = -1;
    } else {
      let exec = m.ptnVal.exec(val);
      if (exec !== null) {
        res.numStr = exec[1];
        res.num = Number(exec[1]);
        res.divisorStr = exec[2];
        res.divisor = Number(exec[2]);
        res.valid = res.num >= 0 && res.num <= res.divisor;
        if (res.valid) {
          res.val = res.num / res.divisor;
        } else {
          res.val = -1;
        }
      }
    }
    return res;
  };
  {
    let r2 = 12;
    let r0 = 6;
    let pad = 1;
    let pad0 = 9;
    let thetas = [];
    let coss = [];
    let sins = [];
    for (let i = 0; i < 10; i++) {
      thetas.push(-Math.PI / 2 + 2 * Math.PI / 10 * i);
      coss.push(Math.cos(thetas[i]));
      sins.push(Math.sin(thetas[i]));
    }
    let str = `${pad0},0 `;
    let yc = pad + r2;
    let xc = pad0 + pad + r2;
    for (let k = 0; k < 5; k++, xc += 2 * r2 + pad) {
      str += `${xc},0 `;
      for (let i = 0; i < 10; i++) {
        let rp = i % 2 === 0 ? r2 : r0;
        str += `${(xc + rp * coss[i]).toFixed(1)},${(yc + rp * sins[i]).toFixed(1)} `;
      }
      str += `${xc},${pad} ${xc},0 `;
    }
    xc -= r2;
    yc += r2 * sins[4] + pad;
    str += `${xc},0 ${xc},${yc.toFixed(1)} ${pad0},${yc.toFixed(1)}`;
    m.starsWidth = xc - pad0 - 2;
    m.stars = function(val) {
      if (!val || typeof val !== "number" || isNaN(val)) {
        val = -1;
      }
      if (val < 0) {
        val = 0;
      } else if (val > 1) {
        val = 1;
      }
      return `<div class="stars-container" style="width:${xc + pad0}px; height:${yc.toFixed(1)}px"><div class="bar" style="left:${pad0 + 1}px; width:${(m.starsWidth * val).toFixed(1)}px"></div><svg class="out-stars"><polygon points="${str}"/></svg></div>`;
    };
  }
  m.recoDefs[""] = {
    uri: "",
    defTitles: [[""]],
    defCats: [[""]],
    defDescs: [[""]],
    defs: true,
    heads: [{ name: "default", text: "Empty URI." }],
    down: true
  };
  m.recoDefs[""].heads["default"] = m.recoDefs[""].heads[0];
  m.catsToString = function(cats) {
    if (cats === void 0 || cats === null) {
      return "[--Unknown--]";
    }
    return String(cats);
  };
  m.getDepthOfTabs = function(str) {
    let n = 0;
    while (n < str.length && str.charAt(n) === "	") {
      n++;
    }
    return n;
  };
  m.getSuperCat = function(cat) {
    if (cat && cat.constructor === String) {
      let i = cat.lastIndexOf("--");
      if (i !== -1) {
        return cat.substring(0, i);
      }
    }
    return null;
  };
  m.ExpCol = function(elem, catEC) {
    let $elem = (0, import_jquery.default)(elem);
    let $next = $elem.parent().next();
    if ($next.is(":visible")) {
      $next.hide();
      $elem.html("\u25B6");
      catEC.subCatExpanded = false;
    } else {
      $next.show();
      $elem.html("\u25BC");
      catEC.subCatExpanded = true;
    }
  };
  m.strCatListToJSON = function(strCatList, catList) {
    return new Promise(function(resolve, reject) {
      let list = strCatList.trim().split("\n");
      if (strCatList.length === 0) {
        list = [];
      }
      list.unshift("");
      if (!catList) {
        catList = m.catList;
      }
      catList.splice(0, catList.length);
      let superCats = [];
      if (strCatList.trim() === "") {
        catList[""] = catList[0] = { i: 0, cat: "", baseCat: "", depth: 0 };
      } else {
        for (let i = 0; i < list.length; i++) {
          let baseCat = list[i].trim();
          let depth = m.getDepthOfTabs(list[i]);
          superCats.splice(depth, superCats.length - depth, baseCat);
          let cat = superCats.join("--");
          catList[cat] = { i, cat, baseCat, depth };
          catList.push(catList[cat]);
        }
      }
      resolve();
    });
  };
  m.catsToA = function(cats) {
    if (!cats || cats.constructor !== String || cats.trim().length === 0) {
      return `<a class="move-cat${m.currentCat === "" ? ` currentCat` : ""}" onmouseup="m.triggerOpenCat(event)"><span class="list-index-id"></span>[--Uncategorized--]</a>`;
    }
    let arrayHTML = [];
    let list = cats.split(";");
    for (let i = 0; i < list.length; i++) {
      let cat = list[i];
      arrayHTML.push(
        `<a class="move-cat${m.currentCat === cat ? ` currentCat` : ""}" onmouseup="m.triggerOpenCat(event)"><span class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cat)}</a>`
      );
    }
    return arrayHTML.join(" ; ");
  };
  m.catList = m.myPage ? m.myCatList : [];
  m.myFSCatList = [];
  m.myRecos = m.myPage ? m.userRecos : {};
  m.myRecos[""] = { uri: "", has: true, down: true, title: "", cats: "", desc: "", cmt: "", val: m.val("10.0/10") };
  m.catListToHTML = function() {
    return new Promise(async function(resolve, reject) {
      let cL = m.catList;
      let cat = cL[0].cat;
      let catListHTML = `<div id="cat-" key="cat-" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:0em"><span key="EC-" class="noEC"></span><a key="baseCat-" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-" class="list-index-id"></span>[--Uncategorized--]</a></div>`;
      let i = 1;
      for (; i < cL.length - 1; i++) {
        cat = cL[i].cat;
        let beforeDepth = cL[i - 1].depth;
        let currentDepth = cL[i].depth;
        let afterDepth = cL[i + 1].depth;
        if (beforeDepth < currentDepth) {
          catListHTML += `<div key="subCat-${encodeURIComponent(cat)}" class="subCat" style="display:${cL[cat].subCatExpanded ? "block" : "none"}">`;
        } else {
          for (let j = currentDepth; j < beforeDepth; j++) {
            catListHTML += `</div>`;
          }
        }
        catListHTML += `<div id="cat-${encodeURIComponent(cat)}" key="cat-${encodeURIComponent(cat)}" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:${cL[i]?.depth}em">`;
        if (currentDepth < afterDepth) {
          catListHTML += `<span key="EC-${encodeURIComponent(cat)}" class="EC" onclick="m.ExpCol(this,m.catList['${cat}'])">${cL[i].subCatExpanded ? "\u25BC" : "\u25B6"}</span>`;
        } else {
          catListHTML += `<span key="EC-${encodeURIComponent(cat)}" class="noEC"></span>`;
        }
        catListHTML += `<a key="baseCat-${encodeURIComponent(cat)}" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-${encodeURIComponent(cat)}" class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cL[i].baseCat)}</a></div>`;
      }
      if (cL.length > 1) {
        cat = cL[i].cat;
        let beforeDepth = cL[i - 1].depth;
        let currentDepth = cL[i].depth;
        if (beforeDepth < currentDepth) {
          catListHTML += `<div key="subCat-${encodeURIComponent(cat)}" class="subCat" style="display:${cL[cat].subCatExpanded ? "block" : "none"}">`;
        } else {
          for (let j = currentDepth; j < beforeDepth; j++) {
            catListHTML += `</div>`;
          }
        }
        catListHTML += `<div id="cat-${encodeURIComponent(cat)}" key="cat-${encodeURIComponent(cat)}" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:${cL[i].depth}em"><span key="EC-${encodeURIComponent(cat)}" class="noEC"></span><a key="baseCat-${encodeURIComponent(cat)}" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-${encodeURIComponent(cat)}" class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cL[i].baseCat)}</a></div>`;
        for (let j = 0; j < currentDepth; j++) {
          catListHTML += `</div>`;
        }
      }
      m.$catList.html(catListHTML);
      resolve();
    });
  };
  m.$catList.on("mouseup.move-cat", (e) => {
    try {
      m.triggerOpenCat(e);
    } catch (err) {
      console.error(err);
    }
    return false;
  });
  m.getCatListChanged = function() {
    m.$change_catList_order_ok.hide();
    m.$change_catList_order_cancel.hide();
    let $cats = m.$catList.find(".cat").not(`#cat-`);
    $cats.removeClass("edit");
    $cats.find(".edit-bar").remove();
    let catListChanged = "\n";
    for (let i = 0; i < $cats.length; i++) {
      let cat = decodeURIComponent(m.unescapeEncodePctg($cats.eq(i).attr("id").substring(4)));
      for (let j = 0; j < m.catList[cat].depth; j++) {
        catListChanged += "	";
      }
      catListChanged += m.catList[cat].baseCat + "\n";
    }
    return catListChanged;
  };
  m.getConciseURI = function(uri) {
    return new Promise(function(resolve, reject) {
      import_jquery.default.ajax({
        type: "POST",
        url: "/reco/getConciseURI",
        data: uri.trim(),
        dataType: "text"
      }).fail(function(resp) {
        reject(resp);
      }).done(function(resp) {
        resolve(resp);
      });
    });
  };
  m.recoDowned = function(urisStr, recos) {
    let uris = urisStr.trim().split("\n");
    for (let k = 0; k < uris.length; k++) {
      let uri = uris[k];
      let r2 = recos[uri];
      if (!r2) {
        r2 = recos[uri] = { uri };
      }
      r2.down = true;
    }
  };
  m.recoToEve = function(resp, recos, cat) {
    return new Promise(async function(resolve, reject) {
      resp = resp.replace(/%2520/gi, "%20");
      try {
        resp = Object(await m.strToJSON(resp));
      } catch (err) {
        resp = [];
        console.error(err);
      }
      console.log(resp);
      for (let k = 1; k < resp.length; k++) {
        let respK = resp[k];
        let uri = respK.uri;
        let toDo = String(respK.do);
        let r2 = recos[uri];
        if (!r2) {
          r2 = recos[uri] = { uri };
        }
        r2.down = true;
        r2.has = true;
        for (let prop in respK) {
          if (isNaN(String(prop))) {
            prop = String(prop);
            r2[prop] = String(respK[prop]);
            if (prop === "has") {
              r2[prop] = Boolean(r2[prop]);
            }
          }
        }
        if (toDo === "delete") {
          r2.deleted = true;
        } else {
          r2.deleted = false;
        }
        r2.descR = m.renderStrDescCmt(r2.desc);
        r2.cmtR = m.renderStrDescCmt(r2.cmt);
        if (r2.val === void 0 || r2.val === null || typeof r2.val === "string") {
          r2.val = m.val(String(r2.val));
        }
      }
      let fs = m.fsGo;
      let fsFL = fs.fullList;
      if (recos === m.userRecos) {
        for (let k = 1; k < resp.length; k++) {
          let respK = resp[k];
          let uri = respK.uri;
          let r2 = recos[uri];
          let catsSplit = m.catsToString(m.formatCats(r2?.cats)).split(";");
          if (!fsFL[uri]) {
            fsFL[fsFL.length] = fsFL[uri] = { i: fsFL.length, catsSplit, uri, r: r2, catAndI: {}, txt: m.splitHangul(`${r2?.cats} :: ${r2?.title}`), html: m.escapeOnlyTag(r2?.title) };
          } else {
            fsFL[fsFL[uri].i] = fsFL[uri] = { ...fsFL[uri], catsSplit, uri, r: r2, txt: m.splitHangul(`${r2?.cats} :: ${r2?.title}`), html: m.escapeOnlyTag(r2?.title) };
            if (!fsFL[uri].catAndI) {
              fsFL[uri].catAndI = {};
            }
          }
        }
        m.beInCurrentCat = false;
        if (!cat && cat !== "") {
          let catsSplit = m.catsToString(r?.cats).split(";");
          for (let i = catsSplit.length - 1; i >= 0; i--) {
            let catI = catsSplit[i];
            if (catI === m.currentCat) {
              m.beInCurrentCat = true;
              break;
            }
          }
        }
        if (m.beInCurrentCat) {
          if (!m.catUriList[m.currentCat]?.has) {
            try {
              await m.getUriList("cat\n" + (m.currentCat === "" ? "	p" : m.currentCat));
            } catch (err) {
              console.error(err);
            }
          }
          for (let k = 1; k < resp.length; k++) {
            let respK = resp[k];
            let uri = respK.uri;
            fsFL[uri].catAndI[m.currentCat] = { cat: m.currentCat, i: m.catUriList[m.currentCat].uris[uri]?.i ?? m.catUriList[m.currentCat].uris.length };
          }
          fs.shuffledOnce = true;
          try {
            await m.reTriggerFS(fs);
          } catch (err) {
            console.error(err);
          }
        } else if (cat || cat === "") {
          if (!m.catUriList[cat]?.has) {
            try {
              await m.getUriList("cat\n" + (cat === "" ? "	p" : cat));
            } catch (err) {
              console.error(err);
            }
          }
          for (let k = 1; k < resp.length; k++) {
            let respK = resp[k];
            let uri = respK.uri;
            let r2 = recos[uri];
            fsFL[uri].catAndI[cat] = { cat, i: m.catUriList[cat].uris[uri]?.i ?? m.catUriList[cat].uris.length };
          }
          fs.shuffledOnce = true;
          try {
            await m.reTriggerFS(fs);
          } catch (err) {
            console.error(err);
          }
        }
        if (m.catUriList[cat]?.uris) {
          let uris = m.catUriList[cat].uris;
          for (let k = 0; k < uris.length; k++) {
            let uri = String(uris[k]);
            let r2 = recos[uri];
            if (!r2) {
              r2 = recos[uri] = { uri, down: true, has: false };
            }
            r2.i = k;
          }
        }
      }
      resolve();
    });
  };
  m.showReco = async function(r2) {
    if (r2.has) {
      if (r2.deleted) {
        m.$button_reco.show();
        m.$button_edit.hide();
        m.$button_del.hide();
        m.$button_back.show();
      } else {
        m.$button_reco.hide();
        m.$button_edit.show();
        m.$button_del.show();
        m.$button_back.show();
      }
    } else {
      m.$button_reco.show();
      m.$button_edit.hide();
      m.$button_del.hide();
      m.$button_back.hide();
    }
    if (r2.has) {
      let recoHTML = await m.recoHTML(r2, true, true);
      m.$my_reco.html(recoHTML);
      let $edit = m.$my_reco.find(".button.edit").remove();
    } else {
      m.$my_reco.html("");
    }
  };
  m.fillRecoInNewReco = function(r2, fillDefs) {
    if (r2.has) {
      m.$input_title.val(r2.title);
      m.$input_cats.val(r2.cats);
      m.$input_desc.val(r2.desc);
      m.$input_cmt.val(r2.cmt);
      m.$input_val.val(r2.val.str);
      m.$input_val.trigger("keyup.change-point");
    } else if (fillDefs) {
      let recoDef = m.recoDefs[r2?.uri];
      if (recoDef?.defTitles?.[0]?.[0]) {
        m.$input_title.val(recoDef.defTitles[0][0]);
      }
      if (recoDef?.defCats[0]?.[0]) {
        m.$input_cats.val(recoDef.defCats[0][0]);
      }
      if (recoDef?.defDescs[0]?.[0]) {
        m.$input_desc.val(recoDef.defDescs[0][0]);
      }
    }
    let uri = r2?.uri;
    let myR = m.myRecos[uri];
    if (!myR) {
      myR = m.myRecos[uri] = { uri };
    }
    if (myR.has) {
      if (myR.deleted) {
        m.$button_reco.show();
        m.$button_edit.hide();
        m.$button_del.hide();
        m.$button_back.show();
      } else {
        m.$button_reco.hide();
        m.$button_edit.show();
        m.$button_del.show();
        m.$button_back.show();
      }
    } else {
      m.$button_reco.show();
      m.$button_edit.hide();
      m.$button_del.hide();
      m.$button_back.hide();
    }
  };
  m.emptifyRecoInNewReco = function() {
    m.localStorage.clear();
    m.$input_uri.val("");
    m.formatURIAndGetAndShowDefsAndRecoInNewReco(true, false);
  };
  m.getFullURI = function(shortURI) {
    return new Promise(function(resolve, reject) {
      import_jquery.default.ajax({
        type: "POST",
        url: "/BlogStat/getFullURI",
        data: shortURI,
        dataType: "text"
      }).fail(function(resp) {
        reject(resp);
      }).done(function(resp) {
        resolve(resp);
      });
    });
  };
  m.processChunk = async function(chunk, recoDef) {
    const titles = await m.strToJSON(chunk.trim(), false, false);
    if (titles?.length && titles[0]?.[0] && titles[0]?.[1]) {
      for (let i = 0; i < titles.length; i++) {
        if (titles[i]?.[0]?.startsWith("Error:")) {
          console.log(titles[i][0]);
          if (titles[i][0].startsWith("Error: No valid session. Please try again.: ")) {
            try {
            } catch (err) {
              console.error(err);
            }
          }
          continue;
        }
        const headText = decodeURIComponent(titles[i]?.[1]?.trim().replace(/[\s\t\n\r]+/g, " "));
        recoDef.heads[String(titles[i][0])] = {
          name: String(titles[i][0]),
          text: headText
        };
        recoDef.heads.push(recoDef.heads[String(titles[i][0])]);
      }
      recoDef.heads = recoDef.heads.filter(
        (head, index, self) => index === self.findIndex((t) => t.text === head.text)
      );
    }
  };
  m.updateDefTitlesDOM = function(recoDef) {
    let defTitlesHTML = "";
    for (let head of recoDef.heads) {
      if (head.text && head.text !== "undefined") {
        defTitlesHTML += `<div class="def-title def-h1">${m.escapeOnlyTag(head.text)}</div>`;
      }
    }
    for (let i = 0; i < Math.min(7, recoDef.defTitles.length); i++) {
      let title = recoDef.defTitles[i][0].trim().replace(/[\s\t\n\r]+/g, " ");
      if (title.length && title != "undefined" && !recoDef.heads.some((head) => head.text === title)) {
        defTitlesHTML += `<div class="def-title">${m.escapeOnlyTag(title)}</div>`;
      }
    }
    m.$def_titles.html(defTitlesHTML);
    const $defTitles = m.$def_titles.find(".def-title");
    m.$def_titles.off("click.def").on("click.def", function(e) {
      $defTitles.removeClass("selected");
      const $target = (0, import_jquery.default)(e.target);
      if ($target.hasClass("def-title")) {
        $target.addClass("selected");
        m.$input_title.val(m.unescapeHTML($target.html()));
      }
    });
  };
  m.getH1 = function(uri) {
    return new Promise(function(resolve, reject) {
      if (m.recoDefs?.[uri]?.heads?.length) {
        m.updateDefTitlesDOM(m.recoDefs[uri]);
        resolve();
      } else {
        fetch("/reco/getH1", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: uri
        }).then(async (resp) => {
          const reader = resp.body.getReader();
          const textDecoder = new TextDecoder();
          const recoDef = m.recoDefs[uri];
          let allChunks = "";
          let processedTitlesCount = 0;
          while (true) {
            const { done, value } = await reader.read();
            const chunk = textDecoder.decode(value, { stream: true });
            allChunks += chunk;
            console.log("chunk:", chunk);
            await m.processChunk(chunk, recoDef);
            m.updateDefTitlesDOM(recoDef);
            if (done) {
              break;
            }
          }
          m.updateDefTitlesDOM(recoDef);
          resolve(allChunks);
        }).catch((err) => {
          console.error("Error in getH1:", err);
          reject(err);
        });
      }
    });
  };
  m.showDefs = function(uri) {
    return new Promise(async function(resolve, reject) {
      uri = String(uri).trim();
      let recoDef = m.recoDefs[uri];
      if (!recoDef) {
        recoDef = m.recoDefs[uri] = { uri, heads: [], defTitles: [[""]], defCats: [[""]], defDescs: [[""]], down: false };
      }
      try {
        m.getH1(uri);
      } catch (err) {
        console.error(err);
      }
      let defCats = m.recoDefs[uri].defCats;
      let defCatsHTML = `<div class="def-cat replace-cat">[--Indifferent--]</div> <div class="def-cat replace-cat">[--Later--]</div> <div class="def-cat replace-cat">[--Stashed--]</div> <div id="add-cat" class="def-cat add-txt">;</div> <div id="sub-cat" class="def-cat add-txt">--</div> <div id="delete-cat" class="def-cat delete-cat">[--Delete--]</div><br/>`;
      for (let i = 0; i < defCats.length; i++) {
        let cat = defCats[i][0].trim();
        if (cat.length !== 0) {
          defCatsHTML += `<div class="def-cat replace-cat">${m.escapeOnlyTag(cat)}</div> `;
        }
      }
      m.$def_cats.html(defCatsHTML);
      let $defCats = m.$def_cats.find(".def-cat");
      let $replaceCats = m.$def_cats.find(".replace-cat");
      $replaceCats.on("click", function(e) {
        let $this = (0, import_jquery.default)(this);
        let fs = m.fsCat;
        $defCats.removeClass("selected");
        $this.addClass("selected");
        let k = fs.k;
        fs.catsSplit[k] = m.unescapeHTML($this.html()).trim();
        fs.$fs.val(fs.catsSplit.join(";"));
        let sStart = 0;
        for (let i = 0; i < k; i++) {
          sStart += fs.catsSplit[i].length + 1;
        }
        let sEnd = sStart + fs.catsSplit[k].length;
        fs.$fs.focus();
        fs.$fs[0].setSelectionRange(sEnd, sEnd);
      });
      let $addTxts = m.$def_cats.find(".add-txt");
      $addTxts.on("click", function(e) {
        let $this = (0, import_jquery.default)(this);
        $defCats.removeClass("selected");
        $this.addClass("selected");
        let sStart = m.$input_cats[0].selectionStart;
        let sEnd = m.$input_cats[0].selectionEnd;
        let inputValue = m.$input_cats.val();
        let inserted = m.unescapeHTML($this.html());
        m.$input_cats.val(`${inputValue.substring(0, sStart)}${inserted}${inputValue.substring(sEnd)}`);
        let l = m.$input_cats.val().length;
        m.$input_cats.focus();
        sEnd = sStart + inserted.length;
        m.$input_cats[0].setSelectionRange(sEnd, sEnd);
        m.$input_cats.trigger("keyup.fs");
      });
      let $deleteCat = m.$def_cats.find(".delete-cat");
      $deleteCat.on("click", function(e) {
        let $this = (0, import_jquery.default)(this);
        let fs = m.fsCat;
        $defCats.removeClass("selected");
        $this.addClass("selected");
        let k = fs.k;
        fs.catsSplit.splice(k, 1);
        fs.$fs.val(fs.catsSplit.join(";"));
        let sStart = 0;
        for (let i = 0; i < k; i++) {
          sStart += fs.catsSplit[i].length + 1;
        }
        let sEnd = fs.catsSplit.length === k ? sStart - 1 : sStart;
        fs.$fs.focus();
        fs.$fs[0].setSelectionRange(sEnd, sEnd);
        m.$input_cats.trigger("keyup.fs");
      });
      let defDescs = m.recoDefs[uri].defDescs;
      let defDescsHTML = "";
      for (let i = 0; i < defDescs.length; i++) {
        let desc = defDescs[i][0].trim();
        if (desc.length !== 0) {
          if (desc.length <= 100) {
            defDescsHTML += `<div class="def-desc">${m.escapeOnlyTag(desc)}<data class="none">${m.escapeOnlyTag(desc)}</data></div>`;
          } else {
            defDescsHTML += `<div class="def-desc">${m.escapeOnlyTag(desc.substring(0, 50))} ... ${m.escapeOnlyTag(desc.substring(desc.length - 50))}<data class="none">${m.escapeOnlyTag(desc)}</data></div>`;
          }
        }
      }
      m.$def_descs.html(defDescsHTML);
      let $defDesc = m.$def_descs.find(".def-desc");
      $defDesc.on("click", function(e) {
        $defDesc.removeClass("selected");
        let $this = (0, import_jquery.default)(this);
        $this.addClass("selected");
        m.$input_desc.val(m.unescapeHTML($this.find("data.none").html()));
      });
      resolve();
    });
  };
  m.getAndFillRecoInNewReco = function(r2, fillDefs) {
    return new Promise(function(resolve, reject) {
      if (r2.down) {
        m.fillRecoInNewReco(r2, fillDefs);
        resolve();
      } else {
        let getRecosStr = "uri\n" + m.encloseStr(r2.uri);
        if (m.myIndex) {
          import_jquery.default.ajax({
            type: "POST",
            url: `/user/${m.myId}/get-Recos`,
            data: getRecosStr.replace(/%20/gi, "%2520"),
            dataType: "text"
          }).done(async function(resp) {
            m.recoDowned(r2.uri, m.myRecos);
            await m.recoToEve(resp, m.myRecos, m.currentCat);
            m.fillRecoInNewReco(r2, fillDefs);
            resolve();
          });
        } else {
          resolve();
        }
      }
    });
  };
  m.getAndShowDefsInNewReco = function(r2) {
    return new Promise(function(resolve, reject) {
      let uri = r2.uri;
      if (m.recoDefs[uri]?.down) {
        m.showDefs(uri);
        resolve();
      } else {
        m.showDefs("");
        import_jquery.default.ajax({
          type: "POST",
          url: "/reco/defs",
          data: uri,
          dataType: "text"
        }).done(async function(resp) {
          let defs = Object(await m.strToJSON(resp));
          let recoDefs = m.recoDefs[uri];
          if (!recoDefs) {
            recoDefs = m.recoDefs[uri] = { uri, heads: [], down: false };
          }
          recoDefs.down = true;
          if (defs[1]) {
            recoDefs.defCats = Object(await m.strToJSON(defs[1]["def-cats"], false));
            recoDefs.defTitles = Object(await m.strToJSON(defs[1]["def-titles"], false));
            recoDefs.defDescs = Object(await m.strToJSON(defs[1]["def-descs"], false));
            m.showDefs(uri);
          }
          resolve();
        });
      }
    });
  };
  m.formatNOfPoints = function(n) {
    if (n < 1e3) {
      return "" + n;
    } else if (n < 1e6) {
      return (n / 1e3).toFixed(2) + "K";
    } else if (n < 1e9) {
      return (n / 1e6).toFixed(2) + "M";
    } else if (n < 1e12) {
      return (n / 1e9).toFixed(2) + "B";
    }
  };
  m.formatURIFully = function(uri, uriRendered, keepOriginal) {
    return new Promise(async function(resolve, reject) {
      if (!uri || typeof uri !== "string" || !uri.length) {
        resolve("");
      }
      if (keepOriginal) {
        m.uri = uri;
      }
      uri = await m.formatURI(uri, keepOriginal);
      if (!uriRendered) {
        uriRendered = await uriRendering(uri, true);
      }
      let from = uriRendered?.from;
      m.lastURI = uri = uriRendered?.uri;
      console.log("uriRendered: ", uriRendered);
      switch (from) {
        case "youtube":
          uri = `https://www.youtube.com/watch?v=${uriRendered.videoId}`;
          break;
        case "youtube-list":
          uri = `https://www.youtube.com/watch?list=${uriRendered.list}`;
          break;
        case "instagram":
          uri = `https://www.instagram.com/p/${uriRendered.imgId}/`;
          break;
        case "tiktok":
          uri = `https://www.tiktok.com/@${uriRendered.userId}/video/${uriRendered.videoId}`;
          break;
        case "weverse":
          uri = `https://weverse.io/${uriRendered.singer}/artist/${uriRendered.videoId}`;
          break;
        case "naver":
          uri = `https://tv.naver.com/v/${uriRendered.videoId}`;
          break;
        case "vlive":
          uri = `https://www.vlive.tv/video/${uriRendered.videoId}`;
          break;
        case "kakao":
          uri = `https://tv.kakao.com/v/${uriRendered.videoId}`;
          break;
        case "ted":
          uri = `https://www.ted.com/talks/${uriRendered.videoId}`;
          break;
        case "dailymotion":
          uri = `https://www.dailymotion.com/video/${uriRendered.videoId}`;
          break;
        case "sogirl":
        case "topgirl":
          uri = uriRendered.newURI;
          break;
      }
      if (!keepOriginal && m.getUTF8Length(uri) > 255) {
        try {
          uri = await m.getConciseURI(uri);
          m.$input_uri.val(uri);
          resolve(uri);
        } catch (err) {
          console.error(err);
        }
      } else if (keepOriginal) {
        m.$input_uri.val(m.uri);
        resolve(m.uri);
      } else {
        m.$input_uri.val(uri);
        resolve(uri);
      }
    });
  };
  m.formatURIAndGetAndShowDefsAndRecoInNewReco = function(noFormatURI, fillDefs, keepOriginal) {
    return new Promise(async function(resolve, reject) {
      let uriRendered = await uriRendering(m.$input_uri.val(), true);
      let originalURI = await m.formatURIFully(m.$input_uri.val(), uriRendered, keepOriginal);
      let uri = noFormatURI ? originalURI : await m.formatURIFully(originalURI, uriRendered, keepOriginal);
      m.$show_URI.html(uriRendered.html.replace(/\sdelayed-src=/gi, " src="));
      let r2 = m.myRecos[uri];
      if (!r2) {
        r2 = m.myRecos[uri] = { uri };
        if (m.myIndex) {
          await m.getRecos([uri], m.myRecos);
        }
      }
      if (!(r2 && r2.has)) {
        r2 = m.userRecos[uri];
        if (!r2) {
          r2 = m.userRecos[uri] = { uri };
          if (m.userIndex) {
            await m.getRecos([uri], m.userRecos);
          }
        }
      }
      await m.getAndFillRecoInNewReco(r2, fillDefs);
      await m.getAndShowDefsInNewReco(r2);
      await m.reNewAndReOn();
      if (originalURI !== uri) {
        let desc = m.$input_desc.val();
        let descR = m.renderStrDescCmt(desc);
        if (descR["#originaluri"]) {
          descR["#originaluri"].key = "#originalURI";
          descR["#originaluri"].val = `
${originalURI}
`;
        } else {
          descR["#originaluri"] = { key: "#originalURI", val: `
${originalURI}
` };
          descR.splice(0, 0, descR["#originaluri"]);
          for (let i = 0; i < descR.length; i++) {
            descR[i].i = i;
          }
        }
        m.$input_desc.val(m.descCmtRToString(descR));
      }
      if (uriRendered.uriHash) {
        let desc = m.$input_desc.val();
        let descR = m.renderStrDescCmt(desc);
        if (descR["#uriwithhash"]) {
          descR["#uriwithhash"].key = "#URIwithHash";
          descR["#uriwithhash"].val += `
${originalURI + uriRendered.uriHash}
`;
        } else {
          descR["#uriwithhash"] = { key: "#URIwithHash", val: `
${originalURI + uriRendered.uriHash}
` };
          descR.splice(0, 0, descR["#uriwithhash"]);
          for (let i = 0; i < descR.length; i++) {
            descR[i].i = i;
          }
        }
        m.$input_desc.val(m.descCmtRToString(descR));
      }
      m.lastURI = uri;
      resolve();
    });
  };
  m.logPrint = function(html) {
    try {
      m.$logs.append(html);
      m.$logs.scrollTop(m.$logs[0].scrollHeight);
    } catch (err) {
      console.error(err);
    }
  };
  m.delayPad = m.delayPad || 512;
  m.wait = m.wait || 1024;
  m.$delayedElems = (0, import_jquery.default)("#nothing");
  m.previous = Date.now();
  import_jquery.default.fn.inView = function() {
    if (this.is(":visible")) {
      let viewportHeight = window.innerHeight;
      let scrollTop = m.$window.scrollTop();
      let elemTop = this.offset().top - m.delayPad;
      let elemBottom = elemTop + this.height() + m.delayPad;
      return scrollTop + viewportHeight > elemTop && scrollTop < elemBottom;
    } else {
      return false;
    }
  };
  import_jquery.default.fn.delayedLoad = function() {
    let done = false;
    if (this.inView()) {
      if (this.hasClass("to-be-executed")) {
        this.removeClass("to-be-executed");
        this.trigger("click");
        done = true;
      }
      if (this.attr("delayed-bgimage")) {
        this.css("background-image", "url(" + this.attr("delayed-bgimage") + ")");
        this.removeAttr("delayed-bgimage");
        done = true;
      }
      if (this.attr("delayed-src")) {
        this.attr("src", this.attr("delayed-src"));
        this.removeAttr("delayed-src");
        done = true;
      }
    }
    return done;
  };
  m.delayedLoadAll = function() {
    return new Promise(async function(resolve, reject) {
      if (m.$delayedElems.length > 0) {
        m.$delayedElems.each(function() {
          if ((0, import_jquery.default)(this).delayedLoad()) {
            m.$delayedElems = m.$delayedElems.not(this);
            m.logPrint(`<br/><span class="emph">${this} at vertical position of ${(100 * (0, import_jquery.default)(this).offset().top / m.$document.height()).toPrecision(3)}% of document is delayed-loaded.</span><br/>${m.$delayedElems.length} of $delayedElems are remained.<br/>`);
          }
        });
        m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
      } else {
        m.logPrint(`<br/><br/>All delayedElem are loaded.`);
        m.$window.off("scroll.delayedLoad");
      }
      m.previous = Date.now();
      resolve();
    });
  };
  m.delayedLoadByScroll = function() {
    return new Promise(async function(resolve, reject) {
      m.$window.off("scroll.delayedLoad");
      let now = Date.now();
      let passed = now - m.previous;
      if (passed > m.wait) {
        await m.delayedLoadAll();
        resolve();
      } else {
        clearTimeout(m.setTimeoutDelayedLoad);
        m.setTimeoutDelayedLoad = setTimeout(async function() {
          await m.delayedLoadAll();
          resolve();
        }, m.wait * 1.5 - passed);
      }
    });
  };
  m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
  m.str_rmb_me = `log	sW	sH
web	${m.sW}	${m.sH}`;
  m.rmb_me = function(callback, args, saveNewRecoInputs) {
    return new Promise(async function(resolve, reject) {
      let uri = await m.formatURIFully(m.$input_uri.val());
      if (saveNewRecoInputs) {
        m.localStorage.setItem("uri", uri);
        m.localStorage.setItem("title", m.formatTitle(m.$input_title.val().trim()));
        m.localStorage.setItem("cats", m.formatCats(m.$input_cats.val().trim()));
        m.localStorage.setItem("desc", m.$input_desc.val().trim());
        m.localStorage.setItem("cmt", m.$input_cmt.val().trim());
        m.localStorage.setItem("points", m.$input_val.val().trim());
      }
      const SSNencrypt = function(callback2, args2) {
        return new Promise(async (resolve2, reject2) => {
          import_jquery.default.ajax({
            type: "GET",
            url: "/sessionIter",
            dataType: "text"
          }).done(async function(resp) {
            console.log("sessionIter: ", resp);
            let iter = Number(resp);
            if (isNaN(iter)) {
              try {
                await callback2(args2, resp);
              } catch (err) {
                console.error(err);
              }
              m.docCookies.removeItem("tCreate");
              m.localStorage.removeItem("session");
              m.localStorage.removeItem("salt");
              if (m.docCookies.hasItem("rmbdI")) {
                import_jquery.default.ajax({
                  type: "POST",
                  url: "/account/log-in/remember-me.do",
                  data: m.str_rmb_me,
                  dataType: "text"
                }).done(function(resp2) {
                  console.log("rmb_do : " + resp2);
                  setTimeout(async function() {
                    console.log(`${resp2}, tCreate:${m.docCookies.hasItem("tCreate")}`);
                    if (resp2.startsWith("Rmbd") && m.docCookies.hasItem("tCreate")) {
                      m.saveSSN();
                      if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
                        await SSNencrypt(callback2, args2);
                      } else {
                        try {
                          await callback2(args2, resp2);
                        } catch (err) {
                          console.error(err);
                        }
                      }
                      resolve2();
                    } else {
                      try {
                        await callback2(args2, resp2);
                      } catch (err) {
                        console.error(err);
                      }
                      resolve2();
                    }
                  }, m.wait);
                });
              } else {
                try {
                  await callback2(args2, "Error: No rmbdI cookie.");
                } catch (err) {
                  console.error(err);
                }
                resolve2();
              }
            } else {
              m.docCookies.setItem(
                "SSN",
                m.encrypt(m.localStorage.getItem("salt"), m.localStorage.getItem("session").substring(3, 11), Number(iter)),
                3,
                "/",
                false,
                true
              );
              try {
                await callback2(args2, null);
              } catch (err) {
                console.error(err);
              }
              resolve2();
            }
          });
        });
      };
      if (m.docCookies.hasItem("tCreate")) {
        if (m.docCookies.hasItem("salt") || m.docCookies.hasItem("session")) {
          m.saveSSN();
        }
        if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
          SSNencrypt(callback, args);
          return;
        }
      }
      if (m.docCookies.hasItem("rmbdI")) {
        import_jquery.default.ajax({
          type: "POST",
          url: "/account/log-in/remember-me.do",
          data: m.str_rmb_me,
          dataType: "text"
        }).done(function(resp) {
          console.log("rmb_do : " + resp);
          setTimeout(function() {
            console.log(`${resp}, tCreate:${m.docCookies.hasItem("tCreate")}`);
            if (resp.startsWith("Rmbd") && m.docCookies.hasItem("tCreate")) {
              m.saveSSN();
              if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
                SSNencrypt(callback, args);
              } else {
                callback(args, resp);
                resolve();
              }
            } else {
              callback(args, resp);
              resolve();
            }
          }, m.wait);
        });
      } else {
        callback(args, "Error: No rmbdI cookie.");
        resolve();
      }
    });
  };
  m.fsLength = m.fsLength || 300;
  m.jamoKE = ["\u3131", "\u3131\u3131", "\u3131\u3145", "\u3134", "\u3134\u3148", "\u3134\u314E", "\u3137", "\u3137\u3137", "\u3139", "\u3139\u3131", "\u3139\u3141", "\u3139\u3142", "\u3139\u3145", "\u3139\u314C", "\u3139\u314D", "\u3139\u314E", "\u3141", "\u3142", "\u3142\u3142", "\u3142\u3145", "\u3145", "\u3145\u3145", "\u3147", "\u3148", "\u3148\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E", "\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3157\u314F", "\u3157\u3150", "\u3157\u3163", "\u315B", "\u315C", "\u315C\u3153", "\u315C\u3154", "\u315C\u3163", "\u3160", "\u3161", "\u3161\u3163", "\u3163"];
  m.jamo = ["\u3131", "\u3132", "\u3133", "\u3134", "\u3135", "\u3136", "\u3137", "\u3138", "\u3139", "\u313A", "\u313B", "\u313C", "\u313D", "\u313E", "\u313F", "\u3140", "\u3141", "\u3142", "\u3143", "\u3144", "\u3145", "\u3146", "\u3147", "\u3148", "\u3149", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E", "\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3158", "\u3159", "\u315A", "\u315B", "\u315C", "\u315D", "\u315E", "\u315F", "\u3160", "\u3161", "\u3162", "\u3163"];
  m.mapKE = { "q": "\u3142", "Q": "\u3143", "w": "\u3148", "W": "\u3149", "e": "\u3137", "E": "\u3138", "r": "\u3131", "R": "\u3132", "t": "\u3145", "T": "\u3146", "y": "\u315B", "Y": "\u315B", "u": "\u3155", "U": "\u3155", "i": "\u3151", "I": "\u3151", "o": "\u3150", "O": "\u3152", "p": "\u3154", "P": "\u3156", "a": "\u3141", "A": "\u3141", "s": "\u3134", "S": "\u3134", "d": "\u3147", "D": "\u3147", "f": "\u3139", "F": "\u3139", "g": "\u314E", "G": "\u314E", "h": "\u3157", "H": "\u3157", "j": "\u3153", "J": "\u3153", "k": "\u314F", "K": "\u314F", "l": "\u3163", "L": "\u3163", "z": "\u314B", "Z": "\u314B", "x": "\u314C", "X": "\u314C", "c": "\u314A", "C": "\u314A", "v": "\u314D", "V": "\u314D", "b": "\u3160", "B": "\u3160", "n": "\u315C", "N": "\u315C", "m": "\u3161", "M": "\u3161" };
  for (let p in m.mapKE) {
    m.mapKE[m.mapKE[p]] = p;
  }
  m.rChoKE = ["\u3131", "\u3131\u3131", "\u3134", "\u3137", "\u3137\u3137", "\u3139", "\u3141", "\u3142", "\u3142\u3142", "\u3145", "\u3145\u3145", "\u3147", "\u3148", "\u3148\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
  m.rCho = ["\u3131", "\u3132", "\u3134", "\u3137", "\u3138", "\u3139", "\u3141", "\u3142", "\u3143", "\u3145", "\u3146", "\u3147", "\u3148", "\u3149", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
  m.rJungKE = ["\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3157\u314F", "\u3157\u3150", "\u3157\u3163", "\u315B", "\u315C", "\u315C\u3153", "\u315C\u3154", "\u315C\u3163", "\u3160", "\u3161", "\u3161\u3163", "\u3163"];
  m.rJung = ["\u314F", "\u3150", "\u3151", "\u3152", "\u3153", "\u3154", "\u3155", "\u3156", "\u3157", "\u3158", "\u3159", "\u315A", "\u315B", "\u315C", "\u315D", "\u315E", "\u315F", "\u3160", "\u3161", "\u3162", "\u3163"];
  m.rJongKE = ["", "\u3131", "\u3131\u3131", "\u3131\u3145", "\u3134", "\u3134\u3148", "\u3134\u314E", "\u3137", "\u3139", "\u3139\u3131", "\u3139\u3141", "\u3139\u3142", "\u3139\u3145", "\u3139\u314C", "\u3139\u314D", "\u3139\u314E", "\u3141", "\u3142", "\u3142\u3145", "\u3145", "\u3145\u3145", "\u3147", "\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
  m.rJong = ["", "\u3131", "\u3132", "\u3133", "\u3134", "\u3135", "\u3136", "\u3137", "\u3139", "\u313A", "\u313B", "\u313C", "\u313D", "\u313E", "\u313F", "\u3140", "\u3141", "\u3142", "\u3144", "\u3145", "\u3146", "\u3147", "\u3148", "\u314A", "\u314B", "\u314C", "\u314D", "\u314E"];
  m.splitHangul = function(str) {
    let res = [];
    res.originalStr = str;
    res.splitted3 = "";
    res.splitted = "";
    res.pCho = [];
    let p = 0;
    res.pCho[p] = true;
    if (!str || typeof str !== "string") {
      return res;
    }
    let cho, jung, jong;
    for (let i = 0; i < str.length; i++) {
      let c = str.charAt(i);
      let n = str.charCodeAt(i);
      if (n >= 12593 && n <= 12643) {
        n -= 12593;
        res[i] = { "char": c, "splitted3": c, "splitted": m.jamoKE[n] };
        res.pCho[p] = true;
      } else if (n >= 44032 && n <= 55203) {
        n -= 44032;
        jong = n % 28;
        jung = (n - jong) / 28 % 21;
        cho = ((n - jong) / 28 - jung) / 21;
        res[i] = {
          "char": c,
          "splitted3": m.rCho[cho] + m.rJung[jung] + m.rJong[jong],
          "splitted": m.rChoKE[cho] + m.rJungKE[jung] + m.rJongKE[jong]
        };
        res.pCho[p] = true;
      } else {
        res[i] = { "char": c, "splitted3": c, "splitted": c };
        if (i > 0 && /[^a-zA-Z0-9]$/.test(res[i - 1].splitted) && /[a-zA-Z0-9]/.test(c)) {
          res.pCho[p] = true;
        }
      }
      p += res[i].splitted.length;
      res.splitted3 += res[i].splitted3;
      res.splitted += res[i].splitted;
    }
    return res;
  };
  RegExp.quote = function(str) {
    return str.replace(/[.?*+^$[\]\\{}()|-]/g, "\\$&").replace(/\s/g, "[\\s\\S]");
  };
  m.spaceRegExpStr = new RegExp(RegExp.quote(" "), "ig").toString();
  m.arrayRegExs = function(ptnSH) {
    let str = ptnSH.splitted;
    let res = [];
    for (let i = 0; i < str.length; i++) {
      let c = str.charAt(i);
      let mapKE = m.mapKE[c];
      if (mapKE) {
        res.push(new RegExp("[" + c + mapKE + "]", "ig"));
      } else {
        res.push(new RegExp(RegExp.quote(c), "ig"));
      }
    }
    return res;
  };
  m.highlightStrFromIndices = function(strSplitted, indices) {
    let res = "";
    for (let i = 0, j = 1, k = 0, p1 = 0, p2 = 0; j <= indices.length; i = j, j++) {
      while (j < indices.length && indices[j - 1].end === indices[j].start) {
        j++;
      }
      for (; k < strSplitted.length; k++) {
        p1 = p2;
        p2 = p1 + strSplitted[k].splitted.length;
        if (p2 <= indices[i].start) {
          strSplitted[k].matched = false;
        } else if (p1 < indices[j - 1].end) {
          strSplitted[k].matched = true;
        } else {
          if (j === indices.length) {
            for (; k < strSplitted.length; k++) {
              strSplitted[k].matched = false;
            }
          }
          p2 = p1;
          break;
        }
      }
    }
    for (let i = 0; i < strSplitted.length; ) {
      if (strSplitted[i].matched) {
        res += '<span class="bold">';
        while (i < strSplitted.length && strSplitted[i].matched) {
          res += m.escapeOnlyTag(strSplitted[i].char);
          i++;
        }
        res += "</span>";
      } else {
        while (i < strSplitted.length && !strSplitted[i].matched) {
          res += m.escapeOnlyTag(strSplitted[i].char);
          i++;
        }
      }
    }
    return res;
  };
  m.matchScoreFromIndices = function(strSH, ptnSH, indices) {
    let res = 0;
    for (let i = 0; i < indices.length; i++) {
      if (strSH.pCho[indices[i].start])
        res += 15;
    }
    for (let i = 1; i < indices.length; i++) {
      let diff = indices[i].start - indices[i - 1].start;
      if (diff < 5) res += 8 * (5 - diff);
    }
    return res;
  };
  m.fuzzySearch = function(ptnSH, fs) {
    return new Promise((resolve, reject) => {
      if (!fs.shuffledOnce) {
        if (ptnSH.splitted === fs[0].ptnSH.splitted) {
          resolve(fs[0]);
        } else if (ptnSH.splitted.indexOf(fs[0].ptnSH.splitted) === 0) {
          fs[1] = fs[0];
        } else if (fs[1] && ptnSH.splitted.indexOf(fs[1].ptnSH.splitted) === 0) {
          if (ptnSH.splitted === fs[1].ptnSH.splitted) {
            resolve(fs[1]);
          }
        } else {
          fs[1] = null;
        }
      }
      let list = [];
      if (fs.shuffledOnce && fs.shuffled && fs.shuffled.length > 0) {
        let shuffled = fs.shuffled;
        for (let i = shuffled.length - 1; i >= 0; i--) {
          list.push(fs.fullList[shuffled[i].i]);
        }
      } else if (fs[1]?.sorted?.length >= 0) {
        let sorted2 = fs[1].sorted;
        for (let i = 0; i < sorted2.length; i++) {
          list.push(fs.fullList[fs[1][sorted2[i]].i]);
        }
      } else {
        for (let i = fs.fullList.length - 1; i >= 0; i--) {
          list.push(fs.fullList[i]);
        }
        if (fs === m.fsGo && fs.shuffledOnce) {
          for (let i = fs.fullList.length - 1; i >= 0; i--) {
            let uri = fs.fullList[i].uri;
            if (!fs.fullList[uri].catAndI) {
              fs.fullList[uri].catAndI = {};
            }
            fs.fullList[uri].catAndI[m.currentCat] = { cat: m.currentCat, i: m.catUriList[m.currentCat].uris[uri]?.i ?? m.catUriList[m.currentCat].uris.length };
          }
        }
      }
      fs[0] = [];
      fs[0].ptnSH = ptnSH;
      let regExs = m.arrayRegExs(ptnSH);
      let regExsReversed = [];
      for (let i = 0; i < regExs.length; i++) {
        regExsReversed[i] = regExs[regExs.length - 1 - i];
      }
      for (let i = 0; i < list.length; i++) {
        let listI = list[i];
        let txt = listI?.txt;
        if (regExs.length > 0 && txt) {
          let txtS = txt.splitted;
          let txtSReversed = txtS.split("").reverse().join("");
          regExs[0].lastIndex = 0;
          let exec = regExs[0].exec(txtS);
          let matched = exec !== null;
          let indices = [];
          if (matched) {
            indices[0] = { start: exec.index, end: regExs[0].lastIndex };
          }
          for (let j = 1; matched && j < regExs.length; j++) {
            regExs[j].lastIndex = regExs[j - 1].lastIndex;
            exec = regExs[j].exec(txtS);
            matched = exec !== null;
            if (matched) {
              indices[j] = { start: exec.index, end: regExs[j].lastIndex };
            }
          }
          let maxMatchScore = 0;
          if (matched) {
            maxMatchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
            let indicesMMS = [...indices];
            if (txt.length < m.fsLength) {
              for (let k = indices.length - 1; k >= 0; ) {
                if (regExs[k].toString() === m.spaceRegExpStr) {
                  k--;
                  continue;
                }
                regExs[k].lastIndex = indices[k].start + 1;
                exec = regExs[k].exec(txtS);
                matched = exec !== null;
                if (matched) {
                  indices[k] = { start: exec.index, end: regExs[k].lastIndex };
                }
                for (let j = k + 1; matched && j < regExs.length; j++) {
                  regExs[j].lastIndex = regExs[j - 1].lastIndex;
                  exec = regExs[j].exec(txtS);
                  matched = exec !== null;
                  if (matched) {
                    indices[j] = { start: exec.index, end: regExs[j].lastIndex };
                  }
                }
                if (matched) {
                  let matchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
                  if (matchScore > maxMatchScore) {
                    maxMatchScore = matchScore;
                    indicesMMS = [...indices];
                  }
                  k = indices.length - 2;
                } else {
                  k--;
                }
              }
            } else {
              regExsReversed[0].lastIndex = 0;
              exec = regExsReversed[0].exec(txtSReversed);
              matched = exec !== null;
              let indicesReversed = [];
              if (matched) {
                indicesReversed[0] = { start: exec.index, end: regExsReversed[0].lastIndex };
              }
              for (let j = 1; matched && j < regExsReversed.length; j++) {
                regExsReversed[j].lastIndex = regExsReversed[j - 1].lastIndex;
                exec = regExsReversed[j].exec(txtSReversed);
                matched = exec !== null;
                if (matched) {
                  indicesReversed[j] = { start: exec.index, end: regExsReversed[j].lastIndex };
                }
              }
              if (matched) {
                indices = [];
                for (let j = 0; j < indicesReversed.length; j++) {
                  let iR = indicesReversed[indicesReversed.length - 1 - j];
                  indices[j] = { start: txtSReversed.length - iR.end, end: txtSReversed.length - iR.start };
                }
                let matchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
                if (matchScore > maxMatchScore) {
                  maxMatchScore = matchScore;
                  indicesMMS = indices;
                }
              }
            }
            fs[0].push({ i: listI.i, maxMatchScore, highlight: m.highlightStrFromIndices(txt, indicesMMS) });
          }
        } else {
          fs[0].push({ i: listI?.i, maxMatchScore: 0 });
        }
      }
      let sorted = fs[0].sorted = [];
      for (let i = 0; i < fs[0].length; i++) {
        sorted.push(i);
      }
      for (let i = 1; i < sorted.length; i++) {
        let temp = sorted[i];
        let j = i;
        for (; j > 0 && fs[0][sorted[j - 1]].maxMatchScore < fs[0][temp].maxMatchScore; j--) {
          sorted[j] = sorted[j - 1];
        }
        sorted[j] = temp;
      }
      fs.shuffledOnce = false;
      resolve(fs[0]);
    });
  };
  m.fsTimezone[0].ptnSH = m.fsTimezone[1].ptnSH = m.fsGotoCats[0].ptnSH = m.fsGotoCats[1].ptnSH = m.fsCat[0].ptnSH = m.fsCat[1].ptnSH = m.fsMRCat[0].ptnSH = m.fsMRCat[1].ptnSH = m.fsGo[0].ptnSH = m.fsGo[1].ptnSH = m.fsToRs[0].ptnSH = m.fsToRs[1].ptnSH = m.splitHangul("$!@#");
  m.reTriggerFS = function(fs) {
    return new Promise(async function(resolve, reject) {
      fs[1] = null;
      fs[0].ptnSH = m.splitHangul("$!@#");
      if (fs === m.fsToRs) {
        fs.$fs.off("keyup.fs");
        fs.$fs.on("keyup.fs", async function(e) {
          await fs.fsOn(e);
          resolve();
        });
        await fs.$fs.trigger("keyup.fs");
      } else {
        await fs.$fs.trigger("keyup.fs");
        resolve();
      }
    });
  };
  m.onKeydownInFS0 = function(e, shortKey, fs) {
    clearTimeout(m.setTimeoutTargetOn0);
    e.stopPropagation();
    let $target = (0, import_jquery.default)(e.target);
    let $fsl = fs.$fsl;
    let $fsLis = $fsl.find(".list-item");
    switch (e.code) {
      case "Tab":
        e.preventDefault();
        $target.off("keyup.fs cut.fs paste.fs click.fs");
        $fsLis.eq(0)?.trigger("click");
        break;
      case "Escape":
        e.preventDefault();
        $target.off("keyup.fs cut.fs paste.fs click.fs");
        switch (shortKey) {
          case "T":
            m.ToRsOn = false;
            m.fsToRs.$fs_container.hide();
            m.$out_focus.focus();
            m.$button_ToR.removeClass("enabled");
            break;
          case "G":
            m.GoOn = false;
            m.fsGo.$fs_container.hide();
            m.$out_focus.focus();
            m.$button_Go.removeClass("enabled");
            break;
        }
        if (!m.doNotPushHistory) {
          window.history.pushState(
            { cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
            "",
            m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI)
          );
        }
        m.doNotPushHistory = false;
        break;
      case "ArrowUp":
      case "ArrowDown":
        e.preventDefault();
        $target.off("keyup.fs cut.fs paste.fs click.fs");
        let $liSelected = $fsl.find(".list-item.selected").eq(0);
        let $liTo = null;
        if ($liSelected.length) {
          if (e.code === "ArrowUp") {
            $liTo = $liSelected.prev();
          } else {
            $liTo = $liSelected.next();
          }
          if ($liTo.length) {
            $liTo.eq(0).trigger("click");
            if ($liTo.offset().top < $fsl.offset().top + 2) {
              $fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top - $fsl.offset().top - 2);
            } else if ($liTo.offset().top + $liTo.outerHeight() > $fsl.offset().top + $fsl.height() + 2) {
              $fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top + $liTo.outerHeight() - $fsl.offset().top - $fsl.height() - 2);
            }
          }
        } else {
          if ($fsLis.length) {
            if (e.code === "ArrowUp") {
              $liTo = $fsLis.last();
              $fsl.scrollTop($fsl[0].scrollHeight);
            } else {
              $liTo = $fsLis.first();
              $fsl.scrollTop(0);
            }
            $liTo.eq(0).trigger("click");
          }
        }
        break;
    }
    fs.$fs.focus();
    m.setTimeoutTargetOn0 = setTimeout(async function() {
      await m.reNewFSsOn();
    }, 4 * m.wait);
  };
  m.onKeydownInFS = function(e, fs) {
    clearTimeout(m.setTimeoutTargetOn);
    e.stopPropagation();
    let $fsl = fs.$fsl;
    let $fs_container = fs.$fs_container;
    let $target = (0, import_jquery.default)(e.target);
    let catsTxt = $target.val();
    let sEnd = $target[0].selectionEnd;
    fs.catsSplit = catsTxt.split(";");
    let l = catsTxt.length;
    let lastK = fs.k;
    fs.k = 0;
    for (let i = fs.catsSplit.length - 1; i >= 0; i--) {
      l -= fs.catsSplit[i].length + 1;
      if (l < sEnd) {
        fs.k = i;
        break;
      }
    }
    let $fsLis = $fsl.find(".list-item");
    let $liSelected = $fsl.find(".list-item.selected").eq(0);
    switch (e.code) {
      case "Tab":
        e.preventDefault();
        $target.off("keyup.fs cut.fs paste.fs click.fs");
        $fsLis.eq(0)?.trigger("click");
        break;
      case "Escape":
        e.preventDefault();
        $fs_container.hide();
        if (fs === m.fsCat) {
        } else if (fs === m.fsGotoCats) {
          $button_goto_cats.removeClass("enabled");
        } else if (fs === m.fsMRCat) {
          $button_multireco_mode.removeClass("enabled");
        } else if (fs === m.fsTimezone) {
          $choose_timezone.removeClass("enabled");
        }
        break;
      case "ArrowUp":
      case "ArrowDown":
        e.preventDefault();
        $target.off("keyup.fs cut.fs paste.fs click.fs");
        let $liTo = null;
        if ($liSelected.length) {
          if (e.code === "ArrowUp") {
            $liTo = $liSelected.prev();
          } else {
            $liTo = $liSelected.next();
          }
          if ($liTo.length) {
            $liTo.eq(0).trigger("click");
            if ($liTo.offset().top < $fsl.offset().top + 52) {
              $fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top - $fsl.offset().top - 52);
            } else if ($liTo.offset().top + $liTo.outerHeight() > $fsl.offset().top + $fsl.height() - 52) {
              $fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top + $liTo.outerHeight() - $fsl.offset().top - $fsl.height() + 52);
            }
          }
        } else {
          if ($fsLis.length) {
            if (e.code === "ArrowUp") {
              $liTo = $fsLis.last();
              $fsl.scrollTop($fsl[0].scrollHeight);
            } else {
              $liTo = $fsLis.first();
              $fsl.scrollTop(0);
            }
            $liTo.eq(0).trigger("click");
          }
        }
        break;
    }
    fs.$fs.focus();
    m.setTimeoutTargetOn = setTimeout(async function() {
      await m.reNewFSsOn();
    }, 4 * m.wait);
  };
  m.timeToSeconds = function(time) {
    let secondToSeek = 0;
    let exec = /(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/.exec(time);
    if (exec !== null) {
      let hour = exec[1];
      let minute = exec[2];
      let second = exec[3];
      if (hour && !isNaN(hour)) {
        secondToSeek += Number(hour) * 3600;
      }
      if (minute && !isNaN(minute)) {
        secondToSeek += Number(minute) * 60;
      }
      if (second && !isNaN(second)) {
        secondToSeek += Number(second);
      }
    }
    return secondToSeek;
  };
  m.seekToVideo = function(second, minute, hour) {
    let secondToSeek = 0;
    if (hour && !isNaN(hour)) {
      secondToSeek += Number(hour) * 3600;
    }
    if (minute && !isNaN(minute)) {
      secondToSeek += Number(minute) * 60;
    }
    if (second && !isNaN(second)) {
      secondToSeek += Number(second);
    }
    if (m.listPlayFrom === "youtube" || m.listPlayFrom === "youtube-list") {
      m.YtPlayer.seekTo(secondToSeek, true);
    } else if (m.listPlayFrom === "video") {
      (0, import_jquery.default)("#video")[0].currentTime = secondToSeek;
    }
  };
  m.fsToRs.getAndPlayVideo = function(cue, inListPlay = true) {
    return new Promise(async function(resolve, reject) {
      clearTimeout(m.setTimeoutPlayNext);
      clearTimeout(m.setTimeoutCueOrLoadUri);
      try {
        let fs = m.fsToRs;
        let i = fs.currentIndex;
        fs.$fsLis = fs.$fsl.find(".list-item");
        fs.$fsLis.removeClass("selected");
        if (typeof i === "string" && i.startsWith("from-recoms-")) {
          (0, import_jquery.default)(`#toR-${i}`).addClass("selected");
          let iToNumber = Number(i.substring(12));
          let uri = m.recoms[m.currentCat][iToNumber].uri;
          let recoHTML = await m.recomHTML(m.userRecos[uri], inListPlay);
          m.$reco_playing.html(String(recoHTML));
          let uriRendered = await uriRendering(uri, false, inListPlay, m.userRecos[uri]?.descR);
          m.recoURIPlaying = uri;
          if (m.lastRecoURIPlaying !== m.recoURIPlaying) {
            try {
              await m.cueOrLoadUri(cue, uriRendered, inListPlay);
            } catch (err) {
              console.error(err);
            }
            await m.reNewAndReOn();
          }
          resolve();
        } else if (!isNaN(i) && 0 <= i && i < fs.fullList.length) {
          (0, import_jquery.default)(`#toR-${i}`).addClass("selected");
          let r2 = fs.fullList[i].r;
          let recoHTML = await m.recoHTML(r2, inListPlay, true, false);
          m.$reco_playing.html(String(recoHTML));
          let uriRendered = await uriRendering(r2?.uri, false, inListPlay, r2?.descR);
          m.recoURIPlaying = r2?.uri;
          if (m.lastRecoURIPlaying !== m.recoURIPlaying) {
            try {
              await m.cueOrLoadUri(cue, uriRendered, inListPlay);
            } catch (err) {
              console.error(err);
            }
            await m.reNewAndReOn();
          }
          resolve();
        } else {
          m.$reco_playing.html("");
          m.$eveElse.html("");
          m.$youtube.html("");
          m.$eveElse_container.hide();
          m.$rC_youtube_container.hide();
          resolve();
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
      resolve();
    });
  };
  m.fsToRs.pauseVideo = function() {
    if (m.$video?.[0]?.tagName === "VIDEO") {
      m.$video?.[0]?.pause();
    }
    if (m.YtPlayer?.pauseVideo) {
      m.YtPlayer.pauseVideo();
    }
  };
  m.fsToRs.playNext = function(increment, cue, first, byKeyboard = false) {
    return new Promise(async (resolve, reject) => {
      clearTimeout(m.setTimeoutPlayNext);
      clearTimeout(m.setTimeoutCueOrLoadUri);
      let fs = m.fsToRs;
      fs.$fsLis = fs.$fsl.find(".list-item");
      if (increment === void 0 || increment === null || typeof increment !== "number") {
        increment = -1;
      }
      if (first) {
        let $toR0 = fs.$fsLis.eq(0);
        if ($toR0.length) {
          fs.lastIndex = -2;
          let k = $toR0.attr("id").substring(4);
          if (!isNaN(k)) {
            k = Number(k);
          }
          fs.currentIndex = k;
          if (m.countSetTimeoutPlayNext === void 0 || m.countSetTimeoutPlayNext >= 8) {
            m.countSetTimeoutPlayNext = 0;
          }
          m.countSetTimeoutPlayNext++;
          if (fs.fullList[fs.currentIndex]?.r?.has) {
            m.fsScrollToSelected(fs, $toR0);
            try {
              await fs.getAndPlayVideo(true);
            } catch (err) {
              console.error(err);
            }
          } else if (m.countSetTimeoutPlayNext < 8) {
            fs.$fs.val("");
            m.reTriggerFS(fs).then(() => {
              fs.playNext(increment, cue, first);
            }).catch((err) => console.error(err));
          }
        } else {
          fs.lastIndex = -2;
          fs.currentIndex = -1;
          m.$reco_playing.html("");
          m.$eveElse.html("");
          m.$youtube.html("");
          if (fs.pauseVideo) {
            fs.pauseVideo();
          }
          m.$eveElse_container.hide();
          m.$rC_youtube_container.hide();
          if (m.countSetTimeoutPlayNext === void 0 || m.countSetTimeoutPlayNext >= 8) {
            m.countSetTimeoutPlayNext = 0;
          }
          m.countSetTimeoutPlayNext++;
          if (m.countSetTimeoutPlayNext < 8) {
            fs.$fs.val("");
            m.reTriggerFS(fs).then(() => {
              fs.playNext(increment, cue, first);
            }).catch((err) => console.error(err));
          }
        }
        return;
      }
      let $selected = fs.$fsLis.filter(".selected");
      let $next = null;
      if ($selected.length) {
        if (increment < 0) {
          $next = $selected.next();
          if (!$next.length && fs.loop) {
            $next = fs.$fsLis.eq(0);
          }
        } else {
          $next = $selected.prev();
          if (!$next.length && fs.loop) {
            $next = fs.$fsLis.last();
          }
        }
      } else {
        $next = fs.$fsLis.eq(0);
      }
      if ($next?.length) {
        $next.trigger("click");
        m.fsScrollToSelected(fs, $next);
      } else if (byKeyboard) {
        m.playLi({ target: fs.$fsLis.filter(".selected")[0], byKeyboard });
      } else {
        if (m.countSetTimeoutPlayNext === void 0 || m.countSetTimeoutPlayNext >= 2) {
          m.countSetTimeoutPlayNext = 0;
        }
        m.countSetTimeoutPlayNext++;
        if (m.countSetTimeoutPlayNext < 2) {
          console.log("setTimeout :: fs.playNext(increment, cue, first);");
          setTimeout(function() {
            fs.playNext(increment, cue, first);
          }, m.wait);
        }
        return;
      }
      m.countSetTimeoutPlayNext = 0;
    });
  };
  m.goDirectlyToHash = function(hashURI) {
    m.hashURI = hashURI;
    window.location.hash = `#${m.hashURI}`;
    m.$window.scrollTop((0, import_jquery.default)(window.location.hash).offset().top);
    if (!m.initialOpen && !m.doNotPushHistory) {
      window.history.replaceState(
        { cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
        "",
        m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI)
      );
    }
  };
  m.gotoHash = function(hashURI) {
    if (hashURI && m.userIndex) {
      m.fsGo.tryN = 0;
      m.firstLiGotoLiClicked = false;
      clearInterval(m.setIntervalFsGo);
      m.setIntervalFsGo = setInterval(async function(setIntervalFsGo = m.setIntervalFsGo) {
        m.fsGo.tryN++;
        if (m.fsGo.tryN > m.initialMaxTries) {
          clearInterval(m.setIntervalFsGo);
          m.fsGo.tryN = 0;
          return;
        }
        console.log(`m.setIntervalFsGo triggered!: ${setIntervalFsGo},
m.fsGo.tryN: ${m.fsGo.tryN};`);
        if (m.fsGo.fullList[hashURI]) {
          let k = m.fsGo.fullList[hashURI]?.i;
          let fsFLk = m.fsGo.fullList[k];
          let $liK = (0, import_jquery.default)(`#li-${k}`);
          if ($liK.length) {
            if (m.firstLiGotoLiClicked) {
              clearInterval(setIntervalFsGo);
              m.fsGo.tryN = 0;
              m.firstLiGotoLiClicked = false;
            }
            m.hashURI = hashURI;
            console.log(`$(\`#li-${k}\`).trigger("click");`);
            await (0, import_jquery.default)(`#li-${k}`).trigger("click");
            m.fsScrollToSelected(m.fsGo, m.fsGo.$fsl.find(".selected"));
            m.firstLiGotoLiClicked = true;
          } else {
            m.$fuzzy_search_list.prepend(`<div id="li-${k}" class="list-item${fsFLk.selected ? " selected" : ""}${fsFLk.r?.deleted ? " deleted" : ""}" style="display:block"><span class="list-index">${k}</span><span class="list-index-id">${m.escapeOnlyTag(fsFLk.r?.uri)}</span>${fsFLk.html}</div>`);
            $liK = (0, import_jquery.default)(`#li-${k}`);
            if ($liK.length) {
              if (m.firstLiGotoLiClicked) {
                clearInterval(setIntervalFsGo);
                m.fsGo.tryN = 0;
                m.firstLiGotoLiClicked = false;
              }
              m.hashURI = hashURI;
              console.log(`$(\`#li-${k}\`).trigger("click");`);
              await (0, import_jquery.default)(`#li-${k}`).trigger("click");
              m.fsScrollToSelected(m.fsGo, m.fsGo.$fsl.find(".selected"));
              m.firstLiGotoLiClicked = true;
            }
          }
        } else if (m.fsGo.tryN < m.initialMaxTries) {
          let $elem = (0, import_jquery.default)(`#${m.escapeEncodePctg(encodeURIComponent(hashURI))}`);
          if ($elem.length) {
            clearInterval(setIntervalFsGo);
            m.fsGo.tryN = 0;
            m.hashURI = hashURI;
            window.location.hash = `#${m.escapeEncodePctg(encodeURIComponent(m.hashURI))}`;
            if (!m.initialOpen && !m.doNotPushHistory) {
              window.history.replaceState(
                { cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
                "",
                m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args)
              );
            }
            m.$window.scrollTop($elem.offset().top);
          }
        } else {
          clearInterval(setIntervalFsGo);
          m.fsGo.tryN = 0;
          console.log(`gotoHash has failed!: `, hashURI);
        }
      }, m.wait);
    }
  };
  m.finalizeInitialOpen = async function() {
    console.log(`m.finalizeInitialOpen() called.
m.initialOpen: ${m.initialOpen}`);
    if (m.initialOpen) {
      m.initialOpen = false;
      try {
        m.gotoHash(m.initialHashURI);
        await m.reTriggerFS(m.fsToRs);
        await m.reTriggerFS(m.fsCat);
        await m.reTriggerFS(m.fsMRCat);
        await m.reTriggerFS(m.fsGotoCats);
        await m.reTriggerFS(m.fsTimezone);
        await m.reTriggerFS(m.fsGo);
      } catch (err) {
        console.error(err);
      }
    }
  };
  m.fsToRs.prepareRecoListPlay = function(ytAPINeeded, cue, uriRendered, inListPlay) {
    return new Promise(async (resolve, reject) => {
      let fs = m.fsToRs;
      if (!m.YtAPILoaded) {
        if (ytAPINeeded) {
          let onYouTubeIframeAPIReady2 = function() {
            m.YtPlayer = new YT.Player("youtube-player", {
              events: {
                "onReady": function(e) {
                  let p = e.target;
                  if (uriRendered.from === "youtube") {
                    if (cue) {
                      p.cueVideoById(uriRendered.config);
                    } else {
                      p.loadVideoById(uriRendered.config);
                    }
                  } else if (uriRendered.from === "youtube-list") {
                    if (cue) {
                      p.cuePlaylist({ listType: "playlist", list: uriRendered.list });
                    } else {
                      p.loadPlaylist({ listType: "playlist", list: uriRendered.list });
                    }
                  }
                },
                "onError": function(e) {
                  if (fs2.skip) {
                    clearTimeout(m.setTimeoutPlayNext);
                    m.setTimeoutPlayNext = setTimeout(function() {
                      if (fs2.skip) {
                        fs2.playNext();
                      }
                    }, 8 * m.wait);
                  }
                },
                "onStateChange": function(e) {
                  if (e.data === YT.PlayerState.ENDED) {
                    if (fs2.oneLoop) {
                      m.YtPlayer.seekTo(0, true);
                    } else {
                      fs2.playNext();
                    }
                  } else if (e.data === YT.PlayerState.CUED) {
                  }
                }
              }
            });
          };
          var onYouTubeIframeAPIReady = onYouTubeIframeAPIReady2;
          let fs2 = m.fsToRs;
          if (!(0, import_jquery.default)("#youtube-API").length) {
            let ytAPI = `<script id="youtube-API" src="https://www.youtube.com/iframe_api"><\/script>`;
            m.$scripts.append(ytAPI);
          }
          m.YtAPILoaded = true;
        }
      }
      if (!ytAPINeeded || typeof YT !== "undefined" && YT.loaded && YT.Player) {
        console.log(`YT is ready! and await m.doFSToRs();`);
        await m.doFSToRs();
      }
      resolve();
    });
  };
  m.cueOrLoadUri = function(cue, uriRendered, inListPlay) {
    return new Promise(async (resolve, reject) => {
      clearTimeout(m.setTimeoutCueOrLoadUri);
      if (inListPlay && m.lastRecoURIPlaying !== m.recoURIPlaying) {
        let fs = m.fsToRs;
        let from = uriRendered.from;
        m.listPlayFrom = from;
        if (from === "youtube") {
          m.$eveElse.html("");
          m.$eveElse_container.hide();
          m.$rC_youtube_container.show();
          fs.$playing = m.$rC_youtube_container;
          if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
            if (m.YtPlayer) {
              let config = {
                ...uriRendered.config,
                videoId: uriRendered.videoId
              };
              if (cue && m.YtPlayer.cueVideoById) {
                m.YtPlayer.cueVideoById(config);
                m.lastRecoURIPlaying = m.recoURIPlaying;
                fs.lastIndex = fs.currentIndex;
                m.lastCat = m.currentCat;
                resolve();
              } else if (m.YtPlayer.loadVideoById) {
                m.YtPlayer.loadVideoById(config);
                m.lastRecoURIPlaying = m.recoURIPlaying;
                fs.lastIndex = fs.currentIndex;
                m.lastCat = m.currentCat;
                resolve();
              } else {
                reject(`m.YtPlayer is not ready.`);
              }
            } else if (typeof YT !== "undefined" && YT.loaded && YT.Player) {
              m.YtPlayer = new YT.Player("youtube-player", {
                videoId: uriRendered.videoId,
                playerVars: uriRendered.config,
                events: {
                  "onError": function(e) {
                    if (fs.skip) {
                      clearTimeout(m.setTimeoutPlayNext);
                      m.setTimeoutPlayNext = setTimeout(function() {
                        if (fs.skip) {
                          fs.playNext();
                        }
                      }, 8 * m.wait);
                    }
                  },
                  "onStateChange": function(e) {
                    if (e.data === YT.PlayerState.ENDED) {
                      if (fs.oneLoop) {
                        m.YtPlayer.seekTo(0, true);
                      } else {
                        fs.playNext();
                      }
                    } else if (e.data === YT.PlayerState.CUED) {
                    }
                  }
                }
              });
              m.lastRecoURIPlaying = m.recoURIPlaying;
              fs.lastIndex = fs.currentIndex;
              m.lastCat = m.currentCat;
              resolve();
            } else {
              try {
                await fs.prepareRecoListPlay(true, cue, uriRendered, inListPlay);
              } catch (err) {
                console.error(err);
              }
              resolve();
            }
          }
        } else if (from === "youtube-list") {
          m.$eveElse.html("");
          m.$eveElse_container.hide();
          m.$rC_youtube_container.show();
          fs.$playing = m.$rC_youtube_container;
          if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
            if (m.YtPlayer) {
              let config = {
                videoId: uriRendered.videoId,
                ...uriRendered.config
              };
              if (cue && m.YtPlayer.cuePlaylist) {
                m.YtPlayer.cuePlaylist({ listType: "playlist", list: uriRendered.list });
                m.lastRecoURIPlaying = m.recoURIPlaying;
                fs.lastIndex = fs.currentIndex;
                m.lastCat = m.currentCat;
                resolve();
              } else if (m.YtPlayer.loadPlaylist) {
                m.YtPlayer.loadPlaylist({ listType: "playlist", list: uriRendered.list });
                m.lastRecoURIPlaying = m.recoURIPlaying;
                fs.lastIndex = fs.currentIndex;
                m.lastCat = m.currentCat;
                resolve();
              } else {
                reject(`m.YtPlayer is not ready.`);
              }
            } else if (typeof YT !== "undefined" && YT.loaded && YT.Player) {
              m.YtPlayer = new YT.Player("youtube-player", {
                events: {
                  "onReady": function(e) {
                    let p = e.target;
                    if (cue) {
                      p.cuePlaylist({ listType: "playlist", list: uriRendered.list });
                    } else {
                      p.loadPlaylist({ listType: "playlist", list: uriRendered.list });
                    }
                  },
                  "onError": function(e) {
                    if (fs.skip) {
                      clearTimeout(m.setTimeoutPlayNext);
                      m.setTimeoutPlayNext = setTimeout(function() {
                        if (fs.skip) {
                          fs.playNext();
                        }
                      }, 8 * m.wait);
                    }
                  },
                  "onStateChange": function(e) {
                    if (e.data === YT.PlayerState.ENDED) {
                      if (fs.oneLoop) {
                        m.YtPlayer.seekTo(0, true);
                      } else {
                        fs.playNext();
                      }
                    } else if (e.data === YT.PlayerState.CUED) {
                    }
                  }
                }
              });
              m.lastRecoURIPlaying = m.recoURIPlaying;
              fs.lastIndex = fs.currentIndex;
              m.lastCat = m.currentCat;
              resolve();
            } else {
              try {
                await fs.prepareRecoListPlay(true, cue, uriRendered, inListPlay);
              } catch (err) {
                console.error(err);
              }
              resolve();
            }
          }
        } else if (from === "video") {
          m.$youtube.html("");
          m.$eveElse_container.show();
          m.$rC_youtube_container.hide();
          fs.$playing = m.$eveElse_container;
          let config = uriRendered.config;
          if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
            m.$eveElse.replaceWith(m.rC(`<video id="video" controls preload="metadata" src="${uriRendered.src}${config.hash ? config.hash : ""}"></video>`, inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse", "eveElse"));
            fs.lastIndex = fs.currentIndex;
            m.lastCat = m.currentCat;
            m.lastRecoURIPlaying = m.recoURIPlaying;
            m.$eveElse = (0, import_jquery.default)("#eveElse");
            m.$video = (0, import_jquery.default)("#video");
          }
          m.$video?.on("ended", function(event) {
            if (fs.oneLoop) {
              m.$video?.[0]?.play();
            } else {
              fs.playNext();
            }
          });
          m.$video?.on("pause", function(event) {
            if (event.target.currentTime >= config?.end) {
              if (fs.oneLoop) {
                m.$video?.[0]?.play();
              } else {
                fs.playNext();
              }
            }
          });
          if (!cue) {
            m.$video?.[0]?.play();
          }
          resolve();
        } else {
          fs.pauseVideo();
          m.$youtube.html("");
          m.$eveElse.html("");
          m.$eveElse_container.show();
          m.$rC_youtube_container.hide();
          fs.$playing = m.$eveElse_container;
          if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
            m.$eveElse.html(String(uriRendered.html).replace(/\sdelayed\-src\=/g, " src="));
            fs.lastIndex = fs.currentIndex;
            m.lastCat = m.currentCat;
            m.lastRecoURIPlaying = m.recoURIPlaying;
          }
          if (!cue && fs.skip) {
            clearTimeout(m.setTimeoutPlayNext);
            m.setTimeoutPlayNext = setTimeout(function() {
              if (fs.skip) {
                fs.playNext(-1, false);
              }
            }, 8 * m.wait);
          }
          resolve();
        }
      }
    });
  };
  m.getUTF8Length = function(s) {
    let len = 0;
    for (let i = 0; i < s.length; i++) {
      let code = s.charCodeAt(i);
      if (code <= 127) {
        len += 1;
      } else if (code <= 2047) {
        len += 2;
      } else if (code >= 55296 && code <= 57343) {
        len += 4;
        i++;
      } else if (code < 65535) {
        len += 3;
      } else {
        len += 4;
      }
    }
    return len;
  };
  m.ptnPureNumber = /^\d+$/;
  m.formatURI = function(uri, keepOriginal) {
    return new Promise(async function(resolve, reject) {
      if (uri && typeof uri === "string") {
        uri = uri.trim().replace(/[\s\t\n]+/g, " ");
        let exec = m.ptnTag.exec(uri);
        if (exec !== null) {
          try {
            let $uri = (0, import_jquery.default)(uri);
            let src = $uri.attr("src");
            if (src) {
              uri = src;
            } else {
              src = $uri.find("[src]").attr("src");
              if (src) {
                uri = src;
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
        exec = m.ptnPureNumber.exec(uri);
        if (exec !== null) {
          uri = "Number: " + uri;
        }
        if (!keepOriginal && m.getUTF8Length(uri) > 255) {
          resolve(m.unescapeHTML((await m.getConciseURI(uri)).trim()));
        }
        resolve(m.unescapeHTML(uri).trim());
      }
      resolve("");
    });
  };
  m.formatTitle = function(title) {
    return title.trim().replace(/[\t\r\n]/g, " ");
  };
  m.formatCats = function(cats) {
    if (!cats || typeof cats !== "string" || cats.trim().length === 0) {
      return "";
    }
    cats = cats.trim().replace(/[\t\r\n]/g, " ").replace(/[\"\'\`]+/ig, "");
    let catsSplit = cats.split(";");
    for (let i = 0; i < catsSplit.length; i++) {
      let levels = catsSplit[i].split("--");
      for (let j = 0; j < levels.length; j++) {
        levels[j] = levels[j].replace(/^[\s\-]+/, "").replace(/[\s\-]+$/, "");
        if (levels[j].length === 0) {
          levels.splice(j, 1);
          j--;
        }
      }
      catsSplit[i] = "";
      let k = 0;
      for (; k < levels.length; k++) {
        if (levels[k].length !== 0) {
          catsSplit[i] = levels[k];
          break;
        }
      }
      for (k++; k < levels.length; k++) {
        if (levels[k].length !== 0) {
          catsSplit[i] += "--" + levels[k];
        }
      }
    }
    let catsMap = {};
    catsMap[catsSplit[0]] = true;
    cats = catsSplit[0];
    for (let i = 1; i < catsSplit.length; i++) {
      if (catsMap[catsSplit[i]]) {
        continue;
      } else {
        catsMap[catsSplit[i]] = true;
        cats += ";" + catsSplit[i];
      }
    }
    return cats;
  };
  m.catsContainsAllAnotCats = function(cats0, cats1) {
    let cats0Split = m.formatCats(cats0).split(";");
    let cats1Split = m.formatCats(cats1).split(";");
    let setOfCats0 = {};
    for (let i = 0; i < cats0Split.length; i++) {
      setOfCats0[cats0Split[i]] = true;
    }
    let contains = true;
    for (let i = 0; i < cats1Split.length; i++) {
      contains = contains && Boolean(setOfCats0[cats1Split[i]]);
      if (!contains) {
        break;
      }
    }
    return contains;
  };
  m.uriToA = function(uri) {
    if (!uri || typeof uri !== "string") {
      uri = String(uri);
    }
    m.ptnURL.lastIndex = 0;
    let exec = m.ptnURL.exec(uri);
    if (exec !== null) {
      return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri).replace(/[\n\s\t\r]/g, " "))}</a>`;
    } else {
      exec = m.ptnFILE.exec(uri);
      if (exec !== null) {
        return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri).replace(/[\n\s\t\r]/g, " "))}</a>`;
      } else {
        return m.escapeOnlyTag(uri);
      }
    }
  };
  m.videoZIndex = 1e4;
  m.togglePosition = function(elem) {
    let $elem = (0, import_jquery.default)(elem);
    let $parent = $elem.parents(".rC");
    if ($parent.hasClass("fixed")) {
      $parent.removeClass("fixed");
      $parent.css("z-index", 0);
      window.scrollTo(0, $parent.offset().top);
      $elem.text("\u25B2 [--stick to the left top--]");
      m.fsToRs.fixed = false;
    } else {
      window.scrollBy({ left: 0, top: -$parent.height(), behavior: "smooth" });
      $parent.addClass("fixed");
      let $z = $parent.find(".z-index");
      let zIndex = m.videoZIndex;
      if ($z.length) {
        zIndex = parseInt($z.html());
      } else {
        $elem.before(`<span class="none z-index">${m.videoZIndex}</span>`);
        m.videoZIndex--;
      }
      $parent.css("z-index", zIndex);
      $elem.text("\u25B2 [--return to the original position--]");
      m.fsToRs.fixed = true;
    }
  };
  m.rC = function(elemStr, option, id, noPc) {
    return `<div class="rC${option ? ` ${option}` : ""}"${!!id ? ` id="${id}"` : ""}><div class="rSC">${elemStr}</div>${noPc ? "" : `<div class="pc"><span onclick="m.togglePosition(this)">\u25B2 [--stick to the left top--]</span></div>`}</div>`;
  };
  m.YTiframe = function(v, inListPlay, config, list) {
    if (list && typeof list === "string") {
      return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/videoseries?list=${list}&origin=${window.location.origin}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null);
    }
    return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/${v}?origin=${window.location.origin}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null);
  };
  var ptnURI;
  ptnURI = m.ptnURI["www.youtube.com"] = m.ptnURI["youtube.com"] = m.ptnURI["youtu.be"] = m.ptnURI["m.youtube.com"] = {};
  ptnURI.regEx = /^(?:watch|embed|live|shorts|playlist)\/?([\w\-_]+)?(\?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
  ptnURI.regEx0 = /^(\w+)\/?(\?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
  ptnURI.regEx1 = /^(@?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA, descR) {
    return new Promise(function(resolve, reject) {
      let config = {};
      if (descR) {
        if (descR["#start"]?.val) {
          config.startSeconds = config.start = m.timeToSeconds(descR["#start"].val.trim());
        }
        if (descR["#end"]?.val) {
          config.endSeconds = config.end = m.timeToSeconds(descR["#end"].val.trim());
        }
      }
      let exec = m.ptnURI["www.youtube.com"].regEx.exec(uriRest);
      if (exec !== null) {
        let vars = null;
        if (exec[2]) {
          vars = m.getSearchVars(exec[2]);
        }
        let v = null;
        let list = null;
        if (exec[1]) {
          v = exec[1];
        }
        if (vars?.v?.val) {
          v = vars.v.val;
        }
        if (vars?.list?.val) {
          list = vars?.list?.val;
        }
        if (list) {
          resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?list=${list}">https://www.youtube.com/watch?list=${list}</a><br/>` : "") + m.YTiframe(v, inListPlay, config, list), from: "youtube-list", list, config });
        }
        if (v) {
          resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}</a><br/>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list, config });
        }
      } else {
        exec = m.ptnURI["youtu.be"].regEx0.exec(uriRest);
        if (exec !== null) {
          let vars = null;
          if (exec[2]) {
            vars = m.getSearchVars(exec[2]);
          }
          let v = null;
          let list = null;
          if (exec[1]) {
            v = exec[1];
          }
          if (vars?.v?.val) {
            v = vars.v.val;
          }
          if (vars?.list?.val) {
            list = vars.list.val;
          }
          if (list) {
            resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?list=${list}">https://www.youtube.com/watch?list=${list}</a><br/>` : "") + m.YTiframe(v, inListPlay, config, list), from: "youtube-list", list, config });
          }
          resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}</a><br/>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list, config });
        } else {
          exec = m.ptnURI["www.youtube.com"].regEx1.exec(uriRest);
          if (exec !== null) {
            resolve({ html: toA ? `<a target="_blank" href="https://www.youtube.com/${exec[0]}">https://www.youtube.com/${exec[0]}</a>` : ``, from: "-youtube-link" });
          }
        }
      }
      reject(false);
    });
  };
  ptnURI = m.ptnURI["docs.google.com"] = {};
  ptnURI.regEx = /^spreadsheets\/d\/e\/([\w\-_]+)/i;
  ptnURI.regEx1 = /^spreadsheets\/d\/([\w\-_]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["docs.google.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml">https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml</a><br/>` : "") + m.rC(`<iframe delayed-src="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml?widget=true&headers=false"></iframe>`), from: "docs-google", docId: exec[1] });
      } else {
        let exec2 = m.ptnURI["docs.google.com"].regEx1.exec(uriRest);
        if (exec2 !== null) {
          resolve({ html: toA ? `<a target="_blank" href="https://docs.google.com/${uriRest}">https://docs.google.com/${uriRest}</a>` : ``, from: "-docs-google", docId: exec2[1] });
        }
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["instagram.com"] = m.ptnURI["www.instagram.com"] = {};
  ptnURI.regEx = /^(?:p|tv|reel)\/([\w\-_]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["instagram.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://www.instagram.com/p/${exec[1]}/">https://www.instagram.com/p/${exec[1]}/</a><br/>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://www.instagram.com/p/${exec[1]}/embed" allowtransparency="true"></iframe></div>`, "instagram", null, true), from: "instagram", imgId: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["imgur.com"] = m.ptnURI["www.imgur.com"] = {};
  ptnURI.regEx = /^a\/([\w\-_]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["imgur.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://imgur.com/a/${exec[1]}">https://imgur.com/a/${exec[1]}</a><br/>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://imgur.com/a/${exec[1]}/embed?pub=true&context=false" allowtransparency="true"></iframe></div>`, "imgur", null, true), from: "imgur", imgId: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["www.tiktok.com"] = {};
  ptnURI.regEx = /^@(\S+)\/video\/([0-9]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["www.tiktok.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://www.tiktok.com/@${exec[1]}/video/${exec[2]}">https://www.tiktok.com/@${exec[1]}/video/${exec[2]}</a><br/>` : "") + m.rC(`<div class="center"><iframe sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" delayed-src="https://www.tiktok.com/embed/v2/${exec[2]}?referrer=${escape(window.location.host)}"></iframe></div>`, "tiktok", null, true), from: "tiktok", userId: exec[1], videoId: exec[2] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["vt.tiktok.com"] = {};
  ptnURI.regEx = /^(\w+)\//i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["vt.tiktok.com"].regEx.exec(uriRest);
      if (exec !== null) {
        let shortURI = `https://vt.tiktok.com/${exec[1]}/`;
        import_jquery.default.ajax({
          type: "POST",
          url: "/BlogStat/getFullURI",
          data: shortURI,
          dataType: "text"
        }).fail(function(resp) {
          resolve(resp);
        }).done(async function(resp) {
          let uriRendered = await uriRendering(resp, toA, inListPlay);
          uriRendered.newURI = resp;
          resolve(uriRendered);
        });
      }
    });
  };
  ptnURI = m.ptnURI["serviceapi.rmcnmv.naver.com"] = {};
  ptnURI.regEx = /^\S+/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["serviceapi.rmcnmv.naver.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://serviceapi.rmcnmv.naver.com/${exec[0]}">https://serviceapi.rmcnmv.naver.com/${exec[0]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://serviceapi.rmcnmv.naver.com/${exec[0]}" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "naver", videoId: exec[0] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["tv.naver.com"] = {};
  ptnURI.regEx = /^(?:v|embed)\/([0-9]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["tv.naver.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://tv.naver.com/v/${exec[1]}">https://tv.naver.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://tv.naver.com/embed/${exec[1]}?autoPlay=false" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "naver", videoId: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["weverse.io"] = {};
  ptnURI.regEx = /^(\S+)\/artist\/([0-9\-]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["weverse.io"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://weverse.io/${exec[1]}/artist/${exec[2]}">https://weverse.io/${exec[1]}/artist/${exec[2]}</a><br/>` : "") + m.rC(`<iframe src="https://weverse.io/${exec[1]}/artist/${exec[2]}" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "weverse", singer: exec[1], videoId: exec[2] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["tv.kakao.com"] = m.ptnURI["entertain.daum.net"] = {};
  ptnURI.regEx = /(?:v|cliplink)\/([0-9]+)/i;
  ptnURI.regEx1 = /video\/([0-9]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["tv.kakao.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "kakao", videoId: exec[1] });
      } else {
        exec = m.ptnURI["entertain.daum.net"].regEx1.exec(uriRest);
        if (exec !== null) {
          resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "kakao", videoId: exec[1] });
        } else {
          reject(false);
        }
      }
    });
  };
  ptnURI = m.ptnURI["tvpot.daum.net"] = {};
  ptnURI.regEx = /^v\/([\w\-_]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["tvpot.daum.net"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://tvpot.daum.net/v/${exec[1]}">https://tvpot.daum.net/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://videofarm.daum.net/controller/video/viewer/Video.html?vid=${exec[1]}${exec[1].length < 15 ? "$" : ""}&play_loc=undefined"></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "daum", videoId: exec[1] });
      }
      reject(false);
    });
  };
  ptnURI = m.ptnURI["vimeo.com"] = {};
  ptnURI.regEx = /^([0-9]+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["vimeo.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://vimeo.com/${exec[1]}">https://vimeo.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://player.vimeo.com/video/${exec[1]}" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "vimeo", videoId: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["www.dailymotion.com"] = {};
  ptnURI.regEx = /video\/(\w+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["www.dailymotion.com"].regEx.exec(uriRest);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="https://www.dailymotion.com/video/${exec[1]}">https://www.dailymotion.com/video/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://www.dailymotion.com/embed/video/${exec[1]}" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "dailymotion", videoId: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["namu.wiki"] = {};
  ptnURI.regEx = /w\/(.*)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["namu.wiki"].regEx.exec(uriRest);
      if (exec !== null) {
        let pathname = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
        resolve({ html: `<a target="_blank" href="https://namu.wiki/w/${pathname}">https://namu.wiki/w/${m.escapeOnlyTag(decodeURIComponent(pathname))}</a>`, from: "namu.wiki", pathname });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["www.ted.com"] = m.ptnURI["embed.ted.com"] = {};
  ptnURI.regEx = /^talks\/(\S+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["www.ted.com"].regEx.exec(uriRest);
      if (exec !== null) {
        uriRest = uriRest.substring(6);
        let k = uriRest.indexOf("?");
        let vars = null;
        if (k !== -1) {
          vars = m.getSearchVars(uriRest.substring(k));
          uriRest = uriRest.substring(0, k);
        }
        let v = uriRest;
        if (vars?.language) {
          uriRest = "lang/" + vars.language.val + "/" + uriRest;
        }
        resolve({ html: (toA ? `<a target="_blank" href="https://www.ted.com/${exec[1]}">https://www.ted.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://embed.ted.com/talks/${uriRest}" allowfullscreen></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "ted", videoId: v });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["w.soundcloud.com"] = {};
  ptnURI.regEx = /^player\/(\?\S+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["w.soundcloud.com"].regEx.exec(uriRest);
      if (exec !== null) {
        let vars = m.getSearchVars(exec[1]);
        let lastPath = "player/?";
        for (let i = 0; i < vars.length; i++) {
          if (vars[i].key === "auto_play") {
            lastPath += "auto_play=false&";
          } else {
            lastPath += vars[i].key + "=" + vars[i].val + "&";
          }
        }
        resolve({ html: (toA ? `<a target="_blank" href="https://w.soundcloud.com/${exec[1]}">https://w.soundcloud.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://w.soundcloud.com/${lastPath.substring(0, lastPath.length - 1)}"></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed soundcloud" : "soundcloud"), from: "soundcloud", videoId: vars?.url?.val });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI["gall.dcinside.com"] = {};
  ptnURI.regEx = /\/movie\/share_movie(\?\S+)/i;
  ptnURI.regEx1 = /\/poll\/vote(\?\S+)/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["gall.dcinside.com"].regEx.exec(uriRest);
      if (exec !== null) {
        let vars = m.getSearchVars(exec[1]);
        let v = vars.no?.val;
        if (v) {
          resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/movie/share_movie?no=${v}">https://gall.dcinside.com/board/movie/share_movie?no=${v}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://gall.dcinside.com/board/movie/share_movie?no=${v}"></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : ""), from: "dcinside", videoId: v });
        } else {
          resolve({ html: `<a target="_blank" href="https://gall.dcinside.com/${uriRest}">https://gall.dcinside.com/${m.escapeOnlyTag(decodeURIComponent(uriRest))}</a>` });
        }
      } else {
        exec = m.ptnURI["gall.dcinside.com"].regEx1.exec(uriRest);
        if (exec !== null) {
          let vars = m.getSearchVars(exec[1]);
          let no = vars.no?.val;
          if (no) {
            resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/poll/vote?no=${no}">https://gall.dcinside.com/board/poll/vote?no=${no}</a><br/>` : "") + m.rC(`<iframe src="https://gall.dcinside.com/board/poll/vote?no=${no}"></iframe>`), from: "dcinside", voteId: no });
          }
        }
      }
      reject(false);
    });
  };
  ptnURI = m.ptnURI["v.qq.com"] = {};
  ptnURI.regEx = /([\w\d]+)\/([\w\d]+).html$/i;
  ptnURI.toIframe = function(uriRest, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI["v.qq.com"].regEx.exec(uriRest);
      if (exec !== null) {
        let v = exec[2];
        if (v) {
          resolve({ html: (toA ? `<a target="_blank" href="https://v.qq.com/${uriRest}">https://v.qq.com/${uriRest}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://v.qq.com/txp/iframe/player.html?vid=${v}"></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : ""), from: "qq", videoId: v, newURI: `https://v.qq.com/${uriRest}` });
        }
      }
      reject(false);
    });
  };
  ptnURI = m.ptnURI[0] = {};
  ptnURI.regEx = /^(https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
  ptnURI.toIframe = function(uri, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI[0].regEx.exec(uri);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="${exec[1]}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` : "") + `<div class="center"><img delayed-src="${exec[1]}"/></div>`, from: "image", src: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI[1] = {};
  ptnURI.regEx = /^https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:mp4|ogg|webm|avif|avi)(?=$|\?|\s)/i;
  ptnURI.toIframe = function(uri, inListPlay, toA, descR) {
    return new Promise(function(resolve, reject) {
      let config = {};
      if (descR) {
        if (descR["#start"]?.val) {
          config.start = m.timeToSeconds(descR["#start"].val.trim());
        }
        if (descR["#end"]?.val) {
          config.end = m.timeToSeconds(descR["#end"].val.trim());
        }
        if (config.start || config.end) {
          config.hash = `${config.start ? `#t=${config.start}` : "#t=0"}${config.end ? `,${config.end}` : ""}`;
        }
      }
      let exec = m.ptnURI[1].regEx.exec(uri);
      if (exec !== null) {
        resolve({ html: (toA ? `<a target="_blank" href="${exec[0]}${config.hash ? config.hash : ""}">${m.escapeOnlyTag(decodeURIComponent(`${uri}${config.hash ? config.hash : ""}`))}</a><br/>` : "") + m.rC(`<video controls preload="metadata" delayed-src="${exec[0]}${config.hash ? config.hash : ""}"></video>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "video", src: exec[0], config });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI[2] = {};
  ptnURI.regEx = /^https?:\/\/kr[\d]+\.sogirl\.so(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
  ptnURI.regEx1 = /^https?:\/\/kr[\d]+\.sogirl\.co(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
  ptnURI.toIframe = function(uri, inListPlay) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI[2].regEx.exec(uri);
      if (exec !== null) {
        resolve({ html: `<a target="_blank" href="https://kr69.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`, from: "sogirl", src: exec[1] });
      } else {
        exec = m.ptnURI[2].regEx1.exec(uri);
        if (exec !== null) {
          resolve({ html: `<a target="_blank" href="https://kr69.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`, from: "sogirl", src: exec[1] });
        } else {
          reject(false);
        }
      }
    });
  };
  ptnURI = m.ptnURI[3] = {};
  ptnURI.regEx = /^https?:\/\/kr[\d]+\.topgirl\.co(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
  ptnURI.toIframe = function(uri, inListPlay) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI[3].regEx.exec(uri);
      if (exec !== null) {
        resolve({ html: `<a target="_blank" href="https://kr32.topgirl.co${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr32.topgirl.co${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr32.topgirl.co${exec[1] ? exec[1] : ""}`, from: "topgirl", src: exec[1] });
      } else {
        reject(false);
      }
    });
  };
  ptnURI = m.ptnURI[4] = {};
  ptnURI.regEx = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
  ptnURI.regEx1 = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:mp4|ogg|webm|avi))(?=$|\?|\s)/i;
  ptnURI.regEx2 = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:pdf|html|htm))(?=$|\?|\s)/i;
  ptnURI.toIframe = function(uri, inListPlay, toA) {
    return new Promise(function(resolve, reject) {
      let exec = m.ptnURI[4].regEx.exec(uri);
      let href = null;
      if (exec !== null) {
        href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
        uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
        resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a>` + m.rC(`<div class="center"><img delayed-src="${href}"/></div>`, inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse"), from: "file-image", src: href });
      } else {
        exec = m.ptnURI[4].regEx1.exec(uri);
        if (exec !== null) {
          href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
          uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
          resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` + m.rC(`<video controls preload="metadata" delayed-src="${href}"></video>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "file-video", src: href });
        } else {
          exec = m.ptnURI[4].regEx2.exec(uri);
          if (exec !== null) {
            href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
            uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
            resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` + m.rC(`<iframe delayed-src="${href}"></iframe>`, inListPlay && m.fsToRs.fixed ? "fixed" : null), from: "file-pdf", src: href });
          }
        }
        reject(false);
      }
    });
  };
  window.uriRendering = function(uri, toA, inListPlay, descR) {
    return new Promise(async function(resolve, reject) {
      const { uriHost, pathname, search, hash } = m.decomposeURI(uri);
      const uriRest = (pathname ? pathname.substring(1) : "") + search;
      if (uriHost) {
        if (m.ptnURI[uriHost]) {
          try {
            let result = await m.ptnURI[uriHost]?.toIframe(uriRest, inListPlay, toA, descR);
            if (Boolean(result) !== false) {
              resolve({ ...result, uri, uriHost, pathname, search, hash });
            }
          } catch (err) {
          }
        }
        for (let i = 0; i < m.ptnURI.length; i++) {
          try {
            let result = await m.ptnURI[i]?.toIframe(uri, inListPlay, toA, descR);
            if (Boolean(result) !== false) {
              resolve({ ...result, uri, uriHost, pathname, search, hash });
            }
          } catch (err) {
          }
        }
        if (toA) {
          resolve({ html: m.uriToA(uri), uri, uriHost, pathname, search, hash });
        }
      } else {
        resolve({ html: m.escapeOnlyTag(uri), uri, uriHost, pathname, search, hash });
      }
      resolve({ html: "", uri, uriHost, pathname, search, hash });
    });
  };
  window.relatedRendering = function(str) {
    return new Promise(async function(resolve, reject) {
      if (!str || typeof str !== "string") {
        str = String(str);
      }
      m.ptnURL.lastIndex = 0;
      let exec = m.ptnURL.exec(str);
      let start = 0;
      let res = "";
      while (exec !== null) {
        res += m.escapeOnlyTag(str.substring(start, exec.index));
        res += (await uriRendering(await m.formatURI(exec[0], true), true, false)).html;
        start = m.ptnURL.lastIndex;
        exec = m.ptnURL.exec(str);
      }
      res += m.escapeOnlyTag(str.substring(start));
      resolve(res);
    });
  };
  m.notifyCopied = function(copied) {
    m.$notify_copied.show();
    m.$textarea_copied.val(copied);
  };
  m.shareCurrentPage = function(service) {
    let title = `${m.currentCat} of ${m.userId}'s Recoeve.net`;
    let href = "";
    let desc = title;
    m.args = {};
    let argName = "PRL";
    if (m.docCookies.hasItem(argName)) {
      m.args[argName] = m.docCookies.getItem(argName);
    }
    argName = "PRR";
    if (m.docCookies.hasItem(argName)) {
      m.args[argName] = m.docCookies.getItem(argName);
    }
    if (m.$table_of_recos_container.is(":visible")) {
      m.args["ToR"] = m.$table_of_recos.val();
    }
    let recoeveURI = window.location.origin + m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
    switch (service) {
      case "link":
        let written = `${title}
${recoeveURI}

${m.escapeOnlyTag(
          decodeURIComponent(recoeveURI)
        )}`;
        navigator.clipboard.writeText(written).then(
          function() {
            m.notifyCopied(written);
          },
          function(err) {
            m.notifyCopied(`[--Could not copy text--]: ${err}`);
          }
        );
        return false;
      case "tag":
        let written1 = `${title}:<br/>
<a target="_blank" href="${recoeveURI}">${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}</a>`;
        navigator.clipboard.writeText(written1).then(
          function() {
            m.notifyCopied(written1);
          },
          function(err) {
            m.notifyCopied(`[--Could not copy text--]: ${err}`);
          }
        );
        return false;
      case "recoeve":
        href = `https://recoeve.net/reco?uri=${encodeURIComponent(recoeveURI)}&title=${encodeURIComponent(title)}&cats=${encodeURIComponent(m.currentCat)}`;
        break;
      case "X":
        href = `https://X.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(recoeveURI)}`;
        break;
      case "facebook":
        href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recoeveURI)}`;
        break;
      case "whatsapp":
        href = `https://wa.me/?text=${encodeURIComponent(title)}%0A${encodeURIComponent(recoeveURI)}`;
        break;
      case "kakao":
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: m.escapeOnlyTag(title),
            description: desc ? m.escapeOnlyTag(desc) : "",
            imageUrl: "",
            // No image.
            link: {
              mobileWebUrl: recoeveURI,
              webUrl: recoeveURI
            }
          }
        });
        return false;
    }
    window.open(href, "_blank");
    return false;
  };
  m.shareSNS = function(elem, service) {
    let $elem = (0, import_jquery.default)(elem);
    let $reco = $elem.parents(".reco");
    let uri = m.unescapeHTML($reco.find(".textURI").html());
    let decodedURI = m.escapeOnlyTag(decodeURIComponent(uri));
    let r2 = m.userRecos[uri];
    let title = r2.title;
    let desc = r2.desc;
    let href = "";
    let recoeveURI = window.location.origin + m.pathOfCat(m.currentCat, m.recoMode, null, uri);
    switch (service) {
      case "link":
        $elem.trigger("focus");
        let written = `${title}
${recoeveURI}

${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}

${uri}${uri !== decodedURI ? `
${decodedURI}` : ``}`;
        navigator.clipboard.writeText(written).then(
          function() {
            m.notifyCopied(written);
          },
          function(err) {
            m.notifyCopied(`[--Could not copy text--]: ${err}`);
          }
        );
        return false;
      case "tag":
        $elem.trigger("focus");
        let written1 = `${title}:<br/>
<a target="_blank" href="${recoeveURI}">${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}</a><br/>
<br/>
<a target="_blank" href="${uri}">${decodedURI}</a>`;
        navigator.clipboard.writeText(written1).then(
          function() {
            m.notifyCopied(written1);
          },
          function(err) {
            m.notifyCopied(`[--Could not copy text--]: ${err}`);
          }
        );
        return false;
      case "recoeve":
        href = `/reco?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}&cats=${encodeURIComponent(m.currentCat)}`;
        break;
      case "X":
        href = `https://X.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(recoeveURI)}`;
        break;
      case "facebook":
        href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recoeveURI)}`;
        break;
      case "whatsapp":
        href = `https://wa.me/?text=${encodeURIComponent(title)}%0A${encodeURIComponent(recoeveURI)}`;
        break;
      case "kakao":
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: m.escapeOnlyTag(title),
            description: desc ? m.escapeOnlyTag(desc) : "",
            imageUrl: "",
            // No image.
            link: {
              mobileWebUrl: recoeveURI,
              webUrl: recoeveURI
            }
          }
        });
        return;
    }
    window.open(href, "_blank");
    return false;
  };
  m.slideToggle = function(elem) {
    let $elem = (0, import_jquery.default)(elem);
    $elem.addClass("disabled");
    $elem.parent().next().slideToggle(1e3);
    setTimeout(function() {
      $elem.removeClass("disabled");
    }, 1e3);
  };
  m.slideUp = function(elem) {
    let $elem = (0, import_jquery.default)(elem).parent().parent();
    $elem.slideUp(1e3);
    window.scrollBy({ left: 0, top: -$elem.outerHeight(), behavior: "smooth" });
  };
  m.ptnDescCmt = /^#\S+/;
  m.renderStrDescCmt = function(str) {
    let res = [];
    let strSplitted = str.trim().split("\n");
    for (let i = 0; i < strSplitted.length; i++) {
      strSplitted[i] = strSplitted[i].replace(/[\s\t\n\r]+$/, "");
    }
    let k = 0;
    let key = "";
    let listOfValues = [];
    for (let i = 0; i < strSplitted.length; i++) {
      let match = strSplitted[i].match(/^#\S*/);
      if (match === null) {
        listOfValues.push(strSplitted[i]);
      } else {
        if (!res[key.toLowerCase()]) {
          res[k] = res[key.toLowerCase()] = { i: k, key, val: listOfValues.join("\n") };
          k++;
        }
        key = match[0];
        listOfValues = [];
        listOfValues.push(strSplitted[i].substring(match[0].length));
      }
    }
    res[k] = res[key.toLowerCase()] = { i: k, key, val: listOfValues.join("\n") };
    res[""].val = res[""].val.trim();
    if (!res[""].val) {
      res.splice(0, 1);
      delete res[""];
      for (let i = 0; i < res.length; i++) {
        res[i].i = i;
      }
    }
    return res;
  };
  m.descCmtRToString = function(descCmtR) {
    let res = "";
    for (let i = 0; i < descCmtR.length; i++) {
      res += `${descCmtR[i].key}
${descCmtR[i].val.trim()}



`;
    }
    return res.trim();
  };
  m.memorizing = function(elem) {
    (0, import_jquery.default)("#memo-container").show();
    m.dict.memoSetting(elem);
  };
  m.descCmtRToHTML = function(descR) {
    return new Promise(async function(resolve, reject) {
      let res = `<div class="desc">`;
      for (let l = 0; l < descR.length; l++) {
        let key = m.escapeOnlyTag(descR[l].key);
        let val = m.escapeOnlyTag(descR[l].val);
        switch (key.toLowerCase()) {
          case "#start":
          case "#start:":
          case "#end":
          case "#end:":
            res += `<div class="value"><span class="key">${key}</span> ${val.replace(/(?:  |\t)/g, "&nbsp; ").replace(/\n/g, "<br/>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>`;
            break;
          case "#lyrics":
          case "#lyrics:":
          case "#lyric":
          case "#lyric:":
          case "#\uAC00\uC0AC":
          case "#\uAC00\uC0AC:":
            res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">\u25BC [--Toggle lyrics--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${val.trim().replace(/(?:  |\t)/g, "&nbsp; ").replace(/\n/g, "<br/>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">\u25B2 [--Hide lyrics--]</div></div>
</div>
</div>`;
            break;
          case "#dictionary":
          case "#dictionary:":
          case "#\uC0AC\uC804":
          case "#\uC0AC\uC804:": {
            let valToJSON = await m.strToJSON(val.trim());
            res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">\u25BC [--Toggle dictionary--]</div> <div class="button memorizing" onclick="m.memorizing(this)">[--Memorizing--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${(await m.arrayToTableHTML(valToJSON, true)).replace(/(?:  |\t)/g, "&nbsp; ")}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">\u25B2 [--Hide dictionary--]</div></div>
</div>
</div>`;
            break;
          }
          case "#memorizing-result": {
            let valToJSON = await m.strToJSON(val.trim());
            res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">\u25BC [--Toggle memorizing result--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${m.memoArrayToTableHTML(valToJSON, true).replace(/(?:  |\t)/g, "&nbsp; ")}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">\u25B2 [--Hide memorizing result--]</div></div>
</div>
</div>`;
            break;
          }
          case "#related":
          case "#related:":
          case "#originaluri":
          case "#originaluri:":
          case "#uriwithhash":
          case "#uriwithhash:":
          case "#":
          case "":
          default:
            res += `<div class="value"><span class="key">${key}</span> `;
            let relateds = val.split("\n");
            for (let p = 0; p < relateds.length; p++) {
              try {
                res += String(await relatedRendering(relateds[p])).replace(/(?:  |\t)/g, "&nbsp; ");
              } catch (err) {
                console.error(err);
              }
              res += "<br/>";
            }
            res += `</div>`;
            break;
        }
      }
      res += `</div>`;
      resolve(res);
    });
  };
  m.stashReco = function(event) {
    let $target = (0, import_jquery.default)(event.target);
    let $reco = $target.parents(".reco");
    let $result = $reco.find(".result");
    if (!m.myIndex) {
      m.delayedLogOut("You are not logged-in.", 60 * 60 * 24, $result);
      return;
    } else {
      let inRecoms = true;
      let valStr = "";
      let uri = m.unescapeHTML($reco.find(".textURI").html());
      let strHeads = "uri	do	val";
      let strContents = `${m.encloseStr(uri)}	overwrite	`;
      let r2 = m.myRecos[uri];
      let recoDef = m.recoDefs[uri];
      if (!r2) {
        if (recoDef?.defTitles?.[0]?.[0]) {
          strHeads += "	title";
          strContents += `	${m.encloseStr(recoDef.defTitles[0][0])}`;
        }
        if (recoDef?.defDescs?.[0]?.[0]) {
          strHeads += "	desc";
          strContents += `	${m.encloseStr(recoDef.defDescs[0][0])}`;
        }
      }
      let cats = "[--Stashed--]";
      strHeads += "	cats";
      strContents += `	${cats}`;
      $result?.html(`Stashing... The cats on this URI is "${m.escapeOnlyTag(cats)}".`);
      m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
    }
  };
  m.recomHTML = function(r2, inListPlay, additionalClass) {
    return new Promise(async function(resolve, reject) {
      if (r2?.has) {
        let recoHTML = await m.recoHTML(r2, inListPlay, true, true, additionalClass);
        resolve(String(recoHTML));
      }
      let recoDef = m.recoDefs[r2?.uri];
      if (r2?.uri && !recoDef) {
        try {
          await m.getMultiDefs(r2?.uri);
          recoDef = m.recoDefs[r2?.uri];
        } catch (err) {
          console.error(err);
        }
      }
      let res = `<div class="reco recom${additionalClass ? ` ${additionalClass}` : ``}"${inListPlay ? `` : ` id="recom-${m.recoms[m.currentCat][r2?.uri]?.i}"`}>
<div class="edit button fRight" onclick="m.editOrRecoToMine(this, true)">+</div>
<div class="textURI">${m.escapeOnlyTag(r2?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r2?.uri)}">RecoStat</a>${m.uriToA(r2?.uri)}</div>`;
      if (recoDef?.defTitles[0] && recoDef.defTitles[0][0]) {
        res += `<div class="title">${m.escapeOnlyTag(recoDef.defTitles[0][0])}</div>`;
      }
      res += `<div class="cats">${m.catsToA(m.currentCat)}</div>`;
      if (!inListPlay) {
        let uriRendered = await uriRendering(r2?.uri, false, inListPlay, r2?.descR);
        res += uriRendered.html;
      }
      let recomsI = m.recoms[m.currentCat][r2?.uri];
      if (recomsI?.valsStat) {
        let valsStat = recomsI.valsStat;
        let dx = 100 / (m.valsStatN + 2);
        res += `<div class="rC" style="padding:0 .5em"><div class="rSC"><div><svg class="vals-stat" width="100%" height="100%">`;
        for (let k = 0; k <= m.valsStatN; k++) {
          let h = 79 * valsStat[k] / valsStat.max;
          res += `<rect class="column" x="${dx * (k + 0.5)}%" y="${80 - h}%" width="${dx}%" height="${h}%"></rect>`;
        }
        res += `<line class="bar" x1="1%" y1="80%" x2="99%" y2="80%"/>`;
        for (let k = 0; k <= m.valsStatN; k++) {
          let x = dx * (k + 1);
          res += `<line class="bar" x1="${x}%" y1="78%" x2="${x}%" y2="82%"/>`;
        }
        res += `<text class="tick" text-anchor="middle" x="${dx}%" y="90%">0`;
        for (let k = 2; k <= m.valsStatN; k += 2) {
          res += `<tspan text-anchor="middle" x="${dx * (k + 1)}%" y="90%">${k / 2}</tspan>`;
        }
        res += `</text>`;
        res += `<text class="max-simSum" x="0%" y="10%">${(valsStat.max / 1e4).toFixed(2)}</text>`;
        let x_expected = (2 * recomsI.avgVal + 1) * dx;
        res += `<line class="expected" x1="${x_expected}%" y1="1%" x2="${x_expected}%" y2="83%"/><text class="expected" text-anchor="middle" x="${x_expected}%" y="96%" >${recomsI.avgValStr}</text></svg></div></div></div>`;
      }
      if (m.myPage) {
        res += `<div class="cBoth"></div><div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div><div class="cBoth button fLeft" style="margin:3em 0 1em" onclick="m.stashReco(event)">[--Stash--]</div>`;
      }
      res += `<div class="cBoth"></div><div class="result" style="margin:.5em 0"></div>`;
      if (recoDef?.defDescs[0] && recoDef.defDescs[0][0]) {
        let descR = m.renderStrDescCmt(recoDef.defDescs[0][0]);
        res += await m.descCmtRToHTML(descR);
      }
      if (recomsI?.cmtsHTML) {
        res += recomsI.cmtsHTML;
      }
      res += `</div>`;
      resolve(res);
    });
  };
  m.recoHTML = function(r2, inListPlay, inRange, inRecoms, additionalClass) {
    return new Promise(async function(resolve, reject) {
      let res = "";
      res += `<div class="reco${additionalClass ? ` ${additionalClass}` : ``}${inRange ? `` : ` none`}"${inListPlay ? `` : ` id="reco${inRecoms ? `m-${m.recoms[m.currentCat][r2?.uri]?.i}"` : `-${m.fsToRs.fullList[r2?.uri]?.i}"`}`}><img class="SNS-img" src="/CDN/link.png" onclick="return m.shareSNS(this,'link')"><img class="SNS-img" src="/CDN/icon-Tag.png" onclick="return m.shareSNS(this,'tag')"><img class="SNS-img" src="/CDN/icon-Recoeve.png" onclick="return m.shareSNS(this,'recoeve')"><img class="SNS-img" src="/CDN/icon-X.png" onclick="return m.shareSNS(this,'X')"><img class="SNS-img" src="/CDN/icon-Facebook.png" onclick="return m.shareSNS(this,'facebook')"><img class="SNS-img" src="/CDN/icon-Kakao.png" onclick="return m.shareSNS(this,'kakao')"/><img class="SNS-img" src="/CDN/icon-Whatsapp.png" onclick="return m.shareSNS(this,'whatsapp')"/>
${m.myIndex ? `<div class="button edit fRight${r2.deleted ? " deleted" : ""}" onclick="m.editOrRecoToMine(this)">${m.myPage ? "[--Edit--]" : "[--Reco to mine--]"}</div>` : ""}
<div class="textURI">${m.escapeOnlyTag(r2?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r2?.uri)}">RecoStat</a>${m.uriToA(r2?.uri)}</div>
<div class="title">${m.escapeOnlyTag(r2?.title)}</div>
<div class="cats">${m.catsToA(r2.cats)}</div>`;
      if (!inListPlay) {
        let uriRendered = await uriRendering(r2?.uri, false, inListPlay, r2?.descR);
        res += uriRendered.html;
      }
      res += `<div class="cBoth"></div>`;
      if (r2.val?.str) {
        res += `<div class="val">${m.stars(r2.val.val)} <span class="str">${m.escapeOnlyTag(r2?.val.str)}</span></div>`;
      } else {
        res += `<div class="val">${m.stars(0)} <span class="str"> </span></div>`;
      }
      res += `<div class="cBoth"></div>`;
      if (m.myPage) {
        if (r2.val?.str) {
          res += `<div class="my-point">${m.stars(r2.val.val)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str">${m.escapeOnlyTag(r2?.val.str)}</span></div>`;
        } else {
          res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
        }
      } else if (m.myRecos[r2?.uri]) {
        let mR = m.myRecos[r2?.uri];
        if (mR.has) {
          res += `<div class="my-point">${m.stars(mR.val.val)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str">${m.escapeOnlyTag(mR.val.str)}</span></div>`;
        } else {
          res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
        }
      } else {
        res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
      }
      res += `<div class="cBoth"></div><div class="result" style="margin:.5em 0"></div>`;
      if (r2.desc) {
        let descR = r2.descR;
        res += await m.descCmtRToHTML(descR);
      }
      if (r2.cmt && r2.cmt.length !== 0) {
        res += `<div class="cmt">${await m.descCmtRToHTML(r2.cmtR)}</div>`;
      }
      if (r2.tFirst && r2.tLast && r2.tFirst !== r2.tLast) {
        res += `<div class="tFirst">Lastly Editted at ${m.toLocalTime(r2.tLast)}</div><div class="cBoth"></div>`;
        res += `<div class="tLast">Firstly Recoed at ${m.toLocalTime(r2.tFirst)}</div><div class="cBoth"></div>`;
      } else if (r2.tLast) {
        res += `<div class="tLast">Firstly Recoed at ${m.toLocalTime(r2.tLast)}</div><div class="cBoth"></div>`;
      }
      res += `</div>`;
      resolve(res);
    });
  };
  m.reco_pointChange_do = function(args, err) {
    if (err) {
      m.delayedLogOut(err, 60 * 60 * 24, args.$result);
      return;
    }
    let fs = m.fsGo;
    let uri = args.uri;
    import_jquery.default.ajax({
      type: "POST",
      url: "/reco/do",
      data: (args.strHeads + "\n" + args.strContents).replace(/%20/gi, "%2520"),
      dataType: "text"
    }).fail(function(resp) {
      clearInterval(m.setIntervalDeleyedLogOut);
      clearTimeout(m.setTimeoutDeleyedLogOut);
      if (args.inRecoms) {
        args.$result?.html(`[--Reco failed.--]: ${resp}`);
      } else {
        args.$result?.html(`[--Failed change.--]: ${resp}`);
      }
    }).done(async function(resp) {
      clearInterval(m.setIntervalDeleyedLogOut);
      clearTimeout(m.setTimeoutDeleyedLogOut);
      let res = Object(await m.strToJSON(resp));
      let result = String(res[1]?.result);
      let uri2 = res[1]?.uri;
      if (result.startsWith("changed")) {
        m.myRecos[uri2].val = m.val(args.valStr);
        m.changeCats_UriList(m.myRecos[uri2].cats, args.cats, uri2);
        if (m.myRecos[uri2].cats !== args.cats) {
          m.myRecos[uri2].cats = args.cats;
        }
        m.myRecos[uri2].tLast = res[1]?.tLast;
        args.$result?.html(res[1].result);
        m.refresh(args.cats, "changed", uri2);
      } else if (result.startsWith("recoed")) {
        let r2 = m.myRecos[uri2];
        let recoDef = m.recoDefs[uri2];
        if (!r2) {
          r2 = m.myRecos[uri2] = { uri: uri2, has: true, down: true, val: m.val(args.valStr) };
        }
        r2.uri = uri2;
        r2.has = true;
        r2.down = true;
        r2.val = m.val(args.valStr);
        r2.tFirst = res[1]?.tLast;
        r2.tLast = res[1]?.tLast;
        if (args.title) {
          r2.title = args.title;
        } else if (recoDef?.defTitles?.[0]?.[0]) {
          r2.title = recoDef.defTitles[0][0];
        } else {
          r2.title = "";
        }
        r2.cats = args.cats;
        if (args.desc) {
          r2.desc = args.desc;
        } else if (recoDef?.defDescs?.[0]?.[0]) {
          r2.desc = recoDef.defDescs[0][0];
        } else {
          r2.desc = "";
        }
        r2.descR = m.renderStrDescCmt(r2.desc);
        m.putCats_UriToLists(r2.cats, uri2);
        m.refresh(r2.cats, "recoed", uri2);
      } else {
        m.delayedLogOut(result, 60 * 60 * 24, args.$result);
      }
    });
  };
  m.recoByOnlyStars = function($str, uri, $result, inRecoms) {
    if (!m.myIndex) {
      m.delayedLogOut("You are not logged-in.", 60 * 60 * 24, $result);
      return;
    }
    let valStr = "";
    if (typeof $str === "string") {
      valStr = $str;
    } else {
      valStr = $str.html();
    }
    if (m.myPage) {
      if (inRecoms) {
        let strHeads = "uri	do	val";
        let strContents = `${m.encloseStr(uri)}	reco	${m.encloseStr(valStr)}`;
        let r2 = m.myRecos[uri];
        let recoDef = m.recoDefs[uri];
        if (recoDef?.defTitles?.[0]?.[0]) {
          strHeads += "	title";
          strContents += `	${m.encloseStr(recoDef.defTitles[0][0])}`;
        }
        if (recoDef?.defDescs?.[0]?.[0]) {
          strHeads += "	desc";
          strContents += `	${m.encloseStr(recoDef.defDescs[0][0])}`;
        }
        strHeads += "	cats";
        let cats = "";
        if (m.recoMode === "multireco") {
          m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
          cats = m.$multireco_input_cats.val();
        } else {
          cats = m.formatCats(m.currentCat);
        }
        strContents += `	${m.encloseStr(cats)}`;
        $result?.html(`Recoing... The cats on this URI is "${m.escapeOnlyTag(cats)}".`);
        m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
      } else if (valStr !== m.myRecos[uri]?.val?.str) {
        let strHeads = "uri	do	val";
        let strContents = `${m.encloseStr(uri)}	change	${m.encloseStr(valStr)}`;
        let cats = "";
        let catsChanged = true;
        if (m.recoMode === "multireco") {
          m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
          cats = m.$multireco_input_cats.val();
          if (m.myRecos[uri].cats && m.catsContainsAllAnotCats(m.myRecos[uri].cats, cats)) {
            cats = m.formatCats(m.myRecos[uri].cats);
            catsChanged = false;
          }
        } else if (m.myRecos[uri].cats || m.myRecos[uri].cats === "") {
          cats = m.formatCats(m.myRecos[uri].cats);
          catsChanged = false;
        } else {
          cats = m.formatCats(m.currentCat);
        }
        if (catsChanged) {
          strHeads += "	cats";
          strContents += `	${m.encloseStr(cats)}`;
        }
        $result.html(`[--Changing your points.--]${catsChanged ? ` The cats on this URI is "${m.escapeOnlyTag(cats)}".` : ""}`);
        m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
      }
    } else {
      if (m.myRecos[uri].has) {
        if (m.myRecos[uri].val?.str !== valStr) {
          let strHeads = "uri	do	val";
          let strContents = `${m.encloseStr(uri)}	change	${m.encloseStr(valStr)}`;
          let cats = "";
          let catsChanged = true;
          if (m.recoMode === "multireco") {
            m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
            cats = m.$multireco_input_cats.val();
            if (m.myRecos[uri].cats && m.catsContainsAllAnotCats(m.myRecos[uri].cats, cats)) {
              cats = m.formatCats(m.myRecos[uri].cats);
              catsChanged = false;
            }
          } else if (m.myRecos[uri].cats) {
            cats = m.formatCats(m.myRecos[uri].cats);
            catsChanged = false;
          } else {
            cats = m.formatCats(m.currentCat);
          }
          if (catsChanged) {
            strHeads += "	cats";
            strContents += `	${m.encloseStr(cats)}`;
          }
          $result.html(`[--Changing your points.--]${catsChanged ? ` The cats on this URI is changed to "${m.escapeOnlyTag(cats)}".` : ""}`);
          m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
        }
      } else {
        let strHeads = "uri	do	val";
        let strContents = `${m.encloseStr(uri)}	reco	${m.encloseStr(valStr)}`;
        let uR = m.userRecos[uri];
        if (uR) {
          if (uR.title) {
            strHeads += "	title";
            strContents += "	" + m.encloseStr(uR.title);
          }
          if (uR.desc) {
            strHeads += "	desc";
            strContents += "	" + m.encloseStr(uR.desc);
          }
        }
        let cats = "";
        if (m.recoMode === "multireco") {
          m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
          cats = m.$multireco_input_cats.val();
        } else {
          cats = m.formatCats(m.currentCat);
        }
        strHeads += "	cats";
        strContents += `	${m.encloseStr(cats)}`;
        let strRecoDo = strHeads + "\n" + strContents;
        $result.html("[--Recoing to your recoeve.net.--]");
        m.rmb_me(m.reco_do, { strRecoDo, cats, uri, $result }, true);
      }
    }
  };
  m.starsOnClick = function(e) {
    let $target = (0, import_jquery.default)(e.target);
    let $reco = $target.parents(".reco");
    if (!$target.hasClass("stars-container")) {
      $target = $target.parents(".stars-container");
    }
    let uri = m.unescapeHTML($reco.find(".textURI").html());
    clearTimeout(m.timeout[uri]);
    let $result = $reco.find(".result");
    $result.html("");
    let $bar = $target.find(".bar");
    let barW = $bar.width();
    let $str = $target.siblings(".str");
    let w = e.clientX - $bar.offset().left + m.$window.scrollLeft();
    if (w < -15) {
      w = -1;
    } else if (w < 0) {
      w = 0;
    } else if (w > m.starsWidth) {
      w = m.starsWidth;
    }
    if (w !== barW) {
      barW = w;
      if (w < 0) {
        $str.html("");
        w = 0;
      } else {
        $str.html(m.escapeOnlyTag((w / m.starsWidth * m.fullPts).toFixed(1) + "/" + m.fullPts));
      }
      $bar.css({ width: w });
    }
    m.timeout[uri] = setTimeout(function() {
      m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
    }, 2 * m.wait);
  };
  m.starsOnTouchMove = function(e) {
    e.preventDefault();
    e.stopPropagation();
    let $target = (0, import_jquery.default)(e.target);
    if (!$target.hasClass("stars-container")) {
      $target = $target.parents(".stars-container");
    }
    let $reco = $target.parents(".reco");
    let uri = m.unescapeHTML($reco.find(".textURI").html());
    clearTimeout(m.timeout[uri]);
    let $result = $reco.find(".result");
    $result.html("");
    let $bar = $target.find(".bar");
    let barW = $bar.width();
    let $str = $target.siblings(".str");
    m.$html.on("mousemove.mdInStars touchmove.mdInStars", function(e2) {
      window.getSelection().removeAllRanges();
      e2.preventDefault();
      e2.stopPropagation();
      let x = e2.type === "touchmove" ? e2.originalEvent.touches[0].clientX : e2.clientX;
      let w = x - $bar.offset().left + m.$window.scrollLeft();
      if (w < -15) {
        w = -1;
      } else if (w < 0) {
        w = 0;
      } else if (w > m.starsWidth) {
        w = m.starsWidth;
      }
      if (w !== barW) {
        barW = w;
        if (w < 0) {
          $str.html("");
          w = 0;
        } else {
          $str.html((w / m.starsWidth * m.fullPts).toFixed(1) + "/" + m.fullPts);
        }
        $bar.css({ width: w });
      }
    });
    return { $str, uri, $result, $reco };
  };
  m.starsOnUpClick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    let $target = (0, import_jquery.default)(e.target);
    let $reco = $target.parents(".reco");
    let uri = m.unescapeHTML($reco.find(".textURI").html());
    clearTimeout(m.timeout[uri]);
    let $result = $reco.find(".result");
    $result.html("");
    let $str = $target.siblings(".str");
    let $star = $reco.find(".my-point>.stars-container");
    let val = m.val($str.html());
    if (val.valid) {
      if (val.val === -1) {
        $str.html("10.0/10");
      } else {
        val.num += 0.1;
        if (val.num > val.divisor) {
          val.num = val.divisor;
        }
        $str.html(`${val.num.toFixed(1)}/${val.divisor}`);
      }
    } else {
      $str.html("10.0/10");
    }
    val = m.val($str.html());
    $star.find(".bar").css({ width: m.starsWidth * val.val });
    m.timeout[uri] = setTimeout(function() {
      m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
    }, 2 * m.wait);
  };
  m.starsOnDownClick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    let $target = (0, import_jquery.default)(e.target);
    let $reco = $target.parents(".reco");
    let uri = m.unescapeHTML($reco.find(".textURI").html());
    clearTimeout(m.timeout[uri]);
    let $result = $reco.find(".result");
    $result.html("");
    let $str = $target.siblings(".str");
    let $star = $reco.find(".my-point>.stars-container");
    let val = m.val($str.html());
    if (val.valid) {
      if (val.val === -1) {
        $str.html("0.0/10");
      } else {
        val.num -= 0.1;
        if (val.num < 0) {
          val.num = 0;
        }
        $str.html(`${val.num.toFixed(1)}/${val.divisor}`);
      }
    } else {
      $str.html("0.0/10");
    }
    val = m.val($str.html());
    $star.find(".bar").css({ width: m.starsWidth * val.val });
    m.timeout[uri] = setTimeout(function() {
      m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
    }, 2 * m.wait);
  };
  m.reNewAndReOn = async function() {
    m.$delayedElems = (0, import_jquery.default)("[delayed-src], [delayed-bgimage], .to-be-executed");
    m.$window.off("scroll.delayedLoad");
    m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
    m.$window.trigger("scroll.delayedLoad");
    m.$fdList = (0, import_jquery.default)("#right-top-log-in, #change-style, #foot, #head, #headPlay, #playlist-container, .numbers-of-recos, .reco, .to-be-executed");
    let $stars = (0, import_jquery.default)(".my-point>.stars-container");
    $stars.off("click.mdInStars");
    $stars.on("click.mdInStars", m.starsOnClick);
    $stars.off("mousedown.mdInStars touchstart.mdInStars");
    m.$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
    $stars.on("mousedown.mdInStars touchstart.mdInStars", function(e) {
      let { $str, uri, $result, $reco } = m.starsOnTouchMove(e);
      m.$html.on("mouseup.mdInStars touchend.mdInStars", function(e2) {
        e2.preventDefault();
        e2.stopPropagation();
        m.$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
        m.timeout[uri] = setTimeout(function() {
          m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
        }, m.wait);
      });
    });
    const $ups = (0, import_jquery.default)(".my-point>.up");
    const $downs = (0, import_jquery.default)(".my-point>.down");
    $ups.off("click.ud");
    $downs.off("click.ud");
    $ups.on("click.ud", m.starsOnUpClick);
    $downs.on("click.ud", m.starsOnDownClick);
    m.reNewFSsOn();
  };
  var prepare_default = window.m;

  // src/LogIn.jsx
  var import_react4 = __toESM(require_react(), 1);

  // src/components/FormLogIn.jsx
  init_react_shim();
  var import_jquery2 = __toESM(require_jquery(), 1);
  var import_react2 = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  function FormLogIn() {
    const [idType, setIdType] = (0, import_react2.useState)("id");
    const [userId, setUserId] = (0, import_react2.useState)("");
    const [userPwd, setUserPwd] = (0, import_react2.useState)("");
    const [rememberMe, setRememberMe] = (0, import_react2.useState)("yes");
    const [logInDisabled, setLogInDisabled] = (0, import_react2.useState)(false);
    const [logInErrs, setLogInErrs] = (0, import_react2.useState)([]);
    const [forgotPwdDisabled, setForgotPwdDisabled] = (0, import_react2.useState)(false);
    const [forgotPwdErrs, setForgotPwdErrs] = (0, import_react2.useState)([]);
    prepare_default.logIn = function() {
      setLogInDisabled(true);
      let userIdLength = prepare_default.getUTF8Length(userId);
      let valid = false;
      if (userIdLength === 0) {
        setLogInErrs((errs) => [...errs, "[--ID or E-mail is empty.--]"]);
      } else if (userIdLength < prepare_default.minIdLength) {
        setLogInErrs((errs) => [...errs, "[--ID or E-mail is too short.--]"]);
      } else if (userPwd.length === 0) {
        setLogInErrs((errs) => [...errs, "[--Password is empty.--]"]);
      } else if (userPwd.length < prepare_default.minPwdLength) {
        setLogInErrs((errs) => [...errs, "[--Password is too short.--]"]);
      } else {
        if (prepare_default.regExId.test(userId)) {
          setIdType("id");
          valid = true;
        } else if (prepare_default.regExEmail.test(userId)) {
          setIdType("email");
          valid = true;
        } else {
          setIdType("invalid");
          setLogInErrs((errs) => [...errs, "[--ID--]/[--E-mail--] '" + userId + "' [--is of invalid form.--]"]);
        }
      }
      if (valid) {
        let form_data = `log	iehack	screenWidth	screenHeight	idType	userId	rememberMe	userPwd
web	&#9760;	${prepare_default.sW}	${prepare_default.sH}	${idType}	${userId}	${rememberMe}	`;
        setLogInErrs((errs) => [...errs, "[--Checking ID/E-mail--]: [--Please wait.--]"]);
        import_jquery2.default.ajax("/account/pwd_iteration", {
          type: "POST",
          data: idType + "	" + userId
        }).fail(function() {
          setLogInErrs((errs) => [...errs, "[--Request times out.--] [--Please click the Log-in button again.--]"]);
          setLogInDisabled(false);
        }).done(function(resp) {
          let res = resp.split("	");
          let iter = Number(res[0]);
          if (isNaN(iter)) {
            setLogInErrs((errs) => [...errs, "Error: " + res[0]]);
            setLogInDisabled(false);
          } else {
            setLogInErrs((errs) => [...errs, "[--Password is being encrypted.--]"]);
            setTimeout(function() {
              form_data += prepare_default.encrypt(res[1], userPwd, iter);
              setUserPwd("");
              setLogInErrs((errs) => [...errs, "[--Logging in--]: [--Please wait.--]"]);
              import_jquery2.default.ajax("/account/log-in.do", {
                type: "POST",
                data: form_data
              }).done(function(resp2) {
                setLogInErrs((errs) => [...errs, resp2]);
                setTimeout(function() {
                  if (resp2.startsWith("log-in success")) {
                    if (prepare_default.searchVars.goto?.val) {
                      window.location.href = prepare_default.searchVars.goto.val;
                    } else {
                      window.location.pathname = "/";
                    }
                  } else {
                    setLogInDisabled(false);
                  }
                }, prepare_default.wait);
              });
            }, 8);
          }
        });
      } else {
        setLogInDisabled(false);
      }
    };
    prepare_default.forgotPwd = function() {
      setForgotPwdDisabled(true);
      let userIdLength = prepare_default.getUTF8Length(userId);
      let valid = false;
      if (userIdLength === 0) {
        setForgotPwdErrs((errs) => [...errs, "[--ID or E-mail is empty.--]"]);
      } else if (userIdLength < prepare_default.minIdLength) {
        setForgotPwdErrs((errs) => [...errs, "[--ID or E-mail is too short.--]"]);
      } else {
        if (prepare_default.regExId.test(userId)) {
          valid = true;
        } else if (prepare_default.regExEmail.test(userId)) {
          valid = true;
        } else {
          setForgotPwdErrs((errs) => [...errs, "[--ID--]/[--E-mail--] '" + userId + "' [--is of invalid form.--]"]);
        }
      }
      if (valid) {
        let form_data = "log	iehack	screenWidth	screenHeight	idType	userId\nweb	&#9760;	" + prepare_default.sW + "	" + prepare_default.sH + "	" + idType + "	" + userId.trim();
        setForgotPwdErrs((errs) => [...errs, "[--Checking ID/E-mail--]: [--Please wait.--]"]);
        import_jquery2.default.ajax("/account/pwd_iteration", {
          type: "POST",
          data: idType + "	" + userId
        }).fail(function() {
          setForgotPwdErrs((errs) => [...errs, "[--Request times out.--] [--Please click the Forgot password button again.--]"]);
          setForgotPwdDisabled(false);
        }).done(function(resp) {
          let res = resp.split("	");
          let iter = Number(res[0]);
          if (isNaN(iter)) {
            setForgotPwdErrs((errs) => [...errs, "Error: " + res[0]]);
            setForgotPwdDisabled(false);
          } else {
            setForgotPwdErrs((errs) => [...errs, "[--Sending an email--]: [--Please wait.--]"]);
            import_jquery2.default.ajax("/account/forgotPwd", {
              type: "POST",
              data: form_data
            }).done(function(resp2) {
              setForgotPwdErrs((errs) => [...errs, resp2]);
              setForgotPwdDisabled(false);
            });
          }
        });
      } else {
        setForgotPwdDisabled(false);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { id: "form-log-in", className: "form-login", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "input-idType", type: "hidden", name: "idType", value: idType }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "input-userId", children: "[--ID--] or [--E-mail--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          id: "input-userId",
          className: "user-id go-next",
          name: "userId",
          value: userId,
          onChange: (e) => {
            setUserId(e.target.value.trim());
            if (prepare_default.regExId.test(e.target.value.trim())) {
              setIdType("id");
            } else if (prepare_default.regExEmail.test(e.target.value.trim())) {
              setIdType("email");
            } else {
              setIdType("invalid");
            }
          },
          placeholder: "[--ID--] or [--E-mail--]",
          type: "text",
          minLength: "1",
          maxLength: "255",
          tabIndex: "1"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "input-userPwd", children: "[--Password--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          id: "input-userPwd",
          className: "user-pwd",
          name: "userPwd",
          value: userPwd,
          onChange: (e) => setUserPwd(e.target.value),
          placeholder: "[--Password--]",
          type: "password",
          minLength: "6",
          maxLength: "255",
          tabIndex: "2"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "checkbox", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            id: "checkbox",
            className: "checkbox",
            name: "rememberMe",
            value: rememberMe,
            onChange: (e) => setRememberMe(e.target.checked ? "yes" : "no"),
            type: "checkbox",
            tabIndex: "3",
            checked: true
          }
        ),
        " ",
        "[--Remember me--]"
      ] }),
      logInErrs.filter((errMsg, i) => i >= logInErrs.length - prepare_default.maxErrMsgs).map((errMsg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "error-msg", children: errMsg }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { id: "button-log-in", type: "button", onClick: () => prepare_default.logIn(), tabIndex: "4", disabled: logInDisabled, children: "[--Log in--]" }),
      forgotPwdErrs.filter((errMsg, i) => i >= forgotPwdErrs.length - prepare_default.maxErrMsgs).map((errMsg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "error-msg", children: errMsg }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { id: "button-forgot-pwd", type: "button", onClick: () => prepare_default.forgotPwd(), tabIndex: "5", disabled: forgotPwdDisabled, children: "[--Forgot password--]" })
    ] });
  }

  // src/components/FormLogInWithGoogle.jsx
  init_react_shim();
  var import_jquery3 = __toESM(require_jquery(), 1);
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  prepare_default.state = Math.random().toString(16).substring(2);
  prepare_default.oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  prepare_default.params = {
    client_id: "964496446286-seakqek5ek8g4j9oih8uvmluc5g57cgi.apps.googleusercontent.com",
    redirect_uri: "https://recoeve.net/account/log-in/with/google",
    response_type: "token",
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    // scope:'email profile',
    state: prepare_default.state,
    prompt: "consent"
  };
  prepare_default.paramsSearch = "";
  for (let p in prepare_default.params) {
    prepare_default.paramsSearch += `&${p}=${encodeURIComponent(prepare_default.params[p])}`;
  }
  prepare_default.paramsSearch = "?" + prepare_default.paramsSearch.substring(1);
  prepare_default.authGoogleURL = prepare_default.oauth2Endpoint + prepare_default.paramsSearch;
  function FormLogInWithGoogle() {
    const [userId, setUserId] = useState("");
    const [logInDisabled, setLogInDisabled] = useState(false);
    const [logInErrs, setLogInErrs] = useState([]);
    prepare_default.logInWithGoogle = function() {
      setLogInDisabled(true);
      if (userId === "") {
        import_jquery3.default.ajax({
          type: "POST",
          url: "/account/log-in/with/pre-google",
          data: `state	goto	id
${prepare_default.state}	${prepare_default.searchVars.goto?.val ? prepare_default.searchVars.goto.val : ""}	${userId}`,
          dataType: "text"
        }).done(function(resp) {
          console.log(resp);
          setLogInErrs((errs) => [...errs, resp]);
          window.open(prepare_default.authGoogleURL, "_blank");
          setLogInDisabled(false);
        });
      } else if (prepare_default.regExId.test(userId)) {
        setLogInErrs((errs) => [...errs, "[--Checking ID and E-mail--]: [--Please wait.--]"]);
        import_jquery3.default.ajax("/account/check", {
          type: "POST",
          data: userId + "	Anonymous@Recoeve.net"
        }).fail(function() {
          setLogInErrs((errs) => [...errs, "[--Request time out.--] [--Please click the Sign-up button again.--]"]);
          setLogInDisabled(false);
        }).done(function(resp) {
          let res = resp.split("	");
          if (res && res[0] === "true") {
            setLogInErrs((errs) => [...errs, "[--ID is available.--]"]);
            setTimeout(function() {
              import_jquery3.default.ajax({
                type: "POST",
                url: "/account/log-in/with/pre-google",
                data: `state	goto	id
${prepare_default.state}	${prepare_default.searchVars.goto?.val ? prepare_default.searchVars.goto.val : ""}	${userId}`,
                dataType: "text"
              }).done(function(resp2) {
                console.log(resp2);
                setLogInErrs((errs) => [...errs, resp2]);
                window.open(prepare_default.authGoogleURL, "_blank");
                setLogInDisabled(false);
              });
            }, prepare_default.wait);
          } else {
            setLogInErrs((errs) => [...errs, `[--ID--] '${userId}' [--is already in use. Please try another ID.--]`]);
            setLogInDisabled(false);
          }
        });
      } else {
        setLogInErrs((errs) => [...errs, `[--ID is in invalid form.--]`]);
        setLogInDisabled(false);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "form-login", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "error-msg", style: { margin: "0 0 1em" }, children: "[--For sign-up with Google, fill ID of sign-up and click the below button.--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { htmlFor: "input-su-wGoogle-userId", children: "[--ID--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          id: "input-su-wGoogle-userId",
          className: "user-id",
          name: "userId",
          value: userId,
          onChange: (e) => setUserId(prepare_default.regExId.test(e.target.value.trim()) ? e.target.value.trim() : userId),
          placeholder: "[--ID--]",
          type: "text",
          minLength: "1",
          maxLength: "255"
        }
      ),
      logInErrs.filter((errMsg, i) => i >= logInErrs.length - prepare_default.maxErrMsgs).map((errMsg, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "error-msg", children: errMsg }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { id: "log-in-with-google", className: "button", onClick: () => prepare_default.logInWithGoogle(), tabIndex: "6", disabled: logInDisabled, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "logo-google", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", className: "LgbsSe-Bz112c", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              fill: "#EA4335",
              d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              fill: "#4285F4",
              d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              fill: "#FBBC05",
              d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              fill: "#34A853",
              d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { fill: "none", d: "M0 0h48v48H0z" })
        ] }) }) }),
        "[--Sign-up/Log-in with Google--]"
      ] })
    ] });
  }

  // src/components/FormSignUp.jsx
  init_react_shim();
  var import_jquery4 = __toESM(require_jquery(), 1);
  var import_react3 = __toESM(require_react(), 1);
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  function FormSignUp() {
    const [userId, setUserId] = (0, import_react3.useState)("");
    const [userEmail, setUserEmail] = (0, import_react3.useState)("");
    const [userPwd, setUserPwd] = (0, import_react3.useState)("");
    const [userPwdCfm, setUserPwdCfm] = (0, import_react3.useState)("");
    const [signUpDisabled, setSignUpDisabled] = (0, import_react3.useState)(false);
    const [signUpErrs, setSignUpErrs] = (0, import_react3.useState)([]);
    prepare_default.signUp = function() {
      setSignUpDisabled(true);
      let userIdLength = prepare_default.getUTF8Length(userId);
      let valid = false;
      if (userIdLength === 0) {
        setSignUpErrs((errs) => [...errs, "[--ID is empty.--]"]);
      } else if (userIdLength < prepare_default.minIdLength || userIdLength > prepare_default.maxIdLength) {
        setSignUpErrs((errs) => [...errs, `${userIdLength < prepare_default.minIdLength ? "[--ID is too short.--]" : "[--ID is too long.--]"}`]);
        setSignUpErrs((errs) => [...errs, `'${userId}':${userIdLength} ([--ID--].[--length--]: ${prepare_default.minIdLength}~${prepare_default.maxIdLength})`]);
      } else if (!prepare_default.regExId.test(userId)) {
        setSignUpErrs((errs) => [...errs, "[--ID--] '" + userId + "' [--is of invalid form.--]"]);
      } else if (userEmail.length === 0) {
        setSignUpErrs((errs) => [...errs, "[--E-mail is empty.--]"]);
      } else if (!prepare_default.regExEmail.test(userEmail)) {
        setSignUpErrs((errs) => [...errs, "[--E-mail--] '" + userEmail + "' [--is of invalid form.--]"]);
      } else if (userPwd.length === 0) {
        setSignUpErrs((errs) => [...errs, "[--Password is empty.--]"]);
      } else if (userPwd.length < prepare_default.minPwdLength || userPwd.length > prepare_default.maxPwdLength) {
        setSignUpErrs((errs) => [...errs, `${userPwd.length < prepare_default.minPwdLength ? "[--Password is too short.--]" : "[--Password is too long.--]"}`]);
        setSignUpErrs((errs) => [...errs, `([--Password--].[--length--]=${userPwd.length}: ${prepare_default.minPwdLength}~${prepare_default.maxPwdLength})`]);
      } else if (userPwd !== userPwdCfm) {
        setSignUpErrs((errs) => [...errs, "[--Confirm your password correctly.--]"]);
      } else {
        valid = true;
      }
      if (valid) {
        setSignUpErrs((errs) => [...errs, "[--Checking ID and E-mail--]: [--Please wait.--]"]);
        import_jquery4.default.ajax("/account/check", {
          type: "POST",
          data: userId + "	" + userEmail
        }).fail(function() {
          setSignUpErrs((errs) => [...errs, "[--Request time out.--] [--Please click the Sign-up button again.--]"]);
          setSignUpDisabled(false);
        }).done(function(resp) {
          let res = resp.split("	");
          if (res && res.length > 2 && res[0] === "true" && res[1] === "true") {
            setSignUpErrs((errs) => [...errs, "[--Password is being encrypted.--]"]);
            setTimeout(function() {
              setUserPwd(prepare_default.encrypt(res[3], userPwd, prepare_default.iterFull));
              setUserPwdCfm("confirmed");
              (0, import_jquery4.default)("#input-su-userPwd")[0].value = "";
              (0, import_jquery4.default)("#input-su-userPwdCfm")[0].value = "";
              setSignUpErrs((errs) => [...errs, "[--Signing up--]: [--Please wait.--]"]);
              let form_data = `userId	userEmail	tToken	authToken	userPwd	userPwdCfm
${userId}	${userEmail}	${res[2]}	${res[3]}	${userPwd}	${userPwdCfm}`;
              setUserPwd(null);
              setUserPwdCfm(null);
              import_jquery4.default.ajax("/account/sign-up", {
                type: "POST",
                data: form_data
              }).done(function(resp2) {
                setSignUpErrs((errs) => [...errs, resp2]);
                setSignUpDisabled(false);
              });
            }, 2048);
          } else {
            if (res[0] === "false") {
              setSignUpErrs((errs) => [...errs, `[--ID--] '${userId}' [--is already in use. Please try another ID.--]`]);
            }
            if (res[1] === "false") {
              setSignUpErrs((errs) => [...errs, `[--E-mail--] '${userEmail}' [--is already registered. Please try another e-mail.--]`]);
            }
            setSignUpDisabled(false);
          }
        });
      } else {
        setSignUpDisabled(false);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { id: "form-sign-up", className: "form-login", action: "/account/sign-up", acceptCharset: "UTF-8", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { children: "[--Sign up for Recoeve--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "input-su-userId", children: "[--ID--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          id: "input-su-userId",
          className: "user-id go-next",
          name: "userId",
          value: userId,
          onChange: (e) => setUserId(prepare_default.regExId.test(e.target.value.trim()) ? e.target.value.trim() : userId),
          placeholder: "[--ID--]",
          type: "text",
          minLength: "1",
          maxLength: "255",
          tabIndex: "7"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "input-su-userEmail", children: "[--E-mail--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          id: "input-su-userEmail",
          className: "user-Email go-next",
          name: "userEmail",
          value: userEmail,
          onChange: (e) => setUserEmail(e.target.value),
          placeholder: "[--E-mail--]",
          type: "text",
          tabIndex: "8"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "input-su-userPwd", children: "[--Password--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          id: "input-su-userPwd",
          className: "user-pwd go-next",
          name: "userPwd",
          value: userPwd,
          onChange: (e) => setUserPwd(e.target.value),
          placeholder: "[--Password--]",
          type: "password",
          minLength: "6",
          maxLength: "255",
          tabIndex: "9"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { htmlFor: "input-su-userPwdCfm", children: "[--Password confirm--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          id: "input-su-userPwdCfm",
          className: "user-pwd",
          name: "userPwdCfm",
          value: userPwdCfm,
          onChange: (e) => setUserPwdCfm(e.target.value),
          placeholder: "[--Password confirm--]",
          type: "password",
          minLength: "6",
          maxLength: "255",
          tabIndex: "10"
        }
      ),
      signUpErrs.filter((errMsg, i) => i >= signUpErrs.length - prepare_default.maxErrMsgs).map((errMsg, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "error-msg", children: errMsg }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { id: "button-sign-up", type: "button", onClick: () => prepare_default.signUp(), tabIndex: "11", disabled: signUpDisabled, children: "[--Sign up for Recoeve--]" })
    ] });
  }

  // src/LogIn.jsx
  var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  prepare_default.searchVars = prepare_default.getSearchVars(window.location.search);
  if (prepare_default.searchVars.lang !== void 0) {
    prepare_default.docCookies.setItem("lang", prepare_default.searchVars.lang.val, Infinity, "/");
  }
  prepare_default.encloseErr = function(text) {
    return `<div class="error-msg">${text}</div>`;
  };
  prepare_default.$document.ready(function() {
    setTimeout(function() {
      let blogStat = `URI	referer	REACTION_GUEST
${window.location.href}	${document.referrer}	log-in guest`;
      import_jquery5.default.ajax({
        type: "POST",
        url: "https://recoeve.net/BlogStat",
        data: blogStat,
        dataType: "text"
      }).fail(function(resp) {
        console.log("BlogStat: ", resp);
      }).done(function(resp) {
        console.log("BlogStat: ", resp);
      });
    }, 8 * prepare_default.wait);
  });
  function LogIn() {
    async function initialEffect() {
      prepare_default.$button_log_in = (0, import_jquery5.default)("#button-log-in");
      prepare_default.$button_forgot_pwd = (0, import_jquery5.default)("#button-forgot-pwd");
      prepare_default.$log_in_with_google = (0, import_jquery5.default)("#log-in-with-google");
      prepare_default.$button_sign_up = (0, import_jquery5.default)("#button-sign-up");
      prepare_default.$input_su_userId = (0, import_jquery5.default)("#input-su-userId");
      (0, import_jquery5.default)(".replace-reco-eve").html(function(i, orgHtml) {
        return orgHtml.replace(/reco/ig, '<span class="reco bold">$&</span>').replace(/eve/ig, '<span class="eve bold">$&</span>');
      });
      let $dataLang = (0, import_jquery5.default)("#data-lang");
      let dataLang = await prepare_default.strToJSON($dataLang.html().trim());
      let htmlLang = `<div class="p">`;
      for (let i = 0; i < dataLang[0].length; i++) {
        let link;
        if (window.location.search.length > 1) {
          let searchVars = prepare_default.getSearchVars(window.location.search);
          if (searchVars["lang"]) {
            searchVars["lang"].val = dataLang[0][i];
          } else {
            searchVars["lang"] = { key: "lang", val: dataLang[0][i] };
            searchVars.push(searchVars["lang"]);
          }
          link = `${window.location.pathname}${prepare_default.arrayToSearch(searchVars)}${window.location.hash}`;
          htmlLang += `<a href="${link}" onclick="m.docCookies.setItem('lang', '${dataLang[0][i]}', Infinity, '/');">${dataLang[1][i]}</a><br />`;
        } else {
          link = `${window.location.pathname}?lang=${dataLang[0][i]}${window.location.hash}`;
          htmlLang += `<a href="${link}" onclick="m.docCookies.setItem('lang', '${dataLang[0][i]}', Infinity, '/');">${dataLang[1][i]}</a><br />`;
        }
      }
      htmlLang += `</div>`;
      $dataLang.after(htmlLang);
      (0, import_jquery5.default)("#input-userPwd").on("keydown", function(e) {
        if (e.code === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          prepare_default.$button_log_in.trigger("click");
        }
      });
      (0, import_jquery5.default)("#input-userPwd").on("blur", function(e) {
        setTimeout(function() {
          prepare_default.$button_log_in.trigger("click");
        }, prepare_default.wait);
      });
      (0, import_jquery5.default)("#input-su-wGoogle-userId").on("keydown", function(e) {
        if (e.code === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          prepare_default.$log_in_with_google.trigger("click");
        }
      });
      (0, import_jquery5.default)("#input-su-userPwdCfm").on("keydown", function(e) {
        if (e.code === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          prepare_default.$button_sign_up.trigger("click");
        }
      });
      (0, import_jquery5.default)("input.go-next").on("keydown", function(e) {
        if (e.code === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          (0, import_jquery5.default)(e.target).next("input").trigger("focus");
        }
      });
      if (prepare_default.initialHash) {
        let hashSplit = prepare_default.initialHash.substring(1).replace(/&amp;/ig, "&").replace(/\+/g, "%20").split("&");
        for (let i = 0; i < hashSplit.length; i++) {
          let hashISplit = hashSplit[i].split("=");
          if (hashISplit.length >= 2) {
            prepare_default.hashMap[hashISplit[0]] = { key: hashISplit[0], val: hashISplit[1] };
          } else {
            prepare_default.hashMap[hashISplit[0]] = { key: hashISplit[0], val: "" };
          }
          prepare_default.hashMap.push(prepare_default.hashMap[hashISplit[0]]);
        }
        if (prepare_default.hashMap.state?.val && prepare_default.hashMap.access_token?.val && prepare_default.hashMap.token_type?.val) {
          prepare_default.$log_in_with_google[0].disabled = true;
          import_jquery5.default.ajax({
            type: "GET",
            url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${prepare_default.hashMap.access_token.val}&token_type=${prepare_default.hashMap.token_type.val}`,
            dataType: "json"
          }).done(function(resp) {
            console.log("Google data: ", resp);
            if (resp.verified_email && resp.email) {
              let dataToBeSent = `log	iehack	screenWidth	screenHeight	state	email
web	&#9760;	${prepare_default.sW}	${prepare_default.sH}	${prepare_default.hashMap.state.val}	${resp.email}`;
              console.log("Do POST to google.do!: ", dataToBeSent);
              import_jquery5.default.ajax({
                type: "POST",
                url: `/account/log-in/with/google.do`,
                data: dataToBeSent,
                dataType: "text"
              }).fail(function(resp2) {
                console.log("fail: ", resp2);
              }).done(async function(resp2) {
                console.log("resp: ", resp2);
                let res = resp2.substring(15);
                res = await prepare_default.strToJSON(res);
                console.log("res: ", res);
                if (resp2.startsWith("log-in success") && prepare_default.hashMap.state.val === String(res[1]?.state)) {
                  prepare_default.$log_in_with_google.before(prepare_default.encloseErr("log-in success"));
                  setTimeout(function() {
                    if (res[1]?.goto) {
                      window.location.hash = "";
                      window.location.search = "";
                      window.location.href = res[1].goto;
                    } else if (prepare_default.searchVars.goto?.val) {
                      window.location.href = prepare_default.searchVars.goto.val;
                    } else {
                      window.location.href = "/";
                    }
                  }, prepare_default.wait);
                } else {
                  prepare_default.$log_in_with_google.before(prepare_default.encloseErr(resp2));
                }
              });
            }
            prepare_default.$log_in_with_google[0].disabled = false;
          });
        }
      }
      prepare_default.$delayedElems = (0, import_jquery5.default)("[delayed-src], [delayed-bgimage], .to-be-executed");
    }
    ;
    (0, import_react4.useEffect)(() => {
      let ignore = false;
      if (!ignore) {
        initialEffect();
      }
      return () => {
        ignore = true;
      };
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: "recoeve-container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { children: "[--welcome--]" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormLogIn, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormLogInWithGoogle, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormSignUp, {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "desc", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p replace-reco-eve", children: "[--desc 0--]" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p replace-reco-eve", children: "[--desc 1--]" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p replace-reco-eve", children: "[--desc 2--]" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p replace-reco-eve", children: "[--desc 3: Recoeve.net in one sentence--]" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "desc", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p", children: [
        "For the usage examples, visit my page (\uC608\uC81C\uB97C \uBCF4\uC2DC\uB824\uBA74 \uC81C \uD398\uC774\uC9C0\uB97C \uBC29\uBB38\uD574 \uC8FC\uC138\uC694.)",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "/user/kipid/mode/multireco?cat=%5BMusic%2FBreak%5D--K-Pop#headPlay",
              children: "[Music/Break]--K-Pop of kipid's Recoeve.net (Multireco mode)"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "/user/kipid/mode/multireco?cat=%5BMusic%2FBreak%5D--Pop#headPlay",
              children: "[Music/Break]--Pop of kipid's Recoeve.net (Multireco mode)"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "/user/kipid/mode/multireco?cat=%5BMy%20Blog%5D--%5BMusic%2FBreak%5D--%EC%B8%84%EC%B8%84#headPlay",
              children: "[My Blog]--[Music/Break]--\uCE04\uCE04 (My Pet) of kipid's Recoeve.net (Multireco mode)"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "/user/kipid/mode/multireco?cat=%5BMusic%2FBreak%5D--%EB%82%A8%EA%B7%9C%EB%A6%AC#headPlay",
              children: "[Music/Break]--\uB0A8\uADDC\uB9AC | Nam Gyuri (Actor of Korea) of kipid's Recoeve.net (Multireco mode)"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "https://recoeve.net/user/kipid?cat=%5BPhysics%2FMath%2FScience%5D--Physics&lang=ko&PRL=0.80&PRR=1.00#headPlay",
              children: "[Physics/Math/Science]--Physics of kipid's Recoeve.net"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              target: "_blank",
              href: "https://recoeve.net/user/kipid?cat=%5B%EC%9D%8C%EC%8B%9D%2F%EC%9A%94%EB%A6%AC%2F%EA%B1%B4%EA%B0%95%5D--%EA%B1%B4%EA%B0%95&lang=ko&PRL=0.80&PRR=1.00#headPlay",
              children: "[\uC74C\uC2DD/\uC694\uB9AC/\uAC74\uAC15]--\uAC74\uAC15 of kipid's Recoeve.net"
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "lang", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p", children: "Language/\uC5B8\uC5B4/\u8A9E\u8A00" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("data", { id: "data-lang", children: `en	ko	zh	ja	de	fr	es	hi	ar	pt	ru
English/\uC601\uC5B4/\u82F1\u8A9E/en	Korean/\uD55C\uAD6D\uC5B4/\u97D3\u8A9E/ko	Chinese/\uC911\uAD6D\uC5B4(\uAC04\uCCB4)/\u4E2D\u6587/zh	Japanese/\uC77C\uBCF8\uC5B4/\u65E5\u8A9E/ja	deutsche Sprache/\uB3C5\uC77C\uC5B4/Deutsch/de	Fran\xE7ais/French/\uD504\uB791\uC2A4\uC5B4/\u4F5B\u8A9E/fr	Espa\xF1ol/Spanish/\uC2A4\uD398\uC778\uC5B4/\u897F\u73ED\u7259\u8A9E/es	\u0939\u093F\u0928\u094D\u0926\u0940/Hindi/\uD78C\uB514\uC5B4/\u5370\u5730\u8BED/hi	\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629/ar	Portugu\xEAs/Portuguese/\uD3EC\uB974\uD22C\uAC08\uC5B4/\u8461\u8404\u7259\u8A9E/pt	\u0420\u0443\u0441\u0441\u043A\u0438\u0439/Russian/\uB7EC\uC2DC\uC544\uC5B4/\u4FC4\u8A9E/ru` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: "foot", children: [
        "[--version--]",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { target: "_blank", href: "https://recoeve.net/", children: "Recoeve.net" }),
        "[--foot 0--]",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { target: "_blank", href: "[--foot 1: Feedback link--]", children: "[--foot 1: Feedback name--]" }),
        "[--foot 2: ending--]",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { target: "_blank", href: "https://kipid.tistory.com/entry/Recoeve-net-3S-Slow-Sexy-Sincere-SNS-%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C-Manual", children: "Introducing what we are making: Recoeve.net (3S|Slow/Sexy/Sincere SNS) \uC0AC\uC6A9\uC124\uBA85\uC11C/Manual" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p", children: [
        "Recoeve.net Manual collection | \uC0AC\uC6A9\uBC29\uBC95 \uBAA8\uC74C\uC9D1: ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "a",
          {
            className: "wheat",
            target: "_blank",
            href: "https://recoeve.net/user/kipid?cat=%5BRecoeve%5D--Manual%2F%EC%84%A4%EB%AA%85%EC%84%9C#headPlay",
            children: "[Recoeve]--Manual/\uC124\uBA85\uC11C of kipid's Recoeve.net"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "caption p cmt", children: "How to use Recoeve.net and How to reco (\uB808\uCF54\uC774\uBE0C \uC0AC\uC6A9\uBC95)" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p rC", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "rSC", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("iframe", { "delayed-src": "https://www.youtube.com/embed/zfdpwhGlY7s" }) }) })
    ] });
  }

  // src/log-in.jsx
  var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  var root = (0, import_client.createRoot)(document.getElementById("root"));
  root.render(/* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LogIn, {}));
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.7.1
   * https://jquery.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-08-28T13:37Z
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=esb-log-in.js.map
