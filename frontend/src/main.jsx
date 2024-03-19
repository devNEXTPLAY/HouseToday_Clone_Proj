import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import Loading from "./components/ui/Loading.jsx";
import "./index.css";

import { Provider } from "react-redux";

import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>
);
