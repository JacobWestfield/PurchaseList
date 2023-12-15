import axios from "axios";
import config from "../config.json";

const http = axios.create({ baseURL: config.apiEndpoint });

http.interceptors.request.use(
  async function (config) {
    const containSlash = /\/$/gi.test(config.url);
    config.url =
      (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : [];
}
http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };
    return res;
  },
  function (error) {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
