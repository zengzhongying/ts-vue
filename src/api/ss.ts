import { Api } from "../until/api";
const api = new Api();
const getSSList = (query: object = {}) => {
  return api.Get("ssList/get", query);
}

const addSS = (params: object = {}) => {
  return api.Post("ssList/add", params);
}

const delSS = (params: object = {}) => {
  return api.Post("ssList/delete", params);
}

const joinSS = (params: object = {}) => {
  return api.Post("ssList/join", params);
}

const doneSS = (params: object = {}) => {
  return api.Post("ssList/done", params);
}

export default {
  getSSList,
  addSS,
  delSS,
  joinSS,
  doneSS
}