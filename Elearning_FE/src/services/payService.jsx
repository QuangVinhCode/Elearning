import axios from "axios";
import {  API_PAYMENT } from "./constant";

export default class PayService { getToken = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
  return sessionToken.token;
};
  static checkDocumentView = async (matk, matl) => {
    try {
      const response = await axios.get(API_PAYMENT + "/check/" + matk + "/" + matl);
      return response.data; // Assuming your API returns the necessary data directly
    } catch (error) {
      console.error("Error checking document view:", error);
      throw error; // Propagate the error back to the caller if needed
    }
  };
  payDocument = async (matk, matl) => {
    return await axios.post(API_PAYMENT + "/pay/" + matk + "/" + matl);
  };
  getVnPay = async (amount, bankCode, account) => {
    const params = {
      amount: amount,
      bankCode: bankCode,
      account: account,
    };
    return await axios.get(API_PAYMENT + "/vn-pay", { params });
  };

  getPays = async () => {
    return await axios.get(API_PAYMENT);
  };
}
