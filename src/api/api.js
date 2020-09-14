import axios from "axios";
import store from "../redux/reducer";
import tokenStorage from "../helper/tokenStorage";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = localStorage.getItem("token");
    if (true) {
      const tkn =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwMTE2OTA1LCJqdGkiOiJhNGM4OWFiYzRjOTQ0YzYzYjkzNmYwODAwNWVkNTlhNyIsInVzZXJfaWQiOjF9.UPxrry93WJ2oKOZeKc_G_cFVXaynW3pywhFSH-huKBI";
      config.headers["Authorization"] = `Bearer ${tkn}`;
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
    alert(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
