/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import { a as u, C as l } from './index.b57dc02a.js'
var s = {
    icon: {
      tag: 'svg',
      attrs: { viewBox: '64 64 896 896', focusable: 'false' },
      children: [
        {
          tag: 'path',
          attrs: {
            d: 'M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z',
          },
        },
      ],
    },
    name: 'user',
    theme: 'outlined',
  },
  o = s
function i(r) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? Object(arguments[e]) : {},
      n = Object.keys(t)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (n = n.concat(
        Object.getOwnPropertySymbols(t).filter(function (a) {
          return Object.getOwnPropertyDescriptor(t, a).enumerable
        })
      )),
      n.forEach(function (a) {
        f(r, a, t[a])
      })
  }
  return r
}
function f(r, e, t) {
  return (
    e in r
      ? Object.defineProperty(r, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[e] = t),
    r
  )
}
var c = function (e, t) {
  var n = i({}, e, t.attrs)
  return u(l, i({}, n, { icon: o }), null)
}
c.displayName = 'UserOutlined'
c.inheritAttrs = !1
var O = c
export { O as U }
