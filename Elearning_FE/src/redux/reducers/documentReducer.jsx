import {
  DOCUMENTS_SET,
  DOCUMENT_APPEND,
  DOCUMENT_DELETE,
  DOCUMENT_SET,
  DOCUMENT_UPDATE,
} from "../actions/actionTypes";

const initialState = {
  document: {},
  documents: [],
};

const documentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DOCUMENT_SET:
      return { ...state, document: payload };
    case DOCUMENTS_SET:
      return { ...state, documents: payload };
    case DOCUMENT_APPEND:
      return { ...state, documents: [...state.documents, payload] };
    case DOCUMENT_DELETE:
      return {
        ...state,
        documents: state.documents.filter((item) => item.matailieu !== payload),
      };
    case DOCUMENT_UPDATE:
      const newDocuments = state.documents.filter(
        (item) => item.matailieu !== payload.matailieu
      );
      return {
        ...state,
        documents: [payload, ...newDocuments],
      };
    default:
      return state;
  }
};

export default documentReducer;
