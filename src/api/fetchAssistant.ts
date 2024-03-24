import axios from "axios";
import { type } from "os";
import { TypeProduct } from "../types/TypeProduct";

type TypeAssistant = { id: number; name: string; products: TypeProduct[] };

function fetchAssistant(symptomQuery?: string) {
  return axios.get<TypeAssistant>(
    `http://localhost:3001/assistant?symptom=${symptomQuery}`
  );
}

export { fetchAssistant };
export type { TypeAssistant };
