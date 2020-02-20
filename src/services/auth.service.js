import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
async login(user) {
    const response = await axios
          .post(API_URL + 'signin', {
              user
          });
      if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();