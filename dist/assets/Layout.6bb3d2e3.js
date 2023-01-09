/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
import { _ as q } from './Logo.0ba490b4.js'
import {
  d as z,
  g as D,
  u as X,
  r as i,
  o as a,
  c as _,
  a as s,
  w as o,
  F as k,
  b as V,
  e as b,
  f as y,
  t as v,
  h as R,
  i as Y,
  j as t,
  n as C,
  k as x,
  s as Z,
  l as $,
  m as ee,
  p as P,
  q as te,
  v as F,
  x as oe,
  y as K,
  z as N,
  $ as ne,
  A as se,
  B as ae,
} from './index.bb2aa403.js'
import { _ as O } from './plugin-vue_export-helper.21dcd24c.js'
import { U as le } from './UserOutlined.988971df.js'
const ie = { class: 'mt-3 text-end' },
  re = z({
    emits: ['close'],
    setup(r, { emit: m }) {
      const u = D(),
        f = () => {
          m('close')
        },
        { t: w, locale: e, availableLocales: d } = X({ useScope: 'global' }),
        g = () => {
          u.updatelang(e.value)
        }
      return (L, h) => {
        const S = i('a-radio'),
          I = i('a-radio-group'),
          B = i('a-button')
        return (
          a(),
          _(
            k,
            null,
            [
              s(
                I,
                {
                  value: R(e),
                  'onUpdate:value':
                    h[0] || (h[0] = (p) => (Y(e) ? (e.value = p) : null)),
                  onChange: g,
                },
                {
                  default: o(() => [
                    (a(!0),
                    _(
                      k,
                      null,
                      V(
                        R(d),
                        (p) => (
                          a(),
                          b(
                            S,
                            { key: p, value: p },
                            { default: o(() => [y(v(p), 1)]), _: 2 },
                            1032,
                            ['value']
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                  _: 1,
                },
                8,
                ['value']
              ),
              t('div', ie, [
                s(
                  B,
                  { type: 'primary', onClick: f },
                  { default: o(() => [y(v(L.$t('button.confirm')), 1)]), _: 1 }
                ),
              ]),
            ],
            64
          )
        )
      }
    },
  }),
  ue = z({
    props: {
      menuInfo: { type: Object, default: () => ({}) },
      collapsed: { type: Boolean, default: !1 },
    },
    setup(r) {
      return (m, u) => {
        const f = i('a-menu-item'),
          w = i('sub-menu', !0),
          e = i('a-sub-menu')
        return (
          a(),
          b(
            e,
            { key: r.menuInfo.key },
            {
              icon: o(() => [
                t(
                  'span',
                  {
                    class: C(['fs-4', r.menuInfo.icon]),
                    style: x([
                      r.collapsed ? '  margin-left:-10px ;' : '',
                      {
                        transition: '0.3s',
                        'transition-property': 'margin-left',
                      },
                    ]),
                  },
                  null,
                  6
                ),
              ]),
              title: o(() => [y(v(m.$t(r.menuInfo.title)), 1)]),
              default: o(() => [
                (a(!0),
                _(
                  k,
                  null,
                  V(
                    r.menuInfo.children,
                    (d) => (
                      a(),
                      _(
                        k,
                        { key: d.key },
                        [
                          d.children
                            ? (a(),
                              b(w, { 'menu-info': d, key: d.key }, null, 8, [
                                'menu-info',
                              ]))
                            : (a(),
                              b(
                                f,
                                { key: d.key },
                                {
                                  icon: o(() => [
                                    t(
                                      'i',
                                      { class: C([d.icon, 'fs-5']) },
                                      null,
                                      2
                                    ),
                                  ]),
                                  default: o(() => [
                                    y(' ' + v(m.$t(d.title)), 1),
                                  ]),
                                  _: 2,
                                },
                                1024
                              )),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              _: 1,
            }
          )
        )
      }
    },
  })
const de = { class: 'vstack h-100 overflow-hidden' },
  ce = { class: 'd-flex p-3 mt-1 align-items-center' },
  pe = { class: 'fs-5 text-truncate d-block', style: { 'max-width': '100px' } },
  _e = { key: 0, class: 'position-relative' },
  ve = z({
    props: { expand: { type: Boolean } },
    emits: ['closedrawer', 'changelanguage'],
    setup(r, { emit: m }) {
      const u = r,
        f = D(),
        { userinfo: w } = Z(f),
        e = $(!0),
        d = (c) => {
          u.expand || (e.value = c)
        },
        g = ee()
      P(() => {
        ;(h.value = [g.name.toString()]), (e.value = !u.expand)
      }),
        te(
          () => g.name,
          () => {
            h.value = [g.name.toString()]
          }
        )
      const L = [
          { key: 'Home', title: 'layout.home', icon: 'icon-home' },
          { key: 'UserList', title: 'layout.user', icon: 'bi-people-fill' },
          {
            key: 'RoomList',
            title: 'layout.room',
            icon: 'bi-door-closed-fill',
          },
          {
            key: 'PaymentList',
            title: 'layout.payment',
            icon: 'bi-currency-dollar',
          },
        ],
        h = $(['']),
        S = $(['']),
        I = F(),
        B = (c) => {
          I.push({ name: c.key.toString() })
        },
        p = $(!1),
        T = (c) => {
          switch (c.key) {
            case 'Profile':
              I.push({ name: 'EditUser', query: { id: w.value.ID } })
              break
            case 'ChangeLanguage':
              p.value = !0
              break
            case 'Logout':
              ne()
              break
          }
        }
      P(() => {
        window.addEventListener('resize', E)
      }),
        oe(() => {
          window.removeEventListener('resize', E)
        })
      function E() {
        !e.value && window.innerWidth < 1400 && (e.value = !0)
      }
      return (c, l) => {
        const U = i('a-menu-item'),
          M = i('a-menu'),
          W = i('a-avatar'),
          A = i('a-menu-divider'),
          H = i('a-dropdown'),
          G = i('a-layout-sider'),
          J = re,
          Q = i('a-modal')
        return (
          a(),
          _(
            k,
            null,
            [
              s(
                G,
                {
                  collapsed: e.value,
                  'onUpdate:collapsed': l[4] || (l[4] = (n) => (e.value = n)),
                  collapsedWidth: 100,
                  class: 'vh-100 overflow-auto',
                },
                {
                  default: o(() => [
                    !e.value && u.expand
                      ? (a(),
                        _('div', {
                          key: 0,
                          onClick:
                            l[0] ||
                            (l[0] = K(
                              (n) => m('closedrawer'),
                              ['stop', 'prevent']
                            )),
                          class:
                            'position-absolute end-0 top-0 icon-cancel fs-4 m-3 cursor-pointer',
                        }))
                      : N('', !0),
                    t('div', de, [
                      t('div', ce, [
                        t(
                          'img',
                          {
                            src: q,
                            style: x(
                              e.value
                                ? 'width:60px;  margin-left:0px'
                                : 'width:56px;margin-right:5px;'
                            ),
                          },
                          null,
                          4
                        ),
                        t(
                          'span',
                          {
                            style: x([
                              e.value ? 'opacity :0;display:none' : '',
                              {
                                transition:
                                  'display 1s ease-out, opacity 0.3s linear',
                              },
                            ]),
                            class: 'fs-3 fw-bold',
                          },
                          'RMS',
                          4
                        ),
                      ]),
                      s(
                        M,
                        {
                          openKeys: S.value,
                          'onUpdate:openKeys':
                            l[1] || (l[1] = (n) => (S.value = n)),
                          selectedKeys: h.value,
                          'onUpdate:selectedKeys':
                            l[2] || (l[2] = (n) => (h.value = n)),
                          mode: 'inline',
                          theme: 'dark',
                          class: 'overflow-auto',
                          onClick: B,
                        },
                        {
                          default: o(() => [
                            (a(),
                            _(
                              k,
                              null,
                              V(
                                L,
                                (n) => (
                                  a(),
                                  _(
                                    k,
                                    { key: n.key },
                                    [
                                      n.children
                                        ? (a(),
                                          b(
                                            ue,
                                            {
                                              collapsed: e.value,
                                              key: n.key,
                                              'menu-info': n,
                                              class: 'mb-1',
                                            },
                                            null,
                                            8,
                                            ['collapsed', 'menu-info']
                                          ))
                                        : (a(),
                                          b(
                                            U,
                                            {
                                              key: n.key,
                                              class: C([
                                                'py-2 my-0 rounded-start',
                                                e.value ? 'ms-1' : '',
                                              ]),
                                              style: { height: '65px' },
                                            },
                                            {
                                              icon: o(() => [
                                                t(
                                                  'span',
                                                  {
                                                    class: C([n.icon, 'fs-3']),
                                                    style: x([
                                                      e.value
                                                        ? '  margin-left:-10px ;'
                                                        : '',
                                                      {
                                                        transition: '0.3s',
                                                        'transition-property':
                                                          'margin-left',
                                                      },
                                                    ]),
                                                  },
                                                  null,
                                                  6
                                                ),
                                              ]),
                                              default: o(() => [
                                                y(' ' + v(c.$t(n.title)), 1),
                                              ]),
                                              _: 2,
                                            },
                                            1032,
                                            ['class']
                                          )),
                                    ],
                                    64
                                  )
                                )
                              ),
                              64
                            )),
                          ]),
                          _: 1,
                        },
                        8,
                        ['openKeys', 'selectedKeys']
                      ),
                      s(
                        H,
                        { class: 'border-top border-secondary p-3 mt-auto' },
                        {
                          overlay: o(() => [
                            s(
                              M,
                              { onClick: T },
                              {
                                default: o(() => [
                                  s(
                                    U,
                                    { key: 'Profile' },
                                    {
                                      default: o(() => [
                                        y(v(c.$t('layout.profile')), 1),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                  s(
                                    U,
                                    { key: 'ChangeLanguage' },
                                    {
                                      default: o(() => [
                                        y(v(c.$t('layout.language')), 1),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                  s(A),
                                  s(
                                    U,
                                    { key: 'Logout' },
                                    {
                                      default: o(() => [
                                        y(v(c.$t('layout.logout')), 1),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                          default: o(() => [
                            t(
                              'div',
                              {
                                class:
                                  'ant-dropdown-link fw-bold text-white hstack',
                                onClick:
                                  l[3] || (l[3] = K(() => {}, ['prevent'])),
                                style: { width: '200px' },
                              },
                              [
                                s(
                                  W,
                                  { class: 'me-3 ms-1' },
                                  { icon: o(() => [s(R(le))]), _: 1 }
                                ),
                                t(
                                  'div',
                                  {
                                    style: x([
                                      e.value ? 'opacity :0;' : '',
                                      {
                                        transition:
                                          'opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),',
                                      },
                                    ]),
                                  },
                                  [t('span', pe, v(R(w).Name), 1)],
                                  4
                                ),
                              ]
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ['collapsed']
              ),
              u.expand
                ? N('', !0)
                : (a(),
                  _('div', _e, [
                    t(
                      'div',
                      {
                        class:
                          'position-absolute bg-hover rounded-circle bg-dark text-center cursor-pointer',
                        style: {
                          bottom: '85px',
                          right: '-15px',
                          width: '28px',
                          height: '28px',
                        },
                        onClick:
                          l[5] || (l[5] = K((n) => d(!e.value), ['prevent'])),
                      },
                      [
                        t(
                          'span',
                          {
                            class: C(
                              e.value
                                ? 'bi bi-chevron-right'
                                : 'bi bi-chevron-left'
                            ),
                            style: { 'line-height': '28px' },
                          },
                          null,
                          2
                        ),
                      ]
                    ),
                  ])),
              s(
                Q,
                {
                  visible: p.value,
                  'onUpdate:visible': l[7] || (l[7] = (n) => (p.value = n)),
                  title: c.$t('layout.changelanguage'),
                  footer: null,
                },
                {
                  default: o(() => [
                    s(J, { onClose: l[6] || (l[6] = (n) => (p.value = !1)) }),
                  ]),
                  _: 1,
                },
                8,
                ['visible', 'title']
              ),
            ],
            64
          )
        )
      }
    },
  })
var j = O(ve, [['__scopeId', 'data-v-aec45a06']])
const me = (r) => (se('data-v-1a559f3f'), (r = r()), ae(), r),
  fe = { style: { 'min-height': '100vh' } },
  ye = {
    class: 'navbar px-1 py-1 bg-dark position-sticky top-0 d-md-none',
    style: { 'z-index': '2' },
  },
  ge = { class: 'container-fluid px-0' },
  he = me(() =>
    t(
      'div',
      { class: 'd-flex align-items-center' },
      [
        t('img', { src: q, class: 'me-1', style: { width: '32px' } }),
        t('span', { class: 'fs-5 fw-bold' }, 'RMS'),
      ],
      -1
    )
  ),
  ke = { style: { width: '60px' }, class: 'd-md-none' },
  be = { class: 'd-flex h-100' },
  we = { class: 'd-none d-md-block' },
  xe = {
    class:
      'flex-grow-1 overflow-auto vh-100 p-3 px-sm-4 px-md-5 px-lg-6 px-xl-7 pt-xl-6',
  },
  $e = { class: 'overflow-auto vh-100' },
  Ce = z({
    setup(r) {
      const m = F()
      window.onpopstate = () => {
        m.currentRoute.value.meta.allowBack === !1 && history.go(1)
      }
      const u = $(!1),
        f = () => {
          u.value = !1
        }
      return (w, e) => {
        const d = i('router-view'),
          g = i('a-drawer')
        return (
          a(),
          _('div', fe, [
            t('nav', ye, [
              t('div', ge, [
                he,
                t('div', ke, [
                  t('span', {
                    id: 'nav_burger',
                    onClick: e[0] || (e[0] = (L) => (u.value = !u.value)),
                  }),
                ]),
              ]),
            ]),
            t('div', be, [
              t('div', we, [s(j, { expand: !1 })]),
              t('div', xe, [s(d)]),
            ]),
            s(
              g,
              {
                width: 200,
                closable: !1,
                placement: 'left',
                visible: u.value,
                bodyStyle: { padding: 0 },
                onClose: f,
              },
              {
                default: o(() => [
                  t('div', $e, [
                    u.value
                      ? (a(), b(j, { key: 0, expand: !0, onClosedrawer: f }))
                      : N('', !0),
                  ]),
                ]),
                _: 1,
              },
              8,
              ['visible']
            ),
          ])
        )
      }
    },
  })
var Re = O(Ce, [['__scopeId', 'data-v-1a559f3f']])
export { Re as default }
