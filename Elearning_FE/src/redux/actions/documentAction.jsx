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
export const insertDocument = (object) => async (dispatch) => {
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
        payload: "Bài học đã được thêm",
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
export const getDocuments = () => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Danh sách bài học");
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
export const getDocument = (id) => async (dispatch) => {
  const service = new DocumentService();

  try {
    console.log("Lấy bài học");
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
    console.log("Xóa bài học Action");

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
