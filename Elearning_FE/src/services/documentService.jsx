import axios from "axios";
import { API_CENSORSHIP, API_DOCUMENT } from "./constant";

export default class DocumentService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  insertDocument = async (object) => {
    let formData = new FormData();
    formData.append("tentailieu", object.tentailieu);
    formData.append("tacgia", object.tacgia);
    formData.append("madanhmuc", object.madanhmuc);
    formData.append("mota", object.mota);
    formData.append("giaban", object.giaban);
    formData.append("mataikhoan", object.mataikhoan);
    formData.append("tylephiquantri", object.tylephiquantri);
    formData.append("tylethunhaptacgia", object.tylethunhaptacgia);
    if (object.diachiluutru[0].originFileObj) {
      formData.append("pdfFile", object.diachiluutru[0].originFileObj);
    }
    console.log(
      "object in originFileObj service: ",
      object.diachiluutru[0].originFileObj
    );
    console.log("value in formData");
    console.log(formData);
    return await axios.post(API_DOCUMENT, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocuments = async () => {
    return await axios.get(API_DOCUMENT, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
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
  getDocumentCollectionByAccount = async (id) => {
    return await axios.get(API_DOCUMENT + "/collection-account/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentByCensorship = async () => {
    return await axios.get(API_DOCUMENT + "/censorship", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentIncome = async () => {
    return await axios.get(API_DOCUMENT + "/income", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentAllPayAmin = async () => {
    return await axios.get(API_DOCUMENT + "/admin", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentsByAccountSale = async (id) => {
    return await axios.get(API_DOCUMENT + "/sale/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentsByAccountPay = async (id) => {
    return await axios.get(API_DOCUMENT + "/pay/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentUploadByAccount = async (id) => {
    return await axios.get(API_DOCUMENT + "/upload-account/" + id);
  };
  getDocumentPayByAccount = async (id) => {
    return await axios.get(API_DOCUMENT + "/pay-account/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  updateStatusBan = async (object) => {
    return await axios.patch(API_CENSORSHIP + "/ban", object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  deleteDocument = async (id) => {
    return await axios.delete(API_DOCUMENT + "/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  confirmDocument = async (object) => {
    return await axios.post(API_CENSORSHIP, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getCensorshipByDocument = async (id) => {
    return await axios.get(API_CENSORSHIP + "/document/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  errorDocument = async (id, note) => {
    return await axios.patch(API_DOCUMENT + "/error/" + id + "/" + note, {}, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getAllDocumentRevenueByAccount = async (id) => {
    return await axios.get(API_DOCUMENT + "/revenue/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocument = async (id) => {
    return await axios.get(API_DOCUMENT + "/" + id + "/get", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getDocumentInfo = async (id) => {
    return await axios.get(API_DOCUMENT + "/" + id + "/info", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  updateDocument = async (id, object) => {
    let formData = new FormData();

    formData.append("tentailieu", object.tentailieu);
    formData.append("madanhmuc", object.madanhmuc);
    formData.append("tacgia", object.tacgia);
    formData.append("mota", object.mota);
    formData.append("giaban", object.giaban);
    formData.append("mataikhoan", object.mataikhoan);
    formData.append("tylephiquantri", object.tylephiquantri);
    formData.append("tylethunhaptacgia", object.tylethunhaptacgia);
    if (object.diachiluutru[0].originFileObj) {
      formData.append("pdfFile", object.diachiluutru[0].originFileObj);
    }
    console.log(
      "object in originFileObj service: ",
      object.diachiluutru[0].originFileObj
    );
    return await axios.patch(API_DOCUMENT + "/" + id, formData, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  static getDocumentPDFUrl = (filename) => {
    return API_DOCUMENT + "/content/" + filename;
  };
  static getPDFPreview = (filename) => {
    return API_DOCUMENT + "/preview/" + filename;
  };
  static getPDFView = (filename) => {
    return API_DOCUMENT + "/view/" + filename;
  };

  getDocumentUploadAdmin = async () => {
    return await axios.get(API_DOCUMENT + "/upload-admin", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getDocumentPayAdmin = async () => {
    return await axios.get(API_DOCUMENT + "/pay-admin", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
}
