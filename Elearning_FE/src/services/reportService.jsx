import axios from "axios";
import { API_REPORT } from "./constant";

export default class ReportService {
  getReportDocuments = async () => {
    return await axios.get(API_REPORT + "/document");
  };
  getReportComments = async () => {
    return await axios.get(API_REPORT + "/comment");
  };
  getReportedDocumentInfo = async () => {
    return await axios.get(API_REPORT + "/document-info");
  };

  getReportedCommentsInfo = async () => {
    return await axios.get(API_REPORT + "/comment-info");
  };
  getReportDocumentMonitor = async () => {
    return await axios.get(API_REPORT + "/document-monitor");
  };

  getReportCommentMonitor = async () => {
    return await axios.get(API_REPORT + "/comment-monitor");
  };
  insertReportDocument = async (object) => {
    return await axios.post(API_REPORT + "/document", object);
  };

  insertReportComment = async (object) => {
    return await axios.post(API_REPORT + "/comment", object);
  };
}
