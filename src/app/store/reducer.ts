import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import authSlice from "./slices/auth.slice";
import uiSlice from "./slices/ui.slice";
import { chatApi } from "./services/chat.service";
import { api } from "./services/api.service";

export const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [api.reducerPath]: api.reducer,
  auth: authSlice,
  ui: uiSlice,
});
