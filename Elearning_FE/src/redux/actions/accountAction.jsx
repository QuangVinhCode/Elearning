import AccountService from "../../services/accountService";
import {
  ACCOUNT_SET,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  LOG_IN,
  LOG_OUT,
} from "./actionTypes";

export const loginAccount = (object, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Đăng nhập Action");
    console.log(object);

    const response = await service.loginAccount(
      object.username,
      object.password
    );
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: LOG_IN,
        payload: response.data,
      });
      console.log("object in data login");
      console.log(response.data);
      const userSession = {
        data: response.data,
      };
      sessionStorage.setItem("userSession", JSON.stringify(userSession));
      console.log(response.data)
      if (response.data.quyenhan === "Quản trị viên") {
        navigate("/dashboard/*");
      } else {
        navigate("/users");
      }
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
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const insertAccount = (object, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Thêm tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object in action");
    console.log(object);
    const response = await service.insertAccount(object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: ACCOUNT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Tài khoản đã được tạo thành công",
      });
      navigate("/users/login");
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

export const getAccount = (id) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Lấy thông tin tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getAccount(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: ACCOUNT_SET,
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

export const clearAccount = () => (dispatch) => {
  dispatch({
    type: ACCOUNT_SET,
    payload: {
      id: "",
      username: "",
      password: "",
      fullname: "",
      date: "",
      adress: "",
      phone_number: "",
      role_id: "",
    },
  });
};

export const updateAccount = (id, object, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Sửa thông tin tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateAccount(id, object);

    if (response.status === 200) {
      dispatch({
        type: ACCOUNT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Thông tin tài khoản đã được thay đổi vui lòng đăng nhập lại",
      });
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
  let sesion = sessionStorage.removeItem("userSession");
  if (!sesion) {
    navigate("/login");
    dispatch({ type: LOG_OUT });
  }
};
