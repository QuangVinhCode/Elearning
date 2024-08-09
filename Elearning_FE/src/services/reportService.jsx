import axios from "axios";
import { API_REPORT } from "./constant";

export default class ReportService {
  getReportDocuments = async () => {
    return await axios.get(API_REPORT + "/tailieu");
  };
  getReportComments = async () => {
    return await axios.get(API_REPORT + "/binhluan");
  };
  getReportedDocumentInfo = async () => {
    return await axios.get(API_REPORT + "/thongtintailieu");
  };

  getReportedCommentsInfo = async () => {
    return await axios.get(API_REPORT + "/thongtinbinhluan");
  };
  getReportDocumentMonitor = async () => {
    return await axios.get(API_REPORT + "/theodoitailieu");
  };

  getReportCommentMonitor = async () => {
    return await axios.get(API_REPORT + "/theodoibinhluan");
  };
  insertReportDocument = async (object) => {
    return await axios.post(API_REPORT + "/tailieu", object);
  };

  insertReportComment = async (object) => {
    return await axios.post(API_REPORT + "/binhluan", object);
  };
}
