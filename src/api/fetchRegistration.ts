import axios from "axios";
import { TypeToken } from "./fetchLogin";

const fetchRegistration = (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return axios.post<TypeToken>(`/auth/registration`, data);
};

export { fetchRegistration };
