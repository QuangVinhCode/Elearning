import ReportService from "../../services/reportService";
import {
  REPORT_SET,
  REPORTS_SET,
  REPORT_STATE_CLEAR,
  COMMON_ERROR_SET,
  COMMON_LOADING_SET,
  COMMON_MESSAGE_SET,
} from "./actionTypes";

export const getReportDocuments = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportDocuments();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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

export const getReportComments = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportComments();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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

export const getReportedDocumentInfo = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportedDocumentInfo();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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

export const getReportedCommentsInfo = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportedCommentsInfo();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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

export const getReportDocumentMonitor = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportDocumentMonitor();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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

export const getReportCommentMonitor = () => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Báo cáo tài liệu");
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const response = await service.getReportCommentMonitor();
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: REPORTS_SET,
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
export const insertReportDocument = (object) => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Thêm báo cáo tài liệu Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertReportDocument(object);

    if (response.status === 201) {
      dispatch({
        type: REPORT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Báo cáo tài liệu thành công",
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

export const insertReportComment = (object) => async (dispatch) => {
  const service = new ReportService();

  try {
    console.log("Thêm báo cáo bình luận Action");

    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const response = await service.insertReportComment(object);

    if (response.status === 201) {
      dispatch({
        type: REPORT_SET,
        payload: response.data,
      });
      dispatch({
        type: COMMON_MESSAGE_SET,
        payload: "Báo cáo bình luận thành công",
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
