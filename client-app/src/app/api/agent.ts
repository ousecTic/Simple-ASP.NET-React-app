import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { Todo } from "../models/todo";

axios.defaults.baseURL = "http://localhost:5000/api";

//interceptors are like middleware
axios.interceptors.response.use(async response => {
  try {
    return response;
  } catch (error) {
    console.log(error);
    //use the new keyword if you want to instantiate
    //resolve maps to then and reject maps to catch
    //you need to write catch and then for all promises
    return await Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url : string) => axios.delete<T>(url).then(responseBody)
}

const Todos = {
  list: () => requests.get<Todo[]>("/todos"),
  details: (id: string) => requests.get<Todo>(`/todos/${id}`),
  create: (todo: Todo) => requests.post<void>("/todos", todo),
  update: (todo: Todo) => requests.put<void>(`/todos/${todo.id}`, todo),
  delete: (id: string) => axios.delete<void>(`/todos/${id}`)
}

const agent = {
  Todos
}

export default agent;
