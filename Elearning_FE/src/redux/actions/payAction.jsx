import PayService from "../../services/payService";
import {
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  DOCUMENTS_SET,
} from "./actionTypes";



export const getVnPay = (amount, bankAccount,account) => async (dispatch) => {
  const service = new PayService();
  
  try {
    console.log("VN Pay Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getVnPay(amount,bankAccount,account);
    console.log("response");
    console.log(response);
    if (response.status === 200) {
      const paymentUrl = response.data.data.paymentUrl;
      console.log(paymentUrl)
      window.location.href = paymentUrl; // Redirect to paymentUrl
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
    console.log(response);
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const getPays = () => async (dispatch) => {
  const service = new PayService();
  try {
    console.log("Lấy tài liệu đã thanh toán");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getPays();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
      return response;
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

