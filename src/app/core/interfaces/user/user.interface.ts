export interface IUserInterface {
  id?: string
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string,
}

export interface IUserLoginInterFace {
  email: string | undefined,
  phoneNumber: string | undefined,
}
