import {
  CATEGORIES_SET,
  CATEGORY_DELETE,
  CATEGORY_SET,
  CATEGORY_STATE_CLEAR,
} from "./../actions/actionTypes";
const initialState = {
  object: {},
  objects: [],
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_SET:
      return { ...state, object: payload };
    case CATEGORIES_SET:
      return { ...state, objects: payload };
    case CATEGORY_DELETE:
      return {
        ...state,
        objects: state.objects.filter((item) => item.madanhmuc !== payload),
      };
    case CATEGORY_STATE_CLEAR:
      return {
        object: {},
        objects: [],
      };
    default:
      return state;
  }
};

export default categoryReducer;
