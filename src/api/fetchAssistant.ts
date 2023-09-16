import axios from "axios";
import { type } from "os";

type TypeAssistant = { id: number };

function fetchAssistant(symptomQuery?: string) {
  return axios.get<TypeAssistant>(`http://localhost:3001/assistant?symptom=${symptomQuery}`);
}

export { fetchAssistant };
export type { TypeAssistant };
