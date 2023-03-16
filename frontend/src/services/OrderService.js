import http from "./http-common";
import qs from "qs";
import axios from "axios";

const getAll = () => {
  return http.get("/orders");
};

const get = id => {
  return http.get(`/orders/${id}`);
};

const create = data => {

  var data = qs.stringify({
    'days': data.days,
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/api/orders',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return axios(config);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("days", data.name);
  return http.put(`/orders/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/orders/${id}`);
};


const OrderService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default OrderService;