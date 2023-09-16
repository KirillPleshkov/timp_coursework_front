import axios from "axios";

const fetchBasketDelete = (id: number, token: string | null) => {
  return axios.delete(`http://localhost:3001/basket/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketDelete };
