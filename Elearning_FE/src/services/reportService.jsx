import axios from "axios";
import { API_REPORT } from "./constant";

export default class ReportService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  getReportDocuments = async () => {
    return await axios.get(API_REPORT + "/document", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getReportComments = async () => {
    return await axios.get(API_REPORT + "/comment", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getReportedDocumentInfo = async () => {
    return await axios.get(API_REPORT + "/document-info", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportedCommentsInfo = async () => {
    return await axios.get(API_REPORT + "/comment-info", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getReportDocumentMonitor = async () => {
    return await axios.get(API_REPORT + "/document-monitor", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportCommentMonitor = async () => {
    return await axios.get(API_REPORT + "/comment-monitor", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportsByDocument = async (id) => {
    return await axios.get(API_REPORT + "/document-details/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportsByComment = async (id) => {
    return await axios.get(API_REPORT + "/comment-details/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  insertReportDocument = async (object) => {
    return await axios.post(API_REPORT + "/document", object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  insertReportComment = async (object) => {
    return await axios.post(API_REPORT + "/comment", object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportDocumentByAccount = async (id) => {
    return await axios.get(API_REPORT + "/account-document-details/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getReportCommentByAccount = async (id) => {
    return await axios.get(API_REPORT + "/account-comment-details/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
}
