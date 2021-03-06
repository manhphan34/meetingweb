import axios from "axios";

const API_URL = "http://192.168.16.12:8081/api/users/";
const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
class AuthService {
  async login(user) {
    const response = await instance({
      method: "post", //you can set what request you want to be
      url: "login",
      data: {
        user
      }
    });
    if (response.data.token) {
      localStorage.setItem("auth", JSON.stringify(response.data));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("auth");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
