import { HOST } from "../config/constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    let token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    //console.error("API call failed. " + error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("tokenRefresh");

      var decodedRefresh = jwt_decode(refresh);
      var dateNow = new Date().getTime();

      if (dateNow > decodedRefresh.exp * 1000) return Promise.reject(error);

      return axios
        .post(`${HOST}/api/token/refresh/`, { refresh })
        .then(({ data }) => {
          localStorage.setItem("token", data.access);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.access}`;
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);
