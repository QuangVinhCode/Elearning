import CommentService from "../../services/commentService";
import {
  COMMENTS_SET,
  COMMENT_DELETE,
  COMMENT_SET,
  COMMENT_APPEND,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
  COMMENT_STATE_CLEAR,
} from "./actionTypes";

export const insertComment = (object) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Thêm bình luận Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    console.log("object " + object);
    const response = await service.insertComment(object);
    console.log("response " + response.data);
    if (response.status === 201) {
      const comment = {
        mabinhluan: response.data.mabinhluan,
        mataikhoan: object.mataikhoan,
        matbinhluandatraloi: response.data.matbinhluandatraloi,
        noidung: object.noidung,
        tendangnhap: object.tendangnhap,
        thoigianbinhluan: object.thoigianbinhluan,
        trangthai: response.data.trangthai,
      };
      dispatch({
        type: COMMENT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMENT_APPEND,
        payload: comment,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bình luận đã được thêm",
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

export const blockCommentAndReplies = (mabinhluan) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Thêm bình luận Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.blockCommentAndReplies(mabinhluan);

    if (response.status === 201) {
      dispatch({
        type: COMMENT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMENT_APPEND,
        payload: mabinhluan,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Bình luận đã bị cấm",
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
  dispatch(getCommentsAdmin());
};

export const getComments = () => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Danh sách bình luận Action");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getComments();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENTS_SET,
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

export const getCommentsAdmin = () => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Danh sách bình luận Action");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getCommentsAdmin();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENTS_SET,
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

export const getCommentsByDocument = (id) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Danh sách bình luận Action");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getCommentsByDocument(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENTS_SET,
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
export const getCommentsByAccount = (id) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Danh sách bình luận Action theo tai khoan");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getCommentsByAccount(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENTS_SET,
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

export const deleteComment = (matk, matl, mabl) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Xóa bình luận Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.deleteComment(matk, matl, mabl);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENT_DELETE,
        payload: mabl,
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

export const getComment = (id) => async (dispatch) => {
  const service = new CommentService();

  try {
    console.log("Lấy thông tin bình luận Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.getComment(id);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: COMMENT_SET,
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

export const clearCommentState = () => (dispatch) => {
  dispatch({ type: COMMENT_STATE_CLEAR });
};
