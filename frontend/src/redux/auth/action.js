// 액션 타입 참조
import { USER_LOGIN } from "../../constants/actionTypes";
import { UPDATE_PROFILE_IMG } from "../../constants/actionTypes";
import { USER_ID } from "../../constants/actionTypes";

export const userLogin = (token) => ({
  type: USER_LOGIN,
  payload: { token },
});

// profile_img만 업데이트하는 액션 생성 함수
export const updateProfileImg = (profile_img) => ({
  type: UPDATE_PROFILE_IMG,
  payload: { profile_img },
});

// 사용자 고유 아이디
export const userOriginalId = (userId) => ({
  type: USER_ID,
  payload: { userId },
});
