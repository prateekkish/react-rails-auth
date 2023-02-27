import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { actions } from "./authSlice";

export const registerUser = () => {
  const dispatch = useDispatch();

  return useMutation((user) => axios.post("/register", { user }), {
    onSuccess: ({ data: { id, email, auth_token } }) => {
      dispatch(actions.login({ id, email, authToken: auth_token }));
    },
  });
};

export const loginUser = () => {
  const dispatch = useDispatch();

  return useMutation((user) => axios.post("/login", { user }), {
    onSuccess: ({
      data: {
        user: { id, email, auth_token },
      },
    }) => {
      dispatch(actions.login({ id, email, authToken: auth_token }));
    },
  });
};

export const logoutUser = () => {
  const dispatch = useDispatch();

  return () => {
    delete axios.defaults.headers["X-Auth-Email"];
    delete axios.defaults.headers["X-Auth-Token"];

    dispatch(actions.logout());
  };
};
