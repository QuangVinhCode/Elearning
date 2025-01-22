import axios from "axios";
import { API_COMMENT } from "./constant";

export default class CommentService {
  getToken = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const sessionToken = jwtToken ? JSON.parse(jwtToken) : null;
    return sessionToken.token;
  };
  insertComment = async (object) => {
    return await axios.post(API_COMMENT, object, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getComments = async () => {
    return await axios.get(API_COMMENT, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };

  getCommentsByDocument = async (id) => {
    return await axios.get(API_COMMENT + "/document/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getCommentsAdmin = async () => {
    return await axios.get(API_COMMENT + "/admin", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  deleteComment = async (matk, matl, mabl) => {
    return await axios.delete(
      API_COMMENT + "/" + matk + "/" + matl + "/" + mabl, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    }
    );
  };
  getComment = async (id) => {
    return await axios.get(API_COMMENT + "/" + id + "/get", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  getCommentsByAccount = async (id) => {
    return await axios.get(API_COMMENT + "/account/" + id, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
  blockCommentAndReplies = async (mabinhluan) => {
    return await axios.patch(API_COMMENT + "/block/" + mabinhluan, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  };
}
