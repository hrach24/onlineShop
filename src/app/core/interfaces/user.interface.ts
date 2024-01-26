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
  name: string | undefined,
  surname: string | undefined,
  email: string | undefined,
  password: string | undefined,
}
