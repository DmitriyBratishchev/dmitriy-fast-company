import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.fireBase ? configFile.apiEndpointFireBase : configFile.apiEndpoint
});

//  адрес по-умолчанию
// http.defaults.baseURL = configFile.fireBase ? configFile.apiEndpointFireBase : configFile.apiEndpoint;

http.interceptors.request.use(
  async function (config) {
    if (configFile.fireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });
        console.log("refresh data", data);
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      };
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
    // console.log(error);
    toast.error(`Произошла ошибка.\nКоманда работает над исправлением.\nПопробуйте позже.`);
    // toast("Unexpected error");
  }
  return Promise.reject(error);
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpService;
