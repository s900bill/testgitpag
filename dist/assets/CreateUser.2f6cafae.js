/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
var re = Object.defineProperty
var F = Object.getOwnPropertySymbols
var ne = Object.prototype.hasOwnProperty,
  ue = Object.prototype.propertyIsEnumerable
var Y = (b, d, n) =>
    d in b
      ? re(b, d, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (b[d] = n),
  z = (b, d) => {
    for (var n in d || (d = {})) ne.call(d, n) && Y(b, n, d[n])
    if (F) for (var n of F(d)) ue.call(d, n) && Y(b, n, d[n])
    return b
  }
import {
  d as ie,
  v as de,
  g as me,
  u as fe,
  l as P,
  H as D,
  R as I,
  Q as $,
  L as O,
  q as pe,
  p as ce,
  D as E,
  G as k,
  N as ve,
  r as m,
  o as L,
  c as S,
  j as R,
  t as c,
  a as l,
  w as s,
  h as a,
  O as f,
  e as B,
  P as be,
  n as _e,
  F as ye,
  b as ge,
  f as v,
  y as Pe,
} from './index.b63768f2.js'
import { U as we } from './UserOutlined.f4c43dba.js'
import { L as G } from './LockOutlined.3f9bdde4.js'
const ke = { key: 0 },
  $e = { class: 'hstack gap-1 pb-1' },
  Le = { class: 'fs-5' },
  Re = { class: 'position-relative m-3 d-inline-flex' },
  je = ie({
    setup(b) {
      const d = de()
      me()
      const { t: n } = fe(),
        q = P(),
        V = () => {
          window.history.go(-1)
        },
        N = D({
          ID: '',
          Account: '',
          Name: '',
          Description: '',
          Password: '',
          ConfirmPassword: '',
          Email: '',
          Phone: '',
          LineID: '',
          Role: I.User,
          LeaseType: $.monthly,
          Rent: 0,
          Image: '',
        }),
        o = D(z({}, N)),
        w = P([O(), O().add(1, 'y')])
      pe(
        w,
        (t, e) => {
          var u, _
          t !== null
            ? ((o.LeaseStart =
                (u = w.value[0]) == null ? void 0 : u.format('YYYY/MM/DD')),
              (o.LeaseEnd =
                (_ = w.value[1]) == null ? void 0 : _.format('YYYY/MM/DD')))
            : ((o.LeaseStart = null), (o.LeaseEnd = null))
        },
        { immediate: !0 }
      ),
        ce(() => {
          Z()
        })
      const T = P([]),
        j = P(!1),
        Z = () => {
          ;(j.value = !0),
            E('room/', 'GET', null)
              .then((t) => {
                t && (T.value = t)
              })
              .catch((t) => {
                k.error(t)
              })
              .finally(() => {
                j.value = !1
              })
        }
      let H = async (t, e) =>
        e === ''
          ? Promise.reject(n('edituser.validate_account_require'))
          : (await Q(e))
          ? Promise.resolve()
          : Promise.reject(n('edituser.validate_account_repeat'))
      const Q = async (t) => {
          let e = !1
          return (
            await E(`user/checkAccountRepeat/${t}`, 'GET', null)
              .then((u) => {
                e = u
              })
              .catch((u) => {
                k.error(u), (e = !1)
              }),
            e
          )
        },
        J = D({
          Account: [{ required: !0, validator: H }],
          Name: [
            {
              required: !0,
              validator: async (t, e) =>
                e === ''
                  ? Promise.reject(n('edituser.validate_name_require'))
                  : Promise.resolve(),
            },
          ],
          Password: [
            {
              required: !0,
              validator: async (t, e) => {
                if (e === '')
                  return Promise.reject(n('edituser.validate_password_require'))
              },
            },
          ],
          ConfirmPassword: [
            {
              required: !0,
              validator: async (t, e) =>
                e === ''
                  ? Promise.reject(
                      n('edituser.validate_confirmpassword_require')
                    )
                  : e !== o.Password
                  ? Promise.reject(n('edituser.validate_confirmpassword_error'))
                  : Promise.resolve(),
            },
          ],
          Phone: [
            {
              required: !1,
              validator: async (t, e) => {
                if (e) {
                  var u = new RegExp('^[0-9]*$')
                  return u.test(e)
                    ? Promise.resolve()
                    : Promise.reject(n('edituser.validate_phone'))
                }
                return Promise.resolve()
              },
            },
          ],
          Email: [
            {
              required: !1,
              type: 'email',
              validator: async (t, e) => {
                if (e) {
                  var u =
                    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
                  return u.test(e)
                    ? Promise.resolve()
                    : Promise.reject(n('edituser.validate_email'))
                }
                return Promise.resolve()
              },
            },
          ],
        }),
        K = { wrapperCol: { md: { span: 20 }, xl: { span: 22 } } },
        W = ve.useForm,
        { validate: X, validateInfos: p } = W(o, J),
        A = P(!1),
        x = () => {
          ;(A.value = !0),
            X()
              .then(() => {
                E('user/create', 'POST', o)
                  .then((t) => {
                    t && (U.value = !0)
                  })
                  .catch((t) => {
                    k.error(t)
                  })
                  .finally(() => {
                    A.value = !1
                  })
              })
              .catch(() => {
                q.value.scrollToField()
              })
        },
        U = P(!1),
        ee = () => {
          Object.assign(o, N), (U.value = !1)
        },
        ae = (t) => {
          const u = [
            'image/apng',
            'image/bmp',
            'image/gif',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/webp',
            'image/x-icon',
          ].includes(t.type)
          u || k.error(n('upload.notimage'))
          const _ = t.size / 1024 / 1024 < 2
          return _ || k.error(n('upload.over2M')), u && _
        },
        te = (t) => {
          be(t.file, (e) => {
            o.Image = e
          })
        }
      return (t, e) => {
        const u = m('a-avatar'),
          _ = m('a-upload'),
          y = m('a-input'),
          i = m('a-form-item'),
          M = m('a-input-password'),
          g = m('a-select-option'),
          h = m('a-select'),
          le = m('a-range-picker'),
          C = m('a-button'),
          oe = m('a-form'),
          se = m('a-result')
        return U.value
          ? (L(),
            B(
              se,
              {
                key: 1,
                status: 'success',
                title: t.$t('edituser.successcreate') + ': ' + a(o).Name,
              },
              {
                extra: s(() => [
                  l(
                    C,
                    {
                      type: 'primary',
                      onClick:
                        e[14] ||
                        (e[14] = () => {
                          a(d).push({ name: 'UserList' })
                        }),
                    },
                    {
                      default: s(() => [v(c(t.$t('button.confirm')), 1)]),
                      _: 1,
                    }
                  ),
                  l(
                    C,
                    { onClick: e[15] || (e[15] = (r) => ee()) },
                    {
                      default: s(() => [v(c(t.$t('edituser.createnext')), 1)]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              },
              8,
              ['title']
            ))
          : (L(),
            S('div', ke, [
              R('div', $e, [
                R('span', {
                  class: 'icon-arrow-left fs-5 text-hover cursor-pointer',
                  onClick: e[0] || (e[0] = (r) => V()),
                }),
                R('div', Le, c(t.$t('button.back')), 1),
              ]),
              R('div', Re, [
                l(
                  u,
                  { src: a(o).Image, size: 90 },
                  { icon: s(() => [l(a(we))]), _: 1 },
                  8,
                  ['src']
                ),
                l(
                  _,
                  {
                    name: 'avatar',
                    multiple: !1,
                    customRequest: te,
                    class: 'avatar-uploader',
                    'show-upload-list': !1,
                    'before-upload': ae,
                  },
                  {
                    default: s(() => [
                      l(
                        u,
                        {
                          size: 40,
                          class: _e([
                            a(o).Image ? 'icon-pencil' : 'bi-plus-lg',
                            'position-absolute end-0 bottom-0 rounded-circle bg-secondary cursor-pointer bg-hover',
                          ]),
                        },
                        null,
                        8,
                        ['class']
                      ),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              l(
                oe,
                f({ ref_key: 'formRef', ref: q, model: a(o) }, K, {
                  layout: 'vertical',
                  scrollToFirstError: !0,
                }),
                {
                  default: s(() => [
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.account'),
                          name: 'Account',
                        },
                        a(p).Account
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Account,
                              'onUpdate:value':
                                e[1] || (e[1] = (r) => (a(o).Account = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.name'),
                          name: 'Name',
                        },
                        a(p).Name
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Name,
                              'onUpdate:value':
                                e[2] || (e[2] = (r) => (a(o).Name = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      {
                        'has-feedback': '',
                        label: t.$t('edituser.description'),
                        name: 'Description',
                      },
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Description,
                              'onUpdate:value':
                                e[3] || (e[3] = (r) => (a(o).Description = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.password'),
                          name: 'Password',
                        },
                        a(p).Password
                      ),
                      {
                        default: s(() => [
                          l(
                            M,
                            {
                              value: a(o).Password,
                              'onUpdate:value':
                                e[4] || (e[4] = (r) => (a(o).Password = r)),
                              autocomplete: 'off',
                            },
                            {
                              prefix: s(() => [
                                l(a(G), { class: 'site-form-item-icon' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.confirmpassword'),
                          name: 'ConfirmPassword',
                        },
                        a(p).ConfirmPassword
                      ),
                      {
                        default: s(() => [
                          l(
                            M,
                            {
                              value: a(o).ConfirmPassword,
                              'onUpdate:value':
                                e[5] ||
                                (e[5] = (r) => (a(o).ConfirmPassword = r)),
                              autocomplete: 'off',
                            },
                            {
                              prefix: s(() => [
                                l(a(G), { class: 'site-form-item-icon' }),
                              ]),
                              _: 1,
                            },
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.phone'),
                          name: 'Phone',
                        },
                        a(p).Phone
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Phone,
                              'onUpdate:value':
                                e[6] || (e[6] = (r) => (a(o).Phone = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.email'),
                          name: 'Email',
                        },
                        a(p).Email
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Email,
                              'onUpdate:value':
                                e[7] || (e[7] = (r) => (a(o).Email = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: 'Line ID',
                          name: 'LineID',
                        },
                        a(p).LineID
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).LineID,
                              'onUpdate:value':
                                e[8] || (e[8] = (r) => (a(o).LineID = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.room'),
                          name: 'Room',
                        },
                        a(p).Room
                      ),
                      {
                        default: s(() => [
                          l(
                            h,
                            {
                              value: a(o).Room,
                              'onUpdate:value':
                                e[9] || (e[9] = (r) => (a(o).Room = r)),
                              optionFilterProp: 'label',
                            },
                            {
                              default: s(() => [
                                (L(!0),
                                S(
                                  ye,
                                  null,
                                  ge(
                                    T.value,
                                    (r) => (
                                      L(),
                                      B(
                                        g,
                                        { key: r.ID, value: r.ID },
                                        {
                                          default: s(() => [
                                            v(c(r.RoomNumber), 1),
                                          ]),
                                          _: 2,
                                        },
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
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      { 'has-feedback': '', label: t.$t('edituser.leaseterm') },
                      {
                        default: s(() => [
                          l(
                            le,
                            {
                              value: w.value,
                              'onUpdate:value':
                                e[10] || (e[10] = (r) => (w.value = r)),
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.leasetype'),
                          name: 'LeaseType',
                        },
                        a(p).LeaseType
                      ),
                      {
                        default: s(() => [
                          l(
                            h,
                            {
                              value: a(o).LeaseType,
                              'onUpdate:value':
                                e[11] || (e[11] = (r) => (a(o).LeaseType = r)),
                            },
                            {
                              default: s(() => [
                                l(
                                  g,
                                  { value: a($).monthly },
                                  {
                                    default: s(() => [
                                      v(c(t.$t('leasetype.monthly')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                                l(
                                  g,
                                  { value: a($).quarterly },
                                  {
                                    default: s(() => [
                                      v(c(t.$t('leasetype.quarterly')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                                l(
                                  g,
                                  { value: a($).annually },
                                  {
                                    default: s(() => [
                                      v(c(t.$t('leasetype.annually')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      f(
                        {
                          'has-feedback': '',
                          label: t.$t('edituser.rent'),
                          name: 'Rent',
                        },
                        a(p).Rent
                      ),
                      {
                        default: s(() => [
                          l(
                            y,
                            {
                              value: a(o).Rent,
                              'onUpdate:value':
                                e[12] || (e[12] = (r) => (a(o).Rent = r)),
                              autocomplete: 'off',
                            },
                            null,
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      16,
                      ['label']
                    ),
                    l(
                      i,
                      {
                        'has-feedback': '',
                        label: t.$t('edituser.role'),
                        name: 'Role',
                      },
                      {
                        default: s(() => [
                          l(
                            h,
                            {
                              value: a(o).Role,
                              'onUpdate:value':
                                e[13] || (e[13] = (r) => (a(o).Role = r)),
                            },
                            {
                              default: s(() => [
                                l(
                                  g,
                                  { value: a(I).Manager },
                                  {
                                    default: s(() => [
                                      v(c(t.$t('userrole.manager')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                                l(
                                  g,
                                  { value: a(I).User },
                                  {
                                    default: s(() => [
                                      v(c(t.$t('userrole.user')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ['value']
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['label']
                    ),
                    l(i, null, {
                      default: s(() => [
                        l(
                          C,
                          {
                            type: 'primary',
                            class: 'bg-info border-info',
                            onClick: Pe(x, ['prevent']),
                          },
                          {
                            default: s(() => [v(c(t.$t('button.create')), 1)]),
                            _: 1,
                          },
                          8,
                          ['onClick']
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                16,
                ['model']
              ),
            ]))
      }
    },
  })
export { je as default }
