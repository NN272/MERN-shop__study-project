import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080/"
  }
});

export const productAPI = {
  getProducts() {
    return instance.get("product/getAll").then(response => {
      return response.data.message;
    });
  },
  getProduct(id) {
    return instance.get(`product/findproduct?id=${id}`).then(response => {
      console.log(response);
      return response.data.message;
    });
  },
};
