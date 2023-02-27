import { store } from "../store";
import axios from "axios";

axios.defaults.baseURL = "/";

const onSuccess = (response) => {
  if (!response) {
    return;
  }

  response.success = response.status.toString().match(/^2/);
  if (response.data.notice) {
    console.log(response.data.notice);
  }

  return response;
};

const onError = (error) => {
  console.error(error);

  return Promise.reject(error);
};

const csrfToken = () => {
  const csrfToken = document.querySelector('[name="csrf-token"]');

  if (csrfToken) {
    return csrfToken.getAttribute("content");
  }
};

const configureRequest = (request) => {
  const user = store.getState()?.user;
  const { authToken = null, email = null } = user ?? {};
  request.headers["X-CSRF-Token"] = csrfToken();
  request.headers.Accept = "application/json";
  request.headers["Content-Type"] = "application/json";
  if (authToken && email) {
    request.headers["X-Auth-Email"] = email;
    request.headers["X-Auth-Token"] = authToken;
  }

  return request;
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(configureRequest);
  axios.interceptors.response.use(onSuccess, onError);
};
