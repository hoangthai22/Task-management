import axios from "axios";
import Cookies from "universal-cookie";
import callApi from "./../apis/apiCaller.js";
// import { getAccessToken } from "./../commons/getAccessToken.js";

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    const { status } = error.response;
    if (error.response) {
      if (status === 403 || status === 401) {
        const cookies = new Cookies();
        const refreshToken = cookies.get("refreshToken");
        if (refreshToken) {
          return callApi("/user/refreshToken", "POST", { token: refreshToken })
            .then((response) => {
              const { accessToken } = response.data;
              // store.dispatch(setAccessToken(accessToken));
              cookies.set("payloadClient", accessToken, { maxAge: 60 });
              const config = error.config;
              config.headers["Authorization"] = `Bearer ${accessToken}`;
              return new Promise((resolve, reject) => {
                axios
                  .request(config)
                  .then((res) => {
                    resolve(res);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            })
            .catch((err) => {

              return Promise.reject(err);
            });
        }
      }
    }
    return Promise.reject(error.response);
  }

  get(url, headerParams) {
    this.instance.defaults.headers.common["Authorization"] =
      "Beaer " + headerParams;
    return this.instance.get(url);
  }

  post(url, body, headerParams) {
    this.instance.defaults.headers.common["Authorization"] =
      "Beaer " + headerParams;
    return this.instance.post(url, body);
  }

  put(url, body, headerParams) {
    this.instance.defaults.headers.common["Authorization"] =
      "Beaer " + headerParams;
    return this.instance.put(url, body);
  }

  delete(url, headerParams) {
    this.instance.defaults.headers.common["Authorization"] =
      "Beaer " + headerParams;
    return this.instance.delete(url);
  }
}

export default new AxiosService();
