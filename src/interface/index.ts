export enum eRole {
  'User' = 0,
  'Manager' = 1,
}

export interface IAppConfig {
  readonly BaseUrl: string
  readonly APITimeout: number
}

export interface INavItem {
  key: string
  title: string
  icon?: string
  children?: Array<INavItem>
}

export interface IListClass<T> {
  data: Array<T>
  data_display: Array<T>
  loading: Boolean
  filtervalue: string
  display_count: number
}

// export interface IUserInfo {
//     readonly ID: string,
//     readonly Name: string,
//     readonly Token: string,
//     readonly Role: number,

// }

export enum eLeaseType {
  monthly = 0,
  quarterly = 1,
  annually = 2,
}

export interface IUserInfo {
  ID: string
  Role: eRole
  Account: string
  Name: string
  Description?: string
  Password?: string
  ConfirmPassword?: string
  Email?: string
  Phone?: string
  LineID?: string
  Room?: number
  Image?: string
  LeaseStart?: string
  LeaseEnd?: string
  LeaseType?: number
  Rent?: number
  Remark?: string
}

export interface IRoom {
  ID: number
  RoomNumber: string
  UserList: Array<IUserInfo>
  Group: string
  ElectrictyMeter: string
  WaterMeter: string
  Remark: string
}
