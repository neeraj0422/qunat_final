import { Axios } from "./axios-class";
import { TOKEN, USER_DETAILS } from "../../constants/constants";

export class APIService extends Axios {
  static _instance = null;

   constructor(conf) {
    super(conf);
    this._axiosInstance.interceptors.request.use(
      (config) => {
        // console.log("Interceptor");
        // console.log("[config]", config);
        if (config && config.headers && localStorage.getItem("token")) {
          config.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
          config.headers["Strict-Transport-Security"] ="max-age=31536000; preload";
          config.headers["X-Content-Type-Options"] = "nosniff";
          config.headers["Referrer-Policy"] = "no-referrer";
          config.headers["ngrok-skip-browser-warning"] = "6024";
        }
        // console.log("[Updated Config]", config);
        return config;
      },
      (error) => {
        // handling error
      },
    );
  }

  static get Instance() {
    if (this._instance) {
      return this._instance;
    }
    const config = {
      baseURL: process.env.REACT_APP_API_BASEPATH,
    };
    this._instance = new this(config);
    return this._instance;
  }

  static checkNested(objTemp, argTemp) {
    let obj = JSON.parse(objTemp);
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return "";
      }
      obj = obj[args[i]];
    }
    return obj;
  }

  getToken = () => {
    return localStorage.getItem(TOKEN);
  };
  removeToken = () => {
    // localStorage.removeItem(CONSTANT.TOKEN);
  };
  removeTokenLogout = () => {
    localStorage.removeItem(TOKEN);
  };

  getUserName = () => {
    const userInfo = localStorage.getItem(USER_DETAILS);
    const info = APIService.checkNested(userInfo, "name");
    if (info !== null && info !== undefined && !info.includes("undefined")) {
      return info;
    }
    return APIService.checkNested(userInfo, "username");
  };

  get = (url, config = {}) => {
    return this._axiosInstance.get(url, config);
  };

  post = (url, data = {}, config = {}) => {
    return this._axiosInstance.post(url, data, config);
  };

  put = (url = {}, data = {}, config = {}) => {
    return this._axiosInstance.put(url, data, config);
  };

  delete = (url = {}, data = {}, config = {}) => {
    return this._axiosInstance.delete(url, config);
  };
  
}
