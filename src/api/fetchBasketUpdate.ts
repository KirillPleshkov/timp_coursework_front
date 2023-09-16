import axios from "axios";

const fetchBasketUpdate = (
  id: number,
  data: { count: number },
  token: string | null
) => {
  return axios.patch(`http://localhost:3001/basket/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketUpdate };
