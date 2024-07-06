import {
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  DOCUMENTS_SET,
  DOCUMENT_APPEND,
  DOCUMENT_DELETE,
  DOCUMENT_SET,
  DOCUMENT_UPDATE,
} from "./actionTypes";
import DocumentService from "../../services/documentService";
import PayService from "../../services/payService";

export const insertDocumentAdmin = (object) => async (dispatch) => {
  const service = new DocumentService();
  try {
    console.log("Thêm tài liệu");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("thêm object in action");
    console.log(object);

    const response = await service.insertDocument(object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: DOCUMENT_SET,
        payload: response.data,
      });

      dispatch({
        type: DOCUMENT_APPEND,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "tài liệu đã được thêm",
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
  dispatch(getDocuments());
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const insertDocumentUser = (object) => async (dispatch) => {
  const service = new DocumentService();
  try {
    console.log("Thêm tài liệu");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("thêm object in action");
    console.log(object);

    const response = await service.insertDocument(object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: DOCUMENT_SET,
        payload: response.data,
      });

      dispatch({
        type: DOCUMENT_APPEND,
        payload: response.data,
      });

      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "tài liệu đã được thêm",
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
};

export const getDocuments = () => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocuments();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
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

export const getOutstandingDocuments = () => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getOutstandingDocuments();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
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

export const getDocumentsByName = (name) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocumentsByName(name);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
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

export const getDocumentsByCategory = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocumentsByCategory(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
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

export const getDocumentByCensorship = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocumentByCensorship(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENTS_SET,
        payload: response.data,
      });
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

export const getDocument = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Lấy tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getDocument(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENT_SET,
        payload: response.data,
      });
      return response.data;
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

export const deleteDocument = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Xóa tài liệu Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteDocument(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENT_DELETE,
        payload: id,
      });
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
};

export const confirmDocument = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Xác nhận tài liệu Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.confirmDocument(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENT_DELETE,
        payload: id,
      });
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
};

export const errorDocument = (id, note) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Ghi chú tài liệu Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.errorDocument(id, note);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: DOCUMENT_DELETE,
        payload: id,
      });
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
};

export const updateDocument = (object) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Sửa tài liệu");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("cập nhập object in action: ");
    console.log(object);
    const { matailieu } = object;
    const response = await service.updateDocument(matailieu, object);
    console.log("response");
    console.log(response);
    if (response.status === 201) {
      dispatch({
        type: DOCUMENT_SET,
        payload: response.data,
      });
      console.log("cập nhập object in data ");
      console.log(response.data);
      dispatch({
        type: DOCUMENT_UPDATE,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Tài liệu đã được sửa",
      });
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
    console.log(error);
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: false,
  });
};

export const payDocument = (matk, matl) => async (dispatch) => {
  const service = new PayService();
  try {
    console.log("Thanh toán tài liệu");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    console.log("object matk " + matk);
    console.log("object matl " + matl);

    const response = await service.payDocument(matk, matl);
    console.log("response");
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      console.log("so du: " + response.data.taikhoan.sodu);
      // Lấy userSession từ sessionStorage
      let userSession = JSON.parse(sessionStorage.getItem("userSession"));
      console.log("session " + userSession.data.sodu);
      // Kiểm tra userSession có tồn tại và có trường data không
      if (userSession && userSession.data) {
        // Cập nhật trường trong data
        userSession.data.sodu =
          userSession.data.sodu - response.data.tailieu.giaban; // Thay 'fieldToUpdate' bằng tên trường bạn muốn cập nhật
      }
      console.log("session cập nhật " + userSession.data.sodu);
      // Lưu lại userSession đã cập nhật vào sessionStorage
      sessionStorage.setItem("userSession", JSON.stringify(userSession));
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Thanh toán thành công",
      });
      return true; // Return true indicating successful payment
    } else {
      dispatch({
        type: COMMON_ERROR_SET,
        payload: response.message,
      });
      return false; // Return false indicating payment failure
    }
  } catch (error) {
    dispatch({
      type: COMMON_ERROR_SET,
      payload: error.response.data
        ? error.response.data.message
        : error.message,
    });
    return false; // Return false indicating payment failure
  } finally {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
  }
};
