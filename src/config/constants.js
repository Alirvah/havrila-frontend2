export const API = {
  TOKEN: "/api/token/",
  REFRESHTOKEN: "/api/token/refresh/",
  NOTES: "/note/",
  NOTEBOOK: "/notebook/",
};

//export const HOST =
//  process.env.NODE_ENV === 'development'
//    ? 'http://localhost:3001'
//    : 'http://10.171.94.79:80';

export const HOST =
  "https://3ru4fvt9t5.execute-api.eu-central-1.amazonaws.com/dev";

export const BASE_URL = "/note/api/v1";

export const URL = HOST + BASE_URL;
