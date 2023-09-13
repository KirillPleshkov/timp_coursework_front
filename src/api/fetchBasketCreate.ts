import axios from "axios";

const fetchBasketCreate = (data: { productId: number }, token: string) => {
  return axios.post("/basket/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { fetchBasketCreate };
