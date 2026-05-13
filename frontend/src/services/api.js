import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 120000,
})
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || 'Wrong response from server'
    return Promise.reject(new Error(msg))
  }
)

export const getTopSales  = (n = 5)  => api.get(`/reports/top-sales?n=${n}`).then(r => r.data)
export const getDeadStock = ()       => api.get('/reports/DeadStock').then(r => r.data)

export const getProfit    = ()       => api.get('/reports/Profit').then(r => r.data)

export const searchItems  = (name)   => api.get(`/search?name=${encodeURIComponent(name)}`).then(r => r.data)

export const uploadPurchase = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/purchase', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const uploadSales = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/sales', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default api
