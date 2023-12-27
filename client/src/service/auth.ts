import request from "../network";
import { ILoginInput } from "../pages/Login";

export interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  username: string;
}

export async function login(body: ILoginRequest) {
  const { data } = await request<ILoginRequest, ILoginResponse>({
    method: "post",
    url: "auth/login",
    requestBody: body,
  });

  const { token, username } = data;

  if (token) {
    localStorage.setItem("token", token);
  }
  return username;
}

export async function signup(body: ILoginInput) {
  const { data } = await request<ILoginInput, ILoginResponse>({
    method: "post",
    url: "auth/signup",
    requestBody: body,
  });

  const { token, username } = data;

  if (token) {
    localStorage.setItem("token", token);
  }
  return username;
}
