import axios from "axios";
import authHeader from "./auth-header";

var http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: authHeader(),
});

export default http