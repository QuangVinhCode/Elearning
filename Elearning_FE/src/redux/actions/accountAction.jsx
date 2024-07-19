import AccountService from "../../services/accountService";
import {
  ACCOUNT_SET,
  ACCOUNTS_SET,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  LOG_IN,
  LOG_OUT,
  UPDATE_STATUS,
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
      console.log(response.data);
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

export const insertAccount = (object) => async (dispatch) => {
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
    console.log("response ");
    console.log(response);
    if (response.status === 200) {
      const OtpUrl = response.data.url;
      console.log(OtpUrl);
      window.location.href = OtpUrl; // Redirect to paymentUrl
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

export const forgotPassword = (username, gmail) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Quên mật khẩu Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object in action");
    console.log(username);
    console.log(gmail);
    const response = await service.forgotPassword(username, gmail);
    console.log("response ");
    console.log(response);
    if (response.status === 200) {
      const OtpUrl = response.data.url;
      console.log(OtpUrl);
      window.location.href = OtpUrl; // Redirect to paymentUrl
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

export const forgotPasswordOpt = (otp) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Kiểm tra gmail lấy lại tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("otp in action ");
    console.log(otp);
    const response = await service.forgotPasswordOpt(otp);
    console.log("response");
    console.log(response);
    if (response.status === 200) {
      const OtpUrl = response.data.url;
      console.log(OtpUrl);
      window.location.href = OtpUrl; // Redirect to paymentUrl
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

export const resetPassword = (newPassword, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Kiểm tra gmail tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("newPassword in action ");
    console.log(newPassword);
    const response = await service.resetPassword(newPassword);
    console.log("response");
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: response.data,
      });
      navigate("/users/login");
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

export const insertOtpForRegister = (otp, navigate) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Kiểm tra gmail tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("otp in action ");
    console.log(otp);
    const response = await service.insertOtpForRegister(otp);
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

export const updateAccountStatus = (id, status) => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Lấy thông tin tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.updateAccountStatus(id, status);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: UPDATE_STATUS,
        payload: id,
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
        payload: "Thông tin tài khoản đã được thay đổi!",
      });
      navigate("/users/profile/accountsettings");
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
export const getAccounts = () => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Lấy thông tin tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getAccounts();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: ACCOUNTS_SET,
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

export const getAccountsByStatus = () => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Kiểm tra trạng thái tài khoản tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getAccountsByStatus();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: ACCOUNTS_SET,
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

export const getAccountsByStateless = () => async (dispatch) => {
  const service = new AccountService();

  try {
    console.log("Lấy thông tin tài khoản Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getAccountsByStateless();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: ACCOUNTS_SET,
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

export const changePassword =
  (id, oldPassword, newPassword, navigate) => async (dispatch) => {
    const service = new AccountService();

    try {
      console.log("Đổi mật khẩu tài khoản Action");

      dispatch({
        type: COMMON_LOADING_SET,
        payload: true,
      });

      const response = await service.changePassword(
        id,
        oldPassword,
        newPassword
      );
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: COMMON_MESSAGE_SET,
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
    let sesion = sessionStorage.removeItem("userSession");
    if (!sesion) {
      navigate("/users/login");
      dispatch({ type: LOG_OUT });
    }
  };
