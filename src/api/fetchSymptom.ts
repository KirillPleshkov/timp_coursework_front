import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeSymptom = {
  name: string;
  products: TypeProduct[];
};

const fetchSymptom = (token: string | null, id?: number | string) => {
  return axios.get<TypeSymptom>(`http://localhost:3001/symptom/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchSymptom };
