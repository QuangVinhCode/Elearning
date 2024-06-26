import axios from "axios";
import { API_PAY } from "./constant";

export default class PayService {
  static checkDocumentView = async (matk,matl) => {
    try {
      const response = await axios.get(API_PAY+ "/check/" + matk + "/" +matl);
      return response.data; // Assuming your API returns the necessary data directly
    } catch (error) {
      console.error("Error checking document view:", error);
      throw error; // Propagate the error back to the caller if needed
    }
  };
  payDocument = async (matk,matl) => {
    return await axios.post(API_PAY + "/pay/"+ matk + "/" + matl);
  };
}
