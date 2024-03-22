import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

//리덕스 스토어 전역정보를 웹브라우저 스토리지에 저장하기위한 객체 참조하기
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

//스토어 전역정보를 웹브라우저 로컬스토리지 객체에 저장하기
import storage from "redux-persist/lib/storage";

//스토어 전역정보를 웹브라우저 세션스토리지 객체에 저장하기
//import storage from "redux-persist/lib/storage/session";

//웹브라우저 스토리지에 영구저장을 위한 설정정보 구성하기
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//리듀서 설정정보 웹브라우저 스토리지에 영구저장을 위해 persistReducer 생성하기
const persistedReducer = persistReducer(persistConfig, reducers);

//스토어 정보 웹브라우저 스토리지에 영구저장을 위해 persistedReducer로 리듀서 설정 필요
//스토어 정보 웹브라우저 스토리지에 영구저장을 위해 반드시 middleware 추가설정필요
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export default store;
