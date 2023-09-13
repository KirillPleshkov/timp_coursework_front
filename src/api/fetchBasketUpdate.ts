import axios from "axios";

const fetchBasketUpdate = (
  id: number,
  data: { count: number },
  token: string | null
) => {
  return axios.patch(`/basket/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketUpdate };
