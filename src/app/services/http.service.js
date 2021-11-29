import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

//  адрес по-умолчанию
axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use((res) => {
  // toast.info("Данные успешно изменены!")
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
