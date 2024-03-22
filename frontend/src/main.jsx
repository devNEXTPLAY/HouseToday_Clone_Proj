import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import Loading from "./components/ui/Loading.jsx";
import "./index.css";

import { Provider } from "react-redux";

import store from "./redux/store";

// 전역정보 웹브라우저 스토리지에 저장하기 위한 redux-persist 설정
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
export let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
