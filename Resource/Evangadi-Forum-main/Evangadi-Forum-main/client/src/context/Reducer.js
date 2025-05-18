export const initialState = {
  onOff: true,
  postAnswerSuccess: 0,
  username: "",
  user_id: null,
  questionData: {},
};
const reducer = (state, action) => {
    console.log(action)
  switch (action.type) {
    case "CHANGE_FORM":
      if (state.onOff === false) {
        return {
          ...state,
          onOff: true,
        };
      } else {
        return {
          ...state,
          onOff: false,
        };
      }
    case "SET_USER":
      return {
        ...state,
        username: action.item.username,
        user_id: action.item.user_id,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user_id: null,
      };
    case "SET_QUESTION_DATA":
      return {
        ...state,
        questionData: action.item,
      };
      case "POST_ANSWER_SUCCESS":
        return {
          ...state,
          postAnswerSuccess: state.postAnswerSuccess + 1,
        };

    default:
      return state;
  }
};

export default reducer;
