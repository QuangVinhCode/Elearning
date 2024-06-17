import axios from "axios";
import { API_CATEGORY } from "./constant";

export default class CategoryService {
  insertCategory = async (object) => {
    return await axios.post(API_CATEGORY, object);
  };
  getCategories = async () => {
    return await axios.get(API_CATEGORY);
  };
  deleteCategory = async (id) => {
    return await axios.delete(API_CATEGORY + "/" + id);
  };
  getCategory = async (id) => {
    return await axios.get(API_CATEGORY + "/" + id + "/get");
  };
  updateCategory = async (id, object) => {
    return await axios.patch(API_CATEGORY + "/" + id, object);
  };
}
