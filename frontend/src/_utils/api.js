import axios from 'axios';

export const loadProducts = async () => {
  return axios.get("http://localhost:3001/products")
}
