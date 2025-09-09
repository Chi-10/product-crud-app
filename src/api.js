import axios from "axios";

const API_BASE = "https://68beb31f9c70953d96ed4560.mockapi.io/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// CRUD methods (for "project" resource)
export const getProducts = () => api.get("/project");
export const getProduct = (id) => api.get(`/project/${id}`);
export const createProduct = (payload) => api.post("/project", payload);
export const updateProduct = (id, payload) => api.put(`/project/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/project/${id}`);
