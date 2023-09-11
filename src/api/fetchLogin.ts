import axios from "axios";

type TypeToken = {
  token: string;
};

const fetchLogin = (data: { email: string; password: string }) => {
  return axios.post<TypeToken>(`/auth/login`, data);
};

export { fetchLogin };
export type { TypeToken };
