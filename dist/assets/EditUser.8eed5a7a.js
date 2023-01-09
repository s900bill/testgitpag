/**
 * name: rms
 * version: v0.0.0
 * description: v
 * author: s900bill
 */
var we = Object.defineProperty
var H = Object.getOwnPropertySymbols
var ge = Object.prototype.hasOwnProperty,
  be = Object.prototype.propertyIsEnumerable
var J = (g, d, m) =>
    d in g
      ? we(g, d, { enumerable: !0, configurable: !0, writable: !0, value: m })
      : (g[d] = m),
  j = (g, d) => {
    for (var m in d || (d = {})) ge.call(d, m) && J(g, m, d[m])
    if (H) for (var m of H(d)) be.call(d, m) && J(g, m, d[m])
    return g
  }
import {
  d as Pe,
  m as _e,
  g as ye,
  s as he,
  u as Ce,
  H as I,
  l as y,
  L as N,
  q as ke,
  p as $e,
  D as L,
  G as v,
  N as K,
  r as c,
  o as q,
  c as Q,
  j as R,
  t as w,
  a as s,
  w as r,
  h as t,
  O as b,
  F as W,
  P as Ie,
  n as Le,
  b as Re,
  Q as F,
  f as P,
  y as X,
  J as Ne,
  K as De,
  e as Ue,
} from './index.b57dc02a.js'
import { L as S } from './LockOutlined.ac15cdcc.js'
import { U as Te } from './UserOutlined.2bdfa3bc.js'
const Ee = { class: 'hstack gap-1 pb-1' },
  je = { class: 'fs-5' },
  qe = R('div', null, null, -1),
  Fe = { class: 'position-relative m-3 d-inline-flex' },
  He = Pe({
    setup(g) {
      const d = _e(),
        m = ye()
      he(m)
      const { t: u } = Ce(),
        x = () => {
          window.history.go(-1)
        },
        ee = d.query.id.toString()
      let M = {
        ID: '',
        Account: '',
        Name: '',
        Email: '',
        Phone: '',
        Role: 0,
        Image: '',
        Room: 0,
        LeaseType: 0,
        Rent: 0,
      }
      const o = I({
          ID: '',
          Account: '',
          Name: '',
          Email: '',
          Phone: '',
          Role: 0,
          Image: '',
          Room: 0,
          LeaseType: 0,
          Rent: 0,
        }),
        h = y([N(), N().add(1, 'y')])
      ke(h, (e, a) => {
        var i, p
        e !== null
          ? ((o.LeaseStart =
              (i = h.value[0]) == null ? void 0 : i.format('YYYY/MM/DD')),
            (o.LeaseEnd =
              (p = h.value[1]) == null ? void 0 : p.format('YYYY/MM/DD')))
          : ((o.LeaseStart = null), (o.LeaseEnd = null))
      }),
        $e(async () => {
          await O(), await ae()
        })
      const D = y(!1),
        C = y(!1),
        O = () => {
          ;(D.value = !0),
            L(`user/${ee}`, 'GET', null)
              .then((e) => {
                e &&
                  ((M = j({}, e)),
                  Object.assign(o, e),
                  (h.value = [N(o.LeaseStart), N(o.LeaseEnd)]))
              })
              .catch((e) => {
                v.error(e)
              })
              .finally(() => {
                D.value = !1
              })
        },
        Y = y([]),
        z = y(!1),
        ae = () => {
          ;(z.value = !0),
            L('room/', 'GET', null)
              .then((e) => {
                e && (Y.value = e)
              })
              .catch((e) => {
                v.error(e)
              })
              .finally(() => {
                z.value = !1
              })
        },
        se = I({
          Name: [
            {
              required: !0,
              validator: async (e, a) =>
                a === M.Name
                  ? Promise.resolve()
                  : a === ''
                  ? Promise.reject(u('edituser.validate_name_require'))
                  : Promise.resolve(),
              trigger: 'change',
            },
          ],
          Phone: [
            {
              required: !1,
              validator: async (e, a) => {
                if (a) {
                  var i = new RegExp('^[0-9]*$')
                  return i.test(a)
                    ? Promise.resolve()
                    : Promise.reject(u('edituser.validate_phone'))
                }
                return Promise.resolve()
              },
              trigger: 'change',
            },
          ],
          Email: [
            {
              required: !1,
              type: 'email',
              validator: async (e, a) => {
                if (a) {
                  var i =
                    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
                  return i.test(a)
                    ? Promise.resolve()
                    : Promise.reject(u('edituser.validate_email'))
                }
                return Promise.resolve()
              },
              trigger: 'change',
            },
          ],
        }),
        te = { wrapperCol: { md: { span: 20 }, xl: { span: 22 } } },
        oe = K.useForm,
        { validate: re, validateInfos: _ } = oe(o, se),
        le = () => {
          re()
            .then(() => {
              console.log(o.ID),
                L(`user/${o.ID}`, 'PUT', o)
                  .then((e) => {
                    e && (v.success(u('edituser.successedit')), O())
                  })
                  .catch((e) => {
                    v.error(e)
                  })
                  .finally(() => {
                    D.value = !1
                  })
            })
            .catch((e) => {
              console.log('error', e)
            })
        },
        A = y(!1),
        ne = (e) => {
          const i = [
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
          ].includes(e.type)
          i || v.error(u('upload.notimage'))
          const p = e.size / 1024 / 1024 < 2
          return p || v.error(u('upload.over2M')), i && p
        },
        ie = (e) => {
          ;(A.value = !0),
            Ie(e.file, (a) => {
              ;(o.Image = a), (A.value = !1)
            })
        },
        B = I({ CurrentPassword: '', NewPassword: '', ConfirmPassword: '' }),
        f = I(j({}, B)),
        ue = async (e, a) =>
          a === ''
            ? Promise.reject(u('edituser.validate_currentpassword_require'))
            : (await de(a))
            ? Promise.resolve()
            : Promise.reject(u('edituser.validate_currentpassword_error')),
        de = async (e) => {
          let a = !1,
            i = { ID: o.ID, Password: e }
          return (
            await L('user/checkUserPassword', 'POST', i)
              .then((p) => {
                a = p
              })
              .catch((p) => {
                v.error(p)
              }),
            a
          )
        },
        G = I({
          CurrentPassword: [{ required: !0, validator: ue, trigger: 'blur' }],
          NewPassword: [
            {
              required: !0,
              validator: async (e, a) =>
                a === ''
                  ? Promise.reject(u('edituser.validate_newpassword_require'))
                  : a === f.CurrentPassword
                  ? Promise.reject(u('edituser.validate_newpassword_repeat'))
                  : Promise.resolve(),
              trigger: 'blur',
            },
          ],
          ConfirmPassword: [
            {
              required: !0,
              validator: async (e, a) =>
                a === ''
                  ? Promise.reject(
                      u('edituser.validate_confirmpassword_require')
                    )
                  : a !== f.NewPassword
                  ? Promise.reject(u('edituser.validate_confirmpassword_error'))
                  : Promise.resolve(),
              trigger: 'blur',
            },
          ],
        }),
        me = () => {
          Object.assign(f, B)
        },
        fe = K.useForm(f, G),
        U = y(!1),
        pe = () => {
          ;(U.value = !0),
            fe
              .validate()
              .then(() => {
                L(`user/changeUserPassword/${o.ID}`, 'PUT', {
                  newPassword: f.NewPassword,
                })
                  .then((e) => {
                    e &&
                      (v.success(u('edituser.success_changepassword')),
                      (C.value = !1))
                  })
                  .catch((e) => {
                    v.error(e)
                  })
              })
              .catch((e) => {})
              .finally(() => {
                U.value = !1
              })
        }
      return (e, a) => {
        const i = c('a-avatar'),
          p = c('a-upload'),
          k = c('a-input'),
          n = c('a-form-item'),
          $ = c('a-select-option'),
          T = c('a-select'),
          ce = c('a-range-picker'),
          V = c('a-button'),
          Z = c('a-form'),
          E = c('a-input-password'),
          ve = c('a-modal')
        return (
          q(),
          Q(
            W,
            null,
            [
              R('div', Ee, [
                R('span', {
                  class: 'icon-arrow-left fs-5 text-hover cursor-pointer',
                  onClick: a[0] || (a[0] = (l) => x()),
                }),
                R('div', je, w(e.$t('edituser.title')), 1),
                qe,
              ]),
              R('div', Fe, [
                s(
                  i,
                  { src: t(o).Image, size: 100 },
                  { icon: r(() => [s(t(Te))]), _: 1 },
                  8,
                  ['src']
                ),
                s(
                  p,
                  {
                    name: 'avatar',
                    multiple: !1,
                    customRequest: ie,
                    class: 'avatar-uploader',
                    'show-upload-list': !1,
                    'before-upload': ne,
                  },
                  {
                    default: r(() => [
                      s(
                        i,
                        {
                          size: 40,
                          class: Le([
                            t(o).Image ? 'icon-pencil' : 'bi-plus-lg',
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
              s(
                Z,
                b({ ref: 'formRef', model: t(o) }, te, { layout: 'vertical' }),
                {
                  default: r(() => [
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.name'),
                          name: 'Name',
                        },
                        t(_).Name
                      ),
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).Name,
                              'onUpdate:value':
                                a[1] || (a[1] = (l) => (t(o).Name = l)),
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
                    s(
                      n,
                      {
                        'has-feedback': '',
                        label: e.$t('edituser.description'),
                        name: 'Description',
                      },
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).Description,
                              'onUpdate:value':
                                a[2] || (a[2] = (l) => (t(o).Description = l)),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.phone'),
                          name: 'Phone',
                        },
                        t(_).Phone
                      ),
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).Phone,
                              'onUpdate:value':
                                a[3] || (a[3] = (l) => (t(o).Phone = l)),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.email'),
                          name: 'Email',
                        },
                        t(_).Email
                      ),
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).Email,
                              'onUpdate:value':
                                a[4] || (a[4] = (l) => (t(o).Email = l)),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: 'Line ID',
                          name: 'LineID',
                        },
                        t(_).LineID
                      ),
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).LineID,
                              'onUpdate:value':
                                a[5] || (a[5] = (l) => (t(o).LineID = l)),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.room'),
                          name: 'Room',
                        },
                        t(_).Room
                      ),
                      {
                        default: r(() => [
                          s(
                            T,
                            {
                              value: t(o).Room,
                              'onUpdate:value':
                                a[6] || (a[6] = (l) => (t(o).Room = l)),
                              optionFilterProp: 'RoomNumber',
                              allowClear: '',
                            },
                            {
                              default: r(() => [
                                (q(!0),
                                Q(
                                  W,
                                  null,
                                  Re(
                                    Y.value,
                                    (l) => (
                                      q(),
                                      Ue(
                                        $,
                                        { key: l.ID, value: l.ID },
                                        {
                                          default: r(() => [
                                            P(w(l.RoomNumber), 1),
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
                    s(
                      n,
                      { 'has-feedback': '', label: e.$t('edituser.leaseterm') },
                      {
                        default: r(() => [
                          s(
                            ce,
                            {
                              value: h.value,
                              'onUpdate:value':
                                a[7] || (a[7] = (l) => (h.value = l)),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.leasetype'),
                          name: 'LeaseType',
                        },
                        t(_).LeaseType
                      ),
                      {
                        default: r(() => [
                          s(
                            T,
                            {
                              value: t(o).LeaseType,
                              'onUpdate:value':
                                a[8] || (a[8] = (l) => (t(o).LeaseType = l)),
                            },
                            {
                              default: r(() => [
                                s(
                                  $,
                                  { value: t(F).monthly },
                                  {
                                    default: r(() => [
                                      P(w(e.$t('leasetype.monthly')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                                s(
                                  $,
                                  { value: t(F).quarterly },
                                  {
                                    default: r(() => [
                                      P(w(e.$t('leasetype.quarterly')), 1),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ['value']
                                ),
                                s(
                                  $,
                                  { value: t(F).annually },
                                  {
                                    default: r(() => [
                                      P(w(e.$t('leasetype.annually')), 1),
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
                    s(
                      n,
                      b(
                        {
                          'has-feedback': '',
                          label: e.$t('edituser.rent'),
                          name: 'Rent',
                        },
                        t(_).Rent
                      ),
                      {
                        default: r(() => [
                          s(
                            k,
                            {
                              value: t(o).Rent,
                              'onUpdate:value':
                                a[9] || (a[9] = (l) => (t(o).Rent = l)),
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
                    s(
                      n,
                      {
                        'has-feedback': '',
                        label: e.$t('edituser.role'),
                        name: 'Role',
                      },
                      {
                        default: r(() => [
                          s(
                            T,
                            {
                              value: t(o).Role,
                              'onUpdate:value':
                                a[10] || (a[10] = (l) => (t(o).Role = l)),
                            },
                            {
                              default: r(() => [
                                s(
                                  $,
                                  { value: 0 },
                                  {
                                    default: r(() => [
                                      P(w(e.$t('userrole.user')), 1),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                s(
                                  $,
                                  { value: 1 },
                                  {
                                    default: r(() => [
                                      P(w(e.$t('userrole.manager')), 1),
                                    ]),
                                    _: 1,
                                  }
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
                    s(n, null, {
                      default: r(() => [
                        s(
                          V,
                          {
                            type: 'primary',
                            onClick:
                              a[11] ||
                              (a[11] = X(
                                (l) => (C.value = !C.value),
                                ['prevent']
                              )),
                          },
                          {
                            default: r(() => [
                              P(w(e.$t('edituser.changepassword')), 1),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }),
                    s(n, null, {
                      default: r(() => [
                        s(
                          V,
                          {
                            type: 'primary',
                            class: 'bg-info border-info',
                            onClick: X(le, ['prevent']),
                          },
                          {
                            default: r(() => [P(w(e.$t('button.update')), 1)]),
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
              s(
                ve,
                {
                  cancelText: e.$t('button.cancel'),
                  okText: e.$t('button.confirm'),
                  visible: C.value,
                  'onUpdate:visible': a[15] || (a[15] = (l) => (C.value = l)),
                  title: e.$t('edituser.changepassword'),
                  destroyOnClose: !0,
                  onCancel: me,
                  onOk: pe,
                  confirmLoading: U.value,
                },
                {
                  default: r(() => [
                    Ne(
                      s(
                        Z,
                        {
                          ref: 'formRef',
                          model: t(f),
                          rules: t(G),
                          layout: 'vertical',
                          class: '',
                        },
                        {
                          default: r(() => [
                            s(
                              n,
                              {
                                'has-feedback': '',
                                label: e.$t('edituser.currentpassword'),
                                name: 'CurrentPassword',
                              },
                              {
                                default: r(() => [
                                  s(
                                    E,
                                    {
                                      value: t(f).CurrentPassword,
                                      'onUpdate:value':
                                        a[12] ||
                                        (a[12] = (l) =>
                                          (t(f).CurrentPassword = l)),
                                      autocomplete: 'off',
                                    },
                                    {
                                      prefix: r(() => [
                                        s(t(S), {
                                          class: 'site-form-item-icon',
                                        }),
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
                            s(
                              n,
                              {
                                'has-feedback': '',
                                label: e.$t('edituser.newpassword'),
                                name: 'NewPassword',
                              },
                              {
                                default: r(() => [
                                  s(
                                    E,
                                    {
                                      value: t(f).NewPassword,
                                      'onUpdate:value':
                                        a[13] ||
                                        (a[13] = (l) => (t(f).NewPassword = l)),
                                      autocomplete: 'off',
                                    },
                                    {
                                      prefix: r(() => [
                                        s(t(S), {
                                          class: 'site-form-item-icon',
                                        }),
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
                            s(
                              n,
                              {
                                'has-feedback': '',
                                label: e.$t('edituser.confirmpassword'),
                                name: 'ConfirmPassword',
                              },
                              {
                                default: r(() => [
                                  s(
                                    E,
                                    {
                                      value: t(f).ConfirmPassword,
                                      'onUpdate:value':
                                        a[14] ||
                                        (a[14] = (l) =>
                                          (t(f).ConfirmPassword = l)),
                                      autocomplete: 'off',
                                    },
                                    {
                                      prefix: r(() => [
                                        s(t(S), {
                                          class: 'site-form-item-icon',
                                        }),
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
                          ]),
                          _: 1,
                        },
                        8,
                        ['model', 'rules']
                      ),
                      [[De, C.value]]
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['cancelText', 'okText', 'visible', 'title', 'confirmLoading']
              ),
            ],
            64
          )
        )
      }
    },
  })
export { He as default }
