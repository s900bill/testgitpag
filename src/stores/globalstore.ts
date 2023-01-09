import { defineStore } from 'pinia'
import { IUserInfo, eRole } from '@/interface'
export const globalstore = defineStore('global', {
  state: () => ({
    _lang: 'English',
    _userinfo: { Account: '', Name: '', ID: '', Token: '', Role: eRole.User },
    _token: '',
  }),
  getters: {
    lang: (state) => state._lang,
    userinfo: (state): IUserInfo => state._userinfo,
    token: (state): string | null => state._token,
    ismanager: (state): boolean => state._userinfo.Role === eRole.Manager,
  },
  actions: {
    updatelang(newMessage: string): void {
      this._lang = newMessage
    },
    updateuserinfo(newMessage: IUserInfo): void {
      this._userinfo = newMessage
    },
    updatetoken(newMessage: string): void {
      this._token = newMessage
    },
  },
})
