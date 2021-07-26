import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:27017/",
});

export const productAPI = {
  getProducts() {
    return instance.get("product/getAll");
  },
  getProduct(id) {
    return instance.get(`product/findproduct?id=${id}`);
  },
};
