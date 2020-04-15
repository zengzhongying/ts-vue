import { Api } from "../until/api";
const api = new Api();
const getUserName = (uid: number) => {
  return api.Get("getUser", { uid: uid })
}
const getMemberList = (query: object = {}) => {
  return api.Get("member/get", query);
}

const addMember = (params: object = {}) => {
  return api.Post("member/add", params);
}
export default {
  getUserName,
  getMemberList,
  addMember
}