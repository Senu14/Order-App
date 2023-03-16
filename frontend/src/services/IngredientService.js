import http from "./http-common";
import qs from "qs";
import axios from "axios";

const getAll = () => {
  return http.get("/ingredients");
};

const get = id => {
  return http.get(`/ingredients/${id}`);
};

const create = data => {
  // let dataToSend = new FormData();
  // dataToSend.append("name", data.name);
  // dataToSend.append("amount", data.amount);
  // dataToSend.append("unit", data.unit);
  // return http.post("/ingredients", dataToSend);

  var data = qs.stringify({
    'dishId': data.dishId,
    'name': data.name,
    'amount': data.amount,
    'unit': data.unit
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:8080/api/ingredients',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return axios(config);
};

const update = (id, data) => {
  let dataToSend = new FormData();
  dataToSend.append("name", data.name);
  dataToSend.append("amount", data.amount);
  dataToSend.append("unit", data.unit);
  return http.put(`/ingredients/${id}`, dataToSend);
};

const remove = id => {
  return http.delete(`/ingredients/${id}`);
};


const IngredientService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default IngredientService;