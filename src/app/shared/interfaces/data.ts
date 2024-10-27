import { verify } from "crypto";

export interface ForgetPassword {
  email: string;
}

export interface LoginData  extends  ForgetPassword{
  password: string;

}
export interface RegisterData  extends LoginData{
  name: string;
  rePassword: string;
  phone: string;
}

export interface verifyRestCode {

resetCode :string

}
export interface newPassword  extends ForgetPassword {

  newPassword :string

}
