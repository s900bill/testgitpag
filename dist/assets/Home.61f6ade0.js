/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import {
  o as i,
  c as m,
  d as u,
  g as p,
  s as h,
  r as d,
  j as s,
  a as e,
  w as n,
  h as o,
  t as l,
  e as f,
} from './index.b63768f2.js'
import { _ as r } from './plugin-vue_export-helper.21dcd24c.js'
import { U as y } from './UserOutlined.f4c43dba.js'
const k = {}
function $(a, t) {
  return i(), m('div')
}
var b = r(k, [['render', $]])
const C = {}
function w(a, t) {
  return 'LeaseInfo'
}
var B = r(C, [['render', w]])
const L = {}
function I(a, t) {
  return 'Payment'
}
var N = r(L, [['render', I]])
const A = {}
function D(a, t) {
  return 'Announcement'
}
var P = r(A, [['render', D]])
const U = {}
function V(a, t) {
  return 'ContactLandlord'
}
var j = r(U, [['render', V]])
const q = { class: 'hstack gap-1 mb-5' },
  z = { class: 'vstack gap-2 my-auto' },
  E = { class: 'hstack gap-1' },
  H = { class: 'fs-4 fw-bolder', style: { 'letter-spacing': '0.2rem' } },
  M = { class: 'text-secondary' },
  O = { class: 'container-fluid mb-3 g-0' },
  R = { class: 'row g-3' },
  S = { class: 'col-xl-5 vstack gap-3' },
  T = { class: 'col-xl-7 vstack gap-3' },
  F = u({
    setup(a) {
      const t = p(),
        { userinfo: c } = h(t)
      return (v, g) => {
        const x = d('a-avatar'),
          _ = d('a-card')
        return (
          i(),
          m('div', null, [
            s('div', q, [
              e(
                x,
                {
                  src: o(c).Image,
                  size: 120,
                  shape: 'square',
                  class: 'me-3 ms-1',
                  style: { 'border-radius': '2.5rem' },
                },
                { icon: n(() => [e(o(y))]), _: 1 },
                8,
                ['src']
              ),
              s('div', z, [
                s('div', E, [s('span', H, l(o(c).Name), 1)]),
                s('div', M, l(o(c).Description), 1),
              ]),
            ]),
            s('div', O, [
              s('div', R, [
                s('div', S, [
                  e(
                    _,
                    { style: { height: '300px' } },
                    { default: n(() => [e(B)]), _: 1 }
                  ),
                  e(
                    _,
                    { style: { height: '300px' } },
                    { default: n(() => [e(N)]), _: 1 }
                  ),
                ]),
                s('div', T, [
                  e(
                    _,
                    { style: { height: '500px' } },
                    { default: n(() => [e(P)]), _: 1 }
                  ),
                  e(
                    _,
                    { style: { height: '100px' } },
                    { default: n(() => [e(j)]), _: 1 }
                  ),
                ]),
              ]),
            ]),
          ])
        )
      }
    },
  }),
  Q = u({
    setup(a) {
      const t = p(),
        { ismanager: c } = h(t)
      return (v, g) =>
        o(c) ? (i(), f(b, { key: 0 })) : (i(), f(F, { key: 1 }))
    },
  })
export { Q as default }
