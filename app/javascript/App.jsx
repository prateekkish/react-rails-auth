import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CSSBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import { setupAxiosInterceptors } from "./config/network";
import { persistor, store } from "./store";
import { Router } from "./router";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <CSSBaseline />
              <Router />
            </SnackbarProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;