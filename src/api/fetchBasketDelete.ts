import axios from "axios";

const fetchBasketDelete = (id: number, token: string | null) => {
  return axios.delete(`/basket/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketDelete };
