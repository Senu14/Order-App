import axios from "axios";
import qs from 'qs';
import http from "./http-common";

const API_URL = "https://orderapp.onrender.com/api/users/";

const register = (name, username, email, password) => {
  var data = qs.stringify({
    'name': name,
    'username': username,
    'email': email,
    'password': password
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://orderapp.onrender.com/api/users',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return axios(config);
};

const login = (username, password) => {
  
  return axios.post(API_URL + "signin", {
    username,
    password,
  })

    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;