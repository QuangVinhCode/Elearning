import DocumentService from "../../services/documentService";
import TransactionService from "../../services/transactionService";
import {
  TRANSACTIONS_SET,
  TRANSACTION_STATE_CLEAR,
  COMMON_LOADING_SET,
  COMMON_ERROR_SET,
} from "./actionTypes";

export const getRevenues = (id) => async (dispatch) => {
  const service = new TransactionService();

  try {
    console.log("getRevenues Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object  in action" + id);
    const response = await service.getRevenues(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: TRANSACTIONS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response ? error.response.message : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};
export const getTransactionsbyAccount = (id) => async (dispatch) => {
  const service = new TransactionService();

  try {
    console.log("getRevenues Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object  in action" + id);
    const response = await service.getTransactionsbyAccount(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: TRANSACTIONS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response ? error.response.message : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const getCollectiontAdmin = () => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("getDocumentIncome Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocumentIncome();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: TRANSACTIONS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response ? error.response.message : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const getTransactions = () => async (dispatch) => {
  const service = new TransactionService();

  try {
    console.log("getRevenues Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getTransactions();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: TRANSACTIONS_SET,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response ? error.response.message : error.message,
    });
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};


export const clearTransactionState = () => (dispatch) => {
  dispatch({ type: TRANSACTION_STATE_CLEAR });
};
