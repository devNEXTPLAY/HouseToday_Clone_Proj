// 액션 타입 참조
import { USER_LOGIN } from "../../constants/actionTypes";

export const userLogin = (token, user) => ({
  type: USER_LOGIN,
  payload: { token, user },
});
