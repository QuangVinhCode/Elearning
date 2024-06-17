import axios from "axios";
import { API_ACCOUNT } from "./constant";

export default class ClassService {
  insertAccount = async (object) => {
    return await axios.post(API_ACCOUNT, object);
  };
  getAccounts = async () => {
    return await axios.get(API_ACCOUNT);
  };
  loginAccount = async (username,password) => {
    console.log("object in service");
    console.log(username);
    console.log(password);
    return await axios.patch(API_ACCOUNT + "/login/" + username + "/" + password);
  };
  deleteAccount = async (id) => {
    return await axios.delete(API_ACCOUNT + "/" + id);
  };
  getAccount = async (id) => {
    return await axios.get(API_ACCOUNT + "/" + id + "/get");
  };
  updateAccount = async (id, object) => {
    return await axios.patch(API_ACCOUNT + "/" + id, object);
  };
}