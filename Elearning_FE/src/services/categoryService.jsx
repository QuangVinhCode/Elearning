import axios from "axios";
import { API_CATEGORY } from "./constant";

export default class CategoryService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  insertCategory = async (object) => {
    return await axios.post(API_CATEGORY, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getCategories = async () => {
    return await axios.get(API_CATEGORY);
  };
  deleteCategory = async (id) => {
    return await axios.delete(API_CATEGORY + "/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getCategory = async (id) => {
    return await axios.get(API_CATEGORY + "/" + id + "/get", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  updateCategory = async (id, object) => {
    return await axios.patch(API_CATEGORY + "/" + id, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
}
