import axios from "axios";
import { API_ACCOUNT } from "./constant";

export default class ClassService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  insertAccount = async (object) => {
    return await axios.post(API_ACCOUNT, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  insertOtpForRegister = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/verify/" + otp);
  };
  forgotPassword = async (username, gmail) => {
    return await axios.patch(API_ACCOUNT + "/forget/" + username + "/" + gmail, {});
  };
  forgotPasswordOpt = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/confirm/" + otp, {});
  };
  changeGmailOpt = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/change-gmail/" + otp, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  newGmailOpt = async (otp) => {
    return await axios.patch(API_ACCOUNT + "/new-gmail/" + otp, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  resetPassword = async (password) => {
    return await axios.patch(API_ACCOUNT + "/reset/" + password, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAccounts = async () => {
    return await axios.get(API_ACCOUNT, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAccountsByStatus = async () => {
    return await axios.get(API_ACCOUNT + "/status", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAccountsByPostingStatus = async () => {
    return await axios.get(API_ACCOUNT + "/status", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAccountsByStateless = async () => {
    return await axios.get(API_ACCOUNT + "/stateless", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  loginAccount = async (username, password) => {
    console.log("object in service");
    console.log(username);
    console.log(password);
    return await axios.patch(
      API_ACCOUNT + "/login/" + username + "/" + password);
  };
  deleteAccount = async (id) => {
    return await axios.delete(API_ACCOUNT + "/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAccount = async (id) => {
    return await axios.get(API_ACCOUNT + "/" + id + "/get", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  updateAccount = async (id, object) => {
    return await axios.patch(API_ACCOUNT + "/" + id, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  updateAccountStatus = async (id, status) => {
    return await axios.patch(
      API_ACCOUNT + "/status-document/" + id + "/" + status, {}, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    }
    );
  };
  updateAccountStatusBL = async (id, status) => {
    return await axios.patch(
      API_ACCOUNT + "/status-comment/" + id + "/" + status, {}, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    }
    );
  };
  changePassword = async (id, oldPassword, newPassword) => {
    return await axios.patch(
      API_ACCOUNT + "/change/" + id + "/" + oldPassword + "/" + newPassword, {}, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    }
    );
  };
}
