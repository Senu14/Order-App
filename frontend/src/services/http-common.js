import axios from "axios";
import authHeader from "./auth-header";

var http = axios.create({
  baseURL: "https://orderapp.onrender.com/api",
  headers: authHeader(),
});

export default http