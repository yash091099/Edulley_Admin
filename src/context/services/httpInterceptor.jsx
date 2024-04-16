import axios from "axios";
import { logout } from "./login";
import { baseUrl } from "./enviroment";


const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      config.headers["x-access-user"] = userData.accountId;
      config.headers["x-access-token"] = userData.token;
      config.headers["authorization"] = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default instance;
