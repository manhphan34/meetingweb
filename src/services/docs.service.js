import axios from "axios";
const API_URL = "http://192.168.16.12:8081/api/users/";
var auth = require("../models/auth");
auth = localStorage.getItem("auth");
if (auth) {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${JSON.parse(auth).token}`
  };
}

var headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Origin", "http://192.168.16.12:8081/api/users");

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: headers
});
class DocumentService {
  async getDocs(folder_id) {
    const response = await instance({
      mode: "cors",
      credentials: "include",
      method: "get", //you can set what request you want to be
      url: "docs",
      params: {
        folder_id: folder_id
      }
    });
    return response.data.rooms;
  }
  async createDoc(name, folder_id, file) {
    const response = await instance({
      mode: "cors",
      credentials: "include",
      method: "post", //you can set what request you want to be
      url: "doc",
      params: {
        name: name,
        folder_id: folder_id,
        data: file,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    });
    return response.data.success;
  }
  async deleteDoc(id, path) {
    const response = await instance({
      mode: "cors",
      credentials: "include",
      method: "delete", //you can set what request you want to be
      url: "doc",
      params: {
        id: id,
        path: path
      }
    });
    return response.data.success;
  }
}

export default DocumentService();
