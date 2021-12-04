import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.fireBase ? configFile.apiEndpointFireBase : configFile.apiEndpoint
});

//  адрес по-умолчанию
// http.defaults.baseURL = configFile.fireBase ? configFile.apiEndpointFireBase : configFile.apiEndpoint;

http.interceptors.request.use(
  function (config) {
    if (configFile.fireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}

http.interceptors.response.use((res) => {
  // toast.info("Данные успешно изменены!")
  if (configFile.fireBase) {
    res.data = { content: transformData(res.data) };
  }
  return res;
}, function (error) {
  // console.log("interceptor");
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedErrors) {
    console.log(error);
    toast.error(`Произошла ошибка.\nКоманда работает над исправлением.\nПопробуйте позже.`);
    // toast("Unexpected error");
  }
  return Promise.reject(error);
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
