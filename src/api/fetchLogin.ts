import axios from "axios";

type TypeToken = {
  token: string;
};

const fetchLogin = (data: { email: string; password: string }) => {
  return axios.post<TypeToken>(`http://localhost:3001/auth/login`, data);
};

export { fetchLogin };
export type { TypeToken };
