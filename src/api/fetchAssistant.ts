import axios from "axios";
import { type } from "os";

type TypeAssistant = { id: number };

function fetchAssistant(symptomQuery?: string) {
  return axios.get<TypeAssistant>(`/assistant?symptom=${symptomQuery}`);
}

export { fetchAssistant };
export type { TypeAssistant };
