import axios from "axios";
import { TypeToken } from "./fetchLogin";

const fetchRegistration = (data: {
  email: string;
  password: string;
  name: string;
}) => {
  return axios.post<TypeToken>(`http://localhost:3001/auth/registration`, data);
};

export { fetchRegistration };
