import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
