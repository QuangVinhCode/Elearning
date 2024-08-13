import axios from "axios";
import { API_TRANSACTION } from "./constant";

export default class TransactionService {
  getRevenues = async (id) => {
    console.log("object serivice " + id);
    return await axios.get(API_TRANSACTION + "/revenue/" + id);
  };
  getTransactionsbyAccount = async (id) => {
    console.log("object serivice " + id);
    return await axios.get(API_TRANSACTION + "/account/" + id);
  };

  getTransactions = async () => {
    return await axios.get(API_TRANSACTION + "/transaction");
  };
}
