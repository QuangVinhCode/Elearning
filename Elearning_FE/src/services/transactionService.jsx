import axios from "axios";
import { API_TRANSACTION } from "./constant";

export default class TransactionService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  getRevenues = async (id) => {
    console.log("object serivice " + id);
    return await axios.get(API_TRANSACTION + "/revenue/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getTransactionsbyAccount = async (id) => {
    console.log("object serivice " + id);
    return await axios.get(API_TRANSACTION + "/account/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getTransactions = async () => {
    return await axios.get(API_TRANSACTION + "/transaction", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };


}
