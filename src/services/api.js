import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Продукты
export const fetchAllProducts = () => api.get('/products/all').then(res => res.data);
export const createProduct = (data) => api.post('/products/create', data).then(res => res.data);
export const updateProduct = (id, data) => api.put(`/products/update/${id}`, data).then(res => res.data);
export const deleteProduct = (id) => api.delete(`/products/delete/${id}`).then(res => res.data);

// Типы продуктов
export const fetchAllProductTypes = () => api.get('/type/all').then(res => res.data);
export const createProductType = (data) => api.post('/type/create', data).then(res => res.data);
export const updateProductType = (id, data) => api.put(`/type/update/${id}`, data).then(res => res.data);
export const deleteProductType = (id) => api.delete(`/type/delete/${id}`).then(res => res.data);

// Статусы продуктов
export const fetchAllProductStatuses = () => api.get('/status/all').then(res => res.data);
export const createProductStatus = (data) => api.post('/status/create', data).then(res => res.data);
export const updateProductStatus = (id, data) => api.put(`/status/update/${id}`, data).then(res => res.data);
export const deleteProductStatus = (id) => api.delete(`/status/delete/${id}`).then(res => res.data);
