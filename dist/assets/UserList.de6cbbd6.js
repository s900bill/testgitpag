/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import {
  d as H,
  u as J,
  v as K,
  r,
  o as p,
  c as v,
  e as Q,
  w as o,
  f as D,
  t as u,
  z as I,
  j as l,
  a as i,
  h as d,
  M as W,
  E as X,
  D as P,
  G as E,
  g as re,
  s as de,
  p as F,
  l as x,
  H as pe,
  q as _e,
  I as fe,
  J as g,
  K as k,
  y as M,
  F as S,
  n as B,
  b as ve,
} from './index.b63768f2.js'
import { U as Y } from './UserOutlined.f4c43dba.js'
const me = { class: 'text-center vstack gap-3 py-5 px-2 position-relative' },
  he = { class: 'mx-auto' },
  ge = { class: 'fw-bold fs-4' },
  ye = { class: 'text-secondary' },
  be = { class: 'd-flex justify-content-center gap-1 text-secondary' },
  xe = l('span', { class: 'icon-phone' }, null, -1),
  ke = l('span', { class: 'icon-envelope-o' }, null, -1),
  De = {
    class: 'd-block text-truncate text-secondary mx-auto',
    style: { 'max-width': '250px' },
  },
  we = l('span', { class: 'bi-pencil me-1' }, null, -1),
  $e = l('span', { class: 'bi-trash me-1' }, null, -1),
  Ce = H({
    props: ['userinfo'],
    emits: ['update'],
    setup(G, { emit: N }) {
      const _ = G,
        { t: R } = J(),
        T = K(),
        w = () => {
          T.push({ name: 'EditUser', query: { id: _.userinfo.ID } })
        },
        U = (m) => {
          W.confirm({
            title: R('userdetail.delete_title', { n: m.Name }),
            icon: i(X),
            onOk() {
              return new Promise((y, s) => {
                P(`user/${m.ID}`, 'DELETE', null)
                  .then((f) => {
                    f && (N('update'), y(null))
                  })
                  .catch((f) => {
                    E.error(f), s(f)
                  })
              })
            },
          })
        }
      return (m, y) => {
        var h
        const s = r('a-tag'),
          f = r('a-avatar'),
          b = r('a-tooltip'),
          L = r('a-button')
        return (
          p(),
          v('div', me, [
            _.userinfo.Role === 1
              ? (p(),
                Q(
                  s,
                  {
                    key: 0,
                    class: 'bg-custom-01 position-absolute start-0 top-0 fs-7',
                  },
                  {
                    default: o(() => [D(u(m.$t('userrole.manager')), 1)]),
                    _: 1,
                  }
                ))
              : I('', !0),
            l('div', he, [
              i(
                f,
                {
                  src: _.userinfo.Image,
                  size: 100,
                  shape: 'square',
                  class: 'rounded-2',
                },
                { icon: o(() => [i(d(Y))]), _: 1 },
                8,
                ['src']
              ),
            ]),
            l('div', ge, u(_.userinfo.Name), 1),
            l('div', ye, u(_.userinfo.Description), 1),
            l('div', be, [
              i(
                b,
                { placement: 'bottom' },
                {
                  title: o(() => [l('span', null, u(_.userinfo.Phone), 1)]),
                  default: o(() => [xe]),
                  _: 1,
                }
              ),
              i(
                b,
                { placement: 'bottom' },
                {
                  title: o(() => [l('span', null, u(_.userinfo.Email), 1)]),
                  default: o(() => [ke]),
                  _: 1,
                }
              ),
            ]),
            l(
              'div',
              De,
              u(
                (h = _.userinfo.UserGroup) == null
                  ? void 0
                  : h.map(($) => $.Name).join('\xA0\xA0')
              ),
              1
            ),
            i(
              L,
              { block: !0, shape: 'round', type: 'primary', onClick: w },
              {
                icon: o(() => [we]),
                default: o(() => [D(' ' + u(m.$t('userdetail.edit')), 1)]),
                _: 1,
              }
            ),
            i(
              L,
              {
                block: !0,
                shape: 'round',
                type: 'danger',
                onClick: y[0] || (y[0] = ($) => U(_.userinfo)),
              },
              {
                icon: o(() => [$e]),
                default: o(() => [D(' ' + u(m.$t('userdetail.delete')), 1)]),
                _: 1,
              }
            ),
          ])
        )
      }
    },
  }),
  Ie = { class: 'fs-2 fw-bold mb-3' },
  Ee = { class: 'row gx-0 gap-1 mb-3' },
  Ne = l('span', { class: 'bi-plus-lg me-1' }, null, -1),
  Re = { class: 'hstack justify-content-center gap-1' },
  Ue = ['onClick'],
  Le = { key: 0, class: 'bi-check-lg', style: {} },
  ze = l('span', { class: 'bi-trash me-1' }, null, -1),
  Oe = { class: 'col-lg-2 ms-lg-auto' },
  Pe = l('span', { class: 'bi-search' }, null, -1),
  Te = { class: 'overflow-hidden' },
  je = { key: 0 },
  Me = {
    class: 'userlist row g-3 overflow-auto',
    style: { 'max-height': '700px' },
  },
  Be = ['onClick'],
  Ge = { class: 'd-flex position-relative' },
  Ve = { class: 'vstack gap-1' },
  qe = { class: 'd-flex align-items-center' },
  Ae = { class: 'me-1 fs-5 text-truncate', style: { 'max-width': '150px' } },
  Fe = { class: 'hstack gap-1 text-secondary fs-7' },
  Se = { class: 'bi-telephone' },
  He = { class: 'bi-envelope' },
  Je = { class: 'bi-line' },
  Ke = {
    key: 0,
    class: 'me-1 text-secondary text-truncate',
    style: { 'max-width': '150px' },
  },
  Qe = ['onClick'],
  We = { key: 0, class: 'icon bi-check-lg align-middle' },
  Xe = {
    key: 1,
    class: 'd-flex align-items-center justify-content-center',
    style: { height: '500px' },
  },
  et = H({
    setup(G) {
      const { t: N } = J(),
        _ = re(),
        { ismanager: R } = de(_),
        T = K()
      F(async () => {
        await m(), await f()
      })
      const w = x([]),
        U = x(!1),
        m = async () => {
          ;(U.value = !0),
            await P('room/', 'GET', null)
              .then((t) => {
                t && (w.value = t)
              })
              .catch((t) => {
                E.error(t)
              })
              .finally(() => {
                U.value = !1
              })
        },
        y = (t) => w.value.find((e) => e.ID === t).RoomNumber,
        s = pe({
          data: [],
          data_display: [],
          loading: !1,
          filtervalue: '',
          display_count: 20,
        })
      F(() => {})
      const f = async () => {
          ;(s.loading = !0),
            await P('user/', 'GET', null)
              .then((t) => {
                t && (s.data = t)
              })
              .catch((t) => {
                var e
                E.error((e = t.message) != null ? e : t)
              })
              .finally(() => {
                b(), (s.loading = !1)
              })
        },
        b = () => {
          let t = []
          s.filtervalue
            ? (t = s.data.filter(
                (e) =>
                  e.Name.includes(s.filtervalue) ||
                  e.Email.includes(s.filtervalue) ||
                  e.Phone.includes(s.filtervalue)
              ))
            : (t = [...s.data]),
            (s.data_display = t.slice(0, s.display_count))
        },
        L = () => {
          ;(s.display_count = s.display_count + 20), b()
        }
      _e(
        () => s.filtervalue,
        () => {
          b()
        }
      )
      const h = x(!1),
        $ = x({
          ID: '',
          Account: '',
          Name: '',
          Email: '',
          Phone: '',
          Role: 0,
          Image: '',
        }),
        Z = (t) => {
          ;($.value = t), (h.value = !0)
        },
        n = x([]),
        ee = (t) => {
          let e = n.value.indexOf(t)
          e === -1 ? n.value.push(t) : n.value.splice(e, 1)
        },
        C = x(!1),
        V = () => {
          if (C.value) {
            if (s.filtervalue) {
              let t = s.data
                .filter((e) => {
                  var c
                  return (
                    e.Name.includes(s.filtervalue) ||
                    ((c = e.Description) == null
                      ? void 0
                      : c.includes(s.filtervalue))
                  )
                })
                .map((e) => e.ID)
              n.value = n.value.filter((e) => t.indexOf(e) === -1)
            } else n.value = []
            C.value = !1
          } else {
            if (s.filtervalue) {
              let t = s.data
                .filter((e) => {
                  var c
                  return (
                    (e.Name.includes(s.filtervalue) ||
                      ((c = e.Description) == null
                        ? void 0
                        : c.includes(s.filtervalue))) &&
                    n.value.indexOf(e.ID) === -1
                  )
                })
                .map((e) => e.ID)
              n.value = [...n.value, ...t]
            } else n.value = s.data.map((t) => t.ID)
            C.value = !0
          }
        },
        te = () => {
          ;(h.value = !1), f()
        },
        se = () => {
          W.confirm({
            title: N('userlist.delete_title', { n: n.value.length }),
            icon: i(X),
            onOk() {
              return new Promise((t, e) => {
                P('user/deleteMultiUsers', 'DELETE', { DeleteIDList: n.value })
                  .then((c) => {
                    c &&
                      (E.success(N('userlist.delete_success')),
                      (n.value = []),
                      f(),
                      t(null))
                  })
                  .catch((c) => {
                    var z
                    E.error((z = c.message) != null ? z : c), e(c)
                  })
              })
            },
          })
        }
      return (t, e) => {
        const c = r('a-button'),
          z = r('a-badge'),
          le = r('a-input'),
          ae = r('a-avatar'),
          oe = r('a-tag'),
          j = r('a-tooltip'),
          ne = r('a-empty'),
          ie = r('a-skeleton'),
          ce = r('a-modal'),
          ue = fe('infinitescroll')
        return (
          p(),
          v(
            S,
            null,
            [
              l('div', Ie, u(t.$t('layout.user')), 1),
              l('div', Ee, [
                g(
                  i(
                    c,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-md-4 col-lg-3 col-xl-2',
                      onClick:
                        e[0] ||
                        (e[0] = (a) => d(T).push({ name: 'CreateUser' })),
                    },
                    {
                      icon: o(() => [Ne]),
                      default: o(() => [
                        D(' ' + u(t.$t('userlist.createuser')), 1),
                      ]),
                      _: 1,
                    },
                    512
                  ),
                  [[k, n.value.length == 0]]
                ),
                g(
                  i(
                    c,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-lg-3 col-xl-2',
                      onClick: M(V, ['stop']),
                    },
                    {
                      default: o(() => {
                        var a, O, q, A
                        return [
                          l('div', Re, [
                            l(
                              'span',
                              {
                                class: B([
                                  'bg-secondary rounded-1 border',
                                  C.value ||
                                  ((a = n.value) == null
                                    ? void 0
                                    : a.length) ===
                                    ((O = d(s).data) == null
                                      ? void 0
                                      : O.length)
                                    ? 'bg-info  border-info '
                                    : 'bg-secondary',
                                ]),
                                style: { width: '20px', height: '20px' },
                                onClick: M(V, ['stop']),
                              },
                              [
                                C.value ||
                                ((q = n.value) == null ? void 0 : q.length) ===
                                  ((A = d(s).data) == null ? void 0 : A.length)
                                  ? (p(), v('span', Le))
                                  : I('', !0),
                              ],
                              10,
                              Ue
                            ),
                            l('span', null, u(t.$t('button.selectall')), 1),
                            i(
                              z,
                              {
                                count: n.value.length,
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
                  [[k, n.value.length > 0 && d(R)]]
                ),
                g(
                  i(
                    c,
                    {
                      shape: 'round',
                      size: 'large',
                      class: 'col-md-4 col-lg-3 col-xl-2',
                      onClick: se,
                    },
                    {
                      icon: o(() => [ze]),
                      default: o(() => [
                        D(' ' + u(t.$t('userlist.deleteusers')), 1),
                      ]),
                      _: 1,
                    },
                    512
                  ),
                  [[k, n.value.length > 0 && d(R)]]
                ),
                l('div', Oe, [
                  i(
                    le,
                    {
                      value: d(s).filtervalue,
                      'onUpdate:value':
                        e[1] || (e[1] = (a) => (d(s).filtervalue = a)),
                      class: 'rounded-pill',
                    },
                    { prefix: o(() => [Pe]), _: 1 },
                    8,
                    ['value']
                  ),
                ]),
              ]),
              i(
                ie,
                { loading: d(s).loading, active: '' },
                {
                  default: o(() => [
                    g(
                      (p(),
                      v('div', Te, [
                        d(s).data_display.length > 0
                          ? (p(),
                            v('div', je, [
                              l('div', Me, [
                                (p(!0),
                                v(
                                  S,
                                  null,
                                  ve(
                                    d(s).data_display,
                                    (a) => (
                                      p(),
                                      v(
                                        'div',
                                        {
                                          key: a.ID,
                                          class: 'col-md-6 col-xl-4 col-xxl-3',
                                          style: { 'min-width': '400px' },
                                        },
                                        [
                                          l(
                                            'div',
                                            {
                                              style: { height: '120px' },
                                              class: B([
                                                'p-3 bg-dark rounded border',
                                                n.value.includes(a.ID)
                                                  ? 'border-info'
                                                  : '',
                                              ]),
                                              role: 'button',
                                              onClick: (O) => Z(a),
                                            },
                                            [
                                              l('div', Ge, [
                                                i(
                                                  ae,
                                                  {
                                                    src: a.Image,
                                                    size: 60,
                                                    class: 'my-auto me-3',
                                                  },
                                                  {
                                                    icon: o(() => [i(d(Y))]),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ['src']
                                                ),
                                                l('div', Ve, [
                                                  l('div', qe, [
                                                    l('span', Ae, u(a.Name), 1),
                                                    a.Role === 1
                                                      ? (p(),
                                                        Q(
                                                          oe,
                                                          {
                                                            key: 0,
                                                            class:
                                                              'bg-custom-01 rounded-1',
                                                          },
                                                          {
                                                            default: o(() => [
                                                              D(
                                                                u(
                                                                  t.$t(
                                                                    'userrole.manager'
                                                                  )
                                                                ),
                                                                1
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          }
                                                        ))
                                                      : I('', !0),
                                                  ]),
                                                  l('div', Fe, [
                                                    i(
                                                      j,
                                                      { title: a.Phone },
                                                      {
                                                        default: o(() => [
                                                          g(
                                                            l(
                                                              'span',
                                                              Se,
                                                              null,
                                                              512
                                                            ),
                                                            [[k, a.Phone]]
                                                          ),
                                                        ]),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['title']
                                                    ),
                                                    i(
                                                      j,
                                                      { title: a.Email },
                                                      {
                                                        default: o(() => [
                                                          g(
                                                            l(
                                                              'span',
                                                              He,
                                                              null,
                                                              512
                                                            ),
                                                            [[k, a.Email]]
                                                          ),
                                                        ]),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['title']
                                                    ),
                                                    i(
                                                      j,
                                                      { title: a.LineID },
                                                      {
                                                        default: o(() => [
                                                          g(
                                                            l(
                                                              'span',
                                                              Je,
                                                              null,
                                                              512
                                                            ),
                                                            [[k, a.LineID]]
                                                          ),
                                                        ]),
                                                        _: 2,
                                                      },
                                                      1032,
                                                      ['title']
                                                    ),
                                                  ]),
                                                  w.value
                                                    ? (p(),
                                                      v(
                                                        'div',
                                                        Ke,
                                                        u(y(a.Room)),
                                                        1
                                                      ))
                                                    : I('', !0),
                                                ]),
                                                l(
                                                  'div',
                                                  {
                                                    class: B([
                                                      'position-absolute top-0 end-0 bg-secondary rounded-1 text-center border',
                                                      n.value.includes(a.ID)
                                                        ? 'bg-info  border-info'
                                                        : 'bg-secondary',
                                                    ]),
                                                    style: {
                                                      width: '20px',
                                                      height: '20px',
                                                    },
                                                    onClick: M(
                                                      (O) => ee(a.ID),
                                                      ['stop']
                                                    ),
                                                  },
                                                  [
                                                    n.value.includes(a.ID)
                                                      ? (p(), v('span', We))
                                                      : I('', !0),
                                                  ],
                                                  10,
                                                  Qe
                                                ),
                                              ]),
                                            ],
                                            10,
                                            Be
                                          ),
                                        ]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]),
                            ]))
                          : (p(), v('div', Xe, [i(ne)])),
                      ])),
                      [
                        [
                          ue,
                          { func: L, target: '.userlist', delay: 300 },
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
              i(
                ce,
                {
                  visible: h.value,
                  'onUpdate:visible': e[4] || (e[4] = (a) => (h.value = a)),
                  footer: null,
                  width: '400px',
                },
                {
                  default: o(() => [
                    i(
                      Ce,
                      {
                        userinfo: $.value,
                        onClose: e[2] || (e[2] = (a) => (h.value = !1)),
                        onUpdate: e[3] || (e[3] = (a) => te()),
                      },
                      null,
                      8,
                      ['userinfo']
                    ),
                  ]),
                  _: 1,
                },
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
export { et as default }
