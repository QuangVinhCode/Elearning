import axios from "axios";
import { API_COMMENT } from "./constant";

export default class CommentService {
  insertComment = async (object) => {
    return await axios.post(API_COMMENT, object);
  };
  getComments = async () => {
    return await axios.get(API_COMMENT);
  };

  getCommentsByDocument = async (id) => {
    return await axios.get(API_COMMENT + "/document/" + id);
  };

  deleteComment = async (matk, matl, mabl) => {
    return await axios.delete(
      API_COMMENT + "/" + matk + "/" + matl + "/" + mabl
    );
  };
  getComment = async (id) => {
    return await axios.get(API_COMMENT + "/" + id + "/get");
  };
}
