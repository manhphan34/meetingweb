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

class MeetingService {
  async getAllMeetingRoom() {
    const response = await instance({
      mode: "cors",
      credentials: "include",
      method: "get", //you can set what request you want to be
      url: "rooms",
      params: {
        id: JSON.parse(localStorage.getItem("user")).user_id
      }
    });
    return response.data.rooms;
  }
  async getAllResource(id) {
    const response = await instance({
      method: "get", //you can set what request you want to be
      url: "resources",
      params: {
        id: id
      }
    });
    return response.data.resources;
  }

  async createResource(id, name, body) {
    const response = await instance({
      method: "post",
      url: "/uploadfile",
      params: {
        id_room: id,
        name: name
      },
      data: body,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data.success;
  }

  async deleteResource(room_id, resource) {
    const response = await instance({
      method: "delete",
      url: "/delete_resource",
      params: {
        id: resource.id,
        id_room: room_id,
        path: resource.path
      }
    });
    return response.data.success;
  }
}

export default new MeetingService();
