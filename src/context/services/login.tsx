import { baseUrl } from "./enviroment";
import httpEncap from "./httpEncap";

export const loginUser = (data) => {
  return httpEncap.post(baseUrl + "/v1/auth/admin/login", data);
};

export const logout = () => {
  localStorage.clear();
  window.location.reload();
};


