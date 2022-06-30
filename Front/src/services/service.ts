// import { userInfo } from "os";
import http from "../http-common";
import User from "../types/type"
class crudUSers {
  getAll() {
    return http.get<Array<User>>("/view/");
  }
  get(id: string) {
    return http.get<User>(`/view/${id}`);
  }
  create(data: User) {
    return http.post<User>("/add/", data);
  }
  update(data: User, id: any) {
    return http.put<any>(`/edit/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/del/${id}`);
  }
  deleteAll() {
    return http.delete<any>(`/views/`);
  }
}

export default new crudUSers();