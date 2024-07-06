import axios from "axios";
import { API_DOCUMENT } from "./constant";

export default class DocumentService {
  insertDocument = async (object) => {
    let formData = new FormData();
    formData.append("tentailieu", object.tentailieu);
    formData.append("madanhmuc", object.madanhmuc);
    formData.append("mota", object.mota);
    formData.append("giaban", object.giaban);
    formData.append("mataikhoan", object.mataikhoan);
    if (object.diachiluutru[0].originFileObj) {
      formData.append("pdfFile", object.diachiluutru[0].originFileObj);
    }
    console.log(
      "object in originFileObj service: ",
      object.diachiluutru[0].originFileObj
    );
    console.log("value in formData");
    console.log(formData);
    return await axios.post(API_DOCUMENT, formData);
  };
  getDocuments = async () => {
    return await axios.get(API_DOCUMENT);
  };
  getOutstandingDocuments = async () => {
    return await axios.get(API_DOCUMENT + "/top");
  };
  getDocumentsByName = async (name) => {
    return await axios.get(API_DOCUMENT + "/name/" + name);
  };
  getDocumentsByCategory = async (id) => {
    return await axios.get(API_DOCUMENT + "/category/" + id);
  };
  getDocumentByCensorship = async (id) => {
    return await axios.get(API_DOCUMENT + "/censorship/" + id);
  };
  deleteDocument = async (id) => {
    return await axios.delete(API_DOCUMENT + "/" + id);
  };
  confirmDocument = async (id) => {
    return await axios.patch(API_DOCUMENT + "/confirm/" + id);
  };
  errorDocument = async (id, note) => {
    return await axios.patch(API_DOCUMENT + "/error/" + id + "/" + note);
  };
  getDocument = async (id) => {
    return await axios.get(API_DOCUMENT + "/" + id + "/get");
  };
  updateDocument = async (id, object) => {
    let formData = new FormData();

    formData.append("tentailieu", object.tentailieu);
    formData.append("madanhmuc", object.madanhmuc);
    formData.append("mota", object.mota);
    formData.append("giaban", object.giaban);
    formData.append("mataikhoan", object.mataikhoan);
    if (object.diachiluutru[0].originFileObj) {
      formData.append("pdfFile", object.diachiluutru[0].originFileObj);
    }
    console.log(
      "object in originFileObj service: ",
      object.diachiluutru[0].originFileObj
    );
    return await axios.patch(API_DOCUMENT + "/" + id, formData);
  };
  static getDocumentPDFUrl = (filename) => {
    return API_DOCUMENT + "/content/" + filename;
  };
  static getPDFPreview = (filename) => {
    return API_DOCUMENT + "/preview/" + filename;
  };
}
