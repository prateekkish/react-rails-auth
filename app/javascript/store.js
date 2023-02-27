import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authentication/authSlice";
import { persistStore, persistReducer, PERSIST, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const options = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(options, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
