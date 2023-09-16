import axios from "axios";

const fetchBasketCreate = (data: { productId: number }, token: string) => {
  return axios.post("http://localhost:3001/basket/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketCreate };
