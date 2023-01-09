/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import {
  d as K,
  u as P,
  g as W,
  s as A,
  v as Q,
  H as X,
  p as Y,
  D as $,
  G as k,
  q as Z,
  l as g,
  r as m,
  I as ee,
  o as c,
  c as r,
  j as o,
  t as f,
  J as h,
  K as x,
  a as d,
  w as u,
  h as n,
  y as z,
  F as w,
  M as le,
  E as te,
  f as C,
  n as L,
  z as se,
  b as O,
} from './index.425bee23.js'
const oe = { class: 'fs-2 fw-bold mb-3' },
  ae = { class: 'row gx-0 gap-1 mb-3' },
  ne = o('span', { class: 'bi-plus-lg me-1' }, null, -1),
  ie = { class: 'hstack justify-content-center gap-1' },
  ce = ['onClick'],
  re = { key: 0, class: 'bi-check-lg', style: {} },
  de = o('span', { class: 'bi-trash me-1' }, null, -1),
  ue = { class: 'col-lg-2 ms-lg-auto' },
  ve = o('span', { class: 'bi-search' }, null, -1),
  me = { class: 'overflow-hidden' },
  fe = { key: 0 },
  _e = {
    class: 'roomlist row g-3 overflow-auto',
    style: { 'max-height': '700px' },
  },
  pe = ['onClick'],
  ge = { class: 'vstack gap-1' },
  he = { class: 'fw-bold fs-5' },
  be = o(
    'span',
    { class: 'bi-person', style: { 'margin-right': '0.2rem' } },
    null,
    -1
  ),
  ye = {
    key: 1,
    class: 'd-flex align-items-center justify-content-center',
    style: { height: '500px' },
  },
  we = K({
    setup(ke) {
      const { t: D } = P(),
        T = W(),
        { ismanager: I } = A(T),
        U = Q(),
        e = X({
          data: [],
          data_display: [],
          loading: !1,
          filtervalue: '',
          display_count: 20,
        })
      Y(() => {
        N()
      })
      const N = () => {
          ;(e.loading = !0),
            $('room/', 'GET', null)
              .then((l) => {
                l && (e.data = l)
              })
              .catch((l) => {
                var t
                k.error((t = l.message) != null ? t : l)
              })
              .finally(() => {
                b(), (e.loading = !1)
              })
        },
        b = () => {
          let l = []
          e.filtervalue
            ? (l = e.data.filter((t) => t.RoomNumber.includes(e.filtervalue)))
            : (l = [...e.data]),
            (e.data_display = l.slice(0, e.display_count))
        },
        V = () => {
          ;(e.display_count = e.display_count + 20), b()
        }
      Z(
        () => e.filtervalue,
        () => {
          b()
        }
      )
      const y = g(!1),
        j = g({
          ID: -1,
          RoomNumber: '',
          UserList: [],
          Group: '',
          ElectrictyMeter: '',
          WaterMeter: '',
          Remark: '',
        }),
        B = (l) => {
          ;(j.value = l), (y.value = !0)
        },
        s = g([]),
        _ = g(!1),
        R = () => {
          if (_.value) {
            if (e.filtervalue) {
              let l = e.data
                .filter((t) => t.RoomNumber.includes(e.filtervalue))
                .map((t) => t.ID)
              s.value = s.value.filter((t) => l.indexOf(t) === -1)
            } else s.value = []
            _.value = !1
          } else {
            if (e.filtervalue) {
              let l = e.data
                .filter(
                  (t) =>
                    t.RoomNumber.includes(e.filtervalue) &&
                    s.value.indexOf(t.ID) === -1
                )
                .map((t) => t.ID)
              s.value = [...s.value, ...l]
            } else s.value = e.data.map((l) => l.ID)
            _.value = !0
          }
        },
        F = () => {
          le.confirm({
            title: D('roomlist.delete_title', { n: s.value.length }),
            icon: d(te),
            onOk() {
              return new Promise((l, t) => {
                $('room/deleteMultiRooms', 'DELETE', { DeleteIDList: s.value })
                  .then((i) => {
                    i &&
                      (k.success(D('roomlist.delete_success')),
                      (s.value = []),
                      N(),
                      l(null))
                  })
                  .catch((i) => {
                    var p
                    k.error((p = i.message) != null ? p : i), t(i)
                  })
              })
            },
          })
        }
      return (l, t) => {
        const i = m('a-button'),
          p = m('a-badge'),
          G = m('a-input'),
          S = m('a-empty'),
          q = m('a-skeleton'),
          H = m('a-modal'),
          J = ee('infinitescroll')
        return (
          c(),
          r(
            w,
            null,
            [
              o('div', oe, f(l.$t('layout.room')), 1),
              o('div', ae, [
                h(
                  d(
                    i,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-md-4 col-lg-3 col-xl-2',
                      onClick:
                        t[0] ||
                        (t[0] = (a) => n(U).push({ name: 'CreateRser' })),
                    },
                    {
                      icon: u(() => [ne]),
                      default: u(() => [
                        C(' ' + f(l.$t('roomlist.createroom')), 1),
                      ]),
                      _: 1,
                    },
                    512
                  ),
                  [[x, s.value.length == 0]]
                ),
                h(
                  d(
                    i,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-lg-3 col-xl-2',
                      onClick: z(R, ['stop']),
                    },
                    {
                      default: u(() => {
                        var a, v, E, M
                        return [
                          o('div', ie, [
                            o(
                              'span',
                              {
                                class: L([
                                  'bg-secondary rounded-1 border',
                                  _.value ||
                                  ((a = s.value) == null
                                    ? void 0
                                    : a.length) ===
                                    ((v = n(e).data) == null
                                      ? void 0
                                      : v.length)
                                    ? 'bg-info  border-info '
                                    : 'bg-secondary',
                                ]),
                                style: { width: '20px', height: '20px' },
                                onClick: z(R, ['stop']),
                              },
                              [
                                _.value ||
                                ((E = s.value) == null ? void 0 : E.length) ===
                                  ((M = n(e).data) == null ? void 0 : M.length)
                                  ? (c(), r('span', re))
                                  : se('', !0),
                              ],
                              10,
                              ce
                            ),
                            o('span', null, f(l.$t('button.selectall')), 1),
                            d(
                              p,
                              {
                                count: s.value.length,
                                'number-style': { backgroundColor: '#147DF0' },
                              },
                              null,
                              8,
                              ['count']
                            ),
                          ]),
                        ]
                      }),
                      _: 1,
                    },
                    8,
                    ['onClick']
                  ),
                  [[x, s.value.length > 0 && n(I)]]
                ),
                h(
                  d(
                    i,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-md-4 col-lg-3 col-xl-2',
                      onClick: F,
                    },
                    {
                      icon: u(() => [de]),
                      default: u(() => [
                        C(' ' + f(l.$t('roomlist.deleterooms')), 1),
                      ]),
                      _: 1,
                    },
                    512
                  ),
                  [[x, s.value.length > 0 && n(I)]]
                ),
                o('div', ue, [
                  d(
                    G,
                    {
                      value: n(e).filtervalue,
                      'onUpdate:value':
                        t[1] || (t[1] = (a) => (n(e).filtervalue = a)),
                      class: 'rounded-pill',
                    },
                    { prefix: u(() => [ve]), _: 1 },
                    8,
                    ['value']
                  ),
                ]),
              ]),
              d(
                q,
                { loading: n(e).loading, active: '' },
                {
                  default: u(() => [
                    h(
                      (c(),
                      r('div', me, [
                        n(e).data_display.length > 0
                          ? (c(),
                            r('div', fe, [
                              o('div', _e, [
                                (c(!0),
                                r(
                                  w,
                                  null,
                                  O(
                                    n(e).data_display,
                                    (a) => (
                                      c(),
                                      r(
                                        'div',
                                        {
                                          key: a.ID,
                                          class: 'col-md-6 col-xl-4 col-xxl-3',
                                          style: { 'min-width': '400px' },
                                        },
                                        [
                                          o(
                                            'div',
                                            {
                                              style: { height: '120px' },
                                              class: L([
                                                'p-3 bg-dark rounded border',
                                                s.value.includes(a.ID)
                                                  ? 'border-info'
                                                  : '',
                                              ]),
                                              role: 'button',
                                              onClick: (v) => B(a),
                                            },
                                            [
                                              o('div', ge, [
                                                o(
                                                  'div',
                                                  he,
                                                  f(a.RoomNumber),
                                                  1
                                                ),
                                                o('div', null, [
                                                  (c(!0),
                                                  r(
                                                    w,
                                                    null,
                                                    O(
                                                      a.UserList,
                                                      (v) => (
                                                        c(),
                                                        r(
                                                          'div',
                                                          {
                                                            class:
                                                              'float-start me-1',
                                                            key: v.ID,
                                                          },
                                                          [be, C(f(v.Name), 1)]
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ]),
                                              ]),
                                            ],
                                            10,
                                            pe
                                          ),
                                        ]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]),
                            ]))
                          : (c(), r('div', ye, [d(S)])),
                      ])),
                      [
                        [
                          J,
                          { func: V, target: '.roomlist', delay: 300 },
                          void 0,
                          { expend: !0 },
                        ],
                      ]
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['loading']
              ),
              d(
                H,
                {
                  visible: y.value,
                  'onUpdate:visible': t[2] || (t[2] = (a) => (y.value = a)),
                  footer: null,
                  width: '400px',
                },
                null,
                8,
                ['visible']
              ),
            ],
            64
          )
        )
      }
    },
  })
export { we as default }
