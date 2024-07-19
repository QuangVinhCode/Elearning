import axios from "axios";
import { API_ACCOUNT } from "./constant";

export default class ClassService {
  insertAccount = async (object) => {
    return await axios.post(API_ACCOUNT, object);
  };
  insertOtpForRegister = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/verify/" + otp);
  };
  forgotPassword = async (username, gmail) => {
    return await axios.patch(API_ACCOUNT + "/forget/" + username + "/" + gmail);
  };
  forgotPasswordOpt = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/confirm/" + otp);
  };
  resetPassword = async (password) => {
    return await axios.patch(API_ACCOUNT + "/reset/" + password);
  };
  getAccounts = async () => {
    return await axios.get(API_ACCOUNT);
  };
  getAccountsByStatus = async () => {
    return await axios.get(API_ACCOUNT + "/status");
  };
  getAccountsByStateless = async () => {
    return await axios.get(API_ACCOUNT + "/stateless");
  };
  loginAccount = async (username, password) => {
    console.log("object in service");
    console.log(username);
    console.log(password);
    return await axios.patch(
      API_ACCOUNT + "/login/" + username + "/" + password
    );
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
  updateAccountStatus = async (id, status) => {
    return await axios.patch(API_ACCOUNT + "/status/" + id + "/" + status);
  };
  changePassword = async (id, oldPassword, newPassword) => {
    return await axios.patch(
      API_ACCOUNT + "/change/" + id + "/" + oldPassword + "/" + newPassword
    );
  };
}
