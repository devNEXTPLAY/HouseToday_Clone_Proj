// 액션 타입 참조
import { USER_LOGIN } from "../../constants/actionTypes";

const INIT_STATE = {
  token: "",
  user: {},
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    default: {
      return state;
    }
  }
};

export default Auth;
