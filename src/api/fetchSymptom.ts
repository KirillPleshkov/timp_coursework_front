import axios from "axios";
import { TypeProduct } from "../types/TypeProduct";

type TypeSymptom = {
  name: string;
  products: TypeProduct[];
};

const fetchSymptom = (id?: number | string) => {
  return axios.get<TypeSymptom>(`/symptom/${id}`);
};

export { fetchSymptom };
