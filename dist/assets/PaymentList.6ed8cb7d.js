/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
var $ = Object.defineProperty
var p = Object.getOwnPropertySymbols
var D = Object.prototype.hasOwnProperty,
  P = Object.prototype.propertyIsEnumerable
var v = (n, a, e) =>
    a in n
      ? $(n, a, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (n[a] = e),
  b = (n, a) => {
    for (var e in a || (a = {})) D.call(a, e) && v(n, e, a[e])
    if (p) for (var e of p(a)) P.call(a, e) && v(n, e, a[e])
    return n
  }
import {
  d as N,
  l as V,
  S as B,
  H as K,
  r as k,
  o as r,
  c as u,
  a as l,
  w as h,
  F as O,
  h as d,
  j as y,
  T as S,
  f as g,
  t as U,
  U as j,
  z as A,
} from './index.b73a8ce7.js'
const F = g('Add'),
  R = { key: 0, class: 'editable-cell' },
  T = { key: 0, class: 'hstack gap-1 text-danger' },
  z = { key: 1, class: 'editable-cell-text-wrapper' },
  G = N({
    setup(n) {
      const a = [
          { title: 'ID', dataIndex: 'ID', width: '30%' },
          { title: 'Room', dataIndex: 'Room' },
          { title: 'address', dataIndex: 'address' },
          { title: 'operation', dataIndex: 'operation' },
        ],
        e = V([
          {
            key: '0',
            name: 'Edward King 0',
            age: 32,
            address: 'London, Park Lane no. 0',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: 32,
            address: 'London, Park Lane no. 1',
          },
        ]),
        _ = B(() => e.value.length + 1),
        o = K({}),
        x = (t) => {
          o[t] = b({}, e.value.filter((c) => t === c.key)[0])
        },
        m = (t) => {
          Object.assign(e.value.filter((c) => t === c.key)[0], o[t]),
            delete o[t]
        },
        C = () => {
          const t = {
            key: `${_.value}`,
            name: `Edward King ${_.value}`,
            age: 32,
            address: `London, Park Lane no. ${_.value}`,
          }
          e.value.push(t)
        }
      return (t, c) => {
        const f = k('a-button'),
          w = k('a-input'),
          E = k('a-table')
        return (
          r(),
          u(
            O,
            null,
            [
              l(
                f,
                {
                  class: 'editable-add-btn',
                  style: { 'margin-bottom': '8px' },
                  onClick: C,
                },
                { default: h(() => [F]), _: 1 }
              ),
              l(
                E,
                { bordered: '', 'data-source': e.value, columns: a },
                {
                  bodyCell: h(({ column: I, text: L, record: s }) => [
                    I.dataIndex === 'name'
                      ? (r(),
                        u('div', R, [
                          d(o)[s.key]
                            ? (r(),
                              u('div', T, [
                                y('div', null, [
                                  l(
                                    w,
                                    {
                                      value: d(o)[s.key].name,
                                      'onUpdate:value': (i) =>
                                        (d(o)[s.key].name = i),
                                      onPressEnter: (i) => m(s.key),
                                    },
                                    null,
                                    8,
                                    ['value', 'onUpdate:value', 'onPressEnter']
                                  ),
                                ]),
                                y('div', null, [
                                  l(
                                    d(S),
                                    {
                                      class: 'editable-cell-icon-check',
                                      onClick: (i) => m(s.key),
                                    },
                                    null,
                                    8,
                                    ['onClick']
                                  ),
                                ]),
                              ]))
                            : (r(),
                              u('div', z, [
                                g(U(L || ' ') + ' ', 1),
                                l(
                                  d(j),
                                  {
                                    class: 'editable-cell-icon',
                                    onClick: (i) => x(s.key),
                                  },
                                  null,
                                  8,
                                  ['onClick']
                                ),
                              ])),
                        ]))
                      : A('', !0),
                  ]),
                  _: 1,
                },
                8,
                ['data-source']
              ),
            ],
            64
          )
        )
      }
    },
  })
export { G as default }
