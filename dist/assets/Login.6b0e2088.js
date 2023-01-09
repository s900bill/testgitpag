/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import { _ as w } from './Logo.0ba490b4.js'
import {
  d as b,
  g as h,
  v as x,
  u as y,
  p as k,
  x as P,
  H as A,
  l as C,
  V as $,
  r as u,
  o as B,
  c as E,
  j as t,
  t as l,
  a as d,
  h as n,
  w as V,
  D as I,
  G as N,
  f as S,
} from './index.bb2aa403.js'
const T = {
    class:
      'w-100 min-vh-100 d-flex flex-wrap justify-content-center align-items-center',
  },
  U = { class: 'bg-dark rounded py-5', style: { width: '390px' } },
  j = { class: '' },
  D = { class: 'fs-1 text-center py-2' },
  H = t(
    'div',
    { class: 'text-center pb-3' },
    [t('img', { src: w, class: 'mx-auto img-fluid w-50' })],
    -1
  ),
  L = { class: 'w-75 mx-auto' },
  q = { class: 'mb-3 px-3' },
  G = { class: 'mb-1 text-start' },
  M = { for: 'Account' },
  O = { class: 'mb-4 px-3' },
  R = { class: 'mb-1 text-start' },
  z = { for: 'Password' },
  F = { class: 'px-3 text-center' },
  W = b({
    setup(J) {
      const _ = h(),
        m = x(),
        { t: p } = y()
      k(() => {
        window.addEventListener('keydown', c)
      }),
        P(() => {
          window.removeEventListener('keydown', c)
        })
      function c(o) {
        var e
        o.keyCode == 13 &&
          ((e = document.getElementById('login_btn')) == null || e.click())
      }
      const s = A({ Account: '', Password: '' })
      let i = C(!1)
      function v() {
        ;(i.value = !0),
          I('user/login', 'POST', s)
            .then((o) => {
              o &&
                (_.updatetoken(o),
                localStorage.setItem('Token', o),
                m.push({ name: 'Home' }))
            })
            .catch((o) => {
              N.error(p('login.loginfail'))
            })
            .finally(() => {
              i.value = !1
            })
      }
      const f = $(() => s.Account === '' || s.Password === '')
      return (o, e) => {
        const r = u('a-input'),
          g = u('a-button')
        return (
          B(),
          E('div', null, [
            t('div', T, [
              t('div', U, [
                t('form', j, [
                  t('div', D, l(o.$t('login.welcome')), 1),
                  H,
                  t('div', L, [
                    t('div', q, [
                      t('div', G, [t('label', M, l(o.$t('login.account')), 1)]),
                      d(
                        r,
                        {
                          id: 'Account',
                          value: n(s).Account,
                          'onUpdate:value':
                            e[0] || (e[0] = (a) => (n(s).Account = a)),
                        },
                        null,
                        8,
                        ['value']
                      ),
                    ]),
                    t('div', O, [
                      t('div', R, [
                        t('label', z, l(o.$t('login.password')), 1),
                      ]),
                      d(
                        r,
                        {
                          type: 'password',
                          id: 'Password',
                          class: 'form-control',
                          required: '',
                          value: n(s).Password,
                          'onUpdate:value':
                            e[1] || (e[1] = (a) => (n(s).Password = a)),
                        },
                        null,
                        8,
                        ['value']
                      ),
                    ]),
                    t('div', F, [
                      d(
                        g,
                        {
                          id: 'login_btn',
                          onClick: e[2] || (e[2] = (a) => v()),
                          loading: n(i),
                          disabled: n(f),
                        },
                        {
                          default: V(() => [S(l(o.$t('login.login')), 1)]),
                          _: 1,
                        },
                        8,
                        ['loading', 'disabled']
                      ),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ])
        )
      }
    },
  })
export { W as default }
