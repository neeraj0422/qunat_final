import axios from "axios";

export class Axios {
  _axiosInstance;
  constructor(config) {
    this._axiosInstance = axios.create(config);
  }
}
